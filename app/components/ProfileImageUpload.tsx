"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Camera, Upload, X, Check, Lock } from "lucide-react"

interface ProfileImageUploadProps {
  currentImage?: string
  onImageChange: (imageUrl: string) => void
  memberName: string
  theme: string
}

const themeColors = {
  blue: "from-blue-500 to-cyan-500",
  purple: "from-purple-500 to-pink-500",
  green: "from-green-500 to-emerald-500",
  pink: "from-pink-500 to-rose-500",
  gold: "from-yellow-500 to-amber-500",
  black: "from-gray-800 to-black",
  sky: "from-sky-400 to-blue-500",
}

// Simple admin password - you can change this
const ADMIN_PASSWORD = "TheCouncil2024!"

export function ProfileImageUpload({ currentImage, onImageChange, memberName, theme }: ProfileImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setShowPasswordModal(false)
      setShowUploadModal(true)
      setPassword("")
      setPasswordError("")
    } else {
      setPasswordError("Incorrect password. Access denied.")
      setPassword("")
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreviewImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!previewImage) return

    setIsUploading(true)

    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, you would upload to a cloud service here
    onImageChange(previewImage)
    setIsUploading(false)
    setShowUploadModal(false)
    setPreviewImage(null)
    setIsAuthenticated(false) // Reset authentication after upload
  }

  const handleCancel = () => {
    setPreviewImage(null)
    setShowUploadModal(false)
    setShowPasswordModal(false)
    setPassword("")
    setPasswordError("")
    setIsAuthenticated(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getPlaceholderImage = () => {
    if (!memberName) return "/placeholder.svg?height=200&width=200"

    const initials = memberName
      .split(" ")
      .map((n) => n[0])
      .join("")
    return `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(initials)}&bg=4F46E5&color=ffffff`
  }

  const themeGradient = themeColors[theme as keyof typeof themeColors] || themeColors.blue

  return (
    <>
      <div className="relative group">
        <div className="relative">
          <Image
            src={currentImage || getPlaceholderImage()}
            alt={memberName || "Profile"}
            width={200}
            height={200}
            className="w-40 h-40 object-cover rounded-full border-4 border-white/30"
          />

          {/* Upload Overlay - Only show on hover */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPasswordModal(true)}
            className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="text-center">
              <Lock className="w-6 h-6 text-white mx-auto mb-1" />
              <Camera className="w-6 h-6 text-white mx-auto mb-2" />
              <span className="text-white text-xs font-medium">Admin Only</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && handleCancel()}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Admin Access Required
              </h3>
              <button onClick={handleCancel} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Enter admin password to change profile picture:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password..."
                  autoFocus
                />
                {passwordError && <p className="text-red-400 text-sm mt-2">{passwordError}</p>}
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 px-4 py-3 bg-gradient-to-r ${themeGradient} text-white rounded-xl font-medium hover:opacity-90 transition-opacity`}
                >
                  Authenticate
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Upload Modal - Only shown after authentication */}
      {showUploadModal && isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && handleCancel()}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Update Profile Picture</h3>
              <button onClick={handleCancel} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {!previewImage ? (
              <div className="space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-gray-500 transition-colors"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-white font-medium mb-2">Click to upload image</p>
                  <p className="text-gray-400 text-sm">PNG, JPG up to 5MB</p>
                </div>

                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Image
                      src={previewImage || "/placeholder.svg"}
                      alt="Preview"
                      width={150}
                      height={150}
                      className="w-32 h-32 object-cover rounded-full border-4 border-white/30"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${themeGradient} rounded-full opacity-20`} />
                  </div>
                  <p className="text-gray-300 text-sm mt-4">Preview of your new profile picture</p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={handleUpload}
                    disabled={isUploading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 px-4 py-3 bg-gradient-to-r ${themeGradient} text-white rounded-xl font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Upload</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
