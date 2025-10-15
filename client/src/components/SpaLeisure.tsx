// src/components/SpaLeisure.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Waves, Dumbbell, Zap, Clock, Users } from 'lucide-react';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { spaLeisureData } from '@/data/spaLeisureData';
import leisureImage from '@assets/generated_images/Spa_wellness_facilities_3dba6f04.png';

const SpaLeisure = () => {
  const { title, description, activities, services, packagesTitle, packagesDescription, packages } = spaLeisureData;

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves': return <Waves className="w-8 h-8" />;
      case 'Dumbbell': return <Dumbbell className="w-8 h-8" />;
      case 'Zap': return <Zap className="w-8 h-8" />;
      default: return null;
    }
  };

  const handleBooking = (serviceId: number) => {
    console.log(`Booking requested for service ${serviceId}`);
  };

  return (
    <section className="py-20 bg-background">
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

        {/* Quick Activities Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {activities.map((activity, index) => (
            <Card key={index} className="text-center p-6 hover-elevate transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                {getActivityIcon(activity.icon)}
              </div>
              <h3 className="text-xl font-serif font-semibold text-card-foreground mb-2">
                {formatAmpersand(activity.name)}
              </h3>
              <p className="text-muted-foreground mb-3">
                {activity.description}
              </p>
              <Badge variant="outline" className="text-xs">
                {activity.available}
              </Badge>
            </Card>
          ))}
        </div>

        {/* Main Services */}
        <div className="space-y-12">
          {services.map((service, index) => (
            <Card 
              key={service.id} 
              className={`overflow-hidden hover-elevate transition-all duration-300 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex flex-col lg:flex`}
              data-testid={`card-leisure-service-${service.id}`}
            >
              <div className="lg:w-2/5">
                <img 
                  src={service.image || leisureImage} 
                  alt={service.name}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              
              <div className="lg:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-3xl font-serif text-card-foreground mb-4">
                      {service.name}
                    </CardTitle>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      {service.hours && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{service.hours}</span>
                        </div>
                      )}
                      {service.access && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{service.access}</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0 space-y-6">
                    <p className="text-card-foreground leading-relaxed text-lg">
                      {service.description}
                    </p>
                    
                    {service.features && service.features.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-3">Caractéristiques</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {service.equipment && service.equipment.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-3">Équipements</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.equipment.map((item, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </div>
                
                <Button onClick={() => handleBooking(service.id)} className="self-start">
                  Réserver
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Special Packages */}
        <div className="mt-16 bg-card rounded-lg p-8 border border-card-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif font-bold text-card-foreground mb-4">
              {packagesTitle}
            </h3>
            <p className="text-muted-foreground">
              {packagesDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, idx) => (
              <Card key={idx} className="text-center p-6 hover-elevate">
                <h4 className="text-lg font-serif font-semibold text-card-foreground mb-2">
                  {formatAmpersand(pkg.name)}
                </h4>
                <Badge variant="outline" className="mb-4">
                  {pkg.duration}
                </Badge>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  {pkg.includes.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaLeisure;