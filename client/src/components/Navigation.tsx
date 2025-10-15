import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X, ChevronDown, Bed, UtensilsCrossed, Sparkles, Calendar, Camera, Phone } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [location] = useLocation();

  const menuStructure = {
    séjour: {
      label: language === 'fr' ? 'Séjour' : 'Stay',
      icon: <Bed className="w-4 h-4" />,
      items: [
        { href: '/chambres', label: language === 'fr' ? 'Chambres & Suites' : 'Rooms & Suites' },
        { href: '/offres', label: language === 'fr' ? 'Offres Spéciales' : 'Special Offers' },
        { href: '/services-boutiques', label: language === 'fr' ? 'Services & Boutiques' : 'Services & Boutiques' }
      ]
    },
    restauration: {
      label: language === 'fr' ? 'Restauration' : 'Dining',
      icon: <UtensilsCrossed className="w-4 h-4" />,
      items: [
        { href: '/restaurants', label: language === 'fr' ? 'Restaurants' : 'Restaurants' },
        { href: '/restaurants#bars', label: language === 'fr' ? 'Bars' : 'Bars' }
      ]
    },
    bienetre: {
      label: language === 'fr' ? 'Bien-être' : 'Wellness',
      icon: <Sparkles className="w-4 h-4" />,
      items: [
        { href: '/bien-etre-loisirs', label: language === 'fr' ? 'Spa & Détente' : 'Spa & Relaxation' },
        { href: '/bien-etre-loisirs#fitness', label: language === 'fr' ? 'Fitness' : 'Fitness' },
        { href: '/bien-etre-loisirs#piscine', label: language === 'fr' ? 'Piscine' : 'Pool' }
      ]
    },
    evenements: {
      label: language === 'fr' ? 'Événements' : 'Events',
      icon: <Calendar className="w-4 h-4" />,
      items: [
        { href: '/evenements', label: language === 'fr' ? 'Réunions' : 'Meetings' },
        { href: '/evenements#mariages', label: language === 'fr' ? 'Mariages' : 'Weddings' },
        { href: '/evenements#prives', label: language === 'fr' ? 'Événements Privés' : 'Private Events' }
      ]
    },
    decouverte: {
      label: language === 'fr' ? 'Découverte' : 'Discovery',
      icon: <Camera className="w-4 h-4" />,
      items: [
        { href: '/galerie', label: language === 'fr' ? 'Galerie' : 'Gallery' },
        { href: '/decouvrir-antananarivo', label: language === 'fr' ? 'Découvrir Antananarivo' : 'Discover Antananarivo' }
      ]
    }
  };

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
    console.log(`Language switched to ${language === 'fr' ? 'en' : 'fr'}`);
  };

  // Close dropdown when clicking outside
  const handleMouseLeave = () => {
    setTimeout(() => setActiveDropdown(null), 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {/* Accueil */}
              <Link
                href="/"
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary hover:bg-primary/5 rounded-lg whitespace-nowrap border border-transparent hover:border-primary/20 ${
                  location === '/' ? 'text-primary bg-primary/10 border-primary/30' : 'text-foreground'
                }`}
                data-testid="link-home"
              >
                {language === 'fr' ? 'Accueil' : 'Home'}
              </Link>

              {/* All Menu Items Horizontally */}
              {Object.entries(menuStructure).map(([key, menu]) => 
                menu.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary hover:bg-primary/5 rounded-lg whitespace-nowrap border border-transparent hover:border-primary/20 ${
                      location === item.href || location.startsWith(item.href + '#') ? 'text-primary bg-primary/10 border-primary/30' : 'text-foreground'
                    }`}
                    data-testid={`link-${item.href.slice(1).replace('#', '-')}`}
                  >
                    {formatAmpersand(item.label)}
                  </Link>
                ))
              )}

              {/* Contact */}
              <Link
                href="/contact"
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary hover:bg-primary/5 rounded-lg whitespace-nowrap border border-transparent hover:border-primary/20 ${
                  location === '/contact' ? 'text-primary bg-primary/10 border-primary/30' : 'text-foreground'
                }`}
                data-testid="link-contact"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-xs font-medium"
              data-testid="button-language-toggle"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language.toUpperCase()}
            </Button>

            <Button
              className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              data-testid="button-reservation"
            >
              {language === 'fr' ? 'Réserver' : 'Book Now'}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {/* Accueil */}
              <Link
                href="/"
                className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                  location === '/' ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setIsOpen(false)}
                data-testid="mobile-link-home"
              >
                {language === 'fr' ? 'Accueil' : 'Home'}
              </Link>
              
              {/* Mobile Menu Categories */}
              {Object.entries(menuStructure).map(([key, menu]) => (
                <div key={key} className="space-y-1">
                  <div className="flex items-center space-x-2 px-3 py-2 text-sm font-semibold text-primary border-b border-border/50">
                    {menu.icon}
                    <span>{menu.label}</span>
                  </div>
                  {menu.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-6 py-2 text-sm font-medium transition-colors hover:text-primary ${
                        location === item.href || location.startsWith(item.href + '#') ? 'text-primary' : 'text-muted-foreground'
                      }`}
                      onClick={() => setIsOpen(false)}
                      data-testid={`mobile-link-${item.href.slice(1).replace('#', '-')}`}
                    >
                      {formatAmpersand(item.label)}
                    </Link>
                  ))}
                </div>
              ))}
              
              {/* Contact */}
              <Link
                href="/contact"
                className={`flex items-center space-x-2 px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                  location === '/contact' ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setIsOpen(false)}
                data-testid="mobile-link-contact"
              >
                <Phone className="w-4 h-4" />
                <span>Contact</span>
              </Link>
              
              <div className="px-3 py-2">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" data-testid="button-mobile-reservation">
                  {language === 'fr' ? 'Réserver' : 'Book Now'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;