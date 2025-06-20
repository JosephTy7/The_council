"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Award } from "lucide-react"
import { SkillBar } from "./SkillBar"
import { ProjectCard } from "./ProjectCard"
import { ContactLinks } from "./ContactLinks"

interface Member {
  id: string
  name: string
  title: string
  avatar: string
  location: string
  theme: string
  contact: {
    email: string
    phone: string
    linkedin?: string
    github?: string
  }
  bio: string
  education: Array<{
    degree: string
    institution: string
    year: string
    description: string
  }>
  experience: Array<{
    role: string
    company: string
    period: string
    description: string
  }>
  skills: Array<{
    name: string
    level: number
  }>
  softSkills: string[]
  projects: Array<{
    title: string
    description: string
    url: string
    tech: string[]
  }>
  certifications: string[]
}

interface ProfilePageProps {
  member: Member
}

const themeColors = {
  blue: {
    gradient: "from-blue-500 to-cyan-500",
    bg: "from-blue-900/20 to-cyan-900/20",
    accent: "text-blue-400",
    glow: "shadow-blue-500/20",
  },
  purple: {
    gradient: "from-purple-500 to-pink-500",
    bg: "from-purple-900/20 to-pink-900/20",
    accent: "text-purple-400",
    glow: "shadow-purple-500/20",
  },
  green: {
    gradient: "from-green-500 to-emerald-500",
    bg: "from-green-900/20 to-emerald-900/20",
    accent: "text-green-400",
    glow: "shadow-green-500/20",
  },
  pink: {
    gradient: "from-pink-500 to-rose-500",
    bg: "from-pink-900/20 to-rose-900/20",
    accent: "text-pink-400",
    glow: "shadow-pink-500/20",
  },
}

export function ProfilePage({ member }: ProfilePageProps) {
  const theme = themeColors[member.theme as keyof typeof themeColors] || themeColors.blue

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center text-white hover:text-gray-300 transition-colors group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to The Council
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div
              className={`bg-gradient-to-br ${theme.bg} backdrop-blur-lg rounded-3xl p-8 border border-white/20 sticky top-8 ${theme.glow} shadow-2xl`}
            >
              <div className="text-center mb-8">
                <div className="relative mb-6">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} rounded-full blur-2xl opacity-60`}
                  />
                  <Image
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="relative z-10 w-40 h-40 mx-auto object-cover rounded-full border-4 border-white/30"
                  />
                  <div className="absolute top-2 right-12 w-6 h-6 bg-green-400 rounded-full border-4 border-white z-20"></div>
                </div>
                <h1 className="text-3xl font-bold text-white mb-3">{member.name}</h1>
                <p className={`${theme.accent} font-semibold text-lg mb-4`}>{member.title}</p>
                <div className="flex items-center justify-center text-gray-300 text-sm mb-6">
                  <MapPin className="w-4 h-4 mr-2" />
                  {member.location}
                </div>
                <div className={`w-full h-0.5 bg-gradient-to-r ${theme.gradient} rounded-full`}></div>
              </div>

              <ContactLinks contact={member.contact} theme={theme} />

              <div className="mt-8">
                <h3 className="text-white font-bold mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Core Strengths
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {member.softSkills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`px-3 py-2 bg-gradient-to-r ${theme.gradient} text-white text-xs rounded-xl text-center font-medium`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            >
              <h2 className={`text-2xl font-bold ${theme.accent} mb-6 flex items-center`}>
                About {member.name.split(" ")[0]}
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">{member.bio}</p>
            </motion.section>

            {/* Skills Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            >
              <h2 className={`text-2xl font-bold ${theme.accent} mb-6`}>Technical Expertise</h2>
              <div className="space-y-6">
                {member.skills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} theme={theme} delay={index * 0.1} />
                ))}
              </div>
            </motion.section>

            {/* Experience Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            >
              <h2 className={`text-2xl font-bold ${theme.accent} mb-6 flex items-center`}>
                <Calendar className="w-6 h-6 mr-2" />
                Professional Journey
              </h2>
              <div className="space-y-6">
                {member.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-8 border-l-2 border-gray-600 hover:border-gray-400 transition-colors"
                  >
                    <div
                      className={`absolute -left-2 top-0 w-4 h-4 bg-gradient-to-r ${theme.gradient} rounded-full`}
                    ></div>
                    <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                    <p className={`${theme.accent} font-medium`}>
                      {exp.company} • {exp.period}
                    </p>
                    <p className="text-gray-300 mt-2 leading-relaxed">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            >
              <h2 className={`text-2xl font-bold ${theme.accent} mb-6`}>Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {member.projects.map((project, index) => (
                  <ProjectCard key={project.title} project={project} theme={theme} delay={index * 0.1} />
                ))}
              </div>
            </motion.section>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
              >
                <h2 className={`text-2xl font-bold ${theme.accent} mb-6`}>Education</h2>
                <div className="space-y-6">
                  {member.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <h3 className="text-white font-bold">{edu.degree}</h3>
                      <p className={`${theme.accent} font-medium`}>{edu.institution}</p>
                      <p className="text-gray-400 text-sm">{edu.year}</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{edu.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
              >
                <h2 className={`text-2xl font-bold ${theme.accent} mb-6`}>Certifications</h2>
                <div className="space-y-4">
                  {member.certifications.map((cert, index) => (
                    <motion.div
                      key={cert}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start text-gray-300"
                    >
                      <div
                        className={`w-3 h-3 bg-gradient-to-r ${theme.gradient} rounded-full mr-3 mt-1 flex-shrink-0`}
                      />
                      <span className="text-sm leading-relaxed">{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
