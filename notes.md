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

// src/data/contactData.ts
export const contactData = {
  hero: {
    title: {
      fr: "Nous Contacter",
      en: "Contact Us"
    },
    description: {
      fr: "Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner",
      en: "Our team is here to answer all your questions and assist you"
    }
  },
  contactInfo: [
    {
      icon: "Phone",
      title: {
        fr: "Téléphone",
        en: "Phone"
      },
      details: [
        {
          fr: "+261 20 22 260 60",
          en: "+261 20 22 260 60"
        },
        {
          fr: "Disponible 24h/24",
          en: "Available 24/7"
        }
      ],
      action: {
        fr: "Appeler maintenant",
        en: "Call now"
      }
    },
    {
      icon: "Mail",
      title: {
        fr: "Email",
        en: "Email"
      },
      details: [
        {
          fr: "contact@carlton.mg",
          en: "contact@carlton.mg"
        },
        {
          fr: "Réponse sous 2h",
          en: "Response within 2h"
        }
      ],
      action: {
        fr: "Envoyer un email",
        en: "Send an email"
      }
    },
    {
      icon: "MapPin",
      title: {
        fr: "Adresse",
        en: "Address"
      },
      details: [
        {
          fr: "Rue Pierre Stibbe Anosy Po BOX 959",
          en: "Rue Pierre Stibbe Anosy Po BOX 959"
        },
        {
          fr: "Antananarivo 101, Madagascar",
          en: "Antananarivo 101, Madagascar"
        }
      ],
      action: {
        fr: "Voir sur la carte",
        en: "View on map"
      }
    },
    {
      icon: "Clock",
      title: {
        fr: "Horaires",
        en: "Hours"
      },
      details: [
        {
          fr: "Réception 24h/24",
          en: "Reception 24/7"
        },
        {
          fr: "Conciergerie toujours disponible",
          en: "Concierge always available"
        }
      ],
      action: {
        fr: "Plus d'infos",
        en: "More info"
      }
    }
  ],
  form: {
    title: {
      fr: "Envoyez-nous un Message",
      en: "Send us a Message"
    },
    subtitle: {
      fr: "Remplissez ce formulaire, nous vous répondrons rapidement",
      en: "Fill out this form, we will respond quickly"
    },
    departments: [
      { value: "reservation", label: { fr: "Réservations", en: "Reservations" } },
      { value: "restaurant", label: { fr: "Restaurants", en: "Restaurants" } },
      { value: "evenement", label: { fr: "Événements", en: "Events" } },
      { value: "concierge", label: { fr: "Conciergerie", en: "Concierge" } },
      { value: "spa", label: { fr: "Loisirs & Bien-être", en: "Leisure & Wellness" } },
      { value: "direction", label: { fr: "Direction", en: "Management" } },
      { value: "autre", label: { fr: "Autre demande", en: "Other request" } }
    ],
    fields: {
      firstName: {
        label: {
          fr: "Prénom *",
          en: "First Name *"
        },
        placeholder: {
          fr: "Votre prénom",
          en: "Your first name"
        },
        validation: {
          min: {
            fr: "Le prénom doit contenir au moins 2 caractères",
            en: "First name must contain at least 2 characters"
          }
        }
      },
      lastName: {
        label: {
          fr: "Nom *",
          en: "Last Name *"
        },
        placeholder: {
          fr: "Votre nom",
          en: "Your last name"
        },
        validation: {
          min: {
            fr: "Le nom doit contenir au moins 2 caractères",
            en: "Last name must contain at least 2 characters"
          }
        }
      },
      email: {
        label: {
          fr: "Email *",
          en: "Email *"
        },
        placeholder: {
          fr: "votre@email.com",
          en: "your@email.com"
        },
        validation: {
          email: {
            fr: "Veuillez saisir une adresse email valide",
            en: "Please enter a valid email address"
          }
        }
      },
      phone: {
        label: {
          fr: "Téléphone *",
          en: "Phone *"
        },
        placeholder: {
          fr: "+261 XX XX XXX XX",
          en: "+261 XX XX XXX XX"
        },
        validation: {
          min: {
            fr: "Le numéro de téléphone doit contenir au moins 8 chiffres",
            en: "Phone number must contain at least 8 digits"
          }
        }
      },
      subject: {
        label: {
          fr: "Sujet de votre demande *",
          en: "Subject of your request *"
        },
        placeholder: {
          fr: "Sélectionnez un sujet",
          en: "Select a subject"
        },
        validation: {
          min: {
            fr: "Veuillez sélectionner un sujet",
            en: "Please select a subject"
          }
        }
      },
      arrivalDate: {
        label: {
          fr: "Date d'arrivée",
          en: "Arrival Date"
        }
      },
      departureDate: {
        label: {
          fr: "Date de départ",
          en: "Departure Date"
        }
      },
      guests: {
        label: {
          fr: "Nombre d'invités",
          en: "Number of guests"
        },
        placeholder: {
          fr: "2",
          en: "2"
        }
      },
      message: {
        label: {
          fr: "Votre message *",
          en: "Your message *"
        },
        placeholder: {
          fr: "Décrivez votre demande en détail...",
          en: "Describe your request in detail..."
        },
        validation: {
          min: {
            fr: "Le message doit contenir au moins 10 caractères",
            en: "Message must contain at least 10 characters"
          }
        }
      }
    },
    submitButton: {
      fr: "Envoyer le message",
      en: "Send message"
    }
  },
  services: {
    title: {
      fr: "Nos Services",
      en: "Our Services"
    },
    subtitle: {
      fr: "À votre disposition pour un séjour parfait",
      en: "At your disposal for a perfect stay"
    },
    list: [
      {
        title: {
          fr: "Réservations",
          en: "Reservations"
        },
        description: {
          fr: "Chambres, restaurants, événements",
          en: "Rooms, restaurants, events"
        },
        icon: "Calendar"
      },
      {
        title: {
          fr: "Conciergerie",
          en: "Concierge"
        },
        description: {
          fr: "Excursions, transports, conseils",
          en: "Excursions, transportation, advice"
        },
        icon: "Users"
      },
      {
        title: {
          fr: "Transferts Aéroport",
          en: "Airport Transfers"
        },
        description: {
          fr: "Service de navette premium",
          en: "Premium shuttle service"
        },
        icon: "Plane"
      },
      {
        title: {
          fr: "Parking",
          en: "Parking"
        },
        description: {
          fr: "Service de parking sécurisé",
          en: "Secure parking service"
        },
        icon: "Car"
      }
    ]
  },
  practicalInfo: {
    title: {
      fr: "Informations Pratiques",
      en: "Practical Information"
    },
    arrival: {
      title: {
        fr: "Arrivée & Départ",
        en: "Arrival & Departure"
      },
      details: [
        {
          fr: "Check-in : 15h00",
          en: "Check-in: 3:00 PM"
        },
        {
          fr: "Check-out : 12h00",
          en: "Check-out: 12:00 PM"
        },
        {
          fr: "Early check-in/late check-out sur demande",
          en: "Early check-in/late check-out on request"
        }
      ]
    },
    airport: {
      title: {
        fr: "Aéroport",
        en: "Airport"
      },
      details: [
        {
          fr: "Distance : 30 minutes en voiture",
          en: "Distance: 30 minutes by car"
        },
        {
          fr: "Navette privée disponible",
          en: "Private shuttle available"
        },
        {
          fr: "Service de transfert VIP",
          en: "VIP transfer service"
        }
      ]
    },
    languages: {
      title: {
        fr: "Langues parlées",
        en: "Languages Spoken"
      },
      list: [
        { fr: "Français", en: "French" },
        { fr: "Anglais", en: "English" },
        { fr: "Malgache", en: "Malagasy" },
        { fr: "Italien", en: "Italian" }
      ]
    },
    location: {
      title: {
        fr: "Notre Emplacement",
        en: "Our Location"
      },
      subtitle: {
        fr: "Carlton Madagascar, au cœur d'Antananarivo",
        en: "Carlton Madagascar, in the heart of Antananarivo"
      },
      address: {
        fr: "Rue Pierre Stibbe Anosy Po BOX 959<br/>Antananarivo 101, Madagascar",
        en: "Rue Pierre Stibbe Anosy Po BOX 959<br/>Antananarivo 101, Madagascar"
      },
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.8755892545847!2d47.52089897509746!3d-18.91384738248647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07e7637d2b2d3%3A0x4b9f0b1d3c6b4b5a!2sRue%20Pierre%20Stibbe%2C%20Antananarivo%2C%20Madagascar!5e0!3m2!1sen!2s!4v1632468352847!5m2!1sen!2s",
      mapTitle: {
        fr: "Emplacement de l'hôtel Carlton Madagascar",
        en: "Carlton Madagascar Hotel Location"
      },
      directionsButton: {
        fr: "Obtenir l'itinéraire",
        en: "Get directions"
      }
    }
  }
};

// src/components/Contact.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Phone, Mail, MapPin, Clock, Car, Plane, Users, Calendar, MessageCircle, Send } from 'lucide-react';
import Footer from '@/components/Footer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { contactData } from '@/data/contactData';
import { useLanguage } from '@/components/context/LanguageContext';

const Contact = () => {
  const { currentLang } = useLanguage();
  const lang = currentLang.code.toLowerCase();
  
  const { hero, contactInfo, form, services, practicalInfo } = contactData;
  
  const getText = (textObj: { fr: string; en: string }): string => textObj[lang as keyof typeof textObj];

  const validationMessages = {
    firstName: { min: getText(form.fields.firstName.validation.min) },
    lastName: { min: getText(form.fields.lastName.validation.min) },
    email: { email: getText(form.fields.email.validation.email) },
    phone: { min: getText(form.fields.phone.validation.min) },
    subject: { min: getText(form.fields.subject.validation.min) },
    message: { min: getText(form.fields.message.validation.min) }
  };

  const contactFormSchema = z.object({
    firstName: z.string().min(2, validationMessages.firstName.min),
    lastName: z.string().min(2, validationMessages.lastName.min),
    email: z.string().email(validationMessages.email.email),
    phone: z.string().min(8, validationMessages.phone.min),
    subject: z.string().min(1, validationMessages.subject.min),
    message: z.string().min(10, validationMessages.message.min),
    arrivalDate: z.string().optional(),
    departureDate: z.string().optional(),
    guests: z.string().optional()
  });

  type ContactFormData = z.infer<typeof contactFormSchema>;

  const formInstance = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      arrivalDate: "",
      departureDate: "",
      guests: ""
    }
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Formulaire soumis:", data);
    // Simulation d'envoi sans backend
  };

  const getContactIcon = (iconName: string) => {
    switch (iconName) {
      case 'Phone': return <Phone className="w-6 h-6" />;
      case 'Mail': return <Mail className="w-6 h-6" />;
      case 'MapPin': return <MapPin className="w-6 h-6" />;
      case 'Clock': return <Clock className="w-6 h-6" />;
      default: return null;
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calendar': return <Calendar className="w-8 h-8" />;
      case 'Users': return <Users className="w-8 h-8" />;
      case 'Plane': return <Plane className="w-8 h-8" />;
      case 'Car': return <Car className="w-8 h-8" />;
      default: return null;
    }
  };

  const getLangText = (langObj: { fr: string; en: string } | string, fallback?: string): string => {
    if (typeof langObj === 'string') return langObj;
    return getText(langObj);
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-background to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              {getText(hero.title)}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {getText(hero.description)}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover-elevate">
                <CardContent className="pt-6">
                  <div className="text-primary mb-4 flex justify-center">
                    {getContactIcon(info.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {getText(info.title)}
                  </h3>
                  <div className="space-y-1 mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">
                        {getText(detail)}
                      </p>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" data-testid={`button-contact-${index}`}>
                    {getText(info.action)}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Services */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="hover-elevate">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-foreground flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  {getText(form.title)}
                </CardTitle>
                <p className="text-muted-foreground">
                  {getText(form.subtitle)}
                </p>
              </CardHeader>
              <CardContent>
                <Form {...formInstance}>
                  <form onSubmit={formInstance.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={formInstance.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{getText(form.fields.firstName.label)}</FormLabel>
                            <FormControl>
                              <Input placeholder={getText(form.fields.firstName.placeholder)} {...field} data-testid="input-firstname" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formInstance.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{getText(form.fields.lastName.label)}</FormLabel>
                            <FormControl>
                              <Input placeholder={getText(form.fields.lastName.placeholder)} {...field} data-testid="input-lastname" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={formInstance.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{getText(form.fields.email.label)}</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder={getText(form.fields.email.placeholder)} {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formInstance.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{getText(form.fields.phone.label)}</FormLabel>
                            <FormControl>
                              <Input placeholder={getText(form.fields.phone.placeholder)} {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={formInstance.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{getText(form.fields.subject.label)}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-subject">
                                <SelectValue placeholder={getText(form.fields.subject)} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {form.departments.map((dept) => (
                                <SelectItem key={dept.value} value={dept.value}>
                                  {getText(dept.label)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={formInstance.control}
                        name="arrivalDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{getText(form.fields.arrivalDate.label)}</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-arrival" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formInstance.control}
                        name="departureDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{getText(form.fields.departureDate.label)}</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-departure" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formInstance.control}
                        name="guests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{getText(form.fields.guests.label)}</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder={getText(form.fields.guests.placeholder)} {...field} data-testid="input-guests" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={formInstance.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{getText(form.fields.message.label)}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={getText(form.fields.message.placeholder)}
                              className="min-h-[120px]"
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" data-testid="button-submit-contact">
                      <Send className="w-4 h-4 mr-2" />
                      {getText(form.submitButton)}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Services & Additional Info */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-foreground">
                    {getText(services.title)}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {getText(services.subtitle)}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.list.map((service, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="text-primary flex-shrink-0">
                          {getServiceIcon(service.icon)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {getText(service.title)}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {getText(service.description)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-foreground">
                    {getText(practicalInfo.title)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{formatAmpersand(getText(practicalInfo.arrival.title))}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {practicalInfo.arrival.details.map((detail, idx) => (
                        <p key={idx}>• {getText(detail)}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{getText(practicalInfo.airport.title)}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {practicalInfo.airport.details.map((detail, idx) => (
                        <p key={idx}>• {getText(detail)}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{getText(practicalInfo.languages.title)}</h4>
                    <div className="flex flex-wrap gap-2">
                      {practicalInfo.languages.list.map((lang, idx) => (
                        <Badge key={idx} variant="secondary">{getLangText(lang)}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hotel Location Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-foreground">
                    {getText(practicalInfo.location.title)}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {getText(practicalInfo.location.subtitle)}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Adresse complète</p>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: getText(practicalInfo.location.address) }} />
                      </div>
                    </div>
                    
                    <div className="w-full h-64 bg-card rounded-lg overflow-hidden border">
                      <iframe
                        src={practicalInfo.location.mapUrl}
                        width="100%"
                        height="256"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={getText(practicalInfo.location.mapTitle)}
                        data-testid="map-hotel-location"
                      ></iframe>
                    </div>
                    
                    <div className="text-center">
                      <Button variant="outline" data-testid="button-get-directions">
                        {getText(practicalInfo.location.directionsButton)}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;