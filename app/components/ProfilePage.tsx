"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Award, Camera, Upload, X, Check, Lock } from "lucide-react"
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
  gold: {
    gradient: "from-yellow-500 to-amber-500",
    bg: "from-gray-900/80 to-gray-800/80",
    accent: "text-yellow-400",
    glow: "shadow-yellow-500/20",
  },
  sky: {
    gradient: "from-sky-500 to-green-500",
    bg: "from-sky-900/20 to-green-900/20",
    accent: "text-sky-400",
    glow: "shadow-sky-500/20",
  },
}

// Secure admin password - Change this to your preferred password
const ADMIN_PASSWORD = "TheCouncil2024!"

export function ProfilePage({ member }: ProfilePageProps) {
  const [currentAvatar, setCurrentAvatar] = useState(member.avatar)
  const [isUploading, setIsUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const theme = themeColors[member.theme as keyof typeof themeColors] || themeColors.blue

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setShowPasswordModal(false)
      setShowUploadModal(true)
      setPassword("")
      setPasswordError("")
    } else {
      setPasswordError("Incorrect password. Access denied.")
      setPassword("")
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreviewImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!previewImage) return

    setIsUploading(true)

    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update the avatar
    setCurrentAvatar(previewImage)
    setIsUploading(false)
    setShowUploadModal(false)
    setPreviewImage(null)
    setIsAuthenticated(false) // Reset authentication after upload
  }

  const handleCancel = () => {
    setPreviewImage(null)
    setShowUploadModal(false)
    setShowPasswordModal(false)
    setPassword("")
    setPasswordError("")
    setIsAuthenticated(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getPlaceholderImage = () => {
    if (!member.name) return "/placeholder.svg?height=200&width=200"

    const initials = member.name
      .split(" ")
      .map((n) => n[0])
      .join("")
    return `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(initials)}&bg=4F46E5&color=ffffff`
  }

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

        {/* Centered Profile Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 flex justify-center lg:justify-start"
            >
              <div
                className={`bg-gradient-to-br ${theme.bg} backdrop-blur-lg rounded-3xl p-8 border border-white/20 sticky top-8 ${theme.glow} shadow-2xl w-full max-w-sm`}
              >
                <div className="text-center mb-8">
                  <div className="relative mb-6 flex justify-center">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} rounded-full blur-2xl opacity-60`}
                    />

                    {/* Integrated Image Upload */}
                    <div className="relative group">
                      <Image
                        src={currentAvatar || getPlaceholderImage()}
                        alt={member.name}
                        width={200}
                        height={200}
                        className="relative z-10 w-40 h-40 object-cover rounded-full border-4 border-white/30"
                      />

                      {/* Secure Upload Overlay */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowPasswordModal(true)}
                        className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                      >
                        <div className="text-center">
                          <Lock className="w-5 h-5 text-white mx-auto mb-1" />
                          <Camera className="w-6 h-6 text-white mx-auto mb-1" />
                          <span className="text-white text-xs font-medium">Admin Only</span>
                        </div>
                      </motion.button>
                    </div>

                    <div className="absolute top-2 right-12 w-6 h-6 bg-green-400 rounded-full border-4 border-white z-30"></div>
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

            {/* Main Content - Centered */}
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

        {/* Password Authentication Modal */}
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && handleCancel()}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Admin Access Required
                </h3>
                <button onClick={handleCancel} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Enter admin password to change profile picture:
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter password..."
                    autoFocus
                  />
                  {passwordError && <p className="text-red-400 text-sm mt-2">{passwordError}</p>}
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`flex-1 px-4 py-3 bg-gradient-to-r ${theme.gradient} text-white rounded-xl font-medium hover:opacity-90 transition-opacity`}
                  >
                    Authenticate
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Image Upload Modal */}
        {showUploadModal && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && handleCancel()}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Update Profile Picture</h3>
                <button onClick={handleCancel} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {!previewImage ? (
                <div className="space-y-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-gray-500 transition-colors"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-white font-medium mb-2">Click to upload image</p>
                    <p className="text-gray-400 text-sm">PNG, JPG up to 5MB</p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <Image
                        src={previewImage || "/placeholder.svg"}
                        alt="Preview"
                        width={150}
                        height={150}
                        className="w-32 h-32 object-cover rounded-full border-4 border-white/30"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} rounded-full opacity-20`} />
                    </div>
                    <p className="text-gray-300 text-sm mt-4">Preview of your new profile picture</p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleCancel}
                      className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      onClick={handleUpload}
                      disabled={isUploading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 px-4 py-3 bg-gradient-to-r ${theme.gradient} text-white rounded-xl font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isUploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Upload</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
