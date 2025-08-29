import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiTailwindcss} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCardsRef = useRef<HTMLDivElement[]>([]);
  const skillBarsRef = useRef<HTMLDivElement[]>([]);
  const techCloudRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: "Frontend",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      skills: [
        {
          name: "React",
          level: 95,
          color: "from-blue-400 to-blue-600",
          icon: (
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
              width="24"
              height="24"
              alt="React"
              className="inline-block"
            />
          ),
        },
        {
          name: "TypeScript",
          level: 90,
          color: "from-blue-500 to-blue-700",
          icon: (
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
              width="24"
              height="24"
              alt="TypeScript"
              className="inline-block"
            />
          ),
        },
        {
          name: "Next.js",
          level: 85,
          color: "from-gray-700 to-gray-900",
          icon: (
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
              width="24"
              height="24"
              alt="Next.js"
              className="inline-block dark:invert"
            />
          ),
        },
        {
          name: "Tailwind CSS",
          level: 92,
          color: "from-teal-400 to-teal-600",
          icon: <SiTailwindcss className="text-[#3178C6]" />,
        },
      ],
    },
    {
      title: "Backend",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      skills: [
        {
          name: "Node.js",
          level: 88,
          color: "from-green-400 to-green-600",
          icon: (
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
              width="24"
              height="24"
              alt="Node.js"
              className="inline-block"
            />
          ),
        },
        {
          name: "Python",
          level: 85,
          color: "from-yellow-400 to-yellow-600",
          icon: (
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
              width="24"
              height="24"
              alt="Python"
              className="inline-block"
            />
          ),
        },
        {
          name: "Django",
          level: 80,
          color: "from-green-600 to-green-800",
          icon: (
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"
              width="24"
              height="24"
              alt="Django"
              className="inline-block"
            />
          ),
        },
        {
          name: "PostgreSQL",
          level: 82,
          color: "from-blue-600 to-blue-800",
          icon: (
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
              width="24"
              height="24"
              alt="PostgreSQL"
              className="inline-block"
            />
          ),
        },
      ],
    },
    {
      title: "Design & Tools",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      skills: [
        {
          name: "Figma",
          level: 90,
          color: "from-purple-400 to-purple-600",
          icon: (
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
              width="24"
              height="24"
              alt="Figma"
              className="inline-block"
            />
          ),
        },
        {
          name: "Adobe XD",
          level: 85,
          color: "from-pink-400 to-pink-600",
          icon: (
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg"
              width="24"
              height="24"
              alt="Adobe XD"
              className="inline-block"
            />
          ),
        },
        {
          name: "Git",
          level: 93,
          color: "from-orange-400 to-orange-600",
          icon: (
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
              width="24"
              height="24"
              alt="Git"
              className="inline-block"
            />
          ),
        },
        {
          name: "Docker",
          level: 75,
          color: "from-blue-400 to-blue-600",
          icon: (
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
              width="24"
              height="24"
              alt="Docker"
              className="inline-block"
            />
          ),
        },
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
                ease: "power2.out",
                transformOrigin: "center center",
              }
            );
          }
        });

        // Optimized skill bars animation
        skillBarsRef.current.forEach((bar, index) => {
          if (bar) {
            const skillLevel = parseInt(bar.dataset.level || "0");
            gsap.fromTo(
              bar,
              { width: "0%", opacity: 0 },
              {
                width: `${skillLevel}%`,
                opacity: 1,
                duration: 1.2,
                delay: Math.floor(index / 4) * 0.2 + (index % 4) * 0.08,
                ease: "power2.out",
              }
            );

            // Optimized shimmer effect
            gsap.to(bar, {
              backgroundPosition: "200% center",
              duration: 2,
              repeat: -1,
              ease: "none",
              delay: Math.floor(index / 4) * 0.2 + (index % 4) * 0.08 + 1.2,
            });
          }
        });

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

        // Optimized tech cloud animation
        if (techCloudRef.current) {
          const techItems = techCloudRef.current.querySelectorAll(".tech-item");
          gsap.fromTo(
            techItems,
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
              ease: "power2.out",
              scrollTrigger: {
                trigger: techCloudRef.current,
                start: "top 80%",
              },
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
              ease: "power2.inOut",
              delay: index * 0.3,
            });
          }
        });
      });

      return () => ctx.revert();
    }
  }, [inView]);

  return (
    <section
      id="skills"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Optimized animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-float"
          style={{ animationDelay: "3s" }}></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-float"
          style={{ animationDelay: "6s" }}></div>
      </div>

      {/* Optimized grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}></div>

        {/* Optimized floating particles */}
              <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
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

        {/* Animated Stars Background */}
        <div className="absolute inset-0">
          {[...Array(7)].map((_, i) => (
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Skills &{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              Expertise
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit built through years of hands-on experience
            and continuous learning
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
              style={{ perspective: "1000px" }}>
              {/* Optimized background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              {/* Optimized animated border */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>

              <div className="relative z-10">
                <h3
                  className={`text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  {category.skills.map((skill, skillIndex) => {
                    const cardIndex = categoryIndex * 4 + skillIndex;
                    return (
                      <div key={skill.name} className="group/skill">
                        <div className="flex justify-between items-center mb-2 sm:mb-3">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <span className="text-lg sm:text-2xl">
                              {skill.icon}
                            </span>
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
                              ref={(el) =>
                                el && (skillBarsRef.current[cardIndex] = el)
                              }
                              data-level={skill.level}
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden shadow-lg will-change-transform`}
                              style={{
                                backgroundSize: "200% 100%",
                                backgroundImage: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
                              }}>
                              {/* Optimized animated shine effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            </div>
                          </div>

                          {/* Optimized glow effect */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-full blur-sm opacity-0 group-hover/skill:opacity-50 transition-opacity duration-200`}></div>
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
                    }}></div>
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
          className="mt-12 sm:mt-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 sm:mb-12">
            Technologies I{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Work With
            </span>
          </h3>

          {/* First horizontal line - Frontend & Main Technologies  */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-12">
            {[
              {
                name: "React",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
              },
              {
                name: "Next.js",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
              },
              {
                name: "TypeScript",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
              },
              {
                name: "JavaScript",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
              },
              {
                name: "Three.js",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
              },
              {
                name: "Tailwind CSS",
                icon: "https://static.cdnlogo.com/logos/t/80/tailwind-css_800.png",
              },
              {
                name: "Redux",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
              },
              {
                name: "Jest",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
              },
              {
                name: "Framer Motion",
                icon: "https://cdn.simpleicons.org/framer/black",
              },
              {
                name: "GSAP",
                icon: "https://static.cdnlogo.com/logos/g/31/gsap-greensock.svg",
              },
              {
                name: "Sass",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
              },
              {
                name: "Bootstrap",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
              },
              {
                name: "Material UI",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
              },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="relative group flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: index * 0.1 },
                  y: {
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{
                  scale: 1.3,
                  y: -15,
                  transition: { duration: 0.3 },
                }}>
                <img
                  src={tech.icon}
                  width="48"
                  height="48"
                  alt={tech.name}
                  className="drop-shadow-lg filter hover:drop-shadow-[0_0_12px_rgba(192,132,252,0.6)] transition-all duration-300"
                />
                <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-800/90 text-white text-xs font-medium py-1 px-2 rounded-md whitespace-nowrap backdrop-blur-sm">
                  {tech.name}
                </div>
                <div className="absolute inset-0 bg-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 blur-md group-hover:scale-125 transition-all duration-300 -z-10"></div>
              </motion.div>
            ))}
          </div>

          {/* Second horizontal line - Backend, Tools & Deployment  */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-12 ">
            {[
              {
                name: "Node.js",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
              },
              {
                name: "Git",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
              },
              {
                name: "GitHub",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
              },
              {
                name: "Docker",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
              },
              {
                name: "Azure",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
              },
              {
                name: "PostgreSQL",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
              },
              {
                name: "MySQL",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
              },
              {
                name: "SQLite",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
              },
              {
                name: "Next UI",
                icon: "https://avatars.githubusercontent.com/u/86160567?s=200&v=4",
              },
              {
                name: "MongoDB",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
              },
              {
                name: "Vercel",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
              },
              {
                name: "Netlify",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
              },
              {
                name: "ESlint",
                icon: "https://static.cdnlogo.com/logos/e/80/eslint.svg",
              },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="relative group flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.5 + index * 0.1 },
                  y: {
                    duration: 5 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  },
                }}
                whileHover={{
                  scale: 1.3,
                  y: -15,
                  transition: { duration: 0.3 },
                }}>
                <img
                  src={tech.icon}
                  width="44"
                  height="44"
                  alt={tech.name}
                  className="drop-shadow-lg filter hover:drop-shadow-[0_0_12px_rgba(192,132,252,0.6)] transition-all duration-300"
                />
                <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-800/90 text-white text-xs font-medium py-1 px-2 rounded-md whitespace-nowrap backdrop-blur-sm">
                  {tech.name}
                </div>
                <div className="absolute inset-0 bg-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 blur-md group-hover:scale-125 transition-all duration-300 -z-10"></div>
              </motion.div>
            ))}
          </div>

          {/* third horizontal line - more tools and tech */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 ">
            {[
              {
                name: "HTML5",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
              },
              {
                name: "CSS3",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
              },
              {
                name: "Python",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
              },
              {
                name: "Redis",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
              },
              {
                name: "AWS",
                icon: "https://static.cdnlogo.com/logos/a/10/aws_800.png",
              },
              {
                name: "Firebase",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
              },
              {
                name: "Supabase",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
              },
              {
                name: "Django",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
              },
              {
                name: "NPM",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg",
              },
              {
                name: "PNPM",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pnpm/pnpm-original.svg",
              },
              {
                name: "esbuild",
                icon: "https://cdn.simpleicons.org/esbuild/FFCF00",
              },
              {
                name: "Vite",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
              },
              {
                name: "FastAPI",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
              },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="relative group flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: index * 0.1 },
                  y: {
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{
                  scale: 1.3,
                  y: -15,
                  transition: { duration: 0.3 },
                }}>
                <img
                  src={tech.icon}
                  width="48"
                  height="48"
                  alt={tech.name}
                  className="drop-shadow-lg filter hover:drop-shadow-[0_0_12px_rgba(192,132,252,0.6)] transition-all duration-300"
                />
                <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-800/90 text-white text-xs font-medium py-1 px-2 rounded-md whitespace-nowrap backdrop-blur-sm">
                  {tech.name}
                </div>
                <div className="absolute inset-0 bg-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 blur-md group-hover:scale-125 transition-all duration-300 -z-10"></div>
              </motion.div>
            ))}
          </div>

          {/* Subtle background animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-500 rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
