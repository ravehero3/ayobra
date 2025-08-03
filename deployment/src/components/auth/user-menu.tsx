import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { AuthModal } from './auth-modal';
import { SupabaseSetup } from './supabase-setup';
import { authService } from '@/lib/auth';
import { User, LogOut, Settings } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export function UserMenu() {
  const { user, signOut, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [setupModalOpen, setSetupModalOpen] = useState(false);

  const isSupabaseConfigured = authService.isConfigured();

  const handleSignOut = async () => {
    await signOut();
  };

  const openSignIn = () => {
    // Always show auth modal - let users try to authenticate
    setAuthMode('signin');
    setAuthModalOpen(true);
  };

  const openSignUp = () => {
    // Always show auth modal - let users try to authenticate
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-gray-700 rounded-full animate-pulse" />
      </div>
    );
  }

  if (user) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-white">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-black/90 border-gray-800" align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium text-white text-sm">{user.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-white hover:bg-gray-800 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        onClick={openSignIn}
        className="relative h-8 w-8 rounded-full p-0 hover:bg-gray-800"
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gray-700 text-white">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Button>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
      />

      <Dialog open={setupModalOpen} onOpenChange={setSetupModalOpen}>
        <DialogContent className="max-w-4xl p-0 border-0 bg-transparent" aria-describedby="supabase-setup-description">
          <div className="sr-only">
            <h2>Supabase Setup Required</h2>
            <p id="supabase-setup-description">Configure Supabase environment variables to enable authentication</p>
          </div>
          <SupabaseSetup />
        </DialogContent>
      </Dialog>
    </>
  );
}