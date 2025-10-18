import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Clock, MapPin, Star, Utensils, Music, Camera, Heart } from 'lucide-react';
import Footer from '@/components/Footer';
import eventImage from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';

const Evenements = () => {
  const eventTypes = [
    {
      id: 1,
      name: "Mariages de Prestige",
      type: "Célébration d'exception",
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
      id: 2,
      name: "Événements Corporate",
      type: "Excellence professionnelle",
      description: "Organisez vos séminaires, conférences et événements d'entreprise dans nos espaces modulables équipés des dernières technologies. Un service impeccable pour des réunions réussies.",
      image: eventImage,
      hours: "Demi-journée à 3 jours",
      capacity: "10 - 300 participants",
      features: [
        "Salles modulables équipées",
        "Matériel audiovisuel inclus",
        "Connexion Wi-Fi haut débit",
        "Service de restauration adapté",
        "Équipe technique dédiée",
        "Parking réservé",
        "Service de conciergerie",
        "Chambres à tarif préférentiel"
      ],
      services: ["Support technique", "Restauration d'affaires", "Hébergement groupe"]
    },
    {
      id: 3,
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
    },
    {
      id: 4,
      name: "Lancements & Galas",
      type: "Événements d'exception",
      description: "Pour vos lancements de produits, galas de charité ou réceptions officielles, nous offrons le cadre prestigieux et les services haut de gamme nécessaires à votre succès.",
      image: eventImage,
      hours: "Soirée ou journée",
      capacity: "50 - 400 invités",
      features: [
        "Scénographie personnalisée",
        "Éclairage professionnel",
        "Sonorisation complète",
        "Service de sécurité",
        "Vestiaire et accueil VIP",
        "Buffets ou dîners assis",
        "Bar à cocktails premium",
        "Relations presse si demandé"
      ],
      services: ["Scénographie premium", "Services VIP", "Communication événementielle"]
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
      name: "Ravinala",
      capacity: "150-550 personnes",
      area: "728m²",
      features: ["150 classe", "550 théâtre", "160 U", "500 banquet/cocktail", "200 board"]
    },
    {
      name: "Ravinala A",
      capacity: "90-300 personnes", 
      area: "475m²",
      features: ["90 classe", "300 théâtre", "110 U", "200 banquet", "300 cocktail", "70 board"]
    },
    {
      name: "Ravinala B",
      capacity: "50-200 personnes",
      area: "253m²", 
      features: ["50 classe", "200 théâtre", "50 U", "100 banquet", "200 cocktail", "50 board"]
    },
    {
      name: "Toit de Tana",
      capacity: "50-100 personnes",
      area: "298m²",
      features: ["50 classe", "100 théâtre", "50 U", "100 banquet/cocktail", "40 board"]
    },
    {
      name: "La Terrasse",
      capacity: "150-200 personnes",
      area: "272m²",
      features: ["150 théâtre", "200 banquet", "150 cocktail"]
    },
    {
      name: "Oasis de Tana",
      capacity: "250-300 personnes",
      area: "391m²",
      features: ["250 banquet", "300 cocktail", "Cadre piscine"]
    },
    {
      name: "Executive Boardroom",
      capacity: "15 personnes",
      area: "47m²",
      features: ["15 board", "Réunions exec", "Équipement AV"]
    },
    {
      name: "Salle Roi",
      capacity: "15-30 personnes",
      area: "48.5m²",
      features: ["15 classe", "30 théâtre", "15 U", "20 banquet", "30 cocktail", "15 board"]
    },
    {
      name: "Salle Reine",
      capacity: "15-30 personnes", 
      area: "48.5m²",
      features: ["15 classe", "30 théâtre", "15 U", "20 banquet", "30 cocktail", "15 board"]
    },
    {
      name: "Terrasse Aile Droite",
      capacity: "30-50 personnes",
      area: "96m²",
      features: ["30 classe", "50 théâtre", "20 U", "40 banquet", "50 cocktail", "30 board"]
    },
    {
      name: "Terrasse Aile Gauche", 
      capacity: "100 personnes",
      area: "176m²",
      features: ["100 théâtre", "100 banquet", "100 cocktail"]
    },
    {
      name: "Valiha A",
      capacity: "20 personnes",
      area: "39m²",
      features: ["20 board", "Salle réunion"]
    },
    {
      name: "Valiha B",
      capacity: "15 personnes",
      area: "27m²", 
      features: ["15 board", "Salle réunion"]
    },
    {
      name: "Foyer",
      capacity: "200 personnes",
      area: "170m²",
      features: ["200 cocktail", "Espace accueil"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section - Style similaire à BienEtreLoisirs */}
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

          {/* Stats Section - Style épuré */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                <Users className="w-8 h-8 mx-auto mb-2" />
                400
              </div>
              <div className="text-sm text-muted-foreground">Invités maximum</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                <Calendar className="w-8 h-8 mx-auto mb-2" />
                15
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

      {/* Event Types - Structure similaire à BienEtreLoisirs */}
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
              if (event.name === 'Mariages de Prestige') sectionId = 'mariages';
              else if (event.name === 'Événements Corporate') sectionId = 'corporate';
              else if (event.name === 'Anniversaires & Célébrations') sectionId = 'celebrations';
              else if (event.name === 'Lancements & Galas') sectionId = 'galas';
              
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
                            <h4 className="font-semibold text-foreground mb-3">Caractéristiques :</h4>
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

      {/* Venues Section - Liste complète restaurée */}
      <section id="salles" className="py-20 bg-gradient-to-b from-background to-card/30 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Nos Espaces d'Exception
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Découvrez nos 15 salles d'événements, conçues pour s'adapter à tous vos besoins. 
              De l'intimité d'une réunion restreinte à l'ampleur d'un gala de prestige.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {venues.map((venue, index) => (
              <Card key={index} className="hover-elevate transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-serif text-foreground group-hover:text-primary transition-colors">
                    {venue.name}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <Users className="w-3 h-3 mr-1" />
                      {venue.capacity}
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <MapPin className="w-3 h-3 mr-1" />
                      {venue.area}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {venue.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        <div className="w-2 h-2 bg-primary/60 rounded-full flex-shrink-0"></div>
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-all">
                      <Calendar className="w-4 h-4 mr-2" />
                      Réserver cette salle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                <Button size="lg" className="shadow-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Consulter nos experts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA - Style cohérent avec BienEtreLoisirs */}
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