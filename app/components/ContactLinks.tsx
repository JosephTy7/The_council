"use client"

import { motion } from "framer-motion"
import { Mail, Phone, Linkedin, Github } from "lucide-react"

interface Contact {
  email: string
  phone: string
  linkedin?: string
  github?: string
}

interface ContactLinksProps {
  contact: Contact
  theme: {
    accent: string
    gradient: string
  }
}

export function ContactLinks({ contact, theme }: ContactLinksProps) {
  const links = [
    { icon: Mail, href: `mailto:${contact.email}`, label: "Email" },
    { icon: Phone, href: `tel:${contact.phone}`, label: "Phone" },
    ...(contact.linkedin ? [{ icon: Linkedin, href: contact.linkedin, label: "LinkedIn" }] : []),
    ...(contact.github ? [{ icon: Github, href: contact.github, label: "GitHub" }] : []),
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {links.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center p-3 bg-gradient-to-r ${theme.gradient} rounded-xl text-white hover:shadow-lg transition-all duration-300 group`}
        >
          <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="sr-only">{link.label}</span>
        </motion.a>
      ))}
    </div>
  )
}
