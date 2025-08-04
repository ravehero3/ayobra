
import { motion } from "framer-motion";
import { ArrowLeft, Play, Clock, User } from "lucide-react";
import { Link } from "wouter";

export default function Tutorials() {
  const tutorials = [
    {
      title: "Creating Your First Beat Video",
      duration: "5:32",
      level: "Beginner",
      description: "Learn the basics of importing audio and creating your first beat video with Type Beatz.",
      thumbnail: "/api/placeholder/320/180"
    },
    {
      title: "Advanced Waveform Customization",
      duration: "8:15",
      level: "Intermediate",
      description: "Dive deep into waveform styling, colors, and effects to make your videos stand out.",
      thumbnail: "/api/placeholder/320/180"
    },
    {
      title: "Batch Processing for Producers",
      duration: "6:43",
      level: "PRO",
      description: "PRO feature: Process multiple beat videos simultaneously for efficient workflow.",
      thumbnail: "/api/placeholder/320/180"
    },
    {
      title: "Template Creation & Branding",
      duration: "9:28",
      level: "PRO",
      description: "Create custom templates with your branding for consistent video styles.",
      thumbnail: "/api/placeholder/320/180"
    }
  ];

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
            <h1 className="text-4xl font-bold mb-4">Video Tutorials</h1>
            <p className="text-xl text-framer-muted">Learn Type Beatz with step-by-step video guides</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="border border-framer-border rounded-lg overflow-hidden hover:border-framer-gradient-start transition-colors group"
              >
                <div className="relative aspect-video bg-framer-muted/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-framer-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/80 px-2 py-1 rounded text-sm flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {tutorial.duration}
                  </div>
                  <div className="absolute top-4 left-4 bg-framer-gradient px-2 py-1 rounded text-sm">
                    {tutorial.level}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
                  <p className="text-framer-muted mb-4">{tutorial.description}</p>
                  <div className="flex items-center text-sm text-framer-muted">
                    <User className="w-4 h-4 mr-1" />
                    Voodoo808
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16 border border-framer-border rounded-lg p-8"
          >
            <h2 className="text-2xl font-semibold mb-4">More Tutorials Coming Soon</h2>
            <p className="text-framer-muted mb-6">
              We're creating more content to help you master Type Beatz. 
              Subscribe to our YouTube channel to get notified when new tutorials are available.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="#" 
                className="bg-framer-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-medium transition-opacity"
              >
                Subscribe on YouTube
              </a>
              <Link 
                href="/support" 
                className="border border-framer-border hover:border-framer-gradient-start text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Request Tutorial
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
