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
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Create Professional<br />
          <span className="text-gradient">Beat Videos</span><br />
          in Minutes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-framer-muted mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          The ultimate desktop app for music producers. Drag, drop, and instantly generate stunning beat videos with professional waveform visualization, custom layouts, and export-ready quality for YouTube, Instagram, and TikTok.
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
            className="bg-framer-gradient hover:bg-framer-gradient-hover text-white px-6 py-3 text-sm font-semibold transition-all transform hover:scale-105 rounded-full shadow-lg"
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
            src="/app-screenshot.png"
            alt="Type Beatz PRO interface showing professional beat video creation"
            className="rounded-2xl shadow-2xl mx-auto"
            data-testid="app-preview-image"
          />
        </motion.div>
      </div>
    </section>
  );
}
