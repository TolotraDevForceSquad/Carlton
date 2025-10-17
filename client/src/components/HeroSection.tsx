// src/components/HeroSection.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { heroSectionData } from '@/data/heroSectionData';
import { useLanguage } from './context/LanguageContext';
import hotelExterior from '@assets/generated_images/Carlton_hotel_exterior_view_8ca3b91a.png';

const SECTION_KEY = 'hero';

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

  // Helper to split heroSectionData into dataFr and dataEn structures
  const splitHeroData = (mixedData: typeof heroSectionData) => {
    const dataFr = {
      slides: mixedData.slides.map((slide) => ({
        image: slide.image,
        title: slide.title.fr,
        subtitle: slide.subtitle.fr,
        description: slide.description.fr,
      })),
      badge: {
        stars: mixedData.badge.stars,
        text: mixedData.badge.text.fr,
      },
      buttons: {
        primary: mixedData.buttons.primary.fr,
        secondary: mixedData.buttons.secondary.fr,
      },
      scroll: mixedData.scroll.fr,
    };

    const dataEn = {
      slides: mixedData.slides.map((slide) => ({
        image: slide.image,
        title: slide.title.en,
        subtitle: slide.subtitle.en,
        description: slide.description.en,
      })),
      badge: {
        stars: mixedData.badge.stars,
        text: mixedData.badge.text.en,
      },
      buttons: {
        primary: mixedData.buttons.primary.en,
        secondary: mixedData.buttons.secondary.en,
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
      slides: dataFr.slides.map((slideFr: any, i: number) => ({
        image: slideFr.image || heroSectionData.slides[i].image,
        title: { fr: slideFr.title, en: enFallback.slides[i]?.title || slideFr.title },
        subtitle: { fr: slideFr.subtitle, en: enFallback.slides[i]?.subtitle || slideFr.subtitle },
        description: { fr: slideFr.description, en: enFallback.slides[i]?.description || slideFr.description },
      })),
      badge: {
        stars: dataFr.badge?.stars || heroSectionData.badge.stars,
        text: { fr: dataFr.badge?.text || heroSectionData.badge.text.fr, en: enFallback.badge?.text || dataFr.badge?.text || heroSectionData.badge.text.en },
      },
      buttons: {
        primary: { fr: dataFr.buttons?.primary || heroSectionData.buttons.primary.fr, en: enFallback.buttons?.primary || dataFr.buttons?.primary || heroSectionData.buttons.primary.en },
        secondary: { fr: dataFr.buttons?.secondary || heroSectionData.buttons.secondary.fr, en: enFallback.buttons?.secondary || dataFr.buttons?.secondary || heroSectionData.buttons.secondary.en },
      },
      scroll: { fr: dataFr.scroll || heroSectionData.scroll.fr, en: enFallback.scroll || dataFr.scroll || heroSectionData.scroll.en },
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
          section = created; // Assume POST returns the created object
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
        // Fallback to default
        setData(heroSectionData);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
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
        // Should not happen after initial load, but create if missing
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
      // Revert local state on error if needed, but for simplicity, keep it
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.slides.length);
    console.log('Next slide triggered');
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + data.slides.length) % data.slides.length);
    console.log('Previous slide triggered');
  };

  const currentSlideData = data.slides[currentSlide];
  const currentImage = currentSlideData.image || hotelExterior;
  const currentTitle = currentSlideData.title[langKey];
  const currentSubtitle = currentSlideData.subtitle[langKey];
  const currentDescription = currentSlideData.description[langKey];
  const currentBadgeText = data.badge.text[langKey];
  const currentPrimaryButton = data.buttons.primary[langKey];
  const currentSecondaryButton = data.buttons.secondary[langKey];
  const currentScroll = data.scroll[langKey];

  const updateSlideField = (index: number, field: keyof typeof currentSlideData) => {
    return async (newFr: string, newEn: string) => {
      // First, update local state
      const updatedData = {
        ...data,
        slides: data.slides.map((slide, i) =>
          i === index
            ? { ...slide, [field]: { fr: newFr, en: newEn } }
            : slide
        ),
      };
      setData(updatedData);

      // Then, update backend
      await updateHeroSection(updatedData);
    };
  };

  const updateBadgeText = async (newFr: string, newEn: string) => {
    // First, update local state
    const updatedData = {
      ...data,
      badge: {
        ...data.badge,
        text: { fr: newFr, en: newEn },
      },
    };
    setData(updatedData);

    // Then, update backend
    await updateHeroSection(updatedData);
  };

  const updateButtonText = (buttonKey: 'primary' | 'secondary') => {
    return async (newFr: string, newEn: string) => {
      // First, update local state
      const updatedData = {
        ...data,
        buttons: {
          ...data.buttons,
          [buttonKey]: { fr: newFr, en: newEn },
        },
      };
      setData(updatedData);

      // Then, update backend
      await updateHeroSection(updatedData);
    };
  };

  const updateScrollText = async (newFr: string, newEn: string) => {
    // First, update local state
    const updatedData = {
      ...data,
      scroll: { fr: newFr, en: newEn },
    };
    setData(updatedData);

    // Then, update backend
    await updateHeroSection(updatedData);
  };

  const updateImage = async (index: number, newUrl: string) => {
    // First, update local state
    const updatedData = {
      ...data,
      slides: data.slides.map((slide, i) => i === index ? { ...slide, image: newUrl } : slide),
    };
    setData(updatedData);

    // Then, update backend
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
      imageUrl={currentImage}
      onSave={(newUrl) => updateImage(currentSlide, newUrl)}
    >
      <div className="relative h-screen w-full overflow-hidden">
        {/* Hero Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${currentImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center text-center px-4">
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
                size="lg" 
                className="px-8 py-3 text-lg font-medium"
                data-testid="button-book-suite"
              >
                <Tooltip
                  frLabel={data.buttons.primary.fr}
                  enLabel={data.buttons.primary.en}
                  onSave={updateButtonText('primary')}
                >
                  <span>{currentPrimaryButton}</span>
                </Tooltip>
              </Button>
              {/* <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 text-lg font-medium bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                data-testid="button-discover-hotel"
              >
                <Play className="w-5 h-5 mr-2" />
                <Tooltip
                  frLabel={data.buttons.secondary.fr}
                  enLabel={data.buttons.secondary.en}
                  onSave={updateButtonText('secondary')}
                >
                  <span>{currentSecondaryButton}</span>
                </Tooltip>
              </Button> */}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm"
          onClick={prevSlide}
          data-testid="button-prev-slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm"
          onClick={nextSlide}
          data-testid="button-next-slide"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {data.slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-primary' : 'bg-white/30'
              }`}
              onClick={() => {
                setCurrentSlide(index);
                console.log(`Slide ${index} selected`);
              }}
              data-testid={`button-slide-${index}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
          <Tooltip
            frLabel={data.scroll.fr}
            enLabel={data.scroll.en}
            onSave={updateScrollText}
          >
            <div className="text-xs mb-2">{currentScroll}</div>
          </Tooltip>
          <div className="w-0.5 h-8 bg-white/50 mx-auto"></div>
        </div>
      </div>
    </ImageTooltip>
  );
};

export default HeroSection;