// src/components/Chambres.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  MapPin,
  Users,
  Wifi,
  Car,
  Coffee,
  Tv,
  Wind,
  Waves,  // For pool
  Dumbbell,
  Activity,  // Alternative for tennis court (sports activity)
  Plane,
  WashingMachine,
  Briefcase,
  Phone,       // For telephone
  Lock,        // For safe
  EyeOff,
  Trash2, // For delete
  Eye,
  Plus,
  // New imports for amenities icons
  Wine,
  CupSoda,
  Droplet,
  Shirt,
  ShowerHead,
  Square,
  Footprints,
  Gift
} from 'lucide-react';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { chambresData } from '@/data/chambresData';
import { useLanguage } from '@/components/context/LanguageContext';
import hotelRoom from '@assets/generated_images/Luxury_suite_interior_386342fd.png';
import suiteImage from '@assets/generated_images/Presidential_suite_bedroom_interior_7adece21.png';

const SECTION_KEY = 'chambres';

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Helper to split chambresData into dataFr and dataEn structures
const splitChambresData = (mixedData: typeof chambresData) => {
  const dataFr = {
    heroTitle: mixedData.heroTitle.fr,
    heroSubtitle: mixedData.heroSubtitle.fr,
    heroImage: mixedData.heroImage,
    rooms: mixedData.rooms.map((room) => ({
      id: room.id,
      name: room.name.fr,
      subtitle: room.subtitle.fr,
      description: room.description.fr,
      size: room.size,
      guests: room.guests.fr,
      features: room.features.map((feature) => feature.fr),
      amenities: room.amenities.fr,
      image: room.image,
      hidden: room.hidden || false,
    })),
    stats: mixedData.stats,
    statsLabels: {
      total: mixedData.statsLabels.total.fr,
      categories: mixedData.statsLabels.categories.fr,
      max: mixedData.statsLabels.max.fr,
    },
    labels: {
      features: mixedData.labels.features.fr,
      amenities: mixedData.labels.amenities.fr,
      includedServices: mixedData.labels.includedServices.fr,
    },
    servicesTitle: mixedData.servicesTitle.fr,
    servicesDescription: mixedData.servicesDescription.fr,
    services: mixedData.services.map((service) => ({
      icon: service.icon,
      title: service.title.fr,
      desc: service.desc.fr,
      hidden: service.hidden || false,
    })),
    buttonText: mixedData.buttonText.fr,
    bookButton: mixedData.bookButton.fr,
    includedServices: mixedData.includedServices.fr,
    cta: {
      title: mixedData.cta.title.fr,
      text: mixedData.cta.text.fr,
      button: mixedData.cta.button.fr,
    },
  };

  const dataEn = {
    heroTitle: mixedData.heroTitle.en,
    heroSubtitle: mixedData.heroSubtitle.en,
    heroImage: mixedData.heroImage,
    rooms: mixedData.rooms.map((room) => ({
      id: room.id,
      name: room.name.en,
      subtitle: room.subtitle.en,
      description: room.description.en,
      size: room.size,
      guests: room.guests.en,
      features: room.features.map((feature) => feature.en),
      amenities: room.amenities.en,
      image: room.image,
      hidden: room.hidden || false,
    })),
    stats: mixedData.stats,
    statsLabels: {
      total: mixedData.statsLabels.total.en,
      categories: mixedData.statsLabels.categories.en,
      max: mixedData.statsLabels.max.en,
    },
    labels: {
      features: mixedData.labels.features.en,
      amenities: mixedData.labels.amenities.en,
      includedServices: mixedData.labels.includedServices.en,
    },
    servicesTitle: mixedData.servicesTitle.en,
    servicesDescription: mixedData.servicesDescription.en,
    services: mixedData.services.map((service) => ({
      icon: service.icon,
      title: service.title.en,
      desc: service.desc.en,
      hidden: service.hidden || false,
    })),
    buttonText: mixedData.buttonText.en,
    bookButton: mixedData.bookButton.en,
    includedServices: mixedData.includedServices.en,
    cta: {
      title: mixedData.cta.title.en,
      text: mixedData.cta.text.en,
      button: mixedData.cta.button.en,
    },
  };

  return { dataFr, dataEn };
};

// Reconstruct mixed data from dataFr and dataEn
const reconstructMixed = (dataFr: any, dataEn: any | null) => {
  if (!dataFr || typeof dataFr !== 'object') {
    console.warn('Invalid dataFr structure, falling back to default');
    return chambresData;
  }
  const enFallback = dataEn || dataFr;
  return {
    heroTitle: { fr: dataFr.heroTitle, en: enFallback.heroTitle || dataFr.heroTitle },
    heroSubtitle: { fr: dataFr.heroSubtitle, en: enFallback.heroSubtitle || dataFr.heroSubtitle },
    heroImage: dataFr.heroImage,
    rooms: dataFr.rooms.map((roomFr: any, i: number) => {
      const roomEn = enFallback.rooms[i] || roomFr;
      return {
        id: roomFr.id,
        name: { fr: roomFr.name, en: roomEn.name || roomFr.name },
        subtitle: { fr: roomFr.subtitle, en: roomEn.subtitle || roomFr.subtitle },
        description: { fr: roomFr.description, en: roomEn.description || roomFr.description },
        size: roomFr.size,
        guests: { fr: roomFr.guests, en: roomEn.guests || roomFr.guests },
        features: roomFr.features.map((fFr: string, j: number) => ({
          fr: fFr,
          en: roomEn.features[j] || fFr,
        })),
        amenities: {
          fr: roomFr.amenities,
          en: roomEn.amenities || roomFr.amenities,
        },
        image: roomFr.image,
        hidden: roomFr.hidden !== undefined ? roomFr.hidden : (roomEn.hidden || false),
      };
    }),
    stats: dataFr.stats,
    statsLabels: {
      total: { fr: dataFr.statsLabels.total, en: enFallback.statsLabels.total || dataFr.statsLabels.total },
      categories: { fr: dataFr.statsLabels.categories, en: enFallback.statsLabels.categories || dataFr.statsLabels.categories },
      max: { fr: dataFr.statsLabels.max, en: enFallback.statsLabels.max || dataFr.statsLabels.max },
    },
    labels: {
      features: { fr: dataFr.labels.features, en: enFallback.labels.features || dataFr.labels.features },
      amenities: { fr: dataFr.labels.amenities, en: enFallback.labels.amenities || dataFr.labels.amenities },
      includedServices: { fr: dataFr.labels.includedServices, en: enFallback.labels.includedServices || dataFr.labels.includedServices },
    },
    servicesTitle: { fr: dataFr.servicesTitle, en: enFallback.servicesTitle || dataFr.servicesTitle },
    servicesDescription: { fr: dataFr.servicesDescription, en: enFallback.servicesDescription || dataFr.servicesDescription },
    services: dataFr.services.map((serviceFr: any, i: number) => ({
      icon: serviceFr.icon,
      title: { fr: serviceFr.title, en: enFallback.services[i]?.title || serviceFr.title },
      desc: { fr: serviceFr.desc, en: enFallback.services[i]?.desc || serviceFr.desc },
      hidden: serviceFr.hidden !== undefined ? serviceFr.hidden : (enFallback.services[i]?.hidden || false),
    })),
    buttonText: { fr: dataFr.buttonText, en: enFallback.buttonText || dataFr.buttonText },
    bookButton: { fr: dataFr.bookButton, en: enFallback.bookButton || dataFr.bookButton },
    includedServices: { fr: dataFr.includedServices, en: enFallback.includedServices || dataFr.includedServices },
    cta: {
      title: { fr: dataFr.cta.title, en: enFallback.cta.title || dataFr.cta.title },
      text: { fr: dataFr.cta.text, en: enFallback.cta.text || dataFr.cta.text },
      button: { fr: dataFr.cta.button, en: enFallback.cta.button || dataFr.cta.button },
    },
  };
};

interface TextFormatterProps {
  text: any;
  className?: string;
}

const TextFormatter: React.FC<TextFormatterProps> = ({ text, className }) => {
  let displayText: string;
  if (typeof text === 'string') {
    displayText = text;
  } else if (typeof text === 'number') {
    displayText = text.toString();
  } else {
    displayText = String(text || '');
  }

  const parts = displayText.split('(-)').filter(part => part.trim().length > 0);
  if (parts.length === 1) {
    return <span className={className}>{formatAmpersand(displayText)}</span>;
  }
  return (
    <div className={`space-y-2 ${className || ''}`}>
      {parts.map((part, i) => (
        <p key={i} className="leading-relaxed">{formatAmpersand(part.trim())}</p>
      ))}
    </div>
  );
};

const Chambres = () => {
  const { currentLang } = useLanguage();
  const lang = currentLang.code.toLowerCase();
  const [data, setData] = useState(() => {
    // Ensure hidden is added to default data if not present
    const defaultData = { ...chambresData };
    defaultData.rooms = defaultData.rooms.map(room => ({ ...room, hidden: room.hidden || false }));
    defaultData.services = defaultData.services.map(service => ({ ...service, hidden: service.hidden || false }));
    return defaultData;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isAdmin = !!localStorage.getItem('userToken');

  // Fetch chambres data from backend
  useEffect(() => {
    const fetchChambresData = async () => {
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
          const { dataFr, dataEn } = splitChambresData(chambresData);
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
            throw new Error('Failed to create chambres data');
          }

          const created = await createResponse.json();
          section = created;
        }

        if (section) {
          const fetchedData = reconstructMixed(section.dataFr, section.dataEn);
          setData(fetchedData);
        } else {
          setData(chambresData);
        }
      } catch (err) {
        console.error('Error fetching chambres data:', err);
        setError('Failed to load chambres data');
        setData(chambresData);
      } finally {
        setLoading(false);
      }
    };

    fetchChambresData();
  }, []);

  const updateChambresSection = async (updatedMixedData: typeof data) => {
    try {
      const headers = getAuthHeaders();
      let currentSectionResponse = await fetch(`/api/globalSections?sectionKey=${SECTION_KEY}`, { headers });
      let currentData: any[] = [];
      if (currentSectionResponse.ok) {
        currentData = await currentSectionResponse.json();
      }
      let currentSection = currentData.find((s: any) => s.sectionKey === SECTION_KEY);

      if (!currentSection) {
        const { dataFr, dataEn } = splitChambresData(chambresData);
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

      const { dataFr: updatedDataFr, dataEn: updatedDataEn } = splitChambresData(updatedMixedData);

      const putResponse = await fetch(`/api/globalSections/${currentSection.id}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataFr: updatedDataFr,
          dataEn: Object.keys(updatedDataEn).length > 0 ? updatedDataEn : null,
        }),
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update chambres section');
      }
    } catch (err) {
      console.error('Error updating chambres section:', err);
    }
  };

  const getText = (textObj: any): string => {
    if (typeof textObj === 'string') return textObj;
    if (typeof textObj === 'number') return textObj.toString();
    const langText = textObj?.[lang];
    if (typeof langText === 'string') return langText;
    const frText = textObj?.fr;
    if (typeof frText === 'string') return frText;
    return '';
  };

  const updateHeroTitle = async (newFr: string, newEn: string) => {
    const updatedData = { ...data, heroTitle: { fr: newFr, en: newEn } };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const updateHeroSubtitle = async (newFr: string, newEn: string) => {
    const updatedData = { ...data, heroSubtitle: { fr: newFr, en: newEn } };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const updateHeroImage = async (newUrl: string) => {
    const updatedData = { ...data, heroImage: newUrl };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const updateStatsLabel = (labelKey: 'total' | 'categories' | 'max') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        statsLabels: {
          ...data.statsLabels,
          [labelKey]: { fr: newFr, en: newEn },
        },
      };
      setData(updatedData);
      await updateChambresSection(updatedData);
    };
  };

  const updateLabel = (labelKey: 'features' | 'amenities' | 'includedServices') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        labels: {
          ...data.labels,
          [labelKey]: { fr: newFr, en: newEn },
        },
      };
      setData(updatedData);
      await updateChambresSection(updatedData);
    };
  };

  const updateServicesTitle = async (newFr: string, newEn: string) => {
    const updatedData = { ...data, servicesTitle: { fr: newFr, en: newEn } };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const updateServicesDescription = async (newFr: string, newEn: string) => {
    const updatedData = { ...data, servicesDescription: { fr: newFr, en: newEn } };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const updateServiceField = (serviceIndex: number, field: 'title' | 'desc') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        services: data.services.map((service, i) =>
          i === serviceIndex
            ? { ...service, [field]: { fr: newFr, en: newEn } }
            : service
        ),
      };
      setData(updatedData);
      await updateChambresSection(updatedData);
    };
  };

  const toggleServiceHidden = async (serviceIndex: number) => {
    const updatedData = {
      ...data,
      services: data.services.map((service, i) =>
        i === serviceIndex ? { ...service, hidden: !service.hidden } : service
      ),
    };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const addService = async () => {
    const newService = {
      icon: 'Coffee',
      title: { fr: 'Nouveau Service', en: 'New Service' },
      desc: { fr: 'Description du nouveau service.', en: 'Description of the new service.' },
      hidden: false,
    };
    const updatedData = {
      ...data,
      services: [...data.services, newService],
    };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const removeService = async (index: number) => {
    const updatedData = {
      ...data,
      services: data.services.filter((_, i) => i !== index),
    };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const updateButtonText = async (newFr: string, newEn: string) => {
    const updatedData = { ...data, buttonText: { fr: newFr, en: newEn } };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const updateBookButton = async (newFr: string, newEn: string) => {
    const updatedData = { ...data, bookButton: { fr: newFr, en: newEn } };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const updateCtaTitle = async (newFr: string, newEn: string) => {
    const updatedData = { ...data, cta: { ...data.cta, title: { fr: newFr, en: newEn } } };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const updateCtaText = async (newFr: string, newEn: string) => {
    const updatedData = { ...data, cta: { ...data.cta, text: { fr: newFr, en: newEn } } };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const updateCtaButton = async (newFr: string, newEn: string) => {
    const updatedData = { ...data, cta: { ...data.cta, button: { fr: newFr, en: newEn } } };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const updateRoomField = (roomIndex: number, field: 'name' | 'subtitle' | 'description' | 'guests') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        rooms: data.rooms.map((room, i) =>
          i === roomIndex
            ? { ...room, [field]: { fr: newFr, en: newEn } }
            : room
        ),
      };
      setData(updatedData);
      await updateChambresSection(updatedData);
    };
  };

  const updateRoomFeature = (roomIndex: number, featureIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        rooms: data.rooms.map((room, i) =>
          i === roomIndex
            ? {
                ...room,
                features: room.features.map((feature, j) =>
                  j === featureIndex ? { fr: newFr, en: newEn } : feature
                ),
              }
            : room
        ),
      };
      setData(updatedData);
      await updateChambresSection(updatedData);
    };
  };

  const addRoomFeature = async (roomIndex: number) => {
    const updatedData = {
      ...data,
      rooms: data.rooms.map((room, i) =>
        i === roomIndex
          ? {
              ...room,
              features: [...room.features, { fr: 'Nouvelle caractéristique', en: 'New feature' }],
            }
          : room
      ),
    };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const removeRoomFeature = async (roomIndex: number, featureIndex: number) => {
    const updatedData = {
      ...data,
      rooms: data.rooms.map((room, i) =>
        i === roomIndex
          ? {
              ...room,
              features: room.features.filter((_, j) => j !== featureIndex),
            }
          : room
      ),
    };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const updateRoomAmenity = (roomIndex: number, amenityIndex: number) => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        rooms: data.rooms.map((room, i) =>
          i === roomIndex
            ? {
                ...room,
                amenities: {
                  fr: room.amenities.fr.map((a, j) => j === amenityIndex ? newFr : a),
                  en: room.amenities.en.map((a, j) => j === amenityIndex ? newEn : a),
                },
              }
            : room
        ),
      };
      setData(updatedData);
      await updateChambresSection(updatedData);
    };
  };

  const addRoomAmenity = async (roomIndex: number) => {
    const updatedData = {
      ...data,
      rooms: data.rooms.map((room, i) =>
        i === roomIndex
          ? {
              ...room,
              amenities: {
                fr: [...room.amenities.fr, 'Nouvelle commodité'],
                en: [...room.amenities.en, 'New amenity'],
              },
            }
          : room
      ),
    };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const removeRoomAmenity = async (roomIndex: number, amenityIndex: number) => {
    const updatedData = {
      ...data,
      rooms: data.rooms.map((room, i) =>
        i === roomIndex
          ? {
              ...room,
              amenities: {
                fr: room.amenities.fr.filter((_, j) => j !== amenityIndex),
                en: room.amenities.en.filter((_, j) => j !== amenityIndex),
              },
            }
          : room
      ),
    };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const updateRoomImage = (roomIndex: number) => {
    return async (newUrl: string) => {
      const updatedData = {
        ...data,
        rooms: data.rooms.map((room, i) => (i === roomIndex ? { ...room, image: newUrl } : room)),
      };
      setData(updatedData);
      await updateChambresSection(updatedData);
    };
  };

  const updateRoomSize = (roomIndex: number) => {
    return async (newSize: string) => {
      const updatedData = {
        ...data,
        rooms: data.rooms.map((room, i) =>
          i === roomIndex ? { ...room, size: newSize } : room
        ),
      };
      setData(updatedData);
      await updateChambresSection(updatedData);
    };
  };

  const updateStatValue = (key: 'totalRooms' | 'categories' | 'maxSize') => {
    return async (newValue: string) => {
      const parsedValue = key === 'maxSize' ? newValue : parseInt(newValue) || 0;
      const updatedData = {
        ...data,
        stats: {
          ...data.stats,
          [key]: parsedValue,
        },
      };
      setData(updatedData);
      await updateChambresSection(updatedData);
    };
  };

  const toggleRoomHidden = async (roomIndex: number) => {
    const updatedData = {
      ...data,
      rooms: data.rooms.map((room, i) =>
        i === roomIndex ? { ...room, hidden: !room.hidden } : room
      ),
    };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const addRoom = async () => {
    let newRoom;
    if (data.rooms.length > 0) {
      const maxId = Math.max(...data.rooms.map((r: any) => r.id));
      newRoom = {
        ...data.rooms[0],
        id: maxId + 1,
        name: { fr: 'Nouvelle Chambre', en: 'New Room' },
        hidden: false,
      };
    } else {
      newRoom = {
        id: 1,
        name: { fr: 'Nouvelle Chambre', en: 'New Room' },
        subtitle: { fr: 'Sous-titre', en: 'Subtitle' },
        description: { fr: 'Description de la chambre.', en: 'Room description.' },
        size: '30 m²',
        guests: { fr: '2 personnes', en: '2 guests' },
        features: [{ fr: 'Caractéristique 1', en: 'Feature 1' }],
        amenities: { fr: ['Wifi'], en: ['Wifi'] },
        image: hotelRoom,
        hidden: false,
      };
    }
    const updatedData = {
      ...data,
      rooms: [...data.rooms, newRoom],
    };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const removeRoom = async (id: number) => {
    const updatedData = {
      ...data,
      rooms: data.rooms.filter((room) => room.id !== id),
    };
    setData(updatedData);
    await updateChambresSection(updatedData);
  };

  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi') || lower.includes('wi-fi')) {
      return <Wifi className="w-4 h-4" />;
    }
    if (lower.includes('climat') || lower.includes('air conditioning')) {
      return <Wind className="w-4 h-4" />;
    }
    if (lower.includes('tv') || lower.includes('télé')) {
      return <Tv className="w-4 h-4" />;
    }
    if (lower.includes('téléphone') || lower.includes('phone')) {
      return <Phone className="w-4 h-4" />;
    }
    if (lower.includes('coffre') || lower.includes('safe')) {
      return <Lock className="w-4 h-4" />;
    }
    if (lower.includes('minibar')) {
      return <Wine className="w-4 h-4" />;
    }
    if (lower.includes('café') || lower.includes('coffee') || lower.includes('expresso')) {
      return <Coffee className="w-4 h-4" />;
    }
    if (lower.includes('thé') || lower.includes('tea')) {
      return <CupSoda className="w-4 h-4" />;
    }
    if (lower.includes('eau') || lower.includes('water') || lower.includes('minérale')) {
      return <Droplet className="w-4 h-4" />;
    }
    if (lower.includes('fer') || lower.includes('iron')) {
      return <Shirt className="w-4 h-4" />;
    }
    if (lower.includes('salle de bain') || lower.includes('bathroom') || lower.includes('salles de bain')) {
      return <ShowerHead className="w-4 h-4" />;
    }
    if (lower.includes('miroir') || lower.includes('mirror')) {
      return <Square className="w-4 h-4" />;
    }
    if (lower.includes('sèche') || lower.includes('hairdryer')) {
      return <Wind className="w-4 h-4" />;
    }
    if (lower.includes('peignoir') || lower.includes('bathrobe') || lower.includes('dressing')) {
      return <Shirt className="w-4 h-4" />;
    }
    if (lower.includes('pantoufles') || lower.includes('slippers')) {
      return <Footprints className="w-4 h-4" />;
    }
    if (lower.includes('courtoisie') || lower.includes('toiletries') || lower.includes('articles')) {
      return <Gift className="w-4 h-4" />;
    }
    // Default fallback
    return <Coffee className="w-4 h-4" />;
  };

  const getIncludedServiceIcon = (service: string) => {
    if (service.includes('Piscine') || service.includes('Pool')) {
      return <Waves className="w-4 h-4" />;  // Waves for pool
    }
    if (service.includes('Fitness') || service.includes('Gym') || service.includes('Salle de sport')) {
      return <Dumbbell className="w-4 h-4" />;
    }
    if (service.includes('Tennis') || service.includes('Court de tennis') || service.includes('Tennis Court')) {
      return <Activity className="w-4 h-4" />;
    }
    if (service.includes('Parking')) {
      return <Car className="w-4 h-4" />;
    }
    return <Wifi className="w-4 h-4" />;
  };

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case 'Coffee': return <Coffee className="w-8 h-8" />;
      case 'Scissors': return <WashingMachine className="w-8 h-8" />;
      case 'Briefcase': return <Briefcase className="w-8 h-8" />;
      case 'Plane': return <Plane className="w-8 h-8" />;
      default: return <Tv className="w-8 h-8" />;
    }
  };

  const isFr = currentLang.code === 'fr';

  const addRoomCard = (
    <Card className="border-2 border-dashed border-muted-foreground hover:border-primary transition-colors flex flex-col">
      <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Button
          variant="outline"
          size="lg"
          onClick={addRoom}
          className="mb-4 rounded-full w-16 h-16 p-0"
        >
          <Plus className="w-6 h-6" />
        </Button>
        <p className="text-muted-foreground">
          {isFr ? 'Ajouter une nouvelle chambre' : 'Add a new room'}
        </p>
      </CardContent>
    </Card>
  );

  const openImagePopup = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Skeleton */}
        <section className="relative h-screen bg-gray-900">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full flex items-center justify-center text-center px-4 text-white">
            <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
              <div className="h-20 w-96 bg-white/10 rounded mx-auto mb-8" />
              <div className="h-8 w-80 bg-white/10 rounded mx-auto mb-8" />
              <div className="h-6 w-96 bg-white/10 rounded mx-auto mb-12" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-2">
                    <div className="h-10 w-20 bg-white/10 rounded mx-auto" />
                    <div className="h-5 w-32 bg-white/10 rounded mx-auto" />
                  </div>
                ))}
              </div>
              <div className="h-12 w-48 bg-white/10 rounded mx-auto" />
            </div>
          </div>
        </section>
        {/* Rooms Skeleton */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex flex-col lg:flex lg:flex-row gap-8 animate-pulse">
                <div className="lg:w-1/2 h-80 lg:h-auto bg-gray-300 rounded" />
                <div className="lg:w-1/2 space-y-4">
                  <div className="flex gap-4">
                    <div className="h-6 w-20 bg-gray-300 rounded" />
                    <div className="h-6 w-24 bg-gray-300 rounded" />
                  </div>
                  <div className="h-8 w-64 bg-gray-300 rounded" />
                  <div className="h-6 w-48 bg-gray-300 rounded" />
                  <div className="h-4 w-full bg-gray-300 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-gray-300 rounded" />
                    <div className="h-4 w-5/6 bg-gray-300 rounded" />
                    <div className="h-4 w-2/3 bg-gray-300 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-1/2 bg-gray-300 rounded" />
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6].map(j => <div key={j} className="h-6 w-20 bg-gray-300 rounded-full" />)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-1/2 bg-gray-300 rounded" />
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4].map(j => <div key={j} className="h-6 w-20 bg-gray-300 rounded-full" />)}
                    </div>
                  </div>
                  <div className="h-10 w-full bg-gray-300 rounded" />
                </div>
              </div>
            ))}
            {isAdmin && (
              <div className="flex justify-center">
                <div className="h-64 w-full max-w-md bg-gray-300 rounded-lg" />
              </div>
            )}
          </div>
        </section>
        {/* Services Skeleton */}
        <section className="py-20 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-4 animate-pulse">
              <div className="h-10 w-64 bg-gray-300 rounded mx-auto" />
              <div className="h-5 w-80 bg-gray-300 rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-4">
                  <div className="h-12 w-12 bg-gray-300 rounded-full mx-auto" />
                  <div className="h-6 w-48 bg-gray-300 rounded mx-auto" />
                  <div className="h-4 w-full bg-gray-300 rounded" />
                </div>
              ))}
            </div>
            {isAdmin && (
              <div className="flex justify-center mt-8">
                <div className="h-12 w-48 bg-gray-300 rounded" />
              </div>
            )}
          </div>
        </section>
        {/* CTA Skeleton */}
        <section className="py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-4 animate-pulse">
            <div className="h-10 w-80 bg-gray-300 rounded mx-auto" />
            <div className="h-6 w-64 bg-gray-300 rounded mx-auto" />
            <div className="h-12 w-48 bg-gray-300 rounded mx-auto" />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.warn(error);
  }

  const getAmenities = (room: any) => room.amenities[lang] || room.amenities.fr;
  const getIncludedServices = () => data.includedServices[lang] || data.includedServices.fr;

  return (
    <div className="min-h-screen bg-background">

      {/* Parallax Hero Section */}
      <ImageTooltip imageUrl={data.heroImage} onSave={updateHeroImage}>
        <ParallaxSection
          backgroundImage={data.heroImage || suiteImage}
          parallaxSpeed={0.3}
          minHeight="100vh"
          overlay={true}
          overlayOpacity={0.5}
          className="flex items-center pt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div>
              <h1 className="text-6xl md:text-7xl font-serif font-bold mb-8 drop-shadow-lg">
                <Tooltip
                  frLabel={data.heroTitle.fr}
                  enLabel={data.heroTitle.en}
                  onSave={updateHeroTitle}
                >
                  <TextFormatter text={getText(data.heroTitle)} />
                </Tooltip>
              </h1>
              <div className="w-32 h-1 bg-primary mx-auto mb-8"></div>
              <div className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed drop-shadow-lg mb-12 text-white">
                <Tooltip
                  frLabel={data.heroSubtitle.fr}
                  enLabel={data.heroSubtitle.en}
                  onSave={updateHeroSubtitle}
                >
                  <TextFormatter text={getText(data.heroSubtitle)} className="drop-shadow-lg" />
                </Tooltip>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    <Tooltip
                      frLabel={data.stats.totalRooms.toString()}
                      enLabel={data.stats.totalRooms.toString()}
                      onSave={updateStatValue('totalRooms')}
                    >
                      <span>{data.stats.totalRooms}</span>
                    </Tooltip>
                  </div>
                  <div className="text-lg">
                    <Tooltip
                      frLabel={data.statsLabels.total.fr}
                      enLabel={data.statsLabels.total.en}
                      onSave={updateStatsLabel('total')}
                    >
                      <TextFormatter text={getText(data.statsLabels.total)} />
                    </Tooltip>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    <Tooltip
                      frLabel={data.stats.categories.toString()}
                      enLabel={data.stats.categories.toString()}
                      onSave={updateStatValue('categories')}
                    >
                      <span>{data.stats.categories}</span>
                    </Tooltip>
                  </div>
                  <div className="text-lg">
                    <Tooltip
                      frLabel={data.statsLabels.categories.fr}
                      enLabel={data.statsLabels.categories.en}
                      onSave={updateStatsLabel('categories')}
                    >
                      <TextFormatter text={getText(data.statsLabels.categories)} />
                    </Tooltip>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    <Tooltip
                      frLabel={data.stats.maxSize}
                      enLabel={data.stats.maxSize}
                      onSave={updateStatValue('maxSize')}
                    >
                      <span>{data.stats.maxSize}</span>
                    </Tooltip>
                  </div>
                  <div className="text-lg">
                    <Tooltip
                      frLabel={data.statsLabels.max.fr}
                      enLabel={data.statsLabels.max.en}
                      onSave={updateStatsLabel('max')}
                    >
                      <TextFormatter text={getText(data.statsLabels.max)} />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <Button size="lg" className="shadow-lg" data-testid="button-discover-rooms">
                <Tooltip
                  frLabel={data.buttonText.fr}
                  enLabel={data.buttonText.en}
                  onSave={updateButtonText}
                >
                  <TextFormatter text={getText(data.buttonText)} />
                </Tooltip>
              </Button>
            </div>
          </div>
        </ParallaxSection>
      </ImageTooltip>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeImagePopup}
        >
          <button 
            className="absolute top-4 right-4 text-white text-2xl z-10"
            onClick={closeImagePopup}
          >
            ×
          </button>
          <img 
            src={selectedImage} 
            alt="Image en grand format" 
            className="max-w-full max-h-full object-contain cursor-zoom-out"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Rooms Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {data.rooms.map((room, index) => {
              if (!isAdmin && room.hidden) return null;
              return (
                <Card
                  key={room.id}
                  className={`relative overflow-hidden hover-elevate transition-all duration-300 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } flex flex-col ${room.hidden ? 'opacity-50' : ''}`}
                  data-testid={`card-room-${room.id}`}
                >
                  {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRoomHidden(index)}
                        title={room.hidden ? (isFr ? 'Afficher' : 'Show') : (isFr ? 'Masquer' : 'Hide')}
                      >
                        {room.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRoom(room.id)}
                      >
                        <Trash2 className="w-4 h-4" /> 
                      </Button>
                    </div>
                  )}
                  <div className="lg:w-1/2 flex">
                    <ImageTooltip imageUrl={room.image} onSave={updateRoomImage(index)}>
                      <div 
                        className="w-full h-80 lg:h-full relative cursor-pointer overflow-hidden"
                        onClick={() => openImagePopup(room.image || hotelRoom)}
                      >
                        <img
                          src={room.image || hotelRoom}
                          alt={getText(room.name)}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                        />
                      </div>
                    </ImageTooltip>
                  </div>

                  {/* Conteneur de contenu */}
                  <div className="lg:w-1/2 p-8 flex flex-col">
                    <div className="flex-1">
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            {room.size && (
                              <Badge variant="outline" className="text-primary border-primary">
                                <MapPin className="w-3 h-3 mr-1" />
                                <Tooltip
                                  frLabel={room.size}
                                  enLabel={room.size}
                                  onSave={() => {}}  // Size is not bilingual, but can add update
                                >
                                  <span>{room.size}</span>
                                </Tooltip>
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-primary border-primary">
                              <Users className="w-3 h-3 mr-1" />
                              <Tooltip
                                frLabel={room.guests.fr}
                                enLabel={room.guests.en}
                                onSave={updateRoomField(index, 'guests')}
                              >
                                <TextFormatter text={getText(room.guests)} />
                              </Tooltip>
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-3xl font-serif text-foreground mb-2">
                          <Tooltip
                            frLabel={room.name.fr}
                            enLabel={room.name.en}
                            onSave={updateRoomField(index, 'name')}
                          >
                            <TextFormatter text={getText(room.name)} />
                          </Tooltip>
                        </CardTitle>
                        {room.subtitle && (
                          <p className="text-primary font-luxury italic text-lg mb-4">
                            <Tooltip
                              frLabel={room.subtitle.fr}
                              enLabel={room.subtitle.en}
                              onSave={updateRoomField(index, 'subtitle')}
                            >
                              <TextFormatter text={getText(room.subtitle)} />
                            </Tooltip>
                          </p>
                        )}
                      </CardHeader>

                      <CardContent className="p-0 space-y-6">
                        <div className="text-muted-foreground leading-relaxed">
                          <Tooltip
                            frLabel={room.description.fr}
                            enLabel={room.description.en}
                            onSave={updateRoomField(index, 'description')}
                          >
                            <TextFormatter text={getText(room.description)} />
                          </Tooltip>
                        </div>

                        {room.features && room.features.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">
                              <Tooltip
                                frLabel={data.labels.features.fr}
                                enLabel={data.labels.features.en}
                                onSave={updateLabel('features')}
                              >
                                <TextFormatter text={getText(data.labels.features)} />
                              </Tooltip>
                            </h4>
                            <div className="space-y-1">
                              {room.features.map((feature, idx) => (
                                <div key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <div className="flex-1">
                                    <Tooltip
                                      frLabel={feature.fr}
                                      enLabel={feature.en}
                                      onSave={updateRoomFeature(index, idx)}
                                    >
                                      <TextFormatter text={getText(feature)} className="block" />
                                    </Tooltip>
                                  </div>
                                  {isAdmin && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeRoomFeature(index, idx)}
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
                                  onClick={() => addRoomFeature(index)}
                                  className="mt-2"
                                >
                                  <Plus className="w-4 h-4 mr-1" />
                                  {isFr ? 'Ajouter une caractéristique' : 'Add a feature'}
                                </Button>
                              )}
                            </div>
                          </div>
                        )}

                        {room.amenities && room.amenities.fr.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">
                              <Tooltip
                                frLabel={data.labels.amenities.fr}
                                enLabel={data.labels.amenities.en}
                                onSave={updateLabel('amenities')}
                              >
                                <TextFormatter text={getText(data.labels.amenities)} />
                              </Tooltip>
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {getAmenities(room).map((amenity, idx) => {
                                const frAmenity = room.amenities.fr[idx];
                                const enAmenity = room.amenities.en ? room.amenities.en[idx] : frAmenity;
                                return (
                                  <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-card rounded-full text-sm relative">
                                    {getAmenityIcon(amenity)}
                                    <Tooltip
                                      frLabel={frAmenity}
                                      enLabel={enAmenity}
                                      onSave={updateRoomAmenity(index, idx)}
                                    >
                                      <TextFormatter text={amenity} className="text-muted-foreground" />
                                    </Tooltip>
                                    {isAdmin && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeRoomAmenity(index, idx)}
                                        className="absolute -top-1 -right-1 h-4 w-4 p-0"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    )}
                                  </div>
                                );
                              })}
                              {isAdmin && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addRoomAmenity(index)}
                                  className="mt-2"
                                >
                                  <Plus className="w-4 h-4 mr-1" />
                                  {isFr ? 'Ajouter une commodité' : 'Add an amenity'}
                                </Button>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Included Services Section */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">
                            <Tooltip
                              frLabel={data.labels.includedServices.fr}
                              enLabel={data.labels.includedServices.en}
                              onSave={updateLabel('includedServices')}
                            >
                              <TextFormatter text={getText(data.labels.includedServices)} />
                            </Tooltip>
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {getIncludedServices().map((service, idx) => (
                              <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm border border-primary/20">
                                {getIncludedServiceIcon(service)}
                                <span className="text-primary font-medium">{service}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </div>

                    <div className="mt-8">
                      <Button
                        className="w-full"
                        data-testid={`button-book-${room.id}`}
                      >
                        <Tooltip
                          frLabel={data.bookButton.fr}
                          enLabel={data.bookButton.en}
                          onSave={updateBookButton}
                        >
                          <TextFormatter text={getText(data.bookButton)} />
                        </Tooltip>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
            {isAdmin && addRoomCard}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              <Tooltip
                frLabel={data.servicesTitle.fr}
                enLabel={data.servicesTitle.en}
                onSave={updateServicesTitle}
              >
                <TextFormatter text={getText(data.servicesTitle)} />
              </Tooltip>
            </h2>
            <div className="text-lg text-muted-foreground">
              <Tooltip
                frLabel={data.servicesDescription.fr}
                enLabel={data.servicesDescription.en}
                onSave={updateServicesDescription}
              >
                <TextFormatter text={getText(data.servicesDescription)} />
              </Tooltip>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.services.map((service, index) => {
              if (!isAdmin && service.hidden) return null;
              return (
                <Card key={index} className={`relative text-center hover-elevate ${service.hidden ? 'opacity-50' : ''}`}>
                  {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleServiceHidden(index)}
                        title={service.hidden ? (isFr ? 'Afficher' : 'Show') : (isFr ? 'Masquer' : 'Hide')}
                      >
                        {service.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeService(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <CardContent className="pt-6">
                    <div className="text-primary mb-4 flex justify-center">
                      {getServiceIcon(service.icon)}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      <Tooltip
                        frLabel={service.title.fr}
                        enLabel={service.title.en}
                        onSave={updateServiceField(index, 'title')}
                      >
                        <TextFormatter text={getText(service.title)} />
                      </Tooltip>
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      <Tooltip
                        frLabel={service.desc.fr}
                        enLabel={service.desc.en}
                        onSave={updateServiceField(index, 'desc')}
                      >
                        <TextFormatter text={getText(service.desc)} />
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {isAdmin && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={addService}
              >
                <Plus className="w-4 h-4 mr-2" />
                {isFr ? 'Ajouter un service' : 'Add a service'}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">
            <Tooltip
              frLabel={data.cta.title.fr}
              enLabel={data.cta.title.en}
              onSave={updateCtaTitle}
            >
              <TextFormatter text={getText(data.cta.title)} />
            </Tooltip>
          </h2>
          <div className="text-xl text-muted-foreground mb-8">
            <Tooltip
              frLabel={data.cta.text.fr}
              enLabel={data.cta.text.en}
              onSave={updateCtaText}
            >
              <TextFormatter text={getText(data.cta.text)} />
            </Tooltip>
          </div>
          <Button size="lg" asChild>
            <a href="/page-de-reservation-synxis" className="text-lg">
              <Tooltip
                frLabel={data.cta.button.fr}
                enLabel={data.cta.button.en}
                onSave={updateCtaButton}
              >
                <TextFormatter text={getText(data.cta.button)} />
              </Tooltip>
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Chambres;