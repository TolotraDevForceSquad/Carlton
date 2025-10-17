// src/components/Home.tsx
import HeroSection from '@/components/HeroSection';
import ParallaxSection from '@/components/ParallaxSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Clock, MapPin, Utensils, Camera, Calendar, Sparkles } from 'lucide-react';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { homeData as initialHomeData } from '@/data/homeData';
import wellnessImage from '@assets/generated_images/Hotel_infinity_pool_wellness_a9857557.png';
import { useLanguage } from '@/components/context/LanguageContext';
import { Tooltip, ImageTooltip } from '@/components/Tooltip';
import { useState } from 'react';

const Home = () => {
  const { currentLang } = useLanguage();
  const lang = currentLang.code.toLowerCase();
  
  const [data, setData] = useState(initialHomeData);
  
  const { title: rawTitle, content: rawContent, highlights: rawHighlights, cta: rawCta, parallaxImage } = data;
  
  const title = rawTitle[lang];
  const content = rawContent[lang];
  
  const highlights = rawHighlights.map(highlight => ({
    ...highlight,
    title: highlight.title[lang],
    description: highlight.description[lang],
    linkText: highlight.linkText[lang]
  }));
  
  const processedHighlights = highlights.map((highlight, index) => ({
    ...highlight,
    image: highlight.image || wellnessImage // Fallback if needed
  }));
  
  const cta = {
    ...rawCta,
    title: rawCta.title[lang],
    description: rawCta.description[lang],
    primaryButton: rawCta.primaryButton[lang],
    secondaryButton: rawCta.secondaryButton[lang]
  };
  
  const getHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-8 h-8" />;
      case 'Utensils': return <Utensils className="w-8 h-8" />;
      case 'Calendar': return <Calendar className="w-8 h-8" />;
      case 'Camera': return <Camera className="w-8 h-8" />;
      default: return null;
    }
  };

  const updateTitle = (newFr: string, newEn: string) => {
    setData(prev => ({
      ...prev,
      title: { fr: newFr, en: newEn }
    }));
  };

  const updateContent = (newFr: string, newEn: string) => {
    setData(prev => ({
      ...prev,
      content: { fr: newFr, en: newEn }
    }));
  };

  const updateHighlightTitle = (index: number) => (newFr: string, newEn: string) => {
    setData(prev => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => 
        i === index ? { ...h, title: { fr: newFr, en: newEn } } : h
      )
    }));
  };

  const updateHighlightDescription = (index: number) => (newFr: string, newEn: string) => {
    setData(prev => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => 
        i === index ? { ...h, description: { fr: newFr, en: newEn } } : h
      )
    }));
  };

  const updateHighlightLinkText = (index: number) => (newFr: string, newEn: string) => {
    setData(prev => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => 
        i === index ? { ...h, linkText: { fr: newFr, en: newEn } } : h
      )
    }));
  };

  const updateCtaTitle = (newFr: string, newEn: string) => {
    setData(prev => ({
      ...prev,
      cta: { ...prev.cta, title: { fr: newFr, en: newEn } }
    }));
  };

  const updateCtaDescription = (newFr: string, newEn: string) => {
    setData(prev => ({
      ...prev,
      cta: { ...prev.cta, description: { fr: newFr, en: newEn } }
    }));
  };

  const updateCtaPrimaryButton = (newFr: string, newEn: string) => {
    setData(prev => ({
      ...prev,
      cta: { ...prev.cta, primaryButton: { fr: newFr, en: newEn } }
    }));
  };

  const updateCtaSecondaryButton = (newFr: string, newEn: string) => {
    setData(prev => ({
      ...prev,
      cta: { ...prev.cta, secondaryButton: { fr: newFr, en: newEn } }
    }));
  };

  const updateHighlightImage = (index: number) => (newImageUrl: string) => {
    setData(prev => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => 
        i === index ? { ...h, image: newImageUrl } : h
      )
    }));
  };

  const updateParallaxImage = (newImageUrl: string) => {
    setData(prev => ({
      ...prev,
      parallaxImage: newImageUrl
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        
        {/* Présentation de l'hôtel */}
        <section className="py-20 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                <Tooltip 
                  frLabel={data.title.fr} 
                  enLabel={data.title.en} 
                  onSave={updateTitle}
                >
                  {formatAmpersand(title)}
                </Tooltip>
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <div 
                className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed prose prose-lg dark:prose-invert mx-auto"
              >
                <Tooltip 
                  frLabel={data.content.fr} 
                  enLabel={data.content.en} 
                  onSave={updateContent}
                >
                  <span dangerouslySetInnerHTML={{ __html: content }} />
                </Tooltip>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {processedHighlights.map((highlight, index) => (
                <Card key={index} className="overflow-hidden hover-elevate transition-all duration-300">
                  <ImageTooltip imageUrl={data.highlights[index].image || wellnessImage} onSave={updateHighlightImage(index)}>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={highlight.image} 
                        alt={highlight.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-full">
                          <div className="text-primary">
                            {getHighlightIcon(highlight.icon)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ImageTooltip>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-serif text-foreground mb-3">
                      <Tooltip 
                        frLabel={data.highlights[index].title.fr} 
                        enLabel={data.highlights[index].title.en} 
                        onSave={updateHighlightTitle(index)}
                      >
                        {formatAmpersand(highlight.title)}
                      </Tooltip>
                    </CardTitle>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      <Tooltip 
                        frLabel={data.highlights[index].description.fr} 
                        enLabel={data.highlights[index].description.en} 
                        onSave={updateHighlightDescription(index)}
                      >
                        {highlight.description}
                      </Tooltip>
                    </p>
                    <Link href={highlight.link}>
                      <Button variant="outline" className="w-full">
                        <Tooltip 
                          frLabel={data.highlights[index].linkText.fr} 
                          enLabel={data.highlights[index].linkText.en} 
                          onSave={updateHighlightLinkText(index)}
                        >
                          {highlight.linkText}
                        </Tooltip>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section Parallax - Bien-être */}
        <ImageTooltip imageUrl={parallaxImage || wellnessImage} onSave={updateParallaxImage}>
          <ParallaxSection
            backgroundImage={parallaxImage || wellnessImage}
            parallaxSpeed={0.5}
            minHeight="70vh"
            overlay={true}
            overlayOpacity={0.4}
            className="flex items-center"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            </div>
          </ParallaxSection>
        </ImageTooltip>

        {/* Call to Action final */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              <Tooltip 
                frLabel={data.cta.title.fr} 
                enLabel={data.cta.title.en} 
                onSave={updateCtaTitle}
              >
                {cta.title}
              </Tooltip>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              <Tooltip 
                frLabel={data.cta.description.fr} 
                enLabel={data.cta.description.en} 
                onSave={updateCtaDescription}
              >
                {cta.description}
              </Tooltip>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={cta.primaryLink}>
                <Button size="lg" className="w-full sm:w-auto">
                  <Tooltip 
                    frLabel={data.cta.primaryButton.fr} 
                    enLabel={data.cta.primaryButton.en} 
                    onSave={updateCtaPrimaryButton}
                  >
                    {cta.primaryButton}
                  </Tooltip>
                </Button>
              </Link>
              <Link href={cta.secondaryLink}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Tooltip 
                    frLabel={data.cta.secondaryButton.fr} 
                    enLabel={data.cta.secondaryButton.en} 
                    onSave={updateCtaSecondaryButton}
                  >
                    {cta.secondaryButton}
                  </Tooltip>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
