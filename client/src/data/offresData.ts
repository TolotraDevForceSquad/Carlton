// src/data/offresData.ts
export const offresPageData = {
  hero: {
    title: { fr: 'Offres spéciales', en: 'Special Offers' },
    description: {
      fr: 'Profitez de nos offres et évènements spéciaux (-) pour une expérience personnalisée.',
      en: 'Enjoy our special offers and events (-) for a personalized experience.'
    },
    image: '/uploads/Offre.png'
  },
  mainSection: {
    title: { fr: 'Moments Carlton', en: 'Carlton Moments' },
    description: { fr: '', en: '' },
    show: true
  },
  offerFeaturesTitle: { fr: 'Ce qui est inclus :', en: 'What\'s included :' },
  offers: [
    {
      id: 1,
      title: { fr: 'Business Lunch', en: 'Business Lunch' },
      subtitle: { fr: 'Menu à 2 ou 3 services au choix', en: '2 or 3-course menu to choose from' },
      description: {
        fr: 'Un déjeuner menu en 2 ou 3 plats selon vos envies. Concocté avec soin pour s’adapter à votre emploi du temps, il est servi dans un rythme fluide, sans compromis sur la qualité. Une formule parfaite pour votre pause déjeuner ou une rencontre professionnelle.',
        en: 'A lunch menu in 2 or 3 dishes according to your wishes. Carefully prepared to fit your schedule, it is served at a smooth pace, without compromising on quality. A perfect formula for your lunch break or a professional meeting.'
      },
      duration: { fr: 'Du lundi au vendredi, de 12h à 14h30', en: 'Monday to Friday from 12pm to 2:30pm' },
      category: { fr: 'Business Lunch', en: 'Business Lunch' },
      features: [
        { fr: 'Menu à 2 services : Entrée + Plat ou Plat + Dessert à 64.000 Ariary', en: '2-course menu: Starter + Main or Main + Dessert at 64,000 Ariary' },
        { fr: 'Menu à 3 services : Entrée + Plat + Dessert à 73.000 Ariary', en: '3-course menu: Starter + Main + Dessert at 73,000 Ariary' }
      ],
      validUntil: { fr: '', en: '' },
      highlight: null,
      image: '/uploads/Offre.png',
      hidden: false
    },
    {
      id: 2,
      title: { fr: 'L’Apéro du Chef', en: 'The Chef\'s Aperitif' },
      subtitle: { fr: 'Suggestion d’apéro sur ardoise du Chef', en: 'Chef\'s Aperitif Suggestion on the Blackboard' },
      description: {
        fr: 'Des assiettes d’amuse-bouches salés au choix, variés et savoureux, à partager — ou pas. Parfait pour se détendre en fin de journée, que vous soyez seul ou entre amis, après une longue journée. Un moment de plaisir simple, gourmand et bien mérité.',
        en: 'Plates of savory amuse-bouches to choose from, varied and tasty, to share — or not. Perfect for relaxing at the end of the day, whether alone or with friends, after a long day. A simple, indulgent, and well-deserved moment of pleasure.'
      },
      duration: {
        fr: 'Du lundi au vendredi à partir de 17h à 19h',
        en: 'Monday to Friday from 5pm to 7pm'
      },
      category: { fr: 'Apéritif', en: 'Aperitif' },
      features: [
        { fr: 'Une ardoise d’aperitifs au choix', en: 'A choice of aperitifs on the blackboard' },
        { fr: 'Prix : 28.000 Ariary', en: 'Price: 28,000 Ariary' }
      ],
      validUntil: { fr: '', en: '' },
      highlight: null,
      image: '/uploads/Offre.png',
      hidden: false
    },
    {
      id: 3,
      title: { fr: 'Yoga', en: 'Yoga' },
      subtitle: { fr: 'Tous les samedis à 8h', en: 'Every Saturday at 8am' },
      description: {
        fr: 'Commencez votre week-end en douceur avec une séance de yoga d’une heure, un rituel parfait pour relâcher la pression du quotidien et retrouver l’équilibre. Un petit-déjeuner est offert à la fin de séance pour prolonger cette pause de bien-être.',
        en: 'Start your weekend gently with a one-hour yoga session, a perfect ritual to release daily stress and regain balance. A breakfast is offered at the end of the session to extend this wellness break.'
      },
      duration: { fr: 'Tous les samedis à 8h', en: 'Every Saturday at 8am' },
      category: { fr: 'Bien-être', en: 'Wellness' },
      features: [
        { fr: 'Une séance de yoga d\'une heure et un petit-déjeuner', en: 'A one-hour yoga session and a complimentary breakfast' },
        { fr: '50.000 Ar', en: '50,000 Ar' },
      ],
      validUntil: { fr: '', en: '' },
      highlight: null,
      image: '/uploads/Offre.png',
      hidden: false
    }
  ],
  seasonalSection: {
    title: { fr: 'Rendez-vous Festifs', en: 'Festive Appointments' },
    description: { fr: '', en: '' },
    show: true
  },
  seasonalOffers: [
    {
      title: { fr: 'Soirée Jazz Enchantée', en: 'Enchanted Jazz Evening' },
      period: { fr: 'Chaque vendredi soir', en: 'Every Friday evening' },
      description: {
        fr: 'Laissez-vous emporter par les mélodies envoûtantes du jazz live dans l\'atmosphère feutrée du Bistrot du Carlton. Accompagné de cocktails signature et d\'assiettes raffinées, c\'est l\'occasion idéale pour une soirée sophistiquée entre collègues ou amoureux de la musique.',
        en: 'Let yourself be carried away by the enchanting melodies of live jazz in the intimate atmosphere of the Carlton\'s Bistrot. Paired with signature cocktails and refined plates, it\'s the perfect opportunity for a sophisticated evening with colleagues or music lovers.'
      },
      image: '/uploads/Env.png',
      hidden: false
    },
    {
      title: { fr: 'Brunch Tropical Dominical', en: 'Tropical Sunday Brunch' },
      period: { fr: 'Tous les dimanches de 11h à 15h', en: 'Every Sunday from 11am to 3pm' },
      description: {
        fr: 'Un festin dominical aux saveurs exotiques de Madagascar fusionnées avec la finesse française. Buffets à volonté avec fruits frais, fruits de mer, pâtisseries artisanales et animations musicales pour une pause gourmande en famille ou entre amis.',
        en: 'A Sunday feast blending Madagascar\'s exotic flavors with French finesse. All-you-can-eat buffets featuring fresh fruits, seafood, artisanal pastries, and live music for a indulgent family or friends gathering.'
      },
      image: '/uploads/Env.png',
      hidden: false
    },
    {
      title: { fr: 'Nuit des Étoiles et Vins', en: 'Stars and Wines Night' },
      period: { fr: 'Premier samedi du mois', en: 'First Saturday of the month' },
      description: {
        fr: 'Sous un ciel étoilé, découvrez une sélection exclusive de vins malgaches et internationaux, harmonisés avec des accords mets d\'exception. Dégustations guidées par nos sommeliers, dans le cadre enchanteur des jardins du Carlton.',
        en: 'Under a starry sky, discover an exclusive selection of Malagasy and international wines, paired with exceptional food matches. Guided tastings by our sommeliers, in the enchanting setting of the Carlton\'s gardens.'
      },
      image: '/uploads/Env.png',
      hidden: false
    }
  ],
  cta: {
    title: { fr: 'Et si vous preniez du temps pour vous ?', en: 'What if you took some time for yourself?' },
    description: { fr: 'Laissez-vous tenter par un moment au Carlton Madagascar', en: 'Let yourself be tempted by a moment at Carlton Madagascar' },
    buttonTexts: {
      primary: { fr: 'Réserver au +261 20 22 260 60', en: 'Book at +261 20 22 260 60' },
      secondary: { fr: '', en: '' }
    }
  }
};