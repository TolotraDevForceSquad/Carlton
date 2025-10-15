import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, Calendar, Clock, MapPin, Star, Utensils, Music, Camera } from 'lucide-react';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { evenementsPageData } from '@/data/evenementsData';

const Evenements = () => {
  const pageData = evenementsPageData;
  const { sections, services, venues, stats, cta } = pageData;
  const eventTypes = sections.filter((s) => s.type === 'event');

  const getIcon = (iconName: string, size: string = "w-8 h-8") => {
    const icons = {
      Calendar: <Calendar className={size} />,
      Utensils: <Utensils className={size} />,
      Star: <Star className={size} />,
      Music: <Music className={size} />,
      Users: <Users className={size} />,
      Camera: <Camera className={size} />
    };
    return icons[iconName as keyof typeof icons] || <Calendar className={size} />;
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Parallax Hero Section */}
      <ParallaxSection
        backgroundImage={pageData.heroImage}
        parallaxSpeed={0.3}
        minHeight="100vh"
        overlay={true}
        overlayOpacity={0.6}
        className="flex items-center pt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-8 drop-shadow-lg">
            {formatAmpersand(pageData.heroTitle)}
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed drop-shadow-lg mb-12">
            {pageData.heroSubtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {getIcon(stat.icon, "w-8 h-8 mx-auto mb-2")}
                  {stat.value}
                </div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
          <a href="#mariages" className="inline-block">
            <Button size="lg" className="shadow-lg">
              Découvrir nos événements
            </Button>
          </a>
        </div>
      </ParallaxSection>

      {/* Content Section from CMS */}
      {pageData.content && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="prose prose-lg dark:prose-invert mx-auto"
              dangerouslySetInnerHTML={{ __html: pageData.content }}
            />
          </div>
        </section>
      )}

      {/* Event Spaces from CMS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {eventTypes.map((event, index) => (
              <Card 
                key={event.id} 
                className={`overflow-hidden hover-elevate transition-all duration-300 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex flex-col lg:flex`}
                data-testid={`card-event-${event.id}`}
              >
                <div className="lg:w-1/2">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-80 lg:h-full object-cover"
                  />
                </div>
                
                <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <CardHeader className="p-0 mb-6">
                      <div className="mb-2">
                        <Badge variant="outline" className="text-primary border-primary">
                          {event.subtitle}
                        </Badge>
                      </div>
                      <CardTitle className="text-3xl font-serif text-foreground mb-3">
                        {formatAmpersand(event.name)}
                      </CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{event.capacity}</span>
                        </div>
                        {event.surface && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.surface}</span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-0 space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {event.equipment && event.equipment.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Camera className="w-4 h-4" />
                              Équipements
                            </h4>
                            <div className="space-y-1">
                              {event.equipment.map((item: string, idx: number) => (
                                <div key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {event.features && event.features.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Star className="w-4 h-4" />
                              Services
                            </h4>
                            <div className="space-y-1">
                              {event.features.map((feature: string, idx: number) => (
                                <div key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full" size="lg">
                      Organiser mon événement
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            {cta.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {cta.subtitle}
          </p>
          <div className="flex justify-center">
            <Button size="lg" data-testid="button-quote-events">
              <Calendar className="w-4 h-4 mr-2" />
              {cta.buttonText}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Evenements;