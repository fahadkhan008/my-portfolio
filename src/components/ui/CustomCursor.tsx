"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const innerCursorRef = useRef<HTMLDivElement>(null)
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "text" | "sparkle">("default")

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && innerCursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 20, // Adjust for cursor size
          y: e.clientY - 20,
          duration: 0.3,
          ease: "power2.out",
        })
        gsap.to(innerCursorRef.current, {
          x: e.clientX - 4, // Adjust for inner cursor size
          y: e.clientY - 4,
          duration: 0.1,
          ease: "power2.out",
        })
      }

      let newCursorType: "default" | "pointer" | "text" | "sparkle" = "default"
      const target = e.target as HTMLElement

      if (target.closest('button, a, input[type="submit"], [data-cursor-type="pointer"]')) {
        newCursorType = "pointer"
      } else if (target.closest('input[type="text"], input[type="email"], textarea, [data-cursor-type="text"]')) {
        newCursorType = "text"
      } else if (target.closest('[data-cursor-type="sparkle"]')) {
        newCursorType = "sparkle"
      }
      setCursorType(newCursorType)
    }

    document.addEventListener("mousemove", onMouseMove)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  const cursorVariants = {
    default: {
      width: 40,
      height: 40,
      backgroundColor: "rgba(120, 119, 198, 0.4)", // purple-ish
      borderColor: "rgba(120, 119, 198, 0.8)",
      scale: 1,
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    pointer: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(0, 212, 255, 0.4)", // blue-ish
      borderColor: "rgba(0, 212, 255, 0.8)",
      scale: 1.2,
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    text: {
      width: 4,
      height: 40,
      backgroundColor: "rgba(255, 119, 198, 0.6)", // pink-ish
      borderColor: "rgba(255, 119, 198, 0.9)",
      scale: 1,
      opacity: 1,
      borderRadius: "4px",
      transition: { duration: 0.2, ease: "easeOut" },
    },
    sparkle: {
      width: 50,
      height: 50,
      backgroundColor: "rgba(255, 255, 0, 0.6)", // yellow-ish
      borderColor: "rgba(255, 255, 0, 0.9)",
      scale: 1.3,
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  }

  const innerCursorVariants = {
    default: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      scale: 1,
      transition: { duration: 0.1, ease: "easeOut" },
    },
    pointer: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      scale: 0.5,
      transition: { duration: 0.1, ease: "easeOut" },
    },
    text: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      scale: 0, // Hide inner cursor for text
      transition: { duration: 0.1, ease: "easeOut" },
    },
    sparkle: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      scale: 0.7,
      transition: { duration: 0.1, ease: "easeOut" },
    },
  }

  return (
    <>
      <motion.div
        ref={cursorRef}
        variants={cursorVariants}
        animate={cursorType}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2 blur-sm"
        style={{ transform: "translate3d(0, 0, 0)" }} // Optimize for performance
      />
      <motion.div
        ref={innerCursorRef}
        variants={innerCursorVariants}
        animate={cursorType}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full w-2 h-2"
        style={{ transform: "translate3d(0, 0, 0)" }} // Optimize for performance
      />
    </>
  )
}

export default CustomCursor
