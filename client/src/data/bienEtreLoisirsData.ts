// src/data/bienEtreLoisirsData.ts
export const bienEtreLoisirsData = {
  hero: {
    title: { fr: 'Bien-être & Loisirs', en: 'Wellness & Leisure' },
    description: {
      fr: 'Évadez-vous dans notre univers de bien-être alliant détente, sport et soins holistiques au cœur de Madagascar pour une expérience de ressourcement totale',
      en: 'Escape into our world of wellness combining relaxation, sports, and holistic treatments in the heart of Madagascar for a total rejuvenation experience'
    },
    backgroundImage: '/uploads/Cover_01.jpg'
  },
  facilitiesSection: {
    title: { fr: 'Nos Installations', en: 'Our Facilities' },
    subtitle: { fr: 'Des équipements haut de gamme pour votre bien-être et vos loisirs', en: 'Premium facilities for your wellness and leisure activities' }
  },
  programsSection: {
    title: { fr: 'Les soins préférés à ne pas manquer', en: 'Must-try featured treatments' },
    subtitle: { fr: 'Découvrez nos soins holistiques inspirés des traditions', en: 'Discover our holistic treatments inspired by ancient traditions' }
  },
  headers: {
    equipments: { fr: 'Équipements :', en: 'Equipment :' },
    services: { fr: 'Services :', en: 'Services :' },
    highlights: { fr: 'Programme inclus :', en: 'Included in the program :' }
  },
  addTexts: {
    facility: { fr: 'Ajouter une nouvelle installation', en: 'Add a new facility' },
    program: { fr: 'Ajouter un nouveau programme', en: 'Add a new program' },
    action: { fr: 'Ajouter', en: 'Add' }
  },
  facilities: [
    {
      id: 1,
      name: { fr: 'Piscine', en: 'Pool' },
      type: { fr: 'Détente Aquatique', en: 'Aquatic Relaxation' },
      description: {
        fr: 'Plongez dans notre grande piscine extérieure de 25 mètres, soigneusement maintenue, installée dans un lieu calme et discret au cœur de l\'hôtel. Un véritable havre de paix, loin du tumulte urbain, idéal pour se détendre en famille ou entre amis. À deux pas, notre restaurant et notre bar complètent l’expérience pour des moments de convivialité et de plaisir partagé.',
        en: 'Dive into our large 25-meter outdoor pool, meticulously maintained, located in a calm and discreet setting in the heart of the hotel. A true haven of peace, away from the urban hustle, ideal for relaxing with family or friends. Just steps away, our restaurant and bar complete the experience for moments of conviviality and shared pleasure.'
      },
      images: [
        '/uploads/Bien_Etre_OK_cover à confirmer/Piscine_01.JPG',
        '/uploads/Bien_Etre_OK_cover à confirmer/Piscine_02.jpg',
        '/uploads/Bien_Etre_OK_cover à confirmer/Piscine_03.jpg'
      ],
      hours: { fr: '', en: '' },
      features: [
        { fr: 'Bassin pour enfants', en: 'Children\'s pool' },
        { fr: 'Transats de luxe avec parasols', en: 'Luxury loungers with umbrellas' },
        { fr: 'Serviettes fournies', en: 'Towels provided' }
      ],
      services: [
        { fr: 'Maître-nageur présent', en: 'Lifeguard present' },
        { fr: 'Cours de natation', en: 'Swimming lessons' },
        { fr: 'Formules d’abonnement', en: 'Subscription packages' }
      ],
      hidden: false
    },
    {
      id: 2,
      name: { fr: 'Fitness', en: 'Fitness' },
      type: { fr: 'Fitness & Forme', en: 'Fitness & Wellness' },
      description: {
        fr: 'Équipée d’appareils TechnoGym dernière génération, notre salle de sport vous offre une expérience complète et personnalisée. Quel que soit votre niveau, profitez d’un matériel varié et performant pour allier bien-être et performance dans un cadre serein et soigné. Accès privilégié réservé aux hôtes.',
        en: 'Equipped with the latest TechnoGym machines, our gym offers a complete and personalized experience. Whatever your level, enjoy varied and high-performance equipment to combine wellness and performance in a serene and cared-for setting. Privileged access reserved for guests.'
      },
      images: [
        '/uploads/Bien_Etre_OK_cover à confirmer/Fitness_01.jpg',
        '/uploads/Bien_Etre_OK_cover à confirmer/Fitness_02.jpg',
        '/uploads/Bien_Etre_OK_cover à confirmer/Fitness_03.jpg',
        '/uploads/Bien_Etre_OK_cover à confirmer/Fitness_04.jpg'
      ],
      hours: { fr: '', en: '' },
      features: [
        { fr: 'Équipements Technogym dernière génération', en: 'Latest generation TechnoGym equipment' },
        { fr: 'Espace cardio-training', en: 'Cardio-training area' },
        { fr: 'Équipements de musculation', en: 'Weight training equipment' },
        { fr: 'Serviettes fournies', en: 'Towels provided' }
      ],
      services: [
        { fr: 'Coach disponible', en: 'Coach available' }
      ],
      hidden: false
    },
    {
      id: 3,
      name: { fr: 'Tennis', en: 'Tennis' },
      type: { fr: 'Sport & Compétition', en: 'Sports & Competition' },
      description: {
        fr: 'Notre court de tennis en terre battue est accessible sur réservation. Raquettes et balles sont mises à votre disposition et un service de coaching privé peut être organisé sur demande. Pour prolonger le plaisir, des séances en soirée sont possibles, grâce à un éclairage spécialement conçu pour jouer dans des conditions idéales. Que vous soyez amateur ou joueur confirmé, vivez l’expérience tennis dans un environnement paisible et exclusif, niché au sein de l\'hôtel.',
        en: 'Our clay tennis court is available by reservation. Rackets and balls are provided, and private coaching can be arranged on request. To extend the pleasure, evening sessions are possible, thanks to lighting specially designed for playing in ideal conditions. Whether you are an amateur or a seasoned player, live the tennis experience in a peaceful and exclusive environment, nestled within the hotel.'
      },
      images: [
        '/uploads/Bien_Etre_OK_cover à confirmer/Tennis_01.jpg',
        '/uploads/Bien_Etre_OK_cover à confirmer/Tennis_02.jpg',
        '/uploads/Bien_Etre_OK_cover à confirmer/Tennis_03.jpg'
      ],
      hours: { fr: '', en: '' },
      features: [
        { fr: 'Location de matériels', en: 'Equipment rental' },
        { fr: 'Éclairage de nuit', en: 'Night lighting' }
      ],
      services: [
        { fr: 'Coach disponible', en: 'Coach available' },
        { fr: 'Cours de tennis', en: 'Tennis lessons' },
        { fr: 'Formules d’abonnement', en: 'Subscription packages' }
      ],
      hidden: false
    },
    {
      id: 4,
      name: { fr: 'Soins Holistiques', en: 'Holistic Treatments' },
      type: { fr: 'Bien-être & Relaxation', en: 'Wellness & Relaxation' },
      description: {
        fr: 'En collaboration avec Holistic Universal, l’hôtel vous invite à découvrir des soins thérapeutiques et énergétiques aux bienfaits profonds.',
        en: 'In collaboration with Holistic Universal, the hotel invites you to discover therapeutic and energetic treatments with deep benefits.'
      },
      images: [
        '/uploads/Bien_Etre_OK_cover à confirmer/Holistic_01.jpg'
      ],
      hours: { fr: '', en: '' },
      features: [],
      services: [],
      hidden: false
    }
  ],
  wellnessPrograms: [
    {
      id: 1,
      title: { fr: 'Massage holistique – 1h', en: 'Holistic massage – 1h' },
      duration: { fr: '1h', en: '1h' },
      description: {
        fr: 'Vivez l’expérience d’un soin énergétique singulier, associant les vertus des huiles essentielles et ayurvédiques. Un rituel thérapeutique sur mesure qui rééquilibre les énergies, soulage les tensions et nourrit le corps en profondeur.',
        en: 'Experience a unique energetic treatment, combining the benefits of essential and Ayurvedic oils. A bespoke therapeutic ritual that rebalances energies, relieves tension, and nourishes the body deeply.'
      },
      highlights: [],
      hidden: false
    },
    {
      id: 2,
      title: { fr: 'Massage avec pierres chaudes – 1h', en: 'Hot stone massage – 1h' },
      duration: { fr: '1h', en: '1h' },
      description: {
        fr: 'Offrez-vous un massage du dos et des jambes à l’huile chaude, enrichi par l’utilisation de pierres semi-précieuses aux vertus énergétiques. Une expérience sensorielle unique pour relâcher les tensions et réharmoniser le corps.',
        en: 'Treat yourself to a back and leg massage with hot oil, enriched by the use of semi-precious stones with energetic virtues. A unique sensory experience to release tension and reharmonize the body.'
      },
      highlights: [],
      hidden: false
    },
    {
      id: 3,
      title: { fr: 'Massage relaxant – 1h', en: 'Relaxing massage – 1h' },
      duration: { fr: '1h', en: '1h' },
      description: {
        fr: 'Lâchez prise dès la première minute. Ce soin allie gestes enveloppants et huiles essentielles apaisante pour éliminer le stress, détendre le corps et revitaliser l’esprit. Un vrai moment de bien-être à s’offrir ou à offrir.',
        en: 'Let go from the first minute. This treatment combines enveloping gestures and soothing essential oils to eliminate stress, relax the body, and revitalize the mind. A true moment of wellness to treat yourself or give.'
      },
      highlights: [],
      hidden: false
    }
  ],
  cta: {
    title: { fr: 'Votre oasis de détente au cœur d\'Antananarivo', en: 'Your oasis of relaxation in the heart of Antananarivo' },
    description: {
      fr: 'Faites une pause bien méritée, nous vous accueillons tous les jours. Nos équipes sont à votre disposition pour personnaliser votre expérience.',
      en: 'Enjoy our leisure and wellness facilities open every day. Our teams are at your disposal to personalize your experience.'
    },
    buttonText: { fr: 'Réserver votre séjour', en: 'Book your stay' }
  }
};