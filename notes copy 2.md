

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Star, Sparkles, Utensils, Plus, Trash2, Eye, EyeOff, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
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
      images: restaurant.images || ['/uploads/Restaurant.png'],
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
      images: restaurant.images || ['/uploads/Restaurant.png'],
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
        images: restaurantFr.images || ['/uploads/Restaurant.png'],
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

interface TextFormatterProps {
  text: any;
  className?: string;
}

const TextFormatter: React.FC<TextFormatterProps> = ({ text, className }) => {
  let displayText: string;
  if (typeof text === 'string') {
    displayText = text;
  } else if (typeof text === 'number') {
    displayText = text.toString();
  } else {
    displayText = String(text || '');
  }

  const parts = displayText.split('(-)').filter(part => part.trim().length > 0);
  if (parts.length === 1) {
    return <span className={className}>{formatAmpersand(displayText)}</span>;
  }
  return (
    <div className={`space-y-2 ${className || ''}`}>
      {parts.map((part, i) => (
        <p key={i} className="leading-relaxed">{formatAmpersand(part.trim())}</p>
      ))}
    </div>
  );
};

// Carousel Component
interface CarouselProps {
  images: string[];
  onImageChange?: (imageUrl: string) => void;
  isAdmin?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ images, onImageChange, isAdmin = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-80 bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Aucune image disponible</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-80 lg:h-full overflow-hidden group">
      {/* Main Image */}
      <div className="w-full h-full">
        <img 
          src={images[currentIndex]} 
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500"
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Image Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

const Restaurants = () => {
  const { currentLang } = useLanguage();
  const langKey = currentLang.code.toLowerCase();
  const [location, navigate] = useLocation();
  const [data, setData] = useState(() => reconstructMixed(splitRestaurantData(restaurantPageData).dataFr, splitRestaurantData(restaurantPageData).dataEn));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

  // SOLUTION COMPLÈTE : Gestion du défilement pour tous les cas
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScrollToHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && !loading) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      }
    };

    // 1. Écouter les changements de hash (navigation depuis d'autres pages)
    window.addEventListener('hashchange', handleScrollToHash);
    
    // 2. Vérifier au chargement initial
    handleScrollToHash();

    // 3. Intercepter les clics sur les liens d'ancres MÊME sur la page actuelle
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash) {
        const hash = link.hash.replace('#', '');
        if (hash && window.location.pathname === '/restaurants') {
          e.preventDefault();
          // Mettre à jour l'URL sans recharger
          window.history.pushState(null, '', link.hash);
          handleScrollToHash();
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('hashchange', handleScrollToHash);
      document.removeEventListener('click', handleAnchorClick);
      clearTimeout(scrollTimeout);
    };
  }, [loading]);

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
      const updatedStats = [...data.hero.stats];
      updatedStats[statIndex] = {
        ...updatedStats[statIndex],
        [statField]: { fr: newFr, en: newEn },
      };
      const updatedData = {
        ...data,
        hero: {
          ...data.hero,
          stats: updatedStats,
        },
      };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const updateHeroButtonText = (buttonType: 'primary' | 'secondary') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        hero: {
          ...data.hero,
          buttonTexts: {
            ...data.hero.buttonTexts,
            [buttonType]: { fr: newFr, en: newEn },
          },
        },
      };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const updateRestaurantField = (restaurantId: number, field: string) => {
    return async (newFr: string, newEn: string) => {
      const updatedRestaurants = data.restaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          return {
            ...restaurant,
            [field]: { fr: newFr, en: newEn },
          };
        }
        return restaurant;
      });
      const updatedData = { ...data, restaurants: updatedRestaurants };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const updateRestaurantHours = (restaurantId: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedRestaurants = data.restaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          return {
            ...restaurant,
            hours: { fr: newFr, en: newEn },
          };
        }
        return restaurant;
      });
      const updatedData = { ...data, restaurants: updatedRestaurants };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const updateRestaurantCapacity = (restaurantId: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedRestaurants = data.restaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          return {
            ...restaurant,
            capacity: { fr: newFr, en: newEn },
          };
        }
        return restaurant;
      });
      const updatedData = { ...data, restaurants: updatedRestaurants };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const updateRestaurantPriceRange = (restaurantId: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedRestaurants = data.restaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          return {
            ...restaurant,
            priceRange: { fr: newFr, en: newEn },
          };
        }
        return restaurant;
      });
      const updatedData = { ...data, restaurants: updatedRestaurants };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const updateRestaurantSpecialties = (restaurantId: number, specialtyIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedRestaurants = data.restaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          const updatedSpecialties = [...restaurant.specialties];
          updatedSpecialties[specialtyIndex] = { fr: newFr, en: newEn };
          return { ...restaurant, specialties: updatedSpecialties };
        }
        return restaurant;
      });
      const updatedData = { ...data, restaurants: updatedRestaurants };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const addRestaurantSpecialty = async (restaurantId: number) => {
    const updatedRestaurants = data.restaurants.map((restaurant) => {
      if (restaurant.id === restaurantId) {
        const newSpecialty = { fr: 'Nouvelle spécialité', en: 'New specialty' };
        return { ...restaurant, specialties: [...restaurant.specialties, newSpecialty] };
      }
      return restaurant;
    });
    const updatedData = { ...data, restaurants: updatedRestaurants };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
  };

  const removeRestaurantSpecialty = async (restaurantId: number, specialtyIndex: number) => {
    const updatedRestaurants = data.restaurants.map((restaurant) => {
      if (restaurant.id === restaurantId) {
        const updatedSpecialties = restaurant.specialties.filter((_, index) => index !== specialtyIndex);
        return { ...restaurant, specialties: updatedSpecialties };
      }
      return restaurant;
    });
    const updatedData = { ...data, restaurants: updatedRestaurants };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
  };

  const updateRestaurantFeatures = (restaurantId: number, featureIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedRestaurants = data.restaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          const updatedFeatures = [...restaurant.features];
          updatedFeatures[featureIndex] = { fr: newFr, en: newEn };
          return { ...restaurant, features: updatedFeatures };
        }
        return restaurant;
      });
      const updatedData = { ...data, restaurants: updatedRestaurants };
      setData(updatedData);
      await updateRestaurantsSection(updatedData);
    };
  };

  const addRestaurantFeature = async (restaurantId: number) => {
    const updatedRestaurants = data.restaurants.map((restaurant) => {
      if (restaurant.id === restaurantId) {
        const newFeature = { fr: 'Nouvelle caractéristique', en: 'New feature' };
        return { ...restaurant, features: [...restaurant.features, newFeature] };
      }
      return restaurant;
    });
    const updatedData = { ...data, restaurants: updatedRestaurants };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
  };

  const removeRestaurantFeature = async (restaurantId: number, featureIndex: number) => {
    const updatedRestaurants = data.restaurants.map((restaurant) => {
      if (restaurant.id === restaurantId) {
        const updatedFeatures = restaurant.features.filter((_, index) => index !== featureIndex);
        return { ...restaurant, features: updatedFeatures };
      }
      return restaurant;
    });
    const updatedData = { ...data, restaurants: updatedRestaurants };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
  };

  const toggleRestaurantHidden = async (restaurantId: number) => {
    const updatedRestaurants = data.restaurants.map((restaurant) => {
      if (restaurant.id === restaurantId) {
        return { ...restaurant, hidden: !restaurant.hidden };
      }
      return restaurant;
    });
    const updatedData = { ...data, restaurants: updatedRestaurants };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
  };

  const updateRestaurantImages = async (restaurantId: number, newImages: string[]) => {
    const updatedRestaurants = data.restaurants.map((restaurant) => {
      if (restaurant.id === restaurantId) {
        return { ...restaurant, images: newImages };
      }
      return restaurant;
    });
    const updatedData = { ...data, restaurants: updatedRestaurants };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
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

  const updateCtaLink = async (newLink: string) => {
    const updatedData = {
      ...data,
      cta: {
        ...data.cta,
        buttonLink: newLink,
      },
    };
    setData(updatedData);
    await updateRestaurantsSection(updatedData);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Erreur</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={data.hero.backgroundImage}
            alt="Restaurants & Bars"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {isAdmin ? (
              <Tooltip
                content={getText(data.hero.title)}
                onSave={updateHeroField('title')}
                isAdmin={isAdmin}
              />
            ) : (
              getText(data.hero.title)
            )}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {isAdmin ? (
              <Tooltip
                content={getText(data.hero.description)}
                onSave={updateHeroField('description')}
                isAdmin={isAdmin}
                multiline
              />
            ) : (
              <TextFormatter text={getText(data.hero.description)} />
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => navigate('#restaurants-list')}
            >
              {getText(data.hero.buttonTexts.primary)}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/contact')}
            >
              {getText(data.hero.buttonTexts.secondary)}
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.hero.stats.map((stat, index) => (
                <div key={index} className="text-center text-white">
                  <div className="text-2xl md:text-3xl font-bold mb-2">
                    {isAdmin ? (
                      <Tooltip
                        content={getText(stat.number)}
                        onSave={updateHeroStat(index, 'number')}
                        isAdmin={isAdmin}
                      />
                    ) : (
                      getText(stat.number)
                    )}
                  </div>
                  <div className="text-sm md:text-base">
                    {isAdmin ? (
                      <Tooltip
                        content={getText(stat.label)}
                        onSave={updateHeroStat(index, 'label')}
                        isAdmin={isAdmin}
                      />
                    ) : (
                      getText(stat.label)
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants List */}
      <section id="restaurants-list" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {data.restaurants
              .filter(restaurant => !restaurant.hidden)
              .map((restaurant, index) => (
                <div 
                  key={restaurant.id} 
                  id={`restaurant-${restaurant.id}`}
                  className={`flex flex-col lg:flex-row gap-8 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image Section with Carousel */}
                  <div className="lg:w-1/2 w-full">
                    <div className="rounded-lg overflow-hidden shadow-2xl h-80 lg:h-full">
                      <Carousel 
                        images={restaurant.images} 
                        isAdmin={isAdmin}
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-1/2 w-full space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold text-foreground">
                          {isAdmin ? (
                            <Tooltip
                              content={getText(restaurant.name)}
                              onSave={updateRestaurantField(restaurant.id, 'name')}
                              isAdmin={isAdmin}
                            />
                          ) : (
                            getText(restaurant.name)
                          )}
                        </h2>
                        {isAdmin && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleRestaurantHidden(restaurant.id)}
                            className="flex items-center gap-2"
                          >
                            {restaurant.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            {restaurant.hidden ? 'Afficher' : 'Masquer'}
                          </Button>
                        )}
                      </div>
                      
                      <p className="text-lg text-muted-foreground italic">
                        {isAdmin ? (
                          <Tooltip
                            content={getText(restaurant.type)}
                            onSave={updateRestaurantField(restaurant.id, 'type')}
                            isAdmin={isAdmin}
                          />
                        ) : (
                          getText(restaurant.type)
                        )}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < restaurant.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <Badge variant="secondary" className="text-sm">
                          {isAdmin ? (
                            <Tooltip
                              content={getText(restaurant.priceRange)}
                              onSave={updateRestaurantPriceRange(restaurant.id)}
                              isAdmin={isAdmin}
                            />
                          ) : (
                            getText(restaurant.priceRange)
                          )}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-foreground leading-relaxed">
                        {isAdmin ? (
                          <Tooltip
                            content={getText(restaurant.description)}
                            onSave={updateRestaurantField(restaurant.id, 'description')}
                            isAdmin={isAdmin}
                            multiline
                          />
                        ) : (
                          <TextFormatter text={getText(restaurant.description)} />
                        )}
                      </p>

                      <p className="text-muted-foreground leading-relaxed">
                        {isAdmin ? (
                          <Tooltip
                            content={getText(restaurant.detailedDescription)}
                            onSave={updateRestaurantField(restaurant.id, 'detailedDescription')}
                            isAdmin={isAdmin}
                            multiline
                          />
                        ) : (
                          <TextFormatter text={getText(restaurant.detailedDescription)} />
                        )}
                      </p>
                    </div>

                    {/* Restaurant Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="text-sm">
                          {isAdmin ? (
                            <Tooltip
                              content={getText(restaurant.hours)}
                              onSave={updateRestaurantHours(restaurant.id)}
                              isAdmin={isAdmin}
                              multiline
                            />
                          ) : (
                            getText(restaurant.hours)
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="text-sm">
                          {isAdmin ? (
                            <Tooltip
                              content={getText(restaurant.capacity)}
                              onSave={updateRestaurantCapacity(restaurant.id)}
                              isAdmin={isAdmin}
                            />
                          ) : (
                            getText(restaurant.capacity)
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="pt-4">
                      <h4 className="font-semibold text-foreground mb-3">
                        {currentLang.code === 'fr' ? 'Spécialités' : 'Specialties'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.specialties.map((specialty, specIndex) => (
                          <Badge key={specIndex} variant="outline" className="text-sm">
                            {isAdmin ? (
                              <div className="flex items-center gap-1">
                                <Tooltip
                                  content={getText(specialty)}
                                  onSave={updateRestaurantSpecialties(restaurant.id, specIndex)}
                                  isAdmin={isAdmin}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0 text-destructive hover:text-destructive/80"
                                  onClick={() => removeRestaurantSpecialty(restaurant.id, specIndex)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            ) : (
                              getText(specialty)
                            )}
                          </Badge>
                        ))}
                        {isAdmin && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addRestaurantSpecialty(restaurant.id)}
                            className="flex items-center gap-1"
                          >
                            <Plus className="w-4 h-4" />
                            Ajouter
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="pt-4">
                      <h4 className="font-semibold text-foreground mb-3">
                        {currentLang.code === 'fr' ? 'Caractéristiques' : 'Features'}
                      </h4>
                      <ul className="space-y-2">
                        {restaurant.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm">
                            <Sparkles className="w-4 h-4 text-primary" />
                            {isAdmin ? (
                              <div className="flex items-center gap-1">
                                <Tooltip
                                  content={getText(feature)}
                                  onSave={updateRestaurantFeatures(restaurant.id, featureIndex)}
                                  isAdmin={isAdmin}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0 text-destructive hover:text-destructive/80"
                                  onClick={() => removeRestaurantFeature(restaurant.id, featureIndex)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            ) : (
                              getText(feature)
                            )}
                          </li>
                        ))}
                        {isAdmin && (
                          <li>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addRestaurantFeature(restaurant.id)}
                              className="flex items-center gap-1"
                            >
                              <Plus className="w-4 h-4" />
                              Ajouter
                            </Button>
                          </li>
                        )}
                      </ul>
                    </div>

                    {restaurant.reservationRequired && (
                      <div className="pt-4">
                        <Badge variant="default" className="bg-primary text-primary-foreground">
                          {currentLang.code === 'fr' ? 'Réservation recommandée' : 'Reservation recommended'}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxSection
        backgroundImage="/uploads/cta-bg.jpg"
        className="py-20"
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isAdmin ? (
              <Tooltip
                content={getText(data.cta.title)}
                onSave={updateCtaField('title')}
                isAdmin={isAdmin}
              />
            ) : (
              getText(data.cta.title)
            )}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {isAdmin ? (
              <Tooltip
                content={getText(data.cta.description)}
                onSave={updateCtaField('description')}
                isAdmin={isAdmin}
                multiline
              />
            ) : (
              getText(data.cta.description)
            )}
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={() => navigate(data.cta.buttonLink || '/offres-speciales')}
          >
            {isAdmin ? (
              <Tooltip
                content={getText(data.cta.buttonText)}
                onSave={updateCtaField('buttonText')}
                isAdmin={isAdmin}
              />
            ) : (
              getText(data.cta.buttonText)
            )}
          </Button>
        </div>
      </ParallaxSection>

      <Footer />
    </div>
  );
};

export default Restaurants;