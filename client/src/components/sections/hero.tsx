import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
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
          <span className="text-gradient">Type Beat Videos</span><br />
          in Minutes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-[hsl(0,0%,62.7%)] mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          The ultimate desktop app for music producers. Drag, drop, and generate stunning type beat videos with waveform visualization and custom layouts.
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
            className="bg-white hover:bg-gray-100 text-black px-4 py-2 text-sm font-semibold transition-all transform hover:scale-105 rounded-full w-[6vw] min-w-fit"
            data-testid="download-mac"
          >
            <span>Download for Mac</span>
          </Button>
          <Button
            size="sm"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm font-semibold transition-all transform hover:scale-105 rounded-full w-[6vw] min-w-fit"
            data-testid="download-windows"
          >
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
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800"
            alt="TypeBeat Studio app interface showing drag-and-drop audio and image pairing"
            className="rounded-2xl shadow-2xl mx-auto border border-[hsl(0,0%,16%)]"
            data-testid="app-preview-image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,4%)] via-transparent to-transparent rounded-2xl"></div>
        </motion.div>
      </div>
    </section>
  );
}
