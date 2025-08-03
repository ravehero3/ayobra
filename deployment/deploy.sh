#!/bin/bash

# Voodoo808 Landing Page - Deployment Script
# This script helps you prepare and deploy your landing page

set -e

echo "🚀 Voodoo808 Landing Page Deployment Script"
echo "============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | sed 's/v//')
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to 18.0.0 or higher."
    exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating from .env.example..."
    cp .env.example .env.local
    echo "📝 Please edit .env.local with your actual Supabase credentials before continuing."
    read -p "Press Enter after updating .env.local..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Type check
echo "🔍 Running type check..."
npm run type-check

# Build the project
echo "🏗️  Building production version..."
npm run build

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "📁 Your production files are in the 'dist' folder"
echo ""
echo "🚀 Choose your deployment method:"
echo "1. Vercel (Recommended): Run 'npx vercel' in this directory"
echo "2. Netlify: Drag and drop the 'dist' folder to netlify.com"
echo "3. GitHub Pages: Push to GitHub and enable Pages in repository settings"
echo "4. Custom hosting: Upload the contents of 'dist' folder to your web server"
echo ""
echo "🌐 After deployment, remember to:"
echo "- Update Supabase site URL to your production domain"
echo "- Add production domain to Google OAuth authorized origins"
echo "- Configure DNS for app.voodoo808.com"
echo ""
echo "📚 See README.md for detailed deployment instructions"
echo ""
echo "🎉 Happy deploying!"