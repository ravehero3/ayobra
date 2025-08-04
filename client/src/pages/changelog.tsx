
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "wouter";

export default function Changelog() {
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
          
          <h1 className="text-4xl font-bold mb-8">Changelog</h1>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border border-framer-border rounded-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-5 h-5 text-framer-gradient-start" />
                <h2 className="text-2xl font-semibold">v1.0.0</h2>
                <span className="text-framer-muted">{new Date().toLocaleDateString()}</span>
              </div>
              <h3 className="text-lg font-medium mb-3 text-framer-gradient-start">Initial Public PRO Release</h3>
              <ul className="list-disc pl-6 space-y-2 text-framer-muted">
                <li>Unlimited video generation for PRO users</li>
                <li>4K export quality support</li>
                <li>Batch processing for multiple videos</li>
                <li>Cloud sync for templates and projects</li>
                <li>Priority email support</li>
                <li>Advanced waveform visualization</li>
                <li>Custom branding and templates</li>
                <li>Drag & drop interface</li>
                <li>Real-time preview</li>
                <li>Multi-platform support (Mac & Windows)</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="border border-framer-border rounded-lg p-6 opacity-60"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-5 h-5 text-framer-muted" />
                <h2 className="text-2xl font-semibold">v0.9.0</h2>
                <span className="text-framer-muted">Beta Release</span>
              </div>
              <h3 className="text-lg font-medium mb-3">Pre-launch Testing</h3>
              <ul className="list-disc pl-6 space-y-2 text-framer-muted">
                <li>Core video generation functionality</li>
                <li>Basic waveform rendering</li>
                <li>Template system implementation</li>
                <li>Initial UI/UX design</li>
              </ul>
            </motion.div>

            <div className="text-center py-8">
              <p className="text-framer-muted">More updates coming soon! Follow us for the latest features.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
