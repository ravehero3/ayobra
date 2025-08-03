import { motion } from "framer-motion";
import { AuthModal } from "@/components/auth/auth-modal";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export default function Auth() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(true);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleClose = () => {
    setAuthModalOpen(false);
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[hsl(0,0%,4%)] text-white flex items-center justify-center"
    >
      <AuthModal
        isOpen={authModalOpen}
        onClose={handleClose}
        defaultMode="signin"
      />
    </motion.div>
  );
}