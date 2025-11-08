#!/usr/bin/env bash
#
# Verification script to check if the repository is ready for Vercel deployment
#

set -euo pipefail

echo "🔍 Verifying Hatt deployment readiness..."
echo ""

ERRORS=0
WARNINGS=0

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
  echo "❌ ERROR: frontend directory not found"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ frontend directory exists"
fi

# Check if frontend/package.json exists
if [ ! -f "frontend/package.json" ]; then
  echo "❌ ERROR: frontend/package.json not found"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ frontend/package.json exists"
fi

# Check if frontend/next.config.js exists
if [ ! -f "frontend/next.config.js" ]; then
  echo "❌ ERROR: frontend/next.config.js not found"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ frontend/next.config.js exists"
fi

# Check if assets directory is accessible
if [ ! -d "assets" ]; then
  echo "⚠️  WARNING: assets directory not found - may cause build issues"
  WARNINGS=$((WARNINGS + 1))
else
  echo "✅ assets directory exists"
fi

# Check if assets/website_configs exists
if [ ! -d "assets/website_configs" ]; then
  echo "❌ ERROR: assets/website_configs directory not found - build will fail"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ assets/website_configs directory exists"
  
  # Count website configs
  CONFIG_COUNT=$(find assets/website_configs -name "*.json" | wc -l)
  echo "   Found $CONFIG_COUNT website configuration files"
fi

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
  echo "⚠️  WARNING: vercel.json not found"
  WARNINGS=$((WARNINGS + 1))
else
  echo "✅ vercel.json exists"
fi

# Try to build the frontend
echo ""
echo "🔨 Testing frontend build..."
cd frontend

if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm ci >/dev/null 2>&1
fi

if npm run build >/dev/null 2>&1; then
  echo "✅ Frontend builds successfully"
else
  echo "❌ ERROR: Frontend build failed"
  ERRORS=$((ERRORS + 1))
fi

cd ..

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo "✅ All checks passed!"
  echo ""
  echo "📝 Next steps for Vercel deployment:"
  echo "   1. Import this repository to Vercel"
  echo "   2. Set Root Directory to 'frontend' in project settings"
  echo "   3. Deploy!"
  echo ""
  echo "   See VERCEL_DEPLOYMENT.md for detailed instructions."
elif [ $ERRORS -eq 0 ]; then
  echo "⚠️  Checks passed with $WARNINGS warning(s)"
  echo ""
  echo "The repository should deploy correctly, but check the warnings above."
else
  echo "❌ Checks failed with $ERRORS error(s) and $WARNINGS warning(s)"
  echo ""
  echo "Please fix the errors above before deploying."
  exit 1
fi
