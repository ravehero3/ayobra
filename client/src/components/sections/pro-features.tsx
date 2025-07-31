import { motion } from "framer-motion";
import { Zap, Layout, Shield, Layers, Settings, Cloud } from "lucide-react";

const proFeatures = [
  {
    icon: Zap,
    title: "Unlimited Processing",
    description: "Generate unlimited videos with no restrictions. Perfect for high-volume producers and music labels."
  },
  {
    icon: Layout,
    title: "Custom Templates",
    description: "Access premium video layouts, custom branding options, and advanced visual effects for unique content."
  },
  {
    icon: Shield,
    title: "Priority Support",
    description: "Get direct access to our development team with priority email support and feature requests."
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description: "Process multiple audio-image pairs simultaneously with advanced queue management and automation."
  },
  {
    icon: Settings,
    title: "Advanced Settings",
    description: "Fine-tune video quality, custom resolutions, advanced audio processing, and export settings."
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description: "Sync your projects across devices with cloud storage and automatic backup for your video templates."
  }
];

export default function ProFeatures() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[hsl(0,0%,10%)]/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Unlock PRO Features</h2>
          <p className="text-xl text-[hsl(0,0%,62.7%)] max-w-2xl mx-auto">
            Take your type beat video production to the next level with advanced tools and unlimited processing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[hsl(0,0%,4%)] border border-[hsl(0,0%,16%)] rounded-xl p-8"
              data-testid={`pro-feature-${index}`}
            >
              <div className="w-12 h-12 bg-[hsl(217,91%,60%)] rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-[hsl(0,0%,62.7%)]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
