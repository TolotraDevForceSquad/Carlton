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