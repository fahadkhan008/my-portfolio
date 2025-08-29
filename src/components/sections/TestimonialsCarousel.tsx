import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import gsap from "gsap";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  company: string;
  rating: number;
  avatar: string;
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
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    quote:
      "The task management app Fahad built transformed our team's productivity. His attention to detail and real-time features are outstanding.",
    author: "John Smith",
    title: "CTO",
    company: "Productivity Solutions",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    id: 3,
    quote:
      "Fahad's design skills are top-notch. He captured our brand's essence perfectly and delivered a stunning brand identity. A true professional!",
    author: "Emily White",
    title: "Marketing Director",
    company: "Creative Spark Agency",
    rating: 4,
    avatar:
      "https://images.pexels.com/photos/3978586/pexels-photo-3978586.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=80&h=80&fit=crop",
  },
  {
    id: 4,
    quote:
      "Working with Fahad was a breeze. He's highly skilled, communicative, and delivered our mobile app ahead of schedule. Fantastic experience!",
    author: "Sarah Rosse",
    title: "Founder",
    company: "FitLife Apps",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=80&h=80&fit=crop",
  },
];

const TestimonialsCarousel: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  useEffect(() => {
    if (inView && carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll(".testimonial-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2 }
      );
    }
    
    // Optimized floating particles animation
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll(".particle");
      particles.forEach((particle, index) => {
        gsap.to(particle, {
        y: `+=${10 + Math.random() * 20}`, // float up & down
        x: `+=${Math.random() * 30 - 15}`, // slight left-right sway
        rotation: Math.random() * 360,     // rotate randomly
        duration: 2 + Math.random() * 2,   // varied speed
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.1,
        });
      });
    }
  }, [inView, currentIndex]);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 800 : -800,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 800 : -800,
      opacity: 0,
    }),
  };

  return (
    <section
      id="testimonials"
      className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* ✨ Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-float"
          style={{ animationDelay: "3s" }}></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-float"
          style={{ animationDelay: "6s" }}></div>
      </div>

      {/* Optimized floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 sm:w-2 h-1 sm:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-4">
            What They Say
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              About Me
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            I strive to create impactful digital experiences that not only meet
            client expectations but also delight users. Here's what some of my
            clients have to say about our collaborations.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center">
          {/* Prev Button */}
          <motion.button
            onClick={prevTestimonial}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 z-20 p-3 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 backdrop-blur-md text-white border border-white/20 shadow-lg hover:shadow-purple-500/50 transition-all">
            <ChevronLeft size={26} />
          </motion.button>

          {/* Testimonial Card */}
          <div className="w-full max-w-3xl mx-auto relative h-[380px] sm:h-[340px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={currentIndex}>
              <motion.div
                key={testimonials[currentIndex].id}
                custom={currentIndex}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 250, damping: 28 },
                  opacity: { duration: 0.25 },
                }}
                className="testimonial-card absolute w-full p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 flex flex-col items-center text-center hover:shadow-purple-500/20 transition-shadow duration-300">
                <Quote size={50} className="text-blue-400 mb-5 opacity-70" />
                <p className="text-xl text-gray-200 mb-6 italic leading-relaxed">
                  "{testimonials[currentIndex].quote}"
                </p>

                {/* Animated Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: i < testimonials[currentIndex].rating ? 1 : 0.8,
                        opacity:
                          i < testimonials[currentIndex].rating ? 1 : 0.3,
                      }}
                      transition={{ delay: i * 0.1 }}>
                      <Star
                        size={22}
                        className={
                          i < testimonials[currentIndex].rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-500"
                        }
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <motion.img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].author}
                    width={65}
                    height={65}
                    whileHover={{ scale: 1.1 }}
                    className="rounded-full border-2 border-blue-400 shadow-lg"
                  />
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      {testimonials[currentIndex].author}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {testimonials[currentIndex].title},{" "}
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <motion.button
            onClick={nextTestimonial}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 z-20 p-3 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 backdrop-blur-md text-white border border-white/20 shadow-lg hover:shadow-pink-500/50 transition-all">
            <ChevronRight size={26} />
          </motion.button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-10 space-x-3">
          {testimonials.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-gradient-to-r from-blue-400 to-pink-400 w-6 shadow-lg shadow-pink-500/50"
                  : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
