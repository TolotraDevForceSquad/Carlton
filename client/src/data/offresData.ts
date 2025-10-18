// src/data/offresData.ts
export const offresPageData = {
  hero: {
    title: {
      fr: "Offres Spéciales",
      en: "Special Offers"
    },
    description: {
      fr: "Découvrez nos séjours d'exception conçus pour créer des souvenirs inoubliables au cœur de Madagascar",
      en: "Discover our exceptional stays designed to create unforgettable memories in the heart of Madagascar"
    }
  },
  offerFeaturesTitle: {
    fr: "Cette offre comprend :",
    en: "This offer includes :"
  },
  seasonalSection: {
    title: { fr: "Événements Spéciaux", en: "Special Events" },
    description: {
      fr: "",
      en: ""
    },
    show: true,
  },
  offers: [
    {
      id: 1,
      title: {
        fr: "Business Lunch",
        en: "Business Lunch"
      },
      subtitle: {
        fr: "Menu déjeuner à 2 ou 3 services au choix",
        en: "Lunch menu with 2 or 3 courses to choose"
      },
      description: {
        fr: "Un déjeuner en 2 ou 3 plats selon vos envies. Concocté avec soin pour s’adapter à votre emploi du temps, il est servi dans un rythme fluide, sans compromis sur la qualité. Une formule parfaite pour votre pause déjeuner ou une rencontre professionnelle.",
        en: "A lunch menu in 2 or 3 dishes according to your wishes. Carefully prepared to fit your schedule, served at a smooth pace without compromising on quality. The perfect formula for your lunch break or a professional meeting."
      },
      duration: {
        fr: "Du lundi au vendredi, de 12h à 14h30",
        en: "Monday to Friday, 12pm to 2:30pm"
      },
      category: {
        fr: "Déjeuner d'affaires",
        en: "Business Lunch"
      },
      features: [
        {
          fr: "Menu à 2 services : Entrée + Plat ou Plat + Dessert à 64 000 Ariary",
          en: "2-course menu: Starter + Main or Main + Dessert at 64,000 Ariary"
        },
        {
          fr: "Menu à 3 services : Entrée + Plat + Dessert à 73 000 Ariary",
          en: "3-course menu: Starter + Main + Dessert at 73,000 Ariary"
        }
      ],
      validUntil: {
        fr: "",
        en: ""
      },
      highlight: null,
      image: '/uploads/Offre.png',
      hidden: false
    },
    {
      id: 2,
      title: {
        fr: "L’Apéro du Chef",
        en: "The Chef's Aperitif"
      },
      subtitle: {
        fr: "Suggestion d’apéro sur ardoise du Chef",
        en: "Chef's chalkboard aperitif suggestion"
      },
      description: {
        fr: "Des assiettes d’amuse-bouches salés au choix, variés et savoureux, à partager — ou pas. Parfait pour se détendre en fin de journée, que vous soyez seul ou entre amis, après une longue journée. Un moment de plaisir simple, gourmand et bien mérité.",
        en: "Plates of savory amuse-bouches to choose from, varied and tasty, to share—or not. Perfect for unwinding at the end of the day, whether alone or with friends, after a long day. A simple, indulgent, and well-deserved moment of pleasure."
      },
      duration: {
        fr: "Du lundi au vendredi à partir de 17h à 19h",
        en: "Monday to Friday from 5pm to 7pm"
      },
      category: {
        fr: "Apéritif",
        en: "Aperitif"
      },
      features: [
        {
          fr: "28 000 Ariary",
          en: "28,000 Ariary"
        },
        {
          fr: "Assiettes d’amuse-bouches salés au choix, variés et savoureux",
          en: "Plates of savory amuse-bouches to choose from, varied and tasty"
        }
      ],
      validUntil: {
        fr: "",
        en: ""
      },
      highlight: null,
      image: '/uploads/Offre.png',
      hidden: false
    },
    {
      id: 3,
      title: {
        fr: "Yoga",
        en: "Yoga"
      },
      subtitle: {
        fr: "Tous les samedis à 8h",
        en: "Every Saturday at 8am"
      },
      description: {
        fr: "Commencez votre week-end en douceur avec une séance de yoga d’une heure, un rituel parfait pour relâcher la pression du quotidien et retrouver l’équilibre. Un petit-déjeuner est offert à la fin de séance pour prolonger cette pause de bien-être.",
        en: "Start your weekend gently with a one-hour yoga session, a perfect ritual to release daily stress and regain balance. A breakfast is offered at the end of the session to extend this wellness break."
      },
      duration: {
        fr: "Tous les samedis à 8h",
        en: "Every Saturday at 8am"
      },
      category: {
        fr: "Bien-être",
        en: "Wellness"
      },
      features: [
        {
          fr: "50 000 Ariary avec petit-déjeuner",
          en: "50,000 Ariary with breakfast"
        },
        {
          fr: "Séance de yoga d’une heure",
          en: "One-hour yoga session"
        }
      ],
      validUntil: {
        fr: "",
        en: ""
      },
      highlight: null,
      image: '/uploads/Offre.png',
      hidden: false
    }
  ],
  seasonalOffers: [
    {
      title: {
        fr: "Soirée Jazz",
        en: "Jazz Evening"
      },
      period: {
        fr: "Chaque vendredi",
        en: "Every Friday"
      },
      description: {
        fr: "Ambiance musicale exceptionnelle avec nos musiciens jazz dans le cadre élégant du Bistrot du Carlton",
        en: "Exceptional musical atmosphere with our jazz musicians in the elegant setting of the Bistrot du Carlton"
      },
      image: '/uploads/Env.png',
      hidden: false
    },
    {
      title: {
        fr: "Brunch Dominical",
        en: "Sunday Brunch"
      },
      period: {
        fr: "Tous les dimanches",
        en: "Every Sunday"
      },
      description: {
        fr: "Un buffet gastronomique exceptionnel alliant saveurs françaises et spécialités malgaches",
        en: "An exceptional gastronomic buffet combining French flavors and Malagasy specialties"
      },
      image: '/uploads/Env.png',
      hidden: false
    },
    {
      title: {
        fr: "Soirée Dégustation",
        en: "Tasting Evening"
      },
      period: {
        fr: "Premier samedi du mois",
        en: "First Saturday of the month"
      },
      description: {
        fr: "Découvrez notre sélection de vins et spiritueux accompagnés de mets raffinés",
        en: "Discover our selection of wines and spirits accompanied by refined dishes"
      },
      image: '/uploads/Env.png',
      hidden: false
    }
  ],
  cta: {
    title: {
      fr: "Besoin d'une offre sur mesure ?",
      en: "Need a custom offer?"
    },
    description: {
      fr: "Notre équipe de conciergerie est à votre disposition pour créer un séjour parfaitement adapté à vos envies",
      en: "Our concierge team is at your disposal to create a stay perfectly tailored to your desires"
    },
    buttonTexts: {
      primary: {
        fr: "Contacter notre conciergerie",
        en: "Contact our concierge"
      },
      secondary: {
        fr: "Demander un rappel",
        en: "Request a callback"
      }
    }
  }
};