# Quick Start Guide - Hatt Web Version

Get Hatt running on Vercel in under 5 minutes!

## Prerequisites

- GitHub account
- Vercel account (sign up free at [vercel.com](https://vercel.com))

## Step-by-Step Deployment

### Method 1: One-Click Deploy (Easiest)

1. Fork this repository to your GitHub account
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your forked repository
4. Vercel will automatically detect the configuration
5. Click "Deploy"
6. Wait 2-3 minutes for the build to complete
7. Your Hatt instance is live! 🎉

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Clone the repository
git clone https://github.com/YOUR-USERNAME/Hatt.git
cd Hatt

# Deploy
vercel

# For production
vercel --prod
```

## Using Your Deployed App

### On Desktop
1. Open the URL provided by Vercel
2. Start searching immediately!

### On Mobile
1. Open the URL in your mobile browser (Chrome/Safari)
2. Tap the browser menu (⋮ or share icon)
3. Select "Add to Home Screen" or "Install App"
4. Use it like a native app!

## First Search

1. **Select Categories**: Choose categories like "movies", "tv_shows", "ebooks", etc.
2. **Enter Search Term**: Type what you're looking for
3. **Click Search**: Wait a few seconds as sources are scraped
4. **View Results**: Browse through results from multiple sources

## Features to Explore

- **Dark Mode**: Toggle in settings
- **Multiple Languages**: Change in settings
- **Custom Lists**: Create your own source lists (Settings → Custom Lists)
- **Filtering**: Filter results by name, size, quality, etc.
- **Sorting**: Sort by relevance, date, size, etc.

## Tips

- Results appear as sources complete (parallel searching)
- Bookmark the URL for quick access
- Install as PWA for offline support
- Settings are saved in your browser

## Troubleshooting

### Build Fails
- Check the Vercel build logs
- Ensure Node.js version is 18+ or 20+
- Verify all dependencies are installed

### No Results
- Check if the source websites are accessible
- Some sources may require VPN in certain regions
- Try different search terms

### API Errors
- Check browser console for errors
- Verify the API endpoint is accessible at `/api/health`
- Check Vercel function logs

## Updating Your Deployment

Vercel automatically redeploys when you push to your repository:

```bash
git pull origin main  # Get latest changes
git push               # Auto-redeploy on Vercel
```

## Support

- **Documentation**: See [WEB_VERSION.md](./WEB_VERSION.md)
- **Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Issues**: Open a GitHub issue
- **Community**: Join Discord or Reddit (links in README)

## What's Next?

- Customize the theme in settings
- Create custom source lists for specific needs
- Share your instance with friends
- Contribute back to the project!

---

**Need Help?** Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions or open an issue on GitHub.
