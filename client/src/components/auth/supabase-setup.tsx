import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SupabaseSetup() {
  return (
    <div className="min-h-screen bg-[hsl(0,0%,4%)] text-white flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-black/90 border-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <Database className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-white text-2xl">Supabase Setup Required</CardTitle>
          <CardDescription className="text-gray-400">
            To enable authentication, you need to configure Supabase environment variables.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Alert className="border-blue-800 bg-blue-950/20">
            <AlertDescription className="text-blue-200">
              Follow these steps to set up Supabase authentication:
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Step 1: Create a Supabase Project</h3>
              <p className="text-gray-400 text-sm mb-3">
                Go to the Supabase dashboard and create a new project if you haven't already.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={() => window.open('https://supabase.com/dashboard/projects', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Supabase Dashboard
              </Button>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Step 2: Get Your Project Credentials</h3>
              <p className="text-gray-400 text-sm mb-3">
                In your project settings, find the API section and copy:
              </p>
              <ul className="text-sm text-gray-400 space-y-1 ml-4">
                <li>• Project URL (starts with https://)</li>
                <li>• Public anon key (safe to use client-side)</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Step 3: Add Environment Variables</h3>
              <p className="text-gray-400 text-sm mb-3">
                Add these environment variables to your Replit project:
              </p>
              <div className="bg-black p-3 rounded font-mono text-sm text-green-400">
                <div>VITE_SUPABASE_URL=your_project_url</div>
                <div>VITE_SUPABASE_ANON_KEY=your_anon_key</div>
              </div>
            </div>

            <Alert className="border-yellow-800 bg-yellow-950/20">
              <AlertDescription className="text-yellow-200">
                After adding the environment variables, restart your application to apply the changes.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}