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
      name: "Île Rouge & la Terrasse",
      type: "Restaurant Gastronomique",
      description: "Notre restaurant phare vous invite à découvrir une cuisine d'exception où l'art culinaire français se marie harmonieusement aux saveurs authentiques de Madagascar. Une expérience gastronomique inoubliable dans un cadre raffiné avec terrasse panoramique.",
      detailedDescription: "Île Rouge & la Terrasse propose une cuisine gastronomique qui sublime les produits locaux de Madagascar avec les techniques françaises les plus raffinées. La terrasse offre une vue spectaculaire sur Antananarivo.",
      image: restaurantImage,
      rating: 5,
      priceRange: "€€€€",
      hours: "19h00 - 23h00",
      capacity: "60 couverts + 40 en terrasse",
      reservationRequired: true,
      dressCode: "Tenue élégante exigée",
      specialties: ["Menu dégustation 7 services", "Homard de Nossy-Be", "Zébu de Haute-Matsiatra", "Cocktails signature"],
      features: ["Terrasse panoramique", "Menu végétarien disponible", "Service de table"]
    },
    {
      id: 2,
      name: "Le Bistrot du Carlton",
      type: "Bar & Brasserie de Classe",
      description: "Le bistrot emblématique du Carlton dans l'esprit parisien où vous pourrez savourer des plats raffinés dans une ambiance conviviale et chaleureuse. L'endroit parfait pour un déjeuner d'affaires ou un dîner décontracté.",
      detailedDescription: "Le Bistrot du Carlton recréé l'atmosphère authentique des grandes brasseries parisiennes avec une touche malgache. Un lieu de rencontre privilégié pour les amateurs de bonne cuisine dans un cadre moins formel mais tout aussi qualitatif.",
      image: restaurantImage,
      rating: 4,
      priceRange: "€€€",
      hours: "12h00 - 15h00, 18h00 - 01h00",
      capacity: "80 couverts",
      reservationRequired: false,
      dressCode: "Tenue décontractée chic",
      specialties: ["Plateaux de fromages", "Tartares et carpaccios", "Cocktails signature", "Cuisine bistrot"],
      features: ["Bar à cocktails", "Happy hour 18h-20h", "Terrasse couverte", "Musique live le weekend"]
    },
    {
      id: 3,
      name: "L'Oasis de Tana",
      type: "Restaurant au Bord de Piscine",
      description: "Savourez une cuisine légère et rafraîchissante dans un cadre tropical idyllique, les pieds dans l'eau avec vue sur notre piscine infinity. L'endroit rêvé pour un déjeuner sous le soleil d'Antananarivo.",
      detailedDescription: "L'Oasis de Tana offre une expérience culinaire unique en bord de piscine avec vue sur la capitale malgache. Notre cuisine privilégie les produits frais et locaux, les grillades et les plats healthy, parfaits pour accompagner vos moments de détente aquatiques.",
      image: restaurantImage,
      rating: 4,
      priceRange: "€€€",
      hours: "11h00 - 19h00",
      capacity: "50 places",
      reservationRequired: false,
      dressCode: "Tenue de plage acceptée",
      specialties: ["Salades tropicales", "Grillades au feu de bois", "Cocktails de fruits frais", "Poissons du jour"],
      features: ["Vue piscine infinity", "Parasols et transats", "Service à la piscine", "Smoothies et jus frais"]
    },
    {
      id: 4,
      name: "L'Eclair by Carlton",
      type: "Pâtisserie Fine",
      description: "La pâtisserie signature du Carlton vous propose des créations sucrées d'exception, des viennoiseries fraîches aux desserts d'exception. Un temple de la gourmandise à la française avec l'excellence Carlton.",
      detailedDescription: "L'Éclair by Carlton perpétue la tradition française de la pâtisserie fine avec des créations originales intégrant les saveurs de Madagascar. Notre atelier de pâtisserie, formé en France, sublime la vanille, le cacao et les fruits tropicaux locaux avec la signature Carlton.",
      image: restaurantImage,
      rating: 5,
      priceRange: "€€",
      hours: "07h00 - 20h00",
      capacity: "25 places",
      reservationRequired: false,
      dressCode: "Aucune restriction",
      specialties: ["Éclairs signature Carlton", "Macarons aux saveurs malgaches", "Viennoiseries françaises", "Chocolats artisanaux"],
      features: ["Vitrine réfrigérée", "Emballages cadeaux Carlton", "Commandes sur mesure", "Ateliers pâtisserie"]
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
            Quatre univers culinaires pour une expérience gastronomique d'exception au cœur de Madagascar
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
                7h-23h
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
            <a href="#ile-rouge" className="inline-block">
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
              const anchorId = restaurant.name === "Île Rouge & la Terrasse" ? "ile-rouge" :
                              restaurant.name === "Le Bistrot du Carlton" ? "bistrot" :
                              restaurant.name === "L'Oasis de Tana" ? "oasis" : "eclair";
              
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

      <Footer />
    </div>
  );
};

export default Restaurants;