import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage?: string;
  parallaxSpeed?: number;
  minHeight?: string;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  fadeContent?: boolean;
  contentDelay?: number;
}

const ParallaxSection = ({
  children,
  backgroundImage,
  parallaxSpeed = 0.5,
  minHeight = '60vh',
  className = '',
  overlay = true,
  overlayOpacity = 0.4,
  fadeContent = true,
  contentDelay = 0.2
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);

    // Check for mobile device
    setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    let observer: IntersectionObserver;
    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current || !isVisible) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate offset based on element position for better performance
      const elementCenter = rect.top + rect.height / 2;
      const scrollProgress = (windowHeight - elementCenter) / (windowHeight + rect.height);
      const clampedProgress = Math.max(-1, Math.min(1, scrollProgress));
      const newOffset = clampedProgress * 100 * parallaxSpeed;
      
      setOffset(newOffset);
    };

    const scrollListener = () => {
      if (!ticking && isVisible) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set up intersection observer for performance
    observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          handleScroll(); // Initial calculation when visible
        }
      },
      {
        rootMargin: '50px',
        threshold: 0
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('scroll', scrollListener, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', handleScroll);
    };
  }, [parallaxSpeed, isVisible, prefersReducedMotion, isMobile]);

  const shouldAnimate = !prefersReducedMotion && !isMobile;

  return (
    <div 
      ref={sectionRef}
      className={cn('relative overflow-hidden', className)}
      style={{ minHeight }}
    >
      {/* Background layer */}
      {backgroundImage && (
        <div
          ref={backgroundRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            willChange: shouldAnimate ? 'transform' : 'auto',
            transform: shouldAnimate ? `translate3d(0, ${offset}px, 0)` : 'none',
            scale: shouldAnimate ? '1.1' : '1'
          }}
        />
      )}
      
      {/* Overlay layer */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Content layer */}
      <div 
        className="relative z-10 w-full h-full"
        style={{
          opacity: fadeContent && shouldAnimate ? (isVisible ? 1 : 0) : 1,
          transform: fadeContent && shouldAnimate ? `translateY(${isVisible ? 0 : 20}px)` : 'none',
          transition: fadeContent && shouldAnimate ? `opacity 0.6s ease-out ${contentDelay}s, transform 0.6s ease-out ${contentDelay}s` : 'none'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;