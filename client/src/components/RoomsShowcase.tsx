// src/components/RoomsShowcase.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, Car, Coffee, Utensils, Bath, Bed, Users, ArrowRight } from 'lucide-react';
import { formatAmpersand } from '@/lib/utils/formatAmpersand';
import { roomsShowcaseData } from '@/data/roomsShowcaseData';
import suiteImage from '@assets/generated_images/Luxury_suite_interior_386342fd.png';

const RoomsShowcase = () => {
  const { title, description, rooms, commonAmenities, ctaTitle, ctaDescription, ctaButtons, bookButton, detailsButton } = roomsShowcaseData;

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi': return <Wifi className="w-8 h-8" />;
      case 'Car': return <Car className="w-8 h-8" />;
      case 'Coffee': return <Coffee className="w-8 h-8" />;
      case 'Utensils': return <Utensils className="w-8 h-8" />;
      case 'Bath': return <Bath className="w-8 h-8" />;
      case 'Bed': return <Bed className="w-8 h-8" />;
      default: return null;
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            {formatAmpersand(title)}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Common Amenities */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {commonAmenities.map((amenity, index) => (
            <div key={index} className="flex flex-col items-center p-4 bg-card rounded-lg border border-card-border hover-elevate">
              {getAmenityIcon(amenity.icon)}
              <span className="text-sm text-card-foreground text-center">{amenity.label}</span>
            </div>
          ))}
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden hover-elevate transition-all duration-300" data-testid={`card-room-${room.id}`}>
              <div className="relative">
                <img 
                  src={room.image || suiteImage} 
                  alt={room.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-serif text-card-foreground">
                  {formatAmpersand(room.name)}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 border border-current rounded" />
                    <span>{room.size}m²</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{room.guests} personnes</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-card-foreground leading-relaxed">
                  {room.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button className="flex-1" data-testid={`button-book-${room.id}`}>
                    {bookButton}
                  </Button>
                  <Button variant="outline" className="flex-1" data-testid={`button-details-${room.id}`}>
                    {detailsButton}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-card rounded-lg p-8 border border-card-border">
          <h3 className="text-2xl font-serif font-bold text-card-foreground mb-4">
            {ctaTitle}
          </h3>
          <p className="text-muted-foreground mb-6">
            {ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" data-testid="button-contact-concierge">
              {ctaButtons.contact}
            </Button>
            <Button variant="outline" size="lg" data-testid="button-view-all-rooms">
              {ctaButtons.viewAll}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomsShowcase;