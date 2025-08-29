import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Eye, Code, Palette, Zap, Sparkles, Star, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: 'All', icon: Eye, color: 'from-blue-500 to-purple-500' },
    { name: 'Web App', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { name: 'Mobile', icon: Zap, color: 'from-purple-500 to-pink-500' },
    { name: 'Design', icon: Palette, color: 'from-pink-500 to-rose-500' },
    { name: 'API', icon: Code, color: 'from-cyan-500 to-blue-500' },
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform built with React, Node.js, and PostgreSQL featuring real-time inventory management and payment processing.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Web App',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
      gradient: 'from-blue-500 to-cyan-500',
      stats: { views: '2.5K', stars: 45, forks: 12 }
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Web App',
      technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
      demoUrl: '#',
      githubUrl: '#',
      featured: false,
      gradient: 'from-blue-500 to-purple-500',
      stats: { views: '1.8K', stars: 32, forks: 8 }
    },
    {
      id: 3,
      title: 'Fitness Tracking Mobile App',
      description: 'React Native mobile app for fitness tracking with workout plans, progress monitoring, and social features.',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Mobile',
      technologies: ['React Native', 'Redux', 'Node.js', 'MongoDB'],
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
      gradient: 'from-purple-500 to-pink-500',
      stats: { views: '3.2K', stars: 67, forks: 23 }
    },
    {
      id: 4,
      title: 'Brand Identity Design',
      description: 'Complete brand identity design for a tech startup including logo, color palette, typography, and brand guidelines.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Design',
      technologies: ['Figma', 'Adobe Illustrator', 'Photoshop'],
      demoUrl: '#',
      githubUrl: '#',
      featured: false,
      gradient: 'from-pink-500 to-rose-500',
      stats: { views: '1.2K', stars: 28, forks: 5 }
    },
    {
      id: 5,
      title: 'RESTful API Service',
      description: 'Scalable RESTful API service built with Django and PostgreSQL, featuring authentication, rate limiting, and comprehensive documentation.',
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'API',
      technologies: ['Django', 'PostgreSQL', 'Redis', 'Docker'],
      demoUrl: '#',
      githubUrl: '#',
      featured: false,
      gradient: 'from-cyan-500 to-blue-500',
      stats: { views: '950', stars: 19, forks: 7 }
    },
    {
      id: 6,
      title: 'Dashboard Analytics',
      description: 'Interactive analytics dashboard with real-time data visualization, custom charts, and export functionality.',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Web App',
      technologies: ['React', 'D3.js', 'Node.js', 'WebSockets'],
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
      gradient: 'from-blue-500 to-purple-500',
      stats: { views: '2.1K', stars: 54, forks: 16 }
    },
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  useEffect(() => {
    if (inView) {
      const ctx = gsap.context(() => {
        // Optimized filter buttons animation
        if (filterRef.current) {
          const buttons = filterRef.current.querySelectorAll('.filter-btn');
          gsap.fromTo(buttons,
            { y: 20, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.4,
              stagger: 0.05,
              ease: 'power2.out',
            }
          );
        }

        // Optimized projects grid animation
        if (projectsGridRef.current) {
          const projectCards = projectsGridRef.current.querySelectorAll('.project-card');
          gsap.fromTo(projectCards,
            { 
              y: 30, 
              opacity: 0,
              scale: 0.98
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power2.out',
            }
          );
        }
      });

      return () => ctx.revert();
    }
  }, [inView, filteredProjects]);

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Optimized animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Animated Stars Background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
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
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              Projects
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work spanning web development, mobile apps, and design projects
          </p>
        </motion.div>

        {/* Ultra-smooth Filter Tabs */}
        <div ref={filterRef} className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.name}
                onClick={() => setFilter(category.name)}
                whileHover={{ 
                  scale: 1.02, 
                  y: -1,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className={`filter-btn group relative flex items-center space-x-2 sm:space-x-3 px-3 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-200 overflow-hidden text-sm sm:text-base ${
                  filter === category.name
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-blue-500/25`
                    : 'bg-white/5 backdrop-blur-md text-gray-300 hover:text-white border border-white/10 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                {/* Optimized shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                
                <IconComponent size={16} className="relative z-10 transition-transform duration-200 group-hover:scale-110" />
                <span className="relative z-10">{category.name}</span>
                
                {/* Optimized glow effect */}
                {filter === category.name && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-full blur-md opacity-30 -z-10`}></div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Ultra-smooth Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            ref={projectsGridRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                whileHover={{ 
                  y: -3, 
                  scale: 1.01,
                }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeOut",
                  type: "tween"
                }}
                className={`project-card group relative bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-white/20 will-change-transform ${
                  project.featured ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Optimized Image Container */}
                <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                    loading="lazy"
                  />
                  
                  {/* Optimized gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>
                  
                  {/* Enhanced featured badge */}
                  {project.featured && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                      className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center space-x-1 shadow-lg"
                    >
                      <Star size={12} className="fill-current" />
                      <span>Featured</span>
                    </motion.div>
                  )}

                  {/* Optimized stats overlay */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex space-x-2">
                    <div className="bg-black/30 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                      <Eye size={10} />
                      <span>{project.stats.views}</span>
                    </div>
                    <div className="bg-black/30 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                      <Star size={10} />
                      <span>{project.stats.stars}</span>
                    </div>
                  </div>

                  {/* Ultra-smooth Hover Actions */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex space-x-2 sm:space-x-3"
                      >
                        <motion.a
                          href={project.demoUrl}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="flex-1 bg-white/90 backdrop-blur-sm text-gray-900 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-semibold text-center hover:bg-white transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg text-xs sm:text-sm"
                        >
                          <ExternalLink size={14} />
                          <span>Demo</span>
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="flex-1 bg-gray-900/90 backdrop-blur-sm text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-semibold text-center hover:bg-gray-900 transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg text-xs sm:text-sm"
                        >
                          <Github size={14} />
                          <span>Code</span>
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Optimized Content */}
                <div className="p-4 sm:p-6 relative">
                  {/* Subtle background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-b-2xl sm:rounded-b-3xl`}></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-blue-300 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Optimized Technologies */}
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 + techIndex * 0.02 + 0.4 }}
                          whileHover={{ 
                            scale: 1.05, 
                            y: -1,
                            transition: { duration: 0.15 }
                          }}
                          className="px-2 sm:px-3 py-1 bg-white/10 backdrop-blur-sm text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-white/20 hover:border-blue-400/50 hover:text-blue-300 transition-all duration-200 cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Optimized animated border */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.02, 
              y: -2,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-xl transition-all duration-300 overflow-hidden hover:shadow-blue-500/25 text-sm sm:text-base"
          >
            {/* Optimized background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
            
            <span className="relative z-10 flex items-center space-x-2">
              <span>View All Projects</span>
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;