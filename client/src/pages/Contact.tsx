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
import { contactData as initialContactData } from '@/data/contactData';
import { useLanguage } from '@/components/context/LanguageContext';
import { Tooltip } from '@/components/Tooltip';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SECTION_KEY = 'contact';

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const Contact = () => {
  const { currentLang } = useLanguage();
  const lang = currentLang.code.toLowerCase();
  
  const [data, setData] = useState(initialContactData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Helper to split contactData into dataFr and dataEn structures
  const splitContactData = (mixedData: typeof initialContactData) => {
    const dataFr = {
      hero: {
        title: mixedData.hero.title.fr,
        description: mixedData.hero.description.fr,
      },
      contactInfo: mixedData.contactInfo.map((info) => ({
        icon: info.icon,
        title: info.title.fr,
        details: info.details.map((detail) => detail.fr),
        action: info.action.fr,
      })),
      form: {
        title: mixedData.form.title.fr,
        subtitle: mixedData.form.subtitle.fr,
        departments: mixedData.form.departments.map((dept) => ({
          value: dept.value,
          label: dept.label.fr,
        })),
        fields: {
          firstName: {
            label: mixedData.form.fields.firstName.label.fr,
            placeholder: mixedData.form.fields.firstName.placeholder.fr,
            validation: {
              min: mixedData.form.fields.firstName.validation.min.fr,
            },
          },
          lastName: {
            label: mixedData.form.fields.lastName.label.fr,
            placeholder: mixedData.form.fields.lastName.placeholder.fr,
            validation: {
              min: mixedData.form.fields.lastName.validation.min.fr,
            },
          },
          email: {
            label: mixedData.form.fields.email.label.fr,
            placeholder: mixedData.form.fields.email.placeholder.fr,
            validation: {
              email: mixedData.form.fields.email.validation.email.fr,
            },
          },
          phone: {
            label: mixedData.form.fields.phone.label.fr,
            placeholder: mixedData.form.fields.phone.placeholder.fr,
            validation: {
              min: mixedData.form.fields.phone.validation.min.fr,
            },
          },
          subject: {
            label: mixedData.form.fields.subject.label.fr,
            placeholder: mixedData.form.fields.subject.placeholder.fr,
            validation: {
              min: mixedData.form.fields.subject.validation.min.fr,
            },
          },
          arrivalDate: {
            label: mixedData.form.fields.arrivalDate.label.fr,
          },
          departureDate: {
            label: mixedData.form.fields.departureDate.label.fr,
          },
          guests: {
            label: mixedData.form.fields.guests.label.fr,
            placeholder: mixedData.form.fields.guests.placeholder.fr,
          },
          message: {
            label: mixedData.form.fields.message.label.fr,
            placeholder: mixedData.form.fields.message.placeholder.fr,
            validation: {
              min: mixedData.form.fields.message.validation.min.fr,
            },
          },
        },
        submitButton: mixedData.form.submitButton.fr,
      },
      services: {
        title: mixedData.services.title.fr,
        subtitle: mixedData.services.subtitle.fr,
        list: mixedData.services.list.map((service) => ({
          title: service.title.fr,
          description: service.description.fr,
          icon: service.icon,
        })),
      },
      practicalInfo: {
        title: mixedData.practicalInfo.title.fr,
        arrival: {
          title: mixedData.practicalInfo.arrival.title.fr,
          details: mixedData.practicalInfo.arrival.details.map((detail) => detail.fr),
        },
        airport: {
          title: mixedData.practicalInfo.airport.title.fr,
          details: mixedData.practicalInfo.airport.details.map((detail) => detail.fr),
        },
        languages: {
          title: mixedData.practicalInfo.languages.title.fr,
          list: mixedData.practicalInfo.languages.list.map((langItem) => langItem.fr),
        },
        location: {
          title: mixedData.practicalInfo.location.title.fr,
          subtitle: mixedData.practicalInfo.location.subtitle.fr,
          head : mixedData.practicalInfo.location.head.fr,
          address: mixedData.practicalInfo.location.address.fr,
          mapUrl: mixedData.practicalInfo.location.mapUrl,
          mapTitle: mixedData.practicalInfo.location.mapTitle.fr,
          directionsButton: mixedData.practicalInfo.location.directionsButton.fr,
        },
      },
    };

    const dataEn = {
      hero: {
        title: mixedData.hero.title.en,
        description: mixedData.hero.description.en,
      },
      contactInfo: mixedData.contactInfo.map((info) => ({
        icon: info.icon,
        title: info.title.en,
        details: info.details.map((detail) => detail.en),
        action: info.action.en,
      })),
      form: {
        title: mixedData.form.title.en,
        subtitle: mixedData.form.subtitle.en,
        departments: mixedData.form.departments.map((dept) => ({
          value: dept.value,
          label: dept.label.en,
        })),
        fields: {
          firstName: {
            label: mixedData.form.fields.firstName.label.en,
            placeholder: mixedData.form.fields.firstName.placeholder.en,
            validation: {
              min: mixedData.form.fields.firstName.validation.min.en,
            },
          },
          lastName: {
            label: mixedData.form.fields.lastName.label.en,
            placeholder: mixedData.form.fields.lastName.placeholder.en,
            validation: {
              min: mixedData.form.fields.lastName.validation.min.en,
            },
          },
          email: {
            label: mixedData.form.fields.email.label.en,
            placeholder: mixedData.form.fields.email.placeholder.en,
            validation: {
              email: mixedData.form.fields.email.validation.email.en,
            },
          },
          phone: {
            label: mixedData.form.fields.phone.label.en,
            placeholder: mixedData.form.fields.phone.placeholder.en,
            validation: {
              min: mixedData.form.fields.phone.validation.min.en,
            },
          },
          subject: {
            label: mixedData.form.fields.subject.label.en,
            placeholder: mixedData.form.fields.subject.placeholder.en,
            validation: {
              min: mixedData.form.fields.subject.validation.min.en,
            },
          },
          arrivalDate: {
            label: mixedData.form.fields.arrivalDate.label.en,
          },
          departureDate: {
            label: mixedData.form.fields.departureDate.label.en,
          },
          guests: {
            label: mixedData.form.fields.guests.label.en,
            placeholder: mixedData.form.fields.guests.placeholder.en,
          },
          message: {
            label: mixedData.form.fields.message.label.en,
            placeholder: mixedData.form.fields.message.placeholder.en,
            validation: {
              min: mixedData.form.fields.message.validation.min.en,
            },
          },
        },
        submitButton: mixedData.form.submitButton.en,
      },
      services: {
        title: mixedData.services.title.en,
        subtitle: mixedData.services.subtitle.en,
        list: mixedData.services.list.map((service) => ({
          title: service.title.en,
          description: service.description.en,
          icon: service.icon,
        })),
      },
      practicalInfo: {
        title: mixedData.practicalInfo.title.en,
        arrival: {
          title: mixedData.practicalInfo.arrival.title.en,
          details: mixedData.practicalInfo.arrival.details.map((detail) => detail.en),
        },
        airport: {
          title: mixedData.practicalInfo.airport.title.en,
          details: mixedData.practicalInfo.airport.details.map((detail) => detail.en),
        },
        languages: {
          title: mixedData.practicalInfo.languages.title.en,
          list: mixedData.practicalInfo.languages.list.map((langItem) => langItem.en),
        },
        location: {
          title: mixedData.practicalInfo.location.title.en,
          subtitle: mixedData.practicalInfo.location.subtitle.en,
          address: mixedData.practicalInfo.location.address.en,
          head : mixedData.practicalInfo.location.head.en,
          mapUrl: mixedData.practicalInfo.location.mapUrl,
          mapTitle: mixedData.practicalInfo.location.mapTitle.en,
          directionsButton: mixedData.practicalInfo.location.directionsButton.en,
        },
      },
    };

    return { dataFr, dataEn };
  };

  // Reconstruct mixed data from dataFr and dataEn
  const reconstructMixed = (dataFr: any, dataEn: any | null) => {
    if (!dataFr || typeof dataFr !== 'object') {
      console.warn('Invalid dataFr structure, falling back to default');
      return initialContactData;
    }
    const enFallback = dataEn || dataFr;
    const mixed = {
      hero: {
        title: { fr: dataFr.hero.title, en: enFallback.hero.title || dataFr.hero.title },
        description: { fr: dataFr.hero.description, en: enFallback.hero.description || dataFr.hero.description },
      },
      contactInfo: dataFr.contactInfo.map((infoFr: any, i: number) => ({
        icon: infoFr.icon || initialContactData.contactInfo[i].icon,
        title: { fr: infoFr.title, en: enFallback.contactInfo[i]?.title || infoFr.title },
        details: infoFr.details.map((dFr: string, j: number) => ({
          fr: dFr,
          en: enFallback.contactInfo[i]?.details[j] || dFr,
        })),
        action: { fr: infoFr.action, en: enFallback.contactInfo[i]?.action || infoFr.action },
      })),
      form: {
        title: { fr: dataFr.form.title, en: enFallback.form.title || dataFr.form.title },
        subtitle: { fr: dataFr.form.subtitle, en: enFallback.form.subtitle || dataFr.form.subtitle },
        departments: dataFr.form.departments.map((deptFr: any, i: number) => ({
          value: deptFr.value || initialContactData.form.departments[i].value,
          label: { fr: deptFr.label, en: enFallback.form.departments[i]?.label || deptFr.label },
        })),
        fields: {
          firstName: {
            label: { fr: dataFr.form.fields.firstName.label, en: enFallback.form.fields.firstName.label || dataFr.form.fields.firstName.label },
            placeholder: { fr: dataFr.form.fields.firstName.placeholder, en: enFallback.form.fields.firstName.placeholder || dataFr.form.fields.firstName.placeholder },
            validation: {
              min: { fr: dataFr.form.fields.firstName.validation.min, en: enFallback.form.fields.firstName.validation.min || dataFr.form.fields.firstName.validation.min },
            },
          },
          lastName: {
            label: { fr: dataFr.form.fields.lastName.label, en: enFallback.form.fields.lastName.label || dataFr.form.fields.lastName.label },
            placeholder: { fr: dataFr.form.fields.lastName.placeholder, en: enFallback.form.fields.lastName.placeholder || dataFr.form.fields.lastName.placeholder },
            validation: {
              min: { fr: dataFr.form.fields.lastName.validation.min, en: enFallback.form.fields.lastName.validation.min || dataFr.form.fields.lastName.validation.min },
            },
          },
          email: {
            label: { fr: dataFr.form.fields.email.label, en: enFallback.form.fields.email.label || dataFr.form.fields.email.label },
            placeholder: { fr: dataFr.form.fields.email.placeholder, en: enFallback.form.fields.email.placeholder || dataFr.form.fields.email.placeholder },
            validation: {
              email: { fr: dataFr.form.fields.email.validation.email, en: enFallback.form.fields.email.validation.email || dataFr.form.fields.email.validation.email },
            },
          },
          phone: {
            label: { fr: dataFr.form.fields.phone.label, en: enFallback.form.fields.phone.label || dataFr.form.fields.phone.label },
            placeholder: { fr: dataFr.form.fields.phone.placeholder, en: enFallback.form.fields.phone.placeholder || dataFr.form.fields.phone.placeholder },
            validation: {
              min: { fr: dataFr.form.fields.phone.validation.min, en: enFallback.form.fields.phone.validation.min || dataFr.form.fields.phone.validation.min },
            },
          },
          subject: {
            label: { fr: dataFr.form.fields.subject.label, en: enFallback.form.fields.subject.label || dataFr.form.fields.subject.label },
            placeholder: { fr: dataFr.form.fields.subject.placeholder, en: enFallback.form.fields.subject.placeholder || dataFr.form.fields.subject.placeholder },
            validation: {
              min: { fr: dataFr.form.fields.subject.validation.min, en: enFallback.form.fields.subject.validation.min || dataFr.form.fields.subject.validation.min },
            },
          },
          arrivalDate: {
            label: { fr: dataFr.form.fields.arrivalDate.label, en: enFallback.form.fields.arrivalDate.label || dataFr.form.fields.arrivalDate.label },
          },
          departureDate: {
            label: { fr: dataFr.form.fields.departureDate.label, en: enFallback.form.fields.departureDate.label || dataFr.form.fields.departureDate.label },
          },
          guests: {
            label: { fr: dataFr.form.fields.guests.label, en: enFallback.form.fields.guests.label || dataFr.form.fields.guests.label },
            placeholder: { fr: dataFr.form.fields.guests.placeholder, en: enFallback.form.fields.guests.placeholder || dataFr.form.fields.guests.placeholder },
          },
          message: {
            label: { fr: dataFr.form.fields.message.label, en: enFallback.form.fields.message.label || dataFr.form.fields.message.label },
            placeholder: { fr: dataFr.form.fields.message.placeholder, en: enFallback.form.fields.message.placeholder || dataFr.form.fields.message.placeholder },
            validation: {
              min: { fr: dataFr.form.fields.message.validation.min, en: enFallback.form.fields.message.validation.min || dataFr.form.fields.message.validation.min },
            },
          },
        },
        submitButton: { fr: dataFr.form.submitButton, en: enFallback.form.submitButton || dataFr.form.submitButton },
      },
      services: {
        title: { fr: dataFr.services.title, en: enFallback.services.title || dataFr.services.title },
        subtitle: { fr: dataFr.services.subtitle, en: enFallback.services.subtitle || dataFr.services.subtitle },
        list: dataFr.services.list.map((serviceFr: any, i: number) => ({
          title: { fr: serviceFr.title, en: enFallback.services.list[i]?.title || serviceFr.title },
          description: { fr: serviceFr.description, en: enFallback.services.list[i]?.description || serviceFr.description },
          icon: serviceFr.icon || initialContactData.services.list[i].icon,
        })),
      },
      practicalInfo: {
        title: { fr: dataFr.practicalInfo.title, en: enFallback.practicalInfo.title || dataFr.practicalInfo.title },
        arrival: {
          title: { fr: dataFr.practicalInfo.arrival.title, en: enFallback.practicalInfo.arrival.title || dataFr.practicalInfo.arrival.title },
          details: dataFr.practicalInfo.arrival.details.map((dFr: string, j: number) => ({
            fr: dFr,
            en: enFallback.practicalInfo.arrival.details[j] || dFr,
          })),
        },
        airport: {
          title: { fr: dataFr.practicalInfo.airport.title, en: enFallback.practicalInfo.airport.title || dataFr.practicalInfo.airport.title },
          details: dataFr.practicalInfo.airport.details.map((dFr: string, j: number) => ({
            fr: dFr,
            en: enFallback.practicalInfo.airport.details[j] || dFr,
          })),
        },
        languages: {
          title: { fr: dataFr.practicalInfo.languages.title, en: enFallback.practicalInfo.languages.title || dataFr.practicalInfo.languages.title },
          list: dataFr.practicalInfo.languages.list.map((lFr: string, j: number) => ({
            fr: lFr,
            en: enFallback.practicalInfo.languages.list[j] || lFr,
          })),
        },
        location: {
          title: { fr: dataFr.practicalInfo.location.title, en: enFallback.practicalInfo.location.title || dataFr.practicalInfo.location.title },
          subtitle: { fr: dataFr.practicalInfo.location.subtitle, en: enFallback.practicalInfo.location.subtitle || dataFr.practicalInfo.location.subtitle },
          address: { fr: dataFr.practicalInfo.location.address, en: enFallback.practicalInfo.location.address || dataFr.practicalInfo.location.address },
          mapUrl: dataFr.practicalInfo.location.mapUrl || initialContactData.practicalInfo.location.mapUrl,
          mapTitle: { fr: dataFr.practicalInfo.location.mapTitle, en: enFallback.practicalInfo.location.mapTitle || dataFr.practicalInfo.location.mapTitle },
          directionsButton: { fr: dataFr.practicalInfo.location.directionsButton, en: enFallback.practicalInfo.location.directionsButton || dataFr.practicalInfo.location.directionsButton },
        },
      },
    };
    return mixed;
  };

  // Fetch contact data from backend
  useEffect(() => {
    const fetchContactData = async () => {
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
          const { dataFr, dataEn } = splitContactData(initialContactData);
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
            throw new Error('Failed to create contact data');
          }

          const created = await createResponse.json();
          section = created; // Assume POST returns the created object
        }

        if (section) {
          const fetchedData = reconstructMixed(section.dataFr, section.dataEn);
          setData(fetchedData);
        } else {
          setData(initialContactData);
        }
      } catch (err) {
        console.error('Error fetching contact data:', err);
        setError('Failed to load contact data');
        // Fallback to default
        setData(initialContactData);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const updateContactSection = async (updatedMixedData: typeof initialContactData) => {
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
        const { dataFr, dataEn } = splitContactData(initialContactData);
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

      const { dataFr: updatedDataFr, dataEn: updatedDataEn } = splitContactData(updatedMixedData);

      const putResponse = await fetch(`/api/globalSections/${currentSection.id}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataFr: updatedDataFr,
          dataEn: Object.keys(updatedDataEn).length > 0 ? updatedDataEn : null
        })
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update contact section');
      }
    } catch (err) {
      console.error('Error updating contact section:', err);
      // Revert local state on error if needed, but for simplicity, keep it
    }
  };
  
  const getText = (textObj: { fr: string; en: string }): string => textObj[lang as keyof typeof textObj];
  
  const getDetailText = (detailObj: { fr: string; en: string }): string => getText(detailObj);
  
  const getLangText = (langObj: { fr: string; en: string } | string, fallback?: string): string => {
    if (typeof langObj === 'string') return langObj;
    return getText(langObj);
  };

  // Update functions
  const updateHeroTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      hero: { ...data.hero, title: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateHeroDescription = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      hero: { ...data.hero, description: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateContactInfoTitle = (index: number) => async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      contactInfo: data.contactInfo.map((info, i) => 
        i === index ? { ...info, title: { fr: newFr, en: newEn } } : info
      )
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateContactInfoDetail = (index: number, detailIndex: number) => async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      contactInfo: data.contactInfo.map((info, i) => 
        i === index 
          ? { 
              ...info, 
              details: info.details.map((detail, j) => 
                j === detailIndex ? { fr: newFr, en: newEn } : detail
              ) 
            } 
          : info
      )
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateContactInfoAction = (index: number) => async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      contactInfo: data.contactInfo.map((info, i) => 
        i === index ? { ...info, action: { fr: newFr, en: newEn } } : info
      )
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateFormTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { ...data.form, title: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateFormSubtitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { ...data.form, subtitle: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateDepartmentLabel = (index: number) => async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        departments: data.form.departments.map((dept, i) => 
          i === index ? { ...dept, label: { fr: newFr, en: newEn } } : dept
        ) 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateFirstNameLabel = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          firstName: { ...data.form.fields.firstName, label: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateFirstNamePlaceholder = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          firstName: { ...data.form.fields.firstName, placeholder: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateLastNameLabel = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          lastName: { ...data.form.fields.lastName, label: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateLastNamePlaceholder = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          lastName: { ...data.form.fields.lastName, placeholder: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateEmailLabel = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          email: { ...data.form.fields.email, label: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateEmailPlaceholder = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          email: { ...data.form.fields.email, placeholder: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updatePhoneLabel = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          phone: { ...data.form.fields.phone, label: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updatePhonePlaceholder = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          phone: { ...data.form.fields.phone, placeholder: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateSubjectLabel = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          subject: { ...data.form.fields.subject, label: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateSubjectPlaceholder = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          subject: { ...data.form.fields.subject, placeholder: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateArrivalDateLabel = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          arrivalDate: { ...data.form.fields.arrivalDate, label: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateDepartureDateLabel = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          departureDate: { ...data.form.fields.departureDate, label: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateGuestsLabel = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          guests: { ...data.form.fields.guests, label: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateGuestsPlaceholder = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          guests: { ...data.form.fields.guests, placeholder: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateMessageLabel = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          message: { ...data.form.fields.message, label: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateMessagePlaceholder = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { 
        ...data.form, 
        fields: { 
          ...data.form.fields, 
          message: { ...data.form.fields.message, placeholder: { fr: newFr, en: newEn } } 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateSubmitButton = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      form: { ...data.form, submitButton: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateServicesTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      services: { ...data.services, title: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateServicesSubtitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      services: { ...data.services, subtitle: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateServiceTitle = (index: number) => async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      services: { 
        ...data.services, 
        list: data.services.list.map((service, i) => 
          i === index ? { ...service, title: { fr: newFr, en: newEn } } : service
        ) 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateServiceDescription = (index: number) => async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      services: { 
        ...data.services, 
        list: data.services.list.map((service, i) => 
          i === index ? { ...service, description: { fr: newFr, en: newEn } } : service
        ) 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updatePracticalInfoTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      practicalInfo: { ...data.practicalInfo, title: { fr: newFr, en: newEn } }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateArrivalTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      practicalInfo: { 
        ...data.practicalInfo, 
        arrival: { ...data.practicalInfo.arrival, title: { fr: newFr, en: newEn } } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateArrivalDetail = (detailIndex: number) => async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      practicalInfo: { 
        ...data.practicalInfo, 
        arrival: { 
          ...data.practicalInfo.arrival, 
          details: data.practicalInfo.arrival.details.map((detail, j) => 
            j === detailIndex ? { fr: newFr, en: newEn } : detail
          ) 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateAirportTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      practicalInfo: { 
        ...data.practicalInfo, 
        airport: { ...data.practicalInfo.airport, title: { fr: newFr, en: newEn } } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateAirportDetail = (detailIndex: number) => async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      practicalInfo: { 
        ...data.practicalInfo, 
        airport: { 
          ...data.practicalInfo.airport, 
          details: data.practicalInfo.airport.details.map((detail, j) => 
            j === detailIndex ? { fr: newFr, en: newEn } : detail
          ) 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateLanguagesTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      practicalInfo: { 
        ...data.practicalInfo, 
        languages: { ...data.practicalInfo.languages, title: { fr: newFr, en: newEn } } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateLanguageItem = (index: number) => async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      practicalInfo: { 
        ...data.practicalInfo, 
        languages: { 
          ...data.practicalInfo.languages, 
          list: data.practicalInfo.languages.list.map((langItem, i) => 
            i === index ? { fr: newFr, en: newEn } : langItem
          ) 
        } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateLocationTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      practicalInfo: { 
        ...data.practicalInfo, 
        location: { ...data.practicalInfo.location, title: { fr: newFr, en: newEn } } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateLocationSubtitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      practicalInfo: { 
        ...data.practicalInfo, 
        location: { ...data.practicalInfo.location, subtitle: { fr: newFr, en: newEn } } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateLocationAddress = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      practicalInfo: { 
        ...data.practicalInfo, 
        location: { ...data.practicalInfo.location, address: { fr: newFr, en: newEn } } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateLocationMapTitle = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      practicalInfo: { 
        ...data.practicalInfo, 
        location: { ...data.practicalInfo.location, mapTitle: { fr: newFr, en: newEn } } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  const updateLocationDirectionsButton = async (newFr: string, newEn: string) => {
    const updatedData = {
      ...data,
      practicalInfo: { 
        ...data.practicalInfo, 
        location: { ...data.practicalInfo.location, directionsButton: { fr: newFr, en: newEn } } 
      }
    };
    setData(updatedData);
    await updateContactSection(updatedData);
  };

  // Form setup (validation messages use current lang from data)
  const validationMessages = {
    firstName: { min: getText(data.form.fields.firstName.validation.min) },
    lastName: { min: getText(data.form.fields.lastName.validation.min) },
    email: { email: getText(data.form.fields.email.validation.email) },
    phone: { min: getText(data.form.fields.phone.validation.min) },
    subject: { min: getText(data.form.fields.subject.validation.min) },
    message: { min: getText(data.form.fields.message.validation.min) }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="pt-20 bg-gradient-to-r from-background to-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <Skeleton className="h-12 w-64 mx-auto mb-6" />
              <Skeleton className="h-1 w-24 mx-auto mb-6" />
              <Skeleton className="h-8 w-full max-w-3xl mx-auto" />
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-12 w-full mx-auto" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <div className="space-y-1">
                    {Array.from({ length: 2 }).map((__, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-6 w-64" />
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-32 w-full rounded-md" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-40" />
                  <Skeleton className="h-5 w-64" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-8 w-8 mt-2" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="h-8 w-8 mt-2" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-32" />
                      {Array.from({ length: 3 }).map((__, j) => (
                        <Skeleton key={j} className="h-4 w-3/4" />
                      ))}
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-24" />
                      {Array.from({ length: 3 }).map((__, j) => (
                        <Skeleton key={j} className="h-4 w-3/4" />
                      ))}
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-32" />
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 4 }).map((___, k) => (
                          <Skeleton key={k} className="h-6 w-16" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-5 w-64" />
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-5 w-5 mt-2" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-5 w-32" />
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: '<span class="font-semibold">Adresse complète</span><br/>loading...' }} />
                      </div>
                    </div>
                    <Skeleton className="h-64 w-full rounded-lg" />
                    <Skeleton className="h-10 w-40 mx-auto" />
                  </div>
                </div>
              </div>
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

  const { hero, contactInfo, form, services, practicalInfo } = data;
  
  const heroTitle = getText(hero.title);
  const heroDescription = getText(hero.description);
  
  const processedContactInfo = contactInfo.map(info => ({
    ...info,
    titleText: getText(info.title),
    detailsText: info.details.map(getDetailText),
    actionText: getText(info.action)
  }));
  
  const formTitle = getText(form.title);
  const formSubtitle = getText(form.subtitle);
  
  const processedDepartments = form.departments.map(dept => ({
    ...dept,
    labelText: getText(dept.label)
  }));
  
  const firstNameLabel = getText(form.fields.firstName.label);
  const firstNamePlaceholder = getText(form.fields.firstName.placeholder);
  
  const lastNameLabel = getText(form.fields.lastName.label);
  const lastNamePlaceholder = getText(form.fields.lastName.placeholder);
  
  const emailLabel = getText(form.fields.email.label);
  const emailPlaceholder = getText(form.fields.email.placeholder);
  
  const phoneLabel = getText(form.fields.phone.label);
  const phonePlaceholder = getText(form.fields.phone.placeholder);
  
  const subjectLabel = getText(form.fields.subject.label);
  const subjectPlaceholder = getText(form.fields.subject.placeholder);
  
  const arrivalDateLabel = getText(form.fields.arrivalDate.label);
  
  const departureDateLabel = getText(form.fields.departureDate.label);
  
  const guestsLabel = getText(form.fields.guests.label);
  const guestsPlaceholder = getText(form.fields.guests.placeholder);
  
  const messageLabel = getText(form.fields.message.label);
  const messagePlaceholder = getText(form.fields.message.placeholder);
  
  const submitButtonText = getText(form.submitButton);
  
  const servicesTitle = getText(services.title);
  const servicesSubtitle = getText(services.subtitle);
  
  const processedServicesList = services.list.map(service => ({
    ...service,
    titleText: getText(service.title),
    descriptionText: getText(service.description)
  }));
  
  const practicalInfoTitle = getText(practicalInfo.title);
  
  const arrivalTitle = getText(practicalInfo.arrival.title);
  const arrivalDetails = practicalInfo.arrival.details.map(getDetailText);
  
  const airportTitle = getText(practicalInfo.airport.title);
  const airportDetails = practicalInfo.airport.details.map(getDetailText);
  
  const languagesTitle = getText(practicalInfo.languages.title);
  const languagesList = practicalInfo.languages.list.map(getLangText);
  
  const locationTitle = getText(practicalInfo.location.title);
  const locationSubtitle = getText(practicalInfo.location.subtitle);
  const locationAddress = getText(practicalInfo.location.address);
  const locationMapTitle = getText(practicalInfo.location.mapTitle);
  const locationDirectionsButton = getText(practicalInfo.location.directionsButton);

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-background to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              <Tooltip 
                frLabel={hero.title.fr} 
                enLabel={hero.title.en} 
                onSave={updateHeroTitle}
              >
                {heroTitle}
              </Tooltip>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              <Tooltip 
                frLabel={hero.description.fr} 
                enLabel={hero.description.en} 
                onSave={updateHeroDescription}
              >
                {heroDescription}
              </Tooltip>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {processedContactInfo.map((info, index) => (
              <Card key={index} className="text-center hover-elevate">
                <CardContent className="pt-6">
                  <div className="text-primary mb-4 flex justify-center">
                    {getContactIcon(info.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    <Tooltip 
                      frLabel={contactInfo[index].title.fr} 
                      enLabel={contactInfo[index].title.en} 
                      onSave={updateContactInfoTitle(index)}
                    >
                      {info.titleText}
                    </Tooltip>
                  </h3>
                  <div className="space-y-1 mb-4">
                    {info.detailsText.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">
                        <Tooltip 
                          frLabel={contactInfo[index].details[idx].fr} 
                          enLabel={contactInfo[index].details[idx].en} 
                          onSave={updateContactInfoDetail(index, idx)}
                        >
                          {detail}
                        </Tooltip>
                      </p>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" data-testid={`button-contact-${index}`}>
                    <Tooltip 
                      frLabel={contactInfo[index].action.fr} 
                      enLabel={contactInfo[index].action.en} 
                      onSave={updateContactInfoAction(index)}
                    >
                      {info.actionText}
                    </Tooltip>
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
                  <Tooltip 
                    frLabel={form.title.fr} 
                    enLabel={form.title.en} 
                    onSave={updateFormTitle}
                  >
                    {formTitle}
                  </Tooltip>
                </CardTitle>
                <p className="text-muted-foreground">
                  <Tooltip 
                    frLabel={form.subtitle.fr} 
                    enLabel={form.subtitle.en} 
                    onSave={updateFormSubtitle}
                  >
                    {formSubtitle}
                  </Tooltip>
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
                            <FormLabel>
                              <Tooltip 
                                frLabel={form.fields.firstName.label.fr} 
                                enLabel={form.fields.firstName.label.en} 
                                onSave={updateFirstNameLabel}
                              >
                                {firstNameLabel}
                              </Tooltip>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={
                                  <Tooltip 
                                    frLabel={form.fields.firstName.placeholder.fr} 
                                    enLabel={form.fields.firstName.placeholder.en} 
                                    onSave={updateFirstNamePlaceholder}
                                  >
                                    {firstNamePlaceholder}
                                  </Tooltip>
                                } 
                                {...field} 
                                data-testid="input-firstname" 
                              />
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
                            <FormLabel>
                              <Tooltip 
                                frLabel={form.fields.lastName.label.fr} 
                                enLabel={form.fields.lastName.label.en} 
                                onSave={updateLastNameLabel}
                              >
                                {lastNameLabel}
                              </Tooltip>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={
                                  <Tooltip 
                                    frLabel={form.fields.lastName.placeholder.fr} 
                                    enLabel={form.fields.lastName.placeholder.en} 
                                    onSave={updateLastNamePlaceholder}
                                  >
                                    {lastNamePlaceholder}
                                  </Tooltip>
                                } 
                                {...field} 
                                data-testid="input-lastname" 
                              />
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
                            <FormLabel>
                              <Tooltip 
                                frLabel={form.fields.email.label.fr} 
                                enLabel={form.fields.email.label.en} 
                                onSave={updateEmailLabel}
                              >
                                {emailLabel}
                              </Tooltip>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder={
                                  <Tooltip 
                                    frLabel={form.fields.email.placeholder.fr} 
                                    enLabel={form.fields.email.placeholder.en} 
                                    onSave={updateEmailPlaceholder}
                                  >
                                    {emailPlaceholder}
                                  </Tooltip>
                                } 
                                {...field} 
                                data-testid="input-email" 
                              />
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
                            <FormLabel>
                              <Tooltip 
                                frLabel={form.fields.phone.label.fr} 
                                enLabel={form.fields.phone.label.en} 
                                onSave={updatePhoneLabel}
                              >
                                {phoneLabel}
                              </Tooltip>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={
                                  <Tooltip 
                                    frLabel={form.fields.phone.placeholder.fr} 
                                    enLabel={form.fields.phone.placeholder.en} 
                                    onSave={updatePhonePlaceholder}
                                  >
                                    {phonePlaceholder}
                                  </Tooltip>
                                } 
                                {...field} 
                                data-testid="input-phone" 
                              />
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
                          <FormLabel>
                            <Tooltip 
                              frLabel={form.fields.subject.label.fr} 
                              enLabel={form.fields.subject.label.en} 
                              onSave={updateSubjectLabel}
                            >
                              {subjectLabel}
                            </Tooltip>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-subject">
                                <SelectValue 
                                  placeholder={
                                    <Tooltip 
                                      frLabel={form.fields.subject.placeholder.fr} 
                                      enLabel={form.fields.subject.placeholder.en} 
                                      onSave={updateSubjectPlaceholder}
                                    >
                                      {subjectPlaceholder}
                                    </Tooltip>
                                  } 
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {processedDepartments.map((dept, idx) => (
                                <SelectItem key={dept.value} value={dept.value}>
                                  <Tooltip 
                                    frLabel={form.departments[idx].label.fr} 
                                    enLabel={form.departments[idx].label.en} 
                                    onSave={updateDepartmentLabel(idx)}
                                  >
                                    {dept.labelText}
                                  </Tooltip>
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
                            <FormLabel>
                              <Tooltip 
                                frLabel={form.fields.arrivalDate.label.fr} 
                                enLabel={form.fields.arrivalDate.label.en} 
                                onSave={updateArrivalDateLabel}
                              >
                                {arrivalDateLabel}
                              </Tooltip>
                            </FormLabel>
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
                            <FormLabel>
                              <Tooltip 
                                frLabel={form.fields.departureDate.label.fr} 
                                enLabel={form.fields.departureDate.label.en} 
                                onSave={updateDepartureDateLabel}
                              >
                                {departureDateLabel}
                              </Tooltip>
                            </FormLabel>
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
                            <FormLabel>
                              <Tooltip 
                                frLabel={form.fields.guests.label.fr} 
                                enLabel={form.fields.guests.label.en} 
                                onSave={updateGuestsLabel}
                              >
                                {guestsLabel}
                              </Tooltip>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder={
                                  <Tooltip 
                                    frLabel={form.fields.guests.placeholder.fr} 
                                    enLabel={form.fields.guests.placeholder.en} 
                                    onSave={updateGuestsPlaceholder}
                                  >
                                    {guestsPlaceholder}
                                  </Tooltip>
                                } 
                                {...field} 
                                data-testid="input-guests" 
                              />
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
                          <FormLabel>
                            <Tooltip 
                              frLabel={form.fields.message.label.fr} 
                              enLabel={form.fields.message.label.en} 
                              onSave={updateMessageLabel}
                            >
                              {messageLabel}
                            </Tooltip>
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={
                                <Tooltip 
                                  frLabel={form.fields.message.placeholder.fr} 
                                  enLabel={form.fields.message.placeholder.en} 
                                  onSave={updateMessagePlaceholder}
                                >
                                  {messagePlaceholder}
                                </Tooltip>
                              }
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
                      <Tooltip 
                        frLabel={form.submitButton.fr} 
                        enLabel={form.submitButton.en} 
                        onSave={updateSubmitButton}
                      >
                        {submitButtonText}
                      </Tooltip>
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
                    <Tooltip 
                      frLabel={services.title.fr} 
                      enLabel={services.title.en} 
                      onSave={updateServicesTitle}
                    >
                      {servicesTitle}
                    </Tooltip>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    <Tooltip 
                      frLabel={services.subtitle.fr} 
                      enLabel={services.subtitle.en} 
                      onSave={updateServicesSubtitle}
                    >
                      {servicesSubtitle}
                    </Tooltip>
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {processedServicesList.map((service, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="text-primary flex-shrink-0">
                          {getServiceIcon(service.icon)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            <Tooltip 
                              frLabel={services.list[index].title.fr} 
                              enLabel={services.list[index].title.en} 
                              onSave={updateServiceTitle(index)}
                            >
                              {service.titleText}
                            </Tooltip>
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            <Tooltip 
                              frLabel={services.list[index].description.fr} 
                              enLabel={services.list[index].description.en} 
                              onSave={updateServiceDescription(index)}
                            >
                              {service.descriptionText}
                            </Tooltip>
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
                    <Tooltip 
                      frLabel={practicalInfo.title.fr} 
                      enLabel={practicalInfo.title.en} 
                      onSave={updatePracticalInfoTitle}
                    >
                      {practicalInfoTitle}
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      <Tooltip 
                        frLabel={practicalInfo.arrival.title.fr} 
                        enLabel={practicalInfo.arrival.title.en} 
                        onSave={updateArrivalTitle}
                      >
                        {formatAmpersand(arrivalTitle)}
                      </Tooltip>
                    </h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {arrivalDetails.map((detail, idx) => (
                        <p key={idx}>
                          • <Tooltip 
                               frLabel={practicalInfo.arrival.details[idx].fr} 
                               enLabel={practicalInfo.arrival.details[idx].en} 
                               onSave={updateArrivalDetail(idx)}
                             >
                               {detail}
                             </Tooltip>
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      <Tooltip 
                        frLabel={practicalInfo.airport.title.fr} 
                        enLabel={practicalInfo.airport.title.en} 
                        onSave={updateAirportTitle}
                      >
                        {airportTitle}
                      </Tooltip>
                    </h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {airportDetails.map((detail, idx) => (
                        <p key={idx}>
                          • <Tooltip 
                               frLabel={practicalInfo.airport.details[idx].fr} 
                               enLabel={practicalInfo.airport.details[idx].en} 
                               onSave={updateAirportDetail(idx)}
                             >
                               {detail}
                             </Tooltip>
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      <Tooltip 
                        frLabel={practicalInfo.languages.title.fr} 
                        enLabel={practicalInfo.languages.title.en} 
                        onSave={updateLanguagesTitle}
                      >
                        {languagesTitle}
                      </Tooltip>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {languagesList.map((langItem, idx) => (
                        <Badge key={idx} variant="secondary">
                          <Tooltip 
                            frLabel={practicalInfo.languages.list[idx].fr} 
                            enLabel={practicalInfo.languages.list[idx].en} 
                            onSave={updateLanguageItem(idx)}
                          >
                            {langItem}
                          </Tooltip>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hotel Location Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-foreground">
                    <Tooltip 
                      frLabel={practicalInfo.location.title.fr} 
                      enLabel={practicalInfo.location.title.en} 
                      onSave={updateLocationTitle}
                    >
                      {locationTitle}
                    </Tooltip>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    <Tooltip 
                      frLabel={practicalInfo.location.subtitle.fr} 
                      enLabel={practicalInfo.location.subtitle.en} 
                      onSave={updateLocationSubtitle}
                    >
                      {locationSubtitle}
                    </Tooltip>
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Adresse complète</p>
                        <p className="text-sm text-muted-foreground">
                          <Tooltip 
                            frLabel={practicalInfo.location.address.fr} 
                            enLabel={practicalInfo.location.address.en} 
                            onSave={updateLocationAddress}
                          >
                            <span dangerouslySetInnerHTML={{ __html: locationAddress }} />
                          </Tooltip>
                        </p>
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
                        title={
                          <Tooltip 
                            frLabel={practicalInfo.location.mapTitle.fr} 
                            enLabel={practicalInfo.location.mapTitle.en} 
                            onSave={updateLocationMapTitle}
                          >
                            {locationMapTitle}
                          </Tooltip>
                        }
                        data-testid="map-hotel-location"
                      ></iframe>
                    </div>
                    
                    <div className="text-center">
                      <Button variant="outline" data-testid="button-get-directions">
                        <Tooltip 
                          frLabel={practicalInfo.location.directionsButton.fr} 
                          enLabel={practicalInfo.location.directionsButton.en} 
                          onSave={updateLocationDirectionsButton}
                        >
                          {locationDirectionsButton}
                        </Tooltip>
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