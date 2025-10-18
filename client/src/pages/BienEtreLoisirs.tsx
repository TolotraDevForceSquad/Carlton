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
      description: "Plongez dans notre grande piscine extérieure de 25 mètres, soigneusement maintenue, installée dans un lieu calme et discret au cœur de l'hôtel. Un véritable havre de paix, loin du tumulte urbain, idéal pour se détendre en famille ou entre amis. À deux pas, notre restaurant et notre bar complètent l’expérience pour des moments de convivialité et de plaisir partagé.",
      image: poolImage,
      hours: "",
      features: [
        "Bassin pour enfants",
        "Transats de luxe avec parasols",
        "Serviettes fournies"
      ],
      services: ["Maître-nageur présent", "Cours de natation", "Formules d’abonnement"]
    },
    {
      id: 2,
      name: "Fitness",
      type: "Fitness & Forme",
      description: "Équipée d’appareils TechnoGym dernière génération, notre salle de sport vous offre une expérience complète et personnalisée. Quel que soit votre niveau, profitez d’un matériel varié et performant pour allier bien-être et performance dans un cadre serein et soigné. Accès privilégié réservé aux hôtes.",
      image: poolImage,
      hours: "",
      features: [
        "Équipements Technogym dernière génération",
        "Espace cardio-training",
        "Équipements de musculation",
        "Serviettes fournies"
      ],
      services: ["Coach disponible"]
    },
    {
      id: 3,
      name: "Tennis",
      type: "Sport & Compétition",
      description: "Notre court de tennis en terre battue est accessible sur réservation. Raquettes et balles sont mises à votre disposition et un service de coaching privé peut être organisé sur demande. Pour prolonger le plaisir, des séances en soirée sont possibles, grâce à un éclairage spécialement conçu pour jouer dans des conditions idéales. Que vous soyez amateur ou joueur confirmé, vivez l’expérience tennis dans un environnement paisible et exclusif, niché au sein de l'hôtel.",
      image: poolImage,
      hours: "",
      features: [
        "Location de matériels",
        "Éclairage de nuit"
      ],
      services: ["Coach disponible", "Cours de tennis", "Formules d’abonnement"]
    },
    {
      id: 4,
      name: "Soins Holistiques",
      type: "Bien-être & Relaxation",
      description: "En collaboration avec Holistic Universal, l’hôtel vous invite à découvrir des soins thérapeutiques et énergétiques aux bienfaits profonds.",
      image: poolImage,
      hours: "",
      features: [],
      services: []
    }
  ];


  const wellnessPrograms = [
    {
      id: 1,
      title: "Massage holistique – 1h",
      duration: "1h",
      description: "Vivez l’expérience d’un soin énergétique singulier, associant les vertus des huiles essentielles et ayurvédiques. Un rituel thérapeutique sur mesure qui rééquilibre les énergies, soulage les tensions et nourrit le corps en profondeur.",
      highlights: []
    },
    {
      id: 2,
      title: "Massage avec pierres chaudes – 1h",
      duration: "1h",
      description: "Offrez-vous un massage du dos et des jambes à l’huile chaude, enrichi par l’utilisation de pierres semi-précieuses aux vertus énergétiques. Une expérience sensorielle unique pour relâcher les tensions et réharmoniser le corps.",
      highlights: []
    },
    {
      id: 3,
      title: "Massage relaxant – 1h",
      duration: "1h",
      description: "Lâchez prise dès la première minute. Ce soin allie gestes enveloppants et huiles essentielles apaisante pour éliminer le stress, détendre le corps et revitaliser l’esprit. Un vrai moment de bien-être à s’offrir ou à offrir.",
      highlights: []
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
              else if (facility.name === 'Fitness') sectionId = 'fitness';
              else if (facility.name === 'Tennis') sectionId = 'tennis';
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
                          {facility.hours && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{facility.hours}</span>
                            </div>
                          )}
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
              Les soins préférés à ne pas manquer
            </h2>
            <p className="text-lg text-muted-foreground">
              Découvrez nos soins holistiques inspirés des traditions
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
                  {program.highlights.length > 0 && (
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
                  )}
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
              Réserver votre séjour
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BienEtreLoisirs;