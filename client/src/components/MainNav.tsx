// src/components/MainNav.tsx (updated)
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronDown, X, LogOut } from 'lucide-react';
import { mainNavData } from '@/data/mainNavData';
import { useLanguage } from './context/LanguageContext';
import Tooltip from '@/components/Tooltip';

const HOVER_CLOSE_DELAY = 200;
const SECTION_KEY = 'main_nav';

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const MainNav = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { currentLang, toggleLanguage } = useLanguage();
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);
  const [navData, setNavData] = useState(mainNavData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});  
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [, setLocation] = useLocation()

  const isLoggedIn = !!localStorage.getItem('userToken');
  const logoutAriaLabel = currentLang.code === 'FR' ? 'Se déconnecter' : 'Log out';

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    window.location.href = '/';
  };

  const langKey = currentLang.code.toLowerCase();
  const { menus, subMenus, languages, reserveButton, mobileMenuTitle } = navData;

  const menuItems = menus
    .sort((a, b) => a.position - b.position)
    .map(menu => ({
      id: menu.id,
      label: menu.translations[langKey] || menu.translations.fr,
      href: menu.link,
      subItems: (subMenus[menu.link as keyof typeof subMenus] || []).map(sub => ({
        label: sub.label[langKey] || sub.label.fr,
        href: sub.href
      }))
    }));

  // Helper to split mainNavData into dataFr and dataEn structures
  const splitNavData = (data: typeof mainNavData) => {
    const dataFr: any = {
      menus: data.menus.map(m => ({ ...m, translations: { fr: m.translations.fr } })),
      subMenus: {},
      reserveButton: { fr: data.reserveButton.fr },
      mobileMenuTitle: { fr: data.mobileMenuTitle.fr },
    };

    const dataEn: any = {
      menus: data.menus.map(m => ({ ...m, translations: { en: m.translations.en } })),
      subMenus: {},
      reserveButton: { en: data.reserveButton.en },
      mobileMenuTitle: { en: data.mobileMenuTitle.en },
    };

    Object.keys(data.subMenus).forEach((key) => {
      dataFr.subMenus[key] = data.subMenus[key].map((sub: any) => ({ ...sub, label: { fr: sub.label.fr } }));
      dataEn.subMenus[key] = data.subMenus[key].map((sub: any) => ({ ...sub, label: { en: sub.label.en } }));
    });

    return { dataFr, dataEn };
  };

  // Fetch nav data from backend
  useEffect(() => {
    const fetchNavData = async () => {
      try {
        setLoading(true);
        setError(null);
        const headers = getAuthHeaders();
        let response = await fetch(`/api/globalSections?sectionKey=${SECTION_KEY}`, { headers });
        let data = await response.json();

        let section: any = null;

        if (response.ok && data && data.length > 0) {
          section = data[0];
        } else {
          // Table is empty for this sectionKey, create default
          const { dataFr, dataEn } = splitNavData(mainNavData);
          const createResponse = await fetch('/api/globalSections', {
            method: 'POST',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sectionKey: SECTION_KEY,
              dataFr,
              dataEn,
              isActive: true,
            }),
          });

          if (!createResponse.ok) {
            throw new Error('Failed to create nav data');
          }

          const created = await createResponse.json();
          section = created; // Assume POST returns the created object
          data = [created]; // To match the processing logic
        }

        if (section) {
          const fetchedData = {
            ...mainNavData,
            menus: section.dataFr?.menus || mainNavData.menus,
            subMenus: section.dataFr?.subMenus || mainNavData.subMenus,
            reserveButton: { ...mainNavData.reserveButton, ...section.dataFr?.reserveButton },
            mobileMenuTitle: { ...mainNavData.mobileMenuTitle, ...section.dataFr?.mobileMenuTitle },
          };
          // Merge English if available
          if (section.dataEn) {
            fetchedData.menus = fetchedData.menus.map(menu => ({
              ...menu,
              translations: { ...menu.translations, ...section.dataEn.menus?.find((m: any) => m.id === menu.id)?.translations }
            }));
            // Similar merge for subMenus, etc.
            Object.keys(section.dataEn.subMenus || {}).forEach(key => {
              if (fetchedData.subMenus[key]) {
                fetchedData.subMenus[key] = fetchedData.subMenus[key].map((sub: any, index: number) => ({
                  ...sub,
                  label: { ...sub.label, ...section.dataEn.subMenus[key][index]?.label }
                }));
              }
            });
            fetchedData.reserveButton = { ...fetchedData.reserveButton, ...section.dataEn?.reserveButton };
            fetchedData.mobileMenuTitle = { ...fetchedData.mobileMenuTitle, ...section.dataEn?.mobileMenuTitle };
          }
          setNavData(fetchedData);
        }
      } catch (err) {
        console.error('Error fetching nav data:', err);
        setError('Failed to load navigation data');
        // Fallback to default
        setNavData(mainNavData);
      } finally {
        setLoading(false);
      }
    };

    fetchNavData();
  }, []);

  const updateMainMenu = async (id: number, newFr: string, newEn: string) => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Not authenticated');
      }

      // First, update local state
      setNavData(prev => ({
        ...prev,
        menus: prev.menus.map(m => 
          m.id === id ? { ...m, translations: { ...m.translations, fr: newFr, en: newEn } } : m
        )
      }));

      // Then, update backend
      const headers = getAuthHeaders();
      const currentSectionResponse = await fetch(`/api/globalSections?sectionKey=${SECTION_KEY}`, { headers });
      if (!currentSectionResponse.ok) {
        throw new Error('Failed to fetch current section');
      }
      const currentData = await currentSectionResponse.json();
      let currentSection = currentData.length > 0 ? currentData[0] : null;

      if (!currentSection) {
        // Should not happen after initial load, but create if missing
        const { dataFr, dataEn } = splitNavData(mainNavData);
        const createResponse = await fetch('/api/globalSections', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            sectionKey: SECTION_KEY,
            dataFr,
            dataEn,
            isActive: true,
          }),
        });
        if (!createResponse.ok) {
          throw new Error('Failed to create section for update');
        }
        currentSection = await createResponse.json();
      }

      const updatedDataFr = {
        ...currentSection.dataFr,
        menus: currentSection.dataFr.menus?.map(m => m.id === id ? { ...m, translations: { ...m.translations, fr: newFr } } : m) || mainNavData.menus.map(m => ({ ...m, translations: { fr: m.translations.fr } }))
      };
      const updatedDataEn = {
        ...currentSection.dataEn || {},
        menus: (currentSection.dataEn?.menus || mainNavData.menus.map(m => ({ ...m, translations: { en: m.translations.en } }))).map(m => m.id === id ? { ...m, translations: { ...m.translations, en: newEn } } : m)
      };

      const putResponse = await fetch(`/api/globalSections/${currentSection.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          dataFr: updatedDataFr,
          dataEn: Object.keys(updatedDataEn).length > 0 ? updatedDataEn : null
        })
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update main menu');
      }
    } catch (err) {
      console.error('Error updating main menu:', err);
      // Revert local state on error if needed, but for simplicity, keep it
    }
  };

  const updateSubMenu = async (mainHref: string, subHref: string, newFr: string, newEn: string) => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Not authenticated');
      }

      // First, update local state
      setNavData(prev => {
        const newSubMenus = { ...prev.subMenus };
        const mainKey = mainHref as keyof typeof newSubMenus;
        if (newSubMenus[mainKey]) {
          newSubMenus[mainKey] = newSubMenus[mainKey].map(item =>
            item.href === subHref ? { ...item, label: { fr: newFr, en: newEn } } : item
          );
        }
        return { ...prev, subMenus: newSubMenus };
      });

      // Then, update backend
      const headers = getAuthHeaders();
      const currentSectionResponse = await fetch(`/api/globalSections?sectionKey=${SECTION_KEY}`, { headers });
      if (!currentSectionResponse.ok) {
        throw new Error('Failed to fetch current section');
      }
      const currentData = await currentSectionResponse.json();
      let currentSection = currentData.length > 0 ? currentData[0] : null;

      if (!currentSection) {
        // Should not happen after initial load, but create if missing
        const { dataFr, dataEn } = splitNavData(mainNavData);
        const createResponse = await fetch('/api/globalSections', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            sectionKey: SECTION_KEY,
            dataFr,
            dataEn,
            isActive: true,
          }),
        });
        if (!createResponse.ok) {
          throw new Error('Failed to create section for update');
        }
        currentSection = await createResponse.json();
      }

      const subMenusFr = { ...currentSection.dataFr.subMenus || mainNavData.subMenus };
      const targetSubFr = subMenusFr[mainHref]?.find((s: any) => s.href === subHref);
      if (targetSubFr) {
        targetSubFr.label.fr = newFr;
      }
      const updatedDataFr = { ...currentSection.dataFr, subMenus: subMenusFr };

      const subMenusEn = { ...currentSection.dataEn?.subMenus || {} };
      let targetSubEn = subMenusEn[mainHref]?.find((s: any) => s.href === subHref);
      if (targetSubEn) {
        targetSubEn.label.en = newEn;
      } else {
        if (!subMenusEn[mainHref]) subMenusEn[mainHref] = [];
        subMenusEn[mainHref].push({ label: { en: newEn }, href: subHref });
      }
      const updatedDataEn = { ...currentSection.dataEn, subMenus: subMenusEn };

      const putResponse = await fetch(`/api/globalSections/${currentSection.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          dataFr: updatedDataFr,
          dataEn: Object.keys(updatedDataEn).length > 0 ? updatedDataEn : null
        })
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update sub menu');
      }
    } catch (err) {
      console.error('Error updating sub menu:', err);
      // Revert local state on error if needed
    }
  };

  const handleDropdownToggle = (itemLabel: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setOpenDropdown(openDropdown === itemLabel ? null : itemLabel);
  };

  const handleDropdownHover = (itemLabel: string, isEntering: boolean) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (isEntering) {
      setOpenDropdown(itemLabel);
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setOpenDropdown(null);
      }, HOVER_CLOSE_DELAY);
    }
  };

  const handleMobileAccordionToggle = (itemLabel: string) => {
    setOpenMobileAccordion(openMobileAccordion === itemLabel ? null : itemLabel);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setOpenMobileAccordion(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (openDropdown && !target.closest(`[data-dropdown="${openDropdown}"]`)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        if (isMobileOpen) {
          closeMobileMenu();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  // Cleanup hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const currentReserveButton = reserveButton[langKey] || reserveButton.fr;
  const currentMobileMenuTitle = mobileMenuTitle[langKey] || mobileMenuTitle.fr;

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 bg-[#0f1115]/90 backdrop-blur shadow-sm border-b border-white/5">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-2">
          <div className="flex items-center">
            <div className="animate-pulse bg-white/10 rounded w-32 h-5" />
          </div>
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-center">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white/10 rounded w-16 h-4" />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="animate-pulse bg-white/10 rounded w-20 h-8" />
            <div className="animate-pulse bg-white/10 rounded w-20 h-8" />
            <button className="lg:hidden p-2 animate-pulse bg-white/10 rounded w-8 h-8" />
          </div>
        </div>
      </nav>
    );
  }

  if (error) {
    console.warn(error);
  }

  return (
    <nav 
      className="sticky top-0 z-50 bg-[#0f1115]/90 backdrop-blur shadow-sm border-b border-white/5"
      aria-label="Navigation principale"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-2">
        
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="text-xl font-serif font-bold text-white hover:text-[#f2c451] transition-colors"
          >
            Carlton Madagascar
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4 flex-1 justify-center">
          {menuItems.map((item) => {
            const menuItem = navData.menus.find(m => m.id === item.id);
            const frLabel = menuItem?.translations.fr || '';
            const enLabel = menuItem?.translations.en || '';
            return (
              <div 
                key={item.id} 
                className="relative"
                data-dropdown={item.label}
              >
                {item.subItems.length > 0 ? (
                  <Tooltip frLabel={frLabel} enLabel={enLabel} onSave={(fr, en) => updateMainMenu(item.id, fr, en)}>
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      onMouseEnter={() => handleDropdownHover(item.label, true)}
                      onMouseLeave={() => handleDropdownHover(item.label, false)}
                      className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#0f1115] rounded px-2 py-1.5"
                      aria-expanded={openDropdown === item.label}
                      aria-controls={`dropdown-${item.label}`}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown 
                        className={`w-3 h-3 transition-transform ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip frLabel={frLabel} enLabel={enLabel} onSave={(fr, en) => updateMainMenu(item.id, fr, en)}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#0f1115] rounded px-2 py-1.5"
                    >
                      {item.label}
                    </Link>
                  </Tooltip>
                )}

                {/* Desktop Dropdown */}
                {item.subItems.length > 0 && openDropdown === item.label && (
                  <div
                    id={`dropdown-${item.label}`}
                    ref={(el) => (dropdownRefs.current[item.label] = el)}
                    className="absolute left-0 mt-2 min-w-[260px] rounded-xl border border-white/10 bg-[#151821] p-3 shadow-xl"
                    onMouseEnter={() => handleDropdownHover(item.label, true)}
                    onMouseLeave={() => handleDropdownHover(item.label, false)}
                  >
                    <div className="space-y-1">
                      {item.subItems.map((subItem) => {
                        const subMenuItem = navData.subMenus[item.href as keyof typeof navData.subMenus]?.find(s => s.href === subItem.href);
                        const subFrLabel = subMenuItem?.label.fr || '';
                        const subEnLabel = subMenuItem?.label.en || '';
                        return (
                          <Tooltip
                            key={subItem.href}
                            frLabel={subFrLabel}
                            enLabel={subEnLabel}
                            onSave={(fr, en) => updateSubMenu(item.href, subItem.href, fr, en)}
                          >
                            <Link
                              href={subItem.href}
                              className="block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                              onClick={() => {
                                if (hoverTimeoutRef.current) {
                                  clearTimeout(hoverTimeoutRef.current);
                                }
                                setOpenDropdown(null);
                              }}
                            >
                              {subItem.label}
                            </Link>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#0f1115] rounded-lg"
            aria-label={`Changer la langue vers ${currentLang.code === 'FR' ? 'English' : 'Français'}`}
          >
            🌐
            <span className="font-medium">{currentLang.code}</span>
          </button>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-2 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#0f1115] rounded-lg"
              aria-label={logoutAriaLabel}
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}

          {/* Reserve Button */}
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-[#f2c451] px-4 py-2 font-semibold text-black hover:brightness-95 active:scale-[.98] transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#0f1115]"
          >
            {currentReserveButton}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#0f1115] rounded"
            aria-label={isMobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <span className="text-lg">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          
          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#0f1115] shadow-xl">
            <div className="flex h-full flex-col">
              
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="text-lg font-serif font-bold text-white">{currentMobileMenuTitle}</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                  aria-label="Fermer le menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {menuItems.map((item) => {
                    const menuItem = navData.menus.find(m => m.id === item.id);
                    const frLabel = menuItem?.translations.fr || '';
                    const enLabel = menuItem?.translations.en || '';
                    return (
                      <div key={item.id}>
                        {item.subItems.length > 0 ? (
                          <>
                            <Tooltip frLabel={frLabel} enLabel={enLabel} onSave={(fr, en) => updateMainMenu(item.id, fr, en)}>
                              <button
                                onClick={() => handleMobileAccordionToggle(item.label)}
                                className="flex w-full items-center justify-between px-3 py-3 text-left text-base text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                aria-expanded={openMobileAccordion === item.label}
                              >
                                <span className="flex items-center gap-2">
                                  {item.label}
                                </span>
                                <ChevronDown 
                                  className={`w-4 h-4 transition-transform ${
                                    openMobileAccordion === item.label ? 'rotate-180' : ''
                                  }`} 
                                />
                              </button>
                            </Tooltip>
                            
                            {/* Mobile Accordion Content */}
                            {openMobileAccordion === item.label && (
                              <div className="ml-4 mt-1 space-y-1">
                                {item.subItems.map((subItem) => {
                                  const subMenuItem = navData.subMenus[item.href as keyof typeof navData.subMenus]?.find(s => s.href === subItem.href);
                                  const subFrLabel = subMenuItem?.label.fr || '';
                                  const subEnLabel = subMenuItem?.label.en || '';
                                  return (
                                    <Tooltip
                                      key={subItem.href}
                                      frLabel={subFrLabel}
                                      enLabel={subEnLabel}
                                      onSave={(fr, en) => updateSubMenu(item.href, subItem.href, fr, en)}
                                    >
                                      <Link
                                        href={subItem.href}
                                        onClick={closeMobileMenu}
                                        className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                      >
                                        {subItem.label}
                                      </Link>
                                    </Tooltip>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        ) : (
                          <Tooltip frLabel={frLabel} enLabel={enLabel} onSave={(fr, en) => updateMainMenu(item.id, fr, en)}>
                            <Link
                              href={item.href}
                              onClick={closeMobileMenu}
                              className="flex items-center gap-2 px-3 py-3 text-base text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                              {item.label}
                            </Link>
                          </Tooltip>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-white/10 space-y-3">
                
                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="flex w-full items-center justify-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  🌐
                  <span>Langue: {currentLang.code}</span>
                </button>

                {isLoggedIn && (
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="flex w-full items-center justify-center p-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    aria-label={logoutAriaLabel}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}

                {/* Reserve Button */}
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="flex w-full items-center justify-center rounded-lg bg-[#f2c451] px-4 py-3 font-semibold text-black hover:brightness-95 active:scale-[.98] transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {currentReserveButton}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNav;