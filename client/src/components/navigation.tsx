
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useLocation } from "wouter";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { UserIcon } from "@/components/icons/user-icon";
import { UserProfileModal } from "@/components/auth/user-profile-modal";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-framer-background/80 backdrop-blur-md border-b border-framer-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[5vh]">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">Type Beatz</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => scrollToSection("features")}
              className="text-framer-muted hover:text-framer-text transition-colors"
              data-testid="nav-features"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-framer-muted hover:text-framer-text transition-colors"
              data-testid="nav-pricing"
            >
              Pricing
            </button>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="group p-1 hover:bg-transparent flex items-center justify-center transition-transform duration-200 hover:scale-110"
              title={user ? 'View Profile' : 'Sign In'}
            >
              <UserIcon className={`h-7 w-7 ${user ? 'opacity-100' : 'opacity-80'}`} />
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center space-x-3">
            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="group p-1 hover:bg-transparent flex items-center justify-center transition-transform duration-200 hover:scale-110"
              title={user ? 'View Profile' : 'Sign In'}
            >
              <UserIcon className={`h-7 w-7 ${user ? 'opacity-100' : 'opacity-80'}`} />
            </button>
            <button
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-framer-surface border-t border-framer-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection("features")}
                className="block px-3 py-2 text-framer-muted hover:text-framer-text transition-colors"
                data-testid="mobile-nav-features"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="block px-3 py-2 text-framer-muted hover:text-framer-text transition-colors"
                data-testid="mobile-nav-pricing"
              >
                Pricing
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* User Profile Modal */}
      <UserProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </motion.nav>
  );
}
