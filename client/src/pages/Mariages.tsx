import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Clock, MapPin, Star } from 'lucide-react';
import Footer from '@/components/Footer';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { mariagesPageData } from '@/data/mariagesData';

const Mariages = () => {
  const pageData = mariagesPageData;
  const eventData = pageData.sections[0];
  const mariagesData = {
    ...eventData,
    venues: eventData.venues
  };

  const ctaData = pageData.cta;

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section with CMS Image */}
      <section 
        className="relative h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${pageData.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            {formatAmpersand(pageData.heroTitle)}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl max-w-3xl mx-auto">
            {pageData.heroSubtitle}
          </p>
        </div>
      </section>

      {/* HTML Content Section */}
      {pageData.content && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="prose prose-lg max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: pageData.content }}
            />
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden hover-elevate transition-all duration-300 flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <img 
                src={mariagesData.image} 
                alt={mariagesData.name}
                className="w-full h-80 lg:h-full object-cover"
              />
            </div>
            
            <div className="lg:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <CardHeader className="p-0 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="outline" className="text-primary border-primary">
                      <Users className="w-3 h-3 mr-1" />
                      {mariagesData.capacity}
                    </Badge>
                    <Badge variant="outline" className="text-primary border-primary">
                      <Clock className="w-3 h-3 mr-1" />
                      {mariagesData.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl font-serif text-foreground mb-2">
                    {formatAmpersand(mariagesData.name)}
                  </CardTitle>
                  <p className="text-primary font-luxury italic text-lg mb-4">
                    {mariagesData.subtitle}
                  </p>
                </CardHeader>
                
                <CardContent className="p-0 space-y-6">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {mariagesData.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Services inclus :</h4>
                      <div className="space-y-2">
                        {mariagesData.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Star className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Lieux disponibles :</h4>
                      <div className="space-y-2">
                        {mariagesData.venues.map((venue, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                            <span>{venue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            {ctaData.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {ctaData.subtitle}
          </p>
          <div className="flex justify-center">
            <Button size="lg" data-testid="button-quote-marriage">
              <Calendar className="w-4 h-4 mr-2" />
              {ctaData.buttonText}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Mariages;