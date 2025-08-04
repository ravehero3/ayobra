
import { motion } from "framer-motion";
import { ArrowLeft, Book, Download, Settings, Video } from "lucide-react";
import { Link } from "wouter";

export default function Docs() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/" className="inline-flex items-center text-framer-gradient-start hover:text-framer-gradient-end mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold mb-8">Documentation</h1>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border border-framer-border rounded-lg p-6 hover:border-framer-gradient-start transition-colors"
            >
              <Download className="w-8 h-8 text-framer-gradient-start mb-4" />
              <h2 className="text-xl font-semibold mb-3">Installation</h2>
              <p className="text-framer-muted">Download and install Type Beatz on Mac or Windows.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="border border-framer-border rounded-lg p-6 hover:border-framer-gradient-start transition-colors"
            >
              <Book className="w-8 h-8 text-framer-gradient-start mb-4" />
              <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
              <p className="text-framer-muted">Learn the basics of creating your first beat video.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="border border-framer-border rounded-lg p-6 hover:border-framer-gradient-start transition-colors"
            >
              <Settings className="w-8 h-8 text-framer-gradient-start mb-4" />
              <h2 className="text-xl font-semibold mb-3">PRO Features</h2>
              <p className="text-framer-muted">Unlock advanced features with batch processing and cloud sync.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="border border-framer-border rounded-lg p-6 hover:border-framer-gradient-start transition-colors"
            >
              <Video className="w-8 h-8 text-framer-gradient-start mb-4" />
              <h2 className="text-xl font-semibold mb-3">Exporting</h2>
              <p className="text-framer-muted">Export your videos in HD or 4K for social media platforms.</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="border border-framer-border rounded-lg p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Quick Start Guide</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2 text-framer-gradient-start">1. Installation</h3>
                <p className="text-framer-muted">Download Type Beatz for your operating system and run the installer. Enter your license key when prompted (PRO users only).</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-framer-gradient-start">2. Import Audio</h3>
                <p className="text-framer-muted">Drag and drop your audio file into the main workspace. Supported formats: MP3, WAV, FLAC, AAC.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-framer-gradient-start">3. Choose Template</h3>
                <p className="text-framer-muted">Select from our library of templates or create a custom layout. PRO users have access to premium templates.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-framer-gradient-start">4. Customize</h3>
                <p className="text-framer-muted">Adjust waveform colors, backgrounds, and text. Preview in real-time to see your changes.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-framer-gradient-start">5. Export</h3>
                <p className="text-framer-muted">Choose your export quality (1080p for free users, up to 4K for PRO) and format. Your video will be ready in minutes.</p>
              </div>
            </div>
          </motion.div>

          <div className="text-center mt-12">
            <p className="text-framer-muted mb-4">Need more help?</p>
            <Link href="/support" className="text-framer-gradient-start hover:text-framer-gradient-end font-medium">
              Visit our Support page
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
