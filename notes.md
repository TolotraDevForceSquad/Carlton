// src/data/mainNavData.ts
export const mainNavData = {
  menus: [
    { id: 1, translations: { fr: "Accueil", en: "Home" }, link: "/", position: 1 },
    { id: 2, translations: { fr: "Offres Spéciales", en: "Special Offers" }, link: "/offres", position: 2 },
    { id: 3, translations: { fr: "Séjour", en: "Stay" }, link: "/chambres", position: 3 },
    { id: 4, translations: { fr: "Restauration", en: "Dining" }, link: "/restaurants", position: 4 },
    { id: 5, translations: { fr: "Bien-être", en: "Wellness" }, link: "/bien-etre-loisirs", position: 5 },
    { id: 6, translations: { fr: "Événements", en: "Events" }, link: "/evenements", position: 6 },
    { id: 7, translations: { fr: "Découverte", en: "Discover" }, link: "/galerie", position: 7 },
    { id: 8, translations: { fr: "Contact", en: "Contact" }, link: "/contact", position: 8 }
  ],
  subMenus: {
    '/chambres': [
      { label: { fr: 'Chambres & Suites', en: 'Rooms & Suites' }, href: '/chambres' },
      { label: { fr: 'Services & Boutiques', en: 'Services & Shops' }, href: '/services-boutiques' }
    ],
    '/restaurants': [
      { label: { fr: 'Île Rouge & la Terrasse', en: 'Île Rouge & the Terrace' }, href: '/restaurants#ile-rouge' },
      { label: { fr: 'Le Bistrot du Carlton', en: 'The Carlton Bistro' }, href: '/restaurants#bistrot' },
      { label: { fr: 'L\'Oasis de Tana', en: 'Tana Oasis' }, href: '/restaurants#oasis' },
      { label: { fr: 'L\'Éclair by Carlton', en: 'Carlton Éclair' }, href: '/restaurants#eclair' }
    ],
    '/bien-etre-loisirs': [
      { label: { fr: 'Piscine', en: 'Pool' }, href: '/bien-etre-loisirs#piscine' },
      { label: { fr: 'Salle de sport', en: 'Gym' }, href: '/bien-etre-loisirs#salle-sport' },
      { label: { fr: 'Court de tennis', en: 'Tennis Court' }, href: '/bien-etre-loisirs#tennis' },
      { label: { fr: 'Soins holistique', en: 'Holistic Care' }, href: '/bien-etre-loisirs#soins' }
    ],
    '/evenements': [
      { label: { fr: 'Mariages', en: 'Weddings' }, href: '/evenements#mariages' },
      { label: { fr: 'Corporate', en: 'Corporate' }, href: '/evenements#corporate' },
      { label: { fr: 'Célébrations', en: 'Celebrations' }, href: '/evenements#celebrations' },
      { label: { fr: 'Galas & Lancements', en: 'Galas & Launches' }, href: '/evenements#galas' },
      { label: { fr: 'Nos espaces', en: 'Our Spaces' }, href: '/evenements#salles' }
    ],
    '/galerie': [
      { label: { fr: 'Galerie', en: 'Gallery' }, href: '/galerie' },
      { label: { fr: 'Découvrir Antananarivo', en: 'Discover Antananarivo' }, href: '/decouvrir-antananarivo' }
    ]
  },
  languages: [
    { code: 'FR', flag: '🇫🇷' },
    { code: 'EN', flag: '🇬🇧' }
  ],
  reserveButton: { fr: "Réservez", en: "Reserve" },
  mobileMenuTitle: { fr: "Menu", en: "Menu" }
};

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


// src/data/restaurantData.ts
export const restaurantPageData = {
  hero: {
    backgroundImage: '/uploads/Fine_dining_restaurant_1275a5b9.png',
    title: {
      fr: "Restaurants & Bars",
      en: "Restaurants & Bars"
    },
    description: {
      fr: "Quatre univers culinaires uniques pour des expériences gastronomiques variées au cœur de Madagascar",
      en: "Four unique culinary universes for varied gastronomic experiences in the heart of Madagascar"
    },
    stats: [
      {
        number: { fr: "4", en: "4" },
        label: { fr: "Restaurants & Bars", en: "Restaurants & Bars" },
        icon: "Utensils"
      },
      {
        number: { fr: "5★", en: "5★" },
        label: { fr: "Gastronomie", en: "Gastronomy" },
        icon: "Star"
      },
      {
        number: { fr: "6h30-23h", en: "6:30am-11pm" },
        label: { fr: "Service continu", en: "Continuous Service" },
        icon: "Clock"
      },
      {
        number: { fr: "Premium", en: "Premium" },
        label: { fr: "Cuisine d'exception", en: "Exceptional Cuisine" },
        icon: "Sparkles"
      }
    ],
    buttonTexts: {
      primary: { fr: "Découvrir nos restaurants", en: "Discover our restaurants" },
      secondary: { fr: "Réserver une table", en: "Reserve a table" }
    }
  },
  restaurants: [
    {
      id: 1,
      name: { fr: "Le Bistrot du Carlton", en: "Le Bistrot du Carlton" },
      type: { fr: "Bistrot – Bar / Cuisine Bistrot revisitée", en: "Bistrot – Bar / Revisited Bistrot Cuisine" },
      description: {
        fr: "Bistrot urbain, esprit d'ici et d'ailleurs ! Dans une ambiance chic et rétro, notre bistrot revisite la cuisine traditionnelle avec une touche moderne et internationale.",
        en: "Urban bistro, spirit from here and elsewhere! In a chic and retro atmosphere, our bistro revisits traditional cuisine with a modern and international touch."
      },
      detailedDescription: {
        fr: "Ici, les plats sont faits maison, préparés avec des produits frais et de saison pour des recettes généreuses et riches en goût. Vous retrouverez des incontournables comme la terrine de foie gras, la salade César, le magret de canard, ou encore des classiques revisités tels que les spaghetti carbonara, le club sandwich, le hamburger maison ou le fish & chips croustillant. Et bien sûr, les desserts comme la crème brûlée ou la mousse au chocolat. Pour compléter le tout, des options végétariens sont disponibles pour régaler tous les appétits. Ouvert du matin jusqu'en soirée, avec terrasse en plein air, c'est l'endroit parfait pour un café, un déjeuner de travail ou un dîner décontracté entre amis.",
        en: "Here, the dishes are homemade, prepared with fresh and seasonal products for generous and flavorful recipes. You'll find essentials like foie gras terrine, Caesar salad, duck breast, or revisited classics such as spaghetti carbonara, club sandwich, homemade hamburger or crispy fish & chips. And of course, desserts like crème brûlée or chocolate mousse. To complete it all, vegetarian options are available to delight all appetites. Open from morning to evening, with an outdoor terrace, it's the perfect place for a coffee, a business lunch or a casual dinner with friends."
      },
      image: '/uploads/Fine_dining_restaurant_1275a5b9.png',
      rating: 4,
      priceRange: { fr: "€€€", en: "€€€" },
      hours: { fr: "Bar : 06h30 à 23h00 | Restaurant : 11h00 à 23h00", en: "Bar: 6:30am to 11pm | Restaurant: 11am to 11pm" },
      capacity: { fr: "Terrasse en plein air", en: "Outdoor Terrace" },
      reservationRequired: false,
      dressCode: { fr: "", en: "" },
      specialties: [
        { fr: "Terrine de foie gras", en: "Foie Gras Terrine" },
        { fr: "Salade César", en: "Caesar Salad" },
        { fr: "Magret de canard", en: "Duck Breast" },
        { fr: "Spaghetti carbonara", en: "Spaghetti Carbonara" },
        { fr: "Club sandwich", en: "Club Sandwich" },
        { fr: "Hamburger maison", en: "Homemade Hamburger" },
        { fr: "Fish & chips croustillant", en: "Crispy Fish & Chips" },
        { fr: "Crème brûlée", en: "Crème Brûlée" },
        { fr: "Mousse au chocolat", en: "Chocolate Mousse" }
      ],
      features: [
        { fr: "Ouvert tous les jours", en: "Open Every Day" },
        { fr: "Produits frais et de saison", en: "Fresh and Seasonal Products" },
        { fr: "Options végétariennes", en: "Vegetarian Options" },
        { fr: "Terrasse extérieure", en: "Outdoor Terrace" },
        { fr: "Idéal pour déjeuners d'affaires", en: "Ideal for Business Lunches" }
      ],
      hidden: false
    },
    {
      id: 2,
      name: { fr: "Ile Rouge & la Terrasse", en: "Ile Rouge & the Terrace" },
      type: { fr: "Restaurant en salle / Cuisine internationale", en: "Indoor Restaurant / International Cuisine" },
      description: {
        fr: "Une invitation au voyage des saveurs ! Notre restaurant vous propose une cuisine du monde raffinée, élaborée avec des ingrédients locaux soigneusement sélectionnés.",
        en: "An invitation to a journey of flavors! Our restaurant offers refined world cuisine, crafted with carefully selected local ingredients."
      },
      detailedDescription: {
        fr: "Les spécialités malgaches côtoient des plats internationaux, pour une expérience culinaire variée et raffinée, mêlant traditions locales et saveurs du monde. De larges baies vitrées baignent la salle de lumière naturelle et offrent une vue apaisante sur la piscine et le jardin. C'est dans cette atmosphère chaleureuse que le petit-déjeuner est servi en buffet ou à la carte. Au fil des saisons, le restaurant devient un lieu de retrouvaille privilégié pour célébrer les moments forts de l'année : les fêtes des mères, des pères, Pâques, Noël, Nouvel an ... Famille et proches se retrouvent autour de menus spéciaux ou de buffets généreux et hauts en saveurs, dans une ambiance conviviale et festive.",
        en: "Malagasy specialties mingle with international dishes, for a varied and refined culinary experience, blending local traditions and world flavors. Large bay windows bathe the room in natural light and offer a soothing view of the pool and garden. It is in this warm atmosphere that breakfast is served as a buffet or à la carte. Through the seasons, the restaurant becomes a privileged meeting place to celebrate the highlights of the year: Mother's Day, Father's Day, Easter, Christmas, New Year... Family and loved ones gather around special menus or generous and flavorful buffets, in a convivial and festive atmosphere."
      },
      image: '/uploads/Luxury_hotel_restaurant_interior_090ad235.png',
      rating: 5,
      priceRange: { fr: "€€€€", en: "€€€€" },
      hours: { fr: "Petit-déjeuner : 06h30 à 10h30 | Déjeuner : 12h00 à 15h00 | Dîner : 19h00 à 23h00", en: "Breakfast: 6:30am to 10:30am | Lunch: 12pm to 3pm | Dinner: 7pm to 11pm" },
      capacity: { fr: "60 couverts en salle + terrasse", en: "60 seats indoors + terrace" },
      reservationRequired: true,
      dressCode: { fr: "", en: "" },
      specialties: [
        { fr: "Spécialités malgaches", en: "Malagasy Specialties" },
        { fr: "Plats internationaux", en: "International Dishes" },
        { fr: "Buffet petit-déjeuner", en: "Breakfast Buffet" },
        { fr: "Menus spéciaux saisonniers", en: "Seasonal Special Menus" }
      ],
      features: [
        { fr: "Ouvert tous les jours", en: "Open Every Day" },
        { fr: "Vue sur piscine et jardin", en: "View of Pool and Garden" },
        { fr: "Événements festifs", en: "Festive Events" },
        { fr: "Buffets généreux", en: "Generous Buffets" },
        { fr: "Ingrédients locaux", en: "Local Ingredients" }
      ],
      hidden: false
    },
    {
      id: 3,
      name: { fr: "L'Oasis de Tana", en: "L'Oasis de Tana" },
      type: { fr: "Restaurant en plein air / Spécialités : salades, grillades, pizzas", en: "Outdoor Restaurant / Specialties: Salads, Grills, Pizzas" },
      description: {
        fr: "Escapade gustative au grand air ! Au creux d'un jardin paisible, notre restaurant vous accueille dans une ambiance détendue et tranquille.",
        en: "Gastronomic escape in the open air! Nestled in a peaceful garden, our restaurant welcomes you in a relaxed and serene atmosphere."
      },
      detailedDescription: {
        fr: "Offrez-vous un moment suspendu pour déguster des plats généreux et variés, soigneusement préparés avec des ingrédients de qualité. Salades gourmandes, grillades savoureuses et desserts irrésistibles composent une carte qui éveille les sens. L'endroit idéal pour un déjeuner d'affaires ou simplement se faire plaisir autour d'un bon repas. Notre bar vous invite à prolonger l'expérience dans un esprit tout aussi relaxant. Laissez-vous surprendre par une sélection de cocktails originaux, frais et délicieux, pensés pour accompagner vos instants de détente jusqu'à la fin de la journée. Une parenthèse pour s'offrir une pause dans un cadre verdoyant.",
        en: "Treat yourself to a suspended moment to savor generous and varied dishes, carefully prepared with quality ingredients. Gourmet salads, savory grills and irresistible desserts make up a menu that awakens the senses. The ideal place for a business lunch or simply to treat yourself to a good meal. Our bar invites you to extend the experience in an equally relaxing spirit. Let yourself be surprised by a selection of original, fresh and delicious cocktails, designed to accompany your moments of relaxation until the end of the day. A break to treat yourself in a green setting."
      },
      image: '/uploads/Luxury_hotel_restaurant_interior_090ad235.png',
      rating: 4,
      priceRange: { fr: "€€€", en: "€€€" },
      hours: { fr: "Bar : à partir de 8h00 | Restaurant (hiver) : 11h00 à 17h00 | Restaurant (été) : 11h00 à 18h00", en: "Bar: from 8am | Restaurant (winter): 11am to 5pm | Restaurant (summer): 11am to 6pm" },
      capacity: { fr: "50 places en plein air", en: "50 Outdoor Seats" },
      reservationRequired: false,
      dressCode: { fr: "", en: "" },
      specialties: [
        { fr: "Salades gourmandes", en: "Gourmet Salads" },
        { fr: "Grillades savoureuses", en: "Savory Grills" },
        { fr: "Pizzas", en: "Pizzas" },
        { fr: "Desserts irrésistibles", en: "Irresistible Desserts" },
        { fr: "Cocktails originaux", en: "Original Cocktails" }
      ],
      features: [
        { fr: "Ouvert tous les jours", en: "Open Every Day" },
        { fr: "Jardin paisible", en: "Peaceful Garden" },
        { fr: "Ambiance détendue", en: "Relaxed Atmosphere" },
        { fr: "Déjeuners d'affaires", en: "Business Lunches" },
        { fr: "Cadre verdoyant", en: "Green Setting" }
      ],
      hidden: false
    },
    {
      id: 4,
      name: { fr: "L'Eclair by Carlton", en: "L'Eclair by Carlton" },
      type: { fr: "Pâtisserie & Boulangerie", en: "Patisserie & Bakery" },
      description: {
        fr: "Un véritable rendez-vous gourmand en plein centre-ville ! Bienvenue dans notre pâtisserie & boulangerie artisanale !",
        en: "A true gourmet rendezvous in the heart of the city! Welcome to our artisan patisserie & bakery!"
      },
      detailedDescription: {
        fr: "Chaque jour, notre équipe passionnée prépare avec soin des produits faits maison, frais et savoureux : pains variés à la croûte dorée, viennoiseries fondantes, gâteaux et entremets délicats, sans oublier sandwiches gourmands, snacks savoureux, glaces rafraîchissantes, boissons chaudes réconfortantes et salades de fruits fraîches. Ici, l'ambiance est conviviale et chaleureuse, un lieu où les amateurs de douceurs se sentent comme chez eux, accueillis par une équipe souriante et attentive, toujours prête à partager un moment de plaisir et de gourmandise.",
        en: "Every day, our passionate team carefully prepares homemade, fresh and tasty products: varied breads with golden crusts, melting pastries, delicate cakes and entremets, not forgetting gourmet sandwiches, tasty snacks, refreshing ice creams, comforting hot drinks and fresh fruit salads. Here, the atmosphere is convivial and warm, a place where sweet lovers feel at home, welcomed by a smiling and attentive team, always ready to share a moment of pleasure and indulgence."
      },
      image: '/uploads/Luxury_hotel_restaurant_interior_090ad235.png',
      rating: 5,
      priceRange: { fr: "€€", en: "€€" },
      hours: { fr: "De 06h30 à 18h30", en: "From 6:30am to 6:30pm" },
      capacity: { fr: "Emporter et 25 places assises", en: "Takeaway and 25 Seats" },
      reservationRequired: false,
      dressCode: { fr: "", en: "" },
      specialties: [
        { fr: "Pains variés", en: "Varied Breads" },
        { fr: "Viennoiseries fondantes", en: "Melting Pastries" },
        { fr: "Gâteaux et entremets", en: "Cakes and Entremets" },
        { fr: "Sandwiches gourmands", en: "Gourmet Sandwiches" },
        { fr: "Glaces rafraîchissantes", en: "Refreshing Ice Creams" },
        { fr: "Salades de fruits fraîches", en: "Fresh Fruit Salads" }
      ],
      features: [
        { fr: "Ouvert tous les jours", en: "Open Every Day" },
        { fr: "Produits faits maison", en: "Homemade Products" },
        { fr: "Ambiance conviviale", en: "Convivial Atmosphere" },
        { fr: "Équipe passionnée", en: "Passionate Team" },
        { fr: "Emporter disponible", en: "Takeaway Available" }
      ],
      hidden: false
    }
  ],
  cta: {
    title: { fr: "Prêt à réserver ?", en: "Ready to reserve?" },
    description: {
      fr: "Contactez-nous pour une expérience culinaire inoubliable au Carlton Madagascar.",
      en: "Contact us for an unforgettable culinary experience at Carlton Madagascar."
    },
    buttonText: { fr: "Nous contacter", en: "Contact us" }
  }
};


// src/pages/Restaurants.tsx
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Star, Sparkles, Utensils, Plus, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import { restaurantPageData } from '@/data/restaurantsData';
import { useLanguage } from '@/components/context/LanguageContext';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';

const SECTION_KEY = 'restaurants';

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Helper to split restaurantPageData into dataFr and dataEn structures
const splitRestaurantData = (mixedData: typeof restaurantPageData) => {
  const dataFr = {
    hero: {
      backgroundImage: mixedData.hero.backgroundImage,
      title: mixedData.hero.title.fr,
      description: mixedData.hero.description.fr,
      stats: mixedData.hero.stats.map(stat => ({
        number: stat.number.fr,
        label: stat.label.fr,
        icon: stat.icon
      })),
      buttonTexts: {
        primary: mixedData.hero.buttonTexts.primary.fr,
        secondary: mixedData.hero.buttonTexts.secondary.fr
      }
    },
    restaurants: mixedData.restaurants.map((restaurant) => ({
      id: restaurant.id,
      name: restaurant.name.fr,
      type: restaurant.type.fr,
      description: restaurant.description.fr,
      detailedDescription: restaurant.detailedDescription.fr,
      image: restaurant.image || '/uploads/Restaurant.png',
      rating: restaurant.rating,
      priceRange: restaurant.priceRange.fr,
      hours: restaurant.hours.fr,
      capacity: restaurant.capacity.fr,
      reservationRequired: restaurant.reservationRequired,
      dressCode: restaurant.dressCode.fr,
      specialties: restaurant.specialties.map((spec) => spec.fr),
      features: restaurant.features.map((feature) => feature.fr),
      hidden: restaurant.hidden || false
    })),
    cta: {
      title: mixedData.cta.title.fr,
      description: mixedData.cta.description.fr,
      buttonText: mixedData.cta.buttonText.fr
    }
  };

  const dataEn = {
    hero: {
      backgroundImage: mixedData.hero.backgroundImage,
      title: mixedData.hero.title.en,
      description: mixedData.hero.description.en,
      stats: mixedData.hero.stats.map(stat => ({
        number: stat.number.en,
        label: stat.label.en,
        icon: stat.icon
      })),
      buttonTexts: {
        primary: mixedData.hero.buttonTexts.primary.en,
        secondary: mixedData.hero.buttonTexts.secondary.en
      }
    },
    restaurants: mixedData.restaurants.map((restaurant) => ({
      id: restaurant.id,
      name: restaurant.name.en,
      type: restaurant.type.en,
      description: restaurant.description.en,
      detailedDescription: restaurant.detailedDescription.en,
      image: restaurant.image || '/uploads/Restaurant.png',
      rating: restaurant.rating,
      priceRange: restaurant.priceRange.en,
      hours: restaurant.hours.en,
      capacity: restaurant.capacity.en,
      reservationRequired: restaurant.reservationRequired,
      dressCode: restaurant.dressCode.en,
      specialties: restaurant.specialties.map((spec) => spec.en),
      features: restaurant.features.map((feature) => feature.en),
      hidden: restaurant.hidden || false
    })),
    cta: {
      title: mixedData.cta.title.en,
      description: mixedData.cta.description.en,
      buttonText: mixedData.cta.buttonText.en
    }
  };

  return { dataFr, dataEn };
};

// Reconstruct mixed data from dataFr and dataEn
const reconstructMixed = (dataFr: any, dataEn: any | null) => {
  if (!dataFr || typeof dataFr !== 'object') {
    console.warn('Invalid dataFr structure, falling back to default');
    return restaurantPageData;
  }
  const enFallback = dataEn || dataFr;
  return {
    hero: {
      backgroundImage: dataFr.hero.backgroundImage,
      title: { fr: dataFr.hero.title, en: enFallback.hero.title },
      description: { fr: dataFr.hero.description, en: enFallback.hero.description },
      stats: dataFr.hero.stats.map((statFr: any, i: number) => {
        const statEn = enFallback.hero.stats[i] || statFr;
        return {
          number: { fr: statFr.number, en: statEn.number },
          label: { fr: statFr.label, en: statEn.label },
          icon: statFr.icon
        };
      }),
      buttonTexts: {
        primary: { fr: dataFr.hero.buttonTexts.primary, en: enFallback.hero.buttonTexts.primary },
        secondary: { fr: dataFr.hero.buttonTexts.secondary, en: enFallback.hero.buttonTexts.secondary }
      }
    },
    restaurants: dataFr.restaurants.map((restaurantFr: any, i: number) => {
      const restaurantEn = enFallback.restaurants[i] || restaurantFr;
      return {
        id: restaurantFr.id,
        name: { fr: restaurantFr.name, en: restaurantEn.name },
        type: { fr: restaurantFr.type, en: restaurantEn.type },
        description: { fr: restaurantFr.description, en: restaurantEn.description },
        detailedDescription: { fr: restaurantFr.detailedDescription, en: restaurantEn.detailedDescription },
        image: restaurantFr.image || '/uploads/Restaurant.png',
        rating: restaurantFr.rating,
        priceRange: { fr: restaurantFr.priceRange, en: restaurantEn.priceRange },
        hours: { fr: restaurantFr.hours, en: restaurantEn.hours },
        capacity: { fr: restaurantFr.capacity, en: restaurantEn.capacity },
        reservationRequired: restaurantFr.reservationRequired,
        dressCode: { fr: restaurantFr.dressCode, en: restaurantEn.dressCode },
        specialties: restaurantFr.specialties.map((sFr: string, j: number) => ({
          fr: sFr,
          en: restaurantEn.specialties[j] || sFr
        })),
        features: restaurantFr.features.map((fFr: string, j: number) => ({
          fr: fFr,
          en: restaurantEn.features[j] || fFr
        })),
        hidden: restaurantFr.hidden !== undefined ? restaurantFr.hidden : (restaurantEn.hidden || false)
      };
    }),
    cta: {
      title: { fr: dataFr.cta.title, en: enFallback.cta.title },
      description: { fr: dataFr.cta.description, en: enFallback.cta.description },
      buttonText: { fr: dataFr.cta.buttonText, en: enFallback.cta.buttonText }
    }
  };
};

const Restaurants = () => {
  const { currentLang } = useLanguage();
  const langKey = currentLang.code.toLowerCase();
  const [location, navigate] = useLocation();
  const [data, setData] = useState(() => reconstructMixed(splitRestaurantData(restaurantPageData).dataFr, splitRestaurantData(restaurantPageData).dataEn));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = !!localStorage.getItem('userToken');

  // Fetch restaurants data from backend
  useEffect(() => {
    const fetchRestaurantsData = async () => {
      try {
        setLoading(true);
        setError(null);
        const headers = getAuthHeaders();
        let response = await fetch(`/api/globalSections?sectionKey=${SECTION_KEY}`, { headers });
        let sections: any[] = [];
        if (response.ok) {
          sections = await response.json();
        }
        let section = sections.find((s: any) => s.sectionKey === SECTION_KEY);
        if (!section) {
          // Table is empty for this sectionKey, create default
          const { dataFr, dataEn } = splitRestaurantData(restaurantPageData);
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
            throw new Error('Failed to create restaurants data');
          }

          const created = await createResponse.json();
          section = created;
        }

        if (section) {
          const fetchedData = reconstructMixed(section.dataFr, section.dataEn);
          setData(fetchedData);
        } else {
          setData(() => reconstructMixed(splitRestaurantData(restaurantPageData).dataFr, splitRestaurantData(restaurantPageData).dataEn));
        }
      } catch (err) {
        console.error('Error fetching restaurants data:', err);
        setError('Failed to load restaurants data');
        setData(() => reconstructMixed(splitRestaurantData(restaurantPageData).dataFr, splitRestaurantData(restaurantPageData).dataEn));
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantsData();
  }, []);

  // Gestion du défilement automatique pour les ancres
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location]);

  const updateRestaurantsSection = async (updatedMixedData: typeof data) => {
    try {
      const headers = getAuthHeaders();
      let currentSectionResponse = await fetch(`/api/globalSections?sectionKey=${SECTION_KEY}`, { headers });
      let currentData: any[] = [];
      if (currentSectionResponse.ok) {
        currentData = await currentSectionResponse.json();
      }
      let currentSection = currentData.find((s: any) => s.sectionKey === SECTION_KEY);

      if (!currentSection) {
        const { dataFr, dataEn } = splitRestaurantData(restaurantPageData);
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
          throw new Error('Failed to create section for update');
        }
        currentSection = await createResponse.json();
      }

      const { dataFr: updatedDataFr, dataEn: updatedDataEn } = splitRestaurantData(updatedMixedData);

      const putResponse = await fetch(`/api/globalSections/${currentSection.id}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataFr: updatedDataFr,
          dataEn: Object.keys(updatedDataEn).length > 0 ? updatedDataEn : null,
        }),
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update restaurants section');
      }
    } catch (err) {
      console.error('Error updating restaurants section:', err);
    }
  };

  const getText = (textObj: { fr: string; en: string }) => textObj[langKey as keyof typeof textObj];

  const updateHeroField = (field: 'title' | 'description') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        hero: {
          ...data.hero,
          [field]: { fr: newFr, en: newEn },
        },
      };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const updateHeroBackgroundImage = async (newUrl: string) => {
    const updatedData = {
      ...data,
      hero: {
        ...data.hero,
        backgroundImage: newUrl,
      },
    };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
  };

  const updateHeroStat = (statIndex: number, statField: 'number' | 'label') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        hero: {
          ...data.hero,
          stats: data.hero.stats.map((stat, i) =>
            i === statIndex
              ? {
                  ...stat,
                  [statField]: { fr: newFr, en: newEn }
                }
              : stat
          ),
        },
      };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const updateHeroButton = (buttonKey: 'primary' | 'secondary') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        hero: {
          ...data.hero,
          buttonTexts: {
            ...data.hero.buttonTexts,
            [buttonKey]: { fr: newFr, en: newEn },
          },
        },
      };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const updateRestaurantField = (index: number, field: 'name' | 'type' | 'description' | 'detailedDescription' | 'priceRange' | 'hours' | 'capacity' | 'dressCode') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        restaurants: data.restaurants.map((restaurant, i) =>
          i === index
            ? { ...restaurant, [field]: { fr: newFr, en: newEn } }
            : restaurant
        ),
      };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const updateRestaurantSpecialty = (restaurantIndex: number, specialtyIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        restaurants: data.restaurants.map((restaurant, i) =>
          i === restaurantIndex
            ? {
                ...restaurant,
                specialties: restaurant.specialties.map((specialty, j) =>
                  j === specialtyIndex ? { fr: newFr, en: newEn } : specialty
                ),
              }
            : restaurant
        ),
      };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const addRestaurantSpecialty = async (restaurantIndex: number) => {
    const updatedData = {
      ...data,
      restaurants: data.restaurants.map((restaurant, i) =>
        i === restaurantIndex
          ? {
              ...restaurant,
              specialties: [...restaurant.specialties, { fr: "Nouvelle spécialité", en: "New specialty" }],
            }
          : restaurant
      ),
    };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
  };

  const removeRestaurantSpecialty = async (restaurantIndex: number, specialtyIndex: number) => {
    const updatedData = {
      ...data,
      restaurants: data.restaurants.map((restaurant, i) =>
        i === restaurantIndex
          ? {
              ...restaurant,
              specialties: restaurant.specialties.filter((_, j) => j !== specialtyIndex),
            }
          : restaurant
      ),
    };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
  };

  const updateRestaurantFeature = (restaurantIndex: number, featureIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        restaurants: data.restaurants.map((restaurant, i) =>
          i === restaurantIndex
            ? {
                ...restaurant,
                features: restaurant.features.map((feature, j) =>
                  j === featureIndex ? { fr: newFr, en: newEn } : feature
                ),
              }
            : restaurant
        ),
      };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const addRestaurantFeature = async (restaurantIndex: number) => {
    const updatedData = {
      ...data,
      restaurants: data.restaurants.map((restaurant, i) =>
        i === restaurantIndex
          ? {
              ...restaurant,
              features: [...restaurant.features, { fr: "Nouvelle caractéristique", en: "New feature" }],
            }
          : restaurant
      ),
    };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
  };

  const removeRestaurantFeature = async (restaurantIndex: number, featureIndex: number) => {
    const updatedData = {
      ...data,
      restaurants: data.restaurants.map((restaurant, i) =>
        i === restaurantIndex
          ? {
              ...restaurant,
              features: restaurant.features.filter((_, j) => j !== featureIndex),
            }
          : restaurant
      ),
    };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
  };

  const toggleRestaurantHidden = async (index: number) => {
    const updatedData = {
      ...data,
      restaurants: data.restaurants.map((restaurant, i) =>
        i === index ? { ...restaurant, hidden: !restaurant.hidden } : restaurant
      ),
    };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
  };

  const updateRestaurantImage = (index: number) => {
    return async (newUrl: string) => {
      const updatedData = {
        ...data,
        restaurants: data.restaurants.map((restaurant, i) => (i === index ? { ...restaurant, image: newUrl } : restaurant)),
      };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const updateCtaField = (field: 'title' | 'description' | 'buttonText') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        cta: {
          ...data.cta,
          [field]: { fr: newFr, en: newEn },
        },
      };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const addRestaurant = async () => {
    let newRestaurant;
    if (data.restaurants.length > 0) {
      const maxId = Math.max(...data.restaurants.map((r: any) => r.id));
      newRestaurant = {
        ...data.restaurants[0],
        id: maxId + 1,
        name: { fr: "Nouveau Restaurant", en: "New Restaurant" },
        hidden: false,
      };
    } else {
      newRestaurant = {
        id: 1,
        name: { fr: "Nouveau Restaurant", en: "New Restaurant" },
        type: { fr: "Type de restaurant", en: "Restaurant Type" },
        description: { fr: "Description du restaurant.", en: "Restaurant description." },
        detailedDescription: { fr: "Description détaillée.", en: "Detailed description." },
        image: '/uploads/Restaurant.png',
        rating: 4,
        priceRange: { fr: "€€€", en: "€€€" },
        hours: { fr: "Horaires", en: "Hours" },
        capacity: { fr: "Capacité", en: "Capacity" },
        reservationRequired: false,
        dressCode: { fr: "", en: "" },
        specialties: [{ fr: "Spécialité 1", en: "Specialty 1" }],
        features: [{ fr: "Caractéristique 1", en: "Feature 1" }],
        hidden: false
      };
    }
    const updatedData = {
      ...data,
      restaurants: [...data.restaurants, newRestaurant],
    };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
  };

  const removeRestaurant = async (id: number) => {
    const updatedData = {
      ...data,
      restaurants: data.restaurants.filter((restaurant) => restaurant.id !== id),
    };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
  };

  // Fonction pour le défilement personnalisé
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Fonction pour naviguer avec hash
  const navigateWithHash = (sectionId: string) => {
    navigate(`/restaurants#${sectionId}`);
    // Le défilement sera géré par le useEffect
  };

  const addRestaurantCard = (
    <Card className="border-2 border-dashed border-muted-foreground hover:border-primary transition-colors flex flex-col">
      <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Button
          variant="outline"
          size="lg"
          onClick={addRestaurant}
          className="mb-4 rounded-full w-16 h-16 p-0"
        >
          <Plus className="w-6 h-6" />
        </Button>
        <p className="text-muted-foreground">
          {currentLang.code === 'fr' ? 'Ajouter un nouveau restaurant' : 'Add a new restaurant'}
        </p>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <ParallaxSection
          backgroundImage={data.hero.backgroundImage || "/uploads/generated_images/Luxury_hotel_restaurant_interior_090ad235.png"}
          parallaxSpeed={0.4}
          minHeight="100vh"
          overlay={true}
          overlayOpacity={0.6}
          className="flex items-center pt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white animate-pulse">
            <div className="h-20 w-full bg-muted/20 mb-8" />
            <div className="h-8 w-96 bg-muted/20 mx-auto mb-8" />
            <div className="h-12 w-80 bg-muted/20 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {[1,2,3,4].map((i) => (
                <div key={i} className="text-center">
                  <div className="h-8 w-8 bg-muted/20 rounded mx-auto mb-2" />
                  <div className="h-6 w-24 bg-muted/20 mx-auto" />
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="h-12 w-48 bg-muted/20" />
              <div className="h-12 w-40 bg-muted/20" />
            </div>
          </div>
        </ParallaxSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {[1,2,3,4].map((i) => (
                <div key={i} className="flex flex-col lg:flex animate-pulse">
                  <div className="lg:w-1/2">
                    <div className="w-full h-80 lg:h-full bg-muted rounded-lg" />
                  </div>
                  <div className="lg:w-1/2 p-8 space-y-6">
                    <div className="h-4 w-32 bg-muted mb-4" />
                    <div className="h-6 w-64 bg-muted mb-3" />
                    <div className="flex flex-wrap gap-4">
                      <div className="h-4 w-48 bg-muted" />
                      <div className="h-4 w-32 bg-muted" />
                    </div>
                    <div className="h-20 w-full bg-muted mb-6" />
                    <div className="h-32 w-full bg-muted mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-muted" />
                        {[1,2,3].map((j) => <div key={j} className="h-3 w-full bg-muted" />)}
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-muted" />
                        {[1,2,3].map((j) => <div key={j} className="h-3 w-full bg-muted" />)}
                      </div>
                    </div>
                    <div className="h-16 w-full bg-muted rounded-lg" />
                  </div>
                </div>
              ))}
              {isAdmin && (
                <div className="flex justify-center">
                  <div className="h-64 w-full max-w-md bg-muted rounded-lg" />
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-pulse">
            <div className="h-12 w-64 bg-muted mx-auto mb-6" />
            <div className="h-6 w-80 bg-muted mx-auto mb-8" />
            <div className="h-12 w-48 bg-muted mx-auto" />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.warn(error);
  }

  const { hero, restaurants, cta } = data;

  const isFr = currentLang.code === 'fr';

  return (
    <div className="min-h-screen bg-background">
      {/* Style pour le défilement fluide */}
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
      
      {/* Parallax Hero Section */}
      <div className="relative">
        <ParallaxSection
          backgroundImage={hero.backgroundImage}
          parallaxSpeed={0.4}
          minHeight="100vh"
          overlay={true}
          overlayOpacity={0.6}
          className="flex items-center pt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <Tooltip
              frLabel={hero.title.fr}
              enLabel={hero.title.en}
              onSave={updateHeroField('title')}
            >
              <h1 className="text-6xl md:text-7xl font-serif font-bold mb-8 drop-shadow-lg">
                {formatAmpersand(getText(hero.title))}
              </h1>
            </Tooltip>
            <div className="w-32 h-1 bg-primary mx-auto mb-8"></div>
            <Tooltip
              frLabel={hero.description.fr}
              enLabel={hero.description.en}
              onSave={updateHeroField('description')}
            >
              <p className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed drop-shadow-lg mb-12">
                {getText(hero.description)}
              </p>
            </Tooltip>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {hero.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {(() => {
                      const Icon = stat.icon === 'Utensils' ? Utensils : stat.icon === 'Star' ? Star : stat.icon === 'Clock' ? Clock : Sparkles;
                      return (
                        <>
                          <div className="mb-2">
                            <Icon className="w-8 h-8 mx-auto block" />
                          </div>
                          <Tooltip
                            frLabel={stat.number.fr}
                            enLabel={stat.number.en}
                            onSave={updateHeroStat(index, 'number')}
                          >
                            <div className="block">{getText(stat.number)}</div>
                          </Tooltip>
                        </>
                      );
                    })()}
                  </div>
                  <Tooltip
                    frLabel={stat.label.fr}
                    enLabel={stat.label.en}
                    onSave={updateHeroStat(index, 'label')}
                  >
                    <div className="text-lg">{getText(stat.label)}</div>
                  </Tooltip>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => navigateWithHash('bistrot')}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
              >
                <Tooltip
                  frLabel={hero.buttonTexts.primary.fr}
                  enLabel={hero.buttonTexts.primary.en}
                  onSave={updateHeroButton('primary')}
                >
                  <span>{getText(hero.buttonTexts.primary)}</span>
                </Tooltip>
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors shadow-lg"
              >
                <Tooltip
                  frLabel={hero.buttonTexts.secondary.fr}
                  enLabel={hero.buttonTexts.secondary.en}
                  onSave={updateHeroButton('secondary')}
                >
                  <span>{getText(hero.buttonTexts.secondary)}</span>
                </Tooltip>
              </button>
            </div>
          </div>
        </ParallaxSection>
        {isAdmin && (
          <div className="absolute top-4 left-4 z-50">
            <ImageTooltip
              imageUrl={hero.backgroundImage}
              onSave={updateHeroBackgroundImage}
            >
              <Button
                variant="ghost"
                size="sm"
                className="bg-background/80 backdrop-blur-sm text-foreground border border-border/50 hover:bg-background"
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                {isFr ? 'Éditer fond' : 'Edit bg'}
              </Button>
            </ImageTooltip>
          </div>
        )}
      </div>

      {/* Restaurants Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {restaurants.map((restaurant, index) => {
              if (!isAdmin && restaurant.hidden) return null;
              const anchorId = restaurant.name.fr === "Le Bistrot du Carlton" ? "bistrot" :
                              restaurant.name.fr === "Ile Rouge & la Terrasse" ? "ile-rouge" :
                              restaurant.name.fr === "L'Oasis de Tana" ? "oasis" : "eclair";
              const direction = index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse';
              return (
                <Card 
                  key={restaurant.id} 
                  id={anchorId}
                  className={`relative overflow-hidden hover-elevate transition-all duration-300 ${direction} flex flex-col lg:flex ${restaurant.hidden ? 'opacity-50' : ''}`}
                  data-testid={`card-restaurant-${restaurant.id}`}
                >
                  {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRestaurantHidden(index)}
                        title={restaurant.hidden ? (isFr ? 'Afficher' : 'Show') : (isFr ? 'Masquer' : 'Hide')}
                      >
                        {restaurant.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRestaurant(restaurant.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <div className="lg:w-1/2 flex">
                    <ImageTooltip
                      imageUrl={restaurant.image}
                      onSave={updateRestaurantImage(index)}
                    >
                      <div className="w-full h-80 lg:h-full relative">
                        <img 
                          src={restaurant.image} 
                          alt={getText(restaurant.name)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </ImageTooltip>
                  </div>
                  
                  <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                      <CardHeader className="p-0 mb-6">
                        <div className="mb-2">
                          <Tooltip
                            frLabel={restaurant.type.fr}
                            enLabel={restaurant.type.en}
                            onSave={updateRestaurantField(index, 'type')}
                          >
                            <Badge variant="outline" className="text-primary border-primary">
                              {getText(restaurant.type)}
                            </Badge>
                          </Tooltip>
                        </div>
                        <Tooltip
                          frLabel={restaurant.name.fr}
                          enLabel={restaurant.name.en}
                          onSave={updateRestaurantField(index, 'name')}
                        >
                          <CardTitle className="text-3xl font-serif text-foreground mb-3">
                            {formatAmpersand(getText(restaurant.name))}
                          </CardTitle>
                        </Tooltip>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <Tooltip
                              frLabel={restaurant.hours.fr}
                              enLabel={restaurant.hours.en}
                              onSave={updateRestaurantField(index, 'hours')}
                            >
                              <span>{getText(restaurant.hours)}</span>
                            </Tooltip>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <Tooltip
                              frLabel={restaurant.capacity.fr}
                              enLabel={restaurant.capacity.en}
                              onSave={updateRestaurantField(index, 'capacity')}
                            >
                              <span>{getText(restaurant.capacity)}</span>
                            </Tooltip>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-0 space-y-6">
                        <Tooltip
                          frLabel={restaurant.description.fr}
                          enLabel={restaurant.description.en}
                          onSave={updateRestaurantField(index, 'description')}
                        >
                          <p className="text-muted-foreground leading-relaxed">
                            {getText(restaurant.description)}
                          </p>
                        </Tooltip>
                        
                        <Tooltip
                          frLabel={restaurant.detailedDescription.fr}
                          enLabel={restaurant.detailedDescription.en}
                          onSave={updateRestaurantField(index, 'detailedDescription')}
                        >
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {getText(restaurant.detailedDescription)}
                          </p>
                        </Tooltip>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              {isFr ? 'Spécialités' : 'Specialties'}
                            </h4>
                            <div className="space-y-1">
                              {restaurant.specialties.map((specialty, sIndex) => (
                                <div key={sIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <div className="flex-1">
                                    <Tooltip
                                      frLabel={specialty.fr}
                                      enLabel={specialty.en}
                                      onSave={updateRestaurantSpecialty(index, sIndex)}
                                    >
                                      <span className="block">{getText(specialty)}</span>
                                    </Tooltip>
                                  </div>
                                  {isAdmin && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeRestaurantSpecialty(index, sIndex)}
                                      className="h-6 w-6 p-0"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                              {isAdmin && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addRestaurantSpecialty(index)}
                                  className="mt-2"
                                >
                                  <Plus className="w-4 h-4 mr-1" />
                                  {isFr ? 'Ajouter une spécialité' : 'Add a specialty'}
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Utensils className="w-4 h-4" />
                              {isFr ? 'Services' : 'Services'}
                            </h4>
                            <div className="space-y-1">
                              {restaurant.features.map((feature, fIndex) => (
                                <div key={fIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <div className="flex-1">
                                    <Tooltip
                                      frLabel={feature.fr}
                                      enLabel={feature.en}
                                      onSave={updateRestaurantFeature(index, fIndex)}
                                    >
                                      <span className="block">{getText(feature)}</span>
                                    </Tooltip>
                                  </div>
                                  {isAdmin && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeRestaurantFeature(index, fIndex)}
                                      className="h-6 w-6 p-0"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                              {isAdmin && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addRestaurantFeature(index)}
                                  className="mt-2"
                                >
                                  <Plus className="w-4 h-4 mr-1" />
                                  {isFr ? 'Ajouter un service' : 'Add a service'}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-card/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>{isFr ? ' :' : ' '}</strong>
                            <Tooltip
                              frLabel={restaurant.dressCode.fr}
                              enLabel={restaurant.dressCode.en}
                              onSave={updateRestaurantField(index, 'dressCode')}
                            >
                              <span className="ml-1">{getText(restaurant.dressCode)}</span>
                            </Tooltip>
                          </p>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              );
            })}
            {isAdmin && addRestaurantCard}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Tooltip
            frLabel={cta.title.fr}
            enLabel={cta.title.en}
            onSave={updateCtaField('title')}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">
              {getText(cta.title)}
            </h2>
          </Tooltip>
          <Tooltip
            frLabel={cta.description.fr}
            enLabel={cta.description.en}
            onSave={updateCtaField('description')}
          >
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {getText(cta.description)}
            </p>
          </Tooltip>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            <Tooltip
              frLabel={cta.buttonText.fr}
              enLabel={cta.buttonText.en}
              onSave={updateCtaField('buttonText')}
            >
              <span>{getText(cta.buttonText)}</span>
            </Tooltip>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Restaurants;