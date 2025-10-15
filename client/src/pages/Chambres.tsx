// src/components/Chambres.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Users, Wifi, Car, Coffee, Bath, Tv, Wind } from 'lucide-react';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { chambresData } from '@/data/chambresData';
import hotelRoom from '@assets/generated_images/Luxury_suite_interior_386342fd.png';
import suiteImage from '@assets/generated_images/Presidential_suite_bedroom_interior_7adece21.png';

const Chambres = () => {
  const { heroTitle, heroSubtitle, heroImage, content, rooms, stats, servicesTitle, servicesDescription, services, buttonText, bookButton } = chambresData;
  
  const processedRooms = rooms.map(room => ({
    ...room,
    image: room.image || hotelRoom
  }));

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'Wifi': return <Wifi className="w-4 h-4" />;
      case 'Climatisation': return <Wind className="w-4 h-4" />;
      case 'Service en chambre': return <Coffee className="w-4 h-4" />;
      case 'Parking': return <Car className="w-4 h-4" />;
      case 'Coffre-fort': return <Bath className="w-4 h-4" />;
      default: return <Tv className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Parallax Hero Section */}
      <ParallaxSection
        backgroundImage={heroImage || suiteImage}
        parallaxSpeed={0.3}
        minHeight="100vh"
        overlay={true}
        overlayOpacity={0.5}
        className="flex items-center pt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <>
            <h1 className="text-6xl md:text-7xl font-serif font-bold mb-8 drop-shadow-lg">
              {formatAmpersand(heroTitle)}
            </h1>
            <div className="w-32 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed drop-shadow-lg mb-12">
              {heroSubtitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stats.totalRooms}</div>
                <div className="text-lg">Chambres & Suites</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stats.categories}</div>
                <div className="text-lg">Catégories de standing</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stats.maxSize}</div>
                <div className="text-lg">Suite Présidentielle</div>
              </div>
            </div>
            <Button size="lg" className="shadow-lg" data-testid="button-discover-rooms">
              {buttonText}
            </Button>
          </>
        </div>
      </ParallaxSection>

      {/* Content Section from CMS */}
      {content && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="prose prose-lg dark:prose-invert mx-auto"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </section>
      )}

      {/* Rooms Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {processedRooms.map((room, index) => (
              <Card 
                key={room.id} 
                className={`overflow-hidden hover-elevate transition-all duration-300 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex flex-col lg:flex`}
                data-testid={`card-room-${room.id}`}
              >
                <div className="lg:w-1/2">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="w-full h-80 lg:h-full object-cover"
                  />
                </div>
                
                <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          {room.size && (
                            <Badge variant="outline" className="text-primary border-primary">
                              <MapPin className="w-3 h-3 mr-1" />
                              {room.size}
                            </Badge>
                          )}
                          {room.guests && (
                            <Badge variant="outline" className="text-primary border-primary">
                              <Users className="w-3 h-3 mr-1" />
                              {room.guests}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-3xl font-serif text-foreground mb-2">
                        {formatAmpersand(room.name)}
                      </CardTitle>
                      {room.subtitle && (
                        <p className="text-primary font-luxury italic text-lg mb-4">
                          {formatAmpersand(room.subtitle)}
                        </p>
                      )}
                    </CardHeader>
                    
                    <CardContent className="p-0 space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {room.description}
                      </p>
                      
                      {room.features && room.features.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Caractéristiques :</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {room.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {room.amenities && room.amenities.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Équipements :</h4>
                          <div className="flex flex-wrap gap-3">
                            {room.amenities.map((amenity, idx) => (
                              <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-card rounded-full text-sm">
                                {getAmenityIcon(amenity)}
                                <span className="text-muted-foreground">{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      className="w-full"
                      data-testid={`button-book-${room.id}`}
                    >
                      {bookButton}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              {servicesTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {servicesDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover-elevate">
                <CardContent className="pt-6">
                  <div className="text-primary mb-4 flex justify-center">
                    {getAmenityIcon(service.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.desc}
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

export default Chambres;