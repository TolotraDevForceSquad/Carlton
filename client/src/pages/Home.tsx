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
                <Card key={index} className="overflow-hidden hover-elevate transition-all duration-300">
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
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-serif text-foreground mb-3">
                      <Tooltip 
                        frLabel={data.highlights[index].title.fr} 
                        enLabel={data.highlights[index].title.en} 
                        onSave={updateHighlightTitle(index)}
                      >
                        {formatAmpersand(highlight.title)}
                      </Tooltip>
                    </CardTitle>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      <Tooltip 
                        frLabel={data.highlights[index].description.fr} 
                        enLabel={data.highlights[index].description.en} 
                        onSave={updateHighlightDescription(index)}
                      >
                        {highlight.description}
                      </Tooltip>
                    </p>
                    <Link href={highlight.link}>
                      <Button variant="outline" className="w-full">
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