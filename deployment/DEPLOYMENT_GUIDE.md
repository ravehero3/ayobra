# Voodoo808 Landing Page - Quick Deployment Guide

## 🎯 Quick Start (5 minutes)

### 1. Download and Setup
1. Extract the deployment package
2. Open terminal in the project folder
3. Run: `./deploy.sh` (or `bash deploy.sh` on Windows)

### 2. Configure Environment
Edit `.env.local` with your credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_APP_URL=https://app.voodoo808.com
```

### 3. Deploy

#### Option A: Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

#### Option B: Netlify
1. Run: `npm run build`
2. Drag `dist` folder to netlify.com
3. Add environment variables in Netlify dashboard

#### Option C: GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Add secrets for environment variables

## 🔧 Post-Deployment Checklist

### Supabase Configuration
- [ ] Update Site URL to your production domain
- [ ] Add redirect URLs: `https://app.voodoo808.com/**`

### Google OAuth Configuration  
- [ ] Add authorized origin: `https://app.voodoo808.com`
- [ ] Verify redirect URI: `https://your-project.supabase.co/auth/v1/callback`

### DNS Configuration
- [ ] Point `app.voodoo808.com` to your hosting provider
- [ ] Verify SSL certificate is active
- [ ] Test the domain resolves correctly

### Final Testing
- [ ] Visit your live site
- [ ] Test Google OAuth login
- [ ] Test email/password authentication
- [ ] Verify all sections load properly
- [ ] Check mobile responsiveness

## 🆘 Common Issues

**"Cannot connect to Supabase"**
- Check environment variables are correct
- Verify Supabase project is active
- Ensure anon key has correct permissions

**"Google OAuth not working"**
- Verify authorized origins include your domain
- Check redirect URI matches Supabase callback
- Ensure Google OAuth is enabled in Supabase

**"Site not loading"**
- Check DNS propagation (can take up to 48 hours)
- Verify hosting provider configuration
- Ensure HTTPS is enabled

## 📞 Support

If you need help with deployment, contact: app@voodoo808.com

Include:
- Your hosting provider
- Error messages (if any)
- Screenshots of the issue

---

Good luck with your deployment! 🚀