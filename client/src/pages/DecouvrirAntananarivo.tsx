// src/pages/DecouvrirAntananarivo.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Clock, Star, Utensils } from 'lucide-react';
import Footer from '@/components/Footer';
import { decouvrirAntananarivoPageData as initialPageData } from '@/data/decouvrirAntananarivoData';
import { useLanguage } from '@/components/context/LanguageContext';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';

const SECTION_KEY = 'decouvrirAntananarivo';

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const DecouvrirAntananarivo = () => {
  const { currentLang } = useLanguage();
  const lang = currentLang.code.toLowerCase();
  
  const [data, setData] = useState(initialPageData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to split pageData into dataFr and dataEn structures
  const splitPageData = (mixedData: typeof initialPageData) => {
    const dataFr = {
      hero: {
        title: mixedData.hero.title.fr,
        description: mixedData.hero.description.fr,
      },
      attractions: {
        title: mixedData.attractions.title.fr,
        description: mixedData.attractions.description.fr,
        highlightsLabel: mixedData.attractions.highlightsLabel.fr,
        image: mixedData.attractions.image,
        items: mixedData.attractions.items.map((item) => ({
          title: item.title.fr,
          description: item.description.fr,
          distance: item.distance.fr,
          duration: item.duration.fr,
          category: item.category.fr,
          highlights: item.highlights.map((h) => h.fr),
          icon: item.icon,
        })),
      },
      excursions: {
        title: mixedData.excursions.title.fr,
        description: mixedData.excursions.description.fr,
        includesLabel: mixedData.excursions.includesLabel.fr,
        priceNote: mixedData.excursions.priceNote.fr,
        image: mixedData.excursions.image,
        items: mixedData.excursions.items.map((item) => ({
          title: item.title.fr,
          description: item.description.fr,
          distance: item.distance.fr,
          duration: item.duration.fr,
          category: item.category.fr,
          price: item.price.fr,
          includes: item.includes.map((i) => i.fr),
          icon: item.icon,
        })),
      },
      restaurants: {
        title: mixedData.restaurants.title.fr,
        description: mixedData.restaurants.description.fr,
        image: mixedData.restaurants.image,
        items: mixedData.restaurants.items.map((item) => ({
          name: item.name.fr,
          cuisine: item.cuisine.fr,
          distance: item.distance.fr,
          specialite: item.specialite.fr,
        })),
      },
      cta: {
        title: mixedData.cta.title.fr,
        description: mixedData.cta.description.fr,
        buttonText: mixedData.cta.buttonText.fr,
      },
      categories: mixedData.categories.fr,
    };

    const dataEn = {
      hero: {
        title: mixedData.hero.title.en,
        description: mixedData.hero.description.en,
      },
      attractions: {
        title: mixedData.attractions.title.en,
        description: mixedData.attractions.description.en,
        highlightsLabel: mixedData.attractions.highlightsLabel.en,
        image: mixedData.attractions.image,
        items: mixedData.attractions.items.map((item) => ({
          title: item.title.en,
          description: item.description.en,
          distance: item.distance.en,
          duration: item.duration.en,
          category: item.category.en,
          highlights: item.highlights.map((h) => h.en),
          icon: item.icon,
        })),
      },
      excursions: {
        title: mixedData.excursions.title.en,
        description: mixedData.excursions.description.en,
        includesLabel: mixedData.excursions.includesLabel.en,
        priceNote: mixedData.excursions.priceNote.en,
        image: mixedData.excursions.image,
        items: mixedData.excursions.items.map((item) => ({
          title: item.title.en,
          description: item.description.en,
          distance: item.distance.en,
          duration: item.duration.en,
          category: item.category.en,
          price: item.price.en,
          includes: item.includes.map((i) => i.en),
          icon: item.icon,
        })),
      },
      restaurants: {
        title: mixedData.restaurants.title.en,
        description: mixedData.restaurants.description.en,
        image: mixedData.restaurants.image,
        items: mixedData.restaurants.items.map((item) => ({
          name: item.name.en,
          cuisine: item.cuisine.en,
          distance: item.distance.en,
          specialite: item.specialite.en,
        })),
      },
      cta: {
        title: mixedData.cta.title.en,
        description: mixedData.cta.description.en,
        buttonText: mixedData.cta.buttonText.en,
      },
      categories: mixedData.categories.en,
    };

    return { dataFr, dataEn };
  };

  // Reconstruct mixed data from dataFr and dataEn
  const reconstructMixed = (dataFr: any, dataEn: any | null) => {
    if (!dataFr || typeof dataFr !== 'object') {
      console.warn('Invalid dataFr structure, falling back to default');
      return initialPageData;
    }
    const enFallback = dataEn || dataFr;
    const mixed = {
      hero: {
        title: { fr: dataFr.hero.title, en: enFallback.hero.title || dataFr.hero.title },
        description: { fr: dataFr.hero.description, en: enFallback.hero.description || dataFr.hero.description },
      },
      attractions: {
        title: { fr: dataFr.attractions.title, en: enFallback.attractions.title || dataFr.attractions.title },
        description: { fr: dataFr.attractions.description, en: enFallback.attractions.description || dataFr.attractions.description },
        highlightsLabel: { fr: dataFr.attractions.highlightsLabel, en: enFallback.attractions.highlightsLabel || dataFr.attractions.highlightsLabel },
        image: dataFr.attractions.image || initialPageData.attractions.image,
        items: dataFr.attractions.items.map((itemFr: any, i: number) => ({
          title: { fr: itemFr.title, en: enFallback.attractions.items[i]?.title || itemFr.title },
          description: { fr: itemFr.description, en: enFallback.attractions.items[i]?.description || itemFr.description },
          distance: { 
            fr: itemFr.distance || initialPageData.attractions.items[i].distance.fr, 
            en: enFallback.attractions.items[i]?.distance || initialPageData.attractions.items[i].distance.en 
          },
          duration: { 
            fr: itemFr.duration || initialPageData.attractions.items[i].duration.fr, 
            en: enFallback.attractions.items[i]?.duration || initialPageData.attractions.items[i].duration.en 
          },
          category: { fr: itemFr.category, en: enFallback.attractions.items[i]?.category || itemFr.category },
          highlights: itemFr.highlights.map((hFr: string, hI: number) => ({
            fr: hFr,
            en: enFallback.attractions.items[i]?.highlights[hI] || hFr,
          })),
          icon: itemFr.icon || initialPageData.attractions.items[i].icon,
        })),
      },
      excursions: {
        title: { fr: dataFr.excursions.title, en: enFallback.excursions.title || dataFr.excursions.title },
        description: { fr: dataFr.excursions.description, en: enFallback.excursions.description || dataFr.excursions.description },
        includesLabel: { fr: dataFr.excursions.includesLabel, en: enFallback.excursions.includesLabel || dataFr.excursions.includesLabel },
        priceNote: { fr: dataFr.excursions.priceNote, en: enFallback.excursions.priceNote || dataFr.excursions.priceNote },
        image: dataFr.excursions.image || initialPageData.excursions.image,
        items: dataFr.excursions.items.map((itemFr: any, i: number) => ({
          title: { fr: itemFr.title, en: enFallback.excursions.items[i]?.title || itemFr.title },
          description: { fr: itemFr.description, en: enFallback.excursions.items[i]?.description || itemFr.description },
          distance: { 
            fr: itemFr.distance || initialPageData.excursions.items[i].distance.fr, 
            en: enFallback.excursions.items[i]?.distance || initialPageData.excursions.items[i].distance.en 
          },
          duration: { 
            fr: itemFr.duration || initialPageData.excursions.items[i].duration.fr, 
            en: enFallback.excursions.items[i]?.duration || initialPageData.excursions.items[i].duration.en 
          },
          category: { fr: itemFr.category, en: enFallback.excursions.items[i]?.category || itemFr.category },
          price: { fr: itemFr.price, en: enFallback.excursions.items[i]?.price || itemFr.price },
          includes: itemFr.includes.map((incFr: string, incI: number) => ({
            fr: incFr,
            en: enFallback.excursions.items[i]?.includes[incI] || incFr,
          })),
          icon: itemFr.icon || initialPageData.excursions.items[i].icon,
        })),
      },
      restaurants: {
        title: { fr: dataFr.restaurants.title, en: enFallback.restaurants.title || dataFr.restaurants.title },
        description: { fr: dataFr.restaurants.description, en: enFallback.restaurants.description || dataFr.restaurants.description },
        image: dataFr.restaurants.image || initialPageData.restaurants.image,
        items: dataFr.restaurants.items.map((itemFr: any, i: number) => ({
          name: { fr: itemFr.name, en: enFallback.restaurants.items[i]?.name || itemFr.name },
          cuisine: { fr: itemFr.cuisine, en: enFallback.restaurants.items[i]?.cuisine || itemFr.cuisine },
          distance: { 
            fr: itemFr.distance || initialPageData.restaurants.items[i].distance.fr, 
            en: enFallback.restaurants.items[i]?.distance || initialPageData.restaurants.items[i].distance.en 
          },
          specialite: { fr: itemFr.specialite, en: enFallback.restaurants.items[i]?.specialite || itemFr.specialite },
        })),
      },
      cta: {
        title: { fr: dataFr.cta.title, en: enFallback.cta.title || dataFr.cta.title },
        description: { fr: dataFr.cta.description, en: enFallback.cta.description || dataFr.cta.description },
        buttonText: { fr: dataFr.cta.buttonText, en: enFallback.cta.buttonText || dataFr.cta.buttonText },
      },
      categories: {
        fr: dataFr.categories,
        en: enFallback.categories || dataFr.categories,
      },
    };
    return mixed;
  };

  // Fetch page data from backend
  useEffect(() => {
    const fetchPageData = async () => {
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
          const { dataFr, dataEn } = splitPageData(initialPageData);
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
            throw new Error('Failed to create page data');
          }

          const created = await createResponse.json();
          section = created;
        }

        if (section) {
          const fetchedData = reconstructMixed(section.dataFr, section.dataEn);
          setData(fetchedData);
        } else {
          setData(initialPageData);
        }
      } catch (err) {
        console.error('Error fetching page data:', err);
        setError('Failed to load page data');
        setData(initialPageData);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  const updatePageSection = async (updatedMixedData: typeof initialPageData) => {
    try {
      const headers = getAuthHeaders();
      const currentSectionResponse = await fetch(`/api/globalSections?sectionKey=${SECTION_KEY}`, { headers });
      let currentData: any[] = [];
      if (currentSectionResponse.ok) {
        currentData = await currentSectionResponse.json();
      }
      let currentSection = currentData.find((s: any) => s.sectionKey === SECTION_KEY);

      if (!currentSection) {
        const { dataFr, dataEn } = splitPageData(initialPageData);
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

      const { dataFr: updatedDataFr, dataEn: updatedDataEn } = splitPageData(updatedMixedData);

      const putResponse = await fetch(`/api/globalSections/${currentSection.id}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataFr: updatedDataFr,
          dataEn: Object.keys(updatedDataEn).length > 0 ? updatedDataEn : null
        })
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update page section');
      }
    } catch (err) {
      console.error('Error updating page section:', err);
    }
  };

  // Update functions
  const updateHeroTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      hero: { ...data.hero, title: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateHeroDescription = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      hero: { ...data.hero, description: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateAttractionsTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      attractions: { ...data.attractions, title: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateAttractionsDescription = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      attractions: { ...data.attractions, description: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateAttractionsHighlightsLabel = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      attractions: { ...data.attractions, highlightsLabel: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateAttractionsImage = async (newImageUrl: string) => {
    const updatedData = {
      ...data,
      attractions: { ...data.attractions, image: newImageUrl }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateAttractionTitle = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.attractions.items.map((item, i) =>
      i === index ? { ...item, title: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      attractions: { ...data.attractions, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateAttractionDescription = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.attractions.items.map((item, i) =>
      i === index ? { ...item, description: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      attractions: { ...data.attractions, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateAttractionDistance = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.attractions.items.map((item, i) =>
      i === index ? { ...item, distance: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      attractions: { ...data.attractions, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateAttractionDuration = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.attractions.items.map((item, i) =>
      i === index ? { ...item, duration: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      attractions: { ...data.attractions, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateAttractionCategory = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.attractions.items.map((item, i) =>
      i === index ? { ...item, category: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      attractions: { ...data.attractions, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateAttractionHighlight = (index: number, hIndex: number) => async (newFr: string, newEn: string) => {
    const newItems = data.attractions.items.map((item, i) =>
      i === index
        ? {
            ...item,
            highlights: item.highlights.map((h, hi) =>
              hi === hIndex ? { fr: newFr, en: newEn } : h
            )
          }
        : item
    );
    const updatedData = {
      ...data,
      attractions: { ...data.attractions, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateExcursionsTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      excursions: { ...data.excursions, title: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateExcursionsDescription = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      excursions: { ...data.excursions, description: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateExcursionsIncludesLabel = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      excursions: { ...data.excursions, includesLabel: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateExcursionsPriceNote = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      excursions: { ...data.excursions, priceNote: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateExcursionsImage = async (newImageUrl: string) => {
    const updatedData = {
      ...data,
      excursions: { ...data.excursions, image: newImageUrl }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateExcursionTitle = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.excursions.items.map((item, i) =>
      i === index ? { ...item, title: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      excursions: { ...data.excursions, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateExcursionDescription = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.excursions.items.map((item, i) =>
      i === index ? { ...item, description: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      excursions: { ...data.excursions, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateExcursionDistance = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.excursions.items.map((item, i) =>
      i === index ? { ...item, distance: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      excursions: { ...data.excursions, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateExcursionDuration = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.excursions.items.map((item, i) =>
      i === index ? { ...item, duration: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      excursions: { ...data.excursions, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateExcursionCategory = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.excursions.items.map((item, i) =>
      i === index ? { ...item, category: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      excursions: { ...data.excursions, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateExcursionPrice = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.excursions.items.map((item, i) =>
      i === index ? { ...item, price: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      excursions: { ...data.excursions, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateExcursionInclude = (index: number, incIndex: number) => async (newFr: string, newEn: string) => {
    const newItems = data.excursions.items.map((item, i) =>
      i === index
        ? {
            ...item,
            includes: item.includes.map((inc, ii) =>
              ii === incIndex ? { fr: newFr, en: newEn } : inc
            )
          }
        : item
    );
    const updatedData = {
      ...data,
      excursions: { ...data.excursions, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateRestaurantsTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      restaurants: { ...data.restaurants, title: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateRestaurantsDescription = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      restaurants: { ...data.restaurants, description: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateRestaurantsImage = async (newImageUrl: string) => {
    const updatedData = {
      ...data,
      restaurants: { ...data.restaurants, image: newImageUrl }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateRestaurantName = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.restaurants.items.map((item, i) =>
      i === index ? { ...item, name: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      restaurants: { ...data.restaurants, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateRestaurantCuisine = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.restaurants.items.map((item, i) =>
      i === index ? { ...item, cuisine: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      restaurants: { ...data.restaurants, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateRestaurantDistance = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.restaurants.items.map((item, i) =>
      i === index ? { ...item, distance: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      restaurants: { ...data.restaurants, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateRestaurantSpecialite = (index: number) => async (newFr: string, newEn: string) => {
    const newItems = data.restaurants.items.map((item, i) =>
      i === index ? { ...item, specialite: { fr: newFr, en: newEn } } : item
    );
    const updatedData = {
      ...data,
      restaurants: { ...data.restaurants, items: newItems }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateCtaTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      cta: { ...data.cta, title: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateCtaDescription = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      cta: { ...data.cta, description: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const updateCtaButtonText = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      cta: { ...data.cta, buttonText: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updatePageSection(updatedData);
  };

  const { hero, attractions, excursions, restaurants, cta } = data;

  const getText = (textObj: { fr: string; en: string } | string): string => {
    return typeof textObj === 'string' ? textObj : textObj[lang];
  };

  const getIcon = (iconName: string) => {
    const icons = {
      Building: <Utensils className="w-6 h-6" />, // Placeholder, adjust as needed
      Camera: <Utensils className="w-6 h-6" />,
      Mountain: <Utensils className="w-6 h-6" />,
      TreePine: <Utensils className="w-6 h-6" />,
      ShoppingBag: <Utensils className="w-6 h-6" />
    };
    return icons[iconName as keyof typeof icons] || <Utensils className="w-6 h-6" />;
  };

  const getHighlights = (highlights: Array<{ fr: string; en: string }>) => 
    highlights.map((highlight) => getText(highlight));

  const getIncludes = (includes: Array<{ fr: string; en: string }>) => 
    includes.map((item) => getText(item));

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="pt-20 pb-16 bg-gradient-to-b from-background to-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Skeleton className="h-16 w-96 mx-auto mb-6" />
            <Skeleton className="h-8 w-full max-w-3xl mx-auto" />
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
              <div className="lg:w-1/2">
                <Skeleton className="h-12 w-64 mb-6" />
                <Skeleton className="h-6 w-full" />
              </div>
              <Skeleton className="lg:w-1/2 h-80 w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-64 w-full mb-4" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-card/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-16">
              <div className="lg:w-1/2">
                <Skeleton className="h-12 w-64 mb-6" />
                <Skeleton className="h-6 w-full" />
              </div>
              <Skeleton className="lg:w-1/2 h-80 w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-64 w-full mb-4" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
              <div className="lg:w-1/2">
                <Skeleton className="h-12 w-64 mb-6" />
                <Skeleton className="h-6 w-full" />
              </div>
              <Skeleton className="lg:w-1/2 h-80 w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-gradient-to-b from-card/20 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Skeleton className="h-12 w-80 mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-md mx-auto mb-8" />
            <Skeleton className="h-12 w-48 mx-auto" />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.warn(error);
  }

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            <Tooltip 
              frLabel={data.hero.title.fr} 
              enLabel={data.hero.title.en} 
              onSave={updateHeroTitle}
            >
              {getText(hero.title)}
            </Tooltip>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <Tooltip 
              frLabel={data.hero.description.fr} 
              enLabel={data.hero.description.en} 
              onSave={updateHeroDescription}
            >
              {getText(hero.description)}
            </Tooltip>
          </p>
        </div>
      </section>

      {/* City Attractions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Attractions Hero with Photo Frame */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                <Tooltip 
                  frLabel={data.attractions.title.fr} 
                  enLabel={data.attractions.title.en} 
                  onSave={updateAttractionsTitle}
                >
                  {getText(attractions.title)}
                </Tooltip>
              </h2>
              <p className="text-lg text-muted-foreground">
                <Tooltip 
                  frLabel={data.attractions.description.fr} 
                  enLabel={data.attractions.description.en} 
                  onSave={updateAttractionsDescription}
                >
                  {getText(attractions.description)}
                </Tooltip>
              </p>
            </div>
            <div className="lg:w-1/2">
              <ImageTooltip imageUrl={data.attractions.image} onSave={updateAttractionsImage}>
                <div className="relative">
                  <img 
                    src={attractions.image} 
                    alt={getText(attractions.title)}
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                    data-testid="img-attractions-hero"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </ImageTooltip>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.items.map((attraction, index) => (
              <Card key={index} className="group hover-elevate transition-all duration-300" data-testid={`card-attraction-${index}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {getIcon(attraction.icon)}
                    </div>
                    <Badge variant="secondary" data-testid={`badge-category-${index}`}>
                      <Tooltip 
                        frLabel={data.attractions.items[index].category.fr} 
                        enLabel={data.attractions.items[index].category.en} 
                        onSave={updateAttractionCategory(index)}
                      >
                        {getText(attraction.category)}
                      </Tooltip>
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground" data-testid={`title-attraction-${index}`}>
                    <Tooltip 
                      frLabel={data.attractions.items[index].title.fr} 
                      enLabel={data.attractions.items[index].title.en} 
                      onSave={updateAttractionTitle(index)}
                    >
                      {getText(attraction.title)}
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4" data-testid={`description-attraction-${index}`}>
                    <Tooltip 
                      frLabel={data.attractions.items[index].description.fr} 
                      enLabel={data.attractions.items[index].description.en} 
                      onSave={updateAttractionDescription(index)}
                    >
                      {getText(attraction.description)}
                    </Tooltip>
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <Tooltip 
                        frLabel={data.attractions.items[index].distance.fr} 
                        enLabel={data.attractions.items[index].distance.en} 
                        onSave={updateAttractionDistance(index)}
                      >
                        <span>{getText(attraction.distance)}</span>
                      </Tooltip>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <Tooltip 
                        frLabel={data.attractions.items[index].duration.fr} 
                        enLabel={data.attractions.items[index].duration.en} 
                        onSave={updateAttractionDuration(index)}
                      >
                        <span>{getText(attraction.duration)}</span>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-semibold text-foreground">
                      <Tooltip 
                        frLabel={data.attractions.highlightsLabel.fr} 
                        enLabel={data.attractions.highlightsLabel.en} 
                        onSave={updateAttractionsHighlightsLabel}
                      >
                        {getText(attractions.highlightsLabel)}
                      </Tooltip>
                    </h4>
                    {getHighlights(attraction.highlights).map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                        <Tooltip 
                          frLabel={data.attractions.items[index].highlights[highlightIndex].fr} 
                          enLabel={data.attractions.items[index].highlights[highlightIndex].en} 
                          onSave={updateAttractionHighlight(index, highlightIndex)}
                        >
                          <span>{highlight}</span>
                        </Tooltip>
                      </div>
                    ))}
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Excursions */}
      <section className="py-16 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Excursions Hero with Photo Frame */}
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                <Tooltip 
                  frLabel={data.excursions.title.fr} 
                  enLabel={data.excursions.title.en} 
                  onSave={updateExcursionsTitle}
                >
                  {getText(excursions.title)}
                </Tooltip>
              </h2>
              <p className="text-lg text-muted-foreground">
                <Tooltip 
                  frLabel={data.excursions.description.fr} 
                  enLabel={data.excursions.description.en} 
                  onSave={updateExcursionsDescription}
                >
                  {getText(excursions.description)}
                </Tooltip>
              </p>
            </div>
            <div className="lg:w-1/2">
              <ImageTooltip imageUrl={data.excursions.image} onSave={updateExcursionsImage}>
                <div className="relative">
                  <img 
                    src={excursions.image} 
                    alt={getText(excursions.title)}
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                    data-testid="img-excursions-hero"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </ImageTooltip>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {excursions.items.map((excursion, index) => (
              <Card key={index} className="group hover-elevate transition-all duration-300" data-testid={`card-excursion-${index}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {getIcon(excursion.icon)}
                    </div>
                    <Badge variant="outline" data-testid={`badge-excursion-category-${index}`}>
                      <Tooltip 
                        frLabel={data.excursions.items[index].category.fr} 
                        enLabel={data.excursions.items[index].category.en} 
                        onSave={updateExcursionCategory(index)}
                      >
                        {getText(excursion.category)}
                      </Tooltip>
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground" data-testid={`title-excursion-${index}`}>
                    <Tooltip 
                      frLabel={data.excursions.items[index].title.fr} 
                      enLabel={data.excursions.items[index].title.en} 
                      onSave={updateExcursionTitle(index)}
                    >
                      {getText(excursion.title)}
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4" data-testid={`description-excursion-${index}`}>
                    <Tooltip 
                      frLabel={data.excursions.items[index].description.fr} 
                      enLabel={data.excursions.items[index].description.en} 
                      onSave={updateExcursionDescription(index)}
                    >
                      {getText(excursion.description)}
                    </Tooltip>
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <Tooltip 
                        frLabel={data.excursions.items[index].distance.fr} 
                        enLabel={data.excursions.items[index].distance.en} 
                        onSave={updateExcursionDistance(index)}
                      >
                        <span>{getText(excursion.distance)}</span>
                      </Tooltip>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <Tooltip 
                        frLabel={data.excursions.items[index].duration.fr} 
                        enLabel={data.excursions.items[index].duration.en} 
                        onSave={updateExcursionDuration(index)}
                      >
                        <span>{getText(excursion.duration)}</span>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      <Tooltip 
                        frLabel={data.excursions.includesLabel.fr} 
                        enLabel={data.excursions.includesLabel.en} 
                        onSave={updateExcursionsIncludesLabel}
                      >
                        {getText(excursions.includesLabel)}
                      </Tooltip>
                    </h4>
                    <div className="space-y-1">
                      {getIncludes(excursion.includes).map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center text-sm text-muted-foreground">
                          <Star className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                          <Tooltip 
                            frLabel={data.excursions.items[index].includes[itemIndex].fr} 
                            enLabel={data.excursions.items[index].includes[itemIndex].en} 
                            onSave={updateExcursionInclude(index, itemIndex)}
                          >
                            <span>{item}</span>
                          </Tooltip>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-lg font-semibold text-primary" data-testid={`price-excursion-${index}`}>
                      <Tooltip 
                        frLabel={data.excursions.items[index].price.fr} 
                        enLabel={data.excursions.items[index].price.en} 
                        onSave={updateExcursionPrice(index)}
                      >
                        {getText(excursion.price)}
                      </Tooltip>
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      <Tooltip 
                        frLabel={data.excursions.priceNote.fr} 
                        enLabel={data.excursions.priceNote.en} 
                        onSave={updateExcursionsPriceNote}
                      >
                        {getText(excursions.priceNote)}
                      </Tooltip>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Locaux */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Restaurants Hero with Photo Frame */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                <Tooltip 
                  frLabel={data.restaurants.title.fr} 
                  enLabel={data.restaurants.title.en} 
                  onSave={updateRestaurantsTitle}
                >
                  {getText(restaurants.title)}
                </Tooltip>
              </h2>
              <p className="text-lg text-muted-foreground">
                <Tooltip 
                  frLabel={data.restaurants.description.fr} 
                  enLabel={data.restaurants.description.en} 
                  onSave={updateRestaurantsDescription}
                >
                  {getText(restaurants.description)}
                </Tooltip>
              </p>
            </div>
            <div className="lg:w-1/2">
              <ImageTooltip imageUrl={data.restaurants.image} onSave={updateRestaurantsImage}>
                <div className="relative">
                  <img 
                    src={restaurants.image} 
                    alt={getText(restaurants.title)}
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                    data-testid="img-restaurants-hero"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </ImageTooltip>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurants.items.map((restaurant, index) => (
              <Card key={index} className="group hover-elevate transition-all duration-300" data-testid={`card-restaurant-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1" data-testid={`name-restaurant-${index}`}>
                        <Tooltip 
                          frLabel={data.restaurants.items[index].name.fr} 
                          enLabel={data.restaurants.items[index].name.en} 
                          onSave={updateRestaurantName(index)}
                        >
                          {getText(restaurant.name)}
                        </Tooltip>
                      </h3>
                      <p className="text-sm text-primary" data-testid={`cuisine-restaurant-${index}`}>
                        <Tooltip 
                          frLabel={data.restaurants.items[index].cuisine.fr} 
                          enLabel={data.restaurants.items[index].cuisine.en} 
                          onSave={updateRestaurantCuisine(index)}
                        >
                          {getText(restaurant.cuisine)}
                        </Tooltip>
                      </p>
                    </div>
                    <Utensils className="w-5 h-5 text-primary" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4" data-testid={`specialty-restaurant-${index}`}>
                    <Tooltip 
                      frLabel={data.restaurants.items[index].specialite.fr} 
                      enLabel={data.restaurants.items[index].specialite.en} 
                      onSave={updateRestaurantSpecialite(index)}
                    >
                      {getText(restaurant.specialite)}
                    </Tooltip>
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      <Tooltip 
                        frLabel={data.restaurants.items[index].distance.fr} 
                        enLabel={data.restaurants.items[index].distance.en} 
                        onSave={updateRestaurantDistance(index)}
                      >
                        <span>{getText(restaurant.distance)}</span>
                      </Tooltip>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-16 bg-gradient-to-b from-card/20 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
            <Tooltip 
              frLabel={data.cta.title.fr} 
              enLabel={data.cta.title.en} 
              onSave={updateCtaTitle}
            >
              {getText(cta.title)}
            </Tooltip>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            <Tooltip 
              frLabel={data.cta.description.fr} 
              enLabel={data.cta.description.en} 
              onSave={updateCtaDescription}
            >
              {getText(cta.description)}
            </Tooltip>
          </p>
          
          <div className="flex justify-center">
            <Button size="lg" data-testid="button-reserve-room">
              <Tooltip 
                frLabel={data.cta.buttonText.fr} 
                enLabel={data.cta.buttonText.en} 
                onSave={updateCtaButtonText}
              >
                {getText(cta.buttonText)}
              </Tooltip>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DecouvrirAntananarivo;