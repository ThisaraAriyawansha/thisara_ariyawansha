"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    
    // Or check for system preference if no saved preference
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container') && !event.target.closest('.mobile-menu-button')) {
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
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleDarkMode = () => {
    if (darkMode) {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="bg-white text-black mx-auto mt-6 px-6 py-4 flex justify-between items-center shadow-sm transition-all duration-300 dark:bg-gray-100 dark:text-black rounded-2xl max-w-6xl w-[90%] font-sans relative z-50">
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
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <a 
                href="#home" 
                className="hover:opacity-70 transition-all duration-300 font-medium hover:scale-105 text-sm"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className="hover:opacity-70 transition-all duration-300 font-medium hover:scale-105 text-sm"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className="hover:opacity-70 transition-all duration-300 font-medium hover:scale-105 text-sm"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="hover:opacity-70 transition-all duration-300 font-medium hover:scale-105 text-sm"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
              >
                Contact
              </a>
            </li>
          </ul>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 transition-all duration-300 hover:bg-gray-200 dark:bg-gray-200 dark:hover:bg-gray-300 hover:scale-110 active:scale-95"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 transition-all duration-300 hover:bg-gray-200 dark:bg-gray-200 dark:hover:bg-gray-300 hover:scale-110 active:scale-95"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          <button
            onClick={toggleMenu}
            className="mobile-menu-button p-2 rounded-full transition-all duration-300 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 hover:scale-110 active:scale-95"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              {/* Hamburger lines with smooth animation */}
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
        {/* Backdrop */}
        <div className={`absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}></div>
        
        {/* Menu Container */}
        <div className={`mobile-menu-container absolute top-26 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl transition-all duration-300 ease-out ${
          isMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 opacity-0 scale-95'
        }`}>
          <div className="bg-white dark:bg-gray-100 text-black dark:text-black rounded-2xl shadow-lg border border-gray-700 dark:border-gray-200 overflow-hidden">
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
                      className={`block py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-200 transition-all duration-200 font-medium hover:translate-x-2 transform text-sm ${
                        isMenuOpen ? 'animate-fadeInUp' : ''
                      }`}
                      style={{ 
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: 'both'
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