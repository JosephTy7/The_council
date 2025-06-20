"use client"

import { motion } from "framer-motion"
import { ExternalLink, Code } from "lucide-react"

interface Project {
  title: string
  description: string
  url: string
  tech: string[]
}

interface ProjectCardProps {
  project: Project
  theme: {
    gradient: string
    accent: string
  }
  delay: number
}

export function ProjectCard({ project, theme, delay }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Code className={`w-5 h-5 ${theme.accent}`} />
          <h3 className="text-white font-bold text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
            {project.title}
          </h3>
        </div>
        {project.url !== "#" && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${theme.accent} hover:text-white transition-colors p-1 rounded-full hover:bg-white/10`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech, index) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: delay + index * 0.05 }}
            className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600 hover:border-gray-400 transition-colors"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}
