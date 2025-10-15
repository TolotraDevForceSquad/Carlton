# Carlton Madagascar Hotel Website

## Overview

Carlton Madagascar is a luxury 5-star hotel website built with React and TypeScript. The project creates an elegant digital presence for Carlton Madagascar Hotel in Antananarivo, showcasing rooms, restaurants, leisure facilities, and events. The website emphasizes luxury hospitality with a sophisticated dark theme inspired by Ritz Paris aesthetics, featuring bilingual support (French/English) and comprehensive hotel information sections.

**✅ CMS Integration Complete**: The website now uses an integrated local CMS admin system with PostgreSQL database for all content management. The external CMS API has been replaced with a local database-backed system accessible at /admin.

## User Preferences

Preferred communication style: Simple, everyday language.

## CMS Admin System

### Admin Access
- **Admin URL**: /admin
- **Login URL**: /admin/login
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin123`

### Features
- **Pages Management**: Full CRUD operations for website pages with structured content support
  - **Basic Info**: Title, slug, content, meta description, publish status
  - **Hero Section**: Hero title, subtitle, and image for page headers
  - **Structured Sections**: Repeatable content sections with different types:
    - **Room sections**: name, subtitle, description, image, size, guests, features[], amenities[]
    - **Restaurant sections**: name, type, description, image, rating, price range, hours, capacity, dress code, specialties[], features[]
    - **Highlight sections**: name, icon, description, link, image
    - **Event sections**: name, subtitle, description, image, capacity, surface, equipment[], features[]
- **Menus Management**: Navigation menu management (name, link, position)
- **Images Management**: Image library with URL, filename, alt text, and metadata

### API Endpoints
- **Public Routes** (no auth required):
  - GET /api/cms/pages/:slug - Get page by slug
  - GET /api/cms/menus - Get all menus
  - GET /api/cms/images - Get all images
  
- **Admin Routes** (auth required):
  - GET/POST /api/admin/pages - List/Create pages
  - GET/PATCH/DELETE /api/admin/pages/:id - Get/Update/Delete page
  - Similar routes for menus and images

### Authentication
- Bearer token authentication for all admin routes
- Token stored in localStorage
- Auto-redirect to login if not authenticated or token invalid
- Logout clears token and redirects to login

### Security Considerations
⚠️ **Current Implementation** (Development/Demo):
- Passwords stored in plaintext (not hashed)
- Static shared bearer token across all sessions
- No server-side token revocation on logout

⚠️ **Production Requirements**:
For production use, the following security improvements are essential:
1. Implement password hashing (bcrypt/argon2)
2. Use JWT with expiration or database-backed sessions
3. Implement proper token revocation on logout
4. Add rate limiting on login attempts
5. Use HTTPS in production
6. Consider adding 2FA for admin users

### Database Schema
The CMS uses PostgreSQL with the following tables:
- `cms_pages`: Website page content with hero fields (hero_title, hero_subtitle, hero_image) and sections (JSONB array)
- `cms_menus`: Navigation menus
- `cms_images`: Image library
- `admin_users`: Admin user accounts

### Frontend Integration
- **Chambres Page**: Fully integrated with CMS
  - Hero section displays heroTitle, heroSubtitle, heroImage from CMS
  - Room cards generated from sections array (type: "room")
  - Fallback to static content if CMS data unavailable
  - All optional fields safely handled (subtitle, size, guests, features, amenities)
  - formatAmpersand utility handles undefined/null values
- **Pattern for Other Pages**: Same integration approach can be replicated for Restaurants, Events, etc.

### Recent Improvements (October 2025)
- **Critical Bug Fix**: SectionsEditor now displays ALL type-specific fields when creating new sections (not just name/description/image)
  - Room sections: subtitle, size, guests, features[], amenities[] fields now visible and functional in new section form
  - Previous issue: Type-specific fields only appeared when editing existing sections
  - Solution: Duplicated conditional field rendering for both edit modes (new and existing)
- **UX Enhancement**: Section save buttons now show clear text labels ("Ajouter"/"Valider") instead of icon-only
- **Field Safety**: All optional fields properly guarded with conditional checks to prevent undefined/null rendering errors
- **End-to-End Validation**: Comprehensive e2e tests confirm all fields persist correctly from admin form → database → public page display

### Initial Data
The database is populated with:
- 6 pages: accueil, chambres, restaurants, evenements, bien-etre-loisirs, contact
- Chambres page has 2 room sections migrated from static content
- 6 menus matching the main navigation
- 3 sample images for demonstration

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing with pages for Home, Rooms, Restaurants, Leisure, Events, Special Offers, and Contact
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessibility and consistent design
- **Styling**: Tailwind CSS with custom design system implementing luxury hotel aesthetics using dark color palette (deep charcoal, rich black, warm gold accents)
- **State Management**: TanStack Query for server state management and React hooks for local state
- **Forms**: React Hook Form with Zod validation for contact forms and user interactions

### Backend Architecture
- **Server**: Express.js with TypeScript providing RESTful API structure
- **Development**: Vite dev server with HMR and custom middleware setup
- **Storage Interface**: Modular storage system with in-memory implementation (MemStorage) that can be extended to database implementations
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

### Design System
- **Typography**: Playfair Display for headings (luxury serif), Inter for body text (clean sans-serif), Cormorant Garamond for accent elements
- **Color Scheme**: Dark luxury theme with deep charcoal backgrounds, warm gold accents, and ivory text following Carlton Madagascar brand guidelines
- **Components**: Reusable React components for hero sections, room showcases, restaurant displays, spa/leisure facilities, contact forms, and navigation
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints ensuring optimal viewing across all devices

### Data Layer
- **Database Schema**: Drizzle ORM with PostgreSQL integration configured for user management and future content management
- **Type Safety**: Shared TypeScript schemas between frontend and backend using Zod for validation
- **API Structure**: RESTful endpoints with proper error handling and response formatting

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, TanStack Query for efficient data fetching and caching
- **TypeScript**: Full TypeScript setup with strict configuration for type safety across the entire application
- **Build Tools**: Vite for fast development and optimized production builds, ESBuild for server bundling

### UI and Styling
- **Shadcn/ui**: Complete component library built on Radix UI primitives providing accessible, customizable components
- **Tailwind CSS**: Utility-first CSS framework with custom configuration for the luxury hotel design system
- **Google Fonts**: Playfair Display, Inter, and Cormorant Garamond for typography hierarchy

### Database and ORM
- **Drizzle ORM**: Type-safe ORM for PostgreSQL with migration support and schema generation
- **Neon Database**: Serverless PostgreSQL database for production deployment
- **Connection Pool**: PostgreSQL connection management for optimal performance

### Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders and easy validation integration
- **Zod**: TypeScript-first schema declaration and validation library ensuring data integrity

### Development and Deployment
- **Replit Integration**: Custom Vite plugins for Replit development environment with cartographer and runtime error overlay
- **Session Management**: Connect-pg-simple for PostgreSQL session storage when authentication is implemented
- **Asset Management**: Custom asset resolution and optimization for hotel images and media content