// src/data/offresData.ts
export const offresPageData = {
  hero: {
    title: { fr: 'Offres Exclusives', en: 'Exclusive Offers' },
    description: {
      fr: 'Découvrez nos promotions et événements spéciaux pour un séjour inoubliable au Carlton Madagascar',
      en: 'Discover our promotions and special events for an unforgettable stay at Carlton Madagascar'
    },
    image: '/uploads/Offre.png'
  },
  offerFeaturesTitle: { fr: 'Ce qui est inclus :', en: 'What\'s included :' },
  offers: [
    {
      id: 1,
      title: { fr: 'Menu d\'affaires à 64 000 Ar', en: 'Business Menu at 64,000 Ar' },
      subtitle: { fr: 'Déjeuner d\'affaires', en: 'Business Lunch' },
      description: {
        fr: 'Un menu raffiné à 2 ou 3 services au choix, conçu pour les professionnels en déplacement. Profitez d\'un cadre élégant et discret pour vos rendez-vous d\'affaires, avec un service attentionné qui allie efficacité et raffinement culinaire malgache-français.',
        en: 'A refined 2 or 3-course menu to choose from, designed for professionals on the move. Enjoy an elegant and discreet setting for your business meetings, with attentive service that combines efficiency and Malagasy-French culinary refinement.'
      },
      duration: { fr: 'Du lundi au vendredi de 12h à 14h', en: 'Monday to Friday from 12pm to 2pm' },
      category: { fr: 'Déjeuner d\'affaires', en: 'Business Lunch' },
      features: [
        { fr: 'Menu à 2 ou 3 services au choix', en: '2 or 3-course menu to choose from' },
        { fr: 'Prix : 64 000 Ariary', en: 'Price: 64,000 Ariary' },
        { fr: 'Boissons non alcoolisées incluses', en: 'Non-alcoholic beverages included' }
      ],
      validUntil: { fr: '', en: '' },
      highlight: null,
      image: '/uploads/Offre.png',
      hidden: false
    },
    {
      id: 2,
      title: { fr: 'Happy Hour au Bistrot', en: 'Happy Hour at the Bistro' },
      subtitle: { fr: 'Apéritif convivial', en: 'Convivial Aperitif' },
      description: {
        fr: 'Profitez d\'une sélection de cocktails et tapas à prix doux dans l\'ambiance chaleureuse du Bistrot du Carlton. De saveurs locales audacieuses, variées et savoureuses, à partager—ou pas. Parfait pour décompresser en fin de journée, seul ou entre amis, après une longue journée. Un moment simple, indulgent et bien mérité de plaisir.',
        en: 'Enjoy a selection of cocktails and tapas at soft prices in the warm atmosphere of the Carlton\'s Bistro. From bold, varied and tasty local flavors, to share—or not. Perfect for unwinding at the end of the day, whether alone or with friends, after a long day. A simple, indulgent, and well-deserved moment of pleasure.'
      },
      duration: {
        fr: 'Du lundi au vendredi à partir de 17h à 19h',
        en: 'Monday to Friday from 5pm to 7pm'
      },
      category: { fr: 'Apéritif', en: 'Aperitif' },
      features: [
        { fr: 'Prix : 28 000 Ariary', en: 'Price: 28,000 Ariary' }
      ],
      validUntil: { fr: '', en: '' },
      highlight: null,
      image: '/uploads/Offre.png',
      hidden: false
    },
    {
      id: 3,
      title: { fr: 'Yoga', en: 'Yoga' },
      subtitle: { fr: 'Tous les samedis à 8h', en: 'Every Saturday at 8am' },
      description: {
        fr: 'Commencez votre week-end en douceur avec une séance de yoga d’une heure, un rituel parfait pour relâcher la pression du quotidien et retrouver l’équilibre. Un petit-déjeuner est offert à la fin de séance pour prolonger cette pause de bien-être.',
        en: 'Start your weekend gently with a one-hour yoga session, a perfect ritual to release daily stress and regain balance. A breakfast is offered at the end of the session to extend this wellness break.'
      },
      duration: { fr: 'Tous les samedis à 8h', en: 'Every Saturday at 8am' },
      category: { fr: 'Bien-être', en: 'Wellness' },
      features: [
        { fr: '50 000 Ar avec petit-déjeuner', en: '50,000 Ar with breakfast' },
        { fr: 'Séance de yoga d’une heure', en: 'One-hour yoga session' }
      ],
      validUntil: { fr: '', en: '' },
      highlight: null,
      image: '/uploads/Offre.png',
      hidden: false
    }
  ],
  seasonalSection: {
    title: { fr: 'Rendez-vous Festifs', en: 'Festive Appointments' },
    description: { fr: '', en: '' },
    show: true
  },
  seasonalOffers: [
    {
      title: { fr: 'Soirée Jazz Enchantée', en: 'Enchanted Jazz Evening' },
      period: { fr: 'Chaque vendredi soir', en: 'Every Friday evening' },
      description: {
        fr: 'Laissez-vous emporter par les mélodies envoûtantes du jazz live dans l\'atmosphère feutrée du Bistrot du Carlton. Accompagné de cocktails signature et d\'assiettes raffinées, c\'est l\'occasion idéale pour une soirée sophistiquée entre collègues ou amoureux de la musique.',
        en: 'Let yourself be carried away by the enchanting melodies of live jazz in the intimate atmosphere of the Carlton\'s Bistrot. Paired with signature cocktails and refined plates, it\'s the perfect opportunity for a sophisticated evening with colleagues or music lovers.'
      },
      image: '/uploads/Env.png',
      hidden: false
    },
    {
      title: { fr: 'Brunch Tropical Dominical', en: 'Tropical Sunday Brunch' },
      period: { fr: 'Tous les dimanches de 11h à 15h', en: 'Every Sunday from 11am to 3pm' },
      description: {
        fr: 'Un festin dominical aux saveurs exotiques de Madagascar fusionnées avec la finesse française. Buffets à volonté avec fruits frais, fruits de mer, pâtisseries artisanales et animations musicales pour une pause gourmande en famille ou entre amis.',
        en: 'A Sunday feast blending Madagascar\'s exotic flavors with French finesse. All-you-can-eat buffets featuring fresh fruits, seafood, artisanal pastries, and live music for a indulgent family or friends gathering.'
      },
      image: '/uploads/Env.png',
      hidden: false
    },
    {
      title: { fr: 'Nuit des Étoiles et Vins', en: 'Stars and Wines Night' },
      period: { fr: 'Premier samedi du mois', en: 'First Saturday of the month' },
      description: {
        fr: 'Sous un ciel étoilé, découvrez une sélection exclusive de vins malgaches et internationaux, harmonisés avec des accords mets d\'exception. Dégustations guidées par nos sommeliers, dans le cadre enchanteur des jardins du Carlton.',
        en: 'Under a starry sky, discover an exclusive selection of Malagasy and international wines, paired with exceptional food matches. Guided tastings by our sommeliers, in the enchanting setting of the Carlton\'s gardens.'
      },
      image: '/uploads/Env.png',
      hidden: false
    }
  ],
  cta: {
    title: { fr: 'Et si vous preniez du temps pour vous ?', en: 'What if you took some time for yourself?' },
    description: { fr: 'Laissez-vous tenter par un moment au Carlton Madagascar', en: 'Let yourself be tempted by a moment at Carlton Madagascar' },
    buttonTexts: {
      primary: { fr: 'Réserver au +261 20 22 260 60', en: 'Book at +261 20 22 260 60' },
      secondary: { fr: '', en: '' }
    }
  }
};

// src/pages/Offres.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, Clock, Sparkles, Users, Gift, Plus, Trash2, Eye, EyeOff, ForkKnife, Martini, HeartPulse, Music, Coffee, Wine, X, Phone, Edit3 } from 'lucide-react';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
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
const splitOffresData = (mixedData: typeof offresPageData) => {
  const mixedDataWithExtras = {
    ...mixedData,
    seasonalSection: mixedData.seasonalSection || {
      title: { fr: "Rendez-vous Festifs", en: "Festive Appointments" },
      description: {
        fr: "",
        en: ""
      },
      show: true,
    },
    seasonalOffers: mixedData.seasonalOffers || [],
  };

  const dataFr = {
    seasonalSection: {
      title: mixedDataWithExtras.seasonalSection.title.fr,
      description: mixedDataWithExtras.seasonalSection.description.fr,
      show: mixedDataWithExtras.seasonalSection.show,
    },
    hero: {
      title: mixedDataWithExtras.hero.title.fr,
      description: mixedDataWithExtras.hero.description.fr,
      image: mixedDataWithExtras.hero.image || '/uploads/Offre.png',
    },
    offerFeaturesTitle: mixedDataWithExtras.offerFeaturesTitle.fr,
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
      image: offer.image || '/uploads/Offre.png',
      hidden: offer.hidden || false,
    })),
    seasonalOffers: mixedDataWithExtras.seasonalOffers.map((so) => ({
      title: so.title.fr,
      period: so.period.fr,
      description: so.description.fr,
      image: so.image || '/uploads/Env.png',
      hidden: so.hidden || false,
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
      show: mixedDataWithExtras.seasonalSection.show,
    },
    hero: {
      title: mixedDataWithExtras.hero.title.en,
      description: mixedDataWithExtras.hero.description.en,
      image: mixedDataWithExtras.hero.image || '/uploads/Offre.png',
    },
    offerFeaturesTitle: mixedDataWithExtras.offerFeaturesTitle.en,
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
      image: offer.image || '/uploads/Offre.png',
      hidden: offer.hidden || false,
    })),
    seasonalOffers: mixedDataWithExtras.seasonalOffers.map((so) => ({
      title: so.title.en,
      period: so.period.en,
      description: so.description.en,
      image: so.image || '/uploads/Env.png',
      hidden: so.hidden || false,
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
const reconstructMixed = (dataFr: any, dataEn: any | null) => {
  if (!dataFr || typeof dataFr !== 'object') {
    console.warn('Invalid dataFr structure, falling back to default');
    return offresPageData;
  }
  const enFallback = dataEn || dataFr;
  const defaultSeasonal = {
    title: { fr: "Rendez-vous Festifs", en: "Festive Appointments" },
    description: {
      fr: "",
      en: ""
    },
    show: true,
  };
  return {
    seasonalSection: dataFr.seasonalSection
      ? {
        title: { fr: dataFr.seasonalSection.title, en: enFallback.seasonalSection?.title || defaultSeasonal.title.en },
        description: { fr: dataFr.seasonalSection.description, en: enFallback.seasonalSection?.description || defaultSeasonal.description.en },
        show: dataFr.seasonalSection.show !== undefined ? dataFr.seasonalSection.show : true,
      }
      : defaultSeasonal,
    hero: {
      title: { fr: dataFr.hero.title, en: enFallback.hero.title },
      description: { fr: dataFr.hero.description, en: enFallback.hero.description },
      image: dataFr.hero.image || '/uploads/Offre.png',
    },
    offerFeaturesTitle: {
      fr: dataFr.offerFeaturesTitle,
      en: enFallback.offerFeaturesTitle
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
        image: offerFr.image || '/uploads/Offre.png',
        hidden: offerFr.hidden !== undefined ? offerFr.hidden : (offerEn.hidden || false),
      };
    }),
    seasonalOffers: dataFr.seasonalOffers.map((soFr: any, i: number) => {
      const soEn = enFallback.seasonalOffers[i] || soFr;
      return {
        title: { fr: soFr.title, en: soEn.title },
        period: { fr: soFr.period, en: soEn.period },
        description: { fr: soFr.description, en: soEn.description },
        image: soFr.image || '/uploads/Env.png',
        hidden: soFr.hidden !== undefined ? soFr.hidden : (soEn.hidden || false),
      };
    }),
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

// Image Modal Component
const ImageModal = ({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) => {
  if (!imageUrl) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={handleOverlayClick}>
      <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 text-white hover:text-gray-300 text-2xl z-10 rounded-full bg-black/50 w-12 h-12 flex items-center justify-center"
        >
          <X className="w-6 h-6" />
        </button>
        <img
          src={imageUrl}
          alt="Enlarged view"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

const Offres = () => {
  const { currentLang } = useLanguage();
  const langKey = currentLang.code.toLowerCase();
  const [data, setData] = useState(() => reconstructMixed(splitOffresData(offresPageData).dataFr, splitOffresData(offresPageData).dataEn));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forceShow, setForceShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isAdmin = !!localStorage.getItem('userToken');

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
          setData(() => reconstructMixed(splitOffresData(offresPageData).dataFr, splitOffresData(offresPageData).dataEn));
        }
      } catch (err) {
        console.error('Error fetching offres data:', err);
        setError('Failed to load offres data');
        setData(() => reconstructMixed(splitOffresData(offresPageData).dataFr, splitOffresData(offresPageData).dataEn));
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

  const updateHeroImage = async (newUrl: string) => {
    const updatedData = {
      ...data,
      hero: {
        ...data.hero,
        image: newUrl,
      },
    };
    setData(updatedData);
    await updateOffresSection(updatedData);
  };

  const updateOfferFeaturesTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      offerFeaturesTitle: { fr: newFr, en: newEn },
    };
    setData(updatedData);
    await updateOffresSection(updatedData);
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

  const addOfferFeature = async (offerIndex: number) => {
    const updatedData = {
      ...data,
      offers: data.offers.map((offer, i) =>
        i === offerIndex
          ? {
            ...offer,
            features: [...offer.features, { fr: "Exemple d'offre", en: "Example offer" }],
          }
          : offer
      ),
    };
    setData(updatedData);
    await updateOffresSection(updatedData);
  };

  const removeOfferFeature = async (offerIndex: number, featureIndex: number) => {
    const updatedData = {
      ...data,
      offers: data.offers.map((offer, i) =>
        i === offerIndex
          ? {
            ...offer,
            features: offer.features.filter((_, j) => j !== featureIndex),
          }
          : offer
      ),
    };
    setData(updatedData);
    await updateOffresSection(updatedData);
  };

  const toggleOfferHidden = async (index: number) => {
    const updatedData = {
      ...data,
      offers: data.offers.map((offer, i) =>
        i === index ? { ...offer, hidden: !offer.hidden } : offer
      ),
    };
    setData(updatedData);
    await updateOffresSection(updatedData);
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

  const toggleSeasonalHidden = async (index: number) => {
    const updatedData = {
      ...data,
      seasonalOffers: data.seasonalOffers.map((so, i) =>
        i === index ? { ...so, hidden: !so.hidden } : so
      ),
    };
    setData(updatedData);
    await updateOffresSection(updatedData);
  };

  const updateSeasonalImage = (index: number) => {
    return async (newUrl: string) => {
      const updatedData = {
        ...data,
        seasonalOffers: data.seasonalOffers.map((so, i) => (i === index ? { ...so, image: newUrl } : so)),
      };
      setData(updatedData);
      await updateOffresSection(updatedData);
    };
  };

  const toggleSeasonalVisibility = async () => {
    const newShow = !data.seasonalSection.show;
    const updatedData = {
      ...data,
      seasonalSection: {
        ...data.seasonalSection,
        show: newShow,
      },
    };
    setData(updatedData);
    if (!newShow) setForceShow(false);
    await updateOffresSection(updatedData);
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

  const addOffer = async () => {
    let newOffer;
    if (data.offers.length > 0) {
      const maxId = Math.max(...data.offers.map((o: any) => o.id));
      newOffer = {
        ...data.offers[0],
        id: maxId + 1,
        title: { fr: "Nouvelle Offre", en: "New Offer" },
        hidden: false,
      };
    } else {
      newOffer = {
        id: 1,
        title: { fr: "Nouvelle Offre", en: "New Offer" },
        subtitle: { fr: "Pour les gourmands", en: "For foodies" },
        description: { fr: "Description de l'offre.", en: "Offer description." },
        duration: { fr: "Du lundi au vendredi", en: "Monday to Friday" },
        category: { fr: "Gastronomie", en: "Gastronomy" },
        features: [
          { fr: "Caractéristique 1 à 64 000 Ar", en: "Feature 1 at 64,000 Ar" },
          { fr: "Caractéristique 2", en: "Feature 2" },
        ],
        validUntil: { fr: "", en: "" },
        highlight: null,
        image: '/uploads/Offre.png',
        hidden: false,
      };
    }
    const updatedData = {
      ...data,
      offers: [...data.offers, newOffer],
    };
    setData(updatedData);
    await updateOffresSection(updatedData);
  };

  const removeOffer = async (id: number) => {
    const updatedData = {
      ...data,
      offers: data.offers.filter((offer) => offer.id !== id),
    };
    setData(updatedData);
    await updateOffresSection(updatedData);
  };

  const addSeasonal = async () => {
    let newSeasonal;
    if (data.seasonalOffers.length > 0) {
      newSeasonal = {
        ...data.seasonalOffers[0],
        title: { fr: "Nouvel Événement", en: "New Event" },
        hidden: false,
      };
    } else {
      newSeasonal = {
        title: { fr: "Nouvel Événement", en: "New Event" },
        period: { fr: "Tous les ...", en: "Every ..." },
        description: { fr: "Description par défaut.", en: "Default description." },
        image: '/uploads/Env.png',
        hidden: false,
      };
    }
    const updatedData = {
      ...data,
      seasonalOffers: [...data.seasonalOffers, newSeasonal],
    };
    setData(updatedData);
    await updateOffresSection(updatedData);
  };

  const removeSeasonal = async (index: number) => {
    const updatedData = {
      ...data,
      seasonalOffers: data.seasonalOffers.filter((_, i) => i !== index),
    };
    setData(updatedData);
    await updateOffresSection(updatedData);
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      'Déjeuner d\'affaires': ForkKnife,
      'Business Lunch': ForkKnife,
      'Apéritif': Martini,
      'Aperitif': Martini,
      'Bien-être': HeartPulse,
      'Wellness': HeartPulse,
    };
    return icons[category] || Star;
  };

  const getSeasonalIcon = (title: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      'Soirée Jazz': Music,
      'Jazz Evening': Music,
      'Brunch Dominical': Coffee,
      'Sunday Brunch': Coffee,
      'Soirée Dégustation': Wine,
      'Tasting Evening': Wine,
    };
    return icons[title] || Sparkles;
  };

  const addOfferText = {
    fr: 'Ajouter une nouvelle offre',
    en: 'Add a new offer'
  };

  const addSeasonalText = {
    fr: 'Ajouter un nouvel événement',
    en: 'Add a new event'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <ParallaxSection
          backgroundImage="/uploads/Offre.png"
          parallaxSpeed={0.3}
          minHeight="80vh"
          overlay={true}
          overlayOpacity={0.5}
          className="flex items-center pt-20"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white animate-pulse">
            <div className="h-20 w-full bg-muted/20 mb-8" />
            <div className="h-8 w-96 bg-muted/20 mx-auto mb-8" />
            <div className="h-12 w-80 bg-muted/20 mx-auto mb-12" />
          </div>
        </ParallaxSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {[1,2,3].map((i) => (
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
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-muted" />
                      {[1,2,3].map((j) => <div key={j} className="h-3 w-full bg-muted" />)}
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
        <section className="py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {[1,2,3].map((i) => (
                <div key={i} className="flex flex-col lg:flex animate-pulse">
                  <div className="lg:w-1/2">
                    <div className="w-full h-80 lg:h-full bg-muted rounded-lg" />
                  </div>
                  <div className="lg:w-1/2 p-8 space-y-6">
                    <div className="h-4 w-32 bg-muted mb-4" />
                    <div className="h-6 w-64 bg-muted mb-3" />
                    <div className="h-20 w-full bg-muted mb-6" />
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
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
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

  const { hero, offers, seasonalOffers, seasonalSection, cta, offerFeaturesTitle } = data;
  const ctaButtons = cta.buttonTexts;

  const hiddenSectionTexts = {
    title: { fr: 'Section masquée', en: 'Section hidden' },
    description: {
      fr: 'Cette section est cachée pour les visiteurs. Cliquez pour l\'afficher temporairement et éditer.',
      en: 'This section is hidden from visitors. Click to temporarily show and edit.'
    },
    button: { fr: 'Afficher pour édition', en: 'Show for editing' }
  }

  const addOfferCard = (
    <Card className="border-2 border-dashed border-muted-foreground hover:border-primary transition-colors flex flex-col">
      <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Button
          variant="outline"
          size="lg"
          onClick={addOffer}
          className="mb-4 rounded-full w-16 h-16 p-0"
        >
          <Plus className="w-6 h-6" />
        </Button>
        <p className="text-muted-foreground">
          {getText(addOfferText)}
        </p>
      </CardContent>
    </Card>
  );

  const addSeasonalCard = (
    <Card className="border-2 border-dashed border-muted-foreground hover:border-primary transition-colors flex flex-col">
      <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Button
          variant="outline"
          size="lg"
          onClick={addSeasonal}
          className="mb-4 rounded-full w-16 h-16 p-0"
        >
          <Plus className="w-6 h-6" />
        </Button>
        <p className="text-muted-foreground">
          {getText(addSeasonalText)}
        </p>
      </CardContent>
    </Card>
  );

  const isFr = currentLang.code === 'fr';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Parallax */}
      <div className="relative">
        <ImageTooltip
          imageUrl={hero.image}
          onSave={updateHeroImage}
        >
          <ParallaxSection
            backgroundImage={hero.image}
            parallaxSpeed={0.3}
            minHeight="80vh"
            overlay={true}
            overlayOpacity={0.5}
            className="flex items-center pt-20"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              <Tooltip
                frLabel={hero.title.fr}
                enLabel={hero.title.en}
                onSave={updateHeroField('title')}
              >
                <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 drop-shadow-lg">
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
          </ParallaxSection>
        </ImageTooltip>
        {isAdmin && (
          <div className="absolute top-4 left-4 z-50">
            <ImageTooltip
              imageUrl={hero.image}
              onSave={updateHeroImage}
            >
              <Button
                variant="ghost"
                size="sm"
                className="bg-background/80 backdrop-blur-sm text-foreground border border-border/50 hover:bg-background"
              >
                <Edit3 className="w-4 h-4 mr-1" />
                {isFr ? 'Éditer fond' : 'Edit bg'}
              </Button>
            </ImageTooltip>
          </div>
        )}
      </div>

      {/* Main Offers Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {offers.map((offer, index) => {
              if (!isAdmin && offer.hidden) return null;
              const direction = index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse';
              const CategoryIcon = getCategoryIcon(getText(offer.category));
              return (
                <Card 
                  key={offer.id} 
                  className={`relative overflow-hidden hover-elevate transition-all duration-300 ${direction} flex flex-col lg:flex ${offer.hidden ? 'opacity-50' : ''}`}
                  data-testid={`card-offer-${offer.id}`}
                >
                  {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleOfferHidden(index)}
                        title={offer.hidden ? (isFr ? 'Afficher' : 'Show') : (isFr ? 'Masquer' : 'Hide')}
                      >
                        {offer.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOffer(offer.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <div className="lg:w-1/2 relative">
                    <ImageTooltip
                      imageUrl={offer.image}
                      onSave={updateOfferImage(index)}
                    >
                      <div 
                        onClick={() => offer.image && setSelectedImage(offer.image)}
                        className={`w-full h-[300px] lg:h-full object-cover cursor-pointer ${!offer.image ? 'flex items-center justify-center bg-gradient-to-r from-primary/10 to-accent/10' : ''}`}
                      >
                        {offer.image ? (
                          <img 
                            src={offer.image} 
                            alt={getText(offer.title)}
                            className="w-full h-full object-cover transition-transform duration-300"
                            data-testid={`image-offer-${offer.id}`}
                          />
                        ) : (
                          <div className="text-center p-4">
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Gift className="w-8 h-8 text-primary" />
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">
                              {isFr ? 'Photo de l\'offre' : 'Offer photo'}
                            </p>
                          </div>
                        )}
                      </div>
                    </ImageTooltip>
                  </div>
                  
                  <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                    <div>
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <Tooltip
                            frLabel={offer.category.fr}
                            enLabel={offer.category.en}
                            onSave={updateOfferField(index, 'category')}
                          >
                            <Badge variant="outline" className="text-xl text-primary border-primary px-4 py-2" data-testid={`badge-category-${offer.id}`}>
                              <CategoryIcon className="w-5 h-5 mr-2" />
                              {getText(offer.category)}
                            </Badge>
                          </Tooltip>
                          {offer.highlight && (
                            <Tooltip
                              frLabel={offer.highlight.fr}
                              enLabel={offer.highlight.en}
                              onSave={updateOfferField(index, 'highlight')}
                            >
                              <Badge className="bg-accent text-accent-foreground text-lg px-3 py-1.5">
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
                          <CardTitle className="text-3xl font-serif text-foreground mb-3" data-testid={`title-offer-${offer.id}`}>
                            {getText(offer.title)}
                          </CardTitle>
                        </Tooltip>
                        <Tooltip
                          frLabel={offer.subtitle.fr}
                          enLabel={offer.subtitle.en}
                          onSave={updateOfferField(index, 'subtitle')}
                        >
                          <p className="text-primary font-luxury italic text-xl" data-testid={`subtitle-offer-${offer.id}`}>
                            {getText(offer.subtitle)}
                          </p>
                        </Tooltip>
                      </CardHeader>
                      
                      <CardContent className="p-0 space-y-6">
                        <Tooltip
                          frLabel={offer.description.fr}
                          enLabel={offer.description.en}
                          onSave={updateOfferField(index, 'description')}
                        >
                          <p className="text-muted-foreground leading-relaxed text-justify" data-testid={`description-offer-${offer.id}`}>
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
                          {offer.validUntil && getText(offer.validUntil) && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <Tooltip
                                frLabel={offer.validUntil.fr}
                                enLabel={offer.validUntil.en}
                                onSave={updateOfferField(index, 'validUntil')}
                              >
                                <span>{getText(offer.validUntil)}</span>
                              </Tooltip>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <Tooltip
                            frLabel={offerFeaturesTitle.fr}
                            enLabel={offerFeaturesTitle.en}
                            onSave={updateOfferFeaturesTitle}
                          >
                            <h4 className="font-semibold text-foreground mb-3">{getText(offerFeaturesTitle)}</h4>
                          </Tooltip>
                          <div className="space-y-2">
                            {offer.features.map((feature, fIndex) => (
                              <div key={fIndex} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`feature-${offer.id}-${fIndex}`}>
                                <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <div className="flex-1">
                                  <Tooltip
                                    frLabel={feature.fr}
                                    enLabel={feature.en}
                                    onSave={updateOfferFeature(index, fIndex)}
                                  >
                                    <span className="text-justify">{getText(feature)}</span>
                                  </Tooltip>
                                </div>
                                {isAdmin && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeOfferFeature(index, fIndex)}
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
                                onClick={() => addOfferFeature(index)}
                                className="mt-2"
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                {isFr ? 'Ajouter une caractéristique' : 'Add feature'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              );
            })}
            {isAdmin && addOfferCard}
          </div>
        </div>
      </section>

      {/* Seasonal Offers Section */}
      {(seasonalSection.show && (seasonalOffers.length > 0 || isAdmin)) || forceShow ? (
        <section className="py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 relative">
              {isAdmin && (
                <div className="absolute right-4 top-0 flex gap-2">
                  {seasonalSection.show ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleSeasonalVisibility}
                      title={isFr ? 'Masquer pour le public' : 'Hide for public'}
                    >
                      <EyeOff className="w-4 h-4" />
                      <span className="sr-only">{isFr ? 'Masquer' : 'Hide'}</span>
                    </Button>
                  ) : forceShow ? (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setForceShow(false)}
                        title={isFr ? 'Masquer l\'aperçu' : 'Hide preview'}
                      >
                        <EyeOff className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                          const updatedData = {
                            ...data,
                            seasonalSection: {
                              ...data.seasonalSection,
                              show: true,
                            },
                          };
                          setData(updatedData);
                          setForceShow(false);
                          await updateOffresSection(updatedData);
                        }}
                        title={isFr ? 'Rendre visible' : 'Make visible'}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : null}
                </div>
              )}
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
            
            <div className="space-y-16">
              {seasonalOffers.map((offer, index) => {
                if (!isAdmin && offer.hidden) return null;
                const direction = index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse';
                const SeasonalIcon = getSeasonalIcon(getText(offer.title));
                return (
                  <Card 
                    key={index} 
                    className={`relative overflow-hidden hover-elevate transition-all duration-300 ${direction} flex flex-col lg:flex ${offer.hidden ? 'opacity-50' : ''}`}
                  >
                    {isAdmin && (
                      <div className="absolute top-2 right-2 z-10 flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSeasonalHidden(index)}
                          title={offer.hidden ? (isFr ? 'Afficher' : 'Show') : (isFr ? 'Masquer' : 'Hide')}
                        >
                          {offer.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSeasonal(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    <div className="lg:w-1/2 relative">
                      <ImageTooltip
                        imageUrl={offer.image}
                        onSave={updateSeasonalImage(index)}
                      >
                        <div 
                          onClick={() => offer.image && setSelectedImage(offer.image)}
                          className={`w-full h-[300px] lg:h-full object-cover cursor-pointer ${!offer.image ? 'flex items-center justify-center bg-gradient-to-r from-primary/10 to-accent/10' : ''}`}
                        >
                          {offer.image ? (
                            <img 
                              src={offer.image} 
                              alt={getText(offer.title)}
                              className="w-full h-full object-cover transition-transform duration-300"
                            />
                          ) : (
                            <div className="text-center p-4">
                              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Gift className="w-8 h-8 text-primary" />
                              </div>
                              <p className="text-sm text-muted-foreground font-medium">
                                {isFr ? 'Photo de l\'événement' : 'Event photo'}
                              </p>
                            </div>
                          )}
                        </div>
                      </ImageTooltip>
                    </div>
                    
                    <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                      <div>
                        <CardHeader className="p-0 mb-6">
                          <div className="flex items-center justify-between mb-4">
                          </div>
                          <Tooltip
                            frLabel={offer.title.fr}
                            enLabel={offer.title.en}
                            onSave={updateSeasonalField(index, 'title')}
                          >
                            <CardTitle className="text-3xl font-serif text-foreground mb-3">
                              {getText(offer.title)}
                            </CardTitle>
                          </Tooltip>
                          <Tooltip
                            frLabel={offer.period.fr}
                            enLabel={offer.period.en}
                            onSave={updateSeasonalField(index, 'period')}
                          >
                            <p className="text-primary font-luxury italic text-xl">
                              {getText(offer.period)}
                            </p>
                          </Tooltip>
                        </CardHeader>
                        
                        <CardContent className="p-0 space-y-6">
                          <Tooltip
                            frLabel={offer.description.fr}
                            enLabel={offer.description.en}
                            onSave={updateSeasonalField(index, 'description')}
                          >
                            <p className="text-muted-foreground leading-relaxed text-justify">
                              {getText(offer.description)}
                            </p>
                          </Tooltip>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                );
              })}
              {isAdmin && addSeasonalCard}
            </div>
          </div>
        </section>
      ) : isAdmin ? (
        <section className="py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <EyeOff className="w-8 h-8 mx-auto text-muted-foreground mb-4" />
                  <CardTitle className="text-2xl">{getText(hiddenSectionTexts.title)}</CardTitle>
                  <p className="text-muted-foreground">{getText(hiddenSectionTexts.description)}</p>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setForceShow(true)} className="w-full">
                    {getText(hiddenSectionTexts.button)}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      ) : null}

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
            <Button size="lg" variant="default" data-testid="button-reserve">
              <Phone className="w-4 h-4 mr-2" />
              <Tooltip
                frLabel={ctaButtons.primary.fr}
                enLabel={ctaButtons.primary.en}
                onSave={updateCtaButton('primary')}
              >
                <span>{getText(ctaButtons.primary)}</span>
              </Tooltip>
            </Button>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      <Footer />
    </div>
  );
};

export default Offres;