// Footer.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'wouter';
import { footerData } from '@/data/footerData';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';

const Footer = () => {
  // TODO: Integrate with i18n hook (e.g., useTranslation from react-i18next) to get dynamic lang
  // For now, hardcoded to 'fr' - replace with actual lang logic
  const lang = 'fr' as 'fr' | 'en';

  const getText = (texts: { fr: string; en: string }): string => texts[lang];
  const getValue = (value: string | { fr: string; en: string }): string => 
    typeof value === 'string' ? value : value[lang];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription submitted');
  };

  const iconComponents = {
    MapPin,
    Phone,
    Mail,
    Clock,
  };

  const socialIconComponents = {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
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
                  {getText(footerData.hotelName)}
                </h3>
                <p className="text-sidebar-foreground/80 mb-6">
                  {getText(footerData.hotelDescription)}
                </p>
              </div>
              
              {/* Newsletter */}
              <div>
                <h4 className="font-semibold text-sidebar-foreground mb-3">
                  {getText(footerData.newsletter.title)}
                </h4>
                <p className="text-sm text-sidebar-foreground/70 mb-4">
                  {getText(footerData.newsletter.subtitle)}
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder={getText(footerData.newsletter.inputPlaceholder)}
                    className="flex-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
                    data-testid="input-newsletter"
                  />
                  <Button type="submit" size="sm" data-testid="button-newsletter">
                    {getText(footerData.newsletter.submitButton)}
                  </Button>
                </form>
              </div>
            </div>

            {/* Footer Links */}
            {footerData.footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-sidebar-foreground mb-4">
                  {getText(section.title)}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="text-sidebar-foreground/70 hover:text-primary transition-colors text-sm"
                        data-testid={`link-footer-${link.href.slice(1)}`}
                      >
                        {formatAmpersand(getText(link.label))}
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
            {footerData.contactItems.map((item, index) => {
              const IconComponent = iconComponents[item.icon as keyof typeof iconComponents];
              return (
                <div key={index} className="flex items-start gap-3">
                  <IconComponent className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-sidebar-foreground">{getText(item.label)}</p>
                    <p className="text-sm text-sidebar-foreground/70" dangerouslySetInnerHTML={{ __html: getValue(item.value) }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <p className="text-sm text-sidebar-foreground/70">
              {getText(footerData.bottomCopyright)}
            </p>
            
            <span>{getText(footerData.bottomStars)}</span>
            
            {footerData.logos.map((logo, index) => (
              <img 
                key={index}
                src={logo.src} 
                alt={logo.alt}
                className={logo.className}
                data-testid={`logo-${index === 0 ? 'iprefer' : 'preferred-lifestyle'}`}
              />
            ))}
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-sidebar-foreground/70 mr-2">{getText(footerData.bottomSocialText)}</span>
              {footerData.socialLinks.map((social, index) => {
                const IconComponent = socialIconComponents[social.icon as keyof typeof socialIconComponents];
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