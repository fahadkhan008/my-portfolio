import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCardsRef = useRef<HTMLDivElement[]>([]);
  const skillBarsRef = useRef<HTMLDivElement[]>([]);
  const techCloudRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: 'Frontend',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      skills: [
        { name: 'React', level: 95, color: 'from-blue-400 to-blue-600', icon: '⚛️' },
        { name: 'TypeScript', level: 90, color: 'from-blue-500 to-blue-700', icon: '📘' },
        { name: 'Next.js', level: 85, color: 'from-gray-700 to-gray-900', icon: '▲' },
        { name: 'Tailwind CSS', level: 92, color: 'from-teal-400 to-teal-600', icon: '🎨' },
      ],
    },
    {
      title: 'Backend',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      skills: [
        { name: 'Node.js', level: 88, color: 'from-green-400 to-green-600', icon: '🟢' },
        { name: 'Python', level: 85, color: 'from-yellow-400 to-yellow-600', icon: '🐍' },
        { name: 'Django', level: 80, color: 'from-green-600 to-green-800', icon: '🎯' },
        { name: 'PostgreSQL', level: 82, color: 'from-blue-600 to-blue-800', icon: '🐘' },
      ],
    },
    {
      title: 'Design & Tools',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      skills: [
        { name: 'Figma', level: 90, color: 'from-purple-400 to-purple-600', icon: '🎨' },
        { name: 'Adobe XD', level: 85, color: 'from-pink-400 to-pink-600', icon: '🎭' },
        { name: 'Git', level: 93, color: 'from-orange-400 to-orange-600', icon: '📦' },
        { name: 'Docker', level: 75, color: 'from-blue-400 to-blue-600', icon: '🐳' },
      ],
    },
  ];

  useEffect(() => {
    if (inView) {
      const ctx = gsap.context(() => {
        // Optimized 3D card animation
        skillCardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.fromTo(
              card,
              { 
                rotationY: 90, 
                opacity: 0,
                scale: 0.9,
              },
              {
                rotationY: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'power2.out',
                transformOrigin: "center center",
              }
            );
          }
        });

        // Optimized skill bars animation
        skillBarsRef.current.forEach((bar, index) => {
          if (bar) {
            const skillLevel = parseInt(bar.dataset.level || '0');
            gsap.fromTo(bar,
              { width: '0%', opacity: 0 },
              {
                width: `${skillLevel}%`,
                opacity: 1,
                duration: 1.2,
                delay: Math.floor(index / 4) * 0.2 + (index % 4) * 0.08,
                ease: 'power2.out',
              }
            );

            // Optimized shimmer effect
            gsap.to(bar, {
              backgroundPosition: '200% center',
              duration: 2,
              repeat: -1,
              ease: 'none',
              delay: Math.floor(index / 4) * 0.2 + (index % 4) * 0.08 + 1.2,
            });
          }
        });

        // Optimized tech cloud animation
        if (techCloudRef.current) {
          const techItems = techCloudRef.current.querySelectorAll('.tech-item');
          gsap.fromTo(techItems,
            { 
              scale: 0,
              rotation: 90,
              opacity: 0,
            },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.03,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: techCloudRef.current,
                start: 'top 80%',
              }
            }
          );
        }

        // Optimized floating animation for cards
        skillCardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.to(card, {
              y: -8,
              duration: 2 + index * 0.2,
              repeat: -1,
              yoyo: true,
              ease: 'power2.inOut',
              delay: index * 0.3,
            });
          }
        });

      });

      return () => ctx.revert();
    }
  }, [inView]);

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Optimized animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Optimized grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Skills &{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              Expertise
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit built through years of hands-on experience and continuous learning
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-16 sm:mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              ref={(el) => el && (skillCardsRef.current[categoryIndex] = el)}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="group relative bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/10 hover:border-white/20 overflow-hidden will-change-transform"
              style={{ perspective: '1000px' }}
            >
              {/* Optimized background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Optimized animated border */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>

              <div className="relative z-10">
                <h3 className={`text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  {category.skills.map((skill, skillIndex) => {
                    const cardIndex = categoryIndex * 4 + skillIndex;
                    return (
                      <div key={skill.name} className="group/skill">
                        <div className="flex justify-between items-center mb-2 sm:mb-3">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <span className="text-lg sm:text-2xl">{skill.icon}</span>
                            <span className="text-white font-medium group-hover/skill:text-blue-300 transition-colors duration-200 text-sm sm:text-base">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-gray-400 text-xs sm:text-sm font-bold">
                            {skill.level}%
                          </span>
                        </div>
                        
                        <div className="relative">
                          <div className="w-full bg-gray-700/50 rounded-full h-2 sm:h-3 overflow-hidden backdrop-blur-sm">
                            <div
                              ref={(el) => el && (skillBarsRef.current[cardIndex] = el)}
                              data-level={skill.level}
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden shadow-lg will-change-transform`}
                              style={{
                                backgroundSize: '200% 100%',
                                backgroundImage: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
                              }}
                            >
                              {/* Optimized animated shine effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            </div>
                          </div>
                          
                          {/* Optimized glow effect */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-full blur-sm opacity-0 group-hover/skill:opacity-50 transition-opacity duration-200`}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Optimized floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 sm:w-2 h-1 sm:h-2 bg-white/20 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  ></div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optimized Technologies Cloud */}
        <motion.div
          ref={techCloudRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 sm:mt-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 sm:mb-12">
            Technologies I{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Work With
            </span>
          </h3>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {[
              { name: 'JavaScript', color: 'from-yellow-400 to-orange-500', emoji: '🟨' },
              { name: 'HTML5', color: 'from-orange-500 to-red-500', emoji: '🌐' },
              { name: 'CSS3', color: 'from-blue-400 to-blue-600', emoji: '🎨' },
              { name: 'SASS', color: 'from-pink-400 to-pink-600', emoji: '💅' },
              { name: 'GraphQL', color: 'from-pink-500 to-purple-500', emoji: '📊' },
              { name: 'REST API', color: 'from-green-400 to-green-600', emoji: '🔗' },
              { name: 'MongoDB', color: 'from-green-500 to-green-700', emoji: '🍃' },
              { name: 'Firebase', color: 'from-yellow-500 to-orange-500', emoji: '🔥' },
              { name: 'AWS', color: 'from-orange-400 to-orange-600', emoji: '☁️' },
              { name: 'Vercel', color: 'from-gray-700 to-gray-900', emoji: '▲' },
              { name: 'Jest', color: 'from-red-500 to-red-700', emoji: '🃏' },
              { name: 'Cypress', color: 'from-gray-600 to-gray-800', emoji: '🌲' },
              { name: 'Webpack', color: 'from-blue-500 to-blue-700', emoji: '📦' },
              { name: 'Vite', color: 'from-purple-500 to-purple-700', emoji: '⚡' },
              { name: 'ESLint', color: 'from-indigo-500 to-indigo-700', emoji: '🔍' },
              { name: 'Prettier', color: 'from-gray-500 to-gray-700', emoji: '✨' },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`tech-item group relative px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r ${tech.color} text-white rounded-full font-medium hover:shadow-2xl transition-all duration-300 cursor-default overflow-hidden border border-white/20 text-xs sm:text-sm will-change-transform`}
              >
                {/* Optimized background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                
                <div className="relative z-10 flex items-center space-x-1 sm:space-x-2">
                  <span className="text-sm sm:text-lg">{tech.emoji}</span>
                  <span className="font-semibold">{tech.name}</span>
                </div>

                {/* Optimized glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-200 -z-10`}></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;