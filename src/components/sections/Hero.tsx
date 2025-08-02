import React, { useEffect, useRef,  } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Sparkles, Code, Palette } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import myPhoto from '../../img/fahad.jpg'
import Typewriter from 'typewriter-effect';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Smooth floating elements animation with better performance
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.set(el, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          });

          // Smoother floating animation
          gsap.to(el, {
            y: `-=${Math.random() * 50 + 25}`,
            x: `+=${Math.random() * 100 - 50}`,
            rotation: 360,
            duration: Math.random() * 6 + 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1,
          });

          // Subtle glow animation
          gsap.to(el, {
            opacity: 0.8,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.2,
          });
        }
      });

      // Typing animation
      if (typingRef.current) {
        const text = "Fahad Khan";
        const chars = text.split('');
        typingRef.current.innerHTML = '';
        
        chars.forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.opacity = '0';
          typingRef.current?.appendChild(span);
        });

        const charElements = typingRef.current.querySelectorAll('span');
        gsap.to(charElements, {
          opacity: 1,
          duration: 0.1,
          stagger: 0.1,
          ease: "power2.out",
          delay: 1,
        });

        // Cursor blink effect
        gsap.to(typingRef.current, {
          borderRightColor: 'transparent',
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }

      // Enhanced text reveal animation
      if (textRef.current) {
        const textElements = textRef.current.querySelectorAll('.animate-text');
        gsap.fromTo(textElements, 
          { 
            y: 60, 
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }

      // Smooth background animation
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          backgroundPosition: "100% 100%",
          duration: 30,
          repeat: -1,
          yoyo: true,
          ease: "none",
        });
      }

      // Optimized parallax scroll effect
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          if (heroRef.current) {
            gsap.set(heroRef.current, {
              y: self.progress * -100,
            });
          }
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-neon-black-800' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-neon-blue' },
    { icon: Mail, href: '#contact', label: 'Email', color: 'hover:text-neon-pink' },
  ];

  const skills = [
    { name: 'React', icon: Code, color: 'text-blue-400' },
    { name: 'TypeScript', icon: Code, color: 'text-blue-500' },
    { name: 'Node.js', icon: Code, color: 'text-green-400' },
    { name: 'Python', icon: Code, color: 'text-yellow-400' },
    { name: 'UI/UX', icon: Palette, color: 'text-purple-400' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background with Stars and Moons */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
          `
        }}
      >
        {/* Animated Stars Background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Flowing Moons */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={`moon-${i}`}
              className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 animate-float"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${8 + i * 2}s`,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>
        
        {/* Animated mesh overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/5 to-transparent animate-shimmer"></div>
        </div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Enhanced Floating 3D Elements */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            ref={(el) => el && (floatingElementsRef.current[i] = el)}
            className="absolute w-2 h-2 rounded-full opacity-60"
            style={{
              background: `linear-gradient(45deg, 
                ${i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#b347d9' : '#ff006e'}, 
                ${i % 3 === 0 ? '#b347d9' : i % 3 === 1 ? '#ff006e' : '#00d4ff'})`,
              filter: 'blur(0.5px)',
              boxShadow: `0 0 10px ${i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#b347d9' : '#ff006e'}`,
            }}
          />
        ))}
        
        {/* Larger geometric shapes */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`geo-${i}`}
            ref={(el) => el && (floatingElementsRef.current[i + 12] = el)}
            className="absolute opacity-15 animate-spin-slow"
            style={{
              width: `${60 + Math.random() * 40}px`,
              height: `${60 + Math.random() * 40}px`,
              background: `conic-gradient(from ${i * 90}deg, #00d4ff, #b347d9, #ff006e, #39ff14)`,
              clipPath: i % 2 === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div ref={heroRef} className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div ref={textRef} className="space-y-8">
          {/* Enhanced Profile Image with Better Styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, delay: 0.2, type: "spring", stiffness: 80 }}
            className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 group"
          >
            {/* Multiple animated rings with different speeds */}
            <div className="absolute inset-0 rounded-full border-2 border-neon-blue/30 animate-spin-slow"></div>
            <div className="absolute inset-2 rounded-full border-2 border-neon-purple/30 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }}></div>
            <div className="absolute inset-4 rounded-full border-2 border-neon-pink/30 animate-spin-slow" style={{ animationDuration: '8s' }}></div>
            
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-full opacity-30 blur-md animate-pulse"></div>
            
            {/* Image with better styling */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <img
                src={myPhoto} // Use the imported image
                alt="Fahad Khan"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Floating icons around image */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center animate-bounce-slow">
              <Sparkles size={16} className="text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full flex items-center justify-center animate-bounce-slow" style={{ animationDelay: '1s' }}>
              <Code size={12} className="text-white" />
            </div>
          </motion.div>

          {/* Enhanced Text Content with Typing Animation */}
          <div className="space-y-6">
            <div className="animate-text">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-white mb-2">Hi, I'm</span>
              </h1>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold">
                <span 
                  ref={typingRef}
                  className="block bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent border-r-2 border-neon-blue pr-2"
                  style={{ borderRightWidth: '3px' }}
                >
                </span> 
              </h1>
            </div>

            <div className="animate-text">
              <p className="text-xl sm:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light">
                <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text 
                 block min-h-[3.5rem] sm:min-h-[4.5rem]">

                  <Typewriter
                    options={{
                      loop: true,
                      delay: 75,
                      deleteSpeed: 40,
                      autoStart: true,
                    }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString('Full-Stack Developer & UI/UX Designer')
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString('Crafting digital experiences that inspire and innovate')
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString('Turning ideas into clean code and visual delight')
                        .pauseFor(1000)
                        .deleteAll()
                        .start();
                    }}
                  />

                  {/* Full-Stack Developer & UI/UX Designer */}
                </span>
                {/* <br />
                <span className="text-lg sm:text-xl text-gray-300 mt-2 block">
                  Crafting digital experiences that inspire and innovate
                </span> */}
              </p>
            </div>

            {/* Enhanced Skills Tags with Smoother Animations */}
            <div className="animate-text">
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -3,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                      className="group px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:border-neon-blue/50 transition-all duration-300 cursor-default"
                    >
                      <div className="flex items-center space-x-2">
                        <Icon size={16} className={`${skill.color} transition-transform duration-300 group-hover:scale-110`} />
                        <span className="text-white group-hover:text-neon-blue transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced CTA Buttons with Smoother Hover Effects */}
          <div className="animate-text">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-full overflow-hidden transition-all duration-300 shadow-lg hover:shadow-neon-blue/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>View My Work</span>
                  <Sparkles size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-white/5 backdrop-blur-md text-white font-semibold rounded-full border border-white/20 hover:border-neon-blue/50 transition-all duration-300 hover:bg-white/10"
              >
                <span className="flex items-center space-x-2">
                  <span>Get In Touch</span>
                  <Mail size={18} className="transition-transform duration-300 group-hover:scale-110" />
                </span>
              </motion.button>
            </div>
          </div>

          {/* Enhanced Social Links with Smoother Animations */}
          <div className="animate-text">
            <div className="flex justify-center space-x-8">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                    whileHover={{ 
                      scale: 1.15, 
                      y: -5,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`group p-4 bg-white/5 backdrop-blur-md rounded-full text-white ${social.color} transition-all duration-300 hover:shadow-lg border border-white/10 hover:border-white/30`}
                    aria-label={social.label}
                  >
                    <Icon size={24} className="transition-transform duration-300 group-hover:scale-110" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-white/70 cursor-pointer group"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm font-medium group-hover:text-neon-blue transition-colors duration-300">
                Scroll Down
              </span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center group-hover:border-neon-blue/50 transition-colors duration-300">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 group-hover:bg-neon-blue animate-bounce"></div>
              </div>
              <ChevronDown size={24} className="group-hover:text-neon-blue transition-colors duration-300" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;