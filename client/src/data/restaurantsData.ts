// src/data/restaurantData.ts
export const restaurantPageData = {
  hero: {
    backgroundImage: '/uploads/Fine_dining_restaurant_1275a5b9.png',
    title: {
      fr: "Restaurants & Bars",
      en: "Restaurants & Bars"
    },
    description: {
      fr: "Quatre univers culinaires uniques pour des expériences gastronomiques variées au cœur de Madagascar",
      en: "Four unique culinary universes for varied gastronomic experiences in the heart of Madagascar"
    },
    stats: [
      {
        number: { fr: "4", en: "4" },
        label: { fr: "Restaurants & Bars", en: "Restaurants & Bars" },
        icon: "Utensils"
      },
      {
        number: { fr: "5★", en: "5★" },
        label: { fr: "Gastronomie", en: "Gastronomy" },
        icon: "Star"
      },
      {
        number: { fr: "6h30-23h", en: "6:30am-11pm" },
        label: { fr: "Service continu", en: "Continuous Service" },
        icon: "Clock"
      },
      {
        number: { fr: "Premium", en: "Premium" },
        label: { fr: "Cuisine d'exception", en: "Exceptional Cuisine" },
        icon: "Sparkles"
      }
    ],
    buttonTexts: {
      primary: { fr: "Découvrir nos restaurants", en: "Discover our restaurants" },
      secondary: { fr: "Réserver une table", en: "Reserve a table" }
    }
  },
  restaurants: [
    {
      id: 1,
      name: { fr: "Le Bistrot du Carlton", en: "Le Bistrot du Carlton" },
      type: { fr: "Bistrot – Bar / Cuisine Bistrot revisitée", en: "Bistrot – Bar / Revisited Bistrot Cuisine" },
      description: {
        fr: "Bistrot urbain, esprit d'ici et d'ailleurs ! Dans une ambiance chic et rétro, notre bistrot revisite la cuisine traditionnelle avec une touche moderne et internationale.",
        en: "Urban bistro, spirit from here and elsewhere! In a chic and retro atmosphere, our bistro revisits traditional cuisine with a modern and international touch."
      },
      detailedDescription: {
        fr: "Ici, les plats sont faits maison, préparés avec des produits frais et de saison pour des recettes généreuses et riches en goût. Vous retrouverez des incontournables comme la terrine de foie gras, la salade César, le magret de canard, ou encore des classiques revisités tels que les spaghetti carbonara, le club sandwich, le hamburger maison ou le fish & chips croustillant. Et bien sûr, les desserts comme la crème brûlée ou la mousse au chocolat. Pour compléter le tout, des options végétariens sont disponibles pour régaler tous les appétits. Ouvert du matin jusqu'en soirée, avec terrasse en plein air, c'est l'endroit parfait pour un café, un déjeuner de travail ou un dîner décontracté entre amis.",
        en: "Here, the dishes are homemade, prepared with fresh and seasonal products for generous and flavorful recipes. You'll find essentials like foie gras terrine, Caesar salad, duck breast, or revisited classics such as spaghetti carbonara, club sandwich, homemade hamburger or crispy fish & chips. And of course, desserts like crème brûlée or chocolate mousse. To complete it all, vegetarian options are available to delight all appetites. Open from morning to evening, with an outdoor terrace, it's the perfect place for a coffee, a business lunch or a casual dinner with friends."
      },
      image: '/uploads/Fine_dining_restaurant_1275a5b9.png',
      rating: 4,
      priceRange: { fr: "€€€", en: "€€€" },
      hours: { fr: "Bar : 06h30 à 23h00 | Restaurant : 11h00 à 23h00", en: "Bar: 6:30am to 11pm | Restaurant: 11am to 11pm" },
      capacity: { fr: "Terrasse en plein air", en: "Outdoor Terrace" },
      reservationRequired: false,
      dressCode: { fr: "Tenue décontractée chic", en: "Smart Casual" },
      specialties: [
        { fr: "Terrine de foie gras", en: "Foie Gras Terrine" },
        { fr: "Salade César", en: "Caesar Salad" },
        { fr: "Magret de canard", en: "Duck Breast" },
        { fr: "Spaghetti carbonara", en: "Spaghetti Carbonara" },
        { fr: "Club sandwich", en: "Club Sandwich" },
        { fr: "Hamburger maison", en: "Homemade Hamburger" },
        { fr: "Fish & chips croustillant", en: "Crispy Fish & Chips" },
        { fr: "Crème brûlée", en: "Crème Brûlée" },
        { fr: "Mousse au chocolat", en: "Chocolate Mousse" }
      ],
      features: [
        { fr: "Ouvert tous les jours", en: "Open Every Day" },
        { fr: "Produits frais et de saison", en: "Fresh and Seasonal Products" },
        { fr: "Options végétariennes", en: "Vegetarian Options" },
        { fr: "Terrasse extérieure", en: "Outdoor Terrace" },
        { fr: "Idéal pour déjeuners d'affaires", en: "Ideal for Business Lunches" }
      ],
      hidden: false
    },
    {
      id: 2,
      name: { fr: "Ile Rouge & la Terrasse", en: "Ile Rouge & the Terrace" },
      type: { fr: "Restaurant en salle / Cuisine internationale", en: "Indoor Restaurant / International Cuisine" },
      description: {
        fr: "Une invitation au voyage des saveurs ! Notre restaurant vous propose une cuisine du monde raffinée, élaborée avec des ingrédients locaux soigneusement sélectionnés.",
        en: "An invitation to a journey of flavors! Our restaurant offers refined world cuisine, crafted with carefully selected local ingredients."
      },
      detailedDescription: {
        fr: "Les spécialités malgaches côtoient des plats internationaux, pour une expérience culinaire variée et raffinée, mêlant traditions locales et saveurs du monde. De larges baies vitrées baignent la salle de lumière naturelle et offrent une vue apaisante sur la piscine et le jardin. C'est dans cette atmosphère chaleureuse que le petit-déjeuner est servi en buffet ou à la carte. Au fil des saisons, le restaurant devient un lieu de retrouvaille privilégié pour célébrer les moments forts de l'année : les fêtes des mères, des pères, Pâques, Noël, Nouvel an ... Famille et proches se retrouvent autour de menus spéciaux ou de buffets généreux et hauts en saveurs, dans une ambiance conviviale et festive.",
        en: "Malagasy specialties mingle with international dishes, for a varied and refined culinary experience, blending local traditions and world flavors. Large bay windows bathe the room in natural light and offer a soothing view of the pool and garden. It is in this warm atmosphere that breakfast is served as a buffet or à la carte. Through the seasons, the restaurant becomes a privileged meeting place to celebrate the highlights of the year: Mother's Day, Father's Day, Easter, Christmas, New Year... Family and loved ones gather around special menus or generous and flavorful buffets, in a convivial and festive atmosphere."
      },
      image: '/uploads/Luxury_hotel_restaurant_interior_090ad235.png',
      rating: 5,
      priceRange: { fr: "€€€€", en: "€€€€" },
      hours: { fr: "Petit-déjeuner : 06h30 à 10h30 | Déjeuner : 12h00 à 15h00 | Dîner : 19h00 à 23h00", en: "Breakfast: 6:30am to 10:30am | Lunch: 12pm to 3pm | Dinner: 7pm to 11pm" },
      capacity: { fr: "60 couverts en salle + terrasse", en: "60 seats indoors + terrace" },
      reservationRequired: true,
      dressCode: { fr: "Tenue élégante exigée", en: "Elegant Attire Required" },
      specialties: [
        { fr: "Spécialités malgaches", en: "Malagasy Specialties" },
        { fr: "Plats internationaux", en: "International Dishes" },
        { fr: "Buffet petit-déjeuner", en: "Breakfast Buffet" },
        { fr: "Menus spéciaux saisonniers", en: "Seasonal Special Menus" }
      ],
      features: [
        { fr: "Ouvert tous les jours", en: "Open Every Day" },
        { fr: "Vue sur piscine et jardin", en: "View of Pool and Garden" },
        { fr: "Événements festifs", en: "Festive Events" },
        { fr: "Buffets généreux", en: "Generous Buffets" },
        { fr: "Ingrédients locaux", en: "Local Ingredients" }
      ],
      hidden: false
    },
    {
      id: 3,
      name: { fr: "L'Oasis de Tana", en: "L'Oasis de Tana" },
      type: { fr: "Restaurant en plein air / Spécialités : salades, grillades, pizzas", en: "Outdoor Restaurant / Specialties: Salads, Grills, Pizzas" },
      description: {
        fr: "Escapade gustative au grand air ! Au creux d'un jardin paisible, notre restaurant vous accueille dans une ambiance détendue et tranquille.",
        en: "Gastronomic escape in the open air! Nestled in a peaceful garden, our restaurant welcomes you in a relaxed and serene atmosphere."
      },
      detailedDescription: {
        fr: "Offrez-vous un moment suspendu pour déguster des plats généreux et variés, soigneusement préparés avec des ingrédients de qualité. Salades gourmandes, grillades savoureuses et desserts irrésistibles composent une carte qui éveille les sens. L'endroit idéal pour un déjeuner d'affaires ou simplement se faire plaisir autour d'un bon repas. Notre bar vous invite à prolonger l'expérience dans un esprit tout aussi relaxant. Laissez-vous surprendre par une sélection de cocktails originaux, frais et délicieux, pensés pour accompagner vos instants de détente jusqu'à la fin de la journée. Une parenthèse pour s'offrir une pause dans un cadre verdoyant.",
        en: "Treat yourself to a suspended moment to savor generous and varied dishes, carefully prepared with quality ingredients. Gourmet salads, savory grills and irresistible desserts make up a menu that awakens the senses. The ideal place for a business lunch or simply to treat yourself to a good meal. Our bar invites you to extend the experience in an equally relaxing spirit. Let yourself be surprised by a selection of original, fresh and delicious cocktails, designed to accompany your moments of relaxation until the end of the day. A break to treat yourself in a green setting."
      },
      image: '/uploads/Luxury_hotel_restaurant_interior_090ad235.png',
      rating: 4,
      priceRange: { fr: "€€€", en: "€€€" },
      hours: { fr: "Bar : à partir de 8h00 | Restaurant (hiver) : 11h00 à 17h00 | Restaurant (été) : 11h00 à 18h00", en: "Bar: from 8am | Restaurant (winter): 11am to 5pm | Restaurant (summer): 11am to 6pm" },
      capacity: { fr: "50 places en plein air", en: "50 Outdoor Seats" },
      reservationRequired: false,
      dressCode: { fr: "Tenue décontractée", en: "Casual Attire" },
      specialties: [
        { fr: "Salades gourmandes", en: "Gourmet Salads" },
        { fr: "Grillades savoureuses", en: "Savory Grills" },
        { fr: "Pizzas", en: "Pizzas" },
        { fr: "Desserts irrésistibles", en: "Irresistible Desserts" },
        { fr: "Cocktails originaux", en: "Original Cocktails" }
      ],
      features: [
        { fr: "Ouvert tous les jours", en: "Open Every Day" },
        { fr: "Jardin paisible", en: "Peaceful Garden" },
        { fr: "Ambiance détendue", en: "Relaxed Atmosphere" },
        { fr: "Déjeuners d'affaires", en: "Business Lunches" },
        { fr: "Cadre verdoyant", en: "Green Setting" }
      ],
      hidden: false
    },
    {
      id: 4,
      name: { fr: "L'Eclair by Carlton", en: "L'Eclair by Carlton" },
      type: { fr: "Pâtisserie & Boulangerie", en: "Patisserie & Bakery" },
      description: {
        fr: "Un véritable rendez-vous gourmand en plein centre-ville ! Bienvenue dans notre pâtisserie & boulangerie artisanale !",
        en: "A true gourmet rendezvous in the heart of the city! Welcome to our artisan patisserie & bakery!"
      },
      detailedDescription: {
        fr: "Chaque jour, notre équipe passionnée prépare avec soin des produits faits maison, frais et savoureux : pains variés à la croûte dorée, viennoiseries fondantes, gâteaux et entremets délicats, sans oublier sandwiches gourmands, snacks savoureux, glaces rafraîchissantes, boissons chaudes réconfortantes et salades de fruits fraîches. Ici, l'ambiance est conviviale et chaleureuse, un lieu où les amateurs de douceurs se sentent comme chez eux, accueillis par une équipe souriante et attentive, toujours prête à partager un moment de plaisir et de gourmandise.",
        en: "Every day, our passionate team carefully prepares homemade, fresh and tasty products: varied breads with golden crusts, melting pastries, delicate cakes and entremets, not forgetting gourmet sandwiches, tasty snacks, refreshing ice creams, comforting hot drinks and fresh fruit salads. Here, the atmosphere is convivial and warm, a place where sweet lovers feel at home, welcomed by a smiling and attentive team, always ready to share a moment of pleasure and indulgence."
      },
      image: '/uploads/Luxury_hotel_restaurant_interior_090ad235.png',
      rating: 5,
      priceRange: { fr: "€€", en: "€€" },
      hours: { fr: "De 06h30 à 18h30", en: "From 6:30am to 6:30pm" },
      capacity: { fr: "Emporter et 25 places assises", en: "Takeaway and 25 Seats" },
      reservationRequired: false,
      dressCode: { fr: "Aucune restriction", en: "No Restrictions" },
      specialties: [
        { fr: "Pains variés", en: "Varied Breads" },
        { fr: "Viennoiseries fondantes", en: "Melting Pastries" },
        { fr: "Gâteaux et entremets", en: "Cakes and Entremets" },
        { fr: "Sandwiches gourmands", en: "Gourmet Sandwiches" },
        { fr: "Glaces rafraîchissantes", en: "Refreshing Ice Creams" },
        { fr: "Salades de fruits fraîches", en: "Fresh Fruit Salads" }
      ],
      features: [
        { fr: "Ouvert tous les jours", en: "Open Every Day" },
        { fr: "Produits faits maison", en: "Homemade Products" },
        { fr: "Ambiance conviviale", en: "Convivial Atmosphere" },
        { fr: "Équipe passionnée", en: "Passionate Team" },
        { fr: "Emporter disponible", en: "Takeaway Available" }
      ],
      hidden: false
    }
  ],
  cta: {
    title: { fr: "Prêt à réserver ?", en: "Ready to reserve?" },
    description: {
      fr: "Contactez-nous pour une expérience culinaire inoubliable au Carlton Madagascar.",
      en: "Contact us for an unforgettable culinary experience at Carlton Madagascar."
    },
    buttonText: { fr: "Nous contacter", en: "Contact us" }
  }
};