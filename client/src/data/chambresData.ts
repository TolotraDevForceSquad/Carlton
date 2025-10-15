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