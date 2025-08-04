
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MessageCircle, HelpCircle } from "lucide-react";
import { Link } from "wouter";

export default function Support() {
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
          
          <h1 className="text-4xl font-bold mb-8">Support</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border border-framer-border rounded-lg p-6"
            >
              <Mail className="w-8 h-8 text-framer-gradient-start mb-4" />
              <h2 className="text-xl font-semibold mb-3">Email Support</h2>
              <p className="text-framer-muted mb-4">Get help directly from our team. PRO users receive priority support.</p>
              <a 
                href="mailto:www@voodoo808.com" 
                className="text-framer-gradient-start hover:text-framer-gradient-end font-medium"
              >
                www@voodoo808.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="border border-framer-border rounded-lg p-6"
            >
              <MessageCircle className="w-8 h-8 text-framer-gradient-start mb-4" />
              <h2 className="text-xl font-semibold mb-3">Discord Community</h2>
              <p className="text-framer-muted mb-4">Join our community for tips, tricks, and peer support.</p>
              <a 
                href="#" 
                className="text-framer-gradient-start hover:text-framer-gradient-end font-medium"
              >
                Join Discord
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 mr-3 text-framer-gradient-start" />
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="border border-framer-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">How do I download Type Beatz after purchase?</h3>
                <p className="text-framer-muted">After purchasing through Paddle, you'll receive an email with download links for both Mac and Windows versions. You can also access downloads from your account dashboard.</p>
              </div>

              <div className="border border-framer-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">How do I activate my PRO license?</h3>
                <p className="text-framer-muted">Your license key will be provided in your purchase confirmation email. Enter it in the app when prompted after installation.</p>
              </div>

              <div className="border border-framer-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">What are the system requirements?</h3>
                <p className="text-framer-muted">Mac: macOS 10.13 or later. Windows: Windows 10 or 11. 4GB RAM minimum, 8GB recommended for 4K rendering.</p>
              </div>

              <div className="border border-framer-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Can I get a refund?</h3>
                <p className="text-framer-muted">Yes! We offer a 30-day money-back guarantee. See our <Link href="/refund" className="text-framer-gradient-start">Refund Policy</Link> for details.</p>
              </div>

              <div className="border border-framer-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">How do I report a bug or request a feature?</h3>
                <p className="text-framer-muted">Email us at <a href="mailto:app@voodoo808.com" className="text-framer-gradient-start">app@voodoo808.com</a> with detailed information about the issue or your feature request.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
