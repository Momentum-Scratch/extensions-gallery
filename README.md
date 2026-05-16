# TurboWarp Extension Library

A beautiful, modern React + TypeScript application for browsing TurboWarp extensions.

## Features

- **90+ Extensions** - Complete database of all TurboWarp extensions
- **Dark/Light Theme** - Inspired by the 1min Relay design with elegant dark mode
- **Category Filtering** - Filter by Graphics, Network, Utilities, Input, Media, Data, Game, System
- **Real-time Search** - Instant search across names, descriptions, authors, and tags
- **Copy URLs** - One-click copy extension URLs to clipboard
- **Featured Section** - Highlighted top extensions
- **Responsive Design** - Works on all screen sizes
- **Smooth Animations** - Framer Motion powered transitions

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Framer Motion
- Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Search header with stats
│   ├── Hero.tsx            # Landing hero section
│   ├── CategoryFilter.tsx  # Category filter buttons
│   ├── ExtensionCard.tsx   # Individual extension card
│   ├── ExtensionGrid.tsx   # Grid layout for cards
│   ├── FeaturedSection.tsx # Featured extensions showcase
│   ├── Footer.tsx          # Site footer
│   └── IconMap.tsx         # Lucide icon mapping
├── data/
│   └── extensions.ts       # Extension data
├── types/
│   └── extension.ts        # TypeScript interfaces
├── App.tsx                 # Main app component
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## Design Inspiration

The dark theme design is inspired by the 1min Relay website screenshots:
- Pure black background (#0a0a0a)
- Subtle white borders and glassmorphism effects
- Orange accent colors for TurboWarp branding
- Clean typography with Inter font
- Smooth hover transitions and glow effects
