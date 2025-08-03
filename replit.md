# Voodoo808 Beat Video Creator - Replit.md

## Overview

This is a professional marketing landing page for Voodoo808, designed to showcase the desktop application for creating beat videos. The landing page features a modern React frontend with a dark glassmorphism theme, an Express.js backend for serving static content, and a fully functional Supabase authentication system with Google OAuth integration. It's focused on marketing and branding with secure user account management, ready for deployment to app.voodoo808.com.

## User Preferences

Preferred communication style: Simple, everyday language.
Project focus: Professional marketing landing page for Voodoo808 brand with Supabase authentication and Google OAuth integration - ready for app.voodoo808.com deployment.

## System Architecture

### Frontend Architecture
- **Framework**: React 19 with TypeScript using functional components and modern hooks
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: TailwindCSS with custom dark theme configuration and shadcn/ui components
- **Animations**: Framer Motion for smooth UI transitions and effects
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives via shadcn/ui component library

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL session store with connect-pg-simple

### Build System
- **Development**: Vite dev server with HMR (Hot Module Replacement)
- **Production**: Vite build for frontend, esbuild for backend bundling
- **TypeScript**: Strict mode enabled with path mapping for clean imports

## Key Components

### Frontend Structure
- **App Component**: Main application wrapper with routing and providers
- **Pages**: Home page with landing sections, 404 page
- **Components**: Modular UI components including navigation, hero, features, pricing sections
- **UI Library**: Complete shadcn/ui component set for consistent design
- **Hooks**: Custom hooks for mobile detection and toast notifications

### Backend Structure
- **Server**: Express.js with middleware for JSON parsing and request logging
- **Routes**: Modular route registration system (currently minimal implementation)
- **Storage**: Abstracted storage interface with in-memory implementation (ready for database)
- **Development**: Vite integration for serving frontend in development

### Authentication System
- **Provider**: Supabase Authentication with email/password sign up and sign in
- **Client Library**: @supabase/supabase-js for authentication operations
- **State Management**: React Context API with useAuth hook for global auth state
- **UI Components**: Modal-based authentication forms with proper validation
- **Features**: Sign up, sign in, forgot password, email verification
- **Status**: Fully functional with environment variables configured
- **Recent Update**: Authentication system verified working with successful account creation and email verification

### Database Schema
- **Authentication**: Managed by Supabase (user management, sessions, email confirmation)
- **Local Storage**: In-memory storage interface ready for expansion
- **Validation**: Zod schemas for form validation and type safety

## Data Flow

1. **Client Requests**: Frontend makes API calls through TanStack Query
2. **Server Processing**: Express.js handles requests with error middleware
3. **Database Operations**: Drizzle ORM provides type-safe database interactions
4. **Response Handling**: Structured JSON responses with proper error handling
5. **State Management**: React Query manages server state with caching and synchronization

## External Dependencies

### Core Dependencies
- **Authentication**: Supabase for user authentication and management
- **UI Framework**: Radix UI primitives for accessible components
- **Styling**: TailwindCSS for utility-first styling
- **Animations**: Framer Motion for smooth animations
- **Forms**: React Hook Form with Hookform/resolvers for validation
- **Date Handling**: date-fns for date manipulation

### Development Tools
- **Build Tools**: Vite, esbuild, TypeScript compiler
- **Database Tools**: Drizzle Kit for migrations and schema management
- **Linting/Formatting**: PostCSS with Autoprefixer for CSS processing

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR on client directory
- **Backend**: tsx for TypeScript execution with hot reload (development only)
- **Environment**: NODE_ENV=development with debug logging

### Production Deployment (Vercel)
- **Live URL**: https://typebeatz.vercel.app/
- **Platform**: Vercel static hosting
- **Build Process**: `vite build` creates optimized static files in `dist/public`
- **Configuration**: `vercel.json` handles routing and build settings
- **Deployment**: Automatic via GitHub integration

### Configuration Management
- **Environment Variables**: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for authentication
- **TypeScript Paths**: Aliased imports for clean code organization
- **Asset Handling**: Public assets served through Vite in development, Express in production

### Recent Changes (January 2025)
- **Project Migration**: Successfully migrated from Replit Agent to Replit environment
- **Authentication System Enhanced**: Full Supabase integration with Google OAuth as primary option
- **Google OAuth Integration**: Added seamless Google authentication with professional UI
- **Environment Variables Configured**: Proper Supabase credentials set up and working
- **User Interface**: Enhanced authentication modal with Google OAuth, email/password, and forgot password options
- **Email/Password Backup**: Email authentication remains available as secondary option
- **Migration Completed (Jan 2025)**: Full migration to Replit environment completed with working authentication

### Architectural Decisions

**Frontend Framework Choice**: React with TypeScript provides type safety and component reusability. Vite offers fast development experience with optimized production builds.

**Backend Framework**: Express.js chosen for simplicity and ecosystem maturity. TypeScript adds type safety to the backend code.

**Database Strategy**: PostgreSQL with Drizzle ORM provides type-safe database operations. Neon Database offers serverless scaling capabilities.

**Styling Approach**: TailwindCSS with shadcn/ui provides consistent design system with customizable components. Dark theme optimized for the target audience.

**State Management**: TanStack React Query handles server state efficiently with caching, background updates, and error handling. No client-side global state library needed currently.

The architecture is designed to be scalable and maintainable, with clear separation of concerns between frontend and backend. The type-safe approach throughout the stack reduces runtime errors and improves developer experience.