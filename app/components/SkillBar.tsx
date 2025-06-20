"use client"

import { motion } from "framer-motion"

interface Skill {
  name: string
  level: number
}

interface SkillBarProps {
  skill: Skill
  theme: {
    gradient: string
    accent: string
  }
  delay: number
}

export function SkillBar({ skill, theme, delay }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-3"
    >
      <div className="flex justify-between items-center">
        <span className="text-white font-semibold text-lg">{skill.name}</span>
        <span className={`${theme.accent} font-bold`}>{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
          className={`bg-gradient-to-r ${theme.gradient} h-3 rounded-full relative`}
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute inset-0 bg-white/20 rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
