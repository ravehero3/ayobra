import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderOpen, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          ? "bg-[hsl(0,0%,4%)]/80 backdrop-blur-md border-b border-[hsl(0,0%,16%)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[5vh]">
          <div className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="TypeBeat Studio Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold">typebeatz</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => scrollToSection("features")}
              className="text-[hsl(0,0%,62.7%)] hover:text-white transition-colors"
              data-testid="nav-features"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-[hsl(0,0%,62.7%)] hover:text-white transition-colors"
              data-testid="nav-pricing"
            >
              Pricing
            </button>
          </div>

          {/* User Icon */}
          <div className="hidden md:flex items-center">
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors bg-[#0a0a0a]">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center space-x-3">
            <button className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors">
              <User className="w-4 h-4 text-gray-600" />
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
            className="md:hidden bg-[hsl(0,0%,10%)] border-t border-[hsl(0,0%,16%)]"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection("features")}
                className="block px-3 py-2 text-[hsl(0,0%,62.7%)] hover:text-white transition-colors"
                data-testid="mobile-nav-features"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="block px-3 py-2 text-[hsl(0,0%,62.7%)] hover:text-white transition-colors"
                data-testid="mobile-nav-pricing"
              >
                Pricing
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
