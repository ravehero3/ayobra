
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Privacy() {
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
          
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-lg text-framer-muted">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
              <p>Type Beatz is developed by Voodoo808, a Czech music production studio creating tools for modern producers. Contact us at <a href="mailto:app@voodoo808.com" className="text-framer-gradient-start">app@voodoo808.com</a>.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">What Data We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email address for contact and purchase communications</li>
                <li>Usage analytics to improve product performance</li>
                <li>Purchase data processed by Paddle for order fulfillment</li>
                <li>Authentication and session information if applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Order fulfillment and customer support</li>
                <li>Product improvements and security</li>
                <li>Communication about updates and features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Third Parties</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Paddle for payment processing and receipts</li>
                <li>Hosting and infrastructure providers</li>
                <li>Analytics services for product improvement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p>You have the right to access, modify, or delete your personal data. Contact us at <a href="mailto:www@voodoo808.com" className="text-framer-gradient-start">www@voodoo808.com</a> for any requests.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p>For any privacy-related questions, email us at <a href="mailto:www@voodoo808.com" className="text-framer-gradient-start">www@voodoo808.com</a>.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
