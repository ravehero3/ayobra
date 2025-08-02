# Supabase Setup Guide for TypeBeatz

Follow these steps to set up Supabase authentication for your TypeBeatz landing page.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com/dashboard/projects](https://supabase.com/dashboard/projects)
2. Click "New Project"
3. Fill in your project details:
   - Name: TypeBeatz
   - Database Password: Choose a strong password (save it somewhere safe)
   - Region: Choose the closest region to your users
4. Click "Create new project"
5. Wait for the project to be fully initialized (this takes a few minutes)

## Step 2: Get Your Project Credentials

1. Once your project is ready, go to your project dashboard
2. Click on "Settings" in the left sidebar
3. Click on "API" in the settings menu
4. Copy these two values:
   - **Project URL**: This starts with `https://` and looks like `https://abcdefghijk.supabase.co`
   - **Public anon key**: This is a long string starting with `eyJ...`

## Step 3: Add Environment Variables to Replit

1. In your Replit project, look for the "Secrets" tool in the left toolbar
   - If you don't see it, click "All tools" and then select "Secrets"
   - Or type "Secrets" in the search bar
2. Click "New Secret" and add these two secrets:

   **First Secret:**
   - Key: `VITE_SUPABASE_URL`
   - Value: Your Project URL (the https://... link you copied)

   **Second Secret:**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: Your Public anon key (the long eyJ... string you copied)

3. Click "Add Secret" for each one

## Step 4: Restart Your Application

1. After adding both secrets, restart your Replit application
2. The workflow should automatically restart, or you can restart it manually
3. The authentication system will now be fully functional

## Step 5: Test Authentication

1. Visit your application
2. Click the user icon in the top right corner
3. You should now see the sign in/sign up options instead of the setup message
4. Try creating a new account - you should receive a confirmation email

## Troubleshooting

- Make sure the secret keys are exactly `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (case-sensitive)
- **IMPORTANT**: Don't mix up the values!
  - `VITE_SUPABASE_URL` should be the URL (starts with `https://`)
  - `VITE_SUPABASE_ANON_KEY` should be the key (starts with `eyJ`)
- Ensure there are no extra spaces in the values
- If you're still seeing the setup message, try refreshing the page after restarting
- Check the browser console for any error messages

## Email Configuration (Optional)

By default, Supabase uses their email service for authentication emails. If you want to customize the email templates:

1. Go to Authentication > Email Templates in your Supabase dashboard
2. Customize the "Confirm signup" and other email templates as needed
3. You can also configure a custom domain for emails in the Authentication settings