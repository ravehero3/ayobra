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

### 3. Google Cloud Console Setup - URGENT FIX NEEDED
**Problem**: Google is rejecting the connection because your Replit domain isn't authorized.

**Solution**: Go to [Google Cloud Console](https://console.cloud.google.com/)
1. Find your OAuth 2.0 Client ID: `806182380827-ha8nklvce8v0jgu0pejuqkmef4r9jcna.apps.googleusercontent.com`
2. Click "Edit" on your OAuth client
3. Under "Authorized JavaScript origins" add:
   - `https://ffddbc80-1739-478a-b874-421fe1594063-00-1w96254hu7csr.janeway.replit.dev`
4. Under "Authorized redirect URIs" ensure you have:
   - `https://qieufitqzeyrwdaqthwz.supabase.co/auth/v1/callback`

**Current Error**: "Web accounts.google.com odmítl připojení" = Google rejected the connection due to unauthorized domain.

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