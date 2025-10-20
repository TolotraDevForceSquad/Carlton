// src/pages/BienEtreLoisirs.tsx
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Sparkles, Heart, Plus, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import { bienEtreLoisirsData } from '@/data/bienEtreLoisirsData';
import { useLanguage } from '@/components/context/LanguageContext';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';

const SECTION_KEY = 'bien-etre-loisirs';

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Helper to split bienEtreLoisirsData into dataFr and dataEn structures
const splitBienEtreLoisirsData = (mixedData: typeof bienEtreLoisirsData) => {
  const dataFr = {
    hero: {
      title: mixedData.hero.title.fr,
      description: mixedData.hero.description.fr,
      backgroundImage: mixedData.hero.backgroundImage
    },
    facilitiesSection: {
      title: mixedData.facilitiesSection.title.fr,
      subtitle: mixedData.facilitiesSection.subtitle.fr
    },
    programsSection: {
      title: mixedData.programsSection.title.fr,
      subtitle: mixedData.programsSection.subtitle.fr
    },
    headers: {
      equipments: mixedData.headers.equipments.fr,
      services: mixedData.headers.services.fr,
      highlights: mixedData.headers.highlights.fr
    },
    addTexts: {
      facility: mixedData.addTexts.facility.fr,
      program: mixedData.addTexts.program.fr,
      action: mixedData.addTexts.action.fr
    },
    facilities: mixedData.facilities.map((facility) => ({
      id: facility.id,
      name: facility.name.fr,
      type: facility.type.fr,
      description: facility.description.fr,
      image: facility.image,
      hours: facility.hours.fr,
      features: facility.features.map((feature) => feature.fr),
      services: facility.services.map((service) => service.fr),
      hidden: facility.hidden || false
    })),
    wellnessPrograms: mixedData.wellnessPrograms.map((program) => ({
      id: program.id,
      title: program.title.fr,
      duration: program.duration.fr,
      description: program.description.fr,
      highlights: program.highlights.map((highlight) => highlight.fr),
      hidden: program.hidden || false
    })),
    cta: {
      title: mixedData.cta.title.fr,
      description: mixedData.cta.description.fr,
      buttonText: mixedData.cta.buttonText.fr
    }
  };

  const dataEn = {
    hero: {
      title: mixedData.hero.title.en,
      description: mixedData.hero.description.en,
      backgroundImage: mixedData.hero.backgroundImage
    },
    facilitiesSection: {
      title: mixedData.facilitiesSection.title.en,
      subtitle: mixedData.facilitiesSection.subtitle.en
    },
    programsSection: {
      title: mixedData.programsSection.title.en,
      subtitle: mixedData.programsSection.subtitle.en
    },
    headers: {
      equipments: mixedData.headers.equipments.en,
      services: mixedData.headers.services.en,
      highlights: mixedData.headers.highlights.en
    },
    addTexts: {
      facility: mixedData.addTexts.facility.en,
      program: mixedData.addTexts.program.en,
      action: mixedData.addTexts.action.en
    },
    facilities: mixedData.facilities.map((facility) => ({
      id: facility.id,
      name: facility.name.en,
      type: facility.type.en,
      description: facility.description.en,
      image: facility.image,
      hours: facility.hours.en,
      features: facility.features.map((feature) => feature.en),
      services: facility.services.map((service) => service.en),
      hidden: facility.hidden || false
    })),
    wellnessPrograms: mixedData.wellnessPrograms.map((program) => ({
      id: program.id,
      title: program.title.en,
      duration: program.duration.en,
      description: program.description.en,
      highlights: program.highlights.map((highlight) => highlight.en),
      hidden: program.hidden || false
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
    return bienEtreLoisirsData;
  }
  const enFallback = dataEn || dataFr;
  return {
    hero: {
      title: { fr: dataFr.hero.title, en: enFallback.hero.title },
      description: { fr: dataFr.hero.description, en: enFallback.hero.description },
      backgroundImage: dataFr.hero.backgroundImage
    },
    facilitiesSection: {
      title: { fr: dataFr.facilitiesSection.title, en: enFallback.facilitiesSection.title },
      subtitle: { fr: dataFr.facilitiesSection.subtitle, en: enFallback.facilitiesSection.subtitle }
    },
    programsSection: {
      title: { fr: dataFr.programsSection.title, en: enFallback.programsSection.title },
      subtitle: { fr: dataFr.programsSection.subtitle, en: enFallback.programsSection.subtitle }
    },
    headers: {
      equipments: { fr: dataFr.headers.equipments, en: enFallback.headers.equipments },
      services: { fr: dataFr.headers.services, en: enFallback.headers.services },
      highlights: { fr: dataFr.headers.highlights, en: enFallback.headers.highlights }
    },
    addTexts: {
      facility: { fr: dataFr.addTexts.facility, en: enFallback.addTexts.facility },
      program: { fr: dataFr.addTexts.program, en: enFallback.addTexts.program },
      action: { fr: dataFr.addTexts.action, en: enFallback.addTexts.action }
    },
    facilities: dataFr.facilities.map((facilityFr: any, i: number) => {
      const facilityEn = enFallback.facilities[i] || facilityFr;
      return {
        id: facilityFr.id,
        name: { fr: facilityFr.name, en: facilityEn.name },
        type: { fr: facilityFr.type, en: facilityEn.type },
        description: { fr: facilityFr.description, en: facilityEn.description },
        image: facilityFr.image,
        hours: { fr: facilityFr.hours, en: facilityEn.hours },
        features: facilityFr.features.map((fFr: string, j: number) => ({
          fr: fFr,
          en: facilityEn.features[j] || fFr
        })),
        services: facilityFr.services.map((sFr: string, j: number) => ({
          fr: sFr,
          en: facilityEn.services[j] || sFr
        })),
        hidden: facilityFr.hidden !== undefined ? facilityFr.hidden : (facilityEn.hidden || false)
      };
    }),
    wellnessPrograms: dataFr.wellnessPrograms.map((programFr: any, i: number) => {
      const programEn = enFallback.wellnessPrograms[i] || programFr;
      return {
        id: programFr.id,
        title: { fr: programFr.title, en: programEn.title },
        duration: { fr: programFr.duration, en: programEn.duration },
        description: { fr: programFr.description, en: programEn.description },
        highlights: programFr.highlights.map((hFr: string, j: number) => ({
          fr: hFr,
          en: programEn.highlights[j] || hFr
        })),
        hidden: programFr.hidden !== undefined ? programFr.hidden : (programEn.hidden || false)
      };
    }),
    cta: {
      title: { fr: dataFr.cta.title, en: enFallback.cta.title },
      description: { fr: dataFr.cta.description, en: enFallback.cta.description },
      buttonText: { fr: dataFr.cta.buttonText, en: enFallback.cta.buttonText }
    }
  };
};

const BienEtreLoisirs = () => {
  const { currentLang } = useLanguage();
  const langKey = currentLang.code.toLowerCase();
  const [location, navigate] = useLocation();
  const [data, setData] = useState(() => reconstructMixed(splitBienEtreLoisirsData(bienEtreLoisirsData).dataFr, splitBienEtreLoisirsData(bienEtreLoisirsData).dataEn));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = !!localStorage.getItem('userToken');
  const isFr = currentLang.code === 'fr';

  const getText = (textObj: { fr: string; en: string }) => textObj[langKey as keyof typeof textObj];

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
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
          // Create default
          const { dataFr, dataEn } = splitBienEtreLoisirsData(bienEtreLoisirsData);
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
            throw new Error('Failed to create data');
          }

          const created = await createResponse.json();
          section = created;
        }

        if (section) {
          const fetchedData = reconstructMixed(section.dataFr, section.dataEn);
          setData(fetchedData);
        } else {
          setData(() => reconstructMixed(splitBienEtreLoisirsData(bienEtreLoisirsData).dataFr, splitBienEtreLoisirsData(bienEtreLoisirsData).dataEn));
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
        setData(() => reconstructMixed(splitBienEtreLoisirsData(bienEtreLoisirsData).dataFr, splitBienEtreLoisirsData(bienEtreLoisirsData).dataEn));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        if (hash && window.location.pathname === '/bien-etre-loisirs') {
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

  const updateSection = async (updatedMixedData: typeof data) => {
    try {
      const headers = getAuthHeaders();
      let currentSectionResponse = await fetch(`/api/globalSections?sectionKey=${SECTION_KEY}`, { headers });
      let currentData: any[] = [];
      if (currentSectionResponse.ok) {
        currentData = await currentSectionResponse.json();
      }
      let currentSection = currentData.find((s: any) => s.sectionKey === SECTION_KEY);

      if (!currentSection) {
        const { dataFr, dataEn } = splitBienEtreLoisirsData(bienEtreLoisirsData);
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

      const { dataFr: updatedDataFr, dataEn: updatedDataEn } = splitBienEtreLoisirsData(updatedMixedData);

      const putResponse = await fetch(`/api/globalSections/${currentSection.id}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataFr: updatedDataFr,
          dataEn: Object.keys(updatedDataEn).length > 0 ? updatedDataEn : null,
        }),
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update section');
      }
    } catch (err) {
      console.error('Error updating section:', err);
    }
  };

  // Fonction utilitaire pour gérer les clics sur les boutons de navigation
  const handleFacilityNavigation = (sectionId: string) => {
    if (window.location.pathname === '/bien-etre-loisirs') {
      // Si déjà sur la page, on utilise le défilement direct
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
      navigate(`/bien-etre-loisirs#${sectionId}`);
    }
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
      await updateSection(updatedData);
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
    await updateSection(updatedData);
  };

  const updateFacilitiesSectionField = (field: 'title' | 'subtitle') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        facilitiesSection: {
          ...data.facilitiesSection,
          [field]: { fr: newFr, en: newEn },
        },
      };
      setData(updatedData);
      await updateSection(updatedData);
    };
  };

  const updateProgramsSectionField = (field: 'title' | 'subtitle') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        programsSection: {
          ...data.programsSection,
          [field]: { fr: newFr, en: newEn },
        },
      };
      setData(updatedData);
      await updateSection(updatedData);
    };
  };

  const updateHeaderField = (field: 'equipments' | 'services' | 'highlights') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        headers: {
          ...data.headers,
          [field]: { fr: newFr, en: newEn },
        },
      };
      setData(updatedData);
      await updateSection(updatedData);
    };
  };

  const updateAddTextField = (field: 'facility' | 'program' | 'action') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        addTexts: {
          ...data.addTexts,
          [field]: { fr: newFr, en: newEn },
        },
      };
      setData(updatedData);
      await updateSection(updatedData);
    };
  };

  const updateFacilityField = (index: number, field: 'name' | 'type' | 'description' | 'hours') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        facilities: data.facilities.map((facility, i) =>
          i === index
            ? { ...facility, [field]: { fr: newFr, en: newEn } }
            : facility
        ),
      };
      setData(updatedData);
      await updateSection(updatedData);
    };
  };

  const updateFacilityFeature = (facilityIndex: number, featureIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        facilities: data.facilities.map((facility, i) =>
          i === facilityIndex
            ? {
                ...facility,
                features: facility.features.map((feature, j) =>
                  j === featureIndex ? { fr: newFr, en: newEn } : feature
                ),
              }
            : facility
        ),
      };
      setData(updatedData);
      await updateSection(updatedData);
    };
  };

  const addFacilityFeature = async (facilityIndex: number) => {
    const updatedData = {
      ...data,
      facilities: data.facilities.map((facility, i) =>
        i === facilityIndex
          ? {
              ...facility,
              features: [...facility.features, { fr: 'Nouvelle caractéristique', en: 'New feature' }],
            }
          : facility
      ),
    };
    setData(updatedData);
    await updateSection(updatedData);
  };

  const removeFacilityFeature = async (facilityIndex: number, featureIndex: number) => {
    const updatedData = {
      ...data,
      facilities: data.facilities.map((facility, i) =>
        i === facilityIndex
          ? {
              ...facility,
              features: facility.features.filter((_, j) => j !== featureIndex),
            }
          : facility
      ),
    };
    setData(updatedData);
    await updateSection(updatedData);
  };

  const updateFacilityService = (facilityIndex: number, serviceIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        facilities: data.facilities.map((facility, i) =>
          i === facilityIndex
            ? {
                ...facility,
                services: facility.services.map((service, j) =>
                  j === serviceIndex ? { fr: newFr, en: newEn } : service
                ),
              }
            : facility
        ),
      };
      setData(updatedData);
      await updateSection(updatedData);
    };
  };

  const addFacilityService = async (facilityIndex: number) => {
    const updatedData = {
      ...data,
      facilities: data.facilities.map((facility, i) =>
        i === facilityIndex
          ? {
              ...facility,
              services: [...facility.services, { fr: 'Nouveau service', en: 'New service' }],
            }
          : facility
      ),
    };
    setData(updatedData);
    await updateSection(updatedData);
  };

  const removeFacilityService = async (facilityIndex: number, serviceIndex: number) => {
    const updatedData = {
      ...data,
      facilities: data.facilities.map((facility, i) =>
        i === facilityIndex
          ? {
              ...facility,
              services: facility.services.filter((_, j) => j !== serviceIndex),
            }
          : facility
      ),
    };
    setData(updatedData);
    await updateSection(updatedData);
  };

  const toggleFacilityHidden = async (index: number) => {
    const updatedData = {
      ...data,
      facilities: data.facilities.map((facility, i) =>
        i === index ? { ...facility, hidden: !facility.hidden } : facility
      ),
    };
    setData(updatedData);
    await updateSection(updatedData);
  };

  const updateFacilityImage = (index: number) => {
    return async (newUrl: string) => {
      const updatedData = {
        ...data,
        facilities: data.facilities.map((facility, i) => (i === index ? { ...facility, image: newUrl } : facility)),
      };
      setData(updatedData);
      await updateSection(updatedData);
    };
  };

  const addFacility = async () => {
    let newFacility;
    if (data.facilities.length > 0) {
      const maxId = Math.max(...data.facilities.map((f: any) => f.id));
      newFacility = {
        ...data.facilities[0],
        id: maxId + 1,
        name: { fr: 'Nouvelle Installation', en: 'New Facility' },
        hidden: false,
      };
    } else {
      newFacility = {
        id: 1,
        name: { fr: 'Nouvelle Installation', en: 'New Facility' },
        type: { fr: 'Type', en: 'Type' },
        description: { fr: 'Description.', en: 'Description.' },
        image: '/uploads/generated_images/Spa_wellness_facilities_3dba6f04.png',
        hours: { fr: '', en: '' },
        features: [{ fr: 'Caractéristique 1', en: 'Feature 1' }],
        services: [{ fr: 'Service 1', en: 'Service 1' }],
        hidden: false
      };
    }
    const updatedData = {
      ...data,
      facilities: [...data.facilities, newFacility],
    };
    setData(updatedData);
    await updateSection(updatedData);
  };

  const removeFacility = async (id: number) => {
    const updatedData = {
      ...data,
      facilities: data.facilities.filter((facility) => facility.id !== id),
    };
    setData(updatedData);
    await updateSection(updatedData);
  };

  const updateProgramField = (index: number, field: 'title' | 'duration' | 'description') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        wellnessPrograms: data.wellnessPrograms.map((program, i) =>
          i === index
            ? { ...program, [field]: { fr: newFr, en: newEn } }
            : program
        ),
      };
      setData(updatedData);
      await updateSection(updatedData);
    };
  };

  const updateProgramHighlight = (programIndex: number, highlightIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        wellnessPrograms: data.wellnessPrograms.map((program, i) =>
          i === programIndex
            ? {
                ...program,
                highlights: program.highlights.map((highlight, j) =>
                  j === highlightIndex ? { fr: newFr, en: newEn } : highlight
                ),
              }
            : program
        ),
      };
      setData(updatedData);
      await updateSection(updatedData);
    };
  };

  const addProgramHighlight = async (programIndex: number) => {
    const updatedData = {
      ...data,
      wellnessPrograms: data.wellnessPrograms.map((program, i) =>
        i === programIndex
          ? {
              ...program,
              highlights: [...program.highlights, { fr: 'Nouveau point fort', en: 'New highlight' }],
            }
          : program
      ),
    };
    setData(updatedData);
    await updateSection(updatedData);
  };

  const removeProgramHighlight = async (programIndex: number, highlightIndex: number) => {
    const updatedData = {
      ...data,
      wellnessPrograms: data.wellnessPrograms.map((program, i) =>
        i === programIndex
          ? {
              ...program,
              highlights: program.highlights.filter((_, j) => j !== highlightIndex),
            }
          : program
      ),
    };
    setData(updatedData);
    await updateSection(updatedData);
  };

  const toggleProgramHidden = async (index: number) => {
    const updatedData = {
      ...data,
      wellnessPrograms: data.wellnessPrograms.map((program, i) =>
        i === index ? { ...program, hidden: !program.hidden } : program
      ),
    };
    setData(updatedData);
    await updateSection(updatedData);
  };

  const addProgram = async () => {
    let newProgram;
    if (data.wellnessPrograms.length > 0) {
      const maxId = Math.max(...data.wellnessPrograms.map((p: any) => p.id));
      newProgram = {
        ...data.wellnessPrograms[0],
        id: maxId + 1,
        title: { fr: 'Nouveau Programme', en: 'New Program' },
        hidden: false,
      };
    } else {
      newProgram = {
        id: 1,
        title: { fr: 'Nouveau Programme', en: 'New Program' },
        duration: { fr: '1h', en: '1h' },
        description: { fr: 'Description.', en: 'Description.' },
        highlights: [{ fr: 'Point fort 1', en: 'Highlight 1' }],
        hidden: false
      };
    }
    const updatedData = {
      ...data,
      wellnessPrograms: [...data.wellnessPrograms, newProgram],
    };
    setData(updatedData);
    await updateSection(updatedData);
  };

  const removeProgram = async (id: number) => {
    const updatedData = {
      ...data,
      wellnessPrograms: data.wellnessPrograms.filter((program) => program.id !== id),
    };
    setData(updatedData);
    await updateSection(updatedData);
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
      await updateSection(updatedData);
    };
  };

  const addFacilityCard = (
    <Card className="border-2 border-dashed border-muted-foreground hover:border-primary transition-colors flex flex-col">
      <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Button
          variant="outline"
          size="lg"
          onClick={addFacility}
          className="mb-4 rounded-full w-16 h-16 p-0"
        >
          <Plus className="w-6 h-6" />
        </Button>
        <p className="text-muted-foreground">
          {getText(data.addTexts.facility)}
        </p>
      </CardContent>
    </Card>
  );

  const addProgramCard = (
    <Card className="border-2 border-dashed border-muted-foreground hover:border-primary transition-colors flex flex-col">
      <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Button
          variant="outline"
          size="lg"
          onClick={addProgram}
          className="mb-4 rounded-full w-16 h-16 p-0"
        >
          <Plus className="w-6 h-6" />
        </Button>
        <p className="text-muted-foreground">
          {getText(data.addTexts.program)}
        </p>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <ParallaxSection
          backgroundImage={data.hero.backgroundImage || "/uploads/generated_images/Spa_wellness_facilities_3dba6f04.png"}
          parallaxSpeed={0.3}
          minHeight="100vh"
          overlay={true}
          overlayOpacity={0.5}
          className="flex items-center pt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white animate-pulse">
            <div className="h-20 w-full bg-muted/20 mb-8" />
            <div className="h-8 w-96 bg-muted/20 mx-auto mb-8" />
            <div className="h-12 w-80 bg-muted/20 mx-auto mb-12" />
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
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
              {[1,2,3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-8 w-64 bg-muted rounded mx-auto" />
                  <div className="h-6 w-48 bg-muted rounded mx-auto" />
                  <div className="h-4 w-full bg-muted" />
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

  const { hero, facilitiesSection, programsSection, headers, addTexts, facilities, wellnessPrograms, cta } = data;

  return (
    <div className="min-h-screen bg-background">
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
      
      <div className="relative">
        <ImageTooltip
          imageUrl={hero.backgroundImage}
          onSave={updateHeroBackgroundImage}
        >
          <ParallaxSection
            backgroundImage={hero.backgroundImage}
            parallaxSpeed={0.3}
            minHeight="100vh"
            overlay={true}
            overlayOpacity={0.5}
            className="flex items-center pt-20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              <Tooltip
                frLabel={hero.title.fr}
                enLabel={hero.title.en}
                onSave={updateHeroField('title')}
              >
                <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 drop-shadow-lg">
                  {formatAmpersand(getText(hero.title))}
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
              <div className="mt-8">
                <button 
                  onClick={() => handleFacilityNavigation('piscine')}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
                >
                  {isFr ? 'Découvrir nos installations' : 'Discover our facilities'}
                </button>
              </div>
            </div>
          </ParallaxSection>
        </ImageTooltip>
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

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Tooltip
              frLabel={facilitiesSection.title.fr}
              enLabel={facilitiesSection.title.en}
              onSave={updateFacilitiesSectionField('title')}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                {getText(facilitiesSection.title)}
              </h2>
            </Tooltip>
            <Tooltip
              frLabel={facilitiesSection.subtitle.fr}
              enLabel={facilitiesSection.subtitle.en}
              onSave={updateFacilitiesSectionField('subtitle')}
            >
              <p className="text-lg text-muted-foreground">
                {getText(facilitiesSection.subtitle)}
              </p>
            </Tooltip>
          </div>
          
          <div className="space-y-16">
            {facilities.map((facility, index) => {
              if (!isAdmin && facility.hidden) return null;
              const sectionId = facility.name.fr === 'Piscine' ? 'piscine' :
                                facility.name.fr === 'Fitness' ? 'salle-sport' :
                                facility.name.fr === 'Tennis' ? 'tennis' : 'soins';
              const direction = index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse';
              return (
                <Card 
                  key={facility.id} 
                  id={sectionId}
                  className={`relative overflow-hidden hover-elevate transition-all duration-300 ${direction} flex flex-col lg:flex ${facility.hidden ? 'opacity-50' : ''}`}
                  data-testid={`card-facility-${facility.id}`}
                >
                  {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFacilityHidden(index)}
                        title={facility.hidden ? (isFr ? 'Afficher' : 'Show') : (isFr ? 'Masquer' : 'Hide')}
                      >
                        {facility.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFacility(facility.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <div className="lg:w-1/2 relative">
                    <ImageTooltip
                      imageUrl={facility.image}
                      onSave={updateFacilityImage(index)}
                    >
                      <img 
                        src={facility.image} 
                        alt={getText(facility.name)}
                        className="w-full h-[300px] lg:h-full object-cover !important"
                        data-testid={`image-facility-${facility.id}`}
                      />
                    </ImageTooltip>
                  </div>
                  
                  <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <Tooltip
                            frLabel={facility.type.fr}
                            enLabel={facility.type.en}
                            onSave={updateFacilityField(index, 'type')}
                          >
                            <Badge variant="outline" className="text-primary border-primary" data-testid={`badge-type-${facility.id}`}>
                              {getText(facility.type)}
                            </Badge>
                          </Tooltip>
                          {facility.hours && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              {/* <Clock className="w-4 h-4" /> */}
                              <Tooltip
                                frLabel={facility.hours.fr}
                                enLabel={facility.hours.en}
                                onSave={updateFacilityField(index, 'hours')}
                              >
                                <span>{getText(facility.hours)}</span>
                              </Tooltip>
                            </div>
                          )}
                        </div>
                        <Tooltip
                          frLabel={facility.name.fr}
                          enLabel={facility.name.en}
                          onSave={updateFacilityField(index, 'name')}
                        >
                          <CardTitle className="text-3xl font-serif text-foreground mb-3" data-testid={`title-facility-${facility.id}`}>
                            {formatAmpersand(getText(facility.name))}
                          </CardTitle>
                        </Tooltip>
                      </CardHeader>
                      
                      <CardContent className="p-0 space-y-6">
                        <Tooltip
                          frLabel={facility.description.fr}
                          enLabel={facility.description.en}
                          onSave={updateFacilityField(index, 'description')}
                        >
                          <p className="text-muted-foreground leading-relaxed" data-testid={`description-facility-${facility.id}`}>
                            {getText(facility.description)}
                          </p>
                        </Tooltip>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {(facility.features.length > 0 || isAdmin) && (
                            <div>
                              {facility.features.length > 0 && !isAdmin && (
                                <h4 className="font-semibold text-foreground mb-3">{getText(headers.equipments)}</h4>
                              )}
                              {isAdmin && (
                                <Tooltip
                                  frLabel={headers.equipments.fr}
                                  enLabel={headers.equipments.en}
                                  onSave={updateHeaderField('equipments')}
                                >
                                  <h4 className="font-semibold text-foreground mb-3">{getText(headers.equipments)}</h4>
                                </Tooltip>
                              )}
                              <div className="space-y-2">
                                {facility.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`feature-${facility.id}-${fIndex}`}>
                                    <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                    <div className="flex-1">
                                      <Tooltip
                                        frLabel={feature.fr}
                                        enLabel={feature.en}
                                        onSave={updateFacilityFeature(index, fIndex)}
                                      >
                                        <span>{getText(feature)}</span>
                                      </Tooltip>
                                    </div>
                                    {isAdmin && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFacilityFeature(index, fIndex)}
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
                                    onClick={() => addFacilityFeature(index)}
                                    className="mt-2"
                                  >
                                    <Plus className="w-4 h-4 mr-1" />
                                    {getText(addTexts.action)}
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {(facility.services.length > 0 || isAdmin) && (
                            <div>
                              {facility.services.length > 0 && !isAdmin && (
                                <h4 className="font-semibold text-foreground mb-3">{getText(headers.services)}</h4>
                              )}
                              {isAdmin && (
                                <Tooltip
                                  frLabel={headers.services.fr}
                                  enLabel={headers.services.en}
                                  onSave={updateHeaderField('services')}
                                >
                                  <h4 className="font-semibold text-foreground mb-3">{getText(headers.services)}</h4>
                                </Tooltip>
                              )}
                              <div className="space-y-2">
                                {facility.services.map((service, sIndex) => (
                                  <div key={sIndex} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`service-${facility.id}-${sIndex}`}>
                                    <Star className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                                    <div className="flex-1">
                                      <Tooltip
                                        frLabel={service.fr}
                                        enLabel={service.en}
                                        onSave={updateFacilityService(index, sIndex)}
                                      >
                                        <span>{getText(service)}</span>
                                      </Tooltip>
                                    </div>
                                    {isAdmin && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFacilityService(index, sIndex)}
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
                                    onClick={() => addFacilityService(index)}
                                    className="mt-2"
                                  >
                                    <Plus className="w-4 h-4 mr-1" />
                                    {getText(addTexts.action)}
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              );
            })}
            {isAdmin && addFacilityCard}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Tooltip
              frLabel={programsSection.title.fr}
              enLabel={programsSection.title.en}
              onSave={updateProgramsSectionField('title')}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                {getText(programsSection.title)}
              </h2>
            </Tooltip>
            <Tooltip
              frLabel={programsSection.subtitle.fr}
              enLabel={programsSection.subtitle.en}
              onSave={updateProgramsSectionField('subtitle')}
            >
              <p className="text-lg text-muted-foreground">
                {getText(programsSection.subtitle)}
              </p>
            </Tooltip>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wellnessPrograms.map((program) => {
              if (!isAdmin && program.hidden) return null;
              return (
                <Card key={program.id} className={`hover-elevate ${program.hidden ? 'opacity-50' : ''}`} data-testid={`card-program-${program.id}`}>
                  {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleProgramHidden(program.id - 1)}
                        title={program.hidden ? (isFr ? 'Afficher' : 'Show') : (isFr ? 'Masquer' : 'Hide')}
                      >
                        {program.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProgram(program.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Tooltip
                        frLabel={program.duration.fr}
                        enLabel={program.duration.en}
                        onSave={updateProgramField(program.id - 1, 'duration')}
                      >
                        <Badge variant="outline" className="text-primary border-primary" data-testid={`badge-duration-${program.id}`}>
                          {getText(program.duration)}
                        </Badge>
                      </Tooltip>
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <Tooltip
                      frLabel={program.title.fr}
                      enLabel={program.title.en}
                      onSave={updateProgramField(program.id - 1, 'title')}
                    >
                      <CardTitle className="text-xl font-serif text-foreground" data-testid={`title-program-${program.id}`}>
                        {formatAmpersand(getText(program.title))}
                      </CardTitle>
                    </Tooltip>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Tooltip
                      frLabel={program.description.fr}
                      enLabel={program.description.en}
                      onSave={updateProgramField(program.id - 1, 'description')}
                    >
                      <p className="text-muted-foreground" data-testid={`description-program-${program.id}`}>
                        {getText(program.description)}
                      </p>
                    </Tooltip>
                    {program.highlights.length > 0 && (
                      <div>
                        <Tooltip
                          frLabel={headers.highlights.fr}
                          enLabel={headers.highlights.en}
                          onSave={updateHeaderField('highlights')}
                        >
                          <h4 className="font-semibold text-foreground mb-2">{getText(headers.highlights)}</h4>
                        </Tooltip>
                        <div className="space-y-1">
                          {program.highlights.map((highlight, hIndex) => (
                            <div key={hIndex} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`highlight-${program.id}-${hIndex}`}>
                              <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <Tooltip
                                  frLabel={highlight.fr}
                                  enLabel={highlight.en}
                                  onSave={updateProgramHighlight(program.id - 1, hIndex)}
                                >
                                  <span>{getText(highlight)}</span>
                                </Tooltip>
                              </div>
                              {isAdmin && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeProgramHighlight(program.id - 1, hIndex)}
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
                              onClick={() => addProgramHighlight(program.id - 1)}
                              className="mt-2"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              {getText(addTexts.action)}
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
            {isAdmin && addProgramCard}
          </div>
        </div>
      </section>

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
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/reservation')}
              data-testid="button-contact-wellness"
            >
              <Heart className="w-4 h-4 mr-2" />
              <Tooltip
                frLabel={cta.buttonText.fr}
                enLabel={cta.buttonText.en}
                onSave={updateCtaField('buttonText')}
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

export default BienEtreLoisirs;