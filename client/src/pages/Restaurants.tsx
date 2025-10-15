import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, MapPin, Star, Sparkles, Utensils } from 'lucide-react';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { restaurantsPageData } from '@/data/restaurantsData';

const Restaurants = () => {
  const pageData = restaurantsPageData;
  const { sections, stats, heroTitle, heroSubtitle, heroImage, content } = pageData;
  const restaurants = sections.filter((s) => s.type === 'restaurant');

  const getIcon = (iconName: string, size: string = "w-8 h-8") => {
    const icons = {
      Utensils: <Utensils className={size} />,
      Star: <Star className={size} />,
      Clock: <Clock className={size} />,
      Sparkles: <Sparkles className={size} />
    };
    return icons[iconName as keyof typeof icons] || <Utensils className={size} />;
  };

  const getAnchorId = (name: string) => {
    if (name === "Île Rouge & la Terrasse") return "ile-rouge";
    if (name === "Le Bistrot du Carlton") return "bistrot";
    if (name === "L'Oasis de Tana") return "oasis";
    return "eclair";
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Parallax Hero Section */}
      <ParallaxSection
        backgroundImage={heroImage}
        parallaxSpeed={0.4}
        minHeight="100vh"
        overlay={true}
        overlayOpacity={0.6}
        className="flex items-center pt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-8 drop-shadow-lg">
            {formatAmpersand(heroTitle)}
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed drop-shadow-lg mb-12">
            {heroSubtitle}
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

      {/* Restaurants Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {restaurants.map((restaurant, index) => {
              const anchorId = getAnchorId(restaurant.name);
              
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
                          {restaurant.subtitle}
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