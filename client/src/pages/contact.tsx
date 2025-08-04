
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:www@voodoo808.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/" className="inline-flex items-center text-framer-gradient-start hover:text-framer-gradient-end mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-framer-muted">Get in touch with the Type Beatz team</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your name"
                      required
                      className="bg-framer-muted/10 border-framer-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your@email.com"
                      required
                      className="bg-framer-muted/10 border-framer-border"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-framer-muted/10 border border-framer-border rounded-md px-3 py-2 text-white"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="Support">Support</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    required
                    className="bg-framer-muted/10 border-framer-border"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-framer-gradient hover:opacity-90">
                  Send Message
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-6">Get in touch</h2>
                <p className="text-framer-muted mb-8">
                  We're here to help with any questions about Type Beatz. Whether you need support, 
                  want to share feedback, or explore partnership opportunities, we'd love to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-framer-gradient-start mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-framer-muted">www@voodoo808.com</p>
                    <p className="text-sm text-framer-muted">We typically respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MessageCircle className="w-6 h-6 text-framer-gradient-start mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Discord</h3>
                    <p className="text-framer-muted">Join our community</p>
                    <p className="text-sm text-framer-muted">Real-time chat with other producers</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-framer-gradient-start mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Location</h3>
                    <p className="text-framer-muted">Czech Republic</p>
                    <p className="text-sm text-framer-muted">Voodoo808 Music Studio</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-framer-gradient-start mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Response Time</h3>
                    <p className="text-framer-muted">24-48 hours</p>
                    <p className="text-sm text-framer-muted">PRO users get priority support</p>
                  </div>
                </div>
              </div>

              <div className="border border-framer-border rounded-lg p-6">
                <h3 className="font-medium mb-3">Need immediate help?</h3>
                <p className="text-framer-muted text-sm mb-4">
                  Check our support page for common questions and troubleshooting guides.
                </p>
                <Link href="/support" className="text-framer-gradient-start hover:text-framer-gradient-end font-medium">
                  Visit Support →
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
