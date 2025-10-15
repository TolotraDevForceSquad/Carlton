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