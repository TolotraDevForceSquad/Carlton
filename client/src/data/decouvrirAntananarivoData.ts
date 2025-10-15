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