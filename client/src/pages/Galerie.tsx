
// src/pages/Galerie.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';
import { Camera, Eye, Download, Share2, Heart, Filter } from 'lucide-react';
import Footer from '@/components/Footer';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { galeriePageData } from '@/data/galerieData';
import { useLanguage } from '@/components/context/LanguageContext';

const SECTION_KEY = 'galerie';

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const Galerie = () => {
  const { currentLang } = useLanguage();
  const lang = currentLang.code.toLowerCase();
  const [data, setData] = useState(galeriePageData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to split galeriePageData into dataFr and dataEn structures
  const splitGalerieData = (mixedData: typeof galeriePageData) => {
    const dataFr = {
      hero: {
        title: mixedData.hero.title.fr,
        description: mixedData.hero.description.fr,
        image: mixedData.hero.image,
      },
      galleries: mixedData.galleries.map((gallery) => ({
        title: gallery.title.fr,
        description: gallery.description.fr,
        images: gallery.images.map((image) => ({
          src: image.src,
          alt: image.alt.fr,
          category: image.category.fr,
          title: image.title.fr,
        })),
      })),
      categories: mixedData.categories.map((cat) => cat.fr),
      virtualTour: {
        title: mixedData.virtualTour.title.fr,
        description: mixedData.virtualTour.description.fr,
        items: mixedData.virtualTour.items.map((item) => ({
          title: item.title.fr,
          description: item.description.fr,
          icon: item.icon,
        })),
        buttonText: mixedData.virtualTour.buttonText.fr,
      },
    };

    const dataEn = {
      hero: {
        title: mixedData.hero.title.en,
        description: mixedData.hero.description.en,
        image: mixedData.hero.image,
      },
      galleries: mixedData.galleries.map((gallery) => ({
        title: gallery.title.en,
        description: gallery.description.en,
        images: gallery.images.map((image) => ({
          src: image.src,
          alt: image.alt.en,
          category: image.category.en,
          title: image.title.en,
        })),
      })),
      categories: mixedData.categories.map((cat) => cat.en),
      virtualTour: {
        title: mixedData.virtualTour.title.en,
        description: mixedData.virtualTour.description.en,
        items: mixedData.virtualTour.items.map((item) => ({
          title: item.title.en,
          description: item.description.en,
          icon: item.icon,
        })),
        buttonText: mixedData.virtualTour.buttonText.en,
      },
    };

    return { dataFr, dataEn };
  };

  // Reconstruct mixed data from dataFr and dataEn
  const reconstructMixed = (dataFr: any, dataEn: any | null) => {
    if (!dataFr || typeof dataFr !== 'object') {
      console.warn('Invalid dataFr structure, falling back to default');
      return galeriePageData;
    }
    const enFallback = dataEn || dataFr;
    const mixed = {
      hero: {
        title: { fr: dataFr.hero.title, en: enFallback.hero.title || dataFr.hero.title },
        description: { fr: dataFr.hero.description, en: enFallback.hero.description || dataFr.hero.description },
        image: dataFr.hero.image || galeriePageData.hero.image,
      },
      galleries: dataFr.galleries.map((galleryFr: any, gIndex: number) => ({
        title: { fr: galleryFr.title, en: enFallback.galleries[gIndex]?.title || galleryFr.title },
        description: { fr: galleryFr.description, en: enFallback.galleries[gIndex]?.description || galleryFr.description },
        images: galleryFr.images.map((imageFr: any, iIndex: number) => ({
          src: imageFr.src || galeriePageData.galleries[gIndex].images[iIndex].src,
          alt: { fr: imageFr.alt, en: enFallback.galleries[gIndex]?.images[iIndex]?.alt || imageFr.alt },
          category: { fr: imageFr.category, en: enFallback.galleries[gIndex]?.images[iIndex]?.category || imageFr.category },
          title: { fr: imageFr.title, en: enFallback.galleries[gIndex]?.images[iIndex]?.title || imageFr.title },
        })),
      })),
      categories: dataFr.categories.map((catFr: string, cIndex: number) => ({
        fr: catFr,
        en: enFallback.categories[cIndex] || catFr,
      })),
      virtualTour: {
        title: { fr: dataFr.virtualTour.title, en: enFallback.virtualTour.title || dataFr.virtualTour.title },
        description: { fr: dataFr.virtualTour.description, en: enFallback.virtualTour.description || dataFr.virtualTour.description },
        items: dataFr.virtualTour.items.map((itemFr: any, itIndex: number) => ({
          title: { fr: itemFr.title, en: enFallback.virtualTour.items[itIndex]?.title || itemFr.title },
          description: { fr: itemFr.description, en: enFallback.virtualTour.items[itIndex]?.description || itemFr.description },
          icon: itemFr.icon || galeriePageData.virtualTour.items[itIndex].icon,
        })),
        buttonText: { fr: dataFr.virtualTour.buttonText, en: enFallback.virtualTour.buttonText || dataFr.virtualTour.buttonText },
      },
    };
    return mixed;
  };

  // Fetch galerie data from backend
  useEffect(() => {
    const fetchGalerieData = async () => {
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
          const { dataFr, dataEn } = splitGalerieData(galeriePageData);
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
            throw new Error('Failed to create galerie data');
          }

          const created = await createResponse.json();
          section = created;
        }

        if (section) {
          const fetchedData = reconstructMixed(section.dataFr, section.dataEn);
          console.log('Fetched hero title fr:', fetchedData.hero.title.fr);
          console.log('Fetched hero description fr:', fetchedData.hero.description.fr);
          setData(fetchedData);
        } else {
          setData(galeriePageData);
        }
      } catch (err) {
        console.error('Error fetching galerie data:', err);
        setError('Failed to load galerie data');
        // Fallback to default
        setData(galeriePageData);
      } finally {
        setLoading(false);
      }
    };

    fetchGalerieData();
  }, []);

  const updateGalerieSection = async (updatedMixedData: typeof galeriePageData) => {
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
        const { dataFr, dataEn } = splitGalerieData(galeriePageData);
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

      const { dataFr: updatedDataFr, dataEn: updatedDataEn } = splitGalerieData(updatedMixedData);

      const putResponse = await fetch(`/api/globalSections/${currentSection.id}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataFr: updatedDataFr,
          dataEn: Object.keys(updatedDataEn).length > 0 ? updatedDataEn : null
        })
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update galerie section');
      }
    } catch (err) {
      console.error('Error updating galerie section:', err);
      // Revert local state on error if needed, but for simplicity, keep it
    }
  };

  const t = (key: { fr: string; en: string }) => key[lang];
  const tArray = (items: Array<{ fr: string; en: string }>) => items.map(item => t(item));

  const { galleries, categories, virtualTour, hero } = data;

  // Update functions
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
      await updateGalerieSection(updatedData);
    };
  };

  const updateHeroImage = async (newImageUrl: string) => {
    const updatedData = {
      ...data,
      hero: { ...data.hero, image: newImageUrl }
    };
    setData(updatedData);
    await updateGalerieSection(updatedData);
  };

  const updateGalleryField = (galleryIndex: number, field: 'title' | 'description') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        galleries: data.galleries.map((g, i) =>
          i === galleryIndex
            ? { ...g, [field]: { fr: newFr, en: newEn } }
            : g
        ),
      };
      setData(updatedData);
      await updateGalerieSection(updatedData);
    };
  };

  const updateImageField = (galleryIndex: number, imageIndex: number, field: 'alt' | 'category' | 'title') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        galleries: data.galleries.map((g, gi) =>
          gi === galleryIndex
            ? {
                ...g,
                images: g.images.map((img, ii) =>
                  ii === imageIndex
                    ? { ...img, [field]: { fr: newFr, en: newEn } }
                    : img
                ),
              }
            : g
        ),
      };
      setData(updatedData);
      await updateGalerieSection(updatedData);
    };
  };

  const updateImageSrc = (galleryIndex: number, imageIndex: number) => {
    return async (newUrl: string) => {
      const updatedData = {
        ...data,
        galleries: data.galleries.map((g, gi) =>
          gi === galleryIndex
            ? {
                ...g,
                images: g.images.map((img, ii) =>
                  ii === imageIndex ? { ...img, src: newUrl } : img
                ),
              }
            : g
        ),
      };
      setData(updatedData);
      await updateGalerieSection(updatedData);
    };
  };

  const updateCategory = (categoryIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        categories: data.categories.map((cat, i) =>
          i === categoryIndex ? { fr: newFr, en: newEn } : cat
        ),
      };
      setData(updatedData);
      await updateGalerieSection(updatedData);
    };
  };

  const updateVirtualTourField = (field: 'title' | 'description' | 'buttonText') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        virtualTour: {
          ...data.virtualTour,
          [field]: { fr: newFr, en: newEn },
        },
      };
      setData(updatedData);
      await updateGalerieSection(updatedData);
    };
  };

  const updateVirtualTourItemField = (itemIndex: number, field: 'title' | 'description') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        virtualTour: {
          ...data.virtualTour,
          items: data.virtualTour.items.map((item, i) =>
            i === itemIndex
              ? { ...item, [field]: { fr: newFr, en: newEn } }
              : item
          ),
        },
      };
      setData(updatedData);
      await updateGalerieSection(updatedData);
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement de la galerie...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.warn(error);
  }

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section 
        className="pt-20 bg-cover bg-center bg-no-repeat relative min-h-[80vh] flex items-center"
        style={{ backgroundImage: `url(${hero.image})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            <Tooltip
              frLabel={hero.title.fr}
              enLabel={hero.title.en}
              onSave={updateHeroField('title')}
            >
              <span>{formatAmpersand(t(hero.title))}</span>
            </Tooltip>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            <Tooltip
              frLabel={hero.description.fr}
              enLabel={hero.description.en}
              onSave={updateHeroField('description')}
            >
              <span>{t(hero.description)}</span>
            </Tooltip>
          </p>
          
          {/* Filter Tags */}
          {/* <div className="flex flex-wrap justify-center gap-2">
            {data.categories.map((category, index) => (
              <ImageTooltip
                key={index}
                imageUrl={hero.image}
                onSave={updateHeroImage}
              >
                <Tooltip
                  frLabel={category.fr}
                  enLabel={category.en}
                  onSave={updateCategory(index)}
                >
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover-elevate"
                    data-testid={`filter-${t(category).toLowerCase()}`}
                  >
                    <Filter className="w-3 h-3 mr-1" />
                    <span>{t(category)}</span>
                  </Badge>
                </Tooltip>
              </ImageTooltip>
            ))}
          </div> */}
        </div>
      </section>

      {/* Gallery Sections */}
      {galleries.map((gallery, galleryIndex) => (
        <section key={galleryIndex} className={galleryIndex % 2 === 1 ? "py-16 bg-card/20" : "py-16"}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4" data-testid={`title-gallery-${galleryIndex}`}>
                <Tooltip
                  frLabel={gallery.title.fr}
                  enLabel={gallery.title.en}
                  onSave={updateGalleryField(galleryIndex, 'title')}
                >
                  <span>{formatAmpersand(t(gallery.title))}</span>
                </Tooltip>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid={`description-gallery-${galleryIndex}`}>
                <Tooltip
                  frLabel={gallery.description.fr}
                  enLabel={gallery.description.en}
                  onSave={updateGalleryField(galleryIndex, 'description')}
                >
                  <span>{t(gallery.description)}</span>
                </Tooltip>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gallery.images.map((image, imageIndex) => (
                <ImageTooltip
                  key={imageIndex}
                  imageUrl={image.src}
                  onSave={(newUrl) => updateImageSrc(galleryIndex, imageIndex)(newUrl)}
                >
                  <Card className="group hover-elevate overflow-hidden transition-all duration-300" data-testid={`card-image-${galleryIndex}-${imageIndex}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={image.src}
                        alt={t(image.alt)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        data-testid={`image-${galleryIndex}-${imageIndex}`}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                          <Button size="sm" variant="secondary" className="rounded-full" data-testid={`button-view-${galleryIndex}-${imageIndex}`}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="secondary" className="rounded-full" data-testid={`button-like-${galleryIndex}-${imageIndex}`}>
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="secondary" className="rounded-full" data-testid={`button-share-${galleryIndex}-${imageIndex}`}>
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Tooltip
                          frLabel={image.category.fr}
                          enLabel={image.category.en}
                          onSave={updateImageField(galleryIndex, imageIndex, 'category')}
                        >
                          <Badge variant="secondary" data-testid={`badge-category-${galleryIndex}-${imageIndex}`}>
                            <span>{t(image.category)}</span>
                          </Badge>
                        </Tooltip>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2" data-testid={`title-image-${galleryIndex}-${imageIndex}`}>
                        <Tooltip
                          frLabel={image.title.fr}
                          enLabel={image.title.en}
                          onSave={updateImageField(galleryIndex, imageIndex, 'title')}
                        >
                          <span>{t(image.title)}</span>
                        </Tooltip>
                      </h3>
                      <div className="flex items-center justify-between">
                        <Tooltip
                          frLabel={image.alt.fr}
                          enLabel={image.alt.en}
                          onSave={updateImageField(galleryIndex, imageIndex, 'alt')}
                        >
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Camera className="w-3 h-3 mr-1" />
                            <span>{lang === 'fr' ? 'Carlton Madagascar' : 'Carlton Madagascar'}</span>
                          </div>
                        </Tooltip>
                        <Button size="sm" variant="ghost" data-testid={`button-download-${galleryIndex}-${imageIndex}`}>
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ImageTooltip>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Virtual Tour Section */}
      <section className="py-16 bg-gradient-to-b from-card/20 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
            <Tooltip
              frLabel={virtualTour.title.fr}
              enLabel={virtualTour.title.en}
              onSave={updateVirtualTourField('title')}
            >
              <span>{t(virtualTour.title)}</span>
            </Tooltip>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            <Tooltip
              frLabel={virtualTour.description.fr}
              enLabel={virtualTour.description.en}
              onSave={updateVirtualTourField('description')}
            >
              <span>{t(virtualTour.description)}</span>
            </Tooltip>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {virtualTour.items.map((item, index) => (
              <Card key={index} className="group hover-elevate cursor-pointer transition-all duration-300" data-testid={`card-virtual-tour-${index}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto mb-4 flex items-center justify-center">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    <Tooltip
                      frLabel={item.title.fr}
                      enLabel={item.title.en}
                      onSave={updateVirtualTourItemField(index, 'title')}
                    >
                      <span>{t(item.title)}</span>
                    </Tooltip>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    <Tooltip
                      frLabel={item.description.fr}
                      enLabel={item.description.en}
                      onSave={updateVirtualTourItemField(index, 'description')}
                    >
                      <span>{t(item.description)}</span>
                    </Tooltip>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button size="lg" data-testid="button-full-virtual-tour">
            <Camera className="w-5 h-5 mr-2" />
            <Tooltip
              frLabel={virtualTour.buttonText.fr}
              enLabel={virtualTour.buttonText.en}
              onSave={updateVirtualTourField('buttonText')}
            >
              <span>{t(virtualTour.buttonText)}</span>
            </Tooltip>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Galerie;