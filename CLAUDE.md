# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based multilingual fitness studio website (Zen Fitness Tokyo) built with TypeScript, Vite, and Firebase. The application features a comprehensive admin system for managing blog posts, translations, and user questions with Firebase Firestore as the backend.

## Development Commands

### Main Application
- `npm run dev` - Start development server with Vite
- `npm run build` - TypeScript compilation and production build 
- `npm run lint` - Run ESLint with TypeScript support
- `npm run preview` - Preview production build locally
- `npm run deploy` - Build and deploy to Firebase hosting

### Firebase Functions
- `cd functions && npm run build` - Compile TypeScript functions
- `cd functions && npm run serve` - Start Firebase emulators
- `cd functions && npm run deploy` - Deploy functions to Firebase

### Firebase Deployment
- `firebase deploy --only hosting` - Deploy web app only
- `firebase deploy --only functions` - Deploy functions only  
- `firebase deploy --only firestore:rules` - Deploy Firestore security rules

## Architecture

### Frontend Structure
- **React Router** - Client-side routing with `/admin-login`, `/admin/*` protected routes
- **i18n System** - Three-language support (French, English, Japanese) with dynamic Firestore-backed translations
- **Firebase Integration** - Firestore for data storage, authentication for admin access
- **Component Architecture** - Reusable components in `/components`, page components in `/pages`

### Key Services
- `translationService.ts` - Manages translations between Firestore and local files with merge capabilities
- `authService.ts` - Handles admin authentication 
- `blogService.ts` - Blog post CRUD operations
- `questionService.ts` - User questions management
- `firebaseService.ts` - Firebase configuration and utilities

### Admin Features
- **Blog Management** - Full CRUD with rich text editing at `/admin/blog`
- **Translation Editor** - Live translation management at `/admin/translations`  
- **Questions Dashboard** - User inquiry management at `/admin`
- **Firebase Tools** - Direct Firestore operations at `/admin/firebase`

### Translation System
- Static JSON files in `/src/i18n/locales/` serve as fallbacks
- Live translations stored in Firestore `translations/latest` document
- Admin can edit translations in real-time via `/admin/translations`
- Automatic fallback to static files if Firestore unavailable

### Firebase Structure
- **Collections**: `blog_posts`, `questions`, `translations`, `translations_history`
- **Security**: Firestore rules in `firestore.rules`
- **Storage**: Rules in `storage.rules` for file uploads

## Build Configuration
- **Vite** - Modern build tool with React plugin
- **TypeScript** - Strict mode enabled with path aliases (`@/` → `src/`)
- **Tailwind CSS** - Utility-first styling with PostCSS
- **Bundle Optimization** - Vendor chunking for React libraries

## Development Notes
- Source files are in `dist/src/` (unusual structure - built code in version control)
- Multi-environment support via Firebase projects
- SEO optimized with react-helmet-async and structured data
- Mobile-responsive design with Framer Motion animations