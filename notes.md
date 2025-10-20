// src/data/heroSectionData.ts
export const heroSectionData = {
  slides: [
    {
      image: "/uploads/Carlton_hotel_exterior_view_8ca3b91a.png",
      title: {
        fr: "Carlton Madagascar",
        en: "Carlton Madagascar"
      },
      subtitle: {
        fr: "L'hôtel 5 étoiles emblématique ancré dans le centre historique d'Antananarivo",
        en: "The iconic 5-star hotel anchored in the historic center of Antananarivo"
      },
      description: {
        fr: "",
        en: ""
      },
      buttons: {
        primary: {
          fr: "Réserver maintenant",
          en: "Book now"
        }
      }
    },
    {
      image: "/uploads/Carlton_hotel_exterior_view_8ca3b91a.png",
      title: {
        fr: "Chambres & Suites",
        en: "Rooms & Suites"
      },
      subtitle: {
        fr: "Chambres et Suites avec vue panoramique sur la ville, parfaites pour vos séjours à Antananarivo.",
        en: "Rooms and suites with panoramic city views, ideal for your stay in Antananarivo."
      },
      description: {
        fr: "",
        en: ""
      },
      buttons: {
        primary: {
          fr: "Voir nos chambres",
          en: "See our rooms"
        }
      }
    },
    {
      image: "/uploads/Carlton_hotel_exterior_view_8ca3b91a.png",
      title: {
        fr: "Excellence & Prestige",
        en: "Excellence & Prestige"
      },
      subtitle: {
        fr: "Une Harmonie Parfaite d'Histoire, de Confort et de Prestige",
        en: "A Perfect Harmony of History, Comfort, and Prestige"
      },
      description: {
        fr: "En tant que membre certifié de Preferred Hotels and Resorts, nous garantissons les standards les plus élevés pour faire de votre visite un moment mémorable.",
        en: "As a certified member of Preferred Hotels and Resorts, we guarantee the highest standards to make your visit a memorable moment."
      },
      buttons: {
        primary: {
          fr: "Découvrir l'hôtel",
          en: "Discover the hotel"
        }
      }
    },
    {
      image: "/uploads/Carlton_hotel_exterior_view_8ca3b91a.png",
      title: {
        fr: "Restaurants & Bars",
        en: "Restaurants & Bars"
      },
      subtitle: {
        fr: "Nos restaurants & bars vous accueillent chacun dans des ambiances uniques pour des plaisirs gourmands inoubliables.",
        en: "Our restaurants & bars welcome you each in unique atmospheres for unforgettable gourmet pleasures."
      },
      description: {
        fr: "",
        en: ""
      },
      buttons: {
        primary: {
          fr: "Découvrir nos restaurants",
          en: "Discover our restaurants"
        }
      }
    },
    {
      image: "/uploads/Carlton_hotel_exterior_view_8ca3b91a.png",
      title: {
        fr: "Evénements & Réceptions",
        en: "Events & Receptions"
      },
      subtitle: {
        fr: "Nous proposons différentes formules pour rendre chaque événement unique, personnalisées selon vos besoins.",
        en: "We suggest different formulas to make each event unique, customized to your needs."
      },
      description: {
        fr: "Cinq espaces pouvant accueillir jusqu'à 550 invités pour vos réceptions mémorables à Antananarivo.",
        en: "Five spaces that can accommodate up to 550 guests for your memorable receptions in Antananarivo."
      },
      buttons: {
        primary: {
          fr: "Organiser votre événement",
          en: "Organize your event"
        }
      }
    },
    {
      image: "/uploads/Carlton_hotel_exterior_view_8ca3b91a.png",
      title: {
        fr: "Bien-être",
        en: "Wellness"
      },
      subtitle: {
        fr: "Profitez de nos installations bien-être : piscine, court de tennis, centre de fitness et services cosmétiques.",
        en: "Enjoy our wellness facilities: pool, tennis court, fitness center and cosmetic services."
      },
      description: {
        fr: "",
        en: ""
      },
      buttons: {
        primary: {
          fr: "Découvrez notre bien-être",
          en: "Discover our wellness"
        }
      }
    }
  ],
  badge: {
    stars: "★★★★★",
    text: {
      fr: "Hôtel 5 Étoiles",
      en: "5-Star Hotel"
    }
  },
  scroll: {
    fr: "Découvrir",
    en: "Explore"
  }
};

// src/components/HeroSection.tsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Configuration du carousel
  const AUTO_PLAY_INTERVAL = 5000; // 5 secondes entre chaque slide
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
    if (loading) return;

    const startAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
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
  }, [data.slides.length, loading]);

  // Mouse detection for arrow visibility
  useEffect(() => {
    const handleMouseEnter = () => {
      setShowArrows(true);
    };

    const handleMouseLeave = () => {
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
      // Restart auto-play after transition
      if (data.slides.length > 1) {
        autoPlayRef.current = setInterval(() => {
          handleNextSlide();
        }, AUTO_PLAY_INTERVAL);
      }
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
      // Restart auto-play after transition
      if (data.slides.length > 1) {
        autoPlayRef.current = setInterval(() => {
          handleNextSlide();
        }, AUTO_PLAY_INTERVAL);
      }
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
      // Restart auto-play after transition
      if (data.slides.length > 1) {
        autoPlayRef.current = setInterval(() => {
          handleNextSlide();
        }, AUTO_PLAY_INTERVAL);
      }
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

// src/data/homeData.ts
export const homeData = {
  title: {
    fr: "L'Art de l'Hospitalité & du Luxe",
    en: "The Art of Hospitality & Luxury"
  },
  content: {
    fr: "<p>Le Carlton Madagascar est bien plus qu'un hôtel 5 étoiles. C'est une invitation au voyage, une expérience unique au cœur d'Antananarivo où l'élégance française rencontre l'authenticité malgache pour créer des souvenirs inoubliables.</p>",
    en: "<p>The Carlton Madagascar is much more than a 5-star hotel. It is an invitation to travel, a unique experience in the heart of Antananarivo where French elegance meets Malagasy authenticity to create unforgettable memories.</p>"
  },
  highlights: [
    {
      icon: "Sparkles",
      title: {
        fr: "Chambres de Luxe",
        en: "Luxury Rooms"
      },
      description: {
        fr: "Suites et chambres élégantes avec vue panoramique sur Antananarivo",
        en: "Elegant suites and rooms with panoramic views of Antananarivo"
      },
      link: "/chambres",
      linkText: {
        fr: "Voir nos chambres",
        en: "See our rooms"
      },
      image: "/uploads/Presidential_suite_bedroom_interior_7adece21.png"
    },
    {
      icon: "Utensils",
      title: {
        fr: "Gastronomie d'Exception",
        en: "Exceptional Gastronomy"
      },
      description: {
        fr: "4 restaurants et bars offrant une cuisine raffinée dans un cadre d'exception",
        en: "4 restaurants and bars offering refined cuisine in an exceptional setting"
      },
      link: "/restaurants",
      linkText: {
        fr: "Découvrir nos restaurants",
        en: "Discover our restaurants"
      },
      image: "/uploads/Luxury_hotel_restaurant_interior_090ad235.png"
    },
    {
      icon: "Calendar",
      title: {
        fr: "Événements & Réceptions",
        en: "Events & Receptions"
      },
      description: {
        fr: "Espaces de réception prestigieux pour vos événements d'affaires et privés",
        en: "Prestigious reception spaces for your business and private events"
      },
      link: "/evenements",
      linkText: {
        fr: "Organiser un événement",
        en: "Organize an event"
      },
      image: "/uploads/Luxury_hotel_wedding_reception_d3ca816d.png"
    },
    {
      icon: "Camera",
      title: {
        fr: "Bien-être & Loisirs",
        en: "Wellness & Leisure"
      },
      description: {
        fr: "Piscine infinity, fitness center et installations sportives haut de gamme",
        en: "Infinity pool, fitness center and high-end sports facilities"
      },
      link: "/bien-etre-loisirs",
      linkText: {
        fr: "Nos installations",
        en: "Our facilities"
      },
      image: "/uploads/Hotel_infinity_pool_wellness_a9857557.png"
    }
  ],
  cta: {
    title: {
      fr: "Réservez Votre Séjour d'Exception",
      en: "Book Your Exceptional Stay"
    },
    description: {
      fr: "Découvrez l'hospitalité malgache dans le cadre luxueux du Carlton Madagascar",
      en: "Discover Malagasy hospitality in the luxurious setting of the Carlton Madagascar"
    },
    primaryButton: {
      fr: "Réserver maintenant",
      en: "Book now"
    },
    secondaryButton: {
      fr: "Voir nos chambres",
      en: "See our rooms"
    },
    primaryLink: "/contact",
    secondaryLink: "/chambres"
  },
  parallaxImage: "/uploads/Hotel_infinity_pool_wellness_a9857557.png"
};

// src/components/Home.tsx
import HeroSection from '@/components/HeroSection';
import ParallaxSection from '@/components/ParallaxSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Clock, MapPin, Utensils, Camera, Calendar, Sparkles } from 'lucide-react';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { homeData as initialHomeData } from '@/data/homeData';
import wellnessImage from '@assets/generated_images/Hotel_infinity_pool_wellness_a9857557.png';
import { useLanguage } from '@/components/context/LanguageContext';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';
import { useState, useEffect } from 'react';

const SECTION_KEY = 'home';

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const Home = () => {
  const { currentLang } = useLanguage();
  const lang = currentLang.code.toLowerCase();
  
  const [data, setData] = useState(initialHomeData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Helper to split homeData into dataFr and dataEn structures
  const splitHomeData = (mixedData: typeof initialHomeData) => {
    const dataFr = {
      title: mixedData.title.fr,
      content: mixedData.content.fr,
      highlights: mixedData.highlights.map((highlight) => ({
        icon: highlight.icon,
        title: highlight.title.fr,
        description: highlight.description.fr,
        link: highlight.link,
        linkText: highlight.linkText.fr,
        image: highlight.image,
      })),
      cta: {
        title: mixedData.cta.title.fr,
        description: mixedData.cta.description.fr,
        primaryButton: mixedData.cta.primaryButton.fr,
        secondaryButton: mixedData.cta.secondaryButton.fr,
        primaryLink: mixedData.cta.primaryLink,
        secondaryLink: mixedData.cta.secondaryLink,
      },
      parallaxImage: mixedData.parallaxImage,
    };

    const dataEn = {
      title: mixedData.title.en,
      content: mixedData.content.en,
      highlights: mixedData.highlights.map((highlight) => ({
        icon: highlight.icon,
        title: highlight.title.en,
        description: highlight.description.en,
        link: highlight.link,
        linkText: highlight.linkText.en,
        image: highlight.image,
      })),
      cta: {
        title: mixedData.cta.title.en,
        description: mixedData.cta.description.en,
        primaryButton: mixedData.cta.primaryButton.en,
        secondaryButton: mixedData.cta.secondaryButton.en,
        primaryLink: mixedData.cta.primaryLink,
        secondaryLink: mixedData.cta.secondaryLink,
      },
      parallaxImage: mixedData.parallaxImage,
    };

    return { dataFr, dataEn };
  };

  // Reconstruct mixed data from dataFr and dataEn
  const reconstructMixed = (dataFr: any, dataEn: any | null) => {
    if (!dataFr || typeof dataFr !== 'object') {
      console.warn('Invalid dataFr structure, falling back to default');
      return initialHomeData;
    }
    const enFallback = dataEn || dataFr;
    const mixed = {
      title: { fr: dataFr.title, en: enFallback.title || dataFr.title },
      content: { fr: dataFr.content, en: enFallback.content || dataFr.content },
      highlights: dataFr.highlights.map((highlightFr: any, i: number) => ({
        icon: highlightFr.icon || initialHomeData.highlights[i].icon,
        title: { fr: highlightFr.title, en: enFallback.highlights[i]?.title || highlightFr.title },
        description: { fr: highlightFr.description, en: enFallback.highlights[i]?.description || highlightFr.description },
        link: highlightFr.link || initialHomeData.highlights[i].link,
        linkText: { fr: highlightFr.linkText, en: enFallback.highlights[i]?.linkText || highlightFr.linkText },
        image: highlightFr.image || initialHomeData.highlights[i].image,
      })),
      cta: {
        title: { fr: dataFr.cta?.title || initialHomeData.cta.title.fr, en: enFallback.cta?.title || dataFr.cta?.title || initialHomeData.cta.title.en },
        description: { fr: dataFr.cta?.description || initialHomeData.cta.description.fr, en: enFallback.cta?.description || dataFr.cta?.description || initialHomeData.cta.description.en },
        primaryButton: { fr: dataFr.cta?.primaryButton || initialHomeData.cta.primaryButton.fr, en: enFallback.cta?.primaryButton || dataFr.cta?.primaryButton || initialHomeData.cta.primaryButton.en },
        secondaryButton: { fr: dataFr.cta?.secondaryButton || initialHomeData.cta.secondaryButton.fr, en: enFallback.cta?.secondaryButton || dataFr.cta?.secondaryButton || initialHomeData.cta.secondaryButton.en },
        primaryLink: dataFr.cta?.primaryLink || initialHomeData.cta.primaryLink,
        secondaryLink: dataFr.cta?.secondaryLink || initialHomeData.cta.secondaryLink,
      },
      parallaxImage: dataFr.parallaxImage || initialHomeData.parallaxImage,
    };
    return mixed;
  };

  // Fetch home data from backend
  useEffect(() => {
    const fetchHomeData = async () => {
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
          const { dataFr, dataEn } = splitHomeData(initialHomeData);
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
            throw new Error('Failed to create home data');
          }

          const created = await createResponse.json();
          section = created; // Assume POST returns the created object
        }

        if (section) {
          const fetchedData = reconstructMixed(section.dataFr, section.dataEn);
          setData(fetchedData);
        } else {
          setData(initialHomeData);
        }
      } catch (err) {
        console.error('Error fetching home data:', err);
        setError('Failed to load home data');
        // Fallback to default
        setData(initialHomeData);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const updateHomeSection = async (updatedMixedData: typeof initialHomeData) => {
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
        const { dataFr, dataEn } = splitHomeData(initialHomeData);
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

      const { dataFr: updatedDataFr, dataEn: updatedDataEn } = splitHomeData(updatedMixedData);

      const putResponse = await fetch(`/api/globalSections/${currentSection.id}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataFr: updatedDataFr,
          dataEn: Object.keys(updatedDataEn).length > 0 ? updatedDataEn : null
        })
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update home section');
      }
    } catch (err) {
      console.error('Error updating home section:', err);
      // Revert local state on error if needed, but for simplicity, keep it
    }
  };
  
  const { title: rawTitle, content: rawContent, highlights: rawHighlights, cta: rawCta, parallaxImage } = data;
  
  const title = rawTitle[lang];
  const content = rawContent[lang];
  
  const highlights = rawHighlights.map(highlight => ({
    ...highlight,
    title: highlight.title[lang],
    description: highlight.description[lang],
    linkText: highlight.linkText[lang]
  }));
  
  const processedHighlights = highlights.map((highlight, index) => ({
    ...highlight,
    image: highlight.image || wellnessImage // Fallback if needed
  }));
  
  const cta = {
    ...rawCta,
    title: rawCta.title[lang],
    description: rawCta.description[lang],
    primaryButton: rawCta.primaryButton[lang],
    secondaryButton: rawCta.secondaryButton[lang]
  };
  
  const getHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-8 h-8" />;
      case 'Utensils': return <Utensils className="w-8 h-8" />;
      case 'Calendar': return <Calendar className="w-8 h-8" />;
      case 'Camera': return <Camera className="w-8 h-8" />;
      default: return null;
    }
  };

  const updateTitle = async (newFr: string, newEn: string) => {
    // First, update local state
    const updatedData = {
      ...data,
      title: { fr: newFr, en: newEn }
    };
    setData(updatedData);

    // Then, update backend
    await updateHomeSection(updatedData);
  };

  const updateContent = async (newFr: string, newEn: string) => {
    // First, update local state
    const updatedData = {
      ...data,
      content: { fr: newFr, en: newEn }
    };
    setData(updatedData);

    // Then, update backend
    await updateHomeSection(updatedData);
  };

  const updateHighlightTitle = (index: number) => async (newFr: string, newEn: string) => {
    // First, update local state
    const updatedData = {
      ...data,
      highlights: data.highlights.map((h, i) => 
        i === index ? { ...h, title: { fr: newFr, en: newEn } } : h
      )
    };
    setData(updatedData);

    // Then, update backend
    await updateHomeSection(updatedData);
  };

  const updateHighlightDescription = (index: number) => async (newFr: string, newEn: string) => {
    // First, update local state
    const updatedData = {
      ...data,
      highlights: data.highlights.map((h, i) => 
        i === index ? { ...h, description: { fr: newFr, en: newEn } } : h
      )
    };
    setData(updatedData);

    // Then, update backend
    await updateHomeSection(updatedData);
  };

  const updateHighlightLinkText = (index: number) => async (newFr: string, newEn: string) => {
    // First, update local state
    const updatedData = {
      ...data,
      highlights: data.highlights.map((h, i) => 
        i === index ? { ...h, linkText: { fr: newFr, en: newEn } } : h
      )
    };
    setData(updatedData);

    // Then, update backend
    await updateHomeSection(updatedData);
  };

  const updateCtaTitle = async (newFr: string, newEn: string) => {
    // First, update local state
    const updatedData = {
      ...data,
      cta: { ...data.cta, title: { fr: newFr, en: newEn } }
    };
    setData(updatedData);

    // Then, update backend
    await updateHomeSection(updatedData);
  };

  const updateCtaDescription = async (newFr: string, newEn: string) => {
    // First, update local state
    const updatedData = {
      ...data,
      cta: { ...data.cta, description: { fr: newFr, en: newEn } }
    };
    setData(updatedData);

    // Then, update backend
    await updateHomeSection(updatedData);
  };

  const updateCtaPrimaryButton = async (newFr: string, newEn: string) => {
    // First, update local state
    const updatedData = {
      ...data,
      cta: { ...data.cta, primaryButton: { fr: newFr, en: newEn } }
    };
    setData(updatedData);

    // Then, update backend
    await updateHomeSection(updatedData);
  };

  const updateCtaSecondaryButton = async (newFr: string, newEn: string) => {
    // First, update local state
    const updatedData = {
      ...data,
      cta: { ...data.cta, secondaryButton: { fr: newFr, en: newEn } }
    };
    setData(updatedData);

    // Then, update backend
    await updateHomeSection(updatedData);
  };

  const updateHighlightImage = (index: number) => async (newImageUrl: string) => {
    // First, update local state
    const updatedData = {
      ...data,
      highlights: data.highlights.map((h, i) => 
        i === index ? { ...h, image: newImageUrl } : h
      )
    };
    setData(updatedData);

    // Then, update backend
    await updateHomeSection(updatedData);
  };

  const updateParallaxImage = async (newImageUrl: string) => {
    // First, update local state
    const updatedData = {
      ...data,
      parallaxImage: newImageUrl
    };
    setData(updatedData);

    // Then, update backend
    await updateHomeSection(updatedData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main>
          <HeroSection />
          <section className="py-20 bg-card/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Skeleton className="h-12 w-64 mx-auto mb-6" />
                <Skeleton className="h-1 w-24 mx-auto mb-6" />
                <Skeleton className="h-8 w-full max-w-4xl mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="relative h-[70vh] bg-gray-900">
            <Skeleton className="absolute inset-0" />
          </section>
          <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Skeleton className="h-12 w-80 mx-auto mb-6" />
              <Skeleton className="h-6 w-full max-w-md mx-auto mb-8" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-48" />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.warn(error);
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        
        {/* Présentation de l'hôtel */}
        <section className="py-20 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                <Tooltip 
                  frLabel={data.title.fr} 
                  enLabel={data.title.en} 
                  onSave={updateTitle}
                >
                  {formatAmpersand(title)}
                </Tooltip>
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <div 
                className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed prose prose-lg dark:prose-invert mx-auto"
              >
                <Tooltip 
                  frLabel={data.content.fr} 
                  enLabel={data.content.en} 
                  onSave={updateContent}
                >
                  <span dangerouslySetInnerHTML={{ __html: content }} />
                </Tooltip>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {processedHighlights.map((highlight, index) => (
                <Card key={index} className="flex flex-col h-full overflow-hidden hover-elevate transition-all duration-300">
                  <ImageTooltip imageUrl={data.highlights[index].image || wellnessImage} onSave={updateHighlightImage(index)}>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={highlight.image} 
                        alt={highlight.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-full">
                          <div className="text-primary">
                            {getHighlightIcon(highlight.icon)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ImageTooltip>
                  <CardContent className="flex-1 flex flex-col p-6">
                    <CardTitle className="text-xl font-serif text-foreground mb-3">
                      <Tooltip 
                        frLabel={data.highlights[index].title.fr} 
                        enLabel={data.highlights[index].title.en} 
                        onSave={updateHighlightTitle(index)}
                      >
                        {formatAmpersand(highlight.title)}
                      </Tooltip>
                    </CardTitle>
                    <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                      <Tooltip 
                        frLabel={data.highlights[index].description.fr} 
                        enLabel={data.highlights[index].description.en} 
                        onSave={updateHighlightDescription(index)}
                      >
                        {highlight.description}
                      </Tooltip>
                    </p>
                    <Link href={highlight.link}>
                      <Button variant="outline" className="w-full mt-auto">
                        <Tooltip 
                          frLabel={data.highlights[index].linkText.fr} 
                          enLabel={data.highlights[index].linkText.en} 
                          onSave={updateHighlightLinkText(index)}
                        >
                          {highlight.linkText}
                        </Tooltip>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section Parallax - Bien-être */}
        <ImageTooltip imageUrl={parallaxImage || wellnessImage} onSave={updateParallaxImage}>
          <ParallaxSection
            backgroundImage={parallaxImage || wellnessImage}
            parallaxSpeed={0.5}
            minHeight="70vh"
            overlay={true}
            overlayOpacity={0.4}
            className="flex items-center"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            </div>
          </ParallaxSection>
        </ImageTooltip>

        {/* Call to Action final */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              <Tooltip 
                frLabel={data.cta.title.fr} 
                enLabel={data.cta.title.en} 
                onSave={updateCtaTitle}
              >
                {cta.title}
              </Tooltip>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              <Tooltip 
                frLabel={data.cta.description.fr} 
                enLabel={data.cta.description.en} 
                onSave={updateCtaDescription}
              >
                {cta.description}
              </Tooltip>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={cta.primaryLink}>
                <Button size="lg" className="w-full sm:w-auto">
                  <Tooltip 
                    frLabel={data.cta.primaryButton.fr} 
                    enLabel={data.cta.primaryButton.en} 
                    onSave={updateCtaPrimaryButton}
                  >
                    {cta.primaryButton}
                  </Tooltip>
                </Button>
              </Link>
              <Link href={cta.secondaryLink}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Tooltip 
                    frLabel={data.cta.secondaryButton.fr} 
                    enLabel={data.cta.secondaryButton.en} 
                    onSave={updateCtaSecondaryButton}
                  >
                    {cta.secondaryButton}
                  </Tooltip>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;


// CECI EST POUR JUSTE REFERENCE 

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