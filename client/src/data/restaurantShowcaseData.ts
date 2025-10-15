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