"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedTitle() {
  const [currentText, setCurrentText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const fullText = "Meet the minds behind The Council"
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    let index = 0
    const typingTimer = setInterval(() => {
      if (index <= fullText.length) {
        setCurrentText(fullText.slice(0, index))
        index++
      } else {
        setIsTypingComplete(true)
        clearInterval(typingTimer)
        setTimeout(() => setShowCursor(false), 1000)
      }
    }, 60)

    return () => clearInterval(typingTimer)
  }, [])

  const titleWords = ["The", "Council"]

  return (
    <div className="mb-8 sm:mb-10 lg:mb-12">
      {/* Main Title with Staggered Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-6 sm:mb-8"
      >
        <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center leading-tight">
          {titleWords.map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 100, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.8 + index * 0.3,
                type: "spring",
                stiffness: 100,
              }}
              className="inline-block mr-4 sm:mr-6"
            >
              <motion.span
                initial={{ backgroundSize: "0% 100%" }}
                animate={{ backgroundSize: "100% 100%" }}
                transition={{ duration: 1.5, delay: 1.5 + index * 0.3 }}
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-no-repeat"
                style={{
                  backgroundImage: "linear-gradient(90deg, #60a5fa, #a855f7, #ec4899)",
                }}
              >
                {word}
              </motion.span>
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Typewriter Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 min-h-[2rem] sm:min-h-[3rem] flex items-center justify-center px-4"
      >
        <span className="font-mono relative text-center">
          {currentText}
          {showCursor && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
              className="text-blue-400 ml-1"
            >
              |
            </motion.span>
          )}
        </span>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 2.3 }}
        className="flex justify-center items-center space-x-2 sm:space-x-4 mt-6 sm:mt-8"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
          />
        ))}
      </motion.div>
    </div>
  )
}
