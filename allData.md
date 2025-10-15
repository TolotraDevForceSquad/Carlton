# 📦 Contenu combiné des fichiers data



---
## bienEtreLoisirsData.ts

```ts
// src/data/bienEtreLoisirsData.ts
export const bienEtreLoisirsData = {
  heroTitle: "Bien-être & Loisirs",
  heroSubtitle: "Évadez-vous dans notre univers de bien-être alliant détente, sport et soins holistiques au cœur de Madagascar pour une expérience de ressourcement totale",
  content: "<p>Contenu CMS simulé pour la section bien-être. Ce texte peut être étendu avec des paragraphes riches en HTML.</p>",
  facilities: [
    {
      id: 1,
      name: "Piscine Infinity",
      type: "Détente Aquatique",
      description: "Notre piscine à débordement de 25 mètres offre une vue imprenable sur Antananarivo.",
      image: "/assets/generated_images/Spa_wellness_facilities_3dba6f04.png",
      hours: "06h00 - 22h00",
      features: ["Piscine à débordement 25m", "Vue panoramique"],
      services: ["Maître-nageur présent"]
    }
  ],
  wellnessPrograms: [
    {
      id: 1,
      title: "Programme Détox Madagascar",
      duration: "3 jours",
      description: "Programme complet de détoxification utilisant les plantes endémiques de Madagascar",
      highlights: ["Soins aux plantes locales", "Nutrition détox", "Yoga quotidien", "Massages drainants"]
    },
    {
      id: 2,
      title: "Ritual Bien-être Traditionnel",
      duration: "2 heures",
      description: "Expérience authentique des techniques de soins traditionnels malgaches",
      highlights: ["Massage aux huiles essentielles", "Gommage au raphia", "Bain aux fleurs", "Relaxation guidée"]
    }
  ],
  bottomSection: {
    title: "Votre oasis de détente au cœur d'Antananarivo",
    description: "Profitez de nos installations de loisirs et de bien-être ouvertes tous les jours. Nos équipes sont à votre disposition pour personnaliser votre expérience.",
    buttonText: "Nous contacter"
  },
  sectionsTitle: "Nos Installations",
  sectionsDescription: "Des équipements haut de gamme pour votre bien-être et vos loisirs",
  programsTitle: "Programmes Bien-être",
  programsDescription: "Découvrez nos programmes holistiques inspirés des traditions malgaches"
};
```


---
## celebrationsData.ts

```ts
// src/data/celebrationsData.ts
export const celebrationsData = {
  heroTitle: "Célébrations Privées",
  heroSubtitle: "Moments inoubliables",
  heroImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920",
  content: "<p>Contenu CMS simulé pour les célébrations. Ce texte peut être étendu avec des détails sur les événements.</p>",
  event: {
    id: 3,
    name: "Anniversaires & Célébrations",
    subtitle: "Moments précieux",
    description: "Anniversaires marquants, jubilés, célébrations familiales... Nous créons des événements intimes ou grandioses selon vos envies, avec une attention particulière aux détails.",
    image: "/assets/generated_images/Fine_dining_restaurant_1275a5b9.png",
    capacity: "15 - 150 invités",
    duration: "3 heures à 2 jours",
    equipment: [
      "Planification personnalisée",
      "Menus thématiques",
      "Décoration sur mesure",
      "Animation musicale"
    ],
    features: [
      "Service de photographie",
      "Gâteau d'anniversaire inclus",
      "Cocktails de bienvenue",
      "Souvenirs personnalisés"
    ],
    venues: ["Ravinala", "Toit de Tana", "Restaurant privatisé", "La Terrasse Aile Droite"]
  },
  ctaTitle: "Célébrons Ensemble",
  ctaDescription: "Contactez notre équipe pour organiser votre célébration",
  ctaButton: "Planifier Ma Fête"
};
```


---
## chambresData.ts

```ts
// src/data/chambresData.ts
export const chambresData = {
  heroTitle: "Suites & Chambres",
  heroSubtitle: "171 chambres et suites élégantes avec vue imprenable sur la Haute Ville d'Antananarivo, le Palais de la Reine et le lac Anosy",
  heroImage: "/assets/generated_images/Presidential_suite_bedroom_interior_7adece21.png",
  content: "<p>Contenu CMS simulé pour les chambres. Incluez des descriptions détaillées ici.</p>",
  rooms: [
    {
      id: 1,
      name: "Presidential Suite",
      subtitle: "Royal Palace & Lake View – L'Excellence Absolue",
      description: "Suite présidentielle de 96m² avec vue imprenable sur le Palais de la Reine et le Lac Anosy. Chambre king-size et grand salon confortable avec kitchenette. (2 suites disponibles)",
      image: "/assets/generated_images/Luxury_suite_interior_386342fd.png",
      size: "96m²",
      guests: "4 personnes",
      features: [
        "Chambre king-size",
        "Grand salon confortable",
        "Kitchenette équipée",
        "Vue Palais de la Reine",
        "Vue Lac Anosy",
        "Salle de bain luxueuse",
        "Butler service 24h/24",
        "Mini-bar premium inclus"
      ],
      amenities: ["Wifi", "Climatisation", "Service en chambre", "Parking", "Coffre-fort", "TV 65\""]
    },
    {
      id: 2,
      name: "Suite Royal Palace & Lake View",
      subtitle: "Vue Exceptionnelle – Élégance & Confort",
      description: "Suite de 72m² avec vue imprenable sur le Palais de la Reine et le Lac Anosy. Chambre queen-size, grand salon confortable et kitchenette. (2 suites disponibles)",
      image: "/assets/generated_images/Luxury_suite_interior_386342fd.png",
      size: "72m²",
      guests: "3 personnes",
      features: [
        "Chambre queen-size",
        "Grand salon confortable",
        "Kitchenette",
        "Vue Palais de la Reine",
        "Vue Lac Anosy",
        "Salle de bain moderne",
        "Accès services premium",
        "Connexion internet haut débit"
      ],
      amenities: ["Wifi", "Climatisation", "Service en chambre", "Parking", "Coffre-fort", "TV 55\""]
    },
    {
      id: 3,
      name: "Family Suite",
      subtitle: "Confort Familial – Espace Généreux",
      description: "Suite familiale unique de 72m² avec chambre queen-size, chambre avec lits jumeaux et salon confortable. Parfaite pour les familles. (1 suite disponible)",
      image: "/assets/generated_images/Luxury_suite_interior_386342fd.png",
      size: "72m²",
      guests: "2 adultes + 2 enfants",
      features: [
        "Chambre queen-size",
        "Chambre avec lits jumeaux",
        "Salon confortable",
        "Espaces séparés",
        "Salle de bain familiale",
        "Équipements enfants",
        "Mini-réfrigérateur",
        "Vue sur la ville"
      ],
      amenities: ["Wifi", "Climatisation", "Service en chambre", "Parking", "Coffre-fort", "TV 50\""]
    },
    {
      id: 4,
      name: "Club Suite",
      subtitle: "Privilèges Exclusifs – Salon Confortable",
      description: "Suite de 48m² avec chambre queen-size et salon confortable. Accès privilégié aux services du Club Carlton. (15 suites disponibles)",
      image: "/assets/generated_images/Luxury_suite_interior_386342fd.png",
      size: "48m²",
      guests: "2 personnes",
      features: [
        "Chambre queen-size",
        "Salon confortable",
        "Accès Club Carlton",
        "Services personnalisés",
        "Salle de bain moderne",
        "Check-in/out privé",
        "Petit-déjeuner Club inclus",
        "Conciergerie dédiée"
      ],
      amenities: ["Wifi", "Climatisation", "Service en chambre", "Parking", "Coffre-fort", "TV 55\""]
    },
    {
      id: 5,
      name: "Executive & Premium Rooms",
      subtitle: "Confort Business & Raffinement Moderne",
      description: "Chambres de 24m² avec lit queen ou twin selon préférence. Vue imprenable sur la Haute Ville d'Antananarivo et le Palais de la Reine. Finitions haut de gamme avec services Executive. (151 chambres au total)",
      image: "/assets/generated_images/Luxury_suite_interior_386342fd.png",
      size: "24m²", 
      guests: "2 personnes",
      features: [
        "Lit queen ou twin-beds",
        "Vue Haute Ville d'Antananarivo",
        "Vue Palais de la Reine",
        "Design contemporain",
        "Salle de bain moderne",
        "Accès Executive Lounge",
        "Minibar premium",
        "Machine à café Nespresso"
      ],
      amenities: ["Wifi", "Climatisation", "Service en chambre", "Parking", "Coffre-fort", "TV 43\""]
    }
  ],
  stats: {
    totalRooms: 171,
    categories: 5,
    maxSize: "96m²"
  },
  servicesTitle: "Services Inclus",
  servicesDescription: "Profitez de nos services premium inclus dans chaque hébergement",
  services: [
    { icon: "Wifi", title: "Wi-Fi Très Haut Débit", desc: "Connexion fibre gratuite" },
    { icon: "Coffee", title: "Service en Chambre 24h/24", desc: "Nos chefs à votre service" },
    { icon: "Car", title: "Parking Sécurisé", desc: "Service voiturier inclus" },
    { icon: "Bath", title: "Piscine Extérieure 25m", desc: "Incluse pour Premium & Suites" }
  ],
  buttonText: "Découvrir nos hébergements",
  bookButton: "Réserver cette chambre"
};
```


---
## contactData.ts

```ts
// src/data/contactData.ts
export const contactData = {
  heroTitle: "Nous Contacter",
  heroDescription: "Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner",
  contactInfo: [
    {
      icon: "Phone",
      title: "Téléphone",
      details: ["+261 20 22 260 60", "Disponible 24h/24"],
      action: "Appeler maintenant"
    },
    {
      icon: "Mail",
      title: "Email",
      details: ["contact@carlton.mg", "Réponse sous 2h"],
      action: "Envoyer un email"
    },
    {
      icon: "MapPin",
      title: "Adresse",
      details: ["Rue Pierre Stibbe Anosy Po BOX 959", "Antananarivo 101, Madagascar"],
      action: "Voir sur la carte"
    },
    {
      icon: "Clock",
      title: "Horaires",
      details: ["Réception 24h/24", "Conciergerie toujours disponible"],
      action: "Plus d'infos"
    }
  ],
  form: {
    title: "Envoyez-nous un Message",
    subtitle: "Remplissez ce formulaire, nous vous répondrons rapidement",
    departments: [
      { value: "reservation", label: "Réservations" },
      { value: "restaurant", label: "Restaurants" },
      { value: "evenement", label: "Événements" },
      { value: "concierge", label: "Conciergerie" },
      { value: "spa", label: "Loisirs & Bien-être" },
      { value: "direction", label: "Direction" },
      { value: "autre", label: "Autre demande" }
    ],
    submitButton: "Envoyer le message"
  },
  services: [
    {
      title: "Réservations",
      description: "Chambres, restaurants, événements",
      icon: "Calendar"
    },
    {
      title: "Conciergerie",
      description: "Excursions, transports, conseils",
      icon: "Users"
    },
    {
      title: "Transferts Aéroport",
      description: "Service de navette premium",
      icon: "Plane"
    },
    {
      title: "Parking",
      description: "Service de parking sécurisé",
      icon: "Car"
    }
  ],
  practicalInfo: {
    arrivalTitle: "Arrivée & Départ",
    arrivalDetails: ["Check-in : 15h00", "Check-out : 12h00", "Early check-in/late check-out sur demande"],
    airportTitle: "Aéroport",
    airportDetails: ["Distance : 30 minutes en voiture", "Navette privée disponible", "Service de transfert VIP"],
    languagesTitle: "Langues parlées",
    languages: ["Français", "Anglais", "Malgache", "Italien"],
    locationTitle: "Notre Emplacement",
    locationSubtitle: "Carlton Madagascar, au cœur d'Antananarivo",
    address: "Rue Pierre Stibbe Anosy Po BOX 959<br/>Antananarivo 101, Madagascar",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.8755892545847!2d47.52089897509746!3d-18.91384738248647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07e7637d2b2d3%3A0x4b9f0b1d3c6b4b5a!2sRue%20Pierre%20Stibbe%2C%20Antananarivo%2C%20Madagascar!5e0!3m2!1sen!2s!4v1632468352847!5m2!1sen!2s",
    directionsButton: "Obtenir l'itinéraire"
  }
};
```


---
## contactSectionData.ts

```ts
// src/data/contactSectionData.ts
export const contactSectionData = {
  header: {
    title: "Contactez-nous",
    description: "Notre équipe dédiée est à votre disposition pour vous accompagner dans l'organisation de votre séjour d'exception."
  },
  form: {
    title: "Demande d'information",
    subtitle: "Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais.",
    fields: {
      name: { label: "Nom complet *", placeholder: "Votre nom" },
      email: { label: "Email *", placeholder: "votre@email.com" },
      phone: { label: "Téléphone", placeholder: "+261 XX XX XXX XX" },
      subject: { label: "Sujet", placeholder: "Choisir un sujet" },
      options: [
        { value: "reservation", label: "Réservation" },
        { value: "information", label: "Information générale" },
        { value: "event", label: "Événement privé" },
        { value: "restaurant", label: "Restaurant" },
        { value: "spa", label: "Spa & Bien-être" },
        { value: "other", label: "Autre" }
      ],
      message: { label: "Message *", placeholder: "Décrivez votre demande..." }
    },
    submitButton: "Envoyer le message"
  },
  contactInfo: [
    {
      icon: "MapPin",
      title: "Adresse",
      details: ["Rue Pierre Stibbe Anosy", "101 Antananarivo, Madagascar"]
    },
    {
      icon: "Phone",
      title: "Téléphone",
      details: ["+261 20 22 260 60", "Service 24h/24"]
    },
    {
      icon: "Mail",
      title: "Email",
      details: ["contact@carlton.mg", "reservation@carlton.mg"]
    },
    {
      icon: "Clock",
      title: "Réception",
      details: ["24h/24 - 7j/7", "Conciergerie disponible"]
    }
  ],
  location: {
    title: "Notre localisation",
    description: "Carte interactive Google Maps",
    address: "Rue Pierre Stibbe Anosy, Antananarivo",
    button: "Ouvrir dans Google Maps"
  },
  quickActions: [
    {
      icon: "Phone",
      title: "Appeler maintenant",
      subtitle: "Service 24h/24"
    },
    {
      icon: "MessageCircle",
      title: "Chat en direct",
      subtitle: "Réponse immédiate"
    }
  ]
};
```


---
## corporateData.ts

```ts
import eventImage from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';

export const corporatePageData = {
  heroTitle: "Événements Corporate",
  heroSubtitle: "Espaces professionnels d'exception",
  heroImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920',
  content: `
    <div class="prose prose-lg">
      <p>Organisez vos événements corporate dans un cadre d'exception. Nos espaces modulables sont équipés des dernières technologies pour des réunions productives et mémorables.</p>
      <h2>Pourquoi choisir nos services ?</h2>
      <ul>
        <li>Service impeccable et personnalisé</li>
        <li>Équipements high-tech inclus</li>
        <li>Emplacements variés pour tous les formats</li>
      </ul>
    </div>
  `,
  sections: [
    {
      id: 2,
      name: "Événements Corporate",
      subtitle: "Excellence professionnelle",
      description: "Organisez vos séminaires, conférences et événements d'entreprise dans nos espaces modulables équipés des dernières technologies. Un service impeccable pour des réunions réussies.",
      image: eventImage,
      capacity: "10 - 300 participants",
      duration: "Demi-journée à 3 jours",
      equipment: [
        "Salles modulables équipées",
        "Matériel audiovisuel inclus",
        "Connexion Wi-Fi haut débit",
        "Service de restauration adapté"
      ],
      features: [
        "Équipe technique dédiée",
        "Parking réservé",
        "Service de conciergerie",
        "Chambres à tarif préférentiel"
      ],
      venues: ["Executive Boardroom", "Ravinala", "Toit de Tana", "La Terrasse Aile Droite"]
    }
  ],
  cta: {
    title: "Organisons Votre Événement",
    subtitle: "Contactez-nous pour discuter de vos besoins et créer un événement sur mesure",
    buttonText: "Demander un Devis"
  }
};
```


---
## decouvrirAntananarivoData.ts

```ts
import attractionsImage from '@assets/stock_images/antananarivo_madagas_66f3920a.jpg';
import excursionsImage from '@assets/stock_images/madagascar_nature_ex_fda9bbfe.jpg';
import restaurantsImage from '@assets/stock_images/madagascar_local_res_99c0381a.jpg';

export const decouvrirAntananarivoPageData = {
  hero: {
    title: "Découvrir Antananarivo",
    description: "Situé en plein centre-ville à 20 km de l'aéroport international de Ravinala (45 min à 1h), explorez la capitale malgache et ses trésors cachés. De l'histoire royale aux marchés colorés, laissez-vous guider dans cette métropole aux mille visages."
  },
  attractions: {
    title: "Attractions de la Capitale",
    description: "Découvrez les sites emblématiques d'Antananarivo à quelques minutes de l'hôtel. Du palais royal aux marchés colorés, explorez l'histoire et la culture malgaches.",
    image: attractionsImage,
    items: [
      {
        title: "Gare de Soarano",
        description: "Gare historique d'Antananarivo, témoin de l'époque coloniale et point de départ vers les régions de Madagascar.",
        distance: "1,7 km - 10 min du Carlton",
        duration: "30 min",
        category: "Patrimoine",
        highlights: ["Architecture coloniale", "Histoire ferroviaire", "Point de départ excursions", "Centre-ville"],
        icon: "Building"
      },
      {
        title: "Musée de la Photographie",
        description: "Collection unique retraçant l'histoire de Madagascar à travers l'objectif, mémoire visuelle de l'île.",
        distance: "2,8 km - 10 min du Carlton",
        duration: "1-2 heures",
        category: "Culture",
        highlights: ["Histoire malgache", "Photos d'époque", "Collections rares", "Patrimoine visuel"],
        icon: "Camera"
      },
      {
        title: "Palais de la Reine « Manjakamiadana »",
        description: "Ancien palais royal, symbole de la royauté malgache perché sur la colline avec vue panoramique sur Antananarivo.",
        distance: "3,1 km - 15 min du Carlton",
        duration: "2-3 heures",
        category: "Patrimoine Royal",
        highlights: ["Vue panoramique", "Histoire royale", "Architecture traditionnelle", "Colline sacrée"],
        icon: "Building"
      },
      {
        title: "Parc Botanique & Zoologique Tsimbazaza",
        description: "Zoo et jardin botanique présentant la faune et la flore endémiques de Madagascar, parfait pour les familles.",
        distance: "3 km - 15 min du Carlton",
        duration: "3-4 heures",
        category: "Nature",
        highlights: ["Faune endémique", "Jardin botanique", "Lémuriens", "Éducatif famille"],
        icon: "TreePine"
      },
      {
        title: "Galerie d'Art Lisy (Marché Artisanat)",
        description: "Marché de l'artisanat malgache où découvrir sculptures, textiles, bijoux et souvenirs authentiques.",
        distance: "4 km - 15 min du Carlton",
        duration: "1-2 heures",
        category: "Artisanat",
        highlights: ["Artisanat authentique", "Sculptures bois", "Textiles traditionnels", "Souvenirs uniques"],
        icon: "ShoppingBag"
      },
      {
        title: "Parc des Oiseaux « Tsarasaotra »",
        description: "Réserve ornithologique urbaine abritant de nombreuses espèces d'oiseaux endémiques et migrateurs.",
        distance: "8 km - 30 min du Carlton",
        duration: "2-3 heures",
        category: "Nature",
        highlights: ["Oiseaux endémiques", "Observation nature", "Réserve urbaine", "Biodiversité"],
        icon: "TreePine"
      },
      {
        title: "Parc des Lémuriens",
        description: "Parc dédié aux lémuriens de Madagascar où observer ces primates emblématiques dans leur environnement naturel.",
        distance: "22 km - 1h du Carlton",
        duration: "Demi-journée",
        category: "Faune",
        highlights: ["Lémuriens en liberté", "Faune endémique", "Observation rapprochée", "Conservation"],
        icon: "TreePine"
      },
      {
        title: "Croc Farm Ivato",
        description: "Ferme aux crocodiles près de l'aéroport, découverte de la faune reptilienne de Madagascar.",
        distance: "23 km - 1h du Carlton",
        duration: "2 heures",
        category: "Faune",
        highlights: ["Crocodiles endémiques", "Éducation nature", "Proximité aéroport", "Expérience unique"],
        icon: "TreePine"
      }
    ]
  },
  excursions: {
    title: "Excursions & Découvertes",
    description: "Partez à la découverte des merveilles naturelles et culturelles de Madagascar. Des sites culturels aux parcs nationaux, vivez des expériences inoubliables.",
    image: excursionsImage,
    items: [
      {
        title: "Colline Royale « Ambohimanga »",
        description: "Ancienne cité royale et lieu sacré des Malgaches, parfait pour une excursion d'une journée.",
        distance: "23 km - 1h",
        duration: "Journée complète",
        category: "Patrimoine",
        price: "À partir de 80€",
        includes: ["Transport privé", "Guide francophone", "Déjeuner", "Entrées"],
        icon: "Mountain"
      },
      {
        title: "Parc National d'Andasibe",
        description: "Parc national célèbre pour ses lémuriens Indri-Indri et sa forêt primaire tropicale.",
        distance: "159 km - 3h30",
        duration: "2 jours / 1 nuit",
        category: "Nature & Faune",
        price: "À partir de 220€",
        includes: ["Transport 4x4", "Guide spécialisé", "Hébergement", "Repas"],
        icon: "TreePine"
      },
      {
        title: "Mandraka Parc",
        description: "Parc naturel offrant découverte de la faune et flore malgaches dans un cadre préservé.",
        distance: "66 km - 2h",
        duration: "Journée complète",
        category: "Nature & Découverte",
        price: "À partir de 120€",
        includes: ["Transport confortable", "Guide nature", "Déjeuner", "Activités"],
        icon: "TreePine"
      }
    ]
  },
  restaurants: {
    title: "Restaurants Recommandés",
    description: "Découvrez les meilleures tables d'Antananarivo sélectionnées par nos équipes. De la cuisine française raffinée aux spécialités malgaches, savourez l'authenticité.",
    image: restaurantsImage,
    items: [
      {
        name: "La Table de Nicole",
        cuisine: "Gastronomie française",
        distance: "4 km",
        specialite: "Cuisine française raffinée"
      },
      {
        name: "Restaurant Sakamanga",
        cuisine: "Fusion malgache",
        distance: "5 km", 
        specialite: "Spécialités locales revisitées"
      },
      {
        name: "Villa Vanille",
        cuisine: "Internationale",
        distance: "6 km",
        specialite: "Cadre colonial authentique"
      }
    ]
  },
  cta: {
    title: "Explorez Madagascar depuis le Carlton",
    description: "Réservez votre séjour au Carlton Madagascar et découvrez les trésors de la capitale et de l'île continent",
    buttonText: "Réserver votre chambre"
  },
  categories: ["Tous", "Architecture", "Hébergement", "Gastronomie", "Loisirs", "Bien-être"]
};
```


---
## evenementsData.ts

```ts
import eventImage from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';
import mariageImage from '@assets/generated_images/Luxury_hotel_wedding_reception_d3ca816d.png';
import restaurantImage from '@assets/generated_images/Luxury_hotel_restaurant_interior_090ad235.png';
import wellnessImage from '@assets/generated_images/Hotel_infinity_pool_wellness_a9857557.png';
import suiteImage from '@assets/generated_images/Presidential_suite_bedroom_interior_7adece21.png';

export const evenementsPageData = {
  heroTitle: 'Événements & Réceptions',
  heroSubtitle: 'Créez des moments inoubliables dans le cadre exceptionnel du Carlton Madagascar',
  heroImage: suiteImage,
  content: `
    <div class="prose prose-lg">
      <p>Organisez vos événements dans un cadre d'exception. Nos espaces modulables sont équipés des dernières technologies pour des réunions productives et mémorables.</p>
      <h2>Pourquoi choisir nos services ?</h2>
      <ul>
        <li>Service impeccable et personnalisé</li>
        <li>Équipements high-tech inclus</li>
        <li>Emplacements variés pour tous les formats</li>
      </ul>
    </div>
  `,
  sections: [
    {
      id: 1,
      type: 'event',
      name: "Mariages de Prestige",
      subtitle: "Votre jour le plus beau",
      description: "Célébrez votre union dans un cadre d'exception avec nos services de mariage sur mesure.",
      image: mariageImage,
      capacity: "20 - 200 invités",
      duration: "Journée complète",
      surface: null,
      equipment: [],
      features: ["Coordinateur dédié", "Menu personnalisé", "Décoration incluse"],
      venues: []
    }
  ],
  stats: [
    { icon: "Users", value: 400, label: "Invités maximum" },
    { icon: "Calendar", value: 15, label: "Salles d'événements" },
    { icon: "Star", value: "5★", label: "Service de luxe" },
    { icon: "Clock", value: "24h", label: "Support dédié" }
  ],
  services: [
    {
      title: "Planification Complète",
      description: "De la conception à la réalisation, notre équipe gère tous les aspects de votre événement",
      icon: "Calendar"
    },
    {
      title: "Restauration Gastronomique",
      description: "Nos chefs créent des menus exclusifs adaptés à votre événement et vos invités",
      icon: "Utensils"
    },
    {
      title: "Décoration & Ambiance",
      description: "Design floral, éclairage d'ambiance et mise en scène sur mesure",
      icon: "Star"
    },
    {
      title: "Services Techniques",
      description: "Sonorisation, éclairage, audiovisuel et toute la logistique technique",
      icon: "Music"
    },
    {
      title: "Hébergement Groupe",
      description: "Tarifs préférentiels et services dédiés pour vos invités",
      icon: "Users"
    },
    {
      title: "Captation Souvenir",
      description: "Photographe et vidéaste professionnels pour immortaliser vos moments",
      icon: "Camera"
    }
  ],
  venues: [
    {
      name: "Ravinala",
      capacity: "150-550 personnes",
      area: "728m²",
      features: ["150 classe", "550 théâtre", "160 U", "500 banquet/cocktail", "200 board"]
    },
    {
      name: "Ravinala A",
      capacity: "90-300 personnes", 
      area: "475m²",
      features: ["90 classe", "300 théâtre", "110 U", "200 banquet", "300 cocktail", "70 board"]
    },
    {
      name: "Ravinala B",
      capacity: "50-200 personnes",
      area: "253m²", 
      features: ["50 classe", "200 théâtre", "50 U", "100 banquet", "200 cocktail", "50 board"]
    },
    {
      name: "Toit de Tana",
      capacity: "50-100 personnes",
      area: "298m²",
      features: ["50 classe", "100 théâtre", "50 U", "100 banquet/cocktail", "40 board"]
    },
    {
      name: "La Terrasse",
      capacity: "150-200 personnes",
      area: "272m²",
      features: ["150 théâtre", "200 banquet", "150 cocktail"]
    },
    {
      name: "Oasis de Tana",
      capacity: "250-300 personnes",
      area: "391m²",
      features: ["250 banquet", "300 cocktail", "Cadre piscine"]
    },
    {
      name: "Executive Boardroom",
      capacity: "15 personnes",
      area: "47m²",
      features: ["15 board", "Réunions exec", "Équipement AV"]
    },
    {
      name: "Salle Roi",
      capacity: "15-30 personnes",
      area: "48.5m²",
      features: ["15 classe", "30 théâtre", "15 U", "20 banquet", "30 cocktail", "15 board"]
    },
    {
      name: "Salle Reine",
      capacity: "15-30 personnes", 
      area: "48.5m²",
      features: ["15 classe", "30 théâtre", "15 U", "20 banquet", "30 cocktail", "15 board"]
    },
    {
      name: "Terrasse Aile Droite",
      capacity: "30-50 personnes",
      area: "96m²",
      features: ["30 classe", "50 théâtre", "20 U", "40 banquet", "50 cocktail", "30 board"]
    },
    {
      name: "Terrasse Aile Gauche", 
      capacity: "100 personnes",
      area: "176m²",
      features: ["100 théâtre", "100 banquet", "100 cocktail"]
    },
    {
      name: "Valiha A",
      capacity: "20 personnes",
      area: "39m²",
      features: ["20 board", "Salle réunion"]
    },
    {
      name: "Valiha B",
      capacity: "15 personnes",
      area: "27m²", 
      features: ["15 board", "Salle réunion"]
    },
    {
      name: "Foyer",
      capacity: "200 personnes",
      area: "170m²",
      features: ["200 cocktail", "Espace accueil"]
    }
  ],
  cta: {
    title: "Planifions Votre Événement",
    subtitle: "Notre équipe dédiée aux événements vous accompagne de la conception à la réalisation",
    buttonText: "Demander un devis"
  }
};
```


---
## footerData.ts

```ts
// src/data/footerData.ts
export const footerData = {
  hotel: {
    title: "Carlton Madagascar",
    description: "L'art de vivre à la française au cœur d'Antananarivo. Un hôtel 5 étoiles où luxe et raffinement créent une expérience inoubliable.",
    newsletter: {
      title: "Newsletter",
      description: "Recevez nos offres exclusives et actualités",
      placeholder: "Votre email",
      button: "S'abonner"
    }
  },
  sections: [
    {
      title: "L'Hôtel",
      links: [
        { label: "À propos", href: "/about" },
        { label: "Histoire", href: "/history" },
        { label: "Récompenses", href: "/awards" },
        { label: "Emplois", href: "/careers" }
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Chambres & Suites", href: "/chambres" },
        { label: "Restaurants", href: "/restaurants" },
        { label: "Spa & Bien-être", href: "/spa" },
        { label: "Événements", href: "/evenements" }
      ]
    },
    {
      title: "Informations",
      links: [
        { label: "Conditions générales", href: "/terms" },
        { label: "Politique de confidentialité", href: "/privacy" },
        { label: "Plan du site", href: "/sitemap" },
        { label: "FAQ", href: "/faq" }
      ]
    }
  ],
  contact: {
    address: {
      title: "Adresse",
      details: ["Rue Pierre Stibbe Anosy", "101 Antananarivo, Madagascar"]
    },
    phone: {
      title: "Téléphone",
      details: "+261 20 22 260 60"
    },
    email: {
      title: "Email",
      details: "contact@carlton.mg"
    },
    reception: {
      title: "Réception",
      details: "24h/24 - 7j/7"
    }
  },
  bottom: {
    copyright: "© 2025 Carlton Madagascar. Tous droits réservés.",
    rating: "★★★★★ Hôtel 5 étoiles",
    follow: "Suivez-nous :"
  },
  social: [
    { icon: "Facebook", href: "#", label: "Facebook" },
    { icon: "Instagram", href: "#", label: "Instagram" },
    { icon: "Twitter", href: "#", label: "Twitter" },
    { icon: "Linkedin", href: "#", label: "LinkedIn" }
  ],
  logos: {
    iPrefer: "@assets/I Prefer_logo_white_H_LARGE_1758205962584.png",
    preferredLifestyle: "@assets/Preferred Lifestyle LOGO LARGE_black_1758205962584.png"
  }
};
```


---
## galasData.ts

```ts
import eventImage from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';

export const galasPageData = {
  heroTitle: "Galas & Soirées de Prestige",
  heroSubtitle: "Élégance et raffinement",
  heroImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920',
  content: `
    <div class="prose prose-lg">
      <p>Organisez vos galas dans un cadre d'exception. Nos espaces modulables sont équipés des dernières technologies pour des soirées mémorables.</p>
      <h2>Pourquoi choisir nos services ?</h2>
      <ul>
        <li>Service impeccable et personnalisé</li>
        <li>Équipements high-tech inclus</li>
        <li>Emplacements variés pour tous les formats</li>
      </ul>
    </div>
  `,
  sections: [
    {
      id: 4,
      name: "Lancements & Galas",
      subtitle: "Événements d'exception",
      description: "Pour vos lancements de produits, galas de charité ou réceptions officielles, nous offrons le cadre prestigieux et les services haut de gamme nécessaires à votre succès.",
      image: eventImage,
      capacity: "50 - 400 invités",
      duration: "Soirée ou journée",
      equipment: [
        "Scénographie personnalisée",
        "Éclairage professionnel",
        "Sonorisation complète",
        "Service de sécurité"
      ],
      features: [
        "Vestiaire et accueil VIP",
        "Buffets ou dîners assis",
        "Bar à cocktails premium",
        "Relations presse si demandé"
      ],
      venues: ["Toit de Tana", "La Terrasse Aile Droite", "Ravinala", "Executive Boardroom"]
    }
  ],
  cta: {
    title: "Créons Votre Événement de Prestige",
    subtitle: "Discutons de votre projet pour un événement inoubliable",
    buttonText: "Organiser Mon Gala"
  }
};
```


---
## galerieData.ts

```ts
import hotelExterior from '@assets/generated_images/Carlton_hotel_exterior_view_8ca3b91a.png';
import luxurySuite from '@assets/generated_images/Luxury_suite_interior_386342fd.png';
import restaurant from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';
import spa from '@assets/generated_images/Spa_wellness_facilities_3dba6f04.png';

export const galeriePageData = {
  hero: {
    title: "Galerie",
    description: "Explorez l'univers visuel du Carlton Madagascar à travers notre collection de photographies mettant en valeur l'élégance et le raffinement de notre établissement."
  },
  galleries: [
    {
      title: "Hôtel & Architecture",
      description: "Découvrez l'architecture élégante du Carlton Madagascar et ses espaces communs luxueux.",
      images: [
        {
          src: hotelExterior,
          alt: "Carlton Madagascar - Vue extérieure",
          category: "Architecture",
          title: "Façade du Carlton Madagascar"
        },
        {
          src: hotelExterior,
          alt: "Lobby principal",
          category: "Architecture", 
          title: "Hall d'accueil majestueux"
        },
        {
          src: hotelExterior,
          alt: "Terrasse panoramique",
          category: "Architecture",
          title: "Terrasse avec vue sur Antananarivo"
        },
        {
          src: hotelExterior,
          alt: "Architecture extérieure de nuit",
          category: "Architecture",
          title: "L'hôtel illuminé la nuit"
        }
      ]
    },
    {
      title: "Chambres & Suites",
      description: "Nos hébergements luxueux allient confort moderne et élégance raffinée.",
      images: [
        {
          src: luxurySuite,
          alt: "Suite Présidentielle",
          category: "Hébergement",
          title: "Suite Présidentielle - Salon"
        },
        {
          src: luxurySuite,
          alt: "Suite Exécutive",
          category: "Hébergement",
          title: "Suite Exécutive avec vue"
        },
        {
          src: luxurySuite,
          alt: "Chambre Deluxe",
          category: "Hébergement",
          title: "Chambre Deluxe - Confort premium"
        },
        {
          src: luxurySuite,
          alt: "Salle de bain suite",
          category: "Hébergement",
          title: "Salle de bain en marbre"
        }
      ]
    },
    {
      title: "Restaurants & Bars",
      description: "L'art culinaire à son apogée dans nos quatre établissements gastronomiques.",
      images: [
        {
          src: restaurant,
          alt: "Restaurant Île Rouge",
          category: "Gastronomie",
          title: "Île Rouge - Dining gastronomique"
        },
        {
          src: restaurant,
          alt: "Le Bistrot du Carlton",
          category: "Gastronomie",
          title: "Le Bistrot - Ambiance feutrée"
        },
        {
          src: restaurant,
          alt: "L'Oasis de Tana",
          category: "Gastronomie",
          title: "L'Oasis - Restaurant piscine"
        },
        {
          src: restaurant,
          alt: "L'Éclair Pâtisserie",
          category: "Gastronomie",
          title: "L'Éclair - Pâtisserie française"
        }
      ]
    },
    {
      title: "Bien-être & Loisirs",
      description: "Installations de détente et d'activités pour votre bien-être total.",
      images: [
        {
          src: spa,
          alt: "Piscine infinity",
          category: "Loisirs",
          title: "Piscine infinity avec vue panoramique"
        },
        {
          src: spa,
          alt: "Salle de sport",
          category: "Loisirs",
          title: "Centre de fitness moderne"
        },
        {
          src: spa,
          alt: "Court de tennis",
          category: "Loisirs",
          title: "Court de tennis professionnel"
        },
        {
          src: spa,
          alt: "Soins holistiques",
          category: "Bien-être",
          title: "Espace soins et relaxation"
        }
      ]
    }
  ],
  categories: ["Tous", "Architecture", "Hébergement", "Gastronomie", "Loisirs", "Bien-être"],
  virtualTour: {
    title: "Visite Virtuelle",
    description: "Découvrez l'ensemble de nos installations grâce à notre visite virtuelle interactive 360°",
    items: [
      {
        title: "Hall d'Accueil",
        description: "Explorez notre lobby majestueux",
        icon: "Eye"
      },
      {
        title: "Suite Présidentielle",
        description: "Découvrez nos hébergements d'exception",
        icon: "Eye"
      },
      {
        title: "Restaurant Île Rouge",
        description: "Visitez notre restaurant gastronomique",
        icon: "Eye"
      }
    ],
    buttonText: "Commencer la Visite Virtuelle Complète"
  }
};
```


---
## heroSectionData.ts

```ts
// src/data/heroSectionData.ts
export const heroSectionData = {
  slides: [
    {
      image: "/assets/generated_images/Carlton_hotel_exterior_view_8ca3b91a.png",
      title: "Carlton Madagascar",
      subtitle: "L'hôtel 5 étoiles emblématique ancré dans le centre historique d'Antananarivo",
      description: "Vivez une expérience singulière au Carlton Madagascar, membre de Preferred Hotels and Resorts. Niché dans le cœur culturel de la ville avec une vue imprenable sur le Palais de la Reine et le Lac Anosy."
    },
    {
      image: "/assets/generated_images/Carlton_hotel_exterior_view_8ca3b91a.png",
      title: "171 Chambres & Suites",
      subtitle: "Vue Imprenable sur la Haute Ville et le Palais de la Reine",
      description: "De nos Executive Rooms aux Presidential Suites, découvrez un hébergement d'exception avec vue sur le patrimoine royal dans un cadre magnifique."
    },
    {
      image: "/assets/generated_images/Carlton_hotel_exterior_view_8ca3b91a.png",
      title: "Excellence & Prestige",
      subtitle: "Une Harmonie Parfaite d'Histoire, de Confort et de Prestige",
      description: "En tant que membre certifié de Preferred Hotels and Resorts, nous garantissons les standards les plus élevés pour faire de votre visite un moment mémorable."
    }
  ],
  badge: {
    stars: "★★★★★",
    text: "Hôtel 5 Étoiles"
  },
  buttons: {
    primary: "Réserver une Suite",
    secondary: "Découvrir l'Hôtel"
  },
  scroll: "Découvrir"
};
```


---
## homeData.ts

```ts
// src/data/homeData.ts
export const homeData = {
  title: "L'Art de l'Hospitalité & du Luxe",
  content: "<p>Le Carlton Madagascar est bien plus qu'un hôtel 5 étoiles. C'est une invitation au voyage, une expérience unique au cœur d'Antananarivo où l'élégance française rencontre l'authenticité malgache pour créer des souvenirs inoubliables.</p>",
  highlights: [
    {
      icon: "Sparkles",
      title: "Chambres de Luxe",
      description: "Suites et chambres élégantes avec vue panoramique sur Antananarivo",
      link: "/chambres",
      linkText: "Voir nos chambres",
      image: "/assets/generated_images/Presidential_suite_bedroom_interior_7adece21.png"
    },
    {
      icon: "Utensils",
      title: "Gastronomie d'Exception",
      description: "4 restaurants et bars offrant une cuisine raffinée dans un cadre d'exception",
      link: "/restaurants",
      linkText: "Découvrir nos restaurants",
      image: "/assets/generated_images/Luxury_hotel_restaurant_interior_090ad235.png"
    },
    {
      icon: "Calendar",
      title: "Événements & Réceptions",
      description: "Espaces de réception prestigieux pour vos événements d'affaires et privés",
      link: "/evenements",
      linkText: "Organiser un événement",
      image: "/assets/generated_images/Luxury_hotel_wedding_reception_d3ca816d.png"
    },
    {
      icon: "Camera",
      title: "Bien-être & Loisirs",
      description: "Piscine infinity, fitness center et installations sportives haut de gamme",
      link: "/bien-etre-loisirs",
      linkText: "Nos installations",
      image: "/assets/generated_images/Hotel_infinity_pool_wellness_a9857557.png"
    }
  ],
  cta: {
    title: "Réservez Votre Séjour d'Exception",
    description: "Découvrez l'hospitalité malgache dans le cadre luxueux du Carlton Madagascar",
    primaryButton: "Réserver maintenant",
    secondaryButton: "Voir nos chambres",
    primaryLink: "/contact",
    secondaryLink: "/chambres"
  },
  parallaxImage: "/assets/generated_images/Hotel_infinity_pool_wellness_a9857557.png"
};
```


---
## loisirsData.ts

```ts
import poolImage from '@assets/generated_images/Spa_wellness_facilities_3dba6f04.png';

export const loisirsPageData = {
  hero: {
    title: "Loisirs & Activités",
    description: "Détente, sport et découvertes au cœur de Madagascar pour enrichir votre séjour d'expériences uniques"
  },
  facilities: [
    {
      id: 1,
      name: "Piscine Infinity",
      type: "Détente Aquatique",
      description: "Notre piscine à débordement de 25 mètres offre une vue imprenable sur Antananarivo. Un véritable joyau suspendu au cœur de la ville, parfait pour la nage et la détente.",
      image: poolImage,
      hours: "06h00 - 22h00",
      features: [
        "Piscine à débordement 25m",
        "Bassin pour enfants sécurisé",
        "Bain à remous intégré",
        "Transats de luxe avec parasols",
        "Service de serviettes inclus",
        "Bar aquatique l'Oasis",
        "Éclairage nocturne ambiant",
        "Température contrôlée 28°C"
      ],
      services: ["Maître-nageur présent", "Cours d'aquagym", "Cocktails poolside"]
    },
    {
      id: 2,
      name: "Centre Fitness",
      type: "Forme & Bien-être",
      description: "Un espace de remise en forme ultra-moderne de 200m² équipé des dernières technologies Technogym pour maintenir votre routine d'entraînement même en voyage.",
      image: poolImage,
      hours: "05h00 - 23h00",
      features: [
        "Équipements Technogym dernière génération",
        "Espace cardio-training climatisé",
        "Salle de musculation complète",
        "Zone d'étirement et yoga",
        "Vestiaires avec sauna",
        "Douches à l'italienne",
        "Casiers sécurisés",
        "Écrans individuels intégrés"
      ],
      services: ["Coach personnel disponible", "Programmes personnalisés", "Serviettes fournies"]
    },
    {
      id: 3,
      name: "Court de Tennis",
      type: "Sport & Compétition",
      description: "Court de tennis professionnel en surface dure avec éclairage nocturne, parfait pour maintenir votre niveau de jeu dans un cadre tropical exceptionnel.",
      image: poolImage,
      hours: "06h00 - 21h00",
      features: [
        "Court en surface dure régulation",
        "Éclairage LED professionnel",
        "Filets et poteaux de compétition",
        "Gradins pour spectateurs",
        "Vestiaires dédiés",
        "Local matériel équipé",
        "Système de réservation",
        "Douches et rafraîchissements"
      ],
      services: ["Professeur de tennis disponible", "Location de matériel", "Tournois amicaux"]
    }
  ],
  activities: [
    {
      title: "Cours de Yoga",
      time: "07h00 & 18h00",
      description: "Séances matinales et vespérales dans un cadre zen",
      icon: "Sun"
    },
    {
      title: "Aqua Fitness",
      time: "10h00 & 16h00", 
      description: "Exercices aquatiques dynamiques en piscine",
      icon: "Waves"
    },
    {
      title: "Cours de Tennis",
      time: "Sur rendez-vous",
      description: "Leçons privées avec notre professionnel",
      icon: "Trophy"
    },
    {
      title: "Circuit Training",
      time: "06h30 & 19h00",
      description: "Entraînement intensif en petit groupe",
      icon: "Zap"
    }
  ],
  excursions: [
    {
      id: 1,
      title: "Découverte d'Antananarivo",
      duration: "Demi-journée",
      description: "Visite guidée des sites emblématiques de la capitale malgache",
      highlights: ["Palais de la Reine", "Marché d'Analakely", "Lac Anosy", "Quartier historique"]
    },
    {
      id: 2,
      title: "Parc National d'Andasibe",
      duration: "Journée complète",
      description: "Rencontre avec les lémuriens indri dans leur habitat naturel",
      highlights: ["Réserve de Vakona", "Lémuriens indri", "Forêt primaire", "Orchidées endémiques"]
    },
    {
      id: 3,
      title: "Ambohimanga",
      duration: "Demi-journée",
      description: "Site sacré royal",
      highlights: ["Palais royal", "Tombeaux sacrés", "Village traditionnel", "Vues panoramiques"]
    }
  ],
  additionalServices: [
    {
      icon: "Users",
      title: "Coach Personnel",
      description: "Programmes d'entraînement sur mesure"
    },
    {
      icon: "Dumbbell",
      title: "Location Matériel",
      description: "Équipements sportifs disponibles"
    },
    {
      icon: "Calendar",
      title: "Réservation Facile",
      description: "Système de booking intégré"
    },
    {
      icon: "Star",
      title: "Service Premium",
      description: "Assistance dédiée 7j/7"
    }
  ],
  programButton: "Voir le programme complet"
};
```


---
## mainNavData.ts

```ts
// src/data/mainNavData.ts
export const mainNavData = {
  menus: [
    { id: 1, name: "Accueil", link: "/", position: 1 },
    { id: 2, name: "Offres Spéciales", link: "/offres", position: 2 },
    { id: 3, name: "Séjour", link: "/chambres", position: 3 },
    { id: 4, name: "Restauration", link: "/restaurants", position: 4 },
    { id: 5, name: "Bien-être", link: "/bien-etre-loisirs", position: 5 },
    { id: 6, name: "Événements", link: "/evenements", position: 6 },
    { id: 7, name: "Découverte", link: "/galerie", position: 7 },
    { id: 8, name: "Contact", link: "/contact", position: 8 }
  ],
  subMenus: {
    '/chambres': [
      { label: 'Chambres & Suites', href: '/chambres' },
      { label: 'Services & Boutiques', href: '/services-boutiques' }
    ],
    '/restaurants': [
      { label: 'Île Rouge & la Terrasse', href: '/restaurants#ile-rouge' },
      { label: 'Le Bistrot du Carlton', href: '/restaurants#bistrot' },
      { label: 'L\'Oasis de Tana', href: '/restaurants#oasis' },
      { label: 'L\'Éclair by Carlton', href: '/restaurants#eclair' }
    ],
    '/bien-etre-loisirs': [
      { label: 'Piscine', href: '/bien-etre-loisirs#piscine' },
      { label: 'Salle de sport', href: '/bien-etre-loisirs#salle-sport' },
      { label: 'Court de tennis', href: '/bien-etre-loisirs#tennis' },
      { label: 'Soins holistique', href: '/bien-etre-loisirs#soins' }
    ],
    '/evenements': [
      { label: 'Mariages', href: '/evenements#mariages' },
      { label: 'Corporate', href: '/evenements#corporate' },
      { label: 'Célébrations', href: '/evenements#celebrations' },
      { label: 'Galas & Lancements', href: '/evenements#galas' },
      { label: 'Nos espaces', href: '/evenements#salles' }
    ],
    '/galerie': [
      { label: 'Galerie', href: '/galerie' },
      { label: 'Découvrir Antananarivo', href: '/decouvrir-antananarivo' }
    ]
  },
  languages: [
    { code: 'FR', flag: '🇫🇷' },
    { code: 'EN', flag: '🇬🇧' }
  ],
  reserveButton: "Réserver",
  mobileMenuTitle: "Menu"
};
```


---
## mariagesData.ts

```ts
import eventImage from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';

export const mariagesPageData = {
  heroTitle: "Mariages de Prestige",
  heroSubtitle: "Votre jour le plus beau",
  heroImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920',
  content: `
    <div class="prose prose-lg">
      <p>Organisez votre mariage dans un cadre d'exception. Nos espaces modulables sont équipés pour des cérémonies mémorables.</p>
      <h2>Pourquoi choisir nos services ?</h2>
      <ul>
        <li>Service impeccable et personnalisé</li>
        <li>Équipements high-tech inclus</li>
        <li>Emplacements variés pour tous les formats</li>
      </ul>
    </div>
  `,
  sections: [
    {
      id: 1,
      name: "Mariages de Prestige",
      subtitle: "Votre jour le plus beau",
      description: "Célébrez votre union dans un cadre d'exception avec nos services de mariage sur mesure. Du cocktail de réception au dîner de gala, chaque détail est pensé pour créer des souvenirs inoubliables.",
      image: eventImage,
      capacity: "20 - 200 invités",
      duration: "Journée complète ou weekend",
      equipment: [
        "Coordinateur de mariage dédié",
        "Choix de lieux de cérémonie",
        "Menu gastronomique personnalisé",
        "Décoration florale incluse",
        "Suite nuptiale offerte"
      ],
      features: [
        "Photographe professionnel disponible",
        "Service traiteur haut de gamme",
        "Orchestre ou DJ au choix"
      ],
      venues: ["La Terrasse Aile Droite", "Ravinala", "Toit de Tana", "Restaurant Île Rouge"]
    }
  ],
  cta: {
    title: "Planifions Votre Mariage",
    subtitle: "Notre équipe dédiée aux mariages vous accompagne de la conception à la réalisation",
    buttonText: "Demander un devis"
  }
};
```


---
## offresData.ts

```ts
export const offresPageData = {
  hero: {
    title: "Offres Spéciales",
    description: "Découvrez nos séjours d'exception conçus pour créer des souvenirs inoubliables au cœur de Madagascar"
  },
  offers: [
    {
      id: 1,
      title: "Escapade Romantique",
      subtitle: "Pour les amoureux",
      description: "Vivez une expérience inoubliable dans l'une de nos suites de prestige avec vue panoramique sur Antananarivo.",
      duration: "2 nuits minimum",
      category: "Romance",
      features: [
        "Suite avec vue panoramique",
        "Petit-déjeuner en chambre",
        "Dîner aux chandelles à Île Rouge",
        "Massage duo au spa (sur demande)",
        "Champagne de bienvenue"
      ],
      validUntil: "31 Mars 2024",
      highlight: "Le plus populaire"
    },
    {
      id: 2,
      title: "Séjour Gastronomique",
      subtitle: "Pour les épicuriens",
      description: "Découvrez l'excellence culinaire du Carlton Madagascar à travers nos quatre établissements uniques.",
      duration: "3 nuits minimum",
      category: "Gastronomie",
      features: [
        "Chambre Deluxe avec balcon",
        "Menu dégustation à Île Rouge",
        "Déjeuner tropical à l'Oasis",
        "Soirée cocktails au Bistrot",
        "Atelier pâtisserie à L'Éclair"
      ],
      validUntil: "30 Avril 2024",
      highlight: "Nouveau"
    },
    {
      id: 3,
      title: "Retraite Bien-être",
      subtitle: "Pour se ressourcer",
      description: "Accordez-vous une parenthèse de détente absolue dans un cadre d'exception avec nos services de bien-être.",
      duration: "4 nuits minimum",
      category: "Bien-être",
      features: [
        "Suite avec terrasse privée",
        "Accès illimité fitness & piscine",
        "Cours de yoga personnalisé",
        "Cuisine healthy à l'Oasis",
        "Activités sportives au choix"
      ],
      validUntil: "31 Mai 2024",
      highlight: "Offre exclusive"
    },
    {
      id: 4,
      title: "Découverte de Madagascar",
      subtitle: "Pour les aventuriers",
      description: "Explorez les merveilles de la Grande Île tout en profitant du luxe et du confort du Carlton Madagascar.",
      duration: "5 nuits minimum",
      category: "Aventure",
      features: [
        "Suite Présidentielle disponible",
        "Excursions privées avec guide",
        "Transport de luxe inclus",
        "Repas dans nos 4 restaurants",
        "Souvenirs artisanaux offerts"
      ],
      validUntil: "30 Juin 2024",
      highlight: "Expérience unique"
    }
  ],
  seasonalOffers: [
    {
      title: "Soirée Jazz",
      period: "Chaque vendredi",
      description: "Ambiance musicale exceptionnelle avec nos musiciens jazz dans le cadre élégant du Bistrot du Carlton"
    },
    {
      title: "Brunch Dominical",
      period: "Tous les dimanches",
      description: "Un buffet gastronomique exceptionnel alliant saveurs françaises et spécialités malgaches"
    },
    {
      title: "Soirée Dégustation",
      period: "Premier samedi du mois",
      description: "Découvrez notre sélection de vins et spiritueux accompagnés de mets raffinés"
    }
  ],
  cta: {
    title: "Besoin d'une offre sur mesure ?",
    description: "Notre équipe de conciergerie est à votre disposition pour créer un séjour parfaitement adapté à vos envies",
    buttonTexts: {
      primary: "Contacter notre conciergerie",
      secondary: "Demander un rappel"
    }
  }
};
```


---
## restaurantsData.ts

```ts
import restaurantImage from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';
import luxuryRestaurantImage from '@assets/generated_images/Luxury_hotel_restaurant_interior_090ad235.png';

export const restaurantsPageData = {
  heroTitle: 'Restaurants & Bars',
  heroSubtitle: 'Quatre univers culinaires pour une expérience gastronomique d\'exception au cœur de Madagascar',
  heroImage: luxuryRestaurantImage,
  content: `
    <div class="prose prose-lg">
      <p>Découvrez nos restaurants dans un cadre d'exception. Nos espaces sont équipés pour des expériences culinaires mémorables.</p>
      <h2>Pourquoi choisir nos services ?</h2>
      <ul>
        <li>Service impeccable et personnalisé</li>
        <li>Équipements high-tech inclus</li>
        <li>Emplacements variés pour tous les formats</li>
      </ul>
    </div>
  `,
  stats: [
    { icon: "Utensils", value: 4, label: "Restaurants & Bars" },
    { icon: "Star", value: "5★", label: "Gastronomie" },
    { icon: "Clock", value: "7h-23h", label: "Service continu" },
    { icon: "Sparkles", value: "Premium", label: "Cuisine d'exception" }
  ],
  sections: [
    {
      id: 1,
      type: 'restaurant',
      name: "Île Rouge & la Terrasse",
      subtitle: "Restaurant Gastronomique",
      description: "Notre restaurant phare vous invite à découvrir une cuisine d'exception où l'art culinaire français se marie harmonieusement aux saveurs authentiques de Madagascar.",
      detailedDescription: "Île Rouge & la Terrasse propose une cuisine gastronomique qui sublime les produits locaux de Madagascar avec les techniques françaises les plus raffinées.",
      image: restaurantImage,
      rating: 5,
      priceRange: "€€€€",
      hours: "19h00 - 23h00",
      capacity: "100 couverts",
      reservationRequired: true,
      dressCode: "Tenue élégante exigée",
      specialties: ["Menu dégustation 7 services", "Homard de Nossy-Be", "Zébu de Haute-Matsiatra"],
      features: ["Terrasse panoramique", "Menu végétarien disponible", "Service de table"]
    }
  ]
};
```


---
## restaurantShowcaseData.ts

```ts
// src/data/restaurantShowcaseData.ts
export const restaurantShowcaseData = {
  title: "Restaurants & Bars",
  description: "Quatre établissements d'exception : Île Rouge & la Terrasse, Le Bistrot du Carlton, L'Oasis de Tana et L'Eclair by Carlton.",
  restaurants: [
    {
      id: 1,
      name: "Île Rouge & la Terrasse",
      type: "Restaurant Gastronomique",
      description: "Notre restaurant phare vous invite à découvrir une cuisine d'exception où l'art culinaire français se marie harmonieusement aux saveurs authentiques de Madagascar.",
      image: "/assets/generated_images/Fine_dining_restaurant_1275a5b9.png",
      rating: 5,
      priceRange: "€€€€",
      hours: "19h00 - 23h00",
      capacity: "60 couverts",
      specialties: ["Menu dégustation 7 services", "Homard de Nossy-Be", "Zébu de Haute-Matsiatra", "Sélection de vins français"]
    },
    {
      id: 2,
      name: "Le Bistrot du Carlton",
      type: "Bar & Brasserie de Classe",
      description: "Un bistrot élégant dans l'esprit parisien où vous pourrez savourer des plats raffinés dans une ambiance conviviale et chaleureuse.",
      image: "/assets/generated_images/Fine_dining_restaurant_1275a5b9.png",
      rating: 4,
      priceRange: "€€€",
      hours: "12h00 - 15h00, 18h00 - 01h00",
      capacity: "80 couverts",
      specialties: ["Plateaux de fromages", "Tartares et carpaccios", "Cocktails signature", "Vins au verre"]
    },
    {
      id: 3,
      name: "L'Oasis de Tana",
      type: "Restaurant au Bord de Piscine",
      description: "Savourez une cuisine légère et rafraîchissante dans un cadre tropical idyllique, les pieds dans l'eau avec vue sur notre piscine infinity.",
      image: "/assets/generated_images/Fine_dining_restaurant_1275a5b9.png",
      rating: 4,
      priceRange: "€€€",
      hours: "11h00 - 19h00",
      capacity: "50 places",
      specialties: ["Salades tropicales", "Grillades au feu de bois", "Cocktails de fruits frais", "Poissons du jour"]
    },
    {
      id: 4,
      name: "L'Eclair by Carlton",
      type: "Pâtisserie Fine",
      description: "Notre pâtisserie artisanale vous propose des créations sucrées d'exception, des viennoiseries fraîches aux desserts signatures de nos chefs pâtissiers.",
      image: "/assets/generated_images/Fine_dining_restaurant_1275a5b9.png",
      rating: 5,
      priceRange: "€€",
      hours: "07h00 - 20h00",
      capacity: "25 places",
      specialties: ["Éclairs signature", "Macarons aux saveurs malgaches", "Viennoiseries françaises", "Chocolats artisanaux"]
    }
  ],
  menuButton: "Voir la carte"
};
```


---
## roomsShowcaseData.ts

```ts
// src/data/roomsShowcaseData.ts
export const roomsShowcaseData = {
  title: "Chambres & Suites",
  description: "171 chambres et suites élégantes avec vue imprenable sur la Haute Ville d'Antananarivo, le Palais de la Reine et le lac Anosy.",
  rooms: [
    {
      id: 1,
      name: "Presidential Suites",
      description: "Vue imprenable sur le Palais de la Reine et le Lac Anosy. King size bedded Room, grand salon confortable avec kitchenette.",
      size: "96",
      guests: "4",
      image: "/assets/generated_images/Luxury_suite_interior_386342fd.png",
      amenities: ["Vue Palais de la Reine", "Vue Lac Anosy", "Kitchenette", "Butler service"]
    },
    {
      id: 2,
      name: "Suites Royal Palace & Lake View",
      description: "Vue exceptionnelle sur le patrimoine royal. Queen bedded Room, grand salon confortable, kitchenette.",
      size: "72",
      guests: "3",
      image: "/assets/generated_images/Luxury_suite_interior_386342fd.png",
      amenities: ["Vue Palais de la Reine", "Vue Lac Anosy", "Salon confortable", "Kitchenette"]
    },
    {
      id: 3,
      name: "Club Suites",
      description: "Queen bedded Room avec salon confortable. Privilèges exclusifs et services personnalisés.",
      size: "48",
      guests: "2",
      image: "/assets/generated_images/Luxury_suite_interior_386342fd.png",
      amenities: ["Salon confortable", "Accès Club Carlton", "Services premium", "Check-in privé"]
    },
    {
      id: 4,
      name: "Executive & Premium Rooms",
      description: "Vue sur la Haute Ville d'Antananarivo et le Palais de la Reine. Queen ou Twin-bedded Room.",
      size: "24",
      guests: "2",
      image: "/assets/generated_images/Luxury_suite_interior_386342fd.png",
      amenities: ["Vue Haute Ville", "Queen ou Twin beds", "Design moderne", "Executive Lounge"]
    }
  ],
  commonAmenities: [
    { icon: "Wifi", label: "WiFi gratuit" },
    { icon: "Car", label: "Parking privé" },
    { icon: "Coffee", label: "Service en chambre 24h" },
    { icon: "Utensils", label: "Minibar premium" },
    { icon: "Bath", label: "Salle de bain luxe" },
    { icon: "Bed", label: "Literie haut de gamme" }
  ],
  ctaTitle: "Besoin d'aide pour choisir ?",
  ctaDescription: "Notre équipe de conciergerie est à votre disposition pour vous conseiller et personnaliser votre séjour.",
  ctaButtons: {
    contact: "Contacter la Conciergerie",
    viewAll: "Voir toutes les chambres"
  },
  bookButton: "Réserver",
  detailsButton: "Détails"
};
```


---
## servicesBoutiquesData.ts

```ts
import servicesImage from '@assets/stock_images/luxury_hotel_concier_6320d533.jpg';
import boutiquesImage from '@assets/stock_images/luxury_hotel_boutiqu_880b0196.jpg';

export const servicesBoutiquesPageData = {
  hero: {
    title: "Services & Boutiques",
    description: "Découvrez notre gamme complète de services personnalisés et nos boutiques exclusives pour enrichir votre séjour au Carlton Madagascar."
  },
  services: {
    title: "Services Exclusifs",
    description: "Une équipe dédiée à votre service pour répondre à tous vos besoins avec professionnalisme et attention du détail.",
    image: servicesImage,
    items: [
      {
        title: "Service de Conciergerie",
        description: "Notre équipe de concierges dédiée est à votre service 24h/24 pour organiser vos excursions, réservations et demandes spéciales.",
        icon: "Bell",
        features: ["Disponible 24h/24", "Réservations restaurants", "Organisation d'excursions", "Demandes personnalisées"],
        category: "Service Premium"
      },
      {
        title: "Service de Voiturier",
        description: "Service de voiturier professionnel pour votre véhicule avec parking sécurisé dans notre garage privé.",
        icon: "Car",
        features: ["Parking sécurisé", "Service 24h/24", "Nettoyage véhicule", "Garage couvert"],
        category: "Transport"
      },
      {
        title: "Transferts Aéroport",
        description: "Service de transfert privé depuis et vers l'aéroport d'Antananarivo avec véhicules de luxe.",
        icon: "Plane",
        features: ["Véhicules de luxe", "Chauffeur privé", "Service porte-à-porte", "Réservation à l'avance"],
        category: "Transport"
      },
      {
        title: "Service de Blanchisserie",
        description: "Service de blanchisserie et pressing de qualité supérieure avec retour en 24h.",
        icon: "Shirt",
        features: ["Pressing professionnel", "Retour 24h", "Nettoyage à sec", "Service en chambre"],
        category: "Services"
      },
      {
        title: "Room Service 24h/24",
        description: "Service en chambre disponible 24h/24 avec menu complet de nos restaurants.",
        icon: "Coffee",
        features: ["Service 24h/24", "Menu complet", "Service rapide", "Présentation soignée"],
        category: "Restauration"
      },
      {
        title: "Business Center",
        description: "Centre d'affaires équipé avec internet haut débit, imprimantes et salles de réunion.",
        icon: "Wifi",
        features: ["Internet haut débit", "Impressions", "Fax et photocopies", "Salles équipées"],
        category: "Business"
      }
    ]
  },
  boutiques: {
    title: "Nos Boutiques",
    description: "Découvrez l'artisanat et les produits authentiques de Madagascar dans nos boutiques exclusives au sein de l'hôtel.",
    image: boutiquesImage,
    items: [
      {
        title: "Boutique Carlton",
        description: "Découvrez notre sélection d'articles de luxe, souvenirs de Madagascar et produits artisanaux locaux.",
        hours: "Ouvert tous les jours de 8h à 20h",
        specialties: ["Artisanat malgache", "Bijoux locaux", "Textiles traditionnels", "Souvenirs de qualité"],
        location: "Rez-de-chaussée, hall principal"
      },
      {
        title: "Boutique Bien-être",
        description: "Produits de beauté et bien-être, huiles essentielles et cosmétiques naturels de Madagascar.",
        hours: "Ouvert tous les jours de 9h à 19h",
        specialties: ["Huiles essentielles", "Cosmétiques naturels", "Produits de beauté", "Soins corpo"],
        location: "Niveau piscine"
      }
    ]
  },
  cta: {
    title: "Profitez de Nos Services Exclusifs",
    description: "Réservez votre séjour au Carlton Madagascar et découvrez nos services personnalisés",
    buttonText: "Réserver votre chambre"
  }
};
```


---
## spaLeisureData.ts

```ts
// src/data/spaLeisureData.ts
export const spaLeisureData = {
  title: "Loisirs & Sports",
  description: "Profitez de nos installations sportives et de loisirs d'exception, conçues pour votre détente et votre bien-être.",
  activities: [
    {
      icon: "Waves",
      name: "Sports Aquatiques",
      description: "Piscine, aqua-fitness, natation",
      available: "Tous les jours"
    },
    {
      icon: "Dumbbell",
      name: "Fitness & Musculation",
      description: "Salle équipée, cours collectifs",
      available: "24h/24"
    },
    {
      icon: "Zap",
      name: "Tennis & Sports",
      description: "Court de tennis, activités sportives",
      available: "6h00 - 22h00"
    }
  ],
  services: [
    {
      id: 1,
      name: "Piscine Infinity",
      description: "Une piscine à débordement avec vue panoramique sur Antananarivo, chauffée toute l'année.",
      image: "/assets/generated_images/Spa_wellness_facilities_3dba6f04.png",
      features: ["Vue panoramique", "Chauffage intégral", "Bar aquatique", "Espace détente"],
      hours: "6h00 - 22h00",
      access: "Clients de l'hôtel"
    },
    {
      id: 2,
      name: "Fitness Center",
      description: "Un centre de remise en forme ultramoderne équipé des dernières technologies Technogym.",
      image: "/assets/generated_images/Spa_wellness_facilities_3dba6f04.png",
      equipment: ["Cardio dernière génération", "Musculation complète", "Cours collectifs", "Coach personnel"],
      hours: "24h/24",
      access: "Accès libre"
    },
    {
      id: 3,
      name: "Terrain de Tennis",
      description: "Court de tennis professionnel avec éclairage nocturne pour vos parties en soirée.",
      image: "/assets/generated_images/Spa_wellness_facilities_3dba6f04.png",
      features: ["Surface terre battue", "Éclairage LED", "Vestiaires privés", "Location d'équipement"],
      hours: "6h00 - 22h00",
      access: "Réservation requise"
    }
  ],
  packagesTitle: "Forfaits Loisirs",
  packagesDescription: "Découvrez nos packages exclusifs combinant hébergement, restauration et activités sportives",
  packages: [
    {
      name: "Évasion Romantique",
      duration: "2 jours / 1 nuit",
      includes: ["Suite avec vue", "Dîner gastronomique", "Accès piscine privé"]
    },
    {
      name: "Sports & Fitness",
      duration: "3 jours / 2 nuits",
      includes: ["Coaching personnel", "Accès tennis", "Programme fitness"]
    },
    {
      name: "Détente Weekend",
      duration: "2 jours / 1 nuit",
      includes: ["Accès loisirs illimité", "Piscine infinity", "Activités aquatiques"]
    }
  ]
};
```
