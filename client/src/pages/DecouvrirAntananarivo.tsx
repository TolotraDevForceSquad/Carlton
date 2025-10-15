import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star, Users, Camera, Car, Mountain, TreePine, Building, ShoppingBag, Utensils, Plane } from 'lucide-react';
import Footer from '@/components/Footer';
import { decouvrirAntananarivoPageData } from '@/data/decouvrirAntananarivoData';

const DecouvrirAntananarivo = () => {
  const pageData = decouvrirAntananarivoPageData;
  const { attractions, excursions, restaurants, cta, categories } = pageData;

  const getIcon = (iconName: string) => {
    const icons = {
      Building: <Building className="w-6 h-6" />,
      Camera: <Camera className="w-6 h-6" />,
      Mountain: <Mountain className="w-6 h-6" />,
      TreePine: <TreePine className="w-6 h-6" />,
      ShoppingBag: <ShoppingBag className="w-6 h-6" />
    };
    return icons[iconName as keyof typeof icons] || <Building className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            {pageData.hero.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {pageData.hero.description}
          </p>
        </div>
      </section>

      {/* City Attractions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Attractions Hero with Photo Frame */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                {attractions.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {attractions.description}
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src={attractions.image} 
                  alt="Attractions historiques d'Antananarivo Madagascar"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                  data-testid="img-attractions-hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.items.map((attraction, index) => (
              <Card key={index} className="group hover-elevate transition-all duration-300" data-testid={`card-attraction-${index}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {getIcon(attraction.icon)}
                    </div>
                    <Badge variant="secondary" data-testid={`badge-category-${index}`}>
                      {attraction.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground" data-testid={`title-attraction-${index}`}>
                    {attraction.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4" data-testid={`description-attraction-${index}`}>
                    {attraction.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{attraction.distance}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{attraction.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-semibold text-foreground">Points forts :</h4>
                    {attraction.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Excursions */}
      <section className="py-16 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Excursions Hero with Photo Frame */}
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                {excursions.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {excursions.description}
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src={excursions.image} 
                  alt="Excursions nature Madagascar lémuriens forêt tropicale"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                  data-testid="img-excursions-hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {excursions.items.map((excursion, index) => (
              <Card key={index} className="group hover-elevate transition-all duration-300" data-testid={`card-excursion-${index}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {getIcon(excursion.icon)}
                    </div>
                    <Badge variant="outline" data-testid={`badge-excursion-category-${index}`}>
                      {excursion.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground" data-testid={`title-excursion-${index}`}>
                    {excursion.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4" data-testid={`description-excursion-${index}`}>
                    {excursion.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{excursion.distance}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{excursion.duration}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Inclus :</h4>
                    <div className="space-y-1">
                      {excursion.includes.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center text-sm text-muted-foreground">
                          <Star className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-lg font-semibold text-primary" data-testid={`price-excursion-${index}`}>
                      {excursion.price}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tarifs et réservations à la Conciergerie
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Locaux */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Restaurants Hero with Photo Frame */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                {restaurants.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {restaurants.description}
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src={restaurants.image} 
                  alt="Restaurants traditionnels malgaches cuisine locale"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                  data-testid="img-restaurants-hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurants.items.map((restaurant, index) => (
              <Card key={index} className="group hover-elevate transition-all duration-300" data-testid={`card-restaurant-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1" data-testid={`name-restaurant-${index}`}>
                        {restaurant.name}
                      </h3>
                      <p className="text-sm text-primary" data-testid={`cuisine-restaurant-${index}`}>
                        {restaurant.cuisine}
                      </p>
                    </div>
                    <Utensils className="w-5 h-5 text-primary" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4" data-testid={`specialty-restaurant-${index}`}>
                    {restaurant.specialite}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{restaurant.distance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-16 bg-gradient-to-b from-card/20 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
            {cta.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {cta.description}
          </p>
          
          <div className="flex justify-center">
            <Button size="lg" data-testid="button-reserve-room">
              {cta.buttonText}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DecouvrirAntananarivo;