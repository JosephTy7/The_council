"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Users, Calendar, Code, Star } from "lucide-react"
import membersData from "../../data/members.json"

interface Project {
  title: string
  description: string
  url: string
  tech: string[]
  category?: string
  status?: string
  teamMembers?: string[]
  image?: string
  featured?: boolean
}

interface Member {
  id: string
  name: string
  title: string
  theme: string
  projects: Project[]
}

const themeColors = {
  blue: {
    gradient: "from-blue-500 to-cyan-500",
    bg: "from-blue-900/20 to-cyan-900/20",
    accent: "text-blue-400",
    border: "border-blue-400/30",
  },
  purple: {
    gradient: "from-purple-500 to-pink-500",
    bg: "from-purple-900/20 to-pink-900/20",
    accent: "text-purple-400",
    border: "border-purple-400/30",
  },
  green: {
    gradient: "from-green-500 to-emerald-500",
    bg: "from-green-900/20 to-emerald-900/20",
    accent: "text-green-400",
    border: "border-green-400/30",
  },
  pink: {
    gradient: "from-pink-500 to-rose-500",
    bg: "from-pink-900/20 to-rose-900/20",
    accent: "text-pink-400",
    border: "border-pink-400/30",
  },
  gold: {
    gradient: "from-yellow-500 to-amber-500",
    bg: "from-yellow-900/20 to-amber-900/20",
    accent: "text-yellow-400",
    border: "border-yellow-400/30",
  },
}

export function WorkPage() {
  // Aggregate all projects with team member information
  const allProjects = membersData.flatMap((member) =>
    member.projects.map((project) => ({
      ...project,
      teamMembers: [member.id],
      memberName: member.name,
      memberTheme: member.theme,
      category: project.tech[0] || "Web Development",
      status: "Completed",
      featured: project.title.includes("Arts Plus") || project.title.includes("AI-Powered"),
    })),
  )

  // Group projects by category
  const projectsByCategory = allProjects.reduce(
    (acc, project) => {
      const category = project.category || "Other"
      if (!acc[category]) acc[category] = []
      acc[category].push(project)
      return acc
    },
    {} as Record<string, typeof allProjects>,
  )

  const categories = Object.keys(projectsByCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center text-white hover:text-gray-300 transition-colors group mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to The Council
          </Link>

          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Our{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Work
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Explore the innovative projects and solutions created by our talented team members. Each project
              represents our commitment to excellence and cutting-edge technology.
            </motion.p>
          </div>
        </motion.div>

        {/* Project Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: "Total Projects", value: allProjects.length.toString(), icon: "🚀" },
            { label: "Categories", value: categories.length.toString(), icon: "📁" },
            { label: "Team Members", value: membersData.length.toString(), icon: "👥" },
            { label: "Technologies", value: "20+", icon: "⚡" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allProjects
              .filter((project) => project.featured)
              .map((project, index) => (
                <ProjectCard key={`${project.title}-${index}`} project={project} featured={true} />
              ))}
          </div>
        </motion.section>

        {/* Projects by Category */}
        {categories.map((category, categoryIndex) => (
          <motion.section
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 + categoryIndex * 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-400" />
              {category}
              <span className="ml-3 text-sm text-gray-400 bg-white/10 px-3 py-1 rounded-full">
                {projectsByCategory[category].length} projects
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsByCategory[category].map((project, index) => (
                <ProjectCard key={`${project.title}-${category}-${index}`} project={project} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project, featured = false }: { project: any; featured?: boolean }) {
  const member = membersData.find((m) => m.id === project.teamMembers[0])
  const theme = themeColors[member?.theme as keyof typeof themeColors] || themeColors.blue

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 ${
        featured ? "md:col-span-1 lg:col-span-1" : ""
      }`}
    >
      {/* Project Image Placeholder */}
      <div className="relative mb-6 h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-50`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div
              className={`w-16 h-16 bg-gradient-to-r ${theme.gradient} rounded-full flex items-center justify-center mb-4 mx-auto`}
            >
              <Code className="w-8 h-8 text-white" />
            </div>
            <p className="text-white font-semibold">{project.title}</p>
          </div>
        </div>
        {featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
        </div>

        {/* Team Member */}
        <div className="flex items-center space-x-3">
          <Users className="w-4 h-4 text-gray-400" />
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 bg-gradient-to-r ${theme.gradient} rounded-full flex items-center justify-center`}>
              <span className="text-white text-xs font-bold">
                {project.memberName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </span>
            </div>
            <span className="text-gray-300 text-sm">{project.memberName}</span>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-3 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full border border-gray-600">
              +{project.tech.length - 4} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2 text-gray-400 text-xs">
            <Calendar className="w-3 h-3" />
            <span>{project.status}</span>
          </div>
          <div className="flex items-center space-x-2">
            {project.url !== "#" && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${theme.accent} hover:text-white transition-colors p-2 rounded-full hover:bg-white/10`}
                aria-label="View project"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              className={`${theme.accent} hover:text-white transition-colors p-2 rounded-full hover:bg-white/10`}
              aria-label="View code"
            >
              <Github className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
