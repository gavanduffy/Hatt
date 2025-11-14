# Vercel Deployment Guide

## Quick Verification

Before deploying, you can verify that your repository is ready:

```bash
./verify-deployment.sh
```

This script will check that all required files are in place and that the build works correctly.

## Configuration Required

To deploy this project to Vercel, you need to configure the **Root Directory** setting in your Vercel project because the Next.js application is located in the `frontend` subdirectory.

### Steps to Deploy:

1. **Import/Link your repository to Vercel**
   - Go to https://vercel.com/new
   - Import the Hatt repository from GitHub

2. **Configure Root Directory**
   - In the project configuration screen, look for "Root Directory"
   - Click "Edit" next to Root Directory
   - Set it to: `frontend`
   - Click "Continue"

3. **Framework Preset**
   - Vercel should auto-detect "Next.js" as the framework
   - If not, manually select "Next.js" from the Framework Preset dropdown

4. **Build Settings** (should be auto-configured)
   - Build Command: `npm run build` (or leave blank for auto-detection)
   - Output Directory: Leave blank (Next.js handles this)
   - Install Command: `npm install` (or leave blank for auto-detection)

5. **Deploy**
   - Click "Deploy" and wait for the build to complete

### Environment Variables

No special environment variables are required for basic deployment.

### Troubleshooting

- **404 Error**: Make sure the Root Directory is set to `frontend` in your Vercel project settings
- **Build Failures**: Check that all dependencies are properly listed in `frontend/package.json`
- **Assets Not Loading**: The app loads website configs from the `assets` directory at build time via the parent directory lookup in `lib/websites.ts`

### Alternative: Using Vercel CLI

If you prefer to deploy using the Vercel CLI:

```bash
cd frontend
vercel
```

This will deploy just the frontend directory.

### Why is Root Directory Configuration Required?

The Hatt repository contains both:
- The original Wails/Go desktop application (at the root)
- The new Next.js web application (in the `frontend` subdirectory)

Vercel needs to know which part to deploy, which is why the Root Directory must be explicitly set to `frontend`.

### Common Issues

- **404 Error**: This means the Root Directory is not configured correctly. Double-check that it's set to `frontend` in your Vercel project settings.
- **Build Failures**: Ensure the Root Directory is set to `frontend` before deploying. The build will fail if Vercel tries to build from the repository root.
- **Assets Not Loading**: This is usually resolved once the Root Directory is correctly configured, as the app will be able to properly locate the `../assets` directory during build.
