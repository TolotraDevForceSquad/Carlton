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