import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Star, Calendar, Users, Waves, Dumbbell, Trophy, Zap, Sun, Mountain } from 'lucide-react';
import Footer from '@/components/Footer';
import { loisirsPageData } from '@/data/loisirsData';

const Loisirs = () => {
  const pageData = loisirsPageData;
  const { facilities, activities, excursions, additionalServices, programButton } = pageData;

  const getIcon = (iconName: string) => {
    const icons = {
      Sun: <Sun className="w-6 h-6" />,
      Waves: <Waves className="w-6 h-6" />,
      Trophy: <Trophy className="w-6 h-6" />,
      Zap: <Zap className="w-6 h-6" />,
      Users: <Users className="w-8 h-8" />,
      Dumbbell: <Dumbbell className="w-8 h-8" />,
      Calendar: <Calendar className="w-8 h-8" />,
      Star: <Star className="w-8 h-8" />
    };
    return icons[iconName as keyof typeof icons] || <Sun className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-background to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              {pageData.hero.title}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {pageData.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
              Nos Installations
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Profitez de nos équipements de pointe pour une détente et un bien-être absolus
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <Card key={facility.id} className="group hover-elevate transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Waves className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary">
                      {facility.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {facility.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {facility.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{facility.hours}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-semibold text-foreground">Équipements :</h4>
                    {facility.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Services :</h4>
                    {facility.services.map((service, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Programme d'Activités
            </h2>
            <p className="text-lg text-muted-foreground">
              Rejoignez nos cours et activités encadrés par des professionnels certifiés
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <Card key={index} className="group hover-elevate transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary mx-auto w-fit mb-3">
                    {getIcon(activity.icon)}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <h3 className="font-semibold text-foreground mb-2">
                    {activity.title}
                  </h3>
                  <Badge variant="secondary" className="mb-3">
                    {activity.time}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" data-testid="button-full-program">
              {programButton}
            </Button>
          </div>
        </div>
      </section>

      {/* Excursions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Excursions & Découvertes
            </h2>
            <p className="text-lg text-muted-foreground">
              Explorez les merveilles de Madagascar avec nos guides experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {excursions.map((excursion) => (
              <Card key={excursion.id} className="hover-elevate">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-primary border-primary">
                      {excursion.duration}
                    </Badge>
                    <Mountain className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-serif text-foreground">
                    {excursion.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {excursion.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Points forts :</h4>
                    <div className="space-y-1">
                      {excursion.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button className="w-full" data-testid={`button-excursion-${excursion.id}`}>
                      <Users className="w-4 h-4 mr-2" />
                      Réserver l'excursion
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Services Complémentaires
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center hover-elevate">
                <CardContent className="pt-6">
                  {getIcon(service.icon)}
                  <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Loisirs;