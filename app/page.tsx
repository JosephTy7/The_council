"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { AvatarCard } from "./components/AvatarCard"
import { AnimatedTitle } from "./components/AnimatedTitle"
import { ParticleBackground } from "./components/ParticleBackground"
import { LoadingScreen } from "./components/LoadingScreen"
import { CoreValues } from "./components/CoreValues"
import { CTASection } from "./components/CTASection"
import { AnimatedDivider, FloatingElements, SmoothScrollButton } from "./components/InteractiveElements"
import membersData from "../data/members.json"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -200])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Enhanced smooth scrolling
    const handleScroll = (e: Event) => {
      e.preventDefault()
      const target = e.target as HTMLAnchorElement
      const id = target.getAttribute("href")?.slice(1)
      if (id) {
        const element = document.getElementById(id)
        element?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => link.addEventListener("click", handleScroll))

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleScroll))
    }
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      <FloatingElements />

      {/* Enhanced Animated Background Elements */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 opacity-15" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-60 right-20 w-64 h-64 md:w-80 md:h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute bottom-40 left-1/3 w-56 h-56 md:w-72 md:h-72 bg-pink-500/15 rounded-full blur-3xl animate-pulse-slow delay-2000" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow delay-3000" />
      </motion.div>

      {/* Geometric Pattern Overlay */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-repeat opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        {/* Enhanced Hero Section */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          {/* Animated Council Logo/Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="mb-8 sm:mb-10 lg:mb-12"
          >
            <div className="relative inline-block">
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full p-1 shadow-2xl">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center relative overflow-hidden">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white z-10" aria-label="The Council">
                    TC
                  </span>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-2 border border-dashed border-blue-400/30 rounded-full"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-xl"
                aria-hidden="true"
              />
              {/* Four Animated Icons Around TC Logo */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </motion.div>
              <motion.div
                animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.15, 1] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute top-8 -left-8 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
              <motion.div
                animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -bottom-4 -right-8 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          <AnimatedTitle />

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12"
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-4 sm:mb-6 px-4">
              An elite collective of developers, designers, and innovators united in crafting exceptional digital
              experiences that push the boundaries of technology and creativity.
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 3 }}
              className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full"
              aria-hidden="true"
            />
          </motion.div>

          {/* Enhanced Team Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mb-12 sm:mb-16"
            role="region"
            aria-label="Team statistics"
          >
            {[
              { label: "Elite Members", value: "04", icon: "👥" },
              { label: "Projects Delivered", value: "15+", icon: "🚀" },
              { label: "Years Combined", value: "12+", icon: "⭐" },
              { label: "Technologies", value: "20+", icon: "⚡" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 3.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-3 sm:p-4 lg:p-6 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-xl sm:text-2xl mb-2" aria-hidden="true">
                  {stat.icon}
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.header>

        {/* Core Values Section */}
        <CoreValues />

        <AnimatedDivider />

        {/* Enhanced Avatar Cards Section */}
        <motion.section
          id="team"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 4 }}
          className="mb-16 sm:mb-20"
          aria-labelledby="team-heading"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4.2 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 id="team-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
              Select Your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Council Member
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Discover the unique expertise and creative vision each member brings to The Council
            </p>

            {/* Selection Progress Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 4.5 }}
              className="flex justify-center items-center space-x-2 mb-8"
              role="tablist"
              aria-label="Team member selection indicators"
            >
              {membersData.map((member, index) => (
                <motion.div
                  key={member.id}
                  animate={{
                    scale: selectedMember === member.id ? 1.2 : 1,
                    opacity: selectedMember === member.id ? 1 : 0.5,
                  }}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    selectedMember === member.id
                      ? `bg-gradient-to-r ${
                          member.theme === "blue"
                            ? "from-blue-400 to-cyan-400"
                            : member.theme === "purple"
                              ? "from-purple-400 to-pink-400"
                              : member.theme === "green"
                                ? "from-green-400 to-emerald-400"
                                : "from-pink-400 to-rose-400"
                        }`
                      : "bg-gray-600"
                  }`}
                  role="tab"
                  aria-selected={selectedMember === member.id}
                  aria-label={`${member.name} selection indicator`}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Responsive Grid Layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 4.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto"
            role="grid"
            aria-label="Team members"
          >
            {membersData.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 4.9 + index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                className={`transform-gpu ${
                  index === 1
                    ? "sm:translate-y-8 lg:translate-y-6"
                    : index === 2
                      ? "sm:translate-y-0 lg:translate-y-12"
                      : index === 3
                        ? "sm:translate-y-8 lg:translate-y-3"
                        : ""
                }`}
                role="gridcell"
              >
                <AvatarCard
                  member={member}
                  isSelected={selectedMember === member.id}
                  onHover={setSelectedMember}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Call to Action Section */}
        <CTASection />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 6 }}
          className="text-center mt-16 sm:mt-20"
        >
          <SmoothScrollButton targetId="team">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="inline-block"
            >
              <div className="w-6 h-10 sm:w-8 sm:h-12 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="w-1 h-2 sm:h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </SmoothScrollButton>
          <p className="text-gray-400 text-xs sm:text-sm mt-4">Scroll to explore more</p>
        </motion.div>
      </div>

      {/* Enhanced Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 6.5 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 z-50 group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <motion.svg
          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          whileHover={{ y: -2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </motion.svg>
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          aria-hidden="true"
        />
      </motion.button>
    </div>
  )
}
