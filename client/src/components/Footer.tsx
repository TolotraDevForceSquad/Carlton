import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'wouter';
import iPreferLogo from '@assets/I Prefer_logo_white_H_LARGE_1758205962584.png';
import preferredLifestyleLogo from '@assets/Preferred Lifestyle LOGO LARGE_black_1758205962584.png';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription submitted');
  };

  const footerSections = [
    {
      title: "L'Hôtel",
      links: [
        { label: "À propos", href: "/about" },
        { label: "Histoire", href: "/history" },
        { label: "Récompenses", href: "/awards" },
        { label: "Emplois", href: "/careers" }
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Chambres & Suites", href: "/chambres" },
        { label: "Restaurants", href: "/restaurants" },
        { label: "Spa & Bien-être", href: "/spa" },
        { label: "Événements", href: "/evenements" }
      ]
    },
    {
      title: "Informations",
      links: [
        { label: "Conditions générales", href: "/terms" },
        { label: "Politique de confidentialité", href: "/privacy" },
        { label: "Plan du site", href: "/sitemap" },
        { label: "FAQ", href: "/faq" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

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
                  Carlton Madagascar
                </h3>
                <p className="text-sidebar-foreground/80 mb-6">
                  L'art de vivre à la française au cœur d'Antananarivo. Un hôtel 5 étoiles où luxe et raffinement créent une expérience inoubliable.
                </p>
              </div>
              
              {/* Newsletter */}
              <div>
                <h4 className="font-semibold text-sidebar-foreground mb-3">
                  Newsletter
                </h4>
                <p className="text-sm text-sidebar-foreground/70 mb-4">
                  Recevez nos offres exclusives et actualités
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder="Votre email"
                    className="flex-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
                    data-testid="input-newsletter"
                  />
                  <Button type="submit" size="sm" data-testid="button-newsletter">
                    S'abonner
                  </Button>
                </form>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
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
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">Adresse</p>
                <p className="text-sm text-sidebar-foreground/70">
                  Rue Pierre Stibbe Anosy<br />
                  101 Antananarivo, Madagascar
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">Téléphone</p>
                <p className="text-sm text-sidebar-foreground/70">
                  +261 20 22 260 60
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">Email</p>
                <p className="text-sm text-sidebar-foreground/70">
                  contact@carlton.mg
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">Réception</p>
                <p className="text-sm text-sidebar-foreground/70">
                  24h/24 - 7j/7
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <p className="text-sm text-sidebar-foreground/70">
              © 2025 Carlton Madagascar. Tous droits réservés.
            </p>
            
            <span>★★★★★ Hôtel 5 étoiles</span>
            
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
              <span className="text-sm text-sidebar-foreground/70 mr-2">Suivez-nous :</span>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 text-sidebar-foreground/70 hover:text-primary"
                    data-testid={`button-social-${social.label.toLowerCase()}`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="sr-only">{social.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;