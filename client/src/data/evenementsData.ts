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