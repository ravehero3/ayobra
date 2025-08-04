import { motion } from "framer-motion";
import { MousePointer, Music, Video } from "lucide-react";

const features = [
  {
    icon: MousePointer,
    title: "Drag & Drop Interface",
    description: "Drop in your audio and image files. Type Beatz auto-pairs them and sets up your video in seconds."
  },
  {
    icon: Music,
    title: "Waveform Visualization",
    description: "Real-time waveform preview with playback controls so you see exactly how your video will look before exporting."
  },
  {
    icon: Video,
    title: "HD & 4K Video Generation",
    description: "Generate MP4 videos in 1080p or 4K, ready to upload to YouTube or share on social media."
  }
];

const featureImages = [
  {
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    alt: "Waveform editing interface showing audio visualization",
    title: "Smart Audio Processing",
    description: "Advanced waveform analysis with real-time playback and precise audio positioning for perfect video synchronization."
  },
  {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    alt: "Video generation progress interface with concurrent processing",
    title: "Concurrent Processing",
    description: "Generate multiple videos simultaneously with real-time progress tracking and instant cancellation capabilities."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-framer-muted max-w-2xl mx-auto">
            Everything you need to create professional type beat videos with ease and speed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-framer-surface border border-framer-border rounded-xl p-8 hover:border-framer-gradient-start/50 transition-all"
              data-testid={`feature-card-${index}`}
            >
              <div className="w-12 h-12 bg-framer-gradient rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-framer-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Feature Screenshots */}
        <div className="grid md:grid-cols-2 gap-8">
          {featureImages.map((image, index) => (
            <motion.div
              key={image.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="rounded-xl border border-[hsl(0,0%,16%)]"
                data-testid={`feature-image-${index}`}
              />
              <div className="bg-[hsl(0,0%,10%)] border border-[hsl(0,0%,16%)] rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-2">{image.title}</h4>
                <p className="text-[hsl(0,0%,62.7%)]">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
