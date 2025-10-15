// src/components/HeroSection.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { heroSectionData } from '@/data/heroSectionData';
import hotelExterior from '@assets/generated_images/Carlton_hotel_exterior_view_8ca3b91a.png';

const HeroSection = () => {
  const [data, setData] = useState(heroSectionData);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.slides.length);
    console.log('Next slide triggered');
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + data.slides.length) % data.slides.length);
    console.log('Previous slide triggered');
  };

  const currentSlideData = data.slides[currentSlide];
  const currentImage = currentSlideData.image || hotelExterior;

  const updateSlideField = (index: number, field: string, newFr: string, newEn: string) => {
    setData(prev => ({
      ...prev,
      slides: prev.slides.map((slide, i) =>
        i === index
          ? { ...slide, [field]: newFr, [`en${field.charAt(0).toUpperCase() + field.slice(1)}`]: newEn }
          : slide
      )
    }));
  };

  const updateGlobalText = (field: string, newFr: string, newEn: string) => {
    setData(prev => ({
      ...prev,
      [field]: newFr,
      [`en${field.charAt(0).toUpperCase() + field.slice(1)}`]: newEn
    }));
  };

  const updateGlobalObjectText = (objField: string, textField: string, newFr: string, newEn: string) => {
    setData(prev => ({
      ...prev,
      [objField]: {
        ...prev[objField],
        [textField]: newFr,
        [`en${textField}`]: newEn
      }
    }));
  };

  const updateImage = (index: number, newUrl: string) => {
    setData(prev => ({
      ...prev,
      slides: prev.slides.map((slide, i) => i === index ? { ...slide, image: newUrl } : slide)
    }));
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Hero Image with Overlay */}
      <div className="absolute inset-0">
        <ImageTooltip
          imageUrl={currentImage}
          onSave={(newUrl) => updateImage(currentSlide, newUrl)}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${currentImage})` }}
          />
        </ImageTooltip>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 mb-8">
              <span className="text-primary text-sm font-medium">{data.badge.stars}</span>
              <Tooltip
                frLabel={data.badge.text}
                enLabel={data.badge.enText}
                onSave={(newFr, newEn) => updateGlobalObjectText('badge', 'text', newFr, newEn)}
              >
                <span className="ml-2 text-primary text-sm">{data.badge.text}</span>
              </Tooltip>
            </div>
          </div>
          
          <Tooltip
            frLabel={currentSlideData.title}
            enLabel={currentSlideData.enTitle}
            onSave={(newFr, newEn) => updateSlideField(currentSlide, 'title', newFr, newEn)}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              {formatAmpersand(currentSlideData.title)}
            </h1>
          </Tooltip>
          
          <Tooltip
            frLabel={currentSlideData.subtitle}
            enLabel={currentSlideData.enSubtitle}
            onSave={(newFr, newEn) => updateSlideField(currentSlide, 'subtitle', newFr, newEn)}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-luxury italic text-accent mb-8">
              {currentSlideData.subtitle}
            </h2>
          </Tooltip>
          
          <Tooltip
            frLabel={currentSlideData.description}
            enLabel={currentSlideData.enDescription}
            onSave={(newFr, newEn) => updateSlideField(currentSlide, 'description', newFr, newEn)}
          >
            <p className="text-base md:text-lg lg:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              {currentSlideData.description}
            </p>
          </Tooltip>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg font-medium"
              data-testid="button-book-suite"
            >
              <Tooltip
                frLabel={data.buttons.primary}
                enLabel={data.buttons.enPrimary}
                onSave={(newFr, newEn) => updateGlobalObjectText('buttons', 'primary', newFr, newEn)}
              >
                <span>{data.buttons.primary}</span>
              </Tooltip>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg font-medium bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              data-testid="button-discover-hotel"
            >
              <Play className="w-5 h-5 mr-2" />
              <Tooltip
                frLabel={data.buttons.secondary}
                enLabel={data.buttons.enSecondary}
                onSave={(newFr, newEn) => updateGlobalObjectText('buttons', 'secondary', newFr, newEn)}
              >
                <span>{data.buttons.secondary}</span>
              </Tooltip>
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
        {data.slides.map((_, index) => (
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
        <Tooltip
          frLabel={data.scroll}
          enLabel={data.enScroll}
          onSave={(newFr, newEn) => updateGlobalText('scroll', newFr, newEn)}
        >
          <div className="text-xs mb-2">{data.scroll}</div>
        </Tooltip>
        <div className="w-0.5 h-8 bg-white/50 mx-auto"></div>
      </div>
    </div>
  );
};

export default HeroSection;