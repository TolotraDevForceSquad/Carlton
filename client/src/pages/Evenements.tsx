import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Clock, MapPin, Star, Utensils, Music, Camera, Heart, GraduationCap, Theater, Martini, Layout } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Footer from '@/components/Footer';
import eventImage from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';

const Evenements = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [location, navigate] = useLocation();

  // SOLUTION COMPLÈTE : Gestion du défilement pour tous les cas
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScrollToHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      }
    };

    // 1. Écouter les changements de hash (navigation depuis d'autres pages)
    window.addEventListener('hashchange', handleScrollToHash);
    
    // 2. Vérifier au chargement initial
    handleScrollToHash();

    // 3. Intercepter les clics sur les liens d'ancres MÊME sur la page actuelle
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash) {
        const hash = link.hash.replace('#', '');
        if (hash && window.location.pathname === '/evenements') {
          e.preventDefault();
          // Mettre à jour l'URL sans recharger
          window.history.pushState(null, '', link.hash);
          handleScrollToHash();
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('hashchange', handleScrollToHash);
      document.removeEventListener('click', handleAnchorClick);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Fonction utilitaire pour gérer les clics sur les boutons de navigation
  const handleEventNavigation = (sectionId: string) => {
    if (window.location.pathname === '/evenements') {
      // Si déjà sur la page, on utilise le défilement direct
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        // Mettre à jour l'URL sans recharger
        window.history.pushState(null, '', `#${sectionId}`);
      }
    } else {
      // Sinon, navigation normale
      navigate(`/evenements#${sectionId}`);
    }
  };

  const eventTypes = [
    {
      id: 1,
      name: "Évènements Corporate",
      type: "Excellence professionnelle",
      description: "Organisez vos réunions, ateliers, séminaires, conférences et événements d'entreprise dans nos espaces modulables équipés des dernières technologies. Notre équipe expérimentée vous assiste de la planification à la coordination le jour de l'événement.",
      image: eventImage,
      hours: "Demi-journée à plusieurs jours",
      capacity: "10 - 500 participants",
      features: [
        "Salles modulables",
        "Sonorisation et vidéoprojecteur",
        "Connexion Wi-Fi haut débit",
        "Restauration sur mesure"
      ],
      services: []
    },
    {
      id: 2,
      name: "Réceptions & Galas",
      type: "Événements d'exception",
      description: "Pour vos réceptions officielles, cérémonies et soirées de gala, nous offrons un cadre unique et un service haut de gamme à la hauteur de vos exigences. Nos salles spacieuses et modulables s'adaptent à tous les formats d'événements dans une atmosphère sobre et distinguée. \n\nNotre offre traiteur met à l'honneur une cuisine de qualité. Chaque prestation est personnalisable selon vos attentes, avec des mets soigneusement élaborés, une présentation élégante et un service discret et professionnel.",
      image: eventImage,
      hours: "Soirée ou journée complète",
      capacity: "50 - 500 invités",
      features: [
        "Salles modulables",
        "Connexion Wi-Fi haut débit",
        "Equipement, décoration et restauration sur mesure"
      ],
      services: []
    },
    {
      id: 3,
      name: "Mariages de prestige",
      type: "Votre jour le plus beau",
      description: "Offrez à votre mariage un écrin de prestige au cœur de la ville. Nos salles de réception vous accueillent dans un lieu élégant, raffiné et spacieux parfait pour célébrer l'un des plus beaux jours de votre vie. \n\nDu cocktail au banquet, chaque proposition est pensée sur mesure, avec des produits minutieusement sélectionnés, une présentation soignée et une cuisine alliant finesse et générosité.\n\nNotre équipe dédiée vous accompagne avec professionnalisme et discrétion, de la préparation jusqu'au jour J, pour faire de votre évènement un moment harmonieux.",
      image: eventImage,
      hours: "Journée complète ou weekend",
      capacity: "20 - 200 invités",
      features: [
        "Salles modulables",
        "Connexion Wi-Fi haut débit",
        "Equipement, décoration et restauration sur mesure"
      ],
      services: []
    },
    {
      id: 4,
      name: "Anniversaires & Célébrations",
      type: "Moments précieux",
      description: "Anniversaires marquants, jubilés, fêtes de famille ou célébrations privées… Accueillez vos proches dans un cadre à la fois chic et convivial à la hauteur de l'événement, nos espaces s'ajustent à la taille et au style de votre réception. Nous créons des événements intimes ou grandioses selon vos envies, avec une attention particulière aux détails.",
      image: eventImage,
      hours: "3 heures à 2 jours",
      capacity: "15 - 150 invités",
      features: [
        "Salles modulables",
        "Connexion Wi-Fi haut débit",
        "Equipement, décoration et restauration sur mesure"
      ],
      services: []
    },
    {
      id: 5,
      name: "Service Traiteur",
      type: "Le savoir-faire au cœur de vos évènements",
      description: "Faites confiance à notre équipe traiteur expérimentée, engagée à faire de chaque événement un moment unique. Que ce soit pour un mariage, un anniversaire, une réception privée ou un événement professionnel, nous vous accompagnons à chaque étape avec professionnalisme et savoir-faire.\n\nNous proposons une cuisine raffinée qui mêle savoir-faire et originalité. Cocktails, buffets, menus personnalisés : tout est pensé pour s'adapter à vos envies et au format de votre réception.\n\nDotés d'un équipement complet et moderne, nous assurons une prestation fluide. De la mise en place au service, chaque détail est pris en charge pour vous garantir une expérience sans stress et parfaitement maîtrisée.\n\nParce que chaque événement est unique, notre équipe reste à votre écoute pour créer une offre sur mesure, qui répond à vos attentes, à votre budget et à vos exigences.",
      image: eventImage,
      hours: "Sur mesure",
      capacity: "Adapté à l'événement",
      features: [
        "Équipements & services sur mesure"
      ],
      services: []
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

  const venueGroups = [
    {
      id: 1,
      title: "La salle RAVINALA",
      desc: "est une grande salle plénière et multifonctionnelle, modulable en 2 parties (Ravinala A et Ravinala B). Elle est parfaitement conçue pour accueillir les évènements d'envergure jusqu'à 500 personnes, qu'il s'agisse de conférences professionnelles ou de célébrations privées telles que les mariages.",
      subVenues: ['RAVINALA', 'RAVINALA A', 'RAVINALA B'],
      image: eventImage
    },
    {
      id: 2,
      title: "Les salles ROI ET REINE",
      desc: "peuvent être utilisées en annexe ou pour les ateliers en travaux de groupe.",
      subVenues: ['ROI', 'REINE'],
      image: eventImage
    },
    {
      id: 3,
      title: "L'EXECUTIVE BOARDROOM",
      desc: "est le cadre idéal pour les réunions confidentielles, et s'adapte aisément en salle complémentaire ou annexe pour les événements de plus grande ampleur.",
      subVenues: ['EXECUTIVE BOARDROOM'],
      image: eventImage
    },
    {
      id: 4,
      title: "Le TOIT DE TANA",
      desc: "est un espace polyvalent et spacieux, bénéficiant d'un bel éclairage naturel, grâce à ses grandes baies vitrées. Située au 15ème étage, il offre une vue panoramique imprenable sur la ville, créant un décor à la fois élégant et inspirant. Avec son cachet unique et son atmosphère d'exception, c'est le lieu incontournable pour sublimer vos événements, qu'ils soient professionnels ou privés.",
      subVenues: ['TOIT DE TANA'],
      image: eventImage
    },
    {
      id: 5,
      title: "La TERRASSE AILE DROITE",
      desc: "allie confort, luminosité et flexibilité. Elle offre un environnement raffiné et accueillant, parfait pour vos réceptions, célébrations et événements sur mesure.",
      subVenues: ['LA TERRASSE AILE DROITE'],
      image: eventImage
    },
    {
      id: 6,
      title: "Les salles VALIHA A & VALIHA B",
      desc: "conviennent pour les réunions et ateliers en petit groupe et peuvent également servir de salles annexes selon vos besoins logistiques.",
      subVenues: ['VALIHA A', 'VALIHA B'],
      image: eventImage
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
      
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

          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <button 
              onClick={() => handleEventNavigation('mariages')}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              Mariages
            </button>
            <button 
              onClick={() => handleEventNavigation('corporate')}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              Événements Corporate
            </button>
            <button 
              onClick={() => handleEventNavigation('galas')}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              Galas & Réceptions
            </button>
            <button 
              onClick={() => handleEventNavigation('celebrations')}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              Célébrations
            </button>
            <button 
              onClick={() => handleEventNavigation('salles')}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              Nos Espaces
            </button>
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
              else if (event.name === 'Mariages de prestige') sectionId = 'mariages';
              else if (event.name === 'Anniversaires & Célébrations') sectionId = 'celebrations';
              else if (event.name === 'Service Traiteur') sectionId = 'traiteur';
              
              return (
                <Card 
                  key={event.id} 
                  id={sectionId}
                  className={`overflow-hidden hover-elevate transition-all duration-300 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex flex-col lg:flex`}
                  data-testid={`card-event-${event.id}`}
                >
                  <div className="lg:w-1/2 relative overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.name}
                      className="w-full h-80 lg:h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                      onClick={() => setSelectedImage(event.image)}
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
                          {event.capacity && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Users className="w-4 h-4" />
                              <span>{event.capacity}</span>
                            </div>
                          )}
                        </div>
                        <CardTitle className="text-3xl font-serif text-foreground mb-3" data-testid={`title-event-${event.id}`}>
                          {formatAmpersand(event.name)}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="p-0 space-y-6">
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap" data-testid={`description-event-${event.id}`}>
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
                          
                          {event.services.length > 0 && (
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
                          )}
                        </div>

                        {event.hours && (
                          <div className="flex items-center justify-between pt-4">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{event.hours}</span>
                            </div>
                            <Button 
                              size="sm"
                              onClick={() => navigate('/contact')}
                            >
                              Organiser cet événement
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 m-0">
          <img 
            src={selectedImage!} 
            alt="Événement"
            className="w-full h-full object-contain"
          />
        </DialogContent>
      </Dialog>

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
              Carlton Madagascar dispose de plusieurs espaces dédiés aux évènements. Grâce à leur modularité, nos salles s'adaptent à tous types de configurations et d'occasions pour vous garantir un cadre fonctionnel, élégant et convivial. Découvrez nos espaces modulables, adaptés à tous types d'événements. De la petite réunion à la grande réception.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {venueGroups.map((group) => (
              <Card
                key={group.id}
                className="overflow-hidden hover-elevate transition-all duration-300 flex flex-col"
              >
                <div className="w-full relative overflow-hidden">
                  <img
                    src={group.image}
                    alt={group.title}
                    className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedImage(group.image)}
                  />
                </div>
                <div className="p-8">
                  <div className="space-y-4">
                    <CardTitle className="text-2xl font-serif font-bold text-foreground">
                      {group.title}
                    </CardTitle>
                    <p className="text-muted-foreground leading-relaxed">
                      {group.desc}
                    </p>
                    {group.subVenues.length > 1 && (
                      <div className="flex flex-wrap gap-2">
                        {group.subVenues.map((subVenue) => (
                          <Badge key={subVenue} variant="secondary" className="text-xs">
                            {subVenue}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Tableau des Espaces */}
          <div className="overflow-x-auto mb-16">
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
                <Button 
                  size="lg" 
                  className="shadow-lg"
                  onClick={() => navigate('/contact')}
                >
                  👉 Demander un devis
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
            Besoin d'organiser un évènement ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour concevoir une offre personnalisée.
            Contactez-nous pour discuter de votre projet.
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              data-testid="button-quote-events"
              onClick={() => navigate('/contact')}
            >
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