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