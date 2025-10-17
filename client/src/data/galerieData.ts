// src/data/galerieData.ts
import hotelExterior from '@assets/generated_images/Carlton_hotel_exterior_view_8ca3b91a.png';
import luxurySuite from '@assets/generated_images/Luxury_suite_interior_386342fd.png';
import restaurant from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';
import spa from '@assets/generated_images/Spa_wellness_facilities_3dba6f04.png';

export const galeriePageData = {
  hero: {
    title: {
      fr: "Galerie",
      en: "Gallery"
    },
    description: {
      fr: "Explorez l'univers visuel du Carlton Madagascar à travers notre collection de photographies mettant en valeur l'élégance et le raffinement de notre établissement.",
      en: "Explore the visual universe of Carlton Madagascar through our collection of photographs highlighting the elegance and refinement of our establishment."
    }
  },
  galleries: [
    {
      title: {
        fr: "Hôtel & Architecture",
        en: "Hotel & Architecture"
      },
      description: {
        fr: "Découvrez l'architecture élégante du Carlton Madagascar et ses espaces communs luxueux.",
        en: "Discover the elegant architecture of Carlton Madagascar and its luxurious common areas."
      },
      images: [
        {
          src: hotelExterior,
          alt: {
            fr: "Carlton Madagascar - Vue extérieure",
            en: "Carlton Madagascar - Exterior View"
          },
          category: {
            fr: "Architecture",
            en: "Architecture"
          },
          title: {
            fr: "Façade du Carlton Madagascar",
            en: "Carlton Madagascar Facade"
          }
        },
        {
          src: hotelExterior,
          alt: {
            fr: "Lobby principal",
            en: "Main Lobby"
          },
          category: {
            fr: "Architecture",
            en: "Architecture"
          },
          title: {
            fr: "Hall d'accueil majestueux",
            en: "Majestic Welcome Hall"
          }
        },
        {
          src: hotelExterior,
          alt: {
            fr: "Terrasse panoramique",
            en: "Panoramic Terrace"
          },
          category: {
            fr: "Architecture",
            en: "Architecture"
          },
          title: {
            fr: "Terrasse avec vue sur Antananarivo",
            en: "Terrace with View of Antananarivo"
          }
        },
        {
          src: hotelExterior,
          alt: {
            fr: "Architecture extérieure de nuit",
            en: "Exterior Architecture at Night"
          },
          category: {
            fr: "Architecture",
            en: "Architecture"
          },
          title: {
            fr: "L'hôtel illuminé la nuit",
            en: "The Hotel Illuminated at Night"
          }
        }
      ]
    },
    {
      title: {
        fr: "Chambres & Suites",
        en: "Rooms & Suites"
      },
      description: {
        fr: "Nos hébergements luxueux allient confort moderne et élégance raffinée.",
        en: "Our luxurious accommodations combine modern comfort and refined elegance."
      },
      images: [
        {
          src: luxurySuite,
          alt: {
            fr: "Suite Présidentielle",
            en: "Presidential Suite"
          },
          category: {
            fr: "Hébergement",
            en: "Accommodation"
          },
          title: {
            fr: "Suite Présidentielle - Salon",
            en: "Presidential Suite - Living Room"
          }
        },
        {
          src: luxurySuite,
          alt: {
            fr: "Suite Exécutive",
            en: "Executive Suite"
          },
          category: {
            fr: "Hébergement",
            en: "Accommodation"
          },
          title: {
            fr: "Suite Exécutive avec vue",
            en: "Executive Suite with View"
          }
        },
        {
          src: luxurySuite,
          alt: {
            fr: "Chambre Deluxe",
            en: "Deluxe Room"
          },
          category: {
            fr: "Hébergement",
            en: "Accommodation"
          },
          title: {
            fr: "Chambre Deluxe - Confort premium",
            en: "Deluxe Room - Premium Comfort"
          }
        },
        {
          src: luxurySuite,
          alt: {
            fr: "Salle de bain suite",
            en: "Suite Bathroom"
          },
          category: {
            fr: "Hébergement",
            en: "Accommodation"
          },
          title: {
            fr: "Salle de bain en marbre",
            en: "Marble Bathroom"
          }
        }
      ]
    },
    {
      title: {
        fr: "Restaurants & Bars",
        en: "Restaurants & Bars"
      },
      description: {
        fr: "L'art culinaire à son apogée dans nos quatre établissements gastronomiques.",
        en: "Culinary art at its peak in our four gastronomic establishments."
      },
      images: [
        {
          src: restaurant,
          alt: {
            fr: "Restaurant Île Rouge",
            en: "Île Rouge Restaurant"
          },
          category: {
            fr: "Gastronomie",
            en: "Gastronomy"
          },
          title: {
            fr: "Île Rouge - Dining gastronomique",
            en: "Île Rouge - Gastronomic Dining"
          }
        },
        {
          src: restaurant,
          alt: {
            fr: "Le Bistrot du Carlton",
            en: "Le Bistrot du Carlton"
          },
          category: {
            fr: "Gastronomie",
            en: "Gastronomy"
          },
          title: {
            fr: "Le Bistrot - Ambiance feutrée",
            en: "Le Bistrot - Intimate Ambiance"
          }
        },
        {
          src: restaurant,
          alt: {
            fr: "L'Oasis de Tana",
            en: "L'Oasis de Tana"
          },
          category: {
            fr: "Gastronomie",
            en: "Gastronomy"
          },
          title: {
            fr: "L'Oasis - Restaurant piscine",
            en: "L'Oasis - Poolside Restaurant"
          }
        },
        {
          src: restaurant,
          alt: {
            fr: "L'Éclair Pâtisserie",
            en: "L'Éclair Patisserie"
          },
          category: {
            fr: "Gastronomie",
            en: "Gastronomy"
          },
          title: {
            fr: "L'Éclair - Pâtisserie française",
            en: "L'Éclair - French Patisserie"
          }
        }
      ]
    },
    {
      title: {
        fr: "Bien-être & Loisirs",
        en: "Wellness & Leisure"
      },
      description: {
        fr: "Installations de détente et d'activités pour votre bien-être total.",
        en: "Relaxation facilities and activities for your total well-being."
      },
      images: [
        {
          src: spa,
          alt: {
            fr: "Piscine infinity",
            en: "Infinity Pool"
          },
          category: {
            fr: "Loisirs",
            en: "Leisure"
          },
          title: {
            fr: "Piscine infinity avec vue panoramique",
            en: "Infinity Pool with Panoramic View"
          }
        },
        {
          src: spa,
          alt: {
            fr: "Salle de sport",
            en: "Gym"
          },
          category: {
            fr: "Loisirs",
            en: "Leisure"
          },
          title: {
            fr: "Centre de fitness moderne",
            en: "Modern Fitness Center"
          }
        },
        {
          src: spa,
          alt: {
            fr: "Court de tennis",
            en: "Tennis Court"
          },
          category: {
            fr: "Loisirs",
            en: "Leisure"
          },
          title: {
            fr: "Court de tennis professionnel",
            en: "Professional Tennis Court"
          }
        },
        {
          src: spa,
          alt: {
            fr: "Soins holistiques",
            en: "Holistic Treatments"
          },
          category: {
            fr: "Bien-être",
            en: "Wellness"
          },
          title: {
            fr: "Espace soins et relaxation",
            en: "Treatment and Relaxation Space"
          }
        }
      ]
    }
  ],
  categories: [
    { fr: "Tous", en: "All" },
    { fr: "Architecture", en: "Architecture" },
    { fr: "Hébergement", en: "Accommodation" },
    { fr: "Gastronomie", en: "Gastronomy" },
    { fr: "Loisirs", en: "Leisure" },
    { fr: "Bien-être", en: "Wellness" }
  ],
  virtualTour: {
    title: {
      fr: "Visite Virtuelle",
      en: "Virtual Tour"
    },
    description: {
      fr: "Découvrez l'ensemble de nos installations grâce à notre visite virtuelle interactive 360°",
      en: "Discover all our facilities through our interactive 360° virtual tour"
    },
    items: [
      {
        title: {
          fr: "Hall d'Accueil",
          en: "Welcome Hall"
        },
        description: {
          fr: "Explorez notre lobby majestueux",
          en: "Explore our majestic lobby"
        },
        icon: "Eye"
      },
      {
        title: {
          fr: "Suite Présidentielle",
          en: "Presidential Suite"
        },
        description: {
          fr: "Découvrez nos hébergements d'exception",
          en: "Discover our exceptional accommodations"
        },
        icon: "Eye"
      },
      {
        title: {
          fr: "Restaurant Île Rouge",
          en: "Île Rouge Restaurant"
        },
        description: {
          fr: "Visitez notre restaurant gastronomique",
          en: "Visit our gastronomic restaurant"
        },
        icon: "Eye"
      }
    ],
    buttonText: {
      fr: "Commencer la Visite Virtuelle Complète",
      en: "Start the Full Virtual Tour"
    }
  }
};