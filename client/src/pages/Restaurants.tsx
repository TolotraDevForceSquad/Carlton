import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Star, Sparkles, Utensils } from 'lucide-react';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import restaurantImage from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';
import luxuryRestaurantImage from '@assets/generated_images/Luxury_hotel_restaurant_interior_090ad235.png';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';

const Restaurants = () => {
  const restaurants = [
    {
      id: 1,
      name: "Le Bistrot du Carlton",
      type: "Bistrot – Bar / Cuisine Bistrot revisitée",
      description: "Bistrot urbain, esprit d’ici et d’ailleurs ! Dans une ambiance chic et rétro, notre bistrot revisite la cuisine traditionnelle avec une touche moderne et internationale.",
      detailedDescription: "Ici, les plats sont faits maison, préparés avec des produits frais et de saison pour des recettes généreuses et riches en goût. Vous retrouverez des incontournables comme la terrine de foie gras, la salade César, le magret de canard, ou encore des classiques revisités tels que les spaghetti carbonara, le club sandwich, le hamburger maison ou le fish & chips croustillant. Et bien sûr, les desserts comme la crème brûlée ou la mousse au chocolat. Pour compléter le tout, des options végétariens sont disponibles pour régaler tous les appétits. Ouvert du matin jusqu’en soirée, avec terrasse en plein air, c’est l’endroit parfait pour un café, un déjeuner de travail ou un dîner décontracté entre amis.",
      image: restaurantImage,
      rating: 4,
      priceRange: "€€€",
      hours: "Bar: 06h30-23h00 | Restaurant: 11h00-23h00",
      capacity: "Terrasse en plein air",
      reservationRequired: false,
      dressCode: "Tenue décontractée chic",
      specialties: ["Terrine de foie gras", "Salade César", "Magret de canard", "Spaghetti carbonara", "Club sandwich", "Hamburger maison", "Fish & chips croustillant", "Crème brûlée", "Mousse au chocolat"],
      features: ["Ouvert tous les jours", "Produits frais et de saison", "Options végétariennes", "Terrasse extérieure", "Idéal pour déjeuners d'affaires"]
    },
    {
      id: 2,
      name: "Île Rouge & la Terrasse",
      type: "Restaurant en salle / Cuisine internationale",
      description: "Une invitation au voyage des saveurs ! Notre restaurant vous propose une cuisine du monde raffinée, élaborée avec des ingrédients locaux soigneusement sélectionnés.",
      detailedDescription: "Les spécialités malgaches côtoient des plats internationaux, pour une expérience culinaire variée et raffinée, mêlant traditions locales et saveurs du monde. De larges baies vitrées baignent la salle de lumière naturelle et offrent une vue apaisante sur la piscine et le jardin. C’est dans cette atmosphère chaleureuse que le petit-déjeuner est servi en buffet ou à la carte. Au fil des saisons, le restaurant devient un lieu de retrouvaille privilégié pour célébrer les moments forts de l’année : les fêtes des mères, des pères, Pâques, Noël, Nouvel an ... Famille et proches se retrouvent autour de menus spéciaux ou de buffets généreux et hauts en saveurs, dans une ambiance conviviale et festive.",
      image: restaurantImage,
      rating: 5,
      priceRange: "€€€€",
      hours: "Petit-déjeuner: 06h30-10h30 | Déjeuner: 12h00-15h00 | Dîner: 19h00-23h00",
      capacity: "60 couverts en salle + terrasse",
      reservationRequired: true,
      dressCode: "Tenue élégante exigée",
      specialties: ["Spécialités malgaches", "Plats internationaux", "Buffet petit-déjeuner", "Menus spéciaux saisonniers"],
      features: ["Ouvert tous les jours", "Vue sur piscine et jardin", "Événements festifs", "Buffets généreux", "Ingrédients locaux"]
    },
    {
      id: 3,
      name: "L’Oasis de Tana",
      type: "Restaurant en plein air / Spécialités: salades, grillades, pizzas",
      description: "Escapade gustative au grand air ! Au creux d’un jardin paisible, notre restaurant vous accueille dans une ambiance détendue et tranquille.",
      detailedDescription: "Offrez-vous un moment suspendu pour déguster des plats généreux et variés, soigneusement préparés avec des ingrédients de qualité. Salades gourmandes, grillades savoureuses et desserts irrésistibles composent une carte qui éveille les sens. L’endroit idéal pour un déjeuner d’affaires ou simplement se faire plaisir autour d'un bon repas. Notre bar vous invite à prolonger l’expérience dans un esprit tout aussi relaxant. Laissez-vous surprendre par une sélection de cocktails originaux, frais et délicieux, pensés pour accompagner vos instants de détente jusqu’à la fin de la journée. Une parenthèse pour s’offrir une pause dans un cadre verdoyant.",
      image: restaurantImage,
      rating: 4,
      priceRange: "€€€",
      hours: "Bar: dès 8h00 | Restaurant (hiver): 11h00-17h00 | (été): 11h00-18h00",
      capacity: "50 places en plein air",
      reservationRequired: false,
      dressCode: "Tenue décontractée",
      specialties: ["Salades gourmandes", "Grillades savoureuses", "Pizzas", "Desserts irrésistibles", "Cocktails originaux"],
      features: ["Ouvert tous les jours", "Jardin paisible", "Ambiance détendue", "Déjeuners d'affaires", "Cadre verdoyant"]
    },
    {
      id: 4,
      name: "L’Eclair by Carlton",
      type: "Pâtisserie & Boulangerie",
      description: "Un véritable rendez-vous gourmand en plein centre-ville ! Bienvenue dans notre pâtisserie & boulangerie artisanale !",
      detailedDescription: "Chaque jour, notre équipe passionnée prépare avec soin des produits faits maison, frais et savoureux : pains variés à la croûte dorée, viennoiseries fondantes, gâteaux et entremets délicats, sans oublier sandwiches gourmands, snacks savoureux, glaces rafraîchissantes, boissons chaudes réconfortantes et salades de fruits fraîches. Ici, l’ambiance est conviviale et chaleureuse, un lieu où les amateurs de douceurs se sentent comme chez eux, accueillis par une équipe souriante et attentive, toujours prête à partager un moment de plaisir et de gourmandise.",
      image: restaurantImage,
      rating: 5,
      priceRange: "€€",
      hours: "06h30-18h30",
      capacity: "Emporter et 25 places assises",
      reservationRequired: false,
      dressCode: "Aucune restriction",
      specialties: ["Pains variés", "Viennoiseries fondantes", "Gâteaux et entremets", "Sandwiches gourmands", "Glaces rafraîchissantes", "Salades de fruits fraîches"],
      features: ["Ouvert tous les jours", "Produits faits maison", "Ambiance conviviale", "Équipe passionnée", "Emporter disponible"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Parallax Hero Section */}
      <ParallaxSection
        backgroundImage={luxuryRestaurantImage}
        parallaxSpeed={0.4}
        minHeight="100vh"
        overlay={true}
        overlayOpacity={0.6}
        className="flex items-center pt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-8 drop-shadow-lg">
            {formatAmpersand('Restaurants & Bars')}
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed drop-shadow-lg mb-12">
            Quatre univers culinaires uniques pour des expériences gastronomiques variées au cœur de Madagascar
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                <Utensils className="w-8 h-8 mx-auto mb-2" />
                4
              </div>
              <div className="text-lg">Restaurants & Bars</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                <Star className="w-8 h-8 mx-auto mb-2" />
                5★
              </div>
              <div className="text-lg">Gastronomie</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                <Clock className="w-8 h-8 mx-auto mb-2" />
                6h30-23h
              </div>
              <div className="text-lg">Service continu</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                <Sparkles className="w-8 h-8 mx-auto mb-2" />
                Premium
              </div>
              <div className="text-lg">Cuisine d'exception</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#bistrot" className="inline-block">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg">
                Découvrir nos restaurants
              </button>
            </a>
            <a href="/contact" className="inline-block">
              <button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors shadow-lg">
                Réserver une table
              </button>
            </a>
          </div>
        </div>
      </ParallaxSection>

      {/* Restaurants Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {restaurants.map((restaurant, index) => {
              const anchorId = restaurant.name === "Le Bistrot du Carlton" ? "bistrot" :
                              restaurant.name === "Île Rouge & la Terrasse" ? "ile-rouge" :
                              restaurant.name === "L’Oasis de Tana" ? "oasis" : "eclair";
              
              return (
                <Card 
                  key={restaurant.id} 
                  id={anchorId}
                  className={`overflow-hidden hover-elevate transition-all duration-300 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex flex-col lg:flex`}
                  data-testid={`card-restaurant-${restaurant.id}`}
                >
                <div className="lg:w-1/2">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-80 lg:h-full object-cover"
                  />
                </div>
                
                <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <CardHeader className="p-0 mb-6">
                      <div className="mb-2">
                        <Badge variant="outline" className="text-primary border-primary">
                          {restaurant.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-3xl font-serif text-foreground mb-3">
                        {formatAmpersand(restaurant.name)}
                      </CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{restaurant.hours}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{restaurant.capacity}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-0 space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {restaurant.description}
                      </p>
                      
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {restaurant.detailedDescription}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Spécialités
                          </h4>
                          <div className="space-y-1">
                            {restaurant.specialties.map((specialty, idx) => (
                              <div key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span>{specialty}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Utensils className="w-4 h-4" />
                            Services
                          </h4>
                          <div className="space-y-1">
                            {restaurant.features.map((feature, idx) => (
                              <div key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-card/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <strong>Code vestimentaire :</strong> {restaurant.dressCode}
                        </p>
                      </div>
                    </CardContent>
                  </div>
                  
                </div>
              </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">
            Prêt à réserver ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Contactez-nous pour une expérience culinaire inoubliable au Carlton Madagascar.
          </p>
          <a href="/contact">
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg">
              Nous contacter
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Restaurants;