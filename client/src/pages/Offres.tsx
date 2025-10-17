// src/pages/Offres.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, Clock, Sparkles, Users, Gift } from 'lucide-react';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';
import Footer from '@/components/Footer';
import { offresPageData } from '@/data/offresData';
import { useLanguage } from '@/components/context/LanguageContext';

const SECTION_KEY = 'offres';

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Helper to split offresPageData into dataFr and dataEn structures
// We add seasonalSection and image fields dynamically without modifying the source data
const splitOffresData = (mixedData: typeof offresPageData) => {
  // Add default seasonalSection and images to mixed data for splitting
  const mixedDataWithExtras = {
    ...mixedData,
    seasonalSection: {
      title: { fr: "Evènements Spéciaux", en: "Special Events" },
      description: {
        fr: "Profitez de nos offres spéciales selon les saisons et événements malgaches",
        en: "Enjoy our special offers according to Malagasy seasons and events"
      }
    },
    offers: mixedData.offers.map(offer => ({
      ...offer,
      image: '' // Default empty image
    }))
  };

  const dataFr = {
    seasonalSection: {
      title: mixedDataWithExtras.seasonalSection.title.fr,
      description: mixedDataWithExtras.seasonalSection.description.fr,
    },
    hero: {
      title: mixedDataWithExtras.hero.title.fr,
      description: mixedDataWithExtras.hero.description.fr,
    },
    offers: mixedDataWithExtras.offers.map((offer) => ({
      id: offer.id,
      title: offer.title.fr,
      subtitle: offer.subtitle.fr,
      description: offer.description.fr,
      duration: offer.duration.fr,
      category: offer.category.fr,
      features: offer.features.map((feature) => feature.fr),
      validUntil: offer.validUntil.fr,
      highlight: offer.highlight ? offer.highlight.fr : null,
      image: offer.image || '',
    })),
    seasonalOffers: mixedDataWithExtras.seasonalOffers.map((so) => ({
      title: so.title.fr,
      period: so.period.fr,
      description: so.description.fr,
    })),
    cta: {
      title: mixedDataWithExtras.cta.title.fr,
      description: mixedDataWithExtras.cta.description.fr,
      buttonTexts: {
        primary: mixedDataWithExtras.cta.buttonTexts.primary.fr,
        secondary: mixedDataWithExtras.cta.buttonTexts.secondary.fr,
      },
    },
  };

  const dataEn = {
    seasonalSection: {
      title: mixedDataWithExtras.seasonalSection.title.en,
      description: mixedDataWithExtras.seasonalSection.description.en,
    },
    hero: {
      title: mixedDataWithExtras.hero.title.en,
      description: mixedDataWithExtras.hero.description.en,
    },
    offers: mixedDataWithExtras.offers.map((offer) => ({
      id: offer.id,
      title: offer.title.en,
      subtitle: offer.subtitle.en,
      description: offer.description.en,
      duration: offer.duration.en,
      category: offer.category.en,
      features: offer.features.map((feature) => feature.en),
      validUntil: offer.validUntil.en,
      highlight: offer.highlight ? offer.highlight.en : null,
      image: offer.image || '',
    })),
    seasonalOffers: mixedDataWithExtras.seasonalOffers.map((so) => ({
      title: so.title.en,
      period: so.period.en,
      description: so.description.en,
    })),
    cta: {
      title: mixedDataWithExtras.cta.title.en,
      description: mixedDataWithExtras.cta.description.en,
      buttonTexts: {
        primary: mixedDataWithExtras.cta.buttonTexts.primary.en,
        secondary: mixedDataWithExtras.cta.buttonTexts.secondary.en,
      },
    },
  };

  return { dataFr, dataEn };
};

// Reconstruct mixed data from dataFr and dataEn
// Ensure seasonalSection and images are present
const reconstructMixed = (dataFr: any, dataEn: any | null) => {
  if (!dataFr || typeof dataFr !== 'object') {
    console.warn('Invalid dataFr structure, falling back to default');
    return offresPageData;
  }
  const enFallback = dataEn || dataFr;
  const defaultSeasonal = {
    title: { fr: "Evènements Spéciaux", en: "Special Events" },
    description: {
      fr: "Profitez de nos offres spéciales selon les saisons et événements malgaches",
      en: "Enjoy our special offers according to Malagasy seasons and events"
    }
  };
  return {
    seasonalSection: dataFr.seasonalSection
      ? {
          title: { fr: dataFr.seasonalSection.title, en: enFallback.seasonalSection?.title || defaultSeasonal.title.en },
          description: { fr: dataFr.seasonalSection.description, en: enFallback.seasonalSection?.description || defaultSeasonal.description.en },
        }
      : defaultSeasonal,
    hero: {
      title: { fr: dataFr.hero.title, en: enFallback.hero.title },
      description: { fr: dataFr.hero.description, en: enFallback.hero.description },
    },
    offers: dataFr.offers.map((offerFr: any, i: number) => {
      const offerEn = enFallback.offers[i] || offerFr;
      return {
        id: offerFr.id,
        title: { fr: offerFr.title, en: offerEn.title },
        subtitle: { fr: offerFr.subtitle, en: offerEn.subtitle },
        description: { fr: offerFr.description, en: offerEn.description },
        duration: { fr: offerFr.duration, en: offerEn.duration },
        category: { fr: offerFr.category, en: offerEn.category },
        features: offerFr.features.map((fFr: string, j: number) => ({
          fr: fFr,
          en: offerEn.features[j] || fFr,
        })),
        validUntil: { fr: offerFr.validUntil, en: offerEn.validUntil },
        highlight: offerFr.highlight
          ? { fr: offerFr.highlight, en: offerEn.highlight || offerFr.highlight }
          : null,
        image: offerFr.image || '',
      };
    }),
    seasonalOffers: dataFr.seasonalOffers.map((soFr: any, i: number) => ({
      title: { fr: soFr.title, en: enFallback.seasonalOffers[i]?.title || soFr.title },
      period: { fr: soFr.period, en: enFallback.seasonalOffers[i]?.period || soFr.period },
      description: { fr: soFr.description, en: enFallback.seasonalOffers[i]?.description || soFr.description },
    })),
    cta: {
      title: { fr: dataFr.cta.title, en: enFallback.cta.title },
      description: { fr: dataFr.cta.description, en: enFallback.cta.description },
      buttonTexts: {
        primary: { fr: dataFr.cta.buttonTexts.primary, en: enFallback.cta.buttonTexts.primary },
        secondary: { fr: dataFr.cta.buttonTexts.secondary, en: enFallback.cta.buttonTexts.secondary },
      },
    },
  };
};

const Offres = () => {
  const { currentLang } = useLanguage();
  const langKey = currentLang.code.toLowerCase();
  const [data, setData] = useState(reconstructMixed(splitOffresData(offresPageData).dataFr, splitOffresData(offresPageData).dataEn));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch offres data from backend
  useEffect(() => {
    const fetchOffresData = async () => {
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
          const { dataFr, dataEn } = splitOffresData(offresPageData);
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
            throw new Error('Failed to create offres data');
          }

          const created = await createResponse.json();
          section = created;
        }

        if (section) {
          const fetchedData = reconstructMixed(section.dataFr, section.dataEn);
          setData(fetchedData);
        } else {
          setData(reconstructMixed(splitOffresData(offresPageData).dataFr, splitOffresData(offresPageData).dataEn));
        }
      } catch (err) {
        console.error('Error fetching offres data:', err);
        setError('Failed to load offres data');
        setData(reconstructMixed(splitOffresData(offresPageData).dataFr, splitOffresData(offresPageData).dataEn));
      } finally {
        setLoading(false);
      }
    };

    fetchOffresData();
  }, []);

  const updateOffresSection = async (updatedMixedData: typeof data) => {
    try {
      const headers = getAuthHeaders();
      let currentSectionResponse = await fetch(`/api/globalSections?sectionKey=${SECTION_KEY}`, { headers });
      let currentData: any[] = [];
      if (currentSectionResponse.ok) {
        currentData = await currentSectionResponse.json();
      }
      let currentSection = currentData.find((s: any) => s.sectionKey === SECTION_KEY);

      if (!currentSection) {
        const { dataFr, dataEn } = splitOffresData(offresPageData);
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

      const { dataFr: updatedDataFr, dataEn: updatedDataEn } = splitOffresData(updatedMixedData);

      const putResponse = await fetch(`/api/globalSections/${currentSection.id}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataFr: updatedDataFr,
          dataEn: Object.keys(updatedDataEn).length > 0 ? updatedDataEn : null,
        }),
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update offres section');
      }
    } catch (err) {
      console.error('Error updating offres section:', err);
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
      await updateOffresSection(updatedData);
    };
  };

  const updateOfferField = (index: number, field: 'title' | 'subtitle' | 'description' | 'duration' | 'category' | 'validUntil' | 'highlight') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        offers: data.offers.map((offer, i) =>
          i === index
            ? { ...offer, [field]: { fr: newFr, en: newEn } }
            : offer
        ),
      };
      setData(updatedData);
      await updateOffresSection(updatedData);
    };
  };

  const updateOfferFeature = (offerIndex: number, featureIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        offers: data.offers.map((offer, i) =>
          i === offerIndex
            ? {
                ...offer,
                features: offer.features.map((feature, j) =>
                  j === featureIndex ? { fr: newFr, en: newEn } : feature
                ),
              }
            : offer
        ),
      };
      setData(updatedData);
      await updateOffresSection(updatedData);
    };
  };

  const updateOfferImage = (index: number) => {
    return async (newUrl: string) => {
      const updatedData = {
        ...data,
        offers: data.offers.map((offer, i) => (i === index ? { ...offer, image: newUrl } : offer)),
      };
      setData(updatedData);
      await updateOffresSection(updatedData);
    };
  };

  const updateSeasonalField = (index: number, field: 'title' | 'period' | 'description') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        seasonalOffers: data.seasonalOffers.map((so, i) =>
          i === index
            ? { ...so, [field]: { fr: newFr, en: newEn } }
            : so
        ),
      };
      setData(updatedData);
      await updateOffresSection(updatedData);
    };
  };

  const updateSeasonalSectionField = (field: 'title' | 'description') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        seasonalSection: {
          ...data.seasonalSection,
          [field]: { fr: newFr, en: newEn },
        },
      };
      setData(updatedData);
      await updateOffresSection(updatedData);
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
      await updateOffresSection(updatedData);
    };
  };

  const updateCtaButton = (buttonKey: 'primary' | 'secondary') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        cta: {
          ...data.cta,
          buttonTexts: {
            ...data.cta.buttonTexts,
            [buttonKey]: { fr: newFr, en: newEn },
          },
        },
      };
      setData(updatedData);
      await updateOffresSection(updatedData);
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="pt-20 bg-gradient-to-r from-background to-card/50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-pulse">
              <div className="h-12 w-96 bg-muted mx-auto mb-6" />
              <div className="h-6 w-80 bg-muted mx-auto mb-6" />
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-6 w-48 bg-muted" />
                  <div className="h-4 w-full bg-muted" />
                  <div className="h-48 bg-muted rounded-lg" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div key={j} className="h-4 w-3/4 bg-muted" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-pulse">
              <div className="h-8 w-64 bg-muted mx-auto mb-4" />
              <div className="h-5 w-80 bg-muted mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-12 w-12 bg-muted rounded-full mx-auto" />
                  <div className="h-6 w-48 bg-muted mx-auto" />
                  <div className="h-4 w-32 bg-muted mx-auto" />
                  <div className="h-4 w-full bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-pulse">
            <div className="h-8 w-80 bg-muted mx-auto mb-4" />
            <div className="h-5 w-96 bg-muted mx-auto mb-8" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-12 w-48 bg-muted" />
              <div className="h-12 w-40 bg-muted" />
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

  const { hero, offers, seasonalOffers, seasonalSection, cta } = data;
  const ctaButtons = cta.buttonTexts;

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-background to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Tooltip
              frLabel={hero.title.fr}
              enLabel={hero.title.en}
              onSave={updateHeroField('title')}
            >
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
                {getText(hero.title)}
              </h1>
            </Tooltip>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
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
        </div>
      </section>

      {/* Main Offers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {offers.map((offer, index) => (
              <Card key={offer.id} className="overflow-hidden hover-elevate transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Tooltip
                      frLabel={offer.category.fr}
                      enLabel={offer.category.en}
                      onSave={updateOfferField(index, 'category')}
                    >
                      <Badge 
                        variant="outline" 
                        className="text-primary border-primary"
                      >
                        {getText(offer.category)}
                      </Badge>
                    </Tooltip>
                    {offer.highlight && (
                      <Tooltip
                        frLabel={offer.highlight.fr}
                        enLabel={offer.highlight.en}
                        onSave={updateOfferField(index, 'highlight')}
                      >
                        <Badge className="bg-accent text-accent-foreground">
                          {getText(offer.highlight)}
                        </Badge>
                      </Tooltip>
                    )}
                  </div>
                  <Tooltip
                    frLabel={offer.title.fr}
                    enLabel={offer.title.en}
                    onSave={updateOfferField(index, 'title')}
                  >
                    <CardTitle className="text-2xl font-serif text-foreground mb-2">
                      {getText(offer.title)}
                    </CardTitle>
                  </Tooltip>
                  <Tooltip
                    frLabel={offer.subtitle.fr}
                    enLabel={offer.subtitle.en}
                    onSave={updateOfferField(index, 'subtitle')}
                  >
                    <p className="text-primary font-luxury italic text-lg">
                      {getText(offer.subtitle)}
                    </p>
                  </Tooltip>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <Tooltip
                    frLabel={offer.description.fr}
                    enLabel={offer.description.en}
                    onSave={updateOfferField(index, 'description')}
                  >
                    <p className="text-muted-foreground leading-relaxed">
                      {getText(offer.description)}
                    </p>
                  </Tooltip>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <Tooltip
                        frLabel={offer.duration.fr}
                        enLabel={offer.duration.en}
                        onSave={updateOfferField(index, 'duration')}
                      >
                        <span>{getText(offer.duration)}</span>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Valable jusqu'au </span>
                      <Tooltip
                        frLabel={offer.validUntil.fr}
                        enLabel={offer.validUntil.en}
                        onSave={updateOfferField(index, 'validUntil')}
                      >
                        <span>{getText(offer.validUntil)}</span>
                      </Tooltip>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Cette offre comprend :</h4>
                    <ul className="space-y-2">
                      {offer.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <Tooltip
                            frLabel={feature.fr}
                            enLabel={feature.en}
                            onSave={updateOfferFeature(index, fIndex)}
                          >
                            <span>{getText(feature)}</span>
                          </Tooltip>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Photo frame for offer */}
                  <ImageTooltip
                    imageUrl={offer.image}
                    onSave={updateOfferImage(index)}
                  >
                    <div className="w-full h-48 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20 flex items-center justify-center mt-4">
                      <div className="text-center p-4">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Gift className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                          Photo de l'offre {getText(offer.title)}
                        </p>
                      </div>
                    </div>
                  </ImageTooltip>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Tooltip
              frLabel={seasonalSection.title.fr}
              enLabel={seasonalSection.title.en}
              onSave={updateSeasonalSectionField('title')}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                {getText(seasonalSection.title)}
              </h2>
            </Tooltip>
            <Tooltip
              frLabel={seasonalSection.description.fr}
              enLabel={seasonalSection.description.en}
              onSave={updateSeasonalSectionField('description')}
            >
              <p className="text-lg text-muted-foreground">
                {getText(seasonalSection.description)}
              </p>
            </Tooltip>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seasonalOffers.map((offer, index) => (
              <Card key={index} className="text-center hover-elevate">
                <CardHeader>
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                  <Tooltip
                    frLabel={offer.title.fr}
                    enLabel={offer.title.en}
                    onSave={updateSeasonalField(index, 'title')}
                  >
                    <CardTitle className="text-xl font-serif text-foreground">
                      {getText(offer.title)}
                    </CardTitle>
                  </Tooltip>
                  <Tooltip
                    frLabel={offer.period.fr}
                    enLabel={offer.period.en}
                    onSave={updateSeasonalField(index, 'period')}
                  >
                    <Badge variant="outline" className="text-primary border-primary mx-auto">
                      {getText(offer.period)}
                    </Badge>
                  </Tooltip>
                </CardHeader>
                <CardContent>
                  <Tooltip
                    frLabel={offer.description.fr}
                    enLabel={offer.description.en}
                    onSave={updateSeasonalField(index, 'description')}
                  >
                    <p className="text-muted-foreground mb-4">
                      {getText(offer.description)}
                    </p>
                  </Tooltip>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Tooltip
            frLabel={cta.title.fr}
            enLabel={cta.title.en}
            onSave={updateCtaField('title')}
          >
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" data-testid="button-contact-concierge">
              <Users className="w-4 h-4 mr-2" />
              <Tooltip
                frLabel={ctaButtons.primary.fr}
                enLabel={ctaButtons.primary.en}
                onSave={updateCtaButton('primary')}
              >
                <span>{getText(ctaButtons.primary)}</span>
              </Tooltip>
            </Button>
            <Button variant="outline" size="lg" data-testid="button-callback">
              <Tooltip
                frLabel={ctaButtons.secondary.fr}
                enLabel={ctaButtons.secondary.en}
                onSave={updateCtaButton('secondary')}
              >
                <span>{getText(ctaButtons.secondary)}</span>
              </Tooltip>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Offres;