import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

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

export function AuthModal({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [showSignUpOption, setShowSignUpOption] = useState(false);

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
      } else {
        result = await signUp(data.email, data.password);
      }

      if (result.error) {
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

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black/90 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white text-center text-2xl">
            Welcome to TypeBeatz
          </DialogTitle>
        </DialogHeader>

        {!showSignUpOption && mode === 'signin' ? (
          <div className="space-y-4">
            <p className="text-gray-400 text-center">
              Choose how you'd like to continue
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={() => setShowSignUpOption(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
              >
                Sign In to Your Account
              </Button>
              
              <Button
                onClick={() => {
                  setMode('signup');
                  setShowSignUpOption(true);
                }}
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-800 h-12"
              >
                Create New Account
              </Button>
            </div>
          </div>
        ) : (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-white text-lg font-semibold mb-2">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </h3>
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

          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-blue-400 hover:text-blue-300 text-sm underline"
            >
              {mode === 'signin' 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>
          </div>
        </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setShowSignUpOption(false);
                setMode('signin');
                form.reset();
              }}
              className="text-gray-400 hover:text-gray-300 text-sm"
            >
              ← Back to options
            </button>
          </div>
        </div>
        )}
      </DialogContent>
    </Dialog>
  );
}