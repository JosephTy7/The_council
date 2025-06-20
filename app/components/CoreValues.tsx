"use client"

import { motion } from "framer-motion"
import { Code, Lightbulb, Users, Zap } from "lucide-react"

const values = [
  {
    icon: Code,
    title: "Excellence",
    description: "Crafting code with precision and attention to detail",
    color: "from-blue-400 to-cyan-400",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Pushing boundaries with creative solutions",
    color: "from-purple-400 to-pink-400",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working together to achieve extraordinary results",
    color: "from-green-400 to-emerald-400",
  },
  {
    icon: Zap,
    title: "Impact",
    description: "Creating meaningful change through technology",
    color: "from-orange-400 to-red-400",
  },
]

export function CoreValues() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 3.7 }}
      className="mb-16 sm:mb-20 lg:mb-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 3.9 }}
        className="text-center mb-12 sm:mb-16"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
          Our Core{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Values</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
          The principles that guide our work and define our commitment to excellence
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 4.1 + index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${value.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:shadow-lg transition-all duration-300`}
              >
                <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                {value.title}
              </h3>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {value.description}
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                className={`h-0.5 bg-gradient-to-r ${value.color} mt-3 sm:mt-4 rounded-full transition-all duration-300`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
