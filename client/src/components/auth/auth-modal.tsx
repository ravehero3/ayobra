import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { ForgotPasswordForm } from './forgot-password-form';
import { Loader2 } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import userIcon from '@assets/user_1754235747400.png';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AuthFormData = z.infer<typeof authSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export function AuthModal({ 
  isOpen, 
  onClose, 
  defaultMode = 'signin' 
}: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot' | 'menu'>('menu');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true);
    try {
      let result;
      if (mode === 'signin') {
        result = await signIn(data.email, data.password);
      } else if (mode === 'signup') {
        result = await signUp(data.email, data.password);
      }

      if (result?.error) {
        toast({
          title: 'Authentication Error',
          description: result.error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: mode === 'signin' ? 'Welcome back!' : 'Account created!',
          description: mode === 'signin' 
            ? 'You have successfully signed in.' 
            : 'Please check your email to confirm your account.',
        });
        onClose();
        form.reset();
        setMode('menu');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      // Debug OAuth configuration in development
      if (import.meta.env.DEV) {
        console.log('Starting Google OAuth...');
        console.log('Current URL:', window.location.href);
      }

      const result = await signInWithGoogle();
      
      if (result?.error) {
        console.error('Google OAuth error details:', result.error);
        toast({
          title: 'Google Authentication Error',
          description: result.error.message || 'Failed to authenticate with Google. Please check your configuration.',
          variant: 'destructive',
        });
      } else {
        console.log('Google OAuth initiated successfully');
        toast({
          title: 'Redirecting to Google...',
          description: 'Please complete authentication in the popup window.',
        });
        // Don't close modal immediately - let OAuth complete
      }
    } catch (error) {
      console.error('Google OAuth exception:', error);
      toast({
        title: 'Google Authentication Failed',
        description: 'Unable to connect to Google. Please try again or use email authentication.',
        variant: 'destructive',
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode === 'signin' || defaultMode === 'signup' ? 'menu' : 'menu');
      form.reset();
    }
  }, [isOpen, defaultMode, form]);

  const handleClose = () => {
    onClose();
    setMode('menu');
    form.reset();
  };

  const renderContent = () => {
    // Show forgot password form
    if (mode === 'forgot') {
      return (
        <ForgotPasswordForm 
          onBack={() => setMode('menu')} 
        />
      );
    }

    // Show sign in or sign up form
    if (mode === 'signin' || mode === 'signup') {
      return (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-white text-lg font-semibold mb-2">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </h3>
            <p className="text-gray-400 text-sm">
              {mode === 'signin' 
                ? 'Welcome back! Please enter your details.' 
                : 'Create your account to get started.'
              }
            </p>
          </div>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
                {...form.register('email')}
              />
              {form.formState.errors.email && (
                <p className="text-red-400 text-sm">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
                {...form.register('password')}
              />
              {form.formState.errors.password && (
                <p className="text-red-400 text-sm">{form.formState.errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>

            <div className="space-y-2 text-center text-sm">
              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Forgot your password?
                </button>
              )}
              
              <div>
                <span className="text-gray-400">
                  {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button
                  type="button"
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </div>
              
              <button
                type="button"
                onClick={() => setMode('menu')}
                className="text-gray-400 hover:text-gray-300 block mx-auto"
              >
                ← Back
              </button>
            </div>
          </form>
        </div>
      );
    }

    // Show main menu with options
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-white text-lg font-semibold mb-2">Welcome to TypeBeatz</h3>
          <p className="text-gray-400 text-sm">
            Sign in to access your account
          </p>
        </div>
        
        <div className="space-y-4">
          {/* Google OAuth - Primary Option */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-12 h-12 bg-transparent hover:bg-transparent p-0 flex items-center justify-center"
          >
            {googleLoading ? (
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            ) : (
              <img 
                src={userIcon} 
                alt="Sign in" 
                className="h-8 w-8 filter invert hover:invert-0 hover:brightness-50 transition-all duration-200"
              />
            )}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-800 px-2 text-gray-400">Or</span>
            </div>
          </div>
          
          {/* Email/Password Options */}
          <div className="space-y-2">
            <Button
              onClick={() => setMode('signin')}
              variant="outline"
              className="w-full border-gray-600 text-white hover:bg-gray-700 h-11"
            >
              Sign In with Email
            </Button>
            
            <Button
              onClick={() => setMode('signup')}
              variant="outline"
              className="w-full border-gray-600 text-white hover:bg-gray-700 h-11"
            >
              Create New Account
            </Button>

            <Button
              onClick={() => setMode('forgot')}
              variant="ghost"
              className="w-full text-gray-400 hover:text-gray-300 hover:bg-gray-800 h-9 text-sm"
            >
              Forgot Password?
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="sr-only">Authentication</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}