# Azure Deployment Guide - Cache Busting

## Problem
The Azure hosted site requires a refresh to show updated content due to browser caching.

## Solutions Implemented

### 1. Enhanced Angular Build Configuration
- **Output Hashing**: `"outputHashing": "all"` ensures all files get unique hashes
- **Production Optimizations**: Enabled build optimizer and optimization for better performance
- **Named Chunks**: Disabled to ensure consistent hashing

### 2. Updated web.config
- **HTML Files**: No caching (always fresh)
- **JS/CSS Files**: Disabled caching for non-hashed files
- **Hashed Files**: Cache until change (they have unique names)
- **HTTP Headers**: Added no-cache headers for HTML

### 3. GitHub CI/CD Pipeline
Your existing GitHub Actions workflow (`.github/workflows/deployAgilitySports.js.yml`) handles:
- Clean build environment on each push
- Fresh npm install
- Production build with `ng build --configuration production`
- Automatic deployment to Azure

## Deployment Process

### Automatic Deployment (Recommended)
1. **Push to main branch**: Triggers the GitHub Actions workflow
2. **Pipeline runs**: 
   - Installs dependencies fresh
   - Runs tests
   - Builds with production configuration
   - Deploys to Azure automatically

### Manual Trigger
- Use GitHub's "Actions" tab to manually trigger the workflow
- Go to your repository → Actions → "Build and Deploy AgilitySports_web" → "Run workflow"

## How It Works

1. **Hash Generation**: Angular generates unique hashes for JS/CSS files (e.g., `main.abc123.js`)
2. **HTML Updates**: The `index.html` references the new hashed files
3. **Browser Behavior**: 
   - HTML is never cached (always fresh)
   - Hashed files are cached (but with new names each build)
   - Non-hashed files are not cached

## Additional Tips

### For Development
- Use `ng serve` for local development
- Use `ng build --watch` for continuous builds

### For Production
- Always use `npm run build:fresh` before deployment
- Verify the build output has new hashes
- Test the deployed site without refresh

### Azure Configuration
- Ensure the `web.config` is deployed with your application
- The rewrite rules handle Angular routing
- Caching rules ensure fresh content delivery

## Troubleshooting

### If content still requires refresh:
1. Check that `web.config` is deployed (should be automatic via GitHub Actions)
2. Verify the GitHub Actions build output has new hashes
3. Clear browser cache completely
4. Check Azure App Service configuration

### Verify Cache Busting:
1. Check the GitHub Actions build logs
2. Look for files with hashes like `main.abc123.js` in the build output
3. Verify the deployed `index.html` references the new hashed files
4. Test the deployed site without refresh

### GitHub Actions Workflow Benefits:
- **Clean Environment**: Each build starts fresh (no cached artifacts)
- **Fresh Dependencies**: `npm install` runs on every build
- **Consistent Builds**: Same environment every time
- **Automatic Deployment**: No manual steps required
