import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser, useAuth } from '@clerk/clerk-react';
import { X, User, Mail, Settings, LogOut, Edit, Camera } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const updateProfileSchema = z.object({
  displayName: z.string().min(1, 'Display name is required'),
});

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      displayName: user?.fullName || user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || '',
    },
  });

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const handleSave = async (data: UpdateProfileFormData) => {
    try {
      await user?.update({
        firstName: data.displayName.split(' ')[0],
        lastName: data.displayName.split(' ').slice(1).join(' ') || '',
      });
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  // If loading, show loading state
  if (!isLoaded) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-semibold">Loading...</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
        <DialogHeader className="relative">
          <DialogTitle className="text-white text-xl font-semibold">
            <SignedIn>Profile Settings</SignedIn>
            <SignedOut>Sign In Required</SignedOut>
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 h-8 w-8 p-0 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <SignedOut>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="h-20 w-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto">
              <User className="h-10 w-10 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-300">Please sign in to view your profile</p>
              <p className="text-sm text-gray-400">Create an account or sign in to access your personal dashboard</p>
            </div>
            <SignInButton mode="modal">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Sign In / Sign Up
              </Button>
            </SignInButton>
          </motion.div>
        </SignedOut>

        <SignedIn>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* User Avatar */}
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
                  <AvatarFallback className="bg-blue-600 text-white text-lg">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <div className="flex items-center space-x-2 p-3 bg-gray-900 rounded-lg border border-gray-700">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-white">{user?.emailAddresses[0]?.emailAddress}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-gray-300">Display Name</Label>
                {isEditing ? (
                  <form onSubmit={handleSubmit(handleSave)} className="space-y-3">
                    <Input
                      id="displayName"
                      {...register('displayName')}
                      className="bg-gray-900 border-gray-700 text-white"
                      placeholder="Enter your display name"
                    />
                    {errors.displayName && (
                      <p className="text-sm text-red-500">{errors.displayName.message}</p>
                    )}
                    <div className="flex space-x-2">
                      <Button
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 text-gray-300 hover:text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="p-3 bg-gray-900 rounded-lg border border-gray-700">
                    <span className="text-white">{user?.fullName || user?.firstName}</span>
                  </div>
                )}
              </div>

              <div className="text-sm text-gray-400">
                Member since {new Date(user?.createdAt || '').toLocaleDateString()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!isEditing && (
                <Button
                  onClick={() => {
                    setIsEditing(true);
                    setValue('displayName', user?.fullName || user?.firstName || '');
                  }}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}

              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="w-full text-red-400 hover:text-red-300 hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </motion.div>
        </SignedIn>
      </DialogContent>
    </Dialog>
  );
}