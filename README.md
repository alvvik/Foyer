

#  Foyer- Movie Discovery App

## Features

- **Movie Discovery**: Browse and search through a vast collection of movies with detailed information
- **Authentication**: Secure user authentication using Firebase (email/password)
- **Personal Watchlists**: Create and manage custom watchlists
- **Favorites System**: Save favorite movies to your profile
- **User Profiles**: Customize account settings and public profile
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Protected Routes**: Secure access to user-specific features

##  Technologies Used

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **UI Components**: Headless UI, Lucide React icons
- **Backend/Database**: Firebase (Authentication, Firestore)
- **API**: TMDB (The Movie Database)
- **Notifications**: React Toastify
- **State Management**: React Context API (Auth, Movie, Theme contexts)

##  Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

##  Project Structure

- `src/pages/` - Route components (Home, MovieDetail, Favorites, WatchList, Settings, Auth)
- `src/components/` - Reusable UI components with responsive variants
- `src/context/` - React Context providers for global state
- `src/services/` - API services and route protection
- `src/utils/` - Utility functions and helpers

## What I Learned

Building this project helped me master:
- **React Hooks & Patterns**: useState, useEffect, custom hooks, context API
- **State Management**: Managing complex application state with multiple contexts
- **API Integration**: Fetching and handling data from external APIs (TMDB)
- **Authentication**: Implementing Firebase auth with protected routes
- **Responsive Design**: Creating adaptive layouts for different screen sizes
- **Component Architecture**: Building reusable, modular components
- **Modern React**: Using React 19 features and latest ecosystem tools
- **AI Agents**: Using AI to help my code being clearner and modern
##  Live Demo

[Click here](https://foyer.alvv.ovh/)



