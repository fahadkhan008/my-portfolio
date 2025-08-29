import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, MessageCircle, Calendar, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      const ctx = gsap.context(() => {
        // Optimized contact info cards animation
        if (contactInfoRef.current) {
          const cards = contactInfoRef.current.querySelectorAll('.contact-card');
          gsap.fromTo(cards,
            { 
              x: -50, 
              opacity: 0,
              scale: 0.95
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power2.out',
            }
          );
        }

        // Optimized form animation
        if (formRef.current) {
          const formElements = formRef.current.querySelectorAll('.form-element');
          gsap.fromTo(formElements,
            { 
              x: 50, 
              opacity: 0,
              scale: 0.95
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power2.out',
            }
          );
        }

        // Optimized floating particles animation
        if (particlesRef.current) {
          const particles = particlesRef.current.querySelectorAll('.particle');
          particles.forEach((particle, index) => {
            gsap.to(particle, {
              y: -20,
              x: Math.sin(index) * 30,
              rotation: 180,
              duration: 2 + index * 0.3,
              repeat: -1,
              yoyo: true,
              ease: 'power2.inOut',
              delay: index * 0.1,
            });
          });
        }
      });

      return () => ctx.revert();
    }
  }, [inView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('idle');

  const serviceId = 'service_mlfc71v';
  const templateId = 'template_qhbiazg'
  const publicKey = 'zt9ONKooeADB9YHLB';

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
  };

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  } catch (error) {
    console.error('EmailJS Error:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 5000);
  }
};

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'fahadkhan233144@gmail.com',
      href: 'mailto:fahadkhan233144@gmail.com',
      color: 'from-blue-500 to-cyan-500',
      description: 'Drop me a line anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+92 (310) 477-9591',
      href: 'tel:+923104779591',
      color: 'from-green-500 to-emerald-500',
      description: 'Let\'s have a chat'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Lahore, Pakistan',
      href: 'https://goo.gl/maps/3Z1b5f8z5xv',
      color: 'from-purple-500 to-pink-500',
      description: 'Available worldwide'
    },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Optimized background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-purple-500/10 to-pink-500/5"></div>
        <div className="absolute top-20 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
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
              filter: 'blur(0.5px)',
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
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Get In{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              Touch
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Optimized Contact Info */}
          <div ref={contactInfoRef} className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Let's Start a Conversation
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you have a specific project in mind or just want to explore possibilities, 
                I'd love to hear from you.
              </p>
            </motion.div>

            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    whileHover={{ 
                      x: 8, 
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="contact-card group flex items-center space-x-4 sm:space-x-6 p-4 sm:p-6 bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-white/20 relative overflow-hidden will-change-transform"
                  >
                    {/* Optimized background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    {/* Icon container */}
                    <div className={`relative flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r ${info.color} rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                      <Icon className="text-white" size={20} />
                      
                      {/* Optimized glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${info.color} rounded-xl sm:rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10`}></div>
                    </div>
                    
                    <div className="relative z-10">
                      <h4 className="font-bold text-white text-base sm:text-lg group-hover:text-blue-300 transition-colors duration-200">
                        {info.title}
                      </h4>
                      <p className="text-blue-300 font-medium text-sm sm:text-base">{info.content}</p>
                      <p className="text-gray-400 text-xs sm:text-sm mt-1">{info.description}</p>
                    </div>

                    {/* Optimized shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </motion.a>
                );
              })}
            </div>

            {/* Optimized Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="relative p-4 sm:p-6 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-green-400/20 overflow-hidden"
            >
              {/* Optimized background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-emerald-400/5 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-2 sm:mb-3">
                  <div className="relative">
                    <div className="w-3 sm:w-4 h-3 sm:h-4 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 sm:w-4 h-3 sm:h-4 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-green-300 font-bold text-base sm:text-lg">
                    Available for new projects
                  </span>
                  <Zap size={18} className="text-green-400 animate-bounce" />
                </div>
                <p className="text-green-200 mb-3 sm:mb-4 text-sm sm:text-base">
                  Currently accepting new client work for Q1 {new Date().getFullYear()}.
                </p>
                
                {/* Quick stats */}
                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <MessageCircle size={14} className="text-green-400" />
                    <span className="text-green-200">24h response time</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} className="text-green-400" />
                    <span className="text-green-200">Free consultation</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Optimized Contact Form */}
          <motion.div
            // ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/10 overflow-hidden"
          >
            {/* Optimized background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">
                Send me a message
              </h3>
              
              <form 
                onSubmit={handleSubmit} 
                className="space-y-4 sm:space-y-6"
                ref={formRef}
              >
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="form-element">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="from_name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 hover:border-white/40 text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-element">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="from_email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 hover:border-white/40 text-sm sm:text-base"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="form-element">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 hover:border-white/40 text-sm sm:text-base"
                    placeholder="Project Discussion"
                  />
                </div>

                <div className="form-element">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 resize-none hover:border-white/40 text-sm sm:text-base"
                    placeholder="Tell me about your project ideas, timeline, and how I can help bring them to life..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="form-element w-full py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 relative overflow-hidden group text-sm sm:text-base"
                >
                  {/* Optimized background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                  
                  <div className="relative z-10 flex items-center space-x-2 sm:space-x-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircle size={18} />
                        <span>Message Sent!</span>
                      </>
                    ) : submitStatus === 'error' ? (
                      <>
                        <AlertCircle size={18} />
                        <span>Try Again</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </div>
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 sm:p-4 bg-green-500/10 border border-green-400/20 rounded-lg sm:rounded-xl backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <CheckCircle size={18} className="text-green-400" />
                      <p className="text-green-300 font-medium text-sm sm:text-base">
                        Thank you for your message! I'll get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;