// src/components/Footer.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'wouter';
import { footerData } from '@/data/footerData';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import iPreferLogo from '@assets/I Prefer_logo_white_H_LARGE_1758205962584.png';
import preferredLifestyleLogo from '@assets/Preferred Lifestyle LOGO LARGE_black_1758205962584.png';

const Footer = () => {
  const { hotel, sections, contact, bottom, social, logos } = footerData;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription submitted');
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Facebook': return <Facebook className="w-4 h-4" />;
      case 'Instagram': return <Instagram className="w-4 h-4" />;
      case 'Twitter': return <Twitter className="w-4 h-4" />;
      case 'Linkedin': return <Linkedin className="w-4 h-4" />;
      default: return null;
    }
  };

  const getContactIcon = (key: string) => {
    switch (key) {
      case 'address': return <MapPin className="w-5 h-5" />;
      case 'phone': return <Phone className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'reception': return <Clock className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <footer className="bg-sidebar border-t border-sidebar-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Hotel Info & Newsletter */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-bold text-sidebar-foreground mb-4">
                  {hotel.title}
                </h3>
                <p className="text-sidebar-foreground/80 mb-6">
                  {hotel.description}
                </p>
              </div>
              
              {/* Newsletter */}
              <div>
                <h4 className="font-semibold text-sidebar-foreground mb-3">
                  {hotel.newsletter.title}
                </h4>
                <p className="text-sm text-sidebar-foreground/70 mb-4">
                  {hotel.newsletter.description}
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder={hotel.newsletter.placeholder}
                    className="flex-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
                    data-testid="input-newsletter"
                  />
                  <Button type="submit" size="sm" data-testid="button-newsletter">
                    {hotel.newsletter.button}
                  </Button>
                </form>
              </div>
            </div>

            {/* Footer Links */}
            {sections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-sidebar-foreground mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="text-sidebar-foreground/70 hover:text-primary transition-colors text-sm"
                        data-testid={`link-footer-${link.href.slice(1)}`}
                      >
                        {formatAmpersand(link.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Contact Info */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(contact).map(([key, info]) => (
              <div key={key} className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {getContactIcon(key)}
                </div>
                <div>
                  <p className="text-sm font-medium text-sidebar-foreground">{info.title}</p>
                  <p className="text-sm text-sidebar-foreground/70">
                    {Array.isArray(info.details) ? info.details.join('<br />') : info.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <p className="text-sm text-sidebar-foreground/70">
              {bottom.copyright}
            </p>
            
            <span>{bottom.rating}</span>
            
            <img 
              src={iPreferLogo} 
              alt="I Prefer Hotel Rewards"
              className="h-12 opacity-80 hover:opacity-100 transition-opacity"
              data-testid="logo-iprefer"
            />
            
            <img 
              src={preferredLifestyleLogo} 
              alt="Preferred Lifestyle"
              className="h-12 opacity-80 hover:opacity-100 transition-opacity filter invert"
              data-testid="logo-preferred-lifestyle"
            />
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-sidebar-foreground/70 mr-2">{bottom.follow}</span>
              {social.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 text-sidebar-foreground/70 hover:text-primary"
                  data-testid={`button-social-${social.label.toLowerCase()}`}
                >
                  {getSocialIcon(social.icon)}
                  <span className="sr-only">{social.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;