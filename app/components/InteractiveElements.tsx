"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedDivider() {
  return (
    <div className="flex items-center justify-center my-16" role="separator" aria-hidden="true">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-full max-w-md"
      />
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mx-4 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-full max-w-md"
      />
    </div>
  )
}

export function ProgressBar({ progress, label }: { progress: number; label?: string }) {
  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 h-2 rounded-full relative"
        >
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute inset-0 bg-white/20 rounded-full"
          />
        </motion.div>
      </div>
    </div>
  )
}

export function LoadingAnimation() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center z-50"
      role="dialog"
      aria-label="Loading The Council"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full mx-auto mb-4"
          aria-hidden="true"
        />
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="text-white text-lg"
        >
          Loading The Council...
        </motion.p>
      </div>
    </motion.div>
  )
}

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

export function SmoothScrollButton({ targetId, children }: { targetId: string; children: React.ReactNode }) {
  const handleClick = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <button
      onClick={handleClick}
      className="focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg"
      aria-label={`Scroll to ${targetId} section`}
    >
      {children}
    </button>
  )
}
