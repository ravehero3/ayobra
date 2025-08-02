import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();
  const { resetPassword } = useAuth();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      const result = await resetPassword(data.email);

      if (result.error) {
        toast({
          title: 'Error',
          description: result.error.message,
          variant: 'destructive',
        });
      } else {
        setEmailSent(true);
        toast({
          title: 'Reset email sent!',
          description: 'If an account with that email exists, we sent you a password reset link.',
        });
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

  if (emailSent) {
    return (
      <div className="space-y-4 text-center">
        <div className="space-y-2">
          <h3 className="text-white text-lg font-semibold">Check your email</h3>
          <p className="text-gray-400 text-sm">
            We've sent a password reset link to your email address.
          </p>
        </div>
        
        <Button
          onClick={onBack}
          variant="outline"
          className="border-gray-600 text-white hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-white text-lg font-semibold mb-2">Reset your password</h3>
        <p className="text-gray-400 text-sm">
          Enter your email address and we'll send you a link to reset your password.
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

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send reset link
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={onBack}
            className="text-gray-400 hover:text-gray-300 text-sm"
          >
            <ArrowLeft className="inline mr-1 h-3 w-3" />
            Back to sign in
          </button>
        </div>
      </form>
    </div>
  );
}