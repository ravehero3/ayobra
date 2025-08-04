
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Terms() {
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
          
          <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-lg text-framer-muted">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Seller Identity</h2>
              <p>Type Beatz is a product of Voodoo808, a Czech music production studio. For business inquiries, contact <a href="mailto:app@voodoo808.com" className="text-framer-gradient-start">app@voodoo808.com</a>.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
              <p>Type Beatz is a desktop application for creating professional beat videos with waveform visualization, custom layouts, and export capabilities for social media platforms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Purchase Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>PRO license: $79 one-time payment for lifetime access</li>
                <li>Includes: Unlimited videos, 4K export, batch processing, premium templates, cloud sync</li>
                <li>Free updates for 1 year from purchase date</li>
                <li>Priority email support included</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">License Grant</h2>
              <p>The PRO license grants you a non-transferable, personal use license. You may not redistribute, resell, or modify the software for commercial distribution.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitations of Liability</h2>
              <p>Type Beatz is provided "as is" without warranties. We are not liable for any indirect damages or loss of data. Our liability is limited to the purchase price.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
              <p>See our <Link href="/refund" className="text-framer-gradient-start">Refund Policy</Link> for complete terms and conditions regarding refunds.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
              <p>These terms are governed by Czech Republic law. Any disputes will be resolved in Czech courts.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p>Questions about these terms? Email <a href="mailto:app@voodoo808.com" className="text-framer-gradient-start">app@voodoo808.com</a></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
