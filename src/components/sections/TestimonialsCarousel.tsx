
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"
import gsap from "gsap"

interface Testimonial {
  id: number
  quote: string
  author: string
  title: string
  company: string
  rating: number
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Fahad's work on our e-commerce platform was exceptional. He delivered a robust, scalable solution with a beautiful user interface. Highly recommend!",
    author: "Jane Doe",
    title: "CEO",
    company: "FashionForward Inc.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    quote:
      "The task management app Fahad built transformed our team's productivity. His attention to detail and real-time features are outstanding.",
    author: "John Smith",
    title: "CTO",
    company: "Productivity Solutions",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    quote:
      "Fahad's design skills are top-notch. He captured our brand's essence perfectly and delivered a stunning brand identity. A true professional!",
    author: "Emily White",
    title: "Marketing Director",
    company: "Creative Spark Agency",
    rating: 4,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    quote:
      "Working with Fahad was a breeze. He's highly skilled, communicative, and delivered our mobile app ahead of schedule. Fantastic experience!",
    author: "Michael Brown",
    title: "Founder",
    company: "FitLife Apps",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

const TestimonialsCarousel: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (inView && carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll(".testimonial-card")
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      )
    }
  }, [inView, currentIndex]) // Re-run animation when index changes

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000) // Auto-advance every 5 seconds
    return () => clearInterval(interval)
  }, [currentIndex])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section
      id="testimonials"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-purple-500/10 to-pink-500/5"></div>
        <div className="absolute top-20 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            What They say
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                {" "}
                About Me 
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I strive to create impactful digital experiences that not only meet client expectations but also delight users. Here's what some of my clients have to say about our collaborations.
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center">
          <motion.button
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <div className="w-full max-w-3xl mx-auto relative h-[350px] sm:h-[300px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={currentIndex}>
              <motion.div
                key={testimonials[currentIndex].id}
                custom={currentIndex}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="testimonial-card absolute w-full p-6 sm:p-8 bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex flex-col items-center text-center"
              >
                <Quote size={48} className="text-blue-400 mb-4 opacity-70" />
                <p className="text-lg sm:text-xl text-gray-200 mb-6 leading-relaxed italic">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < testimonials[currentIndex].rating ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
                      }
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].author}
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-blue-400 shadow-lg"
                  />
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonials[currentIndex].author}</h4>
                    <p className="text-gray-400 text-sm">
                      {testimonials[currentIndex].title}, {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                idx === currentIndex ? "bg-blue-400 w-6" : "bg-gray-600"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsCarousel
