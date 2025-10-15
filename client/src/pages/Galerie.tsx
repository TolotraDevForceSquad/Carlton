import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera, Eye, Download, Share2, Heart, Filter } from 'lucide-react';
import Footer from '@/components/Footer';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { galeriePageData } from '@/data/galerieData';

const Galerie = () => {
  const pageData = galeriePageData;
  const { galleries, categories, virtualTour, hero } = pageData;

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            {hero.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {hero.description}
          </p>
          
          {/* Filter Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="cursor-pointer hover-elevate"
                data-testid={`filter-${category.toLowerCase()}`}
              >
                <Filter className="w-3 h-3 mr-1" />
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Sections */}
      {galleries.map((gallery, galleryIndex) => (
        <section key={galleryIndex} className={galleryIndex % 2 === 1 ? "py-16 bg-card/20" : "py-16"}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4" data-testid={`title-gallery-${galleryIndex}`}>
                {formatAmpersand(gallery.title)}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid={`description-gallery-${galleryIndex}`}>
                {gallery.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gallery.images.map((image, imageIndex) => (
                <Card key={imageIndex} className="group hover-elevate overflow-hidden transition-all duration-300" data-testid={`card-image-${galleryIndex}-${imageIndex}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      data-testid={`image-${galleryIndex}-${imageIndex}`}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        <Button size="sm" variant="secondary" className="rounded-full" data-testid={`button-view-${galleryIndex}-${imageIndex}`}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="rounded-full" data-testid={`button-like-${galleryIndex}-${imageIndex}`}>
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="rounded-full" data-testid={`button-share-${galleryIndex}-${imageIndex}`}>
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" data-testid={`badge-category-${galleryIndex}-${imageIndex}`}>
                        {image.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2" data-testid={`title-image-${galleryIndex}-${imageIndex}`}>
                      {image.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Camera className="w-3 h-3 mr-1" />
                        <span>Carlton Madagascar</span>
                      </div>
                      <Button size="sm" variant="ghost" data-testid={`button-download-${galleryIndex}-${imageIndex}`}>
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Virtual Tour Section */}
      <section className="py-16 bg-gradient-to-b from-card/20 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
            {virtualTour.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {virtualTour.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {virtualTour.items.map((item, index) => (
              <Card key={index} className="group hover-elevate cursor-pointer transition-all duration-300" data-testid={`card-virtual-tour-${index}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto mb-4 flex items-center justify-center">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button size="lg" data-testid="button-full-virtual-tour">
            <Camera className="w-5 h-5 mr-2" />
            {virtualTour.buttonText}
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Galerie;