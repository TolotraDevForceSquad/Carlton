import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, Users, Gift, Sparkles, Clock } from 'lucide-react';
import Footer from '@/components/Footer';
import { offresPageData } from '@/data/offresData';

const Offres = () => {
  const pageData = offresPageData;
  const { offers, seasonalOffers, cta } = pageData;
  const ctaButtons = cta.buttonTexts;

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

      {/* Main Offers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {offers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden hover-elevate transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant="outline" 
                      className="text-primary border-primary"
                    >
                      {offer.category}
                    </Badge>
                    {offer.highlight && (
                      <Badge className="bg-accent text-accent-foreground">
                        {offer.highlight}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl font-serif text-foreground mb-2">
                    {offer.title}
                  </CardTitle>
                  <p className="text-primary font-luxury italic text-lg">
                    {offer.subtitle}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {offer.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{offer.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Valable jusqu'au {offer.validUntil}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Cette offre comprend :</h4>
                    <ul className="space-y-2">
                      {offer.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Photo frame for offer */}
                  <div className="w-full h-48 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20 flex items-center justify-center mt-4">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Gift className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">
                        Photo de l'offre {offer.title}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Evènements Spéciaux
            </h2>
            <p className="text-lg text-muted-foreground">
              Profitez de nos offres spéciales selon les saisons et événements malgaches
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seasonalOffers.map((offer, index) => (
              <Card key={index} className="text-center hover-elevate">
                <CardHeader>
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl font-serif text-foreground">
                    {offer.title}
                  </CardTitle>
                  <Badge variant="outline" className="text-primary border-primary mx-auto">
                    {offer.period}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {offer.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            {cta.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" data-testid="button-contact-concierge">
              <Users className="w-4 h-4 mr-2" />
              {ctaButtons.primary}
            </Button>
            <Button variant="outline" size="lg" data-testid="button-callback">
              {ctaButtons.secondary}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Offres;