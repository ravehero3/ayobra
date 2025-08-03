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
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

console.log('Clerk Environment check:', {
  hasClerkKey: !!PUBLISHABLE_KEY,
  clerkKeyPreview: PUBLISHABLE_KEY ? PUBLISHABLE_KEY.substring(0, 20) + '...' : 'undefined'
});

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY environment variable');
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
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: "dark",
        elements: {
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
          card: "bg-gray-900 border-gray-700"
        }
      }}
    >
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