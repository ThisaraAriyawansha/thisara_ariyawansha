// Navbar.tsx - Updated with gray-200 light mode background
"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Get initial theme
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Set initial state based on saved preference or system preference
    const initialDarkMode = savedTheme 
      ? savedTheme === "dark" 
      : systemPrefersDark;
    
    setDarkMode(initialDarkMode);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      // Only change if user hasn't explicitly set a preference
      if (!localStorage.getItem("theme")) {
        setDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add("dark");
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.setAttribute("data-theme", "light");
        }
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          !(event.target.closest('.mobile-menu-container')) && 
          !(event.target.closest('.mobile-menu-button'))) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    const handleNavClick = (href) => {
      setIsMenuOpen(false);

      const element = document.querySelector(href);
      if (!element) return;

      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 2500; // duration in ms (increase for slower scroll)
      let start = null;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1); // 0 to 1
        window.scrollTo(0, startPosition + distance * percent);
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };


  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="mx-auto mt-6 px-6 py-4 flex justify-between items-center shadow-sm rounded-2xl max-w-6xl w-[90%] font-sans relative z-50" style={{ backgroundColor: darkMode ? '#000000' : '#e5e7eb', color: darkMode ? '#ffffff' : '#000000' }}>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-2 lg:py-4 flex justify-between items-center shadow-sm transition-all duration-300 rounded-2xl max-w-6xl w-[90%] font-sans"
        style={{
          backgroundColor: darkMode ? '#000000' : '#e5e7eb',
          color: darkMode ? '#ffffff' : '#000000',
        }}
      >       
   {/* Logo that changes based on theme */}
        <div className="flex items-center">
          {darkMode ? (
            <img
              src="/TA_light.png"
              alt="Logo"
              width={50}
              height={50}
              className="transition-opacity duration-300"
            />
          ) : (
            <img
              src="/TA_dark.png"
              alt="Logo"
              width={50}
              height={50}
              className="transition-opacity duration-300"
            />
          )}
        </div>
        
        {/* Desktop Navigation */}
        <div className="items-center hidden space-x-6 md:flex">
          <ul className="flex space-x-6">
            <li>
              <a 
                href="#home" 
                className="text-sm font-medium transition-all duration-300 hover:opacity-70 hover:scale-105"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#home');
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className="text-sm font-medium transition-all duration-300 hover:opacity-70 hover:scale-105"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#about');
                }}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className="text-sm font-medium transition-all duration-300 hover:opacity-70 hover:scale-105"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#projects');
                }}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="text-sm font-medium transition-all duration-300 hover:opacity-70 hover:scale-105"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
              >
                Contact
              </a>
            </li>
          </ul>
          <button
            onClick={toggleDarkMode}
            className="p-2 transition-all duration-300 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-200 dark:hover:bg-gray-300 hover:scale-110 active:scale-95"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 transition-all duration-300 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-200 dark:hover:bg-gray-300 hover:scale-110 active:scale-95"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 transition-all duration-300 rounded-full mobile-menu-button hover:bg-gray-200 dark:hover:bg-gray-300 hover:scale-110 active:scale-95"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'top-3 rotate-45' : 'top-1.5 rotate-0'
              }`}></span>
              <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out top-3 ${
                isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}></span>
              <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'top-3 -rotate-45' : 'top-4.5 rotate-0'
              }`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu with backdrop */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className={`absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}></div>
        
        <div className={`mobile-menu-container absolute top-22 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl transition-all duration-300 ease-out ${
          isMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 opacity-0 scale-95'
        }`}>
          <div className="overflow-hidden border shadow-lg rounded-2xl" style={{ backgroundColor: darkMode ? '#000000' : '#e5e7eb', color: darkMode ? '#ffffff' : '#000000', borderColor: darkMode ? '#374151' : '#d1d5db' }}>
            <div className="px-6 py-4">
              <ul className="space-y-1">
                {[
                  { href: '#home', label: 'Home' },
                  { href: '#about', label: 'About' },
                  { href: '#projects', label: 'Projects' },
                  { href: '#contact', label: 'Contact' }
                ].map((item, index) => (
                  <li key={item.href}>
                    <a 
                      href={item.href}
                      className={`block py-3 px-4 rounded-xl transition-all duration-200 font-medium hover:translate-x-2 transform text-sm ${
                        isMenuOpen ? 'animate-fadeInUp' : ''
                      }`}
                      style={{ 
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: 'both',
                        backgroundColor: 'transparent',
                        ':hover': {
                          backgroundColor: darkMode ? '#374151' : '#f9fafb'
                        }
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = darkMode ? '#374151' : '#f9fafb';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
}