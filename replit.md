# Overview

BoringBiz.ai is a competitive intelligence and lead generation platform for service-based businesses. The application analyzes competitor websites to extract SEO insights, identify "StepLock" keywords (emergency, service, local, and problem-related terms), and generate actionable intelligence for businesses looking to compete in local service markets. The platform provides a dashboard interface for URL auditing, competitor tracking, and lead flow analysis.

## Recent Changes (August 14, 2025)

### Firebase Integration Setup
- Added Firebase project structure with Cloud Functions support
- Created Firebase configuration for project ID: boringbizaiv2
- Set up Firestore rules and Storage rules for demo/development access
- Created Firebase Functions with StepLock analysis and third-party integrations (Notion/Airtable)
- Configured GitHub Actions CI pipeline for automated builds and deployments

### Architecture Updates
- Maintained React/Express hybrid architecture alongside Firebase Functions setup
- Fixed TypeScript compatibility issues in storage layer and navigation components
- Enhanced error handling in URL audit functionality
- Updated sidebar navigation to use proper Link components without nested anchor tags

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side application is built with React and TypeScript, using a modern component-based architecture:

- **UI Framework**: React with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **Charts**: Chart.js for data visualization
- **Build Tool**: Vite for fast development and optimized production builds

The application follows a modular structure with components organized by feature (dashboard, charts, layout) and shared UI components from shadcn/ui.

## Backend Architecture

The server uses Express.js with TypeScript in a RESTful API pattern:

- **Framework**: Express.js with TypeScript
- **Architecture Pattern**: REST API with route-based organization
- **Data Storage**: In-memory storage with interface abstraction for future database migration
- **Web Scraping**: Cheerio for HTML parsing and content extraction
- **API Client**: Axios for external HTTP requests

The server implements a storage abstraction layer (`IStorage` interface) that currently uses in-memory storage but can be easily swapped for database implementations.

## Data Storage Solutions

**Current Implementation**: In-memory storage using JavaScript Maps
- Users stored by ID with username/password authentication
- Audits tracked with comprehensive website analysis data
- Competitors maintained with scoring and analysis timestamps

**Database Schema Ready**: Drizzle ORM configuration points to PostgreSQL with tables defined for:
- Users (authentication and profile data)
- Audits (URL analysis results and StepLock keyword data)
- Competitors (competitor tracking and scoring)

The schema includes rich data types like JSONB for storing keyword arrays and flexible metadata.

## Core Features

**StepLock Keyword Analysis**: Proprietary algorithm that categorizes website content into four key areas:
- Emergency keywords (24/7, urgent, immediate response terms)
- Service keywords (repair, maintenance, installation terms)
- Local keywords (location-based and proximity terms)  
- Problem keywords (troubleshooting and issue-related terms)

**Website Auditing**: Comprehensive analysis including:
- Technical metrics (word count, image count, script analysis)
- SEO elements (title, description, H1 tags)
- Link analysis and WebP image detection
- Content categorization using StepLock methodology

**Dashboard Analytics**: Visual representations of:
- Lead flow trends over time
- Market pulse distribution across keyword categories
- Competitor performance scoring
- Recent audit activity and system updates

# External Dependencies

## Core Dependencies

- **@neondatabase/serverless**: Database driver for Neon PostgreSQL (configured but not actively used)
- **drizzle-orm & drizzle-kit**: Database ORM and migration tools
- **@tanstack/react-query**: Server state management and caching
- **axios**: HTTP client for API requests and web scraping
- **cheerio**: Server-side HTML parsing for website analysis

## UI and Styling

- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority & clsx**: Dynamic className generation
- **chart.js**: Data visualization library

## Development Tools

- **vite**: Build tool and development server
- **tsx**: TypeScript execution for Node.js
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Firebase Integration

Firebase configuration is present for potential analytics and additional services:
- Authentication domain and project configuration
- Firestore database connection (currently unused)
- Analytics integration with conditional loading

The application is architected to scale from in-memory storage to full database persistence while maintaining the same API interface through the storage abstraction layer.