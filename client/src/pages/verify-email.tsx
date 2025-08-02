import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { authService } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';

export function VerifyEmailPage() {
  const [, setLocation] = useLocation();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        // Get the hash from the URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken && refreshToken) {
          // Set the session with the tokens from the URL
          const { data, error } = await authService.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error('Verification error:', error);
            setVerificationStatus('error');
            setMessage(error.message || 'Failed to verify email');
          } else {
            setVerificationStatus('success');
            setMessage('Email verified successfully! You are now signed in.');
            
            // Refresh the auth context
            await refreshAuth();
            
            // Redirect to home page after a short delay
            setTimeout(() => {
              setLocation('/');
            }, 2000);
          }
        } else {
          setVerificationStatus('error');
          setMessage('Invalid verification link');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('error');
        setMessage('An error occurred during verification');
      }
    };

    handleEmailVerification();
  }, [setLocation, refreshAuth]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {verificationStatus === 'loading' && (
              <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
            )}
            {verificationStatus === 'success' && (
              <CheckCircle className="h-12 w-12 text-green-500" />
            )}
            {verificationStatus === 'error' && (
              <XCircle className="h-12 w-12 text-red-500" />
            )}
          </div>
          
          <CardTitle className="text-white text-xl">
            {verificationStatus === 'loading' && 'Verifying your email...'}
            {verificationStatus === 'success' && 'Email Verified!'}
            {verificationStatus === 'error' && 'Verification Failed'}
          </CardTitle>
          
          <CardDescription className="text-gray-400">
            {message}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          {verificationStatus === 'success' && (
            <p className="text-sm text-gray-400 mb-4">
              Redirecting you to the home page...
            </p>
          )}
          
          {verificationStatus === 'error' && (
            <Button
              onClick={() => setLocation('/')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Go to Home Page
            </Button>
          )}
          
          {verificationStatus === 'loading' && (
            <p className="text-sm text-gray-400">
              Please wait while we verify your email address.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}