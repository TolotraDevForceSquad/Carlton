// src/components/Contact.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Phone, Mail, MapPin, Clock, Car, Plane, Users, Calendar, MessageCircle, Send } from 'lucide-react';
import Footer from '@/components/Footer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { contactData } from '@/data/contactData';

const contactFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez saisir une adresse email valide"),
  phone: z.string().min(8, "Le numéro de téléphone doit contenir au moins 8 chiffres"),
  subject: z.string().min(1, "Veuillez sélectionner un sujet"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  arrivalDate: z.string().optional(),
  departureDate: z.string().optional(),
  guests: z.string().optional()
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { heroTitle, heroDescription, contactInfo, form, services, practicalInfo } = contactData;
  
  const formInstance = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      arrivalDate: "",
      departureDate: "",
      guests: ""
    }
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Formulaire soumis:", data);
    // Simulation d'envoi sans backend
  };

  const getContactIcon = (iconName: string) => {
    switch (iconName) {
      case 'Phone': return <Phone className="w-6 h-6" />;
      case 'Mail': return <Mail className="w-6 h-6" />;
      case 'MapPin': return <MapPin className="w-6 h-6" />;
      case 'Clock': return <Clock className="w-6 h-6" />;
      default: return null;
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calendar': return <Calendar className="w-8 h-8" />;
      case 'Users': return <Users className="w-8 h-8" />;
      case 'Plane': return <Plane className="w-8 h-8" />;
      case 'Car': return <Car className="w-8 h-8" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-background to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              {heroTitle}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover-elevate">
                <CardContent className="pt-6">
                  <div className="text-primary mb-4 flex justify-center">
                    {getContactIcon(info.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1 mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" data-testid={`button-contact-${index}`}>
                    {info.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Services */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="hover-elevate">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-foreground flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  {form.title}
                </CardTitle>
                <p className="text-muted-foreground">
                  {form.subtitle}
                </p>
              </CardHeader>
              <CardContent>
                <Form {...formInstance}>
                  <form onSubmit={formInstance.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={formInstance.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom *</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre prénom" {...field} data-testid="input-firstname" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formInstance.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom *</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre nom" {...field} data-testid="input-lastname" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={formInstance.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="votre@email.com" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formInstance.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone *</FormLabel>
                            <FormControl>
                              <Input placeholder="+261 XX XX XXX XX" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={formInstance.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sujet de votre demande *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-subject">
                                <SelectValue placeholder="Sélectionnez un sujet" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {form.departments.map((dept) => (
                                <SelectItem key={dept.value} value={dept.value}>
                                  {dept.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={formInstance.control}
                        name="arrivalDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date d'arrivée</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-arrival" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formInstance.control}
                        name="departureDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de départ</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-departure" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formInstance.control}
                        name="guests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre d'invités</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="2" {...field} data-testid="input-guests" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={formInstance.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Votre message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Décrivez votre demande en détail..."
                              className="min-h-[120px]"
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" data-testid="button-submit-contact">
                      <Send className="w-4 h-4 mr-2" />
                      {form.submitButton}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Services & Additional Info */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-foreground">
                    Nos Services
                  </CardTitle>
                  <p className="text-muted-foreground">
                    À votre disposition pour un séjour parfait
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="text-primary flex-shrink-0">
                          {getServiceIcon(service.icon)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {service.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-foreground">
                    Informations Pratiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{formatAmpersand(practicalInfo.arrivalTitle)}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {practicalInfo.arrivalDetails.map((detail, idx) => (
                        <p key={idx}>• {detail}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{practicalInfo.airportTitle}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {practicalInfo.airportDetails.map((detail, idx) => (
                        <p key={idx}>• {detail}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{practicalInfo.languagesTitle}</h4>
                    <div className="flex flex-wrap gap-2">
                      {practicalInfo.languages.map((lang, idx) => (
                        <Badge key={idx} variant="secondary">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hotel Location Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-foreground">
                    {practicalInfo.locationTitle}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {practicalInfo.locationSubtitle}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Adresse complète</p>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: practicalInfo.address }} />
                      </div>
                    </div>
                    
                    <div className="w-full h-64 bg-card rounded-lg overflow-hidden border">
                      <iframe
                        src={practicalInfo.mapUrl}
                        width="100%"
                        height="256"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Carlton Madagascar Hotel Location"
                        data-testid="map-hotel-location"
                      ></iframe>
                    </div>
                    
                    <div className="text-center">
                      <Button variant="outline" data-testid="button-get-directions">
                        {practicalInfo.directionsButton}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;