import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/clerk-react";
import Home from "@/pages/home";
import UserProfile from "@/pages/user-profile";
import NotFound from "@/pages/not-found";

// Import Clerk publishable key
const rawKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Extract just the publishable key from the environment variable
const PUBLISHABLE_KEY = rawKey?.includes('pk_test_') 
  ? rawKey.match(/pk_test_[a-zA-Z0-9]+/)?.[0] 
  : rawKey;

// Debug environment variables
console.log('Environment check:', {
  hasClerkKey: !!PUBLISHABLE_KEY,
  clerkKeyPreview: PUBLISHABLE_KEY ? PUBLISHABLE_KEY.substring(0, 20) + '...' : 'undefined',
  rawKeyPreview: rawKey ? rawKey.substring(0, 50) + '...' : 'undefined'
});

if (!PUBLISHABLE_KEY) {
  throw new Error(`Missing Publishable Key. Available env vars: ${Object.keys(import.meta.env).join(', ')}`);
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/profile" component={UserProfile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="dark">
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;