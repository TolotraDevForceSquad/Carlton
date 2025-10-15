// src/components/BienEtreLoisirs.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, Star, Sparkles, Heart } from 'lucide-react';
import Footer from '@/components/Footer';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { bienEtreLoisirsData } from '@/data/bienEtreLoisirsData';
import poolImage from '@assets/generated_images/Spa_wellness_facilities_3dba6f04.png';

const BienEtreLoisirs = () => {
  const { facilities, wellnessPrograms, heroTitle, heroSubtitle, content, bottomSection, sectionsTitle, sectionsDescription, programsTitle, programsDescription } = bienEtreLoisirsData;
  
  // Fallback pour facilities si CMS n'est pas simulé
  const processedFacilities = facilities.map((facility) => ({
    ...facility,
    image: facility.image || poolImage,
    features: facility.features || [],
    services: facility.services || []
  }));

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section 
        className="pt-20 bg-gradient-to-r from-background to-card/50 bg-cover bg-center bg-no-repeat relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-foreground">
              {formatAmpersand(heroTitle)}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
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

      {/* Facilities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              {sectionsTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {sectionsDescription}
            </p>
          </div>
          
          <div className="space-y-16">
            {processedFacilities.map((facility, index) => {
              let sectionId = '';
              if (facility.name === 'Piscine') sectionId = 'piscine';
              else if (facility.name === 'Salle de Sport') sectionId = 'salle-sport';
              else if (facility.name === 'Court de Tennis') sectionId = 'tennis';
              else if (facility.name === 'Soins Holistiques') sectionId = 'soins';
              
              return (
                <Card 
                  key={facility.id} 
                  id={sectionId}
                  className={`overflow-hidden hover-elevate transition-all duration-300 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex flex-col lg:flex`}
                  data-testid={`card-facility-${facility.id}`}
                >
                  <div className="lg:w-1/2">
                    <img 
                      src={facility.image} 
                      alt={facility.name}
                      className="w-full h-80 lg:h-full object-cover"
                      data-testid={`image-facility-${facility.id}`}
                    />
                  </div>
                  
                  <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className="text-primary border-primary" data-testid={`badge-type-${facility.id}`}>
                            {formatAmpersand(facility.type)}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{facility.hours}</span>
                          </div>
                        </div>
                        <CardTitle className="text-3xl font-serif text-foreground mb-3" data-testid={`title-facility-${facility.id}`}>
                          {facility.name}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="p-0 space-y-6">
                        <p className="text-muted-foreground leading-relaxed" data-testid={`description-facility-${facility.id}`}>
                          {facility.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">Équipements :</h4>
                            <div className="space-y-2">
                              {facility.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`feature-${facility.id}-${idx}`}>
                                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">Services :</h4>
                            <div className="space-y-2">
                              {facility.services.map((service, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`service-${facility.id}-${idx}`}>
                                  <Star className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                                  <span>{service}</span>
                                </div>
                              ))}
                            </div>
                          </div>
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

      {/* Wellness Programs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              {programsTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {programsDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wellnessPrograms.map((program) => (
              <Card key={program.id} className="hover-elevate" data-testid={`card-program-${program.id}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-primary border-primary" data-testid={`badge-duration-${program.id}`}>
                      {program.duration}
                    </Badge>
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-serif text-foreground" data-testid={`title-program-${program.id}`}>
                    {formatAmpersand(program.title)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground" data-testid={`description-program-${program.id}`}>
                    {program.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Programme inclus :</h4>
                    <div className="space-y-1">
                      {program.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`highlight-${program.id}-${idx}`}>
                          <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Bottom Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            {bottomSection.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {bottomSection.description}
          </p>
          <div className="flex justify-center">
            <Button size="lg" data-testid="button-contact-wellness">
              <Heart className="w-4 h-4 mr-2" />
              {bottomSection.buttonText}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BienEtreLoisirs;