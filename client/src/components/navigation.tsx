import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderOpen, Menu, X } from "lucide-react";
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
            <span className="text-xl font-bold">TypeBeat Studio</span>
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
            <Button
              onClick={() => scrollToSection("download")}
              className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(214,95%,68%)] text-white"
              data-testid="nav-download"
            >
              Download
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
              <button
                onClick={() => scrollToSection("download")}
                className="block px-3 py-2 text-[hsl(217,91%,60%)] hover:text-[hsl(214,95%,68%)] transition-colors"
                data-testid="mobile-nav-download"
              >
                Download
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
