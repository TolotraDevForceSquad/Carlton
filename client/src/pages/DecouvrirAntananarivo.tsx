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

  const { hero, attractions, cta } = data;

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
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-64 w-full mb-4" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
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