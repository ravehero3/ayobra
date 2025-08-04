
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function License() {
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
          
          <h1 className="text-4xl font-bold mb-8">License Agreement</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-lg text-framer-muted">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">PRO License Coverage</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Lifetime access to Type Beatz PRO features</li>
                <li>Free updates for 1 year from purchase date</li>
                <li>Commercial use permitted for content creation</li>
                <li>Priority technical support</li>
                <li>Cloud sync and premium templates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Usage Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal and commercial use of generated videos</li>
                <li>Installation on up to 3 devices owned by licensee</li>
                <li>Use for client work and content creation</li>
                <li>No additional royalties or fees for created content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Restrictions</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>No resale or distribution of the software</li>
                <li>No reverse engineering or modification for redistribution</li>
                <li>License is non-transferable</li>
                <li>Cannot share license with other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Updates and Support</h2>
              <p>Free updates are provided for 1 year. After this period, major updates may require additional purchase. Priority support is included with active licenses.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Revocation</h2>
              <p>License may be revoked in cases of fraud, abuse, or violation of terms. Refunds for revoked licenses are at our discretion.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p>License questions? Email <a href="mailto:www@voodoo808.com" className="text-framer-gradient-start">www@voodoo808.com</a></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
