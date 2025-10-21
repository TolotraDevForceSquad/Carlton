

// src/components/Home.tsx
import HeroSection from '@/components/HeroSection';
import ParallaxSection from '@/components/ParallaxSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Clock, MapPin, Utensils, Camera, Calendar, Sparkles, Check, X, ChevronDown, ChevronUp } from 'lucide-react'; 
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { homeData as initialHomeData } from '@/data/homeData';
import wellnessImage from '@assets/generated_images/Hotel_infinity_pool_wellness_a9857557.png';
import { useLanguage } from '@/components/context/LanguageContext';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';
import { useState, useEffect, useCallback } from 'react';

const SECTION_KEY = 'home';

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Composant Modal pour l'affichage en popup
const ImageModal = ({ isOpen, onClose, imageUrl, alt }: { 
  isOpen: boolean; 
  onClose: () => void; 
  imageUrl: string; 
  alt: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-4xl max-h-[90vh] mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-contain max-h-[80vh] rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

// Composant Carousel pour Équipements & Services
const EquipmentCarousel = ({ 
  images, 
  currentIndex, 
  onIndexChange 
}: { 
  images: string[]; 
  currentIndex: number; 
  onIndexChange: (index: number) => void;
}) => {
  return (
    <div className="relative h-96 lg:h-[500px] w-full overflow-hidden rounded-xl shadow-2xl">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Equipment ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      ))}
      
      {/* Indicateurs de navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const { currentLang } = useLanguage();
  const lang = currentLang.code.toLowerCase();
  
  const [data, setData] = useState(initialHomeData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // État pour l'expansion du contenu
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  
  // États pour les modales d'images
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedImageAlt, setSelectedImageAlt] = useState<string>('');

  // État pour le carrousel Équipements & Services
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // Images pour le carrousel Équipements & Services
  const carouselImages = [
    "/uploads/Hotel_infinity_pool_wellness_a9857557.png",
    "/uploads/Presidential_suite_bedroom_interior_7adece21.png",
    "/uploads/Luxury_hotel_restaurant_interior_090ad235.png",
    "/uploads/Luxury_hotel_wedding_reception_d3ca816d.png"
  ];

  // Gestion du carrousel automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 2000); // Change toutes les 2 secondes

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Fonction pour ouvrir la modal d'image
  const openImageModal = useCallback((imageUrl: string, alt: string) => {
    setSelectedImage(imageUrl);
    setSelectedImageAlt(alt);
    setModalOpen(true);
  }, []);

  // Fonction pour fermer la modal
  const closeImageModal = useCallback(() => {
    setModalOpen(false);
    setSelectedImage('');
    setSelectedImageAlt('');
  }, []);

  // Helper to split homeData into dataFr and dataEn structures
  const splitHomeData = (mixedData: typeof initialHomeData) => {
    const dataFr = {
      title: mixedData.title.fr,
      content: mixedData.content.fr,
      contentShort: mixedData.contentShort.fr,
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
      contentShort: mixedData.contentShort.en,
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
      contentShort: { fr: dataFr.contentShort, en: enFallback.contentShort || dataFr.contentShort },
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
          section = created;
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
    }
  };
  
  const { title: rawTitle, content: rawContent, contentShort: rawContentShort, highlights: rawHighlights, cta: rawCta, parallaxImage } = data;
  
  const title = rawTitle[lang];
  const fullContent = rawContent[lang];
  const shortContent = rawContentShort[lang];
  const displayedContent = isContentExpanded ? fullContent : shortContent;
  const showExpandButton = fullContent.trim() !== shortContent.trim();
  
  const highlights = rawHighlights.map(highlight => ({
    ...highlight,
    title: highlight.title[lang],
    description: highlight.description[lang],
    linkText: highlight.linkText[lang]
  }));
  
  const processedHighlights = highlights.map((highlight, index) => ({
    ...highlight,
    image: highlight.image || wellnessImage
  }));

  const mainHighlights = processedHighlights.slice(0, 3);
  const equipmentHighlight = processedHighlights[3];

  const getServicesList = (description: string) => {
      return description.split(',').map(s => s.trim()).filter(s => s.length > 0);
  }
  
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

  const toggleContentExpansion = () => {
    setIsContentExpanded(!isContentExpanded);
  };

  const buttonText = lang === 'fr' 
    ? (isContentExpanded ? 'Lire moins' : 'Lire plus') 
    : (isContentExpanded ? 'Read less' : 'Read more');
  const ChevronIcon = isContentExpanded ? ChevronUp : ChevronDown;

  const contentParagraphs = displayedContent.split('\n\n').map((para, i) => (
    <p key={i} className="mb-6 last:mb-0">
      {para}
    </p>
  ));

  // Les fonctions de mise à jour restent inchangées
  const updateTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      title: { fr: newFr, en: newEn }
    };
    setData(updatedData);
    await updateHomeSection(updatedData);
  };

  const updateContent = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      content: { fr: newFr, en: newEn }
    };
    setData(updatedData);
    await updateHomeSection(updatedData);
  };

  const updateContentShort = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      contentShort: { fr: newFr, en: newEn }
    };
    setData(updatedData);
    await updateHomeSection(updatedData);
  };

  const updateHighlightTitle = (index: number) => async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      highlights: data.highlights.map((h, i) => 
        i === index ? { ...h, title: { fr: newFr, en: newEn } } : h
      )
    };
    setData(updatedData);
    await updateHomeSection(updatedData);
  };

  const updateHighlightDescription = (index: number) => async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      highlights: data.highlights.map((h, i) => 
        i === index ? { ...h, description: { fr: newFr, en: newEn } } : h
      )
    };
    setData(updatedData);
    await updateHomeSection(updatedData);
  };

  const updateHighlightLinkText = (index: number) => async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      highlights: data.highlights.map((h, i) => 
        i === index ? { ...h, linkText: { fr: newFr, en: newEn } } : h
      )
    };
    setData(updatedData);
    await updateHomeSection(updatedData);
  };

  const updateCtaTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      cta: { ...data.cta, title: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updateHomeSection(updatedData);
  };

  const updateCtaDescription = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      cta: { ...data.cta, description: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updateHomeSection(updatedData);
  };

  const updateCtaPrimaryButton = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      cta: { ...data.cta, primaryButton: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updateHomeSection(updatedData);
  };

  const updateCtaSecondaryButton = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      cta: { ...data.cta, secondaryButton: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updateHomeSection(updatedData);
  };

  const updateHighlightImage = (index: number) => async (newImageUrl: string) => {
    const updatedData = {
      ...data,
      highlights: data.highlights.map((h, i) => 
        i === index ? { ...h, image: newImageUrl } : h
      )
    };
    setData(updatedData);
    await updateHomeSection(updatedData);
  };

  const updateParallaxImage = async (newImageUrl: string) => {
    const updatedData = {
      ...data,
      parallaxImage: newImageUrl
    };
    setData(updatedData);
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
              <div className="max-w-4xl mx-auto">
                {showExpandButton ? (
                  isContentExpanded ? (
                    <Tooltip 
                      frLabel={data.content.fr} 
                      enLabel={data.content.en} 
                      onSave={updateContent}
                    >
                      <div className="text-xl text-muted-foreground leading-relaxed prose prose-lg dark:prose-invert space-y-4 mb-8">
                        {contentParagraphs}
                      </div>
                    </Tooltip>
                  ) : (
                    <Tooltip 
                      frLabel={data.contentShort.fr} 
                      enLabel={data.contentShort.en} 
                      onSave={updateContentShort}
                    >
                      <div className="text-xl text-muted-foreground leading-relaxed prose prose-lg dark:prose-invert space-y-4 mb-8">
                        {contentParagraphs}
                      </div>
                    </Tooltip>
                  )
                ) : (
                  <Tooltip 
                    frLabel={data.content.fr} 
                    enLabel={data.content.en} 
                    onSave={updateContent}
                  >
                    <div className="text-xl text-muted-foreground leading-relaxed prose prose-lg dark:prose-invert space-y-4 mb-8">
                      {contentParagraphs}
                    </div>
                  </Tooltip>
                )}
                {showExpandButton && (
                  <div className="text-center mt-8">
                    <button
                      onClick={toggleContentExpansion}
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-sm"
                    >
                      {buttonText} <ChevronIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Highlights principaux (3 premiers) avec layouts alternés */}
            <div className="space-y-12 mb-20">
              {mainHighlights.map((highlight, index) => {
                const isImageLeft = index % 2 === 0;
                return (
                  <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-background p-8 rounded-xl shadow-lg">
                    {isImageLeft ? (
                      <>
                        {/* Image à gauche sur desktop, en haut sur mobile */}
                        <div className="lg:col-span-7">
                          <ImageTooltip imageUrl={data.highlights[index].image || wellnessImage} onSave={updateHighlightImage(index)}>
                            <div 
                              className="relative h-64 lg:h-80 overflow-hidden cursor-pointer rounded-xl"
                              onClick={() => openImageModal(highlight.image, highlight.title)}
                            >
                              <img 
                                src={highlight.image} 
                                alt={highlight.title}
                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110 rounded-xl"
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
                        </div>
                        {/* Texte à droite sur desktop, en bas sur mobile */}
                        <div className="lg:col-span-5">
                          <h3 className="text-3xl font-serif font-bold text-foreground mb-4">
                            <Tooltip 
                              frLabel={data.highlights[index].title.fr} 
                              enLabel={data.highlights[index].title.en} 
                              onSave={updateHighlightTitle(index)}
                            >
                              {formatAmpersand(highlight.title)}
                            </Tooltip>
                          </h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                            <Tooltip 
                              frLabel={data.highlights[index].description.fr} 
                              enLabel={data.highlights[index].description.en} 
                              onSave={updateHighlightDescription(index)}
                            >
                              {highlight.description}
                            </Tooltip>
                          </p>
                          <Link href={highlight.link}>
                            <Button className="w-full lg:w-auto bg-yellow-500 hover:bg-yellow-600 text-black">
                              <Tooltip 
                                frLabel={data.highlights[index].linkText.fr} 
                                enLabel={data.highlights[index].linkText.en} 
                                onSave={updateHighlightLinkText(index)}
                              >
                                {highlight.linkText}
                              </Tooltip>
                            </Button>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Texte à gauche sur desktop, en haut sur mobile */}
                        <div className="lg:col-span-5">
                          <h3 className="text-3xl font-serif font-bold text-foreground mb-4">
                            <Tooltip 
                              frLabel={data.highlights[index].title.fr} 
                              enLabel={data.highlights[index].title.en} 
                              onSave={updateHighlightTitle(index)}
                            >
                              {formatAmpersand(highlight.title)}
                            </Tooltip>
                          </h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                            <Tooltip 
                              frLabel={data.highlights[index].description.fr} 
                              enLabel={data.highlights[index].description.en} 
                              onSave={updateHighlightDescription(index)}
                            >
                              {highlight.description}
                            </Tooltip>
                          </p>
                          <Link href={highlight.link}>
                            <Button className="w-full lg:w-auto bg-yellow-500 hover:bg-yellow-600 text-black">
                              <Tooltip 
                                frLabel={data.highlights[index].linkText.fr} 
                                enLabel={data.highlights[index].linkText.en} 
                                onSave={updateHighlightLinkText(index)}
                              >
                                {highlight.linkText}
                              </Tooltip>
                            </Button>
                          </Link>
                        </div>
                        {/* Image à droite sur desktop, en bas sur mobile */}
                        <div className="lg:col-span-7">
                          <ImageTooltip imageUrl={data.highlights[index].image || wellnessImage} onSave={updateHighlightImage(index)}>
                            <div 
                              className="relative h-64 lg:h-80 overflow-hidden cursor-pointer rounded-xl"
                              onClick={() => openImageModal(highlight.image, highlight.title)}
                            >
                              <img 
                                src={highlight.image} 
                                alt={highlight.title}
                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110 rounded-xl"
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
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Section Équipements & Services avec carrousel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-background p-8 rounded-xl shadow-lg">
                {/* Colonne de la liste des services */}
                <div className="lg:col-span-5">
                    <h3 className="text-3xl font-serif font-bold text-foreground mb-4 flex items-center">
                        <Tooltip 
                            frLabel={data.highlights[3].title.fr} 
                            enLabel={data.highlights[3].title.en} 
                            onSave={updateHighlightTitle(3)}
                        >
                            {equipmentHighlight.title}
                        </Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {getServicesList(equipmentHighlight.description).map((service, i) => (
                            <div key={i} className="flex items-start text-lg text-muted-foreground">
                                <Check className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span className="flex-1">{service}</span>
                            </div>
                        ))}
                    </div>
                    <Link href={equipmentHighlight.link}>
                      <Button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black">
                        <Tooltip 
                          frLabel={data.highlights[3].linkText.fr} 
                          enLabel={data.highlights[3].linkText.en} 
                          onSave={updateHighlightLinkText(3)}
                        >
                          {equipmentHighlight.linkText}
                        </Tooltip>
                      </Button>
                    </Link>
                </div>
                
                {/* Colonne Carrousel */}
                <div className="lg:col-span-7">
                  <ImageTooltip imageUrl={carouselImages[carouselIndex]} onSave={updateHighlightImage(3)}>
                    <div 
                      className="cursor-pointer"
                      onClick={() => openImageModal(carouselImages[carouselIndex], equipmentHighlight.title)}
                    >
                      <EquipmentCarousel 
                        images={carouselImages}
                        currentIndex={carouselIndex}
                        onIndexChange={setCarouselIndex}
                      />
                    </div>
                  </ImageTooltip>
                </div>
            </div>
          </div>
        </section>

        {/* Section Parallax - Bien-être */}
        <div 
          className="cursor-pointer"
          onClick={() => openImageModal(parallaxImage || wellnessImage, "Hôtel Carlton Madagascar")}
        >
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
        </div>

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
                <Button size="lg" className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black">
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
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
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

      {/* Modal pour l'affichage des images en plein écran */}
      <ImageModal 
        isOpen={modalOpen}
        onClose={closeImageModal}
        imageUrl={selectedImage}
        alt={selectedImageAlt}
      />

      <Footer />
    </div>
  );
};

export default Home;