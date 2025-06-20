"use client"

import type React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Star, Award, MapPin } from "lucide-react"

interface Member {
  id: string
  name: string
  title: string
  avatar: string
  location: string
  theme: string
  bio: string
}

interface EnhancedAvatarCardProps {
  member: Member
  isSelected: boolean
  onHover: (id: string | null) => void
  index: number
}

const themeColors = {
  blue: {
    gradient: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/50",
    border: "border-blue-400/30",
    hoverBorder: "hover:border-blue-400/80",
    accent: "text-blue-400",
    bg: "from-blue-500/20 to-cyan-500/20",
    particle: "bg-blue-400",
  },
  purple: {
    gradient: "from-purple-500 to-pink-500",
    glow: "shadow-purple-500/50",
    border: "border-purple-400/30",
    hoverBorder: "hover:border-purple-400/80",
    accent: "text-purple-400",
    bg: "from-purple-500/20 to-pink-500/20",
    particle: "bg-purple-400",
  },
  green: {
    gradient: "from-green-500 to-emerald-500",
    glow: "shadow-green-500/50",
    border: "border-green-400/30",
    hoverBorder: "hover:border-green-400/80",
    accent: "text-green-400",
    bg: "from-green-500/20 to-emerald-500/20",
    particle: "bg-green-400",
  },
  pink: {
    gradient: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/50",
    border: "border-pink-400/30",
    hoverBorder: "hover:border-pink-400/80",
    accent: "text-pink-400",
    bg: "from-pink-500/20 to-rose-500/20",
    particle: "bg-pink-400",
  },
}

const memberTaglines = {
  "joseph-mwamba": "Crafting pixel-perfect web experiences with modern frameworks",
  "taizya-simunza": "Bridging creativity and technology through innovative design solutions",
  "gary-mbuyi": "Building scalable applications with cutting-edge technologies",
  "emmanuel-zulu": "Developing intelligent AI-powered solutions for tomorrow's challenges",
}

const memberStats = {
  "joseph-mwamba": { projects: "8+", rating: 4.9, specialty: "Frontend" },
  "taizya-simunza": { projects: "12+", rating: 4.8, specialty: "Full-Stack" },
  "gary-mbuyi": { projects: "6+", rating: 4.7, specialty: "Backend" },
  "emmanuel-zulu": { projects: "5+", rating: 4.8, specialty: "AI/ML" },
}

export function EnhancedAvatarCard({ member, isSelected, onHover, index }: EnhancedAvatarCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const theme = themeColors[member.theme as keyof typeof themeColors] || themeColors.blue
  const stats = memberStats[member.id as keyof typeof memberStats]

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const springConfig = { damping: 15, stiffness: 300 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
    onHover(null)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover(member.id)
  }

  const getPlaceholderImage = () => {
    const colors = {
      blue: "4F46E5,06B6D4",
      purple: "8B5CF6,EC4899",
      green: "10B981,059669",
      pink: "EC4899,F43F5E",
    }
    const colorPair = colors[member.theme as keyof typeof colors] || colors.blue
    return `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(
      member.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
    )}&bg=${colorPair.split(",")[0]}&color=ffffff`
  }

  return (
    <Link href={`/member/${member.id}`} className="block">
      <motion.div
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.95 }}
        className="relative group cursor-pointer perspective-1000"
      >
        <motion.div
          animate={{
            scale: isSelected || isHovered ? 1.05 : 1,
            y: isSelected || isHovered ? -15 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border-2 ${theme.border} ${theme.hoverBorder} transition-all duration-500 ${
            isSelected || isHovered ? `${theme.glow} shadow-2xl` : ""
          } overflow-hidden`}
        >
          {/* Animated Background Gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isSelected || isHovered ? 0.1 : 0,
              scale: isSelected || isHovered ? 1.2 : 0.8,
            }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-br ${theme.bg} rounded-3xl`}
          />

          {/* Enhanced Selection Indicator */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isSelected || isHovered ? 1 : 0,
              opacity: isSelected || isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="absolute -top-3 -right-3 z-20"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 bg-green-400 rounded-full"
              />
            </div>
          </motion.div>

          {/* Member Rank Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="absolute top-4 left-4 z-10"
          >
            <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
              <Award className="w-3 h-3 text-yellow-400" />
              <span className="text-white text-xs font-bold">#{String(index + 1).padStart(2, "0")}</span>
            </div>
          </motion.div>

          {/* Enhanced Avatar Section */}
          <motion.div
            animate={{
              rotateY: isHovered ? 8 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="relative mb-6 z-10"
          >
            {/* Glow Effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} rounded-full blur-2xl opacity-0 transition-opacity duration-500 scale-110 ${
                isSelected || isHovered ? "opacity-60" : ""
              }`}
            />

            {/* Avatar Ring */}
            <motion.div
              animate={{ rotate: isHovered ? 180 : 0 }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} rounded-full p-1 opacity-30`}
            />

            <Image
              src={getPlaceholderImage() || "/placeholder.svg"}
              alt={member.name}
              width={200}
              height={200}
              className="relative z-10 w-40 h-40 mx-auto object-cover rounded-full border-4 border-white/30 transition-all duration-300"
              priority={index < 2}
            />

            {/* Status Indicators */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-12 w-6 h-6 bg-green-400 rounded-full border-4 border-white z-20 shadow-lg"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-full h-full bg-green-400 rounded-full"
              />
            </motion.div>

            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20"
            >
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-gray-300" />
                <span className="text-xs text-gray-300">{member.location}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Content Section */}
          <div className="text-center space-y-4 relative z-10">
            <motion.h3
              animate={{
                color: isSelected || isHovered ? "transparent" : "#ffffff",
              }}
              className="text-2xl font-bold text-white transition-all duration-300"
              style={{
                backgroundImage:
                  isSelected || isHovered
                    ? `linear-gradient(45deg, ${theme.gradient.replace("from-", "").replace(" to-", ", ")})`
                    : undefined,
                backgroundClip: isSelected || isHovered ? "text" : undefined,
                WebkitBackgroundClip: isSelected || isHovered ? "text" : undefined,
              }}
            >
              {member.name}
            </motion.h3>

            <p className={`${theme.accent} font-semibold text-lg mb-2`}>{member.title}</p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              className="flex justify-center space-x-4 mb-4"
            >
              <div className="text-center">
                <div className="text-white font-bold text-sm">{stats.projects}</div>
                <div className="text-gray-400 text-xs">Projects</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="text-white font-bold text-sm">{stats.rating}</span>
                </div>
                <div className="text-gray-400 text-xs">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-sm">{stats.specialty}</div>
                <div className="text-gray-400 text-xs">Focus</div>
              </div>
            </motion.div>

            {/* Animated Divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: isSelected || isHovered ? "100%" : "0%",
              }}
              transition={{ duration: 0.4 }}
              className={`h-0.5 bg-gradient-to-r ${theme.gradient} mx-auto transition-all duration-300 rounded-full`}
            />

            {/* Enhanced Hover Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
                height: isHovered ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 mt-4">
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {memberTaglines[member.id as keyof typeof memberTaglines]}
                </p>
                <div className={`text-sm ${theme.accent} font-medium flex items-center justify-center space-x-2`}>
                  <span>View Full Profile</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Floating Particles */}
          {(isSelected || isHovered) && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                  className={`absolute w-1 h-1 ${theme.particle} rounded-full`}
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + (i % 3) * 15}%`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Hover Glow Effect */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.3 : 0,
              scale: isHovered ? 1.1 : 0.9,
            }}
            className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} rounded-3xl blur-xl -z-10`}
          />
        </motion.div>
      </motion.div>
    </Link>
  )
}
