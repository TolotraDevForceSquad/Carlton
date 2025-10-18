import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Sparkles, Heart } from 'lucide-react';
import Footer from '@/components/Footer';
import poolImage from '@assets/generated_images/Spa_wellness_facilities_3dba6f04.png';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';

const BienEtreLoisirs = () => {
  const facilities = [
    {
      id: 1,
      name: "Piscine",
      type: "Détente Aquatique",
      description: "Notre piscine à débordement de 25 mètres offre une vue imprenable sur Antananarivo. Un véritable joyau suspendu au cœur de la ville, parfait pour la nage et la détente absolue.",
      image: poolImage,
      hours: "06h00 - 22h00",
      features: [
        "Piscine à débordement 25m",
        "Bassin pour enfants sécurisé",
        "Bain à remous intégré",
        "Transats de luxe avec parasols",
        "Service de serviettes inclus",
        "Bar aquatique l'Oasis",
        "Éclairage nocturne ambiant",
        "Température contrôlée 28°C"
      ],
      services: ["Maître-nageur présent", "Cours d'aquagym", "Cocktails poolside"]
    },
    {
      id: 2,
      name: "Salle de Sport",
      type: "Fitness & Forme",
      description: "Un espace de remise en forme ultra-moderne de 200m² équipé des dernières technologies Technogym pour maintenir votre routine d'entraînement même en voyage.",
      image: poolImage,
      hours: "05h00 - 23h00",
      features: [
        "Équipements Technogym dernière génération",
        "Espace cardio-training climatisé",
        "Salle de musculation complète",
        "Zone d'étirement et yoga",
        "Vestiaires avec sauna",
        "Douches à l'italienne",
        "Casiers sécurisés",
        "Écrans individuels intégrés"
      ],
      services: ["Coach personnel disponible", "Programmes personnalisés", "Serviettes fournies"]
    },
    {
      id: 3,
      name: "Court de Tennis",
      type: "Sport & Compétition",
      description: "Court de tennis professionnel en surface dure avec éclairage nocturne, parfait pour maintenir votre niveau de jeu dans un cadre tropical exceptionnel.",
      image: poolImage,
      hours: "06h00 - 21h00",
      features: [
        "Court en surface dure régulation",
        "Éclairage LED professionnel",
        "Filets et poteaux de compétition",
        "Gradins pour spectateurs",
        "Vestiaires dédiés",
        "Local matériel équipé",
        "Système de réservation",
        "Douches et rafraîchissements"
      ],
      services: ["Professeur de tennis disponible", "Location de matériel", "Tournois amicaux"]
    },
    {
      id: 4,
      name: "Soins Holistiques",
      type: "Bien-être & Relaxation",
      description: "Espace de soins holistiques dédié à votre bien-être total, alliant techniques traditionnelles malgaches et soins modernes dans un environnement apaisant.",
      image: poolImage,
      hours: "09h00 - 21h00",
      features: [
        "Cabines de soins privées",
        "Techniques traditionnelles malgaches",
        "Massages thérapeutiques",
        "Soins du visage personnalisés",
        "Aromathérapie aux huiles locales",
        "Espace détente avec tisanerie",
        "Douches sensorielles",
        "Produits naturels locaux"
      ],
      services: ["Thérapeutes certifiés", "Soins sur mesure", "Conseil bien-être"]
    }
  ];


  const wellnessPrograms = [
    {
      id: 1,
      title: "Programme Détox Madagascar",
      duration: "3 jours",
      description: "Programme complet de détoxification utilisant les plantes endémiques de Madagascar",
      highlights: ["Soins aux plantes locales", "Nutrition détox", "Yoga quotidien", "Massages drainants"]
    },
    {
      id: 2,
      title: "Ritual Bien-être Traditionnel",
      duration: "2 heures",
      description: "Expérience authentique des techniques de soins traditionnels malgaches",
      highlights: ["Massage aux huiles essentielles", "Gommage au raphia", "Bain aux fleurs", "Relaxation guidée"]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-background to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              {formatAmpersand('Bien-être & Loisirs')}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Évadez-vous dans notre univers de bien-être alliant détente, sport et soins holistiques 
              au cœur de Madagascar pour une expérience de ressourcement totale
            </p>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Nos Installations
            </h2>
            <p className="text-lg text-muted-foreground">
              Des équipements haut de gamme pour votre bien-être et vos loisirs
            </p>
          </div>
          
          <div className="space-y-16">
            {facilities.map((facility, index) => {
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
              Programmes Bien-être
            </h2>
            <p className="text-lg text-muted-foreground">
              Découvrez nos programmes holistiques inspirés des traditions malgaches
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
            Votre oasis de détente au cœur d'Antananarivo
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Profitez de nos installations de loisirs et de bien-être ouvertes tous les jours. Nos équipes sont à votre disposition pour personnaliser votre expérience.
          </p>
          <div className="flex justify-center">
            <Button size="lg" data-testid="button-contact-wellness">
              <Heart className="w-4 h-4 mr-2" />
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BienEtreLoisirs;