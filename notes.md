// src/components/HeroSection.tsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';
import { Play, ChevronLeft, ChevronRight, Pause } from 'lucide-react';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { heroSectionData } from '@/data/heroSectionData';
import { useLanguage } from './context/LanguageContext';
import hotelExterior from '@assets/generated_images/Carlton_hotel_exterior_view_8ca3b91a.png';

const SECTION_KEY = 'hero';

const slidePaths = ["/contact", "/chambres", "/galerie", "/restaurants", "/evenements", "/bien-etre-loisirs"];

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const HeroSection = () => {
  const { currentLang } = useLanguage();
  const langKey = currentLang.code.toLowerCase();
  const [data, setData] = useState(heroSectionData);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Configuration du carousel
  const AUTO_PLAY_INTERVAL = 1000; // 5 secondes entre chaque slide
  const TRANSITION_DURATION = 700; // Durée de la transition en ms

  // Helper to split heroSectionData into dataFr and dataEn structures
  const splitHeroData = (mixedData: typeof heroSectionData) => {
    const dataFr = {
      slides: mixedData.slides.map((slide) => ({
        image: slide.image,
        title: slide.title.fr,
        subtitle: slide.subtitle.fr,
        description: slide.description.fr,
        buttons: {
          primary: slide.buttons.primary.fr,
        },
      })),
      badge: {
        stars: mixedData.badge.stars,
        text: mixedData.badge.text.fr,
      },
      scroll: mixedData.scroll.fr,
    };

    const dataEn = {
      slides: mixedData.slides.map((slide) => ({
        image: slide.image,
        title: slide.title.en,
        subtitle: slide.subtitle.en,
        description: slide.description.en,
        buttons: {
          primary: slide.buttons.primary.en,
        },
      })),
      badge: {
        stars: mixedData.badge.stars,
        text: mixedData.badge.text.en,
      },
      scroll: mixedData.scroll.en,
    };

    return { dataFr, dataEn };
  };

  // Reconstruct mixed data from dataFr and dataEn
  const reconstructMixed = (dataFr: any, dataEn: any | null) => {
    if (!dataFr || typeof dataFr !== 'object' || !Array.isArray(dataFr.slides)) {
      console.warn('Invalid dataFr structure, falling back to default');
      return heroSectionData;
    }
    const enFallback = dataEn || dataFr;
    const mixed = {
      slides: dataFr.slides.map((slideFr: any, i: number) => {
        const slideEn = enFallback.slides[i];
        return {
          image: slideFr.image || heroSectionData.slides[i].image,
          title: { fr: slideFr.title, en: slideEn?.title || slideFr.title },
          subtitle: { fr: slideFr.subtitle, en: slideEn?.subtitle || slideFr.subtitle },
          description: { fr: slideFr.description, en: slideEn?.description || slideFr.description },
          buttons: {
            primary: { 
              fr: slideFr.buttons?.primary || heroSectionData.slides[i].buttons.primary.fr, 
              en: slideEn?.buttons?.primary || slideFr.buttons?.primary || heroSectionData.slides[i].buttons.primary.en 
            },
          },
        };
      }),
      badge: {
        stars: dataFr.badge?.stars || heroSectionData.badge.stars,
        text: { 
          fr: dataFr.badge?.text || heroSectionData.badge.text.fr, 
          en: enFallback.badge?.text || dataFr.badge?.text || heroSectionData.badge.text.en 
        },
      },
      scroll: { 
        fr: dataFr.scroll || heroSectionData.scroll.fr, 
        en: enFallback.scroll || dataFr.scroll || heroSectionData.scroll.en 
      },
    };
    return mixed;
  };

  // Fetch hero data from backend
  useEffect(() => {
    const fetchHeroData = async () => {
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
          const { dataFr, dataEn } = splitHeroData(heroSectionData);
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
            throw new Error('Failed to create hero data');
          }

          const created = await createResponse.json();
          section = created;
        }

        if (section) {
          const fetchedData = reconstructMixed(section.dataFr, section.dataEn);
          setData(fetchedData);
        } else {
          setData(heroSectionData);
        }
      } catch (err) {
        console.error('Error fetching hero data:', err);
        setError('Failed to load hero data');
        setData(heroSectionData);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Auto-play functionality for carousel
  useEffect(() => {
    if (isPaused || loading) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        handleNextSlide();
      }, AUTO_PLAY_INTERVAL);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [data.slides.length, isPaused, loading]);

  // Mouse detection for arrow visibility and pause functionality
  useEffect(() => {
    const handleMouseEnter = () => {
      setIsPaused(true);
      setShowArrows(true);
    };

    const handleMouseLeave = () => {
      setIsPaused(false);
      setShowArrows(false);
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mouseenter', handleMouseEnter);
      heroElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mouseenter', handleMouseEnter);
        heroElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const updateHeroSection = async (updatedMixedData: typeof heroSectionData) => {
    try {
      const headers = getAuthHeaders();
      const currentSectionResponse = await fetch(`/api/globalSections?sectionKey=${SECTION_KEY}`, { headers });
      let currentData: any[] = [];
      if (currentSectionResponse.ok) {
        currentData = await currentSectionResponse.json();
      }
      let currentSection = currentData.find((s: any) => s.sectionKey === SECTION_KEY);

      if (!currentSection) {
        const { dataFr, dataEn } = splitHeroData(heroSectionData);
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

      const { dataFr: updatedDataFr, dataEn: updatedDataEn } = splitHeroData(updatedMixedData);

      const putResponse = await fetch(`/api/globalSections/${currentSection.id}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataFr: updatedDataFr,
          dataEn: Object.keys(updatedDataEn).length > 0 ? updatedDataEn : null
        })
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update hero section');
      }
    } catch (err) {
      console.error('Error updating hero section:', err);
    }
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % data.slides.length);
    
    // Reset auto-play timer on manual navigation
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + data.slides.length) % data.slides.length);
    
    // Reset auto-play timer on manual navigation
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    // Reset auto-play timer on manual navigation
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  };

  const currentSlideData = data.slides[currentSlide];
  const currentTitle = currentSlideData.title[langKey];
  const currentSubtitle = currentSlideData.subtitle[langKey];
  const currentDescription = currentSlideData.description[langKey];
  const currentBadgeText = data.badge.text[langKey];
  const currentPrimaryButton = currentSlideData.buttons.primary[langKey];
  const currentScroll = data.scroll[langKey];

  const updateSlideField = (index: number, field: 'title' | 'subtitle' | 'description') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        slides: data.slides.map((slide, i) =>
          i === index
            ? { ...slide, [field]: { fr: newFr, en: newEn } }
            : slide
        ),
      };
      setData(updatedData);
      await updateHeroSection(updatedData);
    };
  };

  const updateSlidePrimaryButton = (index: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        slides: data.slides.map((slide, i) =>
          i === index
            ? { 
                ...slide, 
                buttons: { 
                  ...slide.buttons, 
                  primary: { fr: newFr, en: newEn } 
                } 
              }
            : slide
        ),
      };
      setData(updatedData);
      await updateHeroSection(updatedData);
    };
  };

  const updateBadgeText = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      badge: {
        ...data.badge,
        text: { fr: newFr, en: newEn },
      },
    };
    setData(updatedData);
    await updateHeroSection(updatedData);
  };

  const updateScrollText = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      scroll: { fr: newFr, en: newEn },
    };
    setData(updatedData);
    await updateHeroSection(updatedData);
  };

  const updateImage = async (index: number, newUrl: string) => {
    const updatedData = {
      ...data,
      slides: data.slides.map((slide, i) => i === index ? { ...slide, image: newUrl } : slide),
    };
    setData(updatedData);
    await updateHeroSection(updatedData);
  };

  if (loading) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="animate-pulse bg-white/10 rounded-full w-32 h-6 mx-auto mb-8" />
            <div className="space-y-4">
              <div className="animate-pulse bg-white/10 rounded w-64 h-12 mx-auto" />
              <div className="animate-pulse bg-white/10 rounded w-96 h-8 mx-auto" />
              <div className="animate-pulse bg-white/10 rounded w-full h-6 mx-auto max-w-md" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="animate-pulse bg-white/10 rounded-lg w-32 h-12" />
              <div className="animate-pulse bg-white/10 rounded-lg w-40 h-12" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.warn(error);
  }

  return (
    <ImageTooltip
      imageUrl={currentSlideData.image || hotelExterior}
      onSave={(newUrl) => updateImage(currentSlide, newUrl)}
    >
      <div 
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden cursor-pointer"
      >
        {/* Hero Images with Slide Transition */}
        <div className="relative h-full w-full overflow-hidden">
          <div 
            className="flex h-full transition-transform ease-in-out"
            style={{ 
              transform: `translateX(-${currentSlide * 100}%)`,
              transitionDuration: `${TRANSITION_DURATION}ms`
            }}
          >
            {data.slides.map((slide, index) => {
              const imageUrl = slide.image || hotelExterior;
              return (
                <div
                  key={index}
                  className="w-full h-full flex-shrink-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                />
              );
            })}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 h-full flex items-center justify-center text-center px-4 z-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 mb-8">
                <span className="text-primary text-sm font-medium">{data.badge.stars}</span>
                <Tooltip
                  frLabel={data.badge.text.fr}
                  enLabel={data.badge.text.en}
                  onSave={updateBadgeText}
                >
                  <span className="ml-2 text-primary text-sm">{currentBadgeText}</span>
                </Tooltip>
              </div>
            </div>
            
            <Tooltip
              frLabel={currentSlideData.title.fr}
              enLabel={currentSlideData.title.en}
              onSave={updateSlideField(currentSlide, 'title')}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                {formatAmpersand(currentTitle)}
              </h1>
            </Tooltip>
            
            <Tooltip
              frLabel={currentSlideData.subtitle.fr}
              enLabel={currentSlideData.subtitle.en}
              onSave={updateSlideField(currentSlide, 'subtitle')}
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-luxury italic text-accent mb-8">
                {currentSubtitle}
              </h2>
            </Tooltip>
            
            <Tooltip
              frLabel={currentSlideData.description.fr}
              enLabel={currentSlideData.description.en}
              onSave={updateSlideField(currentSlide, 'description')}
            >
              <p className="text-base md:text-lg lg:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                {currentDescription}
              </p>
            </Tooltip>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg" 
                className="px-8 py-3 text-lg font-medium"
                data-testid="button-book-suite"
              >
                <Link href={slidePaths[currentSlide]} className="flex items-center justify-center">
                  <Tooltip
                    frLabel={currentSlideData.buttons.primary.fr}
                    enLabel={currentSlideData.buttons.primary.en}
                    onSave={updateSlidePrimaryButton(currentSlide)}
                  >
                    <span>{currentPrimaryButton}</span>
                  </Tooltip>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm z-[9999] transition-all duration-300 ${
            showArrows ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
          }`}
          onClick={handlePrevSlide}
          disabled={isTransitioning}
          data-testid="button-prev-slide"
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm z-[9999] transition-all duration-300 ${
            showArrows ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
          }`}
          onClick={handleNextSlide}
          disabled={isTransitioning}
          data-testid="button-next-slide"
        >
          <ChevronRight className="w-8 h-8" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
          {data.slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentSlide 
                  ? 'bg-primary scale-125' 
                  : 'bg-white/30 hover:bg-white/50 hover:scale-110'
              } ${isTransitioning ? 'pointer-events-none' : ''}`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              data-testid={`button-slide-${index}`}
            />
          ))}
        </div>

        {/* Auto-play Control */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-30">
          <div className="text-xs text-white/70">
            {isPaused ? 'Pause' : 'Lecture auto'}
          </div>
          <button
            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? (
              <Play className="w-4 h-4 text-white" />
            ) : (
              <Pause className="w-4 h-4 text-white" />
            )}
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/70 animate-bounce z-10">
          <Tooltip
            frLabel={data.scroll.fr}
            enLabel={data.scroll.en}
            onSave={updateScrollText}
          >
            <div className="text-xs mb-2 text-center">{currentScroll}</div>
          </Tooltip>
          <div className="w-0.5 h-8 bg-white/50 mx-auto"></div>
        </div>
      </div>
    </ImageTooltip>
  );
};

export default HeroSection;

// src/data/footerData.ts
export const footerData = {
  hotelName: {
    fr: "Carlton Madagascar",
    en: "Carlton Madagascar"
  },
  hotelDescription: {
    fr: "L'art de vivre à la française au cœur d'Antananarivo. Un hôtel 5 étoiles où luxe et raffinement créent une expérience inoubliable.",
    en: "The art of French living in the heart of Antananarivo. A 5-star hotel where luxury and refinement create an unforgettable experience."
  },
  newsletter: {
    title: {
      fr: "Newsletter",
      en: "Newsletter"
    },
    subtitle: {
      fr: "Recevez nos offres exclusives et actualités",
      en: "Receive our exclusive offers and latest news"
    },
    inputPlaceholder: {
      fr: "Votre email",
      en: "Your email"
    },
    submitButton: {
      fr: "S'abonner",
      en: "Subscribe"
    }
  },
  footerSections: [
    {
      title: {
        fr: "L'Hôtel",
        en: "The Hotel"
      },
      links: [
        {
          label: {
            fr: "À propos",
            en: "About"
          },
          href: "/about"
        },
        {
          label: {
            fr: "Histoire",
            en: "History"
          },
          href: "/history"
        },
        {
          label: {
            fr: "Récompenses",
            en: "Awards"
          },
          href: "/awards"
        },
        {
          label: {
            fr: "Emplois",
            en: "Careers"
          },
          href: "/careers"
        }
      ]
    },
    {
      title: {
        fr: "Services",
        en: "Services"
      },
      links: [
        {
          label: {
            fr: "Chambres & Suites",
            en: "Rooms & Suites"
          },
          href: "/chambres"
        },
        {
          label: {
            fr: "Restaurants",
            en: "Restaurants"
          },
          href: "/restaurants"
        },
        {
          label: {
            fr: "Spa & Bien-être",
            en: "Spa & Wellness"
          },
          href: "/spa"
        },
        {
          label: {
            fr: "Événements",
            en: "Events"
          },
          href: "/evenements"
        }
      ]
    },
    {
      title: {
        fr: "Informations",
        en: "Information"
      },
      links: [
        {
          label: {
            fr: "Conditions générales",
            en: "Terms and Conditions"
          },
          href: "/terms"
        },
        {
          label: {
            fr: "Politique de confidentialité",
            en: "Privacy Policy"
          },
          href: "/privacy"
        },
        {
          label: {
            fr: "Plan du site",
            en: "Sitemap"
          },
          href: "/sitemap"
        },
        {
          label: {
            fr: "FAQ",
            en: "FAQ"
          },
          href: "/faq"
        }
      ]
    }
  ],
  contactItems: [
    {
      icon: "MapPin",
      label: {
        fr: "Adresse",
        en: "Address"
      },
      value: {
        fr: "Rue Pierre Stibbe Anosy<br />101 Antananarivo, Madagascar",
        en: "Rue Pierre Stibbe Anosy<br />101 Antananarivo, Madagascar"
      }
    },
    {
      icon: "Phone",
      label: {
        fr: "Téléphone",
        en: "Phone"
      },
      value: "+261 20 22 260 60"
    },
    {
      icon: "Mail",
      label: {
        fr: "Email",
        en: "Email"
      },
      value: "contact@carlton.mg"
    },
    {
      icon: "Clock",
      label: {
        fr: "Réception",
        en: "Reception"
      },
      value: {
        fr: "24h/24 - 7j/7",
        en: "24/7"
      }
    }
  ],
  bottomCopyright: {
    fr: "© 2025 Carlton Madagascar. Tous droits réservés.",
    en: "© 2025 Carlton Madagascar. All rights reserved."
  },
  bottomStars: {
    fr: "★★★★★ Hôtel 5 étoiles",
    en: "★★★★★ 5-Star Hotel"
  },
  bottomSocialText: {
    fr: "Suivez-nous :",
    en: "Follow us:"
  },
  logos: [
    {
      src: "/uploads/I Prefer_logo_white_H_LARGE_1758205962584.png",
      alt: "I Prefer Hotel Rewards",
      className: "h-12 opacity-80 hover:opacity-100 transition-opacity"
    },
    {
      src: "/uploads/Preferred Lifestyle LOGO LARGE_black_1758205962584.png",
      alt: "Preferred Lifestyle",
      className: "h-12 opacity-80 hover:opacity-100 transition-opacity filter invert"
    }
  ],
  socialLinks: [
    { icon: "Facebook", href: "#", label: "Facebook" },
    { icon: "Instagram", href: "#", label: "Instagram" },
    { icon: "Twitter", href: "#", label: "Twitter" },
    { icon: "Linkedin", href: "#", label: "LinkedIn" }
  ]
};

// Footer.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'wouter';
import { footerData } from '@/data/footerData';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';

const Footer = () => {
  // TODO: Integrate with i18n hook (e.g., useTranslation from react-i18next) to get dynamic lang
  // For now, hardcoded to 'fr' - replace with actual lang logic
  const lang = 'fr' as 'fr' | 'en';

  const getText = (texts: { fr: string; en: string }): string => texts[lang];
  const getValue = (value: string | { fr: string; en: string }): string => 
    typeof value === 'string' ? value : value[lang];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription submitted');
  };

  const iconComponents = {
    MapPin,
    Phone,
    Mail,
    Clock,
  };

  const socialIconComponents = {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
  };

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
                  {getText(footerData.hotelName)}
                </h3>
                <p className="text-sidebar-foreground/80 mb-6">
                  {getText(footerData.hotelDescription)}
                </p>
              </div>
              
              {/* Newsletter */}
              <div>
                <h4 className="font-semibold text-sidebar-foreground mb-3">
                  {getText(footerData.newsletter.title)}
                </h4>
                <p className="text-sm text-sidebar-foreground/70 mb-4">
                  {getText(footerData.newsletter.subtitle)}
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder={getText(footerData.newsletter.inputPlaceholder)}
                    className="flex-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
                    data-testid="input-newsletter"
                  />
                  <Button type="submit" size="sm" data-testid="button-newsletter">
                    {getText(footerData.newsletter.submitButton)}
                  </Button>
                </form>
              </div>
            </div>

            {/* Footer Links */}
            {footerData.footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-sidebar-foreground mb-4">
                  {getText(section.title)}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="text-sidebar-foreground/70 hover:text-primary transition-colors text-sm"
                        data-testid={`link-footer-${link.href.slice(1)}`}
                      >
                        {formatAmpersand(getText(link.label))}
                      </Link>
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
            {footerData.contactItems.map((item, index) => {
              const IconComponent = iconComponents[item.icon as keyof typeof iconComponents];
              return (
                <div key={index} className="flex items-start gap-3">
                  <IconComponent className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-sidebar-foreground">{getText(item.label)}</p>
                    <p className="text-sm text-sidebar-foreground/70" dangerouslySetInnerHTML={{ __html: getValue(item.value) }} />
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
            <p className="text-sm text-sidebar-foreground/70">
              {getText(footerData.bottomCopyright)}
            </p>
            
            <span>{getText(footerData.bottomStars)}</span>
            
            {footerData.logos.map((logo, index) => (
              <img 
                key={index}
                src={logo.src} 
                alt={logo.alt}
                className={logo.className}
                data-testid={`logo-${index === 0 ? 'iprefer' : 'preferred-lifestyle'}`}
              />
            ))}
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-sidebar-foreground/70 mr-2">{getText(footerData.bottomSocialText)}</span>
              {footerData.socialLinks.map((social, index) => {
                const IconComponent = socialIconComponents[social.icon as keyof typeof socialIconComponents];
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 text-sidebar-foreground/70 hover:text-primary"
                    data-testid={`button-social-${social.label.toLowerCase()}`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="sr-only">{social.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;