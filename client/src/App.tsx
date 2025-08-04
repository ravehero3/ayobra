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

// Temporarily allow app to run without Clerk key during migration
if (!PUBLISHABLE_KEY) {
  console.warn('Missing VITE_CLERK_PUBLISHABLE_KEY - authentication will be disabled');
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/privacy" component={() => import("@/pages/privacy").then(m => m.default)} />
      <Route path="/terms" component={() => import("@/pages/terms").then(m => m.default)} />
      <Route path="/refund" component={() => import("@/pages/refund").then(m => m.default)} />
      <Route path="/license" component={() => import("@/pages/license").then(m => m.default)} />
      <Route path="/eula" component={() => import("@/pages/eula").then(m => m.default)} />
      <Route path="/changelog" component={() => import("@/pages/changelog").then(m => m.default)} />
      <Route path="/support" component={() => import("@/pages/support").then(m => m.default)} />
      <Route path="/docs" component={() => import("@/pages/docs").then(m => m.default)} />
      <Route path="/tutorials" component={() => import("@/pages/tutorials").then(m => m.default)} />
      <Route path="/contact" component={() => import("@/pages/contact").then(m => m.default)} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Conditional Clerk provider for migration
  const AppContent = () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );

  if (!PUBLISHABLE_KEY) {
    return <AppContent />;
  }

  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        elements: {
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
          card: "bg-gray-900 border-gray-700"
        }
      }}
    >
      <AppContent />
    </ClerkProvider>
  );
}

export default App;