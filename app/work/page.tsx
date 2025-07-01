import type { Metadata } from "next"
import { WorkPage } from "../components/WorkPage"

export const metadata: Metadata = {
  title: "Our Work - The Council",
  description: "Explore the innovative projects and solutions created by The Council team members.",
  keywords: "projects, portfolio, web development, AI, design, The Council",
}

export default function Work() {
  return <WorkPage />
}
