import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import Home from "@/pages/home";
import Auth from "@/pages/auth";
import ResetComplete from "@/pages/reset-complete";
import { VerifyEmailPage } from "@/pages/verify-email";
import UserProfile from "@/pages/user-profile";
import NotFound from "@/pages/not-found";

// Import OAuth debugging in development
if (import.meta.env.DEV) {
  import("./lib/oauth-debug");
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/auth/reset-complete" component={ResetComplete} />
      <Route path="/verify-email" component={VerifyEmailPage} />
      <Route path="/profile" component={UserProfile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="dark">
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;