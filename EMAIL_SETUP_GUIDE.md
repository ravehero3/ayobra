# Email Service Setup Guide for Supabase

## Current Issue
❌ **Email confirmation service not configured in Supabase**
- Sign up fails with "error sending confirmation email"
- `mailer_autoconfirm` is set to `false` but no email service is configured

## Solutions

### Option 1: Enable Auto-Confirm (Quick Fix)
**For development/testing only:**
1. Go to Supabase Dashboard → Authentication → Settings
2. Under "Email Auth", toggle **ON** "Enable email confirmations"
3. Under "Advanced", toggle **ON** "Auto Confirm" 
4. This bypasses email confirmation for testing

### Option 2: Configure Email Service (Production Ready)
**For production use:**

#### Setup with SendGrid/SMTP
1. Go to Supabase Dashboard → Settings → Auth
2. Scroll to "SMTP Settings"
3. Configure your email service:
   ```
   SMTP Host: smtp.sendgrid.net
   SMTP Port: 587
   SMTP User: apikey
   SMTP Pass: [Your SendGrid API key]
   ```

#### Setup with Resend (Recommended)
1. Create account at [resend.com](https://resend.com)
2. Get API key
3. In Supabase → Settings → Auth → SMTP:
   ```
   SMTP Host: smtp.resend.com
   SMTP Port: 587
   SMTP User: resend
   SMTP Pass: [Your Resend API key]
   ```

### Option 3: Alternative Authentication
**Current working options:**
- ✅ Google OAuth (once domain is configured)
- ✅ Sign in (for existing users who managed to sign up)

## Current Status
- **Supabase Configuration**: ✅ Working
- **Google OAuth**: ✅ Ready (needs domain authorization)
- **Email Service**: ❌ Not configured
- **Auto-confirm**: ❌ Disabled

## Recommendation
For immediate testing: Enable auto-confirm in Supabase
For production: Set up proper email service (Resend recommended)