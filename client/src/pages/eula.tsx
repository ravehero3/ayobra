
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function EULA() {
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
          
          <h1 className="text-4xl font-bold mb-8">End User License Agreement (EULA)</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-lg text-framer-muted">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Installation Rights</h2>
              <p>You may install and use Type Beatz on up to 3 devices that you own or control. Installation on shared or public computers is prohibited.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Prohibited Activities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reverse engineering, decompiling, or disassembling the software</li>
                <li>Removing or modifying copyright notices</li>
                <li>Creating derivative works based on the software</li>
                <li>Sharing license keys or access credentials</li>
                <li>Using the software for illegal activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Updates and Modifications</h2>
              <p>We may provide updates to improve functionality and security. Updates may modify or remove features. Continued use after updates constitutes acceptance of changes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Obligations</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use software in compliance with applicable laws</li>
                <li>Maintain confidentiality of license information</li>
                <li>Report security vulnerabilities responsibly</li>
                <li>Use reasonable care to prevent unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranty</h2>
              <p>Type Beatz is provided "AS IS" without warranty of any kind. We disclaim all warranties, express or implied, including warranties of merchantability and fitness for a particular purpose.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p>Our liability for damages is limited to the amount paid for the software. We are not liable for indirect, consequential, or incidental damages.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <p>This license terminates automatically if you violate any terms. Upon termination, you must destroy all copies of the software.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p>EULA questions? Email <a href="mailto:app@voodoo808.com" className="text-framer-gradient-start">app@voodoo808.com</a></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
