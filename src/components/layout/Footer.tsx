import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter, Mail, Sparkles, Code, Coffee, PhoneCall, MapPin, Send  } from 'lucide-react';
import gsap from 'gsap';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animated background elements
    if (footerRef.current) {
      const ctx = gsap.context(() => {
        // Floating animation for decorative elements
        gsap.to('.footer-float', {
          y: -20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          stagger: 0.5,
        });

        // Heart beat animation
        if (heartRef.current) {
          gsap.to(heartRef.current, {
            scale: 1.3,
            duration: 0.6,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
          });
        }
      }, footerRef);

      return () => ctx.revert();
    }
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/fahadkhan008', label: 'GitHub', color: 'hover:text-gray-300' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/fahad-khan-818475289/', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: Mail, href: 'mailto:fahadkhan233144@gmail.com', label: 'Email', color: 'hover:text-purple-400' },
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 transition-colors duration-300 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl footer-float"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-3xl footer-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full filter blur-3xl footer-float"></div>
      </div>

      {/* Animated Stars Background */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
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

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Enhanced Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <Sparkles size={28} className="text-blue-400 animate-pulse" />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Fahad Khan
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              Full-Stack Developer & UI/UX Designer passionate about creating 
              exceptional digital experiences that make a difference.
            </p>
            
            {/* Enhanced stats */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">50+</div>
                <div className="text-xs text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">5+</div>
                <div className="text-xs text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">25+</div>
                <div className="text-xs text-gray-400">Clients</div>
              </div>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -5, 
                      scale: 1.2,
                      rotate: 360,
                    }}
                    viewport={{ once: true }}
                    className={`group p-3 bg-white/5 backdrop-blur-sm rounded-xl ${social.color} transition-all duration-500 border border-white/10 hover:border-white/30 relative overflow-hidden`}
                    aria-label={social.label}
                  >
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    
                    <Icon size={20} className="relative z-10 group-hover:animate-pulse" />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Enhanced Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-white flex items-center space-x-2">
              <Code size={20} className="text-blue-400" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    whileHover={{ x: 10, color: '#60a5fa' }}
                    className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center space-x-2 group"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span>{link.label}</span>
                  </motion.button>
                </motion.li>
              ))}
            </ul>

            {/* Tech stack */}
            <div className="pt-4">
              <h5 className="text-sm font-semibold text-gray-400 mb-3">Built with</h5>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'GSAP'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-2 py-1 bg-white/10 text-gray-300 rounded-md text-xs font-medium hover:bg-white/20 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-white flex items-center space-x-2">
              <Mail size={20} className="text-purple-400" />
              <span>Get In Touch</span>
            </h4>
            <div className="space-y-4 text-gray-300">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 group cursor-pointer"
              >
                <Send size={16} className="text-blue-400 group-hover:animate-bounce" />
                <a href='mailto:fahadkhan233144@gmail.com'>
                <span 
                  className="group-hover:text-white transition-colors duration-300"
                >
                  fahadkhan233144@gmail.com
                </span>
                </a>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 group cursor-pointer"
              >
                <PhoneCall size={16} className="text-green-400 group-hover:animate-bounce" />
                <a href='tel:+923104779591'>
                <span 
                  className="group-hover:text-white transition-colors duration-300"
                >
                  +92 (310) 477-9591
                </span>
                </a>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 group cursor-pointer"
              >
                <MapPin size={16} className="text-pink-400 group-hover:animate-bounce" />
                <a href='https://maps.app.goo.gl/4PjfDbpHXGKu5SiD8'>
                <span 
                  className="group-hover:text-white transition-colors duration-300"
                >
                  Lahore, Pakistan
                </span>
                </a>
              </motion.div>
            </div>
            
            {/* Enhanced availability status */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="relative p-4 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-xl border border-green-400/20 overflow-hidden"
            >
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-emerald-400/5 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-green-300 font-semibold text-sm">
                    Available for freelance
                  </span>
                </div>
                <p className="text-green-200 text-xs">
                  Open to new opportunities
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Fahad Khan. All rights reserved.
          </p>
          <div className="flex items-center space-x-3 text-gray-400 text-sm">
            <span>Made with</span>
            <motion.div
              ref={heartRef}
              className="text-red-500"
            >
              <Heart className="fill-current" size={16} />
            </motion.div>
            <span>and lots of</span>
            <Coffee size={16} className="text-orange-400 animate-bounce" />
            <span className='' >
              by Fahad Khan
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;