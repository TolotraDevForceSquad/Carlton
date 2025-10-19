// src/pages/ServicesBoutiques.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, MapPin, Star, ShoppingBag, Bell, Car, Plane, Shirt, Coffee, Wifi, Scissors, Briefcase, EyeOff, Trash2, Eye, Plus, Mail, Phone } from 'lucide-react';
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

const isAdmin = !!localStorage.getItem('userToken');

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
      images: mixedData.services.images,
      items: mixedData.services.items.map((item) => ({
        title: item.title.fr,
        description: item.description.fr,
        hours: item.hours ? item.hours.fr : null,
        email: item.email,
        phone: item.phone,
        icon: item.icon,
        features: item.features.map((feature) => feature.fr),
        category: item.category.fr,
        hidden: item.hidden || false,
      })),
    },
    boutiques: {
      title: mixedData.boutiques.title.fr,
      description: mixedData.boutiques.description.fr,
      images: mixedData.boutiques.images,
      items: mixedData.boutiques.items.map((item) => ({
        title: item.title.fr,
        description: item.description.fr,
        hours: item.hours.fr,
        email: item.email,
        phone: item.phone,
        specialties: item.specialties.map((specialty) => specialty.fr),
        location: item.location.fr,
        hidden: item.hidden || false,
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
      images: mixedData.services.images,
      items: mixedData.services.items.map((item) => ({
        title: item.title.en,
        description: item.description.en,
        hours: item.hours ? item.hours.en : null,
        email: item.email,
        phone: item.phone,
        icon: item.icon,
        features: item.features.map((feature) => feature.en),
        category: item.category.en,
        hidden: item.hidden || false,
      })),
    },
    boutiques: {
      title: mixedData.boutiques.title.en,
      description: mixedData.boutiques.description.en,
      images: mixedData.boutiques.images,
      items: mixedData.boutiques.items.map((item) => ({
        title: item.title.en,
        description: item.description.en,
        hours: item.hours.en,
        email: item.email,
        phone: item.phone,
        specialties: item.specialties.map((specialty) => specialty.en),
        location: item.location.en,
        hidden: item.hidden || false,
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
      images: dataFr.services.images,
      items: dataFr.services.items.map((itemFr: any, i: number) => {
        const itemEn = enFallback.services.items[i] || itemFr;
        return {
          title: { fr: itemFr.title, en: itemEn.title },
          description: { fr: itemFr.description, en: itemEn.description },
          hours: itemFr.hours ? { fr: itemFr.hours, en: itemEn.hours || itemFr.hours } : null,
          email: itemFr.email,
          phone: itemFr.phone,
          icon: itemFr.icon,
          features: itemFr.features.map((fFr: string, j: number) => ({
            fr: fFr,
            en: itemEn.features[j] || fFr,
          })),
          category: { fr: itemFr.category, en: itemEn.category },
          hidden: itemFr.hidden !== undefined ? itemFr.hidden : (itemEn.hidden || false),
        };
      }),
    },
    boutiques: {
      title: { fr: dataFr.boutiques.title, en: enFallback.boutiques.title },
      description: { fr: dataFr.boutiques.description, en: enFallback.boutiques.description },
      images: dataFr.boutiques.images,
      items: dataFr.boutiques.items.map((itemFr: any, i: number) => {
        const itemEn = enFallback.boutiques.items[i] || itemFr;
        return {
          title: { fr: itemFr.title, en: itemEn.title },
          description: { fr: itemFr.description, en: itemEn.description },
          hours: { fr: itemFr.hours, en: itemEn.hours },
          email: itemFr.email,
          phone: itemFr.phone,
          specialties: itemFr.specialties.map((sFr: string, j: number) => ({
            fr: sFr,
            en: itemEn.specialties[j] || sFr,
          })),
          location: { fr: itemFr.location, en: itemEn.location },
          hidden: itemFr.hidden !== undefined ? itemFr.hidden : (itemEn.hidden || false),
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
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [currentBoutiqueIndex, setCurrentBoutiqueIndex] = useState(0);
  const [newServiceImageUrl, setNewServiceImageUrl] = useState('');
  const [newBoutiqueImageUrl, setNewBoutiqueImageUrl] = useState('');
  const [newServiceImageFile, setNewServiceImageFile] = useState<File | null>(null);
  const [newBoutiqueImageFile, setNewBoutiqueImageFile] = useState<File | null>(null);
  const isFr = currentLang.code === 'fr';

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

  // Refetch data after updates to ensure sync
  const refetchData = async () => {
    try {
      const headers = getAuthHeaders();
      const response = await fetch(`/api/globalSections?sectionKey=${SECTION_KEY}`, { headers });
      if (response.ok) {
        const sections = await response.json();
        const section = sections.find((s: any) => s.sectionKey === SECTION_KEY);
        if (section) {
          const fetchedData = reconstructMixed(section.dataFr, section.dataEn);
          setData(fetchedData);
        }
      }
    } catch (err) {
      console.error('Error refetching data:', err);
    }
  };

  // Carousel intervals
  useEffect(() => {
    if (data.services.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentServiceIndex((prev) => (prev + 1) % data.services.images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data.services.images.length]);

  useEffect(() => {
    if (data.boutiques.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentBoutiqueIndex((prev) => (prev + 1) % data.boutiques.images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data.boutiques.images.length]);

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

      // Refetch to ensure consistency
      await refetchData();
    } catch (err) {
      console.error('Error updating servicesBoutiques section:', err);
    }
  };

  // Fonction d'upload unifiée utilisant le même backend que le tooltip
  const uploadImage = async (file: File): Promise<string> => {
    const token = localStorage.getItem('userToken');
    if (!token) throw new Error('No authentication token');

    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    const data = await response.json();
    return data.fileUrl;
  };

  const addImageFromUrlOrFile = async (url: string, file: File | null, isService: boolean) => {
    try {
      let newUrl = url;
      
      if (file) {
        // Upload direct du fichier
        newUrl = await uploadImage(file);
      } else if (url.trim()) {
        // Téléchargement depuis l'URL puis upload
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch image from URL');
        
        const contentType = res.headers.get('content-type') || '';
        let ext = '.jpg';
        if (contentType.includes('png')) ext = '.png';
        else if (contentType.includes('jpeg') || contentType.includes('jpg')) ext = '.jpg';
        
        const urlParts = url.split('/').pop()?.split('?')[0] || 'image';
        const filename = `${urlParts}${ext}`;
        const blob = await res.blob();
        const fileFromBlob = new File([blob], filename, { type: contentType });
        
        newUrl = await uploadImage(fileFromBlob);
      } else {
        return; // Nothing to add
      }

      if (newUrl.trim()) {
        const sectionKey = isService ? 'services' : 'boutiques';
        const images = data[sectionKey].images;
        const updatedData = {
          ...data,
          [sectionKey]: {
            ...data[sectionKey],
            images: [...images, newUrl.trim()],
          },
        };
        setData(updatedData);
        await updateServicesBoutiquesSection(updatedData);
      }
    } catch (error) {
      console.error('Error adding image:', error);
      // Could add toast/error handling here
    }
  };

  const removeImage = async (index: number, isService: boolean) => {
    const sectionKey = isService ? 'services' : 'boutiques';
    const images = data[sectionKey].images;
    const newImages = images.filter((_, i) => i !== index);
    const updatedData = {
      ...data,
      [sectionKey]: {
        ...data[sectionKey],
        images: newImages,
      },
    };
    setData(updatedData);
    await updateServicesBoutiquesSection(updatedData);
  };

  const getText = (textObj: { fr: string; en: string } | null) => textObj ? textObj[langKey as keyof typeof textObj] : '';
  const getTextArray = (items: Array<{ fr: string; en: string }>) => items.map(item => getText(item));

  const { services, boutiques, hero, cta } = data;
  const { items: serviceItems } = services;
  const { items: boutiqueItems } = boutiques;
  const serviceImages = services.images.length > 0 ? services.images : [servicesImage];
  const boutiqueImages = boutiques.images.length > 0 ? boutiques.images : [boutiquesImage];

  const getIcon = (iconName: string) => {
    const icons = {
      Bell: <Bell className="w-6 h-6" />,
      Car: <Car className="w-6 h-6" />,
      Plane: <Plane className="w-6 h-6" />,
      Shirt: <Shirt className="w-6 h-6" />,
      Coffee: <Coffee className="w-6 h-6" />,
      Wifi: <Wifi className="w-6 h-6" />,
      Scissors: <Scissors className="w-6 h-6" />,
      Briefcase: <Briefcase className="w-6 h-6" />,
    };
    return icons[iconName as keyof typeof icons] || <Bell className="w-6 h-6" />;
  };

  // Les autres fonctions de mise à jour restent identiques...
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

  const updateServiceItemField = (index: number, field: 'title' | 'description' | 'category' | 'hours') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        services: {
          ...data.services,
          items: data.services.items.map((item, i) =>
            i === index
              ? { 
                  ...item, 
                  [field]: field === 'hours' ? { fr: newFr, en: newEn } : { fr: newFr, en: newEn }
                }
              : item
          ),
        },
      };
      setData(updatedData);
      await updateServicesBoutiquesSection(updatedData);
    };
  };

  const updateServiceContact = (index: number, field: 'email' | 'phone') => {
    return async (newValue: string) => {
      const updatedData = {
        ...data,
        services: {
          ...data.services,
          items: data.services.items.map((item, i) =>
            i === index ? { ...item, [field]: newValue } : item
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

  const toggleServiceHidden = async (index: number) => {
    const updatedData = {
      ...data,
      services: {
        ...data.services,
        items: data.services.items.map((item, i) =>
          i === index ? { ...item, hidden: !item.hidden } : item
        ),
      },
    };
    setData(updatedData);
    await updateServicesBoutiquesSection(updatedData);
  };

  const addService = async () => {
    const newService = {
      title: { fr: 'Nouveau Service', en: 'New Service' },
      description: { fr: 'Description du nouveau service.', en: 'Description of the new service.' },
      hours: null,
      email: '',
      phone: '',
      icon: 'Bell',
      features: [],
      category: { fr: 'Service', en: 'Service' },
      hidden: false,
    };
    const updatedData = {
      ...data,
      services: {
        ...data.services,
        items: [...data.services.items, newService],
      },
    };
    setData(updatedData);
    await updateServicesBoutiquesSection(updatedData);
  };

  const removeService = async (index: number) => {
    const updatedData = {
      ...data,
      services: {
        ...data.services,
        items: data.services.items.filter((_, i) => i !== index),
      },
    };
    setData(updatedData);
    await updateServicesBoutiquesSection(updatedData);
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

  const updateBoutiqueItemField = (index: number, field: 'title' | 'description' | 'hours' | 'location') => {
    return async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        boutiques: {
          ...data.boutiques,
          items: data.boutiques.items.map((item, i) =>
            i === index
              ? { 
                  ...item, 
                  [field]: { fr: newFr, en: newEn }
                }
              : item
          ),
        },
      };
      setData(updatedData);
      await updateServicesBoutiquesSection(updatedData);
    };
  };

  const updateBoutiqueContact = (index: number, field: 'email' | 'phone') => {
    return async (newValue: string) => {
      const updatedData = {
        ...data,
        boutiques: {
          ...data.boutiques,
          items: data.boutiques.items.map((item, i) =>
            i === index ? { ...item, [field]: newValue } : item
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

  const toggleBoutiqueHidden = async (index: number) => {
    const updatedData = {
      ...data,
      boutiques: {
        ...data.boutiques,
        items: data.boutiques.items.map((item, i) =>
          i === index ? { ...item, hidden: !item.hidden } : item
        ),
      },
    };
    setData(updatedData);
    await updateServicesBoutiquesSection(updatedData);
  };

  const addBoutique = async () => {
    const newBoutique = {
      title: { fr: 'Nouvelle Boutique', en: 'New Boutique' },
      description: { fr: 'Description de la nouvelle boutique.', en: 'Description of the new boutique.' },
      hours: { fr: '', en: '' },
      email: '',
      phone: '',
      specialties: [],
      location: { fr: 'Au sein de l\'hôtel Carlton Madagascar', en: 'Within the Carlton Madagascar Hotel' },
      hidden: false,
    };
    const updatedData = {
      ...data,
      boutiques: {
        ...data.boutiques,
        items: [...data.boutiques.items, newBoutique],
      },
    };
    setData(updatedData);
    await updateServicesBoutiquesSection(updatedData);
  };

  const removeBoutique = async (index: number) => {
    const updatedData = {
      ...data,
      boutiques: {
        ...data.boutiques,
        items: data.boutiques.items.filter((_, i) => i !== index),
      },
    };
    setData(updatedData);
    await updateServicesBoutiquesSection(updatedData);
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

  const renderContactInfo = (item: any, type: 'service' | 'boutique', index: number, updateContact: (idx: number, field: 'email' | 'phone') => (newValue: string) => void) => {
    const phones = item.phone ? item.phone.split(';').map(p => p.trim()).filter(p => p) : [];
    return (
      <div className="space-y-2 mt-4">
        {item.email && (
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            <Tooltip
              frLabel={item.email}
              enLabel={item.email}
              onSave={(newFr, newEn) => updateContact(index, 'email')(newFr)}
            >
              <a href={`mailto:${item.email}`} className="text-primary hover:underline">
                {item.email}
              </a>
            </Tooltip>
          </div>
        )}
        {phones.length > 0 && (
          <div className="flex flex-col space-y-1">
            {phones.map((ph: string, pIndex: number) => (
              <div key={pIndex} className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <Tooltip
                  frLabel={ph}
                  enLabel={ph}
                  onSave={(newFr, newEn) => {
                    const currentPhones = item.phone ? item.phone.split(';').map(p => p.trim()) : [];
                    currentPhones[pIndex] = newFr;
                    updateContact(index, 'phone')(currentPhones.join('; '));
                  }}
                >
                  <a href={`tel:${ph}`} className="text-primary hover:underline">
                    {ph}
                  </a>
                </Tooltip>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Skeleton code remains the same */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-background to-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse">
              <div className="h-12 w-96 bg-muted mx-auto mb-6" />
              <div className="h-6 w-80 bg-muted mx-auto" />
            </div>
          </div>
        </section>
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
          {/* Services Hero with Photo Carousel */}
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
            <div className="lg:w-1/2 relative">
              <div className="relative h-80 rounded-lg shadow-lg overflow-hidden">
                {serviceImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Services"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === currentServiceIndex ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
                {serviceImages.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {serviceImages.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i === currentServiceIndex ? 'bg-white' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
              {isAdmin && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <Input
                      type="text"
                      value={newServiceImageUrl}
                      onChange={(e) => setNewServiceImageUrl(e.target.value)}
                      placeholder="URL d'image"
                    />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewServiceImageFile(e.target.files?.[0] || null)}
                    />
                    <Button 
                      size="sm" 
                      onClick={async () => {
                        await addImageFromUrlOrFile(newServiceImageUrl, newServiceImageFile, true);
                        setNewServiceImageUrl('');
                        setNewServiceImageFile(null);
                      }}
                    >
                      Ajouter
                    </Button>
                  </div>
                  <ul className="space-y-2 text-sm max-h-40 overflow-y-auto">
                    {serviceImages.map((url, i) => (
                      <li key={i} className="flex items-center justify-between p-2 bg-background rounded">
                        <span className="truncate flex-1 mr-2">{url}</span>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => removeImage(i, true)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceItems.map((service, index) => {
              if (!isAdmin && service.hidden) return null;
              return (
                <Card key={index} className={`group hover-elevate transition-all duration-300 relative ${service.hidden ? 'opacity-50' : ''}`}>
                  {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => toggleServiceHidden(index)}>
                        {service.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => removeService(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        {getIcon(service.icon)}
                      </div>
                      <Tooltip frLabel={service.category.fr} enLabel={service.category.en} onSave={updateServiceItemField(index, 'category')}>
                        <Badge variant="secondary">{getText(service.category)}</Badge>
                      </Tooltip>
                    </div>
                    <Tooltip frLabel={service.title.fr} enLabel={service.title.en} onSave={updateServiceItemField(index, 'title')}>
                      <CardTitle className="text-xl text-foreground">{getText(service.title)}</CardTitle>
                    </Tooltip>
                  </CardHeader>
                  <CardContent>
                    <Tooltip frLabel={service.description.fr} enLabel={service.description.en} onSave={updateServiceItemField(index, 'description')}>
                      <p className="text-muted-foreground mb-4">{getText(service.description)}</p>
                    </Tooltip>
                    {service.hours && (
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Clock className="w-4 h-4 mr-2" />
                        <Tooltip frLabel={service.hours.fr} enLabel={service.hours.en} onSave={updateServiceItemField(index, 'hours')}>
                          <span>{getText(service.hours)}</span>
                        </Tooltip>
                      </div>
                    )}
                    {service.features.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {getTextArray(service.features).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                            <Star className="w-4 h-4 text-primary mr-2" />
                            <Tooltip frLabel={service.features[featureIndex].fr} enLabel={service.features[featureIndex].en} onSave={updateServiceFeature(index, featureIndex)}>
                              <span>{feature}</span>
                            </Tooltip>
                          </div>
                        ))}
                      </div>
                    )}
                    {renderContactInfo(service, 'service', index, updateServiceContact)}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {isAdmin && (
            <div className="flex justify-center mt-8">
              <Button variant="outline" onClick={addService}>
                <Plus className="w-4 h-4 mr-2" />
                {isFr ? 'Ajouter un service' : 'Add a service'}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Boutiques Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero with carousel */}
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-16">
            <div className="lg:w-1/2">
              <Tooltip frLabel={boutiques.title.fr} enLabel={boutiques.title.en} onSave={updateBoutiquesField('title')}>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                  {getText(boutiques.title)}
                </h2>
              </Tooltip>
              <Tooltip frLabel={boutiques.description.fr} enLabel={boutiques.description.en} onSave={updateBoutiquesField('description')}>
                <p className="text-lg text-muted-foreground">
                  {getText(boutiques.description)}
                </p>
              </Tooltip>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative h-80 rounded-lg shadow-lg overflow-hidden">
                {boutiqueImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Boutiques"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === currentBoutiqueIndex ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
                {boutiqueImages.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {boutiqueImages.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i === currentBoutiqueIndex ? 'bg-white' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
              {isAdmin && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <Input
                      type="text"
                      value={newBoutiqueImageUrl}
                      onChange={(e) => setNewBoutiqueImageUrl(e.target.value)}
                      placeholder="URL d'image"
                    />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewBoutiqueImageFile(e.target.files?.[0] || null)}
                    />
                    <Button 
                      size="sm" 
                      onClick={async () => {
                        await addImageFromUrlOrFile(newBoutiqueImageUrl, newBoutiqueImageFile, false);
                        setNewBoutiqueImageUrl('');
                        setNewBoutiqueImageFile(null);
                      }}
                    >
                      Ajouter
                    </Button>
                  </div>
                  <ul className="space-y-2 text-sm max-h-40 overflow-y-auto">
                    {boutiqueImages.map((url, i) => (
                      <li key={i} className="flex items-center justify-between p-2 bg-background rounded">
                        <span className="truncate flex-1 mr-2">{url}</span>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => removeImage(i, false)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {boutiqueItems.map((boutique, index) => {
              if (!isAdmin && boutique.hidden) return null;
              return (
                <Card key={index} className={`group hover-elevate transition-all duration-300 relative ${boutique.hidden ? 'opacity-50' : ''}`}>
                  {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => toggleBoutiqueHidden(index)}>
                        {boutique.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => removeBoutique(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Tooltip frLabel={boutique.title.fr} enLabel={boutique.title.en} onSave={updateBoutiqueItemField(index, 'title')}>
                          <CardTitle className="text-2xl text-foreground mb-2">{getText(boutique.title)}</CardTitle>
                        </Tooltip>
                        {boutique.hours && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-2" />
                            <Tooltip frLabel={boutique.hours.fr} enLabel={boutique.hours.en} onSave={updateBoutiqueItemField(index, 'hours')}>
                              <span>{getText(boutique.hours)}</span>
                            </Tooltip>
                          </div>
                        )}
                      </div>
                      <ShoppingBag className="w-8 h-8 mr-2 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tooltip frLabel={boutique.description.fr} enLabel={boutique.description.en} onSave={updateBoutiqueItemField(index, 'description')}>
                      <p className="text-muted-foreground mb-6">{getText(boutique.description)}</p>
                    </Tooltip>
                    {boutique.specialties.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Spécialités</h4>
                        <div className="flex flex-wrap gap-2">
                          {getTextArray(boutique.specialties).map((specialty, specialtyIndex) => (
                            <Tooltip key={specialtyIndex} frLabel={boutique.specialties[specialtyIndex].fr} enLabel={boutique.specialties[specialtyIndex].en} onSave={updateBoutiqueSpecialty(index, specialtyIndex)}>
                              <Badge variant="outline">{specialty}</Badge>
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                    )}
                    {renderContactInfo(boutique, 'boutique', index, updateBoutiqueContact)}
                    {boutique.location && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        <Tooltip frLabel={boutique.location.fr} enLabel={boutique.location.en} onSave={updateBoutiqueItemField(index, 'location')}>
                          <span>{getText(boutique.location)}</span>
                        </Tooltip>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {isAdmin && (
            <div className="flex justify-center mt-8">
              <Button variant="outline" onClick={addBoutique}>
                <Plus className="w-4 h-4 mr-2" />
                {isFr ? 'Ajouter une boutique' : 'Add a boutique'}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Tooltip frLabel={cta.title.fr} enLabel={cta.title.en} onSave={updateCtaField('title')}>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              {getText(cta.title)}
            </h2>
          </Tooltip>
          <Tooltip frLabel={cta.description.fr} enLabel={cta.description.en} onSave={updateCtaField('description')}>
            <p className="text-lg text-muted-foreground mb-8">
              {getText(cta.description)}
            </p>
          </Tooltip>
          <div className="flex justify-center">
            <Button size="lg">
              <Tooltip frLabel={cta.buttonText.fr} enLabel={cta.buttonText.en} onSave={updateCtaButtonText}>
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