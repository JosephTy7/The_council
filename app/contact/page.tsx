import type { Metadata } from "next"
import { ContactPage } from "../components/ContactPage"

export const metadata: Metadata = {
  title: "Get in Touch - The Council",
  description: "Contact The Council team for your next project. We're here to help bring your ideas to life.",
  keywords: "contact, hire, development, design, The Council",
}

export default function Contact() {
  return <ContactPage />
}
