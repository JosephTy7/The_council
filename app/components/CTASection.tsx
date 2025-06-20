"use client"

import { motion } from "framer-motion"
import { ExternalLink, Mail } from "lucide-react"

export function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 5.5 }}
      className="text-center mb-16 sm:mb-20"
    >
      <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 5.7 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 px-4"
        >
          Ready to Build Something{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Extraordinary?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 5.9 }}
          className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
        >
          Let's collaborate and turn your vision into reality. The Council is ready to tackle your next big challenge.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 6.1 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
          >
            <span>View Our Work</span>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold flex items-center space-x-2 border border-white/20 hover:border-white/40 transition-all duration-300 w-full sm:w-auto"
          >
            <span>Get In Touch</span>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Decorative Elements */}
        <div className="flex justify-center items-center space-x-4 sm:space-x-8 mt-8 sm:mt-12">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -8, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
              className="w-0.5 sm:w-1 h-6 sm:h-8 bg-gradient-to-t from-blue-400/50 to-purple-400/50 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
