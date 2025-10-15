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