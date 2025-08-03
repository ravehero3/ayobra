# Google OAuth Setup Guide for Supabase

## Current Status
✅ Supabase credentials configured
✅ Google OAuth enabled in Supabase project 
✅ Frontend code properly implemented
❌ **MISSING: Google OAuth redirect URLs in Supabase**

## The Issue
Google OAuth is initiating successfully but failing because the redirect URL for your Replit domain is not configured in your Supabase project.

## Required Steps to Fix

### 1. Add Replit Domain to Supabase
Go to your Supabase dashboard:
1. Navigate to **Authentication > URL Configuration**
2. Add these URLs to **Site URL** and **Redirect URLs**:
   - `https://ffddbc80-1739-478a-b874-421fe1594063-00-1w96254hu7csr.janeway.replit.dev`
   - `https://ffddbc80-1739-478a-b874-421fe1594063-00-1w96254hu7csr.janeway.replit.dev/**`

### 2. Configure Google OAuth Provider
In Supabase Authentication > Providers > Google:
1. **Enabled**: ✅ (already done)
2. **Client ID**: Add your Google OAuth Client ID
3. **Client Secret**: Add your Google OAuth Client Secret
4. **Redirect URL**: Should auto-populate as:
   `https://qieufitqzeyrwdaqthwz.supabase.co/auth/v1/callback`

### 3. Google Cloud Console Setup
If you haven't created Google OAuth credentials:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select a project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://qieufitqzeyrwdaqthwz.supabase.co/auth/v1/callback`

## Current Technical Details
- **Supabase URL**: https://qieufitqzeyrwdaqthwz.supabase.co
- **Current Domain**: https://ffddbc80-1739-478a-b874-421fe1594063-00-1w96254hu7csr.janeway.replit.dev
- **OAuth Status**: Initiating successfully, but redirect failing
- **Email Auth**: ✅ Working (fallback option available)

## Test After Setup
Once configured, the Google sign-in should:
1. Open Google OAuth popup
2. Complete authentication
3. Redirect back to your app
4. User automatically signed in