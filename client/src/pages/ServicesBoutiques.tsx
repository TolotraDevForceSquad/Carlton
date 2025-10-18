// src/pages/ServicesBoutiques.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Star, ShoppingBag, Bell, Car, Plane, Shirt, Coffee, Wifi } from 'lucide-react';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';
import Footer from '@/components/Footer';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { servicesBoutiquesPageData } from '@/data/servicesBoutiquesData';
import { useLanguage } from '@/components/context/LanguageContext';
import servicesImage from '@assets/stock_images/luxury_hotel_concier_6320d533.jpg';
import boutiquesImage from '@assets/stock_images/luxury_hotel_boutiqu_880b0196.jpg';

const SECTION_KEY = 'servicesBoutiques';

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Helper to split servicesBoutiquesPageData into dataFr and dataEn structures
const splitServicesBoutiquesData = (mixedData: typeof servicesBoutiquesPageData) => {
  const dataFr = {
    hero: {
      title: mixedData.hero.title.fr,
      description: mixedData.hero.description.fr,
    },
    services: {
      title: mixedData.services.title.fr,
      description: mixedData.services.description.fr,
      image: mixedData.services.image,
      items: mixedData.services.items.map((item) => ({
        title: item.title.fr,
        description: item.description.fr,
        icon: item.icon,
        features: item.features.map((feature) => feature.fr),
        category: item.category.fr,
      })),
    },
    boutiques: {
      title: mixedData.boutiques.title.fr,
      description: mixedData.boutiques.description.fr,
      image: mixedData.boutiques.image,
      items: mixedData.boutiques.items.map((item) => ({
        title: item.title.fr,
        description: item.description.fr,
        hours: item.hours.fr,
        specialties: item.specialties.map((specialty) => specialty.fr),
        location: item.location.fr,
      })),
    },
    cta: {
      title: mixedData.cta.title.fr,
      description: mixedData.cta.description.fr,
      buttonText: mixedData.cta.buttonText.fr,
    },
  };

  const dataEn = {
    hero: {
      title: mixedData.hero.title.en,
      description: mixedData.hero.description.en,
    },
    services: {
      title: mixedData.services.title.en,
      description: mixedData.services.description.en,
      image: mixedData.services.image,
      items: mixedData.services.items.map((item) => ({
        title: item.title.en,
        description: item.description.en,
        icon: item.icon,
        features: item.features.map((feature) => feature.en),
        category: item.category.en,
      })),
    },
    boutiques: {
      title: mixedData.boutiques.title.en,
      description: mixedData.boutiques.description.en,
      image: mixedData.boutiques.image,
      items: mixedData.boutiques.items.map((item) => ({
        title: item.title.en,
        description: item.description.en,
        hours: item.hours.en,
        specialties: item.specialties.map((specialty) => specialty.en),
        location: item.location.en,
      })),
    },
    cta: {
      title: mixedData.cta.title.en,
      description: mixedData.cta.description.en,
      buttonText: mixedData.cta.buttonText.en,
    },
  };

  return { dataFr, dataEn };
};

// Reconstruct mixed data from dataFr and dataEn
const reconstructMixed = (dataFr: any, dataEn: any | null) => {
  if (!dataFr || typeof dataFr !== 'object') {
    console.warn('Invalid dataFr structure, falling back to default');
    return servicesBoutiquesPageData;
  }
  const enFallback = dataEn || dataFr;
  return {
    hero: {
      title: { fr: dataFr.hero.title, en: enFallback.hero.title },
      description: { fr: dataFr.hero.description, en: enFallback.hero.description },
    },
    services: {
      title: { fr: dataFr.services.title, en: enFallback.services.title },
      description: { fr: dataFr.services.description, en: enFallback.services.description },
      image: dataFr.services.image,
      items: dataFr.services.items.map((itemFr: any, i: number) => {
        const itemEn = enFallback.services.items[i] || itemFr;
        return {
          title: { fr: itemFr.title, en: itemEn.title },
          description: { fr: itemFr.description, en: itemEn.description },
          icon: itemFr.icon,
          features: itemFr.features.map((fFr: string, j: number) => ({
            fr: fFr,
            en: itemEn.features[j] || fFr,
          })),
          category: { fr: itemFr.category, en: itemEn.category },
        };
      }),
    },
    boutiques: {
      title: { fr: dataFr.boutiques.title, en: enFallback.boutiques.title },
      description: { fr: dataFr.boutiques.description, en: enFallback.boutiques.description },
      image: dataFr.boutiques.image,
      items: dataFr.boutiques.items.map((itemFr: any, i: number) => {
        const itemEn = enFallback.boutiques.items[i] || itemFr;
        return {
          title: { fr: itemFr.title, en: itemEn.title },
          description: { fr: itemFr.description, en: itemEn.description },
          hours: { fr: itemFr.hours, en: itemEn.hours },
          specialties: itemFr.specialties.map((sFr: string, j: number) => ({
            fr: sFr,
            en: itemEn.specialties[j] || sFr,
          })),
          location: { fr: itemFr.location, en: itemEn.location },
        };
      }),
    },
    cta: {
      title: { fr: dataFr.cta.title, en: enFallback.cta.title },
      description: { fr: dataFr.cta.description, en: enFallback.cta.description },
      buttonText: { fr: dataFr.cta.buttonText, en: enFallback.cta.buttonText },
    },
  };
};

const ServicesBoutiques = () => {
  const pageData = servicesBoutiquesPageData;
  const { currentLang } = useLanguage();
  const langKey = currentLang.code.toLowerCase() as 'fr' | 'en';
  const [data, setData] = useState(reconstructMixed(splitServicesBoutiquesData(pageData).dataFr, splitServicesBoutiquesData(pageData).dataEn));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch servicesBoutiques data from backend
  useEffect(() => {
    const fetchServicesBoutiquesData = async () => {
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
          const { dataFr, dataEn } = splitServicesBoutiquesData(pageData);
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
            throw new Error('Failed to create servicesBoutiques data');
          }

          const created = await createResponse.json();
          section = created;
        }

        if (section) {
          const fetchedData = reconstructMixed(section.dataFr, section.dataEn);
          setData(fetchedData);
        } else {
          setData(reconstructMixed(splitServicesBoutiquesData(pageData).dataFr, splitServicesBoutiquesData(pageData).dataEn));
        }
      } catch (err) {
        console.error('Error fetching servicesBoutiques data:', err);
        setError('Failed to load servicesBoutiques data');
        setData(reconstructMixed(splitServicesBoutiquesData(pageData).dataFr, splitServicesBoutiquesData(pageData).dataEn));
      } finally {
        setLoading(false);
      }
    };

    fetchServicesBoutiquesData();
  }, []);

  const updateServicesBoutiquesSection = async (updatedMixedData: typeof data) => {
    try {
      const headers = getAuthHeaders();
      let currentSectionResponse = await fetch(`/api/globalSections?sectionKey=${SECTION_KEY}`, { headers });
      let currentData: any[] = [];
      if (currentSectionResponse.ok) {
        currentData = await currentSectionResponse.json();
      }
      let currentSection = currentData.find((s: any) => s.sectionKey === SECTION_KEY);

      if (!currentSection) {
        const { dataFr, dataEn } = splitServicesBoutiquesData(pageData);
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

      const { dataFr: updatedDataFr, dataEn: updatedDataEn } = splitServicesBoutiquesData(updatedMixedData);

      const putResponse = await fetch(`/api/globalSections/${currentSection.id}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataFr: updatedDataFr,
          dataEn: Object.keys(updatedDataEn).length > 0 ? updatedDataEn : null,
        }),
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update servicesBoutiques section');
      }
    } catch (err) {
      console.error('Error updating servicesBoutiques section:', err);
    }
  };

  const getText = (textObj: { fr: string; en: string }) => textObj[langKey as keyof typeof textObj];
  const getTextArray = (items: Array<{ fr: string; en: string }>) => items.map(item => getText(item));

  const { services, boutiques, hero, cta } = data;
  const { items: serviceItems } = services;
  const { items: boutiqueItems } = boutiques;

  const getIcon = (iconName: string) => {
    const icons = {
      Bell: <Bell className="w-6 h-6" />,
      Car: <Car className="w-6 h-6" />,
      Plane: <Plane className="w-6 h-6" />,
      Shirt: <Shirt className="w-6 h-6" />,
      Coffee: <Coffee className="w-6 h-6" />,
      Wifi: <Wifi className="w-6 h-6" />
    };
    return icons[iconName as keyof typeof icons] || <Bell className="w-6 h-6" />;
  };

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
      await updateServicesBoutiquesSection(updatedData);
    };
  };

  const updateServicesField = (field: 'title' | 'description') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        services: {
          ...data.services,
          [field]: { fr: newFr, en: newEn },
        },
      };
      setData(updatedData);
      await updateServicesBoutiquesSection(updatedData);
    };
  };

  const updateServicesImage = async (newUrl: string) => {
    const updatedData = {
      ...data,
      services: {
        ...data.services,
        image: newUrl,
      },
    };
    setData(updatedData);
    await updateServicesBoutiquesSection(updatedData);
  };

  const updateServiceItemField = (index: number, field: 'title' | 'description' | 'category') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        services: {
          ...data.services,
          items: data.services.items.map((item, i) =>
            i === index
              ? { ...item, [field]: { fr: newFr, en: newEn } }
              : item
          ),
        },
      };
      setData(updatedData);
      await updateServicesBoutiquesSection(updatedData);
    };
  };

  const updateServiceFeature = (itemIndex: number, featureIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        services: {
          ...data.services,
          items: data.services.items.map((item, i) =>
            i === itemIndex
              ? {
                  ...item,
                  features: item.features.map((feature, j) =>
                    j === featureIndex ? { fr: newFr, en: newEn } : feature
                  ),
                }
              : item
          ),
        },
      };
      setData(updatedData);
      await updateServicesBoutiquesSection(updatedData);
    };
  };

  const updateBoutiquesField = (field: 'title' | 'description') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        boutiques: {
          ...data.boutiques,
          [field]: { fr: newFr, en: newEn },
        },
      };
      setData(updatedData);
      await updateServicesBoutiquesSection(updatedData);
    };
  };

  const updateBoutiquesImage = async (newUrl: string) => {
    const updatedData = {
      ...data,
      boutiques: {
        ...data.boutiques,
        image: newUrl,
      },
    };
    setData(updatedData);
    await updateServicesBoutiquesSection(updatedData);
  };

  const updateBoutiqueItemField = (index: number, field: 'title' | 'description' | 'hours' | 'location') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        boutiques: {
          ...data.boutiques,
          items: data.boutiques.items.map((item, i) =>
            i === index
              ? { ...item, [field]: { fr: newFr, en: newEn } }
              : item
          ),
        },
      };
      setData(updatedData);
      await updateServicesBoutiquesSection(updatedData);
    };
  };

  const updateBoutiqueSpecialty = (itemIndex: number, specialtyIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        boutiques: {
          ...data.boutiques,
          items: data.boutiques.items.map((item, i) =>
            i === itemIndex
              ? {
                  ...item,
                  specialties: item.specialties.map((specialty, j) =>
                    j === specialtyIndex ? { fr: newFr, en: newEn } : specialty
                  ),
                }
              : item
          ),
        },
      };
      setData(updatedData);
      await updateServicesBoutiquesSection(updatedData);
    };
  };

  const updateCtaField = (field: 'title' | 'description') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        cta: {
          ...data.cta,
          [field]: { fr: newFr, en: newEn },
        },
      };
      setData(updatedData);
      await updateServicesBoutiquesSection(updatedData);
    };
  };

  const updateCtaButtonText = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      cta: {
        ...data.cta,
        buttonText: { fr: newFr, en: newEn },
      },
    };
    setData(updatedData);
    await updateServicesBoutiquesSection(updatedData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Skeleton */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-background to-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse">
              <div className="h-12 w-96 bg-muted mx-auto mb-6" />
              <div className="h-6 w-80 bg-muted mx-auto" />
            </div>
          </div>
        </section>

        {/* Services Section Skeleton */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 items-center mb-16 animate-pulse">
              <div className="lg:w-1/2 space-y-4">
                <div className="h-10 w-64 bg-muted" />
                <div className="h-6 w-full bg-muted" />
              </div>
              <div className="lg:w-1/2">
                <div className="w-full h-80 bg-muted rounded-lg" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-muted rounded-lg" />
                    <div className="w-20 h-6 bg-muted" />
                  </div>
                  <div className="h-6 w-48 bg-muted" />
                  <div className="h-4 w-full bg-muted" />
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="flex items-center h-4 bg-muted">
                        <div className="w-4 h-4 bg-muted mr-2" />
                        <div className="w-3/4 h-4 bg-muted" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Boutiques Section Skeleton */}
        <section className="py-16 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-16 animate-pulse">
              <div className="lg:w-1/2 space-y-4">
                <div className="h-10 w-64 bg-muted" />
                <div className="h-6 w-full bg-muted" />
              </div>
              <div className="lg:w-1/2">
                <div className="w-full h-80 bg-muted rounded-lg" />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="h-8 w-48 bg-muted" />
                      <div className="flex items-center h-4 bg-muted w-32" />
                    </div>
                    <div className="w-8 h-8 bg-muted" />
                  </div>
                  <div className="h-4 w-full bg-muted" />
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-muted" />
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="h-6 w-20 bg-muted" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center h-4 bg-muted w-48" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Skeleton */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-10 w-80 bg-muted mx-auto" />
              <div className="h-6 w-96 bg-muted mx-auto" />
              <div className="h-12 w-48 bg-muted mx-auto" />
            </div>
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
          <Tooltip
            frLabel={hero.title.fr}
            enLabel={hero.title.en}
            onSave={updateHeroField('title')}
          >
            <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
              {formatAmpersand(getText(hero.title))}
            </h1>
          </Tooltip>
          <Tooltip
            frLabel={hero.description.fr}
            enLabel={hero.description.en}
            onSave={updateHeroField('description')}
          >
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {getText(hero.description)}
            </p>
          </Tooltip>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services Hero with Photo Frame */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            <div className="lg:w-1/2">
              <Tooltip
                frLabel={services.title.fr}
                enLabel={services.title.en}
                onSave={updateServicesField('title')}
              >
                <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                  {getText(services.title)}
                </h2>
              </Tooltip>
              <Tooltip
                frLabel={services.description.fr}
                enLabel={services.description.en}
                onSave={updateServicesField('description')}
              >
                <p className="text-lg text-muted-foreground">
                  {getText(services.description)}
                </p>
              </Tooltip>
            </div>
            <div className="lg:w-1/2">
              <ImageTooltip
                imageUrl={services.image || servicesImage}
                onSave={updateServicesImage}
              >
                <div className="relative">
                  <img 
                    src={services.image || servicesImage} 
                    alt={getText({ fr: "Services de conciergerie Carlton Madagascar", en: "Carlton Madagascar Concierge Services" })}
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                    data-testid="img-services-hero"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </ImageTooltip>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceItems.map((service, index) => (
              <Card key={index} className="group hover-elevate transition-all duration-300" data-testid={`card-service-${index}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {getIcon(service.icon)}
                    </div>
                    <Tooltip
                      frLabel={service.category.fr}
                      enLabel={service.category.en}
                      onSave={updateServiceItemField(index, 'category')}
                    >
                      <Badge variant="secondary" data-testid={`badge-service-category-${index}`}>
                        {getText(service.category)}
                      </Badge>
                    </Tooltip>
                  </div>
                  <Tooltip
                    frLabel={service.title.fr}
                    enLabel={service.title.en}
                    onSave={updateServiceItemField(index, 'title')}
                  >
                    <CardTitle className="text-xl text-foreground" data-testid={`title-service-${index}`}>
                      {getText(service.title)}
                    </CardTitle>
                  </Tooltip>
                </CardHeader>
                <CardContent>
                  <Tooltip
                    frLabel={service.description.fr}
                    enLabel={service.description.en}
                    onSave={updateServiceItemField(index, 'description')}
                  >
                    <p className="text-muted-foreground mb-4" data-testid={`description-service-${index}`}>
                      {getText(service.description)}
                    </p>
                  </Tooltip>
                  <div className="space-y-2">
                    {getTextArray(service.features).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <Tooltip
                          frLabel={service.features[featureIndex].fr}
                          enLabel={service.features[featureIndex].en}
                          onSave={updateServiceFeature(index, featureIndex)}
                        >
                          <span>{feature}</span>
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

      {/* Boutiques Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Boutiques Hero with Photo Frame */}
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-16">
            <div className="lg:w-1/2">
              <Tooltip
                frLabel={boutiques.title.fr}
                enLabel={boutiques.title.en}
                onSave={updateBoutiquesField('title')}
              >
                <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                  {getText(boutiques.title)}
                </h2>
              </Tooltip>
              <Tooltip
                frLabel={boutiques.description.fr}
                enLabel={boutiques.description.en}
                onSave={updateBoutiquesField('description')}
              >
                <p className="text-lg text-muted-foreground">
                  {getText(boutiques.description)}
                </p>
              </Tooltip>
            </div>
            <div className="lg:w-1/2">
              <ImageTooltip
                imageUrl={boutiques.image || boutiquesImage}
                onSave={updateBoutiquesImage}
              >
                <div className="relative">
                  <img 
                    src={boutiques.image || boutiquesImage} 
                    alt={getText({ fr: "Boutiques artisanales Carlton Madagascar", en: "Carlton Madagascar Artisan Boutiques" })}
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                    data-testid="img-boutiques-hero"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </ImageTooltip>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {boutiqueItems.map((boutique, index) => (
              <Card key={index} className="group hover-elevate transition-all duration-300" data-testid={`card-boutique-${index}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Tooltip
                        frLabel={boutique.title.fr}
                        enLabel={boutique.title.en}
                        onSave={updateBoutiqueItemField(index, 'title')}
                      >
                        <CardTitle className="text-2xl text-foreground mb-2" data-testid={`title-boutique-${index}`}>
                          {getText(boutique.title)}
                        </CardTitle>
                      </Tooltip>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        <Tooltip
                          frLabel={boutique.hours.fr}
                          enLabel={boutique.hours.en}
                          onSave={updateBoutiqueItemField(index, 'hours')}
                        >
                          <span>{getText(boutique.hours)}</span>
                        </Tooltip>
                      </div>
                    </div>
                    <ShoppingBag className="w-8 h-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Tooltip
                    frLabel={boutique.description.fr}
                    enLabel={boutique.description.en}
                    onSave={updateBoutiqueItemField(index, 'description')}
                  >
                    <p className="text-muted-foreground mb-6" data-testid={`description-boutique-${index}`}>
                      {getText(boutique.description)}
                    </p>
                  </Tooltip>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">{getText({ fr: "Nos Spécialités :", en: "Our Specialties :" })}</h4>
                    <div className="flex flex-wrap gap-2">
                      {getTextArray(boutique.specialties).map((specialty, specialtyIndex) => (
                        <Tooltip
                          key={specialtyIndex}
                          frLabel={boutique.specialties[specialtyIndex].fr}
                          enLabel={boutique.specialties[specialtyIndex].en}
                          onSave={updateBoutiqueSpecialty(index, specialtyIndex)}
                        >
                          <Badge variant="outline" data-testid={`badge-specialty-${index}-${specialtyIndex}`}>
                            {specialty}
                          </Badge>
                        </Tooltip>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <Tooltip
                      frLabel={boutique.location.fr}
                      enLabel={boutique.location.en}
                      onSave={updateBoutiqueItemField(index, 'location')}
                    >
                      <span>{getText(boutique.location)}</span>
                    </Tooltip>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Tooltip
            frLabel={cta.title.fr}
            enLabel={cta.title.en}
            onSave={updateCtaField('title')}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              {getText(cta.title)}
            </h2>
          </Tooltip>
          <Tooltip
            frLabel={cta.description.fr}
            enLabel={cta.description.en}
            onSave={updateCtaField('description')}
          >
            <p className="text-lg text-muted-foreground mb-8">
              {getText(cta.description)}
            </p>
          </Tooltip>
          
          <div className="flex justify-center">
            <Button size="lg" data-testid="button-reserve-room">
              <Tooltip
                frLabel={cta.buttonText.fr}
                enLabel={cta.buttonText.en}
                onSave={updateCtaButtonText}
              >
                <span>{getText(cta.buttonText)}</span>
              </Tooltip>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesBoutiques;