import { motion } from "framer-motion";
import { FolderOpen, Mail, Twitter, Youtube, Github } from "lucide-react";

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Download", href: "#download" },
      { name: "Changelog", href: "#" }
    ]
  },
  {
    title: "Support",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Tutorials", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Discord", href: "#" }
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "License", href: "#" },
      { name: "EULA", href: "#" }
    ]
  }
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Github, href: "#", label: "GitHub" }
];

export default function Footer() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-framer-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-framer-gradient rounded-lg flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Type Beatz</span>
            </div>
            <p className="text-framer-muted mb-4">
              The ultimate desktop app for creating professional beat videos.
            </p>
            <a
              href="mailto:app@voodoo808.com"
              className="text-framer-gradient-start hover:text-framer-gradient-end transition-colors flex items-center space-x-2"
              data-testid="contact-email"
            >
              <Mail className="w-4 h-4" />
              <span>app@voodoo808.com</span>
            </a>
          </motion.div>

          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-[hsl(0,0%,62.7%)]">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors"
                      data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[hsl(0,0%,16%)]"
        >
          <p className="text-[hsl(0,0%,62.7%)] mb-4 md:mb-0">
            © 2024 Voodoo808. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-[hsl(0,0%,62.7%)] hover:text-white transition-colors"
                data-testid={`social-${social.label.toLowerCase()}`}
              >
                <span className="sr-only">{social.label}</span>
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
