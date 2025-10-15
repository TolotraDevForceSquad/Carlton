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