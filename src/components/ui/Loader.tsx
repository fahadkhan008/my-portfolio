"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Loader } from "lucide-react"
import gsap from "gsap"
// import { useLanguage } from "@/contexts/LanguageContext"

interface PortfolioLoaderProps {
  onLoaded: () => void
}

const PortfolioLoader: React.FC<PortfolioLoaderProps> = ({ onLoaded }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
//   const { t } = useLanguage()

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShowWelcome(true)
        gsap.to(".loader-content", {
          opacity: 0,
          y: -20,
          duration: 0.5,
          delay: 1.5, // Show welcome message for 1.5s
          onComplete: () => {
            setIsVisible(false)
            onLoaded()
          },
        })
      },
    })

    // Initial animation for loader elements
    tl.fromTo(
      ".loader-icon",
      { scale: 0, opacity: 0, rotate: -180 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" },
    )
      .fromTo(".loader-text", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .to(".loader-icon", {
        rotate: 360,
        repeat: -1,
        duration: 5,
        ease: "none",
      })
      .to(
        ".loader-text",
        {
          opacity: 0.5,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        },
        "-=5",
      ) // Keep text animating with icon

    // Simulate loading time
    gsap.to({}, { duration: 2.5 }) // Minimum display time for loader
  }, [onLoaded])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden"
      >
        {/* Background particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center loader-content">
          <motion.div
            className="loader-icon mb-6 text-blue-400"
            style={{ filter: "drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))" }}
          >
            <Sparkles size={64} />
          </motion.div>

          <motion.h1 className="loader-text text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {showWelcome ? ("loader.welcome") : ("Welcome")}
          </motion.h1>

          {!showWelcome && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-4 flex items-center space-x-2 text-gray-400"
            >
              <Loader size={20} className="animate-spin" />
              <span>{("loading...")}</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PortfolioLoader
