// src/data/heroSectionData.ts
export const heroSectionData = {
  slides: [
    {
      image: "/uploads/Carlton_hotel_exterior_view_8ca3b91a.png",
      title: "Carlton Madagascar",
      subtitle: "L'hôtel 5 étoiles emblématique ancré dans le centre historique d'Antananarivo",
      description: "Vivez une expérience singulière au Carlton Madagascar, membre de Preferred Hotels and Resorts. Niché dans le cœur culturel de la ville avec une vue imprenable sur le Palais de la Reine et le Lac Anosy."
    },
    {
      image: "/uploads/Carlton_hotel_exterior_view_8ca3b91a.png",
      title: "171 Chambres & Suites",
      subtitle: "Vue Imprenable sur la Haute Ville et le Palais de la Reine",
      description: "De nos Executive Rooms aux Presidential Suites, découvrez un hébergement d'exception avec vue sur le patrimoine royal dans un cadre magnifique."
    },
    {
      image: "/uploads/Carlton_hotel_exterior_view_8ca3b91a.png",
      title: "Excellence & Prestige",
      subtitle: "Une Harmonie Parfaite d'Histoire, de Confort et de Prestige",
      description: "En tant que membre certifié de Preferred Hotels and Resorts, nous garantissons les standards les plus élevés pour faire de votre visite un moment mémorable."
    }
  ],
  badge: {
    stars: "★★★★★",
    text: "Hôtel 5 Étoiles"
  },
  buttons: {
    primary: "Réserver une Suite",
    secondary: "Découvrir l'Hôtel"
  },
  scroll: "Découvrir"
};

// src/components/HeroSection.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { heroSectionData } from '@/data/heroSectionData';
import hotelExterior from '@assets/generated_images/Carlton_hotel_exterior_view_8ca3b91a.png';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { slides, badge, buttons, scroll } = heroSectionData;
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    console.log('Next slide triggered');
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    console.log('Previous slide triggered');
  };

  const currentSlideData = slides[currentSlide];

  const processedSlides = slides.map(slide => ({
    ...slide,
    image: slide.image || hotelExterior
  }));

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Hero Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${processedSlides[currentSlide].image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 mb-8">
              <span className="text-primary text-sm font-medium">{badge.stars}</span>
              <span className="ml-2 text-primary text-sm">{badge.text}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            {formatAmpersand(currentSlideData.title)}
          </h1>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl font-luxury italic text-accent mb-8">
            {currentSlideData.subtitle}
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            {currentSlideData.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg font-medium"
              data-testid="button-book-suite"
            >
              {buttons.primary}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg font-medium bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              data-testid="button-discover-hotel"
            >
              <Play className="w-5 h-5 mr-2" />
              {buttons.secondary}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm"
        onClick={prevSlide}
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm"
        onClick={nextSlide}
        data-testid="button-next-slide"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {processedSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-primary' : 'bg-white/30'
            }`}
            onClick={() => {
              setCurrentSlide(index);
              console.log(`Slide ${index} selected`);
            }}
            data-testid={`button-slide-${index}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        <div className="text-xs mb-2">{scroll}</div>
        <div className="w-0.5 h-8 bg-white/50 mx-auto"></div>
      </div>
    </div>
  );
};

export default HeroSection;