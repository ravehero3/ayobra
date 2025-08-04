import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: 'url(/world-image.jpg)' }}
      ></div>
      
      {/* Content */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-bold mb-4 text-white"
          style={{ 
            fontSize: '72px',
            letterSpacing: '-0.08em',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '0.9'
          }}
        >
          Batch generate<br />
          type beat videos<br />
          in one click
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 max-w-3xl mx-auto"
          style={{ 
            fontSize: '20px',
            letterSpacing: '-0.02em',
            color: '#999999',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.2'
          }}
        >
          The time saving tool loved by beat makers.
        </motion.p>

        {/* Download Buttons */}
        <motion.div
          id="download"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            size="sm"
            className="bg-white hover:bg-gray-100 text-black px-6 py-3 text-sm font-semibold transition-all transform hover:scale-105 rounded-full shadow-lg"
            data-testid="download-mac"
          >
            <Download className="w-4 h-4 mr-2" />
            <span>Download for Mac</span>
          </Button>
          <Button
            size="sm"
            className="bg-framer-surface hover:bg-framer-border text-framer-text px-6 py-3 text-sm font-semibold transition-all transform hover:scale-105 rounded-full border border-framer-border"
            data-testid="download-windows"
          >
            <Download className="w-4 h-4 mr-2" />
            <span>Download for Windows</span>
          </Button>
        </motion.div>

        {/* App Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative"
        >
          <img
            src="/hero-app-image.jpg"
            alt="Type Beatz PRO app floating in space - professional beat video creation"
            className="rounded-2xl shadow-2xl mx-auto border border-framer-border"
            data-testid="app-preview-image"
          />
        </motion.div>
      </div>
    </section>
  );
}
