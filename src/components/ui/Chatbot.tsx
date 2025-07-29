import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import OpenAI from 'openai';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm fahad's AI assistant. I can answer questions about his skills, projects, experience, and availability. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize OpenAI client
  const apiKey = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;
  const hasValidApiKey = apiKey && apiKey !== 'your_openai_api_key_here' && !apiKey.includes('your-ope');
  
  const openai = hasValidApiKey ? new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Note: In production, use a backend API
  }) : null;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatbotRef.current) {
      gsap.fromTo(chatbotRef.current.querySelectorAll('.message-item'),
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
      
      // Focus input when opened
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, messages]);

  const portfolioContext = `
    You are an AI assistant for Fahad khan's portfolio website. Here's information about Alex:

    PERSONAL INFO:
    - Name: Fahad Khan
    - Role: Full-Stack Developer & UI/UX Designer
    - Location: Lahore, Pakistan
    - Email: alex.morgan@example.com
    - Phone: +1 (555) 123-4567
    - Experience: 5+ years in web development
    - Currently available for new projects

    SKILLS & TECHNOLOGIES:
    Frontend: React, TypeScript, Next.js, Tailwind CSS, JavaScript, HTML5, CSS3, SASS
    Backend: Node.js, Python, Django, PostgreSQL, MongoDB, REST APIs, GraphQL
    Design: Figma, Adobe XD, UI/UX Design, Responsive Design
    Tools: Git, Docker, AWS, Vercel, Jest, Cypress, Webpack, Vite

    PROJECTS:
    1. E-Commerce Platform - React, Node.js, PostgreSQL, Stripe integration
    2. Task Management App - React, TypeScript, Firebase, real-time collaboration
    3. Fitness Tracking Mobile App - React Native, Redux, MongoDB
    4. Brand Identity Design - Complete branding for tech startup
    5. RESTful API Service - Django, PostgreSQL, Redis, Docker
    6. Dashboard Analytics - React, D3.js, WebSockets, real-time data

    EXPERIENCE:
    - Senior Full-Stack Developer at TechCorp (2021-Present)
    - Frontend Developer at StartupXYZ (2019-2021)
    - UI/UX Designer at DesignStudio (2018-2019)

    ACHIEVEMENTS:
    - 50+ completed projects
    - 25+ satisfied clients
    - Expert in 15+ technologies
    - Available for freelance work

    Please respond as Alex's helpful AI assistant. Be friendly, professional, and provide accurate information about Alex's skills, experience, and projects. If asked about availability, mention he's currently accepting new projects for Q1 2024.
  `;

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      let assistantMessage: Message;

      if (hasValidApiKey && openai) {
        // Use OpenAI API
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: portfolioContext
            },
            ...messages.map(msg => ({
              role: msg.role as "user" | "assistant",
              content: msg.content
            })),
            {
              role: "user",
              content: currentInput
            }
          ],
          max_tokens: 300,
          temperature: 0.7,
        });

        assistantMessage = {
          id: (Date.now() + 1).toString(),
          content: completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request. Please try again.",
          role: 'assistant',
          timestamp: new Date(),
        };
      } else {
        // Use fallback responses
        const response = getFallbackResponse(currentInput);
        assistantMessage = {
          id: (Date.now() + 1).toString(),
          content: response,
          role: 'assistant',
          timestamp: new Date(),
        };
      }

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Service Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getFallbackResponse(currentInput),
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback response system when OpenAI API is not available
  const getFallbackResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('skill') || lowerInput.includes('technology') || lowerInput.includes('tech')) {
      return "Alex is proficient in React, TypeScript, Node.js, Python, Django, PostgreSQL, and modern web technologies. He has 5+ years of experience in full-stack development and UI/UX design. His expertise includes building scalable web applications, RESTful APIs, and creating intuitive user interfaces.";
    }
    
    if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
      return "Alex has completed 50+ projects including e-commerce platforms, task management apps, mobile applications, and API services. His notable work includes a React-based e-commerce platform with real-time inventory management, a collaborative task management app with drag-and-drop functionality, and various mobile apps built with React Native.";
    }
    
    if (lowerInput.includes('experience') || lowerInput.includes('background') || lowerInput.includes('career')) {
      return "Alex has 5+ years of professional experience as a Full-Stack Developer. He's currently a Senior Full-Stack Developer at TechCorp (2021-Present), previously worked as a Frontend Developer at StartupXYZ (2019-2021), and started as a UI/UX Designer at DesignStudio (2018-2019). He's passionate about creating exceptional digital experiences.";
    }
    
    if (lowerInput.includes('contact') || lowerInput.includes('hire') || lowerInput.includes('available') || lowerInput.includes('email')) {
      return "Alex is currently available for new projects! You can reach him at alex.morgan@example.com or call +1 (555) 123-4567. He's based in San Francisco, CA but works with clients worldwide. He offers free consultations and typically responds within 24 hours.";
    }
    
    if (lowerInput.includes('education') || lowerInput.includes('learn') || lowerInput.includes('study')) {
      return "Alex is a continuous learner who stays updated with the latest technologies. He regularly contributes to open-source projects, attends tech conferences, and shares knowledge with the developer community. His learning approach combines hands-on projects with theoretical understanding.";
    }
    
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('rate') || lowerInput.includes('budget')) {
      return "Alex offers competitive rates based on project scope and requirements. He provides detailed quotes after understanding your specific needs. For accurate pricing, please contact him directly at alex.morgan@example.com with your project details.";
    }
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello! I'm Alex's AI assistant. I'm here to help you learn more about Alex's skills, experience, and projects. Feel free to ask me anything about his work, availability, or technical expertise!";
    }
    
    if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
      return "You're welcome! If you have any other questions about Alex's work or would like to get in touch with him, feel free to ask. I'm here to help!";
    }
    
    // Default response
    return "I'd be happy to help you learn more about Alex! You can ask me about his technical skills, project experience, work background, or how to get in touch with him. What would you like to know?";
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "What are Alex's main skills?",
    "Tell me about his projects",
    "Is Alex available for hire?",
    "What's his experience level?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Alex's AI Assistant</h3>
                  <p className="text-gray-300 text-sm flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Online
                  </p>
                </div>
                <div className="ml-auto">
                  <Sparkles size={16} className="text-blue-400 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={chatbotRef} className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`message-item flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600'
                    }`}>
                      {message.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                    </div>
                    <div className={`p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/20 text-white'
                        : 'bg-white/10 backdrop-blur-sm border border-white/20 text-gray-100'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Loader size={16} className="text-blue-400 animate-spin" />
                        <span className="text-gray-300 text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-gray-400 text-xs mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 text-gray-300 rounded-full border border-white/20 transition-all duration-200"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Alex's skills, projects, or experience..."
                  className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <Send size={16} className="relative z-10" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;