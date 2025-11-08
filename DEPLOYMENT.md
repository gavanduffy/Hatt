# Deploying Hatt to Vercel

This guide explains how to deploy Hatt as a web application on Vercel with PWA functionality.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository connected to Vercel

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will automatically detect the `vercel.json` configuration
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project directory
cd /path/to/Hatt

# Deploy
vercel

# For production deployment
vercel --prod
```

## Configuration

The project is configured through `vercel.json`:

- **Frontend**: Built from `frontend/` directory using Quasar (Vue 3)
- **API**: Serverless functions from `api/` directory using Express
- **Build Command**: Automatically builds both frontend and API

## Environment Variables (Optional)

You can set environment variables in the Vercel dashboard or via `.env`:

```bash
# API configuration (if needed for external services)
# Add any required environment variables here
```

## PWA Features

The app includes Progressive Web App functionality:

- **Offline Support**: Service worker caches assets for offline use
- **Install on Mobile**: Can be installed as an app on mobile devices
- **Responsive Design**: Optimized for both desktop and mobile browsers

### Installing as PWA on Mobile

1. Open the deployed URL in your mobile browser
2. Tap the browser menu
3. Select "Add to Home Screen" or "Install App"
4. The app will appear as a standalone application

## Post-Deployment

After deployment:

1. Test the search functionality with various sources
2. Verify PWA installation on mobile devices
3. Check browser console for any errors

## Troubleshooting

### Build Failures

- Ensure all dependencies are listed in `package.json`
- Check build logs in Vercel dashboard
- Verify Node.js version compatibility

### API Errors

- Check API logs in Vercel dashboard
- Verify website config files are included
- Test individual endpoints using the health check: `/api/health`

### CORS Issues

- CORS is configured in the API to allow all origins
- For production, consider restricting to your domain only

## Updating the Deployment

Simply push changes to your Git repository, and Vercel will automatically redeploy.

## Local Development

```bash
# Install dependencies
cd frontend && npm install
cd ../api && npm install

# Run frontend dev server
cd frontend
npm run dev

# Run API server (in separate terminal)
cd api
node index.js
```

## Support

For issues specific to Hatt deployment, open an issue on the GitHub repository.
For Vercel-specific issues, consult the [Vercel documentation](https://vercel.com/docs).
