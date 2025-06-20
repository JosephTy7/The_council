"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { ChevronDown, Sparkles, Code, Zap } from "lucide-react"

export function EnhancedHero() {
  const [currentText, setCurrentText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])

  const phrases = [
    "Meet the minds behind The Council",
    "Discover elite development talent",
    "Experience innovation in action",
    "Where creativity meets technology",
  ]

  useEffect(() => {
    let index = 0
    const currentPhrase = phrases[currentPhraseIndex]

    const typingTimer = setInterval(() => {
      if (index <= currentPhrase.length) {
        setCurrentText(currentPhrase.slice(0, index))
        index++
      } else {
        clearInterval(typingTimer)
        setTimeout(() => {
          // Start erasing
          const erasingTimer = setInterval(() => {
            if (index > 0) {
              setCurrentText(currentPhrase.slice(0, index))
              index--
            } else {
              clearInterval(erasingTimer)
              setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
            }
          }, 50)
        }, 2000)
      }
    }, 80)

    return () => clearInterval(typingTimer)
  }, [currentPhraseIndex])

  const titleWords = ["The", "Council"]

  return (
    <motion.div style={{ y }} className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          >
            <div
              className={`w-${4 + Math.floor(Math.random() * 8)} h-${4 + Math.floor(Math.random() * 8)} border border-white/20 ${Math.random() > 0.5 ? "rounded-full" : "rounded-lg"}`}
            />
          </motion.div>
        ))}

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Animated Council Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full p-1 shadow-2xl">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center relative overflow-hidden">
                <span className="text-3xl font-bold text-white z-10">TC</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-2 border border-dashed border-blue-400/30 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-xl"
                />
              </div>
            </div>

            {/* Floating Icons */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"
            >
              <Code className="w-4 h-4 text-white" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.15, 1] }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute top-8 -left-8 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
            >
              <Zap className="w-4 h-4 text-white" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.1, 1] }}
              transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -bottom-4 -right-8 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Title with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <div className="text-5xl md:text-8xl lg:text-9xl font-bold leading-tight">
            {titleWords.map((word, index) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8 + index * 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
                className="inline-block mr-6 relative"
              >
                <motion.span
                  initial={{ backgroundSize: "0% 100%" }}
                  animate={{ backgroundSize: "100% 100%" }}
                  transition={{ duration: 1.5, delay: 1.5 + index * 0.3 }}
                  className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-no-repeat relative"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #60a5fa, #a855f7, #ec4899)",
                  }}
                >
                  {word}
                  {/* Glitch Effect */}
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                    style={{ transform: "translate(2px, -2px)" }}
                  >
                    {word}
                  </motion.span>
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Typewriter Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="text-2xl md:text-4xl font-semibold text-gray-300 min-h-[3rem] flex items-center justify-center mb-8"
        >
          <span className="font-mono relative">
            {currentText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
              className="text-blue-400 ml-1"
            >
              |
            </motion.span>
          </span>
        </motion.div>

        {/* Enhanced Intro Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6">
            An{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold">
              elite collective
            </span>{" "}
            of developers, designers, and innovators united in crafting exceptional digital experiences that push the
            boundaries of technology and creativity.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 3.2 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full"
          />
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Explore Our Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <span>Meet The Team</span>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="mb-4"
          >
            <ChevronDown className="w-8 h-8 text-white/60" />
          </motion.div>
          <p className="text-gray-400 text-sm">Scroll to discover</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
