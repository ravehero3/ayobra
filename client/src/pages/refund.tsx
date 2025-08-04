
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Refund() {
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
          
          <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-lg text-framer-muted">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">30-Day Money-Back Guarantee</h2>
              <p>If you're not satisfied with Type Beatz PRO, email <a href="mailto:app@voodoo808.com" className="text-framer-gradient-start">app@voodoo808.com</a> within 30 days of purchase with your purchase information for a full refund.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Refund Requirements</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request must be made within 30 days of purchase</li>
                <li>Provide proof of purchase (order ID or email receipt)</li>
                <li>Brief explanation of the issue (helps us improve)</li>
                <li>No abuse of refund policy (multiple refunds may be declined)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Processing Time</h2>
              <p>Refunds are typically processed within 5-7 business days. Since payments are handled by Paddle, refunds will appear as a credit from Paddle on your original payment method.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">What to Include in Your Request</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your order ID or purchase email</li>
                <li>Email address used for purchase</li>
                <li>Brief description of the issue</li>
                <li>Operating system and version (helps us improve)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact for Refunds</h2>
              <p>Email <a href="mailto:app@voodoo808.com" className="text-framer-gradient-start">app@voodoo808.com</a> with subject line "Refund Request" for fastest processing.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
