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