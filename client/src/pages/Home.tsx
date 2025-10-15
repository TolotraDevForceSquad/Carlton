// src/components/Home.tsx
import HeroSection from '@/components/HeroSection';
import ParallaxSection from '@/components/ParallaxSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Clock, MapPin, Utensils, Camera, Calendar, Sparkles } from 'lucide-react';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { homeData } from '@/data/homeData';
import restaurantImage from '@assets/generated_images/Luxury_hotel_restaurant_interior_090ad235.png';
import suiteImage from '@assets/generated_images/Presidential_suite_bedroom_interior_7adece21.png';
import eventsImage from '@assets/generated_images/Luxury_hotel_wedding_reception_d3ca816d.png';
import wellnessImage from '@assets/generated_images/Hotel_infinity_pool_wellness_a9857557.png';

const Home = () => {
  const { title, content, highlights, cta, parallaxImage } = homeData;
  
  const getHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-8 h-8" />;
      case 'Utensils': return <Utensils className="w-8 h-8" />;
      case 'Calendar': return <Calendar className="w-8 h-8" />;
      case 'Camera': return <Camera className="w-8 h-8" />;
      default: return null;
    }
  };

  const processedHighlights = highlights.map(highlight => ({
    ...highlight,
    image: highlight.image || wellnessImage // Fallback if needed
  }));

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        
        {/* Présentation de l'hôtel */}
        <section className="py-20 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                {formatAmpersand(title)}
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <div 
                className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed prose prose-lg dark:prose-invert mx-auto"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {processedHighlights.map((highlight, index) => (
                <Card key={index} className="overflow-hidden hover-elevate transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={highlight.image} 
                      alt={highlight.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-full">
                        <div className="text-primary">
                          {getHighlightIcon(highlight.icon)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-serif text-foreground mb-3">
                      {formatAmpersand(highlight.title)}
                    </CardTitle>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {highlight.description}
                    </p>
                    <Link href={highlight.link}>
                      <Button variant="outline" className="w-full">
                        {highlight.linkText}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section Parallax - Bien-être */}
        <ParallaxSection
          backgroundImage={parallaxImage || wellnessImage}
          parallaxSpeed={0.5}
          minHeight="70vh"
          overlay={true}
          overlayOpacity={0.4}
          className="flex items-center"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          </div>
        </ParallaxSection>

        {/* Call to Action final */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {cta.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={cta.primaryLink}>
                <Button size="lg" className="w-full sm:w-auto">
                  {cta.primaryButton}
                </Button>
              </Link>
              <Link href={cta.secondaryLink}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {cta.secondaryButton}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;