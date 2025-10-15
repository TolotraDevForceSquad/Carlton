// src/components/ContactSection.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

import { contactSectionData } from '@/data/contactSectionData';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const { header, form, contactInfo, location, quickActions } = contactSectionData;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    console.log(`${field} updated:`, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const getContactIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin': return <MapPin className="w-6 h-6" />;
      case 'Phone': return <Phone className="w-6 h-6" />;
      case 'Mail': return <Mail className="w-6 h-6" />;
      case 'Clock': return <Clock className="w-6 h-6" />;
      default: return null;
    }
  };

  const getQuickActionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Phone': return <Phone className="w-5 h-5" />;
      case 'MessageCircle': return <MessageCircle className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <section className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            {header.title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {header.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-card-foreground flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-primary" />
                {form.title}
              </CardTitle>
              <p className="text-muted-foreground">
                {form.subtitle}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{form.fields.name.label}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={form.fields.name.placeholder}
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{form.fields.email.label}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={form.fields.email.placeholder}
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{form.fields.phone.label}</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder={form.fields.phone.placeholder}
                      data-testid="input-phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">{form.fields.subject.label}</Label>
                    <Select onValueChange={(value) => handleInputChange('subject', value)}>
                      <SelectTrigger data-testid="select-subject">
                        <SelectValue placeholder={form.fields.subject.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {form.fields.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">{form.fields.message.label}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder={form.fields.message.placeholder}
                    rows={5}
                    required
                    data-testid="textarea-message"
                  />
                </div>
                
                <Button type="submit" className="w-full" data-testid="button-submit-contact">
                  <Send className="w-4 h-4 mr-2" />
                  {form.submitButton}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="p-6 hover-elevate">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                        {getContactIcon(info.icon)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Google Maps Placeholder */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl font-serif text-card-foreground">
                  {location.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center border border-border">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {location.description}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {location.address}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4"
                      data-testid="button-open-maps"
                    >
                      {location.button}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Button key={index} className={`h-16 text-left justify-start ${index === 0 ? '' : 'variant="outline"'}`} data-testid={`button-quick-${index}`}>
                  {getQuickActionIcon(action.icon)}
                  <div>
                    <div className="font-semibold">{action.title}</div>
                    <div className="text-xs opacity-90">{action.subtitle}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;