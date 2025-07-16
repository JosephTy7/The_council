"use client"

import type React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Member {
  id: string
  name: string
  title: string
  avatar: string
  location: string
  theme: string
  bio: string
}

interface AvatarCardProps {
  member: Member
  isSelected: boolean
  onHover: (id: string | null) => void
  index: number
}

const themeColors = {
  blue: {
    gradient: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/40",
    border: "border-blue-400/30",
    hoverBorder: "hover:border-blue-400/70",
    accent: "text-blue-400",
    bg: "from-blue-500/15 to-cyan-500/15",
  },
  purple: {
    gradient: "from-purple-500 to-pink-500",
    glow: "shadow-purple-500/40",
    border: "border-purple-400/30",
    hoverBorder: "hover:border-purple-400/70",
    accent: "text-purple-400",
    bg: "from-purple-500/15 to-pink-500/15",
  },
  green: {
    gradient: "from-green-500 to-emerald-500",
    glow: "shadow-green-500/40",
    border: "border-green-400/30",
    hoverBorder: "hover:border-green-400/70",
    accent: "text-green-400",
    bg: "from-green-500/15 to-emerald-500/15",
  },
  pink: {
    gradient: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/40",
    border: "border-pink-400/30",
    hoverBorder: "hover:border-pink-400/70",
    accent: "text-pink-400",
    bg: "from-pink-500/15 to-rose-500/15",
  },
}

const memberTaglines = {
  "joseph-mwamba": "Crafting pixel-perfect web experiences with Next.js and modern frameworks",
  "taizya-simunza": "Bridging creativity and technology through innovative design solutions",
  "gary-mbuyi": "Building scalable applications with cutting-edge technologies",
  "emmanuel-zulu": "Developing intelligent AI-powered solutions for tomorrow's challenges",
}

export function AvatarCard({ member, isSelected, onHover, index }: AvatarCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const theme = themeColors[member.theme as keyof typeof themeColors] || themeColors.blue

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [8, -8])
  const rotateY = useTransform(x, [-100, 100], [-8, 8])

  const springConfig = { damping: 25, stiffness: 400 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((event.clientX - centerX) * 0.3)
    y.set((event.clientY - centerY) * 0.3)
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

  // Generate placeholder image URL based on member theme
  const getPlaceholderImage = () => {
    // Use the actual avatar from member data, fallback to a simple placeholder if needed
    return (
      member.avatar ||
      `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(
        member.name
          .split(" ")
          .map((n) => n[0])
          .join(""),
      )}&bg=4F46E5&color=ffffff`
    )
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
        whileTap={{ scale: 0.98 }}
        className="relative group cursor-pointer perspective-1000"
        role="button"
        tabIndex={0}
        aria-label={`View ${member.name}'s profile`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            window.location.href = `/member/${member.id}`
          }
        }}
      >
        <motion.div
          animate={{
            scale: isSelected || isHovered ? 1.02 : 1,
            y: isSelected || isHovered ? -4 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`relative bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 ${theme.border} ${theme.hoverBorder} transition-all duration-500 ${
            isSelected || isHovered ? `${theme.glow} shadow-xl` : ""
          } overflow-hidden h-full focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 focus-within:ring-offset-slate-900`}
        >
          {/* Animated Background Gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isSelected || isHovered ? 0.08 : 0,
              scale: isSelected || isHovered ? 1.1 : 0.8,
            }}
            transition={{ duration: 0.4 }}
            className={`absolute inset-0 bg-gradient-to-br ${theme.bg} rounded-2xl sm:rounded-3xl`}
          />

          {/* Enhanced Selection Indicator */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isSelected || isHovered ? 1 : 0,
              opacity: isSelected || isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-green-400 rounded-full border-3 sm:border-4 border-white z-20 flex items-center justify-center shadow-lg"
            aria-hidden="true"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-white rounded-full"
            />
          </motion.div>

          {/* Member Number Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold border border-white/20"
            aria-label={`Team member ${index + 1}`}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.div>

          {/* Avatar Section */}
          <motion.div
            animate={{
              rotateY: isHovered ? 3 : 0,
              scale: isHovered ? 1.03 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="relative mb-4 sm:mb-6 z-10"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} rounded-full blur-xl sm:blur-2xl opacity-0 transition-opacity duration-500 scale-110 ${
                isSelected || isHovered ? "opacity-50" : ""
              }`}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} rounded-full opacity-20 transition-opacity duration-300 ${
                isSelected || isHovered ? "opacity-30" : ""
              }`}
            />
            <Image
              src={getPlaceholderImage() || "/placeholder.svg"}
              alt={`${member.name} - ${member.title}`}
              width={200}
              height={200}
              className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto object-cover rounded-full border-3 sm:border-4 border-white/20 group-hover:border-white/50 transition-all duration-300"
              priority={index < 2}
            />

            {/* Status Indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 sm:top-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 rounded-full border-2 sm:border-3 border-white z-20 shadow-lg"
              aria-label="Online status"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-full h-full bg-green-400 rounded-full"
              />
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <div className="text-center space-y-2 sm:space-y-3 lg:space-y-4 relative z-10">
            <motion.h3
              animate={{
                color: isSelected || isHovered ? "transparent" : "#ffffff",
              }}
              className="text-lg sm:text-xl lg:text-2xl font-bold text-white transition-all duration-300"
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

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed px-1 sm:px-2 group-hover:text-gray-200 transition-colors duration-300">
              {member.title}
            </p>

            {/* Location */}
            <p className="text-gray-400 text-xs flex items-center justify-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {member.location}
            </p>

            {/* Animated Divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: isSelected || isHovered ? "100%" : "0%",
              }}
              transition={{ duration: 0.4 }}
              className={`h-0.5 bg-gradient-to-r ${theme.gradient} mx-auto transition-all duration-300 rounded-full`}
            />

            {/* Hover Tagline - Overlay without changing layout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 bottom-0 p-3 bg-black/80 backdrop-blur-sm rounded-b-2xl sm:rounded-b-3xl border-t border-white/10"
              style={{ pointerEvents: isHovered ? "auto" : "none" }}
            >
              <p className="text-gray-300 text-xs leading-relaxed mb-2">
                {memberTaglines[member.id as keyof typeof memberTaglines]}
              </p>
              <div className={`text-xs ${theme.accent} font-medium flex items-center justify-center space-x-1`}>
                <span>Explore Profile</span>
                <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
                  →
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* Floating Particles */}
          {(isSelected || isHovered) && (
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                  className={`absolute w-1 h-1 bg-gradient-to-r ${theme.gradient} rounded-full`}
                  style={{
                    left: `${25 + i * 20}%`,
                    top: `${40 + (i % 2) * 20}%`,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </Link>
  )
}
