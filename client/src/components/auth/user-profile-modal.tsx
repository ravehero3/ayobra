
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser, useClerk } from '@clerk/clerk-react';
import { X, User, Mail, Settings, LogOut } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');

  const handleSave = async () => {
    if (user) {
      try {
        await user.update({
          firstName,
          lastName,
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleSignOut = () => {
    signOut();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glassmorphism border-framer-border bg-framer-background/90 backdrop-blur-xl">
        <DialogHeader className="relative">
          <DialogTitle className="text-white text-xl font-semibold">
            {user ? 'Profile Settings' : 'User Profile'}
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

        {user ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* User Avatar */}
            <div className="flex justify-center">
              <div className="h-20 w-20 bg-framer-gradient rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <div className="flex items-center space-x-2 p-3 bg-framer-surface rounded-lg border border-framer-border">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-white">{user.primaryEmailAddress?.emailAddress}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-framer-surface border-framer-border text-white"
                    />
                  ) : (
                    <div className="p-3 bg-framer-surface rounded-lg border border-framer-border">
                      <span className="text-white">{user.firstName || 'Not set'}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-framer-surface border-framer-border text-white"
                    />
                  ) : (
                    <div className="p-3 bg-framer-surface rounded-lg border border-framer-border">
                      <span className="text-white">{user.lastName || 'Not set'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {isEditing ? (
                <div className="flex space-x-2">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-framer-gradient hover:bg-framer-gradient-hover text-white"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 text-gray-300 hover:text-white"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-framer-surface hover:bg-framer-border text-white border border-framer-border"
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
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="h-20 w-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto">
              <User className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-gray-300">Please sign in to view your profile</p>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
