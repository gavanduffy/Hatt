# Web Version - Hatt on Vercel

## Overview

Hatt has been modernized as a Progressive Web App (PWA) that can be deployed to Vercel and used directly in web browsers, including mobile phone browsers.

## Key Features

- **Modern Web App**: Built with Vue 3 and Quasar Framework
- **PWA Support**: Install on mobile devices as a standalone app
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Serverless Backend**: Node.js API backend running on Vercel
- **No Installation Required**: Access directly through a web browser
- **Offline Support**: Service worker enables offline functionality

## Changes from Desktop Version

### What Works
- ✅ Search across 89+ websites simultaneously
- ✅ Category-based filtering
- ✅ Modern, responsive UI
- ✅ Dark mode support
- ✅ PWA installation on mobile devices
- ✅ Parallel search execution
- ✅ Results filtering and sorting

### Differences
- ⚠️ **Settings Storage**: Settings are stored in browser localStorage instead of filesystem
- ⚠️ **Custom Lists**: Stored locally in browser
- ⚠️ **Website Logins**: Simplified for web environment
- ⚠️ **Auto-updates**: Not applicable (web apps auto-update on refresh)
- ⚠️ **Specific Scrapers**: Some advanced scrapers may have limited functionality

### Not Included (Yet)
- ❌ Desktop-specific features (window management, etc.)
- ❌ File system access
- ❌ Some Go-specific scrapers (being migrated to JavaScript)

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy to Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## Development

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Setup

```bash
# Install frontend dependencies
cd frontend
npm install

# Install API dependencies
cd ../api
npm install
```

### Running Locally

**Frontend Development Server:**
```bash
cd frontend
npm run dev
```

**API Server (in separate terminal):**
```bash
cd api
node index.js
```

### Building

**Build SPA:**
```bash
cd frontend
npm run build
```

**Build PWA:**
```bash
cd frontend
npx quasar build -m pwa
```

## PWA Installation

### On Mobile Devices

1. Open the deployed URL in your mobile browser (Chrome/Safari)
2. Tap the browser menu (three dots)
3. Select "Add to Home Screen" or "Install App"
4. The app will appear as a standalone application

### On Desktop

Modern browsers (Chrome, Edge, Safari) will show an install button in the address bar when visiting the site.

## Architecture

### Frontend
- **Framework**: Vue 3 with Composition API
- **UI Library**: Quasar Framework
- **Build Tool**: Vite
- **State Management**: localStorage + Vuex/Pinia (optional)
- **Routing**: Vue Router (hash mode for compatibility)

### Backend
- **Runtime**: Node.js 20.x on Vercel Serverless Functions
- **Framework**: Express.js
- **Scraping**: Axios + Cheerio (equivalent to Colly in Go)
- **Storage**: Website configs from JSON files

### API Endpoints

- `GET /api/health` - Health check
- `POST /api/websites/by-categories` - Get websites by category
- `GET /api/websites/with-login` - Get websites requiring login
- `POST /api/search` - Search across selected websites

## Browser Support

- Chrome/Edge 87+
- Firefox 78+
- Safari 13.1+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Parallel search execution
- Service worker caching for offline support
- Optimized bundle size with code splitting
- CDN delivery via Vercel Edge Network

## Privacy & Security

- No data collection
- Client-side settings storage (localStorage)
- HTTPS enforced on Vercel
- Security headers configured
- CORS properly configured for API access

## Limitations

### CORS
Some websites may block requests from browser origins. The backend API acts as a proxy to mitigate this.

### Rate Limiting
Some websites may implement rate limiting. The app respects this and handles errors gracefully.

### JavaScript Rendering
Websites requiring JavaScript rendering for content are not fully supported yet (migration in progress).

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Support

- **GitHub Issues**: Report bugs or request features
- **Discord**: Join the community (link in main README)
- **Reddit**: r/Hatt

## License

Same as the main Hatt project. See [LICENSE](./LICENSE).

## Acknowledgments

- Original Hatt desktop version by FrenchGithubUser
- Wails framework for the original architecture
- Quasar Framework for the modern UI
- Vercel for serverless hosting
