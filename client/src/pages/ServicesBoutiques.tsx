import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Star, Users, ShoppingBag, Bell, Car, Plane, Shirt, Coffee, Wifi, Phone } from 'lucide-react';
import Footer from '@/components/Footer';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { servicesBoutiquesPageData } from '@/data/servicesBoutiquesData';

const ServicesBoutiques = () => {
  const pageData = servicesBoutiquesPageData;
  const { services, boutiques, hero, cta } = pageData;
  const { items: serviceItems } = services;
  const { items: boutiqueItems } = boutiques;

  const getIcon = (iconName: string) => {
    const icons = {
      Bell: <Bell className="w-6 h-6" />,
      Car: <Car className="w-6 h-6" />,
      Plane: <Plane className="w-6 h-6" />,
      Shirt: <Shirt className="w-6 h-6" />,
      Coffee: <Coffee className="w-6 h-6" />,
      Wifi: <Wifi className="w-6 h-6" />
    };
    return icons[iconName as keyof typeof icons] || <Bell className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            {formatAmpersand(hero.title)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {hero.description}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services Hero with Photo Frame */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                {services.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {services.description}
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src={services.image} 
                  alt="Services de conciergerie Carlton Madagascar"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                  data-testid="img-services-hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceItems.map((service, index) => (
              <Card key={index} className="group hover-elevate transition-all duration-300" data-testid={`card-service-${index}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {getIcon(service.icon)}
                    </div>
                    <Badge variant="secondary" data-testid={`badge-service-category-${index}`}>
                      {service.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground" data-testid={`title-service-${index}`}>
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4" data-testid={`description-service-${index}`}>
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Boutiques Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Boutiques Hero with Photo Frame */}
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                {boutiques.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {boutiques.description}
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src={boutiques.image} 
                  alt="Boutiques artisanales Carlton Madagascar"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                  data-testid="img-boutiques-hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {boutiqueItems.map((boutique, index) => (
              <Card key={index} className="group hover-elevate transition-all duration-300" data-testid={`card-boutique-${index}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-2xl text-foreground mb-2" data-testid={`title-boutique-${index}`}>
                        {boutique.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{boutique.hours}</span>
                      </div>
                    </div>
                    <ShoppingBag className="w-8 h-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6" data-testid={`description-boutique-${index}`}>
                    {boutique.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Nos Spécialités :</h4>
                    <div className="flex flex-wrap gap-2">
                      {boutique.specialties.map((specialty, specialtyIndex) => (
                        <Badge key={specialtyIndex} variant="outline" data-testid={`badge-specialty-${index}-${specialtyIndex}`}>
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{boutique.location}</span>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-16">
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

export default ServicesBoutiques;