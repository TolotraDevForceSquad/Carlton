// src/components/RestaurantShowcase.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, QrCode } from 'lucide-react';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { restaurantShowcaseData } from '@/data/restaurantShowcaseData';
import restaurantImage from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';

const RestaurantShowcase = () => {
  const { title, description, restaurants, menuButton } = restaurantShowcaseData;

  const handleMenuView = (restaurantId: number) => {
    console.log(`Menu viewing for restaurant ${restaurantId}`);
  };

  return (
    <section className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            {formatAmpersand(title)}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Restaurants Grid */}
        <div className="space-y-8 mb-16">
          {restaurants.map((restaurant, index) => (
            <Card 
              key={restaurant.id} 
              className={`overflow-hidden hover-elevate transition-all duration-300 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex flex-col lg:flex`}
              data-testid={`card-restaurant-${restaurant.id}`}
            >
              <div className="lg:w-1/2">
                <img 
                  src={restaurant.image || restaurantImage} 
                  alt={restaurant.name}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              
              <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-primary border-primary">
                        {restaurant.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-3xl font-serif text-card-foreground mb-3">
                      {formatAmpersand(restaurant.name)}
                    </CardTitle>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                    <p className="text-card-foreground leading-relaxed text-lg">
                      {restaurant.description}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-3">Spécialités de la maison</h4>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleMenuView(restaurant.id)}
                    data-testid={`button-menu-${restaurant.id}`}
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    {menuButton}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RestaurantShowcase;