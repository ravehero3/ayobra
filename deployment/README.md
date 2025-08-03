# Voodoo808 - Professional Beat Video Creator Landing Page

A modern, responsive landing page for the Voodoo808 beat video creation desktop application. Built with React, TypeScript, Tailwind CSS, and Supabase authentication.

## 🚀 Features

- **Modern React Stack**: React 18, TypeScript, Vite for fast development
- **Beautiful UI**: Dark glassmorphism theme with Framer-inspired design
- **Authentication**: Supabase integration with Google OAuth and email/password
- **Responsive Design**: Mobile-first approach with smooth animations
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support
- **Fast Performance**: Optimized build with code splitting and caching

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Supabase account (for authentication)
- Google Cloud Console project (for OAuth)

## 🛠️ Installation

1. **Clone or download the project**
   ```bash
   git clone <your-repo-url>
   cd voodoo808-landing-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your actual values:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_APP_URL=https://app.voodoo808.com
   ```

4. **Configure Supabase**
   - Create a new Supabase project
   - Enable Google OAuth in Authentication > Providers
   - Add your authorized domains to the site URL configuration
   - Copy your project URL and anon key to `.env.local`

5. **Configure Google OAuth**
   - Go to Google Cloud Console
   - Create OAuth 2.0 credentials
   - Add authorized origins: `https://app.voodoo808.com`, `http://localhost:3000`
   - Add redirect URI: `https://your-project.supabase.co/auth/v1/callback`
   - Copy Client ID and Secret to Supabase

## 🏃‍♂️ Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🏗️ Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🚀 Deployment Options

### 1. Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Add environment variables in Vercel dashboard
5. Configure custom domain: `app.voodoo808.com`

**Automatic Deployment:**
- Connect your GitHub repository to Vercel
- Vercel will auto-deploy on every push to main branch

### 2. Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Or use Netlify CLI: `netlify deploy --prod --dir=dist`
4. Configure environment variables in Netlify dashboard
5. Set up custom domain: `app.voodoo808.com`

### 3. GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```
3. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

### 4. Static Hosting (Any Provider)

After running `npm run build`, upload the contents of the `dist` folder to your hosting provider.

## 🌐 Custom Domain Setup

### DNS Configuration for app.voodoo808.com

1. **A Record**: Point `app.voodoo808.com` to your hosting provider's IP
2. **CNAME** (alternative): Point `app` to your hosting provider's domain

### Update Authentication URLs

After deploying, update these configurations:

**Supabase:**
- Site URL: `https://app.voodoo808.com`
- Redirect URLs: Add `https://app.voodoo808.com/**`

**Google OAuth:**
- Authorized origins: Add `https://app.voodoo808.com`
- Authorized redirect URIs: Keep the Supabase callback URL

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── auth/           # Authentication components
│   └── sections/       # Landing page sections
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Page components
└── index.css          # Global styles and Tailwind CSS
```

## 🎨 Customization

### Colors and Theme
Edit `src/index.css` and `tailwind.config.ts` to customize the color scheme.

### Content
Update the following files to customize your content:
- `src/components/sections/hero.tsx` - Main hero section
- `src/components/sections/features.tsx` - Features section
- `src/components/sections/pricing.tsx` - Pricing section
- `src/components/sections/footer.tsx` - Footer content

### Branding
- Replace favicon in `public/favicon.ico`
- Update meta tags in `index.html`
- Modify navigation logo in `src/components/navigation.tsx`

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `VITE_APP_URL` | Your app's production URL | No |

## 🐛 Troubleshooting

**Authentication Issues:**
- Verify Supabase environment variables
- Check Google OAuth configuration
- Ensure redirect URLs match exactly

**Build Issues:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

**Domain Issues:**
- Verify DNS propagation (can take up to 48 hours)
- Check SSL certificate installation
- Ensure HTTPS redirect is enabled

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Support

For support with deployment or customization, contact: app@voodoo808.com

---

Built with ❤️ for the Voodoo808 community