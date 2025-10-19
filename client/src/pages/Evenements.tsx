import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Clock, MapPin, Star, Utensils, Music, Camera, Heart, GraduationCap, Theater, Martini, Layout } from 'lucide-react';
import Footer from '@/components/Footer';
import eventImage from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';

const Evenements = () => {
  const eventTypes = [
    {
      id: 1,
      name: "Évènements Corporate",
      type: "Excellence professionnelle",
      description: "Organisez vos réunions, ateliers, séminaires, conférences et événements d'entreprise dans nos espaces modulables équipés des dernières technologies. Un service impeccable pour des réunions réussies.",
      image: eventImage,
      hours: "Demi-journée à plusieurs jours",
      capacity: "10 - 500 participants",
      features: [
        "Salles modulables",
        "Sonorisation et vidéoprojecteur",
        "Connexion Wi-Fi haut débit",
        "Service de restauration sur mesure"
      ],
      services: ["Support technique", "Restauration d'affaires", "Hébergement groupe"]
    },
    {
      id: 2,
      name: "Réceptions & Galas",
      type: "Événements d'exception",
      description: "Pour vos réceptions officielles, cérémonies et galas, nous offrons un cadre prestigieux et un service haut de gamme nécessaires à votre succès.",
      image: eventImage,
      hours: "Soirée ou journée complète",
      capacity: "50 - 500 invités",
      features: [
        "Scénographie personnalisée",
        "Éclairage professionnel",
        "Sonorisation complète",
        "Service de sécurité",
        "Vestiaire et accueil VIP",
        "Buffets ou dîners assis",
        "Bar à cocktails premium"
      ],
      services: ["Scénographie premium", "Services VIP", "Communication événementielle"]
    },
    {
      id: 3,
      name: "Mariages de Prestige",
      type: "Votre jour le plus beau",
      description: "Célébrez votre union dans un cadre d'exception avec nos services de mariage sur mesure. Du cocktail de réception au dîner de gala, chaque détail est pensé pour créer des souvenirs inoubliables.",
      image: eventImage,
      hours: "Journée complète ou weekend",
      capacity: "20 - 200 invités",
      features: [
        "Coordinateur de mariage dédié",
        "Choix de lieux de cérémonie",
        "Menu gastronomique personnalisé",
        "Décoration florale incluse",
        "Suite nuptiale offerte",
        "Photographe professionnel disponible",
        "Service traiteur haut de gamme",
        "Orchestre ou DJ au choix"
      ],
      services: ["Planning personnalisé", "Coordination jour J", "Services premium"]
    },
    {
      id: 4,
      name: "Anniversaires & Célébrations",
      type: "Moments précieux",
      description: "Anniversaires marquants, jubilés, célébrations familiales... Nous créons des événements intimes ou grandioses selon vos envies, avec une attention particulière aux détails.",
      image: eventImage,
      hours: "3 heures à 2 jours",
      capacity: "15 - 150 invités",
      features: [
        "Planification personnalisée",
        "Menus thématiques",
        "Décoration sur mesure",
        "Animation musicale",
        "Service de photographie",
        "Gâteau d'anniversaire inclus",
        "Cocktails de bienvenue",
        "Souvenirs personnalisés"
      ],
      services: ["Décoration personnalisée", "Animation sur mesure", "Photographie souvenir"]
    }
  ];

  const services = [
    {
      title: "Planification Complète",
      description: "De la conception à la réalisation, notre équipe gère tous les aspects de votre événement",
      icon: <Calendar className="w-8 h-8" />
    },
    {
      title: "Restauration Gastronomique",
      description: "Nos chefs créent des menus exclusifs adaptés à votre événement et vos invités",
      icon: <Utensils className="w-8 h-8" />
    },
    {
      title: "Décoration & Ambiance",
      description: "Design floral, éclairage d'ambiance et mise en scène sur mesure",
      icon: <Star className="w-8 h-8" />
    },
    {
      title: "Services Techniques",
      description: "Sonorisation, éclairage, audiovisuel et toute la logistique technique",
      icon: <Music className="w-8 h-8" />
    },
    {
      title: "Hébergement Groupe",
      description: "Tarifs préférentiels et services dédiés pour vos invités",
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Captation Souvenir",
      description: "Photographe et vidéaste professionnels pour immortaliser vos moments",
      icon: <Camera className="w-8 h-8" />
    }
  ];

  const venues = [
    {
      name: "RAVINALA",
      area: "728 m²",
      uShape: 150,
      classroom: 550,
      theatre: 160,
      banquet: 500,
      cocktail: 500,
      boardroom: 200,
      features: [
        "150 U-shape",
        "550 Classroom",
        "160 Théâtre",
        "500 Banquet",
        "500 Cocktail",
        "200 Boardroom"
      ]
    },
    {
      name: "RAVINALA A",
      area: "475 m²",
      uShape: 90,
      classroom: 300,
      theatre: 110,
      banquet: 200,
      cocktail: 300,
      boardroom: 70,
      features: [
        "90 U-shape",
        "300 Classroom",
        "110 Théâtre",
        "200 Banquet",
        "300 Cocktail",
        "70 Boardroom"
      ]
    },
    {
      name: "RAVINALA B",
      area: "253 m²",
      uShape: 50,
      classroom: 200,
      theatre: 50,
      banquet: 100,
      cocktail: 200,
      boardroom: 50,
      features: [
        "50 U-shape",
        "200 Classroom",
        "50 Théâtre",
        "100 Banquet",
        "200 Cocktail",
        "50 Boardroom"
      ]
    },
    {
      name: "ROI",
      area: "48.5 m²",
      uShape: 15,
      classroom: 30,
      theatre: 15,
      banquet: 20,
      cocktail: 30,
      boardroom: 15,
      features: [
        "15 U-shape",
        "30 Classroom",
        "15 Théâtre",
        "20 Banquet",
        "30 Cocktail",
        "15 Boardroom"
      ]
    },
    {
      name: "REINE",
      area: "48.5 m²",
      uShape: 15,
      classroom: 30,
      theatre: 15,
      banquet: 20,
      cocktail: 30,
      boardroom: 15,
      features: [
        "15 U-shape",
        "30 Classroom",
        "15 Théâtre",
        "20 Banquet",
        "30 Cocktail",
        "15 Boardroom"
      ]
    },
    {
      name: "EXECUTIVE BOARDROOM",
      area: "47 m²",
      uShape: null,
      classroom: null,
      theatre: null,
      banquet: null,
      cocktail: null,
      boardroom: 15,
      features: [
        "15 Boardroom",
        "Réunions exécutives",
        "Équipement AV complet"
      ]
    },
    {
      name: "TOIT DE TANA",
      area: "298 m²",
      uShape: 50,
      classroom: 100,
      theatre: 50,
      banquet: 100,
      cocktail: 100,
      boardroom: 40,
      features: [
        "50 U-shape",
        "100 Classroom",
        "50 Théâtre",
        "100 Banquet",
        "100 Cocktail",
        "40 Boardroom"
      ]
    },
    {
      name: "LA TERRASSE AILE DROITE",
      area: "96 m²",
      uShape: 30,
      classroom: 50,
      theatre: 20,
      banquet: 40,
      cocktail: 50,
      boardroom: 30,
      features: [
        "30 U-shape",
        "50 Classroom",
        "20 Théâtre",
        "40 Banquet",
        "50 Cocktail",
        "30 Boardroom"
      ]
    },
    {
      name: "VALIHA A",
      area: "39 m²",
      uShape: null,
      classroom: null,
      theatre: null,
      banquet: null,
      cocktail: null,
      boardroom: 20,
      features: [
        "20 Boardroom",
        "Salle de réunion compacte"
      ]
    },
    {
      name: "VALIHA B",
      area: "27 m²",
      uShape: null,
      classroom: null,
      theatre: null,
      banquet: null,
      cocktail: null,
      boardroom: 15,
      features: [
        "15 Boardroom",
        "Salle de réunion intime"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-background to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              {formatAmpersand('Événements & Réceptions')}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Créez des moments inoubliables dans le cadre exceptionnel du Carlton Madagascar. 
              Des espaces modulables et une équipe dédiée pour vos événements sur mesure.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                <Users className="w-8 h-8 mx-auto mb-2" />
                500
              </div>
              <div className="text-sm text-muted-foreground">Invités maximum</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                <Calendar className="w-8 h-8 mx-auto mb-2" />
                10
              </div>
              <div className="text-sm text-muted-foreground">Salles d'événements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                <Star className="w-8 h-8 mx-auto mb-2" />
                5★
              </div>
              <div className="text-sm text-muted-foreground">Service de luxe</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                <Clock className="w-8 h-8 mx-auto mb-2" />
                24h
              </div>
              <div className="text-sm text-muted-foreground">Support dédié</div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Types d'Événements
            </h2>
            <p className="text-lg text-muted-foreground">
              Des prestations sur mesure pour chaque occasion
            </p>
          </div>
          
          <div className="space-y-16">
            {eventTypes.map((event, index) => {
              let sectionId = '';
              if (event.name === 'Évènements Corporate') sectionId = 'corporate';
              else if (event.name === 'Réceptions & Galas') sectionId = 'galas';
              else if (event.name === 'Mariages de Prestige') sectionId = 'mariages';
              else if (event.name === 'Anniversaires & Célébrations') sectionId = 'celebrations';
              
              return (
                <Card 
                  key={event.id} 
                  id={sectionId}
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
                      data-testid={`image-event-${event.id}`}
                    />
                  </div>
                  
                  <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className="text-primary border-primary" data-testid={`badge-type-${event.id}`}>
                            {formatAmpersand(event.type)}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{event.capacity}</span>
                          </div>
                        </div>
                        <CardTitle className="text-3xl font-serif text-foreground mb-3" data-testid={`title-event-${event.id}`}>
                          {formatAmpersand(event.name)}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="p-0 space-y-6">
                        <p className="text-muted-foreground leading-relaxed" data-testid={`description-event-${event.id}`}>
                          {event.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">Équipements & Services :</h4>
                            <div className="space-y-2">
                              {event.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`feature-${event.id}-${idx}`}>
                                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">Services inclus :</h4>
                            <div className="space-y-2">
                              {event.services.map((service, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`service-${event.id}-${idx}`}>
                                  <Star className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                                  <span>{service}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{event.hours}</span>
                          </div>
                          <Button size="sm">
                            Organiser cet événement
                          </Button>
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

      {/* Services Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Nos Services Événementiels
            </h2>
            <p className="text-lg text-muted-foreground">
              Une expertise complète pour la réussite de vos événements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover-elevate">
                <CardContent className="pt-8">
                  <div className="text-primary mb-4 flex justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section id="salles" className="py-20 bg-gradient-to-b from-background to-card/30 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Nos Espaces
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Découvrez nos espaces modulables, adaptés à tous types d'événements. De la petite réunion à la grande réception.
            </p>
          </div>
          
          {/* Tableau des Espaces */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border/50 bg-card">
              <thead>
                <tr className="bg-primary/5">
                  <th className="border border-border/50 px-4 py-3 text-left font-semibold text-foreground">VENUES</th>
                  <th className="border border-border/50 px-4 py-3 text-center font-semibold text-foreground">
                    <MapPin className="w-5 h-5 mx-auto mb-1" title="Surface en m²" />
                  </th>
                  <th className="border border-border/50 px-4 py-3 text-center font-semibold text-foreground">
                    <Layout className="w-5 h-5 mx-auto mb-1" title="U-shape" />
                  </th>
                  <th className="border border-border/50 px-4 py-3 text-center font-semibold text-foreground">
                    <GraduationCap className="w-5 h-5 mx-auto mb-1" title="Classroom" />
                  </th>
                  <th className="border border-border/50 px-4 py-3 text-center font-semibold text-foreground">
                    <Theater className="w-5 h-5 mx-auto mb-1" title="Théâtre" />
                  </th>
                  <th className="border border-border/50 px-4 py-3 text-center font-semibold text-foreground">
                    <Utensils className="w-5 h-5 mx-auto mb-1" title="Banquet" />
                  </th>
                  <th className="border border-border/50 px-4 py-3 text-center font-semibold text-foreground">
                    <Martini className="w-5 h-5 mx-auto mb-1" title="Cocktail" />
                  </th>
                  <th className="border border-border/50 px-4 py-3 text-center font-semibold text-foreground">
                    <Users className="w-5 h-5 mx-auto mb-1" title="Boardroom" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {venues.map((venue, index) => (
                  <tr key={index} className="hover:bg-accent/20 transition-colors">
                    <td className="border border-border/50 px-4 py-3 font-medium text-foreground">{venue.name}</td>
                    <td className="border border-border/50 px-4 py-3 text-center text-muted-foreground">{venue.area}</td>
                    <td className="border border-border/50 px-4 py-3 text-center text-muted-foreground">{venue.uShape ?? '-'}</td>
                    <td className="border border-border/50 px-4 py-3 text-center text-muted-foreground">{venue.classroom ?? '-'}</td>
                    <td className="border border-border/50 px-4 py-3 text-center text-muted-foreground">{venue.theatre ?? '-'}</td>
                    <td className="border border-border/50 px-4 py-3 text-center text-muted-foreground">{venue.banquet ?? '-'}</td>
                    <td className="border border-border/50 px-4 py-3 text-center text-muted-foreground">{venue.cocktail ?? '-'}</td>
                    <td className="border border-border/50 px-4 py-3 text-center text-muted-foreground">{venue.boardroom ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-none">
              <CardContent className="p-12">
                <h3 className="text-3xl font-serif font-bold text-foreground mb-6">
                  Besoin d'un espace personnalisé ?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Nos équipes peuvent aménager et configurer nos espaces selon vos besoins spécifiques. 
                  Contactez-nous pour discuter de votre projet unique.
                </p>
                <Button size="lg" className="shadow-lg" asChild>
                  <a href="#contact">
                    👉 Demander un devis
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Planifions Votre Événement
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Notre équipe dédiée aux événements vous accompagne de la conception à la réalisation
          </p>
          <div className="flex justify-center">
            <Button size="lg" data-testid="button-quote-events">
              <Heart className="w-4 h-4 mr-2" />
              Demander un devis
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Evenements;