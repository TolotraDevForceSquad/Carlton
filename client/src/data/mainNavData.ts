// src/data/mainNavData.ts
export const mainNavData = {
  menus: [
    { id: 1, translations: { fr: "Accueil", en: "Home" }, link: "/", position: 1 },
    { id: 2, translations: { fr: "Offres Spéciales", en: "Special Offers" }, link: "/offres", position: 2 },
    { id: 3, translations: { fr: "Séjour", en: "Stay" }, link: "/chambres", position: 3 },
    { id: 4, translations: { fr: "Restauration", en: "Dining" }, link: "/restaurants", position: 4 },
    { id: 5, translations: { fr: "Bien-être", en: "Wellness" }, link: "/bien-etre-loisirs", position: 5 },
    { id: 6, translations: { fr: "Événements", en: "Events" }, link: "/evenements", position: 6 },
    { id: 7, translations: { fr: "Découverte", en: "Discover" }, link: "/galerie", position: 7 },
    { id: 8, translations: { fr: "Contact", en: "Contact" }, link: "/contact", position: 8 }
  ],
  subMenus: {
    '/chambres': [
      { label: { fr: 'Chambres & Suites', en: 'Rooms & Suites' }, href: '/chambres' },
      { label: { fr: 'Services & Boutiques', en: 'Services & Shops' }, href: '/services-boutiques' }
    ],
    '/restaurants': [
      { label: { fr: 'Île Rouge & la Terrasse', en: 'Île Rouge & the Terrace' }, href: '/restaurants#ile-rouge' },
      { label: { fr: 'Le Bistrot du Carlton', en: 'The Carlton Bistro' }, href: '/restaurants#bistrot' },
      { label: { fr: 'L\'Oasis de Tana', en: 'Tana Oasis' }, href: '/restaurants#oasis' },
      { label: { fr: 'L\'Éclair by Carlton', en: 'Carlton Éclair' }, href: '/restaurants#eclair' }
    ],
    '/bien-etre-loisirs': [
      { label: { fr: 'Piscine', en: 'Pool' }, href: '/bien-etre-loisirs#piscine' },
      { label: { fr: 'Fitness', en: 'Gym' }, href: '/bien-etre-loisirs#salle-sport' },
      { label: { fr: 'Tennis', en: 'Tennis Court' }, href: '/bien-etre-loisirs#tennis' },
      { label: { fr: 'Soins Holistiques', en: 'Holistic Care' }, href: '/bien-etre-loisirs#soins' }
    ],
    '/evenements': [
      { label: { fr: 'Mariages', en: 'Weddings' }, href: '/evenements#mariages' },
      { label: { fr: 'Corporate', en: 'Corporate' }, href: '/evenements#corporate' },
      { label: { fr: 'Célébrations', en: 'Celebrations' }, href: '/evenements#celebrations' },
      { label: { fr: 'Galas & Lancements', en: 'Galas & Launches' }, href: '/evenements#galas' },
      { label: { fr: 'Nos espaces', en: 'Our Spaces' }, href: '/evenements#salles' }
    ],
    '/galerie': [
      { label: { fr: 'Galerie', en: 'Gallery' }, href: '/galerie' },
      { label: { fr: 'Découvrir Antananarivo', en: 'Discover Antananarivo' }, href: '/decouvrir-antananarivo' }
    ]
  },
  languages: [
    { code: 'FR', flag: '🇫🇷' },
    { code: 'EN', flag: '🇬🇧' }
  ],
  reserveButton: { fr: "Réservez", en: "Reserve" },
  mobileMenuTitle: { fr: "Menu", en: "Menu" }
};