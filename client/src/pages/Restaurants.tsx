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

  const openImagePopup = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  // Fonction utilitaire pour gérer les clics sur les boutons de navigation
  const handleRestaurantNavigation = (sectionId: string) => {
    if (window.location.pathname === '/restaurants') {
      // Si déjà sur la page restaurants, on utilise le défilement direct
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        // Mettre à jour l'URL sans recharger
        window.history.pushState(null, '', `#${sectionId}`);
      }
    } else {
      // Sinon, navigation normale
      navigate(`/restaurants#${sectionId}`);
    }
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
                <TextFormatter text={getText(hero.title)} />
              </h1>
            </Tooltip>
            <div className="w-32 h-1 bg-primary mx-auto mb-8"></div>
            <Tooltip
              frLabel={hero.description.fr}
              enLabel={hero.description.en}
              onSave={updateHeroField('description')}
            >
              <div className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed drop-shadow-lg mb-12 text-white">
                <TextFormatter text={getText(hero.description)} className="drop-shadow-lg" />
              </div>
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
                            <div className="block">
                              <TextFormatter text={getText(stat.number)} />
                            </div>
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
                    <div className="text-lg">
                      <TextFormatter text={getText(stat.label)} />
                    </div>
                  </Tooltip>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => handleRestaurantNavigation('bistrot')}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
              >
                <Tooltip
                  frLabel={hero.buttonTexts.primary.fr}
                  enLabel={hero.buttonTexts.primary.en}
                  onSave={updateHeroButton('primary')}
                >
                  <span>
                    <TextFormatter text={getText(hero.buttonTexts.primary)} />
                  </span>
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
                  <span>
                    <TextFormatter text={getText(hero.buttonTexts.secondary)} />
                  </span>
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

      {/* Image Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeImagePopup}
        >
          <button 
            className="absolute top-4 right-4 text-white text-2xl z-10"
            onClick={closeImagePopup}
          >
            ×
          </button>
          <img 
            src={selectedImage} 
            alt="Image en grand format" 
            className="max-w-full max-h-full object-contain cursor-zoom-out"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

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
                      <div 
                        className="w-full h-80 lg:h-full relative cursor-pointer overflow-hidden"
                        onClick={() => openImagePopup(restaurant.image)}
                      >
                        <img 
                          src={restaurant.image} 
                          alt={getText(restaurant.name)}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
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
                              <TextFormatter text={getText(restaurant.type)} />
                            </Badge>
                          </Tooltip>
                        </div>
                        <Tooltip
                          frLabel={restaurant.name.fr}
                          enLabel={restaurant.name.en}
                          onSave={updateRestaurantField(index, 'name')}
                        >
                          <CardTitle className="text-3xl font-serif text-foreground mb-3">
                            <TextFormatter text={getText(restaurant.name)} />
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
                              <span>
                                <TextFormatter text={getText(restaurant.hours)} />
                              </span>
                            </Tooltip>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <Tooltip
                              frLabel={restaurant.capacity.fr}
                              enLabel={restaurant.capacity.en}
                              onSave={updateRestaurantField(index, 'capacity')}
                            >
                              <span>
                                <TextFormatter text={getText(restaurant.capacity)} />
                              </span>
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
                          <div className="text-muted-foreground leading-relaxed">
                            <TextFormatter text={getText(restaurant.description)} />
                          </div>
                        </Tooltip>
                        
                        <Tooltip
                          frLabel={restaurant.detailedDescription.fr}
                          enLabel={restaurant.detailedDescription.en}
                          onSave={updateRestaurantField(index, 'detailedDescription')}
                        >
                          <div className="text-muted-foreground leading-relaxed text-sm">
                            <TextFormatter text={getText(restaurant.detailedDescription)} />
                          </div>
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
                                      <span className="block">
                                        <TextFormatter text={getText(specialty)} className="block" />
                                      </span>
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
                                      <span className="block">
                                        <TextFormatter text={getText(feature)} className="block" />
                                      </span>
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
                              <span className="ml-1">
                                <TextFormatter text={getText(restaurant.dressCode)} />
                              </span>
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
              <TextFormatter text={getText(cta.title)} />
            </h2>
          </Tooltip>
          <Tooltip
            frLabel={cta.description.fr}
            enLabel={cta.description.en}
            onSave={updateCtaField('description')}
          >
            <div className="text-xl text-muted-foreground mb-8 leading-relaxed">
              <TextFormatter text={getText(cta.description)} />
            </div>
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
              <span>
                <TextFormatter text={getText(cta.buttonText)} />
              </span>
            </Tooltip>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Restaurants;