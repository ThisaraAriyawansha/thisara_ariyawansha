"use client";
import { useEffect, useState, useRef } from 'react';

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  // Detect dark mode
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark') ||
                  document.documentElement.getAttribute('data-theme') === 'dark';
    setIsDarkMode(isDark);

    const observer = new MutationObserver(() => {
      const newIsDark = document.documentElement.classList.contains('dark') ||
                       document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(newIsDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const footerElement = footerRef.current;
    if (footerElement) {
      footerElement.addEventListener('mousemove', handleMouseMove);
      return () => footerElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
          <path d="M9 18c-4.51 2-5-2-7-2"/>
        </svg>
      ), 
      url: 'https://github.com/ThisaraAriyawansha', 
      delay: '0ms' 
    },
    { 
      name: 'LinkedIn', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ), 
      url: 'http://www.linkedin.com/in/thisara-ariyawansha-274263284', 
      delay: '100ms' 
    },
    { 
      name: 'Email', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ), 
      url: 'mailto:thisara.a2001@gmail.com', 
      delay: '200ms' 
    },
  ];

  return (
    <footer
      ref={footerRef}
      className={`relative overflow-hidden transition-all duration-700 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-black'
      }`}
      style={{
        background: isDarkMode
          ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(128, 128, 128, 0.1) 0%, transparent 50%), linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)`
          : `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(128, 128, 128, 0.05) 0%, transparent 50%), linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #ffffff 100%)`,
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDarkMode ? 'bg-white/20' : 'bg-black/10'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Animated border */}
          <div
            className={`absolute top-0 left-0 right-0 
              ${isDarkMode
                ? 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'
                : 'bg-gradient-to-r from-transparent via-gray-600 to-transparent'
              }
              h-[2px] sm:h-[3px] md:h-[2px] lg:h-[2px]   // responsive heights
            `}
            style={{
              background: isDarkMode
                ? 'linear-gradient(90deg, transparent, rgba(156, 163, 175, 0.8), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(75, 85, 99, 0.8), transparent)',
              animation: 'shimmer 3s ease-in-out infinite',
            }}
          />


      <div className="relative z-10 max-w-6xl px-4 py-12 mx-auto">
        {/* Main content grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 transition-all duration-1000 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Brand section */}
          <div className="space-y-4">
            <div className="group">
              <h3
                className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                  isDarkMode
                    ? 'from-white to-gray-300'
                    : 'from-black to-gray-700'
                } `}
              >
                Thisara Ariyawansha
              </h3>
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              } leading-relaxed`}
            >
              Full Stack Developer crafting digital experiences with modern web technologies.
            </p>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h4
              className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Get in Touch
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.name === 'Email' ? '_self' : '_blank'}
                  rel={link.name === 'Email' ? '' : 'noopener noreferrer'}
                  className={`group relative w-10 h-10 rounded-lg border transition-all duration-300 flex items-center justify-center hover:scale-110 hover:-translate-y-1 ${
                    isDarkMode
                      ? 'bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 hover:border-gray-500'
                      : 'bg-gray-100/50 border-gray-300 hover:bg-gray-200/50 hover:border-gray-400'
                  }`}
                  style={{
                    animationDelay: link.delay,
                    animation: isVisible ? 'bounceIn 0.8s ease-out forwards' : 'none',
                  }}
                  title={link.name}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {link.icon}
                  </span>
                  
                  {/* Tooltip */}
                  <div
                    className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                      isDarkMode
                        ? 'bg-gray-800 text-white border border-gray-600'
                        : 'bg-white text-black border border-gray-300 shadow-lg'
                    }`}
                  >
                    {link.name}
                    <div className={`absolute w-0 h-0 transform -translate-x-1/2 border-t-4 border-l-4 border-r-4 border-transparent top-full left-1/2 ${
                      isDarkMode ? 'border-t-gray-800' : 'border-t-white'
                    }`}></div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider with animation */}
        <div className="relative mb-6">
          <div
            className={`h-px ${
              isDarkMode ? 'bg-gray-500' : 'bg-gray-500'
            } transition-all duration-1000 ${
              isVisible ? 'scale-x-100' : 'scale-x-0'
            }`}
            style={{ transformOrigin: 'center' }}
          ></div>
        </div>

        {/* Copyright section */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 transition-all duration-1000 delay-300 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-5 opacity-0'
          }`}
        >
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            } font-mono`}
          >
            © {currentYear} Thisara Ariyawansha. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4 text-sm">
            <span
              className={`${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Built with Next.js & Tailwind CSS
            </span>
          </div>
        </div>
      </div>

      {/* Custom keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </footer>
  );
}