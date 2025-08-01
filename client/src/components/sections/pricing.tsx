import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "5 videos per month",
      "1080p HD export",
      "Basic templates",
      "Community support"
    ],
    cta: "Get Started Free",
    popular: false
  },
  {
    name: "PRO",
    price: "$29",
    period: "/month",
    description: "For serious producers",
    features: [
      "Unlimited videos",
      "4K export quality",
      "Premium templates",
      "Batch processing",
      "Priority support",
      "Cloud sync"
    ],
    cta: "Upgrade to PRO",
    popular: true
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-xl text-framer-muted">Start free, upgrade when you need more power.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 ${
                tier.popular
                  ? "bg-gradient-to-br from-framer-gradient-start/10 to-framer-gradient-end/5 border border-framer-gradient-start/30"
                  : "bg-framer-surface border border-framer-border"
              }`}
              data-testid={`pricing-tier-${tier.name.toLowerCase()}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-framer-gradient text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold mb-4">
                  {tier.price}
                  {tier.period && <span className="text-lg text-[hsl(0,0%,62.7%)]">{tier.period}</span>}
                </div>
                <p className="text-[hsl(0,0%,62.7%)]">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-[hsl(217,91%,60%)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-3 font-semibold transition-all ${
                  tier.popular
                    ? "bg-[hsl(217,91%,60%)] hover:bg-[hsl(214,95%,68%)] text-white"
                    : "bg-[hsl(0,0%,10%)] border border-[hsl(0,0%,16%)] hover:border-[hsl(217,91%,60%)] text-white"
                }`}
                data-testid={`pricing-cta-${tier.name.toLowerCase()}`}
              >
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
