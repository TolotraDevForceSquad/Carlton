import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Phone, Mail, MapPin, Clock, Car, Plane, Users, Calendar, MessageCircle, Send, ShoppingBag, ExternalLink } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { Tooltip } from '@/components/Tooltip';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { contactData } from '@/data/contactData';
import { useLanguage } from '@/components/context/LanguageContext';
import Footer from '@/components/Footer';

const contactFormBaseSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  subject: z.string().min(1),
  message: z.string().min(10),
  arrivalDate: z.string().optional(),
  departureDate: z.string().optional(),
  guests: z.string().optional()
});

type ContactFormData = z.infer<typeof contactFormBaseSchema>;

const SECTION_KEY = 'contact';

const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const splitContactData = (mixedData: typeof contactData) => {
  const dataFr = {
    hero: {
      title: mixedData.hero.title.fr,
      description: mixedData.hero.description.fr,
    },
    contactInfo: mixedData.contactInfo.map((ci) => ({
      icon: ci.icon,
      title: ci.title.fr,
      details: ci.details.map((d) => d.fr),
      action: ci.action.fr,
    })),
    form: {
      title: mixedData.form.title.fr,
      subtitle: mixedData.form.subtitle.fr,
      departments: mixedData.form.departments.map((d) => ({ value: d.value, label: d.label.fr })),
      fields: {
        firstName: {
          label: mixedData.form.fields.firstName.label.fr,
          placeholder: mixedData.form.fields.firstName.placeholder.fr,
          validation: { min: mixedData.form.fields.firstName.validation.min.fr },
        },
        lastName: {
          label: mixedData.form.fields.lastName.label.fr,
          placeholder: mixedData.form.fields.lastName.placeholder.fr,
          validation: { min: mixedData.form.fields.lastName.validation.min.fr },
        },
        email: {
          label: mixedData.form.fields.email.label.fr,
          placeholder: mixedData.form.fields.email.placeholder.fr,
          validation: { email: mixedData.form.fields.email.validation.email.fr },
        },
        phone: {
          label: mixedData.form.fields.phone.label.fr,
          placeholder: mixedData.form.fields.phone.placeholder.fr,
          validation: { min: mixedData.form.fields.phone.validation.min.fr },
        },
        subject: {
          label: mixedData.form.fields.subject.label.fr,
          placeholder: mixedData.form.fields.subject.placeholder.fr,
          validation: { min: mixedData.form.fields.subject.validation.min.fr },
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
          validation: { min: mixedData.form.fields.message.validation.min.fr },
        },
      },
      submitButton: mixedData.form.submitButton.fr,
    },
    services: {
      title: mixedData.services.title.fr,
      subtitle: mixedData.services.subtitle.fr,
      list: mixedData.services.list.map((s) => ({
        title: s.title.fr,
        description: s.description.fr,
        icon: s.icon,
      })),
    },
    practicalInfo: {
      title: mixedData.practicalInfo.title.fr,
      arrival: {
        title: mixedData.practicalInfo.arrival.title.fr,
        details: mixedData.practicalInfo.arrival.details.map((d) => d.fr),
      },
      airport: {
        title: mixedData.practicalInfo.airport.title.fr,
        details: mixedData.practicalInfo.airport.details.map((d) => d.fr),
      },
      languages: {
        title: mixedData.practicalInfo.languages.title.fr,
        list: mixedData.practicalInfo.languages.list.map((l) => l.fr),
      },
      location: {
        title: mixedData.practicalInfo.location.title.fr,
        subtitle: mixedData.practicalInfo.location.subtitle.fr,
        addressTitle: mixedData.practicalInfo.location.addressTitle.fr,
        address: mixedData.practicalInfo.location.address.fr,
        mapUrl: mixedData.practicalInfo.location.mapUrl,
        mapTitle: mixedData.practicalInfo.location.mapTitle.fr,
        directionsButton: mixedData.practicalInfo.location.directionsButton.fr,
      },
    },
    onlineReviews: {
      title: mixedData.onlineReviews.title.fr,
      subtitle: mixedData.onlineReviews.subtitle.fr,
      callToAction: mixedData.onlineReviews.callToAction.fr,
    },
  };

  const dataEn = {
    hero: {
      title: mixedData.hero.title.en,
      description: mixedData.hero.description.en,
    },
    contactInfo: mixedData.contactInfo.map((ci) => ({
      icon: ci.icon,
      title: ci.title.en,
      details: ci.details.map((d) => d.en),
      action: ci.action.en,
    })),
    form: {
      title: mixedData.form.title.en,
      subtitle: mixedData.form.subtitle.en,
      departments: mixedData.form.departments.map((d) => ({ value: d.value, label: d.label.en })),
      fields: {
        firstName: {
          label: mixedData.form.fields.firstName.label.en,
          placeholder: mixedData.form.fields.firstName.placeholder.en,
          validation: { min: mixedData.form.fields.firstName.validation.min.en },
        },
        lastName: {
          label: mixedData.form.fields.lastName.label.en,
          placeholder: mixedData.form.fields.lastName.placeholder.en,
          validation: { min: mixedData.form.fields.lastName.validation.min.en },
        },
        email: {
          label: mixedData.form.fields.email.label.en,
          placeholder: mixedData.form.fields.email.placeholder.en,
          validation: { email: mixedData.form.fields.email.validation.email.en },
        },
        phone: {
          label: mixedData.form.fields.phone.label.en,
          placeholder: mixedData.form.fields.phone.placeholder.en,
          validation: { min: mixedData.form.fields.phone.validation.min.en },
        },
        subject: {
          label: mixedData.form.fields.subject.label.en,
          placeholder: mixedData.form.fields.subject.placeholder.en,
          validation: { min: mixedData.form.fields.subject.validation.min.en },
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
          validation: { min: mixedData.form.fields.message.validation.min.en },
        },
      },
      submitButton: mixedData.form.submitButton.en,
    },
    services: {
      title: mixedData.services.title.en,
      subtitle: mixedData.services.subtitle.en,
      list: mixedData.services.list.map((s) => ({
        title: s.title.en,
        description: s.description.en,
        icon: s.icon,
      })),
    },
    practicalInfo: {
      title: mixedData.practicalInfo.title.en,
      arrival: {
        title: mixedData.practicalInfo.arrival.title.en,
        details: mixedData.practicalInfo.arrival.details.map((d) => d.en),
      },
      airport: {
        title: mixedData.practicalInfo.airport.title.en,
        details: mixedData.practicalInfo.airport.details.map((d) => d.en),
      },
      languages: {
        title: mixedData.practicalInfo.languages.title.en,
        list: mixedData.practicalInfo.languages.list.map((l) => l.en),
      },
      location: {
        title: mixedData.practicalInfo.location.title.en,
        subtitle: mixedData.practicalInfo.location.subtitle.en,
        addressTitle: mixedData.practicalInfo.location.addressTitle.en,
        address: mixedData.practicalInfo.location.address.en,
        mapUrl: mixedData.practicalInfo.location.mapUrl,
        mapTitle: mixedData.practicalInfo.location.mapTitle.en,
        directionsButton: mixedData.practicalInfo.location.directionsButton.en,
      },
    },
    onlineReviews: {
      title: mixedData.onlineReviews.title.en,
      subtitle: mixedData.onlineReviews.subtitle.en,
      callToAction: mixedData.onlineReviews.callToAction.en,
    },
  };

  return { dataFr, dataEn };
};

const reconstructMixed = (dataFr: any, dataEn: any | null) => {
  const enFallback = dataEn || dataFr;
  const hero = {
    title: { fr: dataFr.hero.title, en: enFallback.hero.title },
    description: { fr: dataFr.hero.description, en: enFallback.hero.description },
  };
  const contactInfo = dataFr.contactInfo.map((ciFr: any, i: number) => {
    const ciEn = enFallback.contactInfo[i];
    const details = ciFr.details.map((dFr: string, j: number) => ({
      fr: dFr,
      en: ciEn.details[j],
    }));
    return {
      icon: ciFr.icon,
      title: { fr: ciFr.title, en: ciEn.title },
      details,
      action: { fr: ciFr.action, en: ciEn.action },
    };
  });
  const formFields = {
    firstName: {
      label: { fr: dataFr.form.fields.firstName.label, en: enFallback.form.fields.firstName.label },
      placeholder: { fr: dataFr.form.fields.firstName.placeholder, en: enFallback.form.fields.firstName.placeholder },
      validation: { min: { fr: dataFr.form.fields.firstName.validation.min, en: enFallback.form.fields.firstName.validation.min } },
    },
    lastName: {
      label: { fr: dataFr.form.fields.lastName.label, en: enFallback.form.fields.lastName.label },
      placeholder: { fr: dataFr.form.fields.lastName.placeholder, en: enFallback.form.fields.lastName.placeholder },
      validation: { min: { fr: dataFr.form.fields.lastName.validation.min, en: enFallback.form.fields.lastName.validation.min } },
    },
    email: {
      label: { fr: dataFr.form.fields.email.label, en: enFallback.form.fields.email.label },
      placeholder: { fr: dataFr.form.fields.email.placeholder, en: enFallback.form.fields.email.placeholder },
      validation: { email: { fr: dataFr.form.fields.email.validation.email, en: enFallback.form.fields.email.validation.email } },
    },
    phone: {
      label: { fr: dataFr.form.fields.phone.label, en: enFallback.form.fields.phone.label },
      placeholder: { fr: dataFr.form.fields.phone.placeholder, en: enFallback.form.fields.phone.placeholder },
      validation: { min: { fr: dataFr.form.fields.phone.validation.min, en: enFallback.form.fields.phone.validation.min } },
    },
    subject: {
      label: { fr: dataFr.form.fields.subject.label, en: enFallback.form.fields.subject.label },
      placeholder: { fr: dataFr.form.fields.subject.placeholder, en: enFallback.form.fields.subject.placeholder },
      validation: { min: { fr: dataFr.form.fields.subject.validation.min, en: enFallback.form.fields.subject.validation.min } },
    },
    arrivalDate: {
      label: { fr: dataFr.form.fields.arrivalDate.label, en: enFallback.form.fields.arrivalDate.label },
    },
    departureDate: {
      label: { fr: dataFr.form.fields.departureDate.label, en: enFallback.form.fields.departureDate.label },
    },
    guests: {
      label: { fr: dataFr.form.fields.guests.label, en: enFallback.form.fields.guests.label },
      placeholder: { fr: dataFr.form.fields.guests.placeholder, en: enFallback.form.fields.guests.placeholder },
    },
    message: {
      label: { fr: dataFr.form.fields.message.label, en: enFallback.form.fields.message.label },
      placeholder: { fr: dataFr.form.fields.message.placeholder, en: enFallback.form.fields.message.placeholder },
      validation: { min: { fr: dataFr.form.fields.message.validation.min, en: enFallback.form.fields.message.validation.min } },
    },
  };
  const departments = dataFr.form.departments.map((dFr: any, i: number) => ({
    value: dFr.value,
    label: { fr: dFr.label, en: enFallback.form.departments[i].label },
  }));
  const form = {
    title: { fr: dataFr.form.title, en: enFallback.form.title },
    subtitle: { fr: dataFr.form.subtitle, en: enFallback.form.subtitle },
    departments,
    fields: formFields,
    submitButton: { fr: dataFr.form.submitButton, en: enFallback.form.submitButton },
  };
  const servicesList = dataFr.services.list.map((sFr: any, i: number) => ({
    title: { fr: sFr.title, en: enFallback.services.list[i].title },
    description: { fr: sFr.description, en: enFallback.services.list[i].description },
    icon: sFr.icon,
  }));
  const services = {
    title: { fr: dataFr.services.title, en: enFallback.services.title },
    subtitle: { fr: dataFr.services.subtitle, en: enFallback.services.subtitle },
    list: servicesList,
  };
  const arrivalDetails = dataFr.practicalInfo.arrival.details.map((dFr: string, j: number) => ({
    fr: dFr,
    en: enFallback.practicalInfo.arrival.details[j],
  }));
  const airportDetails = dataFr.practicalInfo.airport.details.map((dFr: string, j: number) => ({
    fr: dFr,
    en: enFallback.practicalInfo.airport.details[j],
  }));
  const languagesList = dataFr.practicalInfo.languages.list.map((lFr: string, j: number) => ({
    fr: lFr,
    en: enFallback.practicalInfo.languages.list[j],
  }));
  const location = {
    title: { fr: dataFr.practicalInfo.location.title, en: enFallback.practicalInfo.location.title },
    subtitle: { fr: dataFr.practicalInfo.location.subtitle, en: enFallback.practicalInfo.location.subtitle },
    addressTitle: { fr: dataFr.practicalInfo.location.addressTitle, en: enFallback.practicalInfo.location.addressTitle },
    address: { fr: dataFr.practicalInfo.location.address, en: enFallback.practicalInfo.location.address },
    mapUrl: dataFr.practicalInfo.location.mapUrl,
    mapTitle: { fr: dataFr.practicalInfo.location.mapTitle, en: enFallback.practicalInfo.location.mapTitle },
    directionsButton: { fr: dataFr.practicalInfo.location.directionsButton, en: enFallback.practicalInfo.location.directionsButton },
  };
  const practicalInfo = {
    title: { fr: dataFr.practicalInfo.title, en: enFallback.practicalInfo.title },
    arrival: {
      title: { fr: dataFr.practicalInfo.arrival.title, en: enFallback.practicalInfo.arrival.title },
      details: arrivalDetails,
    },
    airport: {
      title: { fr: dataFr.practicalInfo.airport.title, en: enFallback.practicalInfo.airport.title },
      details: airportDetails,
    },
    languages: {
      title: { fr: dataFr.practicalInfo.languages.title, en: enFallback.practicalInfo.languages.title },
      list: languagesList,
    },
    location,
  };
  const onlineReviews = {
    title: { fr: dataFr.onlineReviews.title, en: enFallback.onlineReviews.title },
    subtitle: { fr: dataFr.onlineReviews.subtitle, en: enFallback.onlineReviews.subtitle },
    callToAction: { fr: dataFr.onlineReviews.callToAction, en: enFallback.onlineReviews.callToAction },
  };
  return { hero, contactInfo, form, services, practicalInfo, onlineReviews };
};

const Contact = () => {
  const { currentLang } = useLanguage();
  const langKey = currentLang.code.toLowerCase() as 'fr' | 'en';
  const [data, setData] = useState(contactData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getContactFormSchema = useCallback((lang: 'fr' | 'en', currentData: typeof contactData) => {
    return contactFormBaseSchema.refine((val) => true, {
      firstName: currentData.form.fields.firstName.validation.min[lang],
      lastName: currentData.form.fields.lastName.validation.min[lang],
      email: currentData.form.fields.email.validation.email[lang],
      phone: currentData.form.fields.phone.validation.min[lang],
      subject: currentData.form.fields.subject.validation.min[lang],
      message: currentData.form.fields.message.validation.min[lang],
    });
  }, []);

  const schema = useMemo(() => getContactFormSchema(langKey, data), [langKey, data, getContactFormSchema]);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      arrivalDate: "",
      departureDate: "",
      guests: "",
    },
  });

  const currentDepartments = useMemo(
    () => data.form.departments.map((d) => ({ value: d.value, label: d.label[langKey] })),
    [data, langKey]
  );

  const onSubmit = (dataForm: ContactFormData) => {
    console.log("Formulaire soumis:", dataForm);
    // Ici on traiterait normalement l'envoi du formulaire vers le backend
  };

  const contactIcons = {
    Phone,
    Mail,
    MapPin,
    Clock,
  } as const;

  const serviceIcons = {
    Calendar,
    Users,
    Plane,
    Car,
  } as const;

  const updateContactSection = useCallback(async (updatedMixedData: typeof contactData) => {
    try {
      const headers = getAuthHeaders();
      let currentSectionResponse = await fetch(`/api/globalSections?sectionKey=${SECTION_KEY}`, { headers });
      let currentData: any[] = [];
      if (currentSectionResponse.ok) {
        currentData = await currentSectionResponse.json();
      }
      let currentSection = currentData.find((s: any) => s.sectionKey === SECTION_KEY);
      if (!currentSection) {
        const { dataFr, dataEn } = splitContactData(contactData);
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
          dataEn: Object.keys(updatedDataEn).length > 0 ? updatedDataEn : null,
        }),
      });
      if (!putResponse.ok) {
        throw new Error('Failed to update contact section');
      }
    } catch (err) {
      console.error('Error updating contact section:', err);
    }
  }, []);

  const updateGeneric = useCallback(
    (updater: (current: typeof data) => typeof data) => async () => {
      const updatedData = updater(data);
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateHeroTitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        hero: { ...data.hero, title: { fr: newFr, en: newEn } },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateHeroDescription = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        hero: { ...data.hero, description: { fr: newFr, en: newEn } },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateContactInfoTitle = useCallback(
    (index: number) =>
      async (newFr: string, newEn: string) => {
        const updatedData = {
          ...data,
          contactInfo: data.contactInfo.map((ci, i) =>
            i === index ? { ...ci, title: { fr: newFr, en: newEn } } : ci
          ),
        };
        setData(updatedData);
        await updateContactSection(updatedData);
      },
    [data, updateContactSection]
  );

  const updateContactInfoAction = useCallback(
    (index: number) =>
      async (newFr: string, newEn: string) => {
        const updatedData = {
          ...data,
          contactInfo: data.contactInfo.map((ci, i) =>
            i === index ? { ...ci, action: { fr: newFr, en: newEn } } : ci
          ),
        };
        setData(updatedData);
        await updateContactSection(updatedData);
      },
    [data, updateContactSection]
  );

  const updateContactInfoDetails = useCallback(
    (index: number) =>
      async (newFr: string, newEn: string) => {
        const detailsFr = newFr.split('\n').map((s) => s.trim()).filter(Boolean);
        const detailsEn = newEn.split('\n').map((s) => s.trim()).filter(Boolean);
        const maxLen = Math.max(detailsFr.length, detailsEn.length);
        const newDetails = Array.from({ length: maxLen }, (_, j) => ({
          fr: detailsFr[j] || '',
          en: detailsEn[j] || '',
        }));
        const updatedData = {
          ...data,
          contactInfo: data.contactInfo.map((ci, i) =>
            i === index ? { ...ci, details: newDetails } : ci
          ),
        };
        setData(updatedData);
        await updateContactSection(updatedData);
      },
    [data, updateContactSection]
  );

  const updateFormTitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        form: { ...data.form, title: { fr: newFr, en: newEn } },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateFormSubtitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        form: { ...data.form, subtitle: { fr: newFr, en: newEn } },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateFormSubmitButton = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        form: { ...data.form, submitButton: { fr: newFr, en: newEn } },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateFormFieldLabel = useCallback(
    (fieldName: keyof typeof data.form.fields) =>
      async (newFr: string, newEn: string) => {
        const updatedData = {
          ...data,
          form: {
            ...data.form,
            fields: {
              ...data.form.fields,
              [fieldName]: {
                ...data.form.fields[fieldName],
                label: { fr: newFr, en: newEn },
              },
            },
          },
        };
        setData(updatedData);
        await updateContactSection(updatedData);
      },
    [data, updateContactSection]
  );

  const updateServicesTitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        services: { ...data.services, title: { fr: newFr, en: newEn } },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateServicesSubtitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        services: { ...data.services, subtitle: { fr: newFr, en: newEn } },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateServiceTitle = useCallback(
    (index: number) =>
      async (newFr: string, newEn: string) => {
        const updatedData = {
          ...data,
          services: {
            ...data.services,
            list: data.services.list.map((s, i) =>
              i === index ? { ...s, title: { fr: newFr, en: newEn } } : s
            ),
          },
        };
        setData(updatedData);
        await updateContactSection(updatedData);
      },
    [data, updateContactSection]
  );

  const updateServiceDescription = useCallback(
    (index: number) =>
      async (newFr: string, newEn: string) => {
        const updatedData = {
          ...data,
          services: {
            ...data.services,
            list: data.services.list.map((s, i) =>
              i === index ? { ...s, description: { fr: newFr, en: newEn } } : s
            ),
          },
        };
        setData(updatedData);
        await updateContactSection(updatedData);
      },
    [data, updateContactSection]
  );

  const updatePracticalInfoTitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        practicalInfo: { ...data.practicalInfo, title: { fr: newFr, en: newEn } },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateArrivalTitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        practicalInfo: {
          ...data.practicalInfo,
          arrival: { ...data.practicalInfo.arrival, title: { fr: newFr, en: newEn } },
        },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateArrivalDetails = useCallback(
    async (newFr: string, newEn: string) => {
      const detailsFr = newFr.split('\n').map((s) => s.trim()).filter(Boolean);
      const detailsEn = newEn.split('\n').map((s) => s.trim()).filter(Boolean);
      const maxLen = Math.max(detailsFr.length, detailsEn.length);
      const newDetails = Array.from({ length: maxLen }, (_, j) => ({
        fr: detailsFr[j] || '',
        en: detailsEn[j] || '',
      }));
      const updatedData = {
        ...data,
        practicalInfo: {
          ...data.practicalInfo,
          arrival: { ...data.practicalInfo.arrival, details: newDetails },
        },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateAirportTitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        practicalInfo: {
          ...data.practicalInfo,
          airport: { ...data.practicalInfo.airport, title: { fr: newFr, en: newEn } },
        },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateAirportDetails = useCallback(
    async (newFr: string, newEn: string) => {
      const detailsFr = newFr.split('\n').map((s) => s.trim()).filter(Boolean);
      const detailsEn = newEn.split('\n').map((s) => s.trim()).filter(Boolean);
      const maxLen = Math.max(detailsFr.length, detailsEn.length);
      const newDetails = Array.from({ length: maxLen }, (_, j) => ({
        fr: detailsFr[j] || '',
        en: detailsEn[j] || '',
      }));
      const updatedData = {
        ...data,
        practicalInfo: {
          ...data.practicalInfo,
          airport: { ...data.practicalInfo.airport, details: newDetails },
        },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateLanguagesTitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        practicalInfo: {
          ...data.practicalInfo,
          languages: { ...data.practicalInfo.languages, title: { fr: newFr, en: newEn } },
        },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateLanguagesList = useCallback(
    async (newFr: string, newEn: string) => {
      const listFr = newFr.split(',').map((s) => s.trim()).filter(Boolean);
      const listEn = newEn.split(',').map((s) => s.trim()).filter(Boolean);
      const maxLen = Math.max(listFr.length, listEn.length);
      const newList = Array.from({ length: maxLen }, (_, j) => ({
        fr: listFr[j] || '',
        en: listEn[j] || '',
      }));
      const updatedData = {
        ...data,
        practicalInfo: {
          ...data.practicalInfo,
          languages: { ...data.practicalInfo.languages, list: newList },
        },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateLocationTitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        practicalInfo: {
          ...data.practicalInfo,
          location: { ...data.practicalInfo.location, title: { fr: newFr, en: newEn } },
        },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateLocationSubtitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        practicalInfo: {
          ...data.practicalInfo,
          location: { ...data.practicalInfo.location, subtitle: { fr: newFr, en: newEn } },
        },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateLocationAddressTitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        practicalInfo: {
          ...data.practicalInfo,
          location: { ...data.practicalInfo.location, addressTitle: { fr: newFr, en: newEn } },
        },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateLocationAddress = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedAddressFr = newFr.replace(/\n/g, '<br/>');
      const updatedAddressEn = newEn.replace(/\n/g, '<br/>');
      const updatedData = {
        ...data,
        practicalInfo: {
          ...data.practicalInfo,
          location: { ...data.practicalInfo.location, address: { fr: updatedAddressFr, en: updatedAddressEn } },
        },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateLocationMapTitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        practicalInfo: {
          ...data.practicalInfo,
          location: { ...data.practicalInfo.location, mapTitle: { fr: newFr, en: newEn } },
        },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateLocationDirectionsButton = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        practicalInfo: {
          ...data.practicalInfo,
          location: { ...data.practicalInfo.location, directionsButton: { fr: newFr, en: newEn } },
        },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateOnlineReviewsTitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        onlineReviews: { ...data.onlineReviews, title: { fr: newFr, en: newEn } },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateOnlineReviewsSubtitle = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        onlineReviews: { ...data.onlineReviews, subtitle: { fr: newFr, en: newEn } },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

  const updateOnlineReviewsCallToAction = useCallback(
    async (newFr: string, newEn: string) => {
      const updatedData = {
        ...data,
        onlineReviews: { ...data.onlineReviews, callToAction: { fr: newFr, en: newEn } },
      };
      setData(updatedData);
      await updateContactSection(updatedData);
    },
    [data, updateContactSection]
  );

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
          const { dataFr, dataEn } = splitContactData(contactData);
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
          section = created;
        }
        if (section) {
          const fetchedData = reconstructMixed(section.dataFr, section.dataEn);
          setData(fetchedData);
        } else {
          setData(contactData);
        }
      } catch (err) {
        console.error('Error fetching contact data:', err);
        setError('Failed to load contact data');
        setData(contactData);
      } finally {
        setLoading(false);
      }
    };
    fetchContactData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-foreground">Chargement des données de contact...</div>
      </div>
    );
  }

  if (error) {
    console.warn(error);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-background to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Tooltip frLabel={data.hero.title.fr} enLabel={data.hero.title.en} onSave={updateHeroTitle}>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
                {formatAmpersand(data.hero.title[langKey])}
              </h1>
            </Tooltip>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <Tooltip frLabel={data.hero.description.fr} enLabel={data.hero.description.en} onSave={updateHeroDescription}>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {data.hero.description[langKey]}
              </p>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {data.contactInfo.map((info, index) => {
              const IconComponent = contactIcons[info.icon as keyof typeof contactIcons];
              const detailsTextFr = info.details.map((d) => d.fr).join('\n');
              const detailsTextEn = info.details.map((d) => d.en).join('\n');
              return (
                <Card key={index} className="text-center hover-elevate">
                  <CardContent className="pt-6">
                    <div className="text-primary mb-4 flex justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <Tooltip frLabel={info.title.fr} enLabel={info.title.en} onSave={updateContactInfoTitle(index)}>
                      <h3 className="text-lg font-semibold text-foreground mb-3">{info.title[langKey]}</h3>
                    </Tooltip>
                    <Tooltip frLabel={detailsTextFr} enLabel={detailsTextEn} onSave={updateContactInfoDetails(index)}>
                      <div className="space-y-1 mb-4">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground text-sm">
                            {detail[langKey]}
                          </p>
                        ))}
                      </div>
                    </Tooltip>
                    <Button variant="outline" size="sm" data-testid={`button-contact-${index}`}>
                      <Tooltip frLabel={info.action.fr} enLabel={info.action.en} onSave={updateContactInfoAction(index)}>
                        <span>{info.action[langKey]}</span>
                      </Tooltip>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
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
                  <Tooltip frLabel={data.form.title.fr} enLabel={data.form.title.en} onSave={updateFormTitle}>
                    <span>{data.form.title[langKey]}</span>
                  </Tooltip>
                </CardTitle>
                <Tooltip frLabel={data.form.subtitle.fr} enLabel={data.form.subtitle.en} onSave={updateFormSubtitle}>
                  <p className="text-muted-foreground">{data.form.subtitle[langKey]}</p>
                </Tooltip>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <Tooltip
                                frLabel={data.form.fields.firstName.label.fr}
                                enLabel={data.form.fields.firstName.label.en}
                                onSave={updateFormFieldLabel('firstName')}
                              >
                                <span>{data.form.fields.firstName.label[langKey]}</span>
                              </Tooltip>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={data.form.fields.firstName.placeholder[langKey]}
                                {...field}
                                data-testid="input-firstname"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <Tooltip
                                frLabel={data.form.fields.lastName.label.fr}
                                enLabel={data.form.fields.lastName.label.en}
                                onSave={updateFormFieldLabel('lastName')}
                              >
                                <span>{data.form.fields.lastName.label[langKey]}</span>
                              </Tooltip>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={data.form.fields.lastName.placeholder[langKey]}
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
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <Tooltip
                                frLabel={data.form.fields.email.label.fr}
                                enLabel={data.form.fields.email.label.en}
                                onSave={updateFormFieldLabel('email')}
                              >
                                <span>{data.form.fields.email.label[langKey]}</span>
                              </Tooltip>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder={data.form.fields.email.placeholder[langKey]}
                                {...field}
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <Tooltip
                                frLabel={data.form.fields.phone.label.fr}
                                enLabel={data.form.fields.phone.label.en}
                                onSave={updateFormFieldLabel('phone')}
                              >
                                <span>{data.form.fields.phone.label[langKey]}</span>
                              </Tooltip>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={data.form.fields.phone.placeholder[langKey]}
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
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <Tooltip
                              frLabel={data.form.fields.subject.label.fr}
                              enLabel={data.form.fields.subject.label.en}
                              onSave={updateFormFieldLabel('subject')}
                            >
                              <span>{data.form.fields.subject.label[langKey]}</span>
                            </Tooltip>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-subject">
                                <SelectValue placeholder={data.form.fields.subject.placeholder[langKey]} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {currentDepartments.map((dept) => (
                                <SelectItem key={dept.value} value={dept.value}>
                                  {dept.label}
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
                        control={form.control}
                        name="arrivalDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <Tooltip
                                frLabel={data.form.fields.arrivalDate.label.fr}
                                enLabel={data.form.fields.arrivalDate.label.en}
                                onSave={updateFormFieldLabel('arrivalDate')}
                              >
                                <span>{data.form.fields.arrivalDate.label[langKey]}</span>
                              </Tooltip>
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-arrival" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="departureDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <Tooltip
                                frLabel={data.form.fields.departureDate.label.fr}
                                enLabel={data.form.fields.departureDate.label.en}
                                onSave={updateFormFieldLabel('departureDate')}
                              >
                                <span>{data.form.fields.departureDate.label[langKey]}</span>
                              </Tooltip>
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-departure" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="guests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <Tooltip
                                frLabel={data.form.fields.guests.label.fr}
                                enLabel={data.form.fields.guests.label.en}
                                onSave={updateFormFieldLabel('guests')}
                              >
                                <span>{data.form.fields.guests.label[langKey]}</span>
                              </Tooltip>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={data.form.fields.guests.placeholder[langKey]}
                                {...field}
                                data-testid="input-guests"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <Tooltip
                              frLabel={data.form.fields.message.label.fr}
                              enLabel={data.form.fields.message.label.en}
                              onSave={updateFormFieldLabel('message')}
                            >
                              <span>{data.form.fields.message.label[langKey]}</span>
                            </Tooltip>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={data.form.fields.message.placeholder[langKey]}
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
                      <Tooltip frLabel={data.form.submitButton.fr} enLabel={data.form.submitButton.en} onSave={updateFormSubmitButton}>
                        <span>{data.form.submitButton[langKey]}</span>
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
                  <Tooltip frLabel={data.services.title.fr} enLabel={data.services.title.en} onSave={updateServicesTitle}>
                    <CardTitle className="text-xl font-serif text-foreground">{data.services.title[langKey]}</CardTitle>
                  </Tooltip>
                  <Tooltip frLabel={data.services.subtitle.fr} enLabel={data.services.subtitle.en} onSave={updateServicesSubtitle}>
                    <p className="text-muted-foreground">{data.services.subtitle[langKey]}</p>
                  </Tooltip>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.services.list.map((service, index) => {
                      const IconComponent = serviceIcons[service.icon as keyof typeof serviceIcons];
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className="text-primary flex-shrink-0">
                            <IconComponent className="w-8 h-8" />
                          </div>
                          <div>
                            <Tooltip frLabel={service.title.fr} enLabel={service.title.en} onSave={updateServiceTitle(index)}>
                              <h4 className="font-semibold text-foreground mb-1">{service.title[langKey]}</h4>
                            </Tooltip>
                            <Tooltip frLabel={service.description.fr} enLabel={service.description.en} onSave={updateServiceDescription(index)}>
                              <p className="text-sm text-muted-foreground">{service.description[langKey]}</p>
                            </Tooltip>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Tooltip frLabel={data.practicalInfo.title.fr} enLabel={data.practicalInfo.title.en} onSave={updatePracticalInfoTitle}>
                    <CardTitle className="text-xl font-serif text-foreground">{data.practicalInfo.title[langKey]}</CardTitle>
                  </Tooltip>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Tooltip frLabel={data.practicalInfo.arrival.title.fr} enLabel={data.practicalInfo.arrival.title.en} onSave={updateArrivalTitle}>
                      <h4 className="font-semibold text-foreground mb-2">{formatAmpersand(data.practicalInfo.arrival.title[langKey])}</h4>
                    </Tooltip>
                    <Tooltip
                      frLabel={data.practicalInfo.arrival.details.map((d) => d.fr).join('\n')}
                      enLabel={data.practicalInfo.arrival.details.map((d) => d.en).join('\n')}
                      onSave={updateArrivalDetails}
                    >
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {data.practicalInfo.arrival.details.map((detail, idx) => (
                          <p key={idx}>• {detail[langKey]}</p>
                        ))}
                      </div>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip frLabel={data.practicalInfo.airport.title.fr} enLabel={data.practicalInfo.airport.title.en} onSave={updateAirportTitle}>
                      <h4 className="font-semibold text-foreground mb-2">{data.practicalInfo.airport.title[langKey]}</h4>
                    </Tooltip>
                    <Tooltip
                      frLabel={data.practicalInfo.airport.details.map((d) => d.fr).join('\n')}
                      enLabel={data.practicalInfo.airport.details.map((d) => d.en).join('\n')}
                      onSave={updateAirportDetails}
                    >
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {data.practicalInfo.airport.details.map((detail, idx) => (
                          <p key={idx}>• {detail[langKey]}</p>
                        ))}
                      </div>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip frLabel={data.practicalInfo.languages.title.fr} enLabel={data.practicalInfo.languages.title.en} onSave={updateLanguagesTitle}>
                      <h4 className="font-semibold text-foreground mb-2">{data.practicalInfo.languages.title[langKey]}</h4>
                    </Tooltip>
                    <Tooltip
                      frLabel={data.practicalInfo.languages.list.map((l) => l.fr).join(', ')}
                      enLabel={data.practicalInfo.languages.list.map((l) => l.en).join(', ')}
                      onSave={updateLanguagesList}
                    >
                      <div className="flex flex-wrap gap-2">
                        {data.practicalInfo.languages.list.map((langObj, i) => (
                          <Badge key={i} variant="secondary">
                            {langObj[langKey]}
                          </Badge>
                        ))}
                      </div>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>

              {/* Online Reviews */}
              <Card>
                <CardHeader>
                  <Tooltip frLabel={data.onlineReviews.title.fr} enLabel={data.onlineReviews.title.en} onSave={updateOnlineReviewsTitle}>
                    <CardTitle className="text-xl font-serif text-foreground">{data.onlineReviews.title[langKey]}</CardTitle>
                  </Tooltip>
                  <Tooltip frLabel={data.onlineReviews.subtitle.fr} enLabel={data.onlineReviews.subtitle.en} onSave={updateOnlineReviewsSubtitle}>
                    <p className="text-muted-foreground">{data.onlineReviews.subtitle[langKey]}</p>
                  </Tooltip>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <Tooltip frLabel={data.onlineReviews.callToAction.fr} enLabel={data.onlineReviews.callToAction.en} onSave={updateOnlineReviewsCallToAction}>
                    <p className="text-lg font-semibold text-foreground">{data.onlineReviews.callToAction[langKey]}</p>
                  </Tooltip>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" asChild size="lg">
                      <a href="https://g.page/r/CWQgJ2tAtguBEAE/review" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Google
                      </a>
                    </Button>
                    <Button variant="outline" asChild size="lg">
                      <a
                        href="https://www.tripadvisor.com/UserReviewEdit-g293809-d300675-Hotel_Carlton_Madagascar-Antananarivo_Antananarivo_Province.html"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Tripadvisor
                      </a>
                    </Button>
                    <Button variant="outline" asChild size="lg">
                      <a
                        href="https://www.tripadvisor.fr/Hotel_Review-g293809-d300675-Reviews-Hotel_Carlton_Madagascar-Antananarivo_Antananarivo_Province.html?m=19905"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Booking
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Hotel Location Map */}
              <Card>
                <CardHeader>
                  <Tooltip frLabel={data.practicalInfo.location.title.fr} enLabel={data.practicalInfo.location.title.en} onSave={updateLocationTitle}>
                    <CardTitle className="text-xl font-serif text-foreground">{data.practicalInfo.location.title[langKey]}</CardTitle>
                  </Tooltip>
                  <Tooltip frLabel={data.practicalInfo.location.subtitle.fr} enLabel={data.practicalInfo.location.subtitle.en} onSave={updateLocationSubtitle}>
                    <p className="text-muted-foreground">{data.practicalInfo.location.subtitle[langKey]}</p>
                  </Tooltip>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <Tooltip
                          frLabel={data.practicalInfo.location.addressTitle.fr}
                          enLabel={data.practicalInfo.location.addressTitle.en}
                          onSave={updateLocationAddressTitle}
                        >
                          <p className="font-semibold text-foreground">{data.practicalInfo.location.addressTitle[langKey]}</p>
                        </Tooltip>
                        <Tooltip
                          frLabel={data.practicalInfo.location.address.fr.replace(/<br\s*\/?>/gi, '\n')}
                          enLabel={data.practicalInfo.location.address.en.replace(/<br\s*\/?>/gi, '\n')}
                          onSave={updateLocationAddress}
                        >
                          <p
                            className="text-sm text-muted-foreground"
                            dangerouslySetInnerHTML={{ __html: data.practicalInfo.location.address[langKey] }}
                          />
                        </Tooltip>
                      </div>
                    </div>

                    <div className="w-full h-64 bg-card rounded-lg overflow-hidden border">
                      <iframe
                        src={data.practicalInfo.location.mapUrl}
                        width="100%"
                        height="256"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={data.practicalInfo.location.mapTitle[langKey]}
                        data-testid="map-hotel-location"
                      ></iframe>
                    </div>

                    <div className="text-center">
                      <Button variant="outline" asChild data-testid="button-get-directions">
                        <a
                          href="https://www.google.com/maps/dir/?api=1&destination=Rue%20Pierre%20Stibbe%20Anosy%2C%20Antananarivo%20101%2C%20Madagascar"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          <Tooltip
                            frLabel={data.practicalInfo.location.directionsButton.fr}
                            enLabel={data.practicalInfo.location.directionsButton.en}
                            onSave={updateLocationDirectionsButton}
                          >
                            <span>{data.practicalInfo.location.directionsButton[langKey]}</span>
                          </Tooltip>
                        </a>
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