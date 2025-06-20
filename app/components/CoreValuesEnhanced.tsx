"use client"

import { motion } from "framer-motion"
import { Code, Lightbulb, Users, Zap, Target, Rocket } from "lucide-react"

const values = [
  {
    icon: Code,
    title: "Excellence",
    description: "Crafting code with precision and attention to detail",
    color: "from-blue-400 to-cyan-400",
    stat: "99.9%",
    statLabel: "Code Quality",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Pushing boundaries with creative solutions",
    color: "from-purple-400 to-pink-400",
    stat: "50+",
    statLabel: "Innovations",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working together to achieve extraordinary results",
    color: "from-green-400 to-emerald-400",
    stat: "100%",
    statLabel: "Team Sync",
  },
  {
    icon: Zap,
    title: "Impact",
    description: "Creating meaningful change through technology",
    color: "from-orange-400 to-red-400",
    stat: "15+",
    statLabel: "Projects",
  },
  {
    icon: Target,
    title: "Precision",
    description: "Delivering pixel-perfect solutions every time",
    color: "from-indigo-400 to-blue-400",
    stat: "24/7",
    statLabel: "Support",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing for speed and scalability",
    color: "from-pink-400 to-rose-400",
    stat: "<100ms",
    statLabel: "Load Time",
  },
]

export function CoreValuesEnhanced() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Our Core{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Values</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          The principles that guide our work and define our commitment to excellence
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 h-full relative overflow-hidden">
              {/* Background Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                className={`absolute inset-0 bg-gradient-to-br ${value.color.replace("to-", "to-transparent from-")} rounded-2xl`}
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300`}
                >
                  <value.icon className="w-6 h-6 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                  {value.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                  {value.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>
                      {value.stat}
                    </div>
                    <div className="text-xs text-gray-500">{value.statLabel}</div>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "30%" }}
                    className={`h-1 bg-gradient-to-r ${value.color} rounded-full transition-all duration-300`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
