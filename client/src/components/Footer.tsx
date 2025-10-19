// src/components/Footer.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tooltip } from '@/components/Tooltip';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'wouter';
import { footerData } from '@/data/footerData';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { useLanguage } from './context/LanguageContext';

const SECTION_KEY = 'footer';

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const Footer = () => {
  const { currentLang } = useLanguage();
  const langKey = currentLang.code.toLowerCase();
  const [data, setData] = useState(footerData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to split footerData into dataFr and dataEn structures
  const splitFooterData = (mixedData: typeof footerData) => {
    const dataFr = {
      hotel: {
        title: mixedData.hotel.title,
        description: mixedData.hotel.description.fr,
        newsletter: {
          title: mixedData.hotel.newsletter.title.fr,
          description: mixedData.hotel.newsletter.description.fr,
          placeholder: mixedData.hotel.newsletter.placeholder.fr,
          button: mixedData.hotel.newsletter.button.fr
        }
      },
      sections: mixedData.sections.map((section) => ({
        title: section.title.fr,
        links: section.links.map((link) => ({
          label: link.label.fr,
          href: link.href
        }))
      })),
      contact: {
        address: {
          title: mixedData.contact.address.title.fr,
          details: mixedData.contact.address.details.fr
        },
        phone: {
          title: mixedData.contact.phone.title.fr,
          details: mixedData.contact.phone.details
        },
        email: {
          title: mixedData.contact.email.title.fr,
          details: mixedData.contact.email.details
        },
        reception: {
          title: mixedData.contact.reception.title.fr,
          details: mixedData.contact.reception.details.fr
        }
      },
      bottom: {
        copyright: mixedData.bottom.copyright.fr,
        rating: mixedData.bottom.rating.fr,
        follow: mixedData.bottom.follow.fr
      },
      social: mixedData.social.map((social) => ({
        icon: social.icon,
        href: social.href,
        label: social.label.fr
      })),
      logos: mixedData.logos
    };

    const dataEn = {
      hotel: {
        title: mixedData.hotel.title,
        description: mixedData.hotel.description.en,
        newsletter: {
          title: mixedData.hotel.newsletter.title.en,
          description: mixedData.hotel.newsletter.description.en,
          placeholder: mixedData.hotel.newsletter.placeholder.en,
          button: mixedData.hotel.newsletter.button.en
        }
      },
      sections: mixedData.sections.map((section) => ({
        title: section.title.en,
        links: section.links.map((link) => ({
          label: link.label.en,
          href: link.href
        }))
      })),
      contact: {
        address: {
          title: mixedData.contact.address.title.en,
          details: mixedData.contact.address.details.en
        },
        phone: {
          title: mixedData.contact.phone.title.en,
          details: mixedData.contact.phone.details
        },
        email: {
          title: mixedData.contact.email.title.en,
          details: mixedData.contact.email.details
        },
        reception: {
          title: mixedData.contact.reception.title.en,
          details: mixedData.contact.reception.details.en
        }
      },
      bottom: {
        copyright: mixedData.bottom.copyright.en,
        rating: mixedData.bottom.rating.en,
        follow: mixedData.bottom.follow.en
      },
      social: mixedData.social.map((social) => ({
        icon: social.icon,
        href: social.href,
        label: social.label.en
      })),
      logos: mixedData.logos
    };

    return { dataFr, dataEn };
  };

  // Reconstruct mixed data from dataFr and dataEn
  const reconstructMixed = (dataFr: any, dataEn: any | null) => {
    if (!dataFr || typeof dataFr !== 'object') {
      console.warn('Invalid dataFr structure, falling back to default');
      return footerData;
    }
    const enFallback = dataEn || dataFr;
    const mixed = {
      hotel: {
        title: dataFr.hotel.title,
        description: { fr: dataFr.hotel.description, en: enFallback.hotel?.description || dataFr.hotel.description },
        newsletter: {
          title: { fr: dataFr.hotel.newsletter.title, en: enFallback.hotel?.newsletter?.title || dataFr.hotel.newsletter.title },
          description: { fr: dataFr.hotel.newsletter.description, en: enFallback.hotel?.newsletter?.description || dataFr.hotel.newsletter.description },
          placeholder: { fr: dataFr.hotel.newsletter.placeholder, en: enFallback.hotel?.newsletter?.placeholder || dataFr.hotel.newsletter.placeholder },
          button: { fr: dataFr.hotel.newsletter.button, en: enFallback.hotel?.newsletter?.button || dataFr.hotel.newsletter.button }
        }
      },
      sections: dataFr.sections.map((sectionFr: any, i: number) => ({
        title: { fr: sectionFr.title, en: enFallback.sections[i]?.title || sectionFr.title },
        links: sectionFr.links.map((linkFr: any, j: number) => ({
          label: { fr: linkFr.label, en: enFallback.sections[i]?.links[j]?.label || linkFr.label },
          href: linkFr.href
        }))
      })),
      contact: {
        address: {
          title: { fr: dataFr.contact.address.title, en: enFallback.contact?.address?.title || dataFr.contact.address.title },
          details: { fr: dataFr.contact.address.details, en: enFallback.contact?.address?.details || dataFr.contact.address.details }
        },
        phone: {
          title: { fr: dataFr.contact.phone.title, en: enFallback.contact?.phone?.title || dataFr.contact.phone.title },
          details: dataFr.contact.phone.details
        },
        email: {
          title: { fr: dataFr.contact.email.title, en: enFallback.contact?.email?.title || dataFr.contact.email.title },
          details: dataFr.contact.email.details
        },
        reception: {
          title: { fr: dataFr.contact.reception.title, en: enFallback.contact?.reception?.title || dataFr.contact.reception.title },
          details: { fr: dataFr.contact.reception.details, en: enFallback.contact?.reception?.details || dataFr.contact.reception.details }
        }
      },
      bottom: {
        copyright: { fr: dataFr.bottom.copyright, en: enFallback.bottom?.copyright || dataFr.bottom.copyright },
        rating: { fr: dataFr.bottom.rating, en: enFallback.bottom?.rating || dataFr.bottom.rating },
        follow: { fr: dataFr.bottom.follow, en: enFallback.bottom?.follow || dataFr.bottom.follow }
      },
      social: dataFr.social.map((socialFr: any, i: number) => ({
        icon: socialFr.icon,
        href: socialFr.href,
        label: { fr: socialFr.label, en: enFallback.social[i]?.label || socialFr.label }
      })),
      logos: dataFr.logos
    };
    return mixed;
  };

  // Fetch footer data from backend
  useEffect(() => {
    const fetchFooterData = async () => {
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
          const { dataFr, dataEn } = splitFooterData(footerData);
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
            throw new Error('Failed to create footer data');
          }

          const created = await createResponse.json();
          section = created; // Assume POST returns the created object
        }

        if (section) {
          const fetchedData = reconstructMixed(section.dataFr, section.dataEn);
          setData(fetchedData);
        } else {
          setData(footerData);
        }
      } catch (err) {
        console.error('Error fetching footer data:', err);
        setError('Failed to load footer data');
        // Fallback to default
        setData(footerData);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  const updateFooterSection = async (updatedMixedData: typeof footerData) => {
    try {
      const headers = getAuthHeaders();
      const currentSectionResponse = await fetch(`/api/globalSections?sectionKey=${SECTION_KEY}`, { headers });
      let currentData: any[] = [];
      if (currentSectionResponse.ok) {
        currentData = await currentSectionResponse.json();
      }
      let currentSection = currentData.find((s: any) => s.sectionKey === SECTION_KEY);

      if (!currentSection) {
        // Should not happen after initial load, but create if missing
        const { dataFr, dataEn } = splitFooterData(footerData);
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

      const { dataFr: updatedDataFr, dataEn: updatedDataEn } = splitFooterData(updatedMixedData);

      const putResponse = await fetch(`/api/globalSections/${currentSection.id}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataFr: updatedDataFr,
          dataEn: Object.keys(updatedDataEn).length > 0 ? updatedDataEn : null
        })
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update footer section');
      }
    } catch (err) {
      console.error('Error updating footer section:', err);
      // Revert local state on error if needed, but for simplicity, keep it
    }
  };

  const updateHotelDescription = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      hotel: {
        ...data.hotel,
        description: { fr: newFr, en: newEn }
      }
    };
    setData(updatedData);
    await updateFooterSection(updatedData);
  };

  const updateNewsletterField = (field: 'title' | 'description' | 'placeholder' | 'button') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        hotel: {
          ...data.hotel,
          newsletter: {
            ...data.hotel.newsletter,
            [field]: { fr: newFr, en: newEn }
          }
        }
      };
      setData(updatedData);
      await updateFooterSection(updatedData);
    };
  };

  const updateSectionTitle = (sectionIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        sections: data.sections.map((section, i) =>
          i === sectionIndex
            ? { ...section, title: { fr: newFr, en: newEn } }
            : section
        )
      };
      setData(updatedData);
      await updateFooterSection(updatedData);
    };
  };

  const updateLinkLabel = (sectionIndex: number, linkIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        sections: data.sections.map((section, i) =>
          i === sectionIndex
            ? {
                ...section,
                links: section.links.map((link, j) =>
                  j === linkIndex
                    ? { ...link, label: { fr: newFr, en: newEn } }
                    : link
                )
              }
            : section
        )
      };
      setData(updatedData);
      await updateFooterSection(updatedData);
    };
  };

  const updateContactTitle = (key: keyof typeof data.contact) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        contact: {
          ...data.contact,
          [key]: {
            ...data.contact[key],
            title: { fr: newFr, en: newEn }
          }
        }
      };
      setData(updatedData);
      await updateFooterSection(updatedData);
    };
  };

  const updateContactDetails = (key: keyof typeof data.contact, isBilingual: boolean) => {
    return async (newFr: string, newEn?: string) => {
      const updatedData = {
        ...data,
        contact: {
          ...data.contact,
          [key]: {
            ...data.contact[key],
            details: isBilingual
              ? { fr: newFr, en: newEn || newFr }
              : newFr
          }
        }
      };
      setData(updatedData);
      await updateFooterSection(updatedData);
    };
  };

  const updateBottomField = (field: keyof typeof data.bottom) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        bottom: {
          ...data.bottom,
          [field]: { fr: newFr, en: newEn }
        }
      };
      setData(updatedData);
      await updateFooterSection(updatedData);
    };
  };

  const updateSocialLabel = (index: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        social: data.social.map((social, i) =>
          i === index
            ? { ...social, label: { fr: newFr, en: newEn } }
            : social
        )
      };
      setData(updatedData);
      await updateFooterSection(updatedData);
    };
  };

  const { hotel, sections, contact, bottom, social, logos } = data;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription submitted');
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Facebook': return <Facebook className="w-4 h-4" />;
      case 'Instagram': return <Instagram className="w-4 h-4" />;
      case 'Twitter': return <Twitter className="w-4 h-4" />;
      case 'Linkedin': return <Linkedin className="w-4 h-4" />;
      default: return null;
    }
  };

  const getContactIcon = (key: string) => {
    switch (key) {
      case 'address': return <MapPin className="w-5 h-5" />;
      case 'phone': return <Phone className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'reception': return <Clock className="w-5 h-5" />;
      default: return null;
    }
  };

  const currentHotelDescription = hotel.description[langKey];
  const currentNewsletterTitle = hotel.newsletter.title[langKey];
  const currentNewsletterDescription = hotel.newsletter.description[langKey];
  const currentNewsletterPlaceholder = hotel.newsletter.placeholder[langKey];
  const currentNewsletterButton = hotel.newsletter.button[langKey];
  const currentCopyright = bottom.copyright[langKey];
  const currentRating = bottom.rating[langKey];
  const currentFollow = bottom.follow[langKey];

  if (loading) {
    return (
      <footer className="bg-sidebar border-t border-sidebar-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-pulse">
            <div className="space-y-4">
              <div className="bg-sidebar-accent h-8 w-48 rounded" />
              <div className="bg-sidebar-accent h-4 w-64 rounded" />
              <div className="space-y-2">
                <div className="bg-sidebar-accent h-4 w-32 rounded" />
                <div className="bg-sidebar-accent h-4 w-96 rounded" />
                <div className="flex gap-2">
                  <div className="bg-sidebar-accent h-10 flex-1 rounded" />
                  <div className="bg-sidebar-accent h-10 w-24 rounded" />
                </div>
              </div>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="bg-sidebar-accent h-5 w-32 rounded" />
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="bg-sidebar-accent h-4 w-24 rounded" />
                ))}
              </div>
            ))}
          </div>
        </div>
        <Separator className="bg-sidebar-border" />
        <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="bg-sidebar-accent h-5 w-5 rounded" />
                <div className="space-y-1">
                  <div className="bg-sidebar-accent h-4 w-20 rounded" />
                  <div className="bg-sidebar-accent h-4 w-40 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Separator className="bg-sidebar-border" />
        <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="bg-sidebar-accent h-4 w-48 rounded" />
            <div className="bg-sidebar-accent h-4 w-24 rounded" />
            <div className="bg-sidebar-accent h-12 w-24 rounded" />
            <div className="bg-sidebar-accent h-12 w-32 rounded" />
            <div className="flex gap-4">
              <div className="bg-sidebar-accent h-4 w-16 rounded mr-2" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-sidebar-accent h-8 w-8 rounded" />
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (error) {
    console.warn(error);
  }

  return (
    <footer className="bg-sidebar border-t border-sidebar-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Hotel Info & Newsletter */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-bold text-sidebar-foreground mb-4">
                  {hotel.title}
                </h3>
                <Tooltip
                  frLabel={hotel.description.fr}
                  enLabel={hotel.description.en}
                  onSave={updateHotelDescription}
                >
                  <p className="text-sidebar-foreground/80 mb-6">
                    {currentHotelDescription}
                  </p>
                </Tooltip>
              </div>
              
              {/* Newsletter */}
              <div>
                <Tooltip
                  frLabel={hotel.newsletter.title.fr}
                  enLabel={hotel.newsletter.title.en}
                  onSave={updateNewsletterField('title')}
                >
                  <h4 className="font-semibold text-sidebar-foreground mb-3">
                    {currentNewsletterTitle}
                  </h4>
                </Tooltip>
                <Tooltip
                  frLabel={hotel.newsletter.description.fr}
                  enLabel={hotel.newsletter.description.en}
                  onSave={updateNewsletterField('description')}
                >
                  <p className="text-sm text-sidebar-foreground/70 mb-4">
                    {currentNewsletterDescription}
                  </p>
                </Tooltip>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder={currentNewsletterPlaceholder}
                    className="flex-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
                    data-testid="input-newsletter"
                  />
                  <Button type="submit" size="sm" data-testid="button-newsletter">
                    {currentNewsletterButton}
                  </Button>
                </form>
              </div>
            </div>

            {/* Footer Links */}
            {sections.map((section, index) => (
              <div key={index}>
                <Tooltip
                  frLabel={section.title.fr}
                  enLabel={section.title.en}
                  onSave={updateSectionTitle(index)}
                >
                  <h4 className="font-semibold text-sidebar-foreground mb-4">
                    {section.title[langKey]}
                  </h4>
                </Tooltip>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Tooltip
                        frLabel={link.label.fr}
                        enLabel={link.label.en}
                        onSave={updateLinkLabel(index, linkIndex)}
                      >
                        <Link 
                          href={link.href}
                          className="text-sidebar-foreground/70 hover:text-primary transition-colors text-sm"
                          data-testid={`link-footer-${link.href.slice(1)}`}
                        >
                          {formatAmpersand(link.label[langKey])}
                        </Link>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Contact Info */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(contact).map(([key, info]) => {
              const contactKey = key as keyof typeof contact;
              const currentTitle = info.title[langKey];
              const currentDetails = typeof info.details === 'string' 
                ? info.details 
                : info.details[langKey];
              const isBilingualDetails = typeof info.details !== 'string';
              return (
                <div key={key} className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {getContactIcon(key)}
                  </div>
                  <div>
                    <Tooltip
                      frLabel={info.title.fr}
                      enLabel={info.title.en}
                      onSave={updateContactTitle(contactKey)}
                    >
                      <p className="text-sm font-medium text-sidebar-foreground mx-2">{currentTitle}</p>
                    </Tooltip>
                    <Tooltip
                      frLabel={typeof info.details === 'string' ? info.details : info.details.fr}
                      enLabel={isBilingualDetails ? info.details.en : undefined}
                      onSave={isBilingualDetails ? updateContactDetails(contactKey, true) : undefined}
                    >
                      <p 
                        className="text-sm text-sidebar-foreground/70"
                        dangerouslySetInnerHTML={{ __html: currentDetails }}
                      />
                    </Tooltip>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Tooltip
              frLabel={bottom.copyright.fr}
              enLabel={bottom.copyright.en}
              onSave={updateBottomField('copyright')}
            >
              <p className="text-sm text-sidebar-foreground/70">
                {currentCopyright}
              </p>
            </Tooltip>
            
            <Tooltip
              frLabel={bottom.rating.fr}
              enLabel={bottom.rating.en}
              onSave={updateBottomField('rating')}
            >
              <span>{currentRating}</span>
            </Tooltip>
            
            <img 
              src={logos.iPrefer} 
              alt="I Prefer Hotel Rewards"
              className="h-12 opacity-80 hover:opacity-100 transition-opacity"
              data-testid="logo-iprefer"
            />
            
            <img 
              src={logos.preferredLifestyle} 
              alt="Preferred Lifestyle"
              className="h-12 opacity-80 hover:opacity-100 transition-opacity filter invert"
              data-testid="logo-preferred-lifestyle"
            />
            
            <div className="flex items-center gap-4">
              <Tooltip
                frLabel={bottom.follow.fr}
                enLabel={bottom.follow.en}
                onSave={updateBottomField('follow')}
              >
                <span className="text-sm text-sidebar-foreground/70 mr-2">{currentFollow}</span>
              </Tooltip>
              {social.map((socialItem, index) => (
                <Tooltip
                  key={index}
                  frLabel={socialItem.label.fr}
                  enLabel={socialItem.label.en}
                  onSave={updateSocialLabel(index)}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 text-sidebar-foreground/70 hover:text-primary"
                    data-testid={`button-social-${socialItem.label[langKey].toLowerCase()}`}
                  >
                    {getSocialIcon(socialItem.icon)}
                    <span className="sr-only">{socialItem.label[langKey]}</span>
                  </Button>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;