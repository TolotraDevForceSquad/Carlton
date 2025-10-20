// src/data/homeData.ts
export const homeData = {
  title: {
    fr: "L'Art de l'Hospitalité & du Luxe",
    en: "The Art of Hospitality & Luxury" // Titre inchangé mais conservé
  },
  content: {
    fr: "Vivez une expérience singulière au Carlton Madagascar, membre de Preferred Hotels and Resorts, reconnu à travers le monde pour ses établissements hôteliers d’excellence. ",
    en: "Live a unique experience at Carlton Madagascar, a member of Preferred Hotels and Resorts, recognized worldwide for its establishments of excellence. "
  },
  highlights: [
    {
      icon: "Sparkles", // Chambres & Suites
      title: {
        fr: "Chambres & Suites",
        en: "Rooms & Suites"
      },
      description: {
        fr: "Avec 171 chambres et suites élégantes, l’hôtel vous offre une vue panoramique sur Antananarivo, mettant en lumière le Palais de la Reine et le lac Anosy avec le Mémorial de la Première Guerre mondiale.",
        en: "With 171 elegant rooms and suites, the hotel offers a panoramic view of Antananarivo, highlighting the Queen's Palace and Lake Anosy with the World War I Memorial."
      },
      link: "/chambres",
      linkText: {
        fr: "En savoir plus",
        en: "Learn more"
      },
      image: "/uploads/Presidential_suite_bedroom_interior_7adece21.png" // Image existante
    },
    {
      icon: "Utensils", // Restaurants & Bars
      title: {
        fr: "Restaurants & Bars",
        en: "Restaurants & Bars"
      },
      description: {
        fr: "Trois restaurants et bars, trois ambiances — en salle, en terrasse ou en plein air dans un cadre verdoyant — pour vous faire vivre une expérience culinaire unique qui allie cuisine internationale et saveurs malgaches en sublimant la fraîcheur et l’authenticité des produits locaux. Et, une pâtisserie-boulangerie qui propose chaque jour des produits frais, authentiques et gourmands. Une adresse incontournable pour les amateurs de bon goût.",
        en: "Three restaurants and bars, three atmospheres — indoors, on the terrace, or outdoors in a green setting — to provide a unique culinary experience that combines international cuisine and Malagasy flavors, enhancing the freshness and authenticity of local products. Plus, a pastry-bakery that offers fresh, authentic, and gourmet products every day. An essential address for those with good taste."
      },
      link: "/restaurants",
      linkText: {
        fr: "En savoir plus",
        en: "Learn more"
      },
      image: "/uploads/Luxury_hotel_restaurant_interior_090ad235.png" // Image existante
    },
    {
      icon: "Calendar", // Événements & Réceptions
      title: {
        fr: "Événements & Réceptions",
        en: "Events & Receptions"
      },
      description: {
        fr: "Grâce à son expertise reconnue dans l’organisation d’événements, l’hôtel est devenu le choix privilégié pour accueillir aussi bien les célébrations privées que les événements professionnels de prestige.",
        en: "Thanks to its recognized expertise in event organization, the hotel has become the preferred choice for hosting both private celebrations and prestigious professional events."
      },
      link: "/evenements",
      linkText: {
        fr: "En savoir plus",
        en: "Learn more"
      },
      image: "/uploads/Luxury_hotel_wedding_reception_d3ca816d.png" // Image existante
    },
    {
      icon: "Camera", // Nouveaux Équipements & Services - L'endroit idéal pour le carrousel
      title: {
        fr: "Équipements & Services",
        en: "Facilities & Services"
      },
      description: {
        fr: "171 Chambres & Suites, 03 Restaurants & Bars – Pâtisserie & Boulangerie, Evènements & Réceptions, Transferts Aéroport, Piscine - Fitness – Tennis – Soins Holistiques, Salon de beauté & coiffure, Boutiques de luxe, Agences de Voyage – Banque & GAB, Casino – Bar & VIP Lounge, Parking sécurisé.",
        en: "171 Rooms & Suites, 03 Restaurants & Bars – Pastry & Bakery, Events & Receptions, Airport Transfers, Pool - Fitness – Tennis – Holistic Care, Beauty & Hair Salon, Luxury Shops, Travel Agencies – Bank & ATM, Casino – Bar & VIP Lounge, Secure Parking."
      },
      link: "/bien-etre-loisirs", // Lien vers les installations/services existantes
      linkText: {
        fr: "Voir nos installations",
        en: "View our facilities"
      },
      image: "/uploads/Hotel_infinity_pool_wellness_a9857557.png" // Image existante
    }
  ],
  cta: {
    title: {
      fr: "Réservez Votre Séjour",
      en: "Book Your Stay"
    },
    description: {
      fr: "Découvrez l'hospitalité malgache dans le cadre unique du Carlton Madagascar",
      en: "Discover Malagasy hospitality in the unique setting of the Carlton Madagascar"
    },
    primaryButton: {
      fr: "Réserver maintenant",
      en: "Book now"
    },
    secondaryButton: {
      fr: "Voir nos chambres",
      en: "See our rooms"
    },
    primaryLink: "/contact", // L'utilisateur a mentionné "page de réservation Synxis", je garde le lien de contact comme dans l'initial, mais l'idéal serait un lien de réservation direct.
    secondaryLink: "/chambres" // Page Chambres & Suites
  },
  parallaxImage: "/uploads/Hotel_infinity_pool_wellness_a9857557.png" // Image existante
};