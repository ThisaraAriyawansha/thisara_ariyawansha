"use client";
import { useEffect, useState, useRef } from 'react';

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const footerRef = useRef(null);
  
  // Generate particle positions once - using useRef to persist across renders
  const particlesRef = useRef(
    Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    }))
  );

  // Only render particles after component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Enhanced scroll detection for scroll-to-top button
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
          setShowScrollTop(scrollPosition > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced smooth scroll to top function
  const scrollToTop = () => {
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      const scrollToTopSmooth = () => {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(scrollToTopSmooth);
          window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
      };
      scrollToTopSmooth();
    }
  };

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
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full border-2 backdrop-blur-md transition-all duration-500 transform ${
          showScrollTop
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-16 opacity-0 scale-50 pointer-events-none'
        } ${
          isDarkMode
            ? 'bg-gray-800/80 border-gray-600 hover:bg-gray-700/90 hover:border-gray-500 text-white shadow-xl shadow-black/20'
            : 'bg-white/80 border-gray-300 hover:bg-white/90 hover:border-gray-400 text-black shadow-xl shadow-black/10'
        } hover:scale-110 hover:-translate-y-1 group`}
        aria-label="Scroll to top"
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
          
          <div className={`absolute inset-0 rounded-full transition-transform duration-300 ${
            isDarkMode ? 'bg-white/5' : 'bg-black/5'
          } scale-0 group-hover:scale-100 group-hover:animate-ping`}></div>
        </div>
        
        <div className={`absolute -left-16 sm:-left-18 lg:-left-20 top-1/2 transform -translate-y-1/2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
          isDarkMode
            ? 'bg-gray-800 text-white border border-gray-600'
            : 'bg-white text-black border border-gray-300 shadow-lg'
        }`}>
          Back to top
          <div className={`absolute w-0 h-0 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent top-1/2 -right-1 ${
            isDarkMode ? 'border-l-gray-800' : 'border-l-white'
          }`}></div>
        </div>
      </button>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {isMounted && particlesRef.current.map((particle, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDarkMode ? 'bg-white/20' : 'bg-black/10'
            }`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
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
          h-[2px] sm:h-[3px] md:h-[2px] lg:h-[2px]
        `}
        style={{
          background: isDarkMode
            ? 'linear-gradient(90deg, transparent, rgba(156, 163, 175, 0.8), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(75, 85, 99, 0.8), transparent)',
          animation: 'shimmer 3s ease-in-out infinite',
        }}
      />

      <div className="relative z-10 max-w-6xl px-6 py-10 mx-auto sm:px-8 sm:py-14">
        {/* Top row: copyright + back to top */}
        <div
          className={`flex items-center justify-between transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
        >
          <p className={`text-xs sm:text-sm tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © {currentYear}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 group"
            aria-label="Back to top"
          >
            <span
              className={`text-xs sm:text-sm font-medium tracking-wide ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              BACK TO TOP
            </span>
            <span
              className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-transform duration-300 group-hover:-translate-y-1 ${
                isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 15-6-6-6 6"/>
              </svg>
            </span>
          </button>
        </div>

        {/* Big CTA */}
        <div
          className={`mt-16 sm:mt-20 transition-all duration-1000 delay-150 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className={`text-xs sm:text-sm font-semibold tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            HAVE A PROJECT IN MIND?
          </p>
          <a
            href="#contact"
            className={`block font-extrabold uppercase leading-none tracking-tight transition-colors duration-300 ${
              isDarkMode ? 'text-gray-700 hover:text-white' : 'text-gray-200 hover:text-black'
            }`}
            style={{ fontSize: 'clamp(3rem, 12vw, 9rem)' }}
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Social pills */}
        <div
          className={`flex flex-wrap gap-3 mt-10 sm:mt-14 transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.name === 'Email' ? '_self' : '_blank'}
              rel={link.name === 'Email' ? '' : 'noopener noreferrer'}
              className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? 'border-gray-600 text-gray-200 hover:bg-white hover:text-black hover:border-white'
                  : 'border-gray-300 text-gray-700 hover:bg-black hover:text-white hover:border-black'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div
          className={`h-px mt-12 sm:mt-16 transition-all duration-1000 delay-500 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          } ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
          style={{ transformOrigin: 'center' }}
        ></div>

        {/* Credit */}
        <div
          className={`flex justify-start md:justify-end pt-6 transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
        >
          <p className={`text-xs sm:text-sm text-left md:text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Design &amp; Development by Thisara Ariyawansha
          </p>
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