import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import ProFeatures from "@/components/sections/pro-features";
import Pricing from "@/components/sections/pricing";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[hsl(0,0%,4%)] text-white"
    >
      <Navigation />
      <Hero />
      <Features />
      <ProFeatures />
      <Pricing />
      <Footer />
    </motion.div>
  );
}
