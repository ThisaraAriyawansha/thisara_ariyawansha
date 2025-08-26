"use client";

import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = "👋 Hi! I am Thisara Ariyawansha...";

  // Detect dark mode
  useEffect(() => {
    // Initial check for dark mode
    const isDark = document.documentElement.classList.contains('dark') ||
                  document.documentElement.getAttribute('data-theme') === 'dark';
    setIsDarkMode(isDark);

    // Observe changes to class or data-theme
    const observer = new MutationObserver(() => {
      const newIsDark = document.documentElement.classList.contains('dark') ||
                      document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(newIsDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  // Function to handle CV download
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv/Thisara Ariyawansha.pdf';
    link.download = 'Thisara Ariyawansha.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
        <div
          className={`relative overflow-hidden transition-all duration-500 ease-out min-h-screen font-apple ${
            isDarkMode
              ? 'bg-gradient-to-b from-gray-900 via-black to-transparent'
              : 'bg-white'
          }`}
        >

        <section className="flex flex-col items-center justify-between min-h-screen gap-12 px-6 py-12 lg:flex-row md:px-16 lg:px-24">
          {/* Left Content */}
          <div className="w-full space-y-6 text-center lg:w-1/2 lg:text-left animate-fade-in-up">
            {/* Profile pic with greeting and blinking cursor */}
            <div className="flex items-center justify-center gap-3 mt-16 mb-6 lg:justify-start lg:mt-16">
              <div className="w-12 h-12 overflow-hidden bg-indigo-100 border-2 border-indigo-200 rounded-full animate-bounce-gentle">
                <img
                  src="./profileimage/WhatsApp Image 2025-08-25 at 13.05.03_f01399dd.jpg"
                  alt="Thisara profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <div
                className={`text-base font-medium ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                <span>{displayText}</span>
                <span
                  className={`inline-block w-0.5 h-5 ml-1 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  } ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
                >
                  |
                </span>
              </div>

            </div>

            <div className="animate-fade-in-up animation-delay-300">
              <h1   className={`text-2xl font-bold leading-tight md:text-3xl lg:text-4xl ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>
                Full Stack <span className="text-indigo-600 dark:text-indigo-600">Developer</span>
              </h1>
            </div>

            <div className="animate-fade-in-up animation-delay-500">
              <p
                className={`max-w-md text-sm leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                I specialize in backend development and love building scalable applications from server to UI. 
                Currently focused on creating efficient solutions with modern technologies.
              </p>
            </div>


            {/* Buttons */}
            <div className="flex flex-col gap-3 mt-6 sm:flex-row animate-fade-in-up animation-delay-700">
              <button
                onClick={handleDownloadCV}
                className={`px-4 py-2 text-sm font-medium text-center border rounded-md transition-all duration-300 hover:transform hover:scale-105 ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-900 text-white'
                    : 'bg-black text-white'
                }`}
              >
                Download CV
              </button>

              <a
                href="#projects"
                className={`px-4 py-2 text-sm font-medium text-center border rounded-md transition-all duration-300 hover:transform hover:scale-105 ${
                  isDarkMode
                    ? 'border-gray-600 hover:bg-gray-800 text-white'
                    : 'border-gray-300 hover:bg-gray-50 text-gray-900'
                }`}
              >
                View Projects
              </a>
            </div>


            {/* Skills */}
                <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 animate-fade-in-up animation-delay-900">
                  <div
                    className={`p-4 rounded-lg shadow-sm border ${
                      isDarkMode
                        ? 'bg-black border-gray-700'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <h3
                      className={`text-sm font-semibold ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-800'
                      }`}
                    >
                      Frontend & Backend
                    </h3>
                    <p
                      className={`mt-1 text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      React for modern UIs and Laravel for robust backend APIs.
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg shadow-sm border ${
                      isDarkMode
                        ? 'bg-black border-gray-700'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <h3
                      className={`text-sm font-semibold ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-800'
                      }`}
                    >
                      Database & Services
                    </h3>
                    <p
                      className={`mt-1 text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      MySQL, email integration, and secure payment gateways.
                    </p>
                  </div>
                </div>


            {/* Experience Snapshot */}
              <div className="flex justify-center gap-8 mt-10 lg:justify-start animate-fade-in-up animation-delay-1100">
                <div className="text-center transition-all duration-300 hover:transform hover:scale-110">
                  <h2
                    className={`text-2xl font-bold md:text-3xl ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    40+
                  </h2>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Projects Built
                  </p>
                </div>

                <div className="text-center transition-all duration-300 hover:transform hover:scale-110">
                  <h2
                    className={`text-2xl font-bold md:text-3xl ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    3+
                  </h2>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Years coding Experience
                  </p>
                </div>

                <div className="text-center transition-all duration-300 hover:transform hover:scale-110">
                  <h2
                    className={`text-2xl font-bold md:text-3xl ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    5+
                  </h2>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Tech Stacks
                  </p>
                </div>
              </div>

          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center w-full mt-8 lg:w-1/2 lg:mt-0 animate-fade-in-right">
            {/* Circular Image */}
              <div
                className={`w-56 h-56 overflow-hidden rounded-full shadow-xl border-4 lg:w-72 lg:h-72 ${
                  isDarkMode ? 'border-gray-800' : 'border-white'
                } bg-indigo-100`}
              >             
               <img
                src="./profileimage/WhatsApp Image 2025-08-25 at 13.05.03_f01399dd.jpg"
                alt="Thisara"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Additional Content Below Image */}
            <div className="max-w-sm mt-8 text-center animate-fade-in-up animation-delay-1000">
              <h3 className="hidden mb-3 text-base font-semibold text-gray-800 dark:text-white">
                Currently Working With
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-300 hover:transform hover:scale-105">React</span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-300 hover:transform hover:scale-105">Laravel</span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-300 hover:transform hover:scale-105">Mysql</span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-300 hover:transform hover:scale-105">Tailwind</span>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                Passionate about creating efficient, scalable solutions with modern web technologies.
              </p>

              {/* Social Links */}
              <div className="flex justify-center mt-6 space-x-6">
                <a
                  href="https://github.com/ThisaraAriyawansha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:transform hover:scale-125"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 
                      0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                      -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 
                      2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 
                      0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 
                      0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 
                      2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 
                      2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 
                      0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 
                      0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 
                      10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>

                <a
                  href="https://thisaraariyawansha.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:transform hover:scale-125"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 
                      10 10 10c5.51 0 10-4.48 10-10S17.51 2 
                      12 2zm6.605 4.61a8.502 8.502 0 011.93 
                      5.314c-.281-.054-3.101-.629-5.943-.271
                      -.065-.141-.12-.293-.184-.445a25.416 
                      25.416 0 00-.564-1.236c3.145-1.28 
                      4.577-3.124 4.761-3.362zM12 3.475c2.17 
                      0 4.154.813 5.662 2.148-.152.216-1.443 
                      1.941-4.48 3.08-1.399-2.57-2.95-4.675
                      -3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 
                      53.896 0 013.167 4.935c-3.992 1.063-7.517 1.040-7.896 
                      1.040a8.581 8.581 0 014.729-5.975zM3.453 
                      12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 
                      1.453-.109.033-.228.065-.336.098-4.404 
                      1.42-6.747 5.303-6.942 5.629a8.522 
                      8.522 0 01-2.19-5.705zM12 20.547a8.482 
                      8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 
                      6.703-5.337.022-.01.033-.01.054-.022a35.318 
                      35.318 0 011.823 6.475 8.4 8.4 0 
                      01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 
                      2.679-.423 5.022.271 5.314.369a8.468 
                      8.468 0 01-3.655 5.715z"
                    />
                  </svg>
                </a>

                <a
                  href="http://www.linkedin.com/in/thisara-ariyawansha-274263284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:transform hover:scale-125"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.039-1.852-3.039-1.853 
                              0-2.136 1.445-2.136 2.939v5.669H9.351V9h3.414v1.561h.047c.477-.9 
                              1.637-1.852 3.37-1.852 3.601 0 4.268 2.37 4.268 
                              5.455v6.288zM5.337 7.433a2.062 2.062 
                              0 11.001-4.124 2.062 2.062 0 
                              01-.001 4.124zM6.814 20.452H3.861V9h2.953v11.452zM22.225 
                              0H1.771C.792 0 0 .774 0 1.729v20.542C0 
                              23.227.792 24 1.771 24h20.451C23.2 
                              24 24 23.227 24 22.271V1.729C24 
                              .774 23.2 0 22.225 0z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounceGentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounceGentle 2s ease-in-out infinite;
        }

        .animate-gradient {
          background: linear-gradient(-45deg, #6366f1, #8b5cf6, #06b6d4, #10b981);
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
        }

        .animation-delay-900 {
          animation-delay: 0.9s;
        }

        .animation-delay-1100 {
          animation-delay: 1.1s;
        }

        .animation-delay-1300 {
          animation-delay: 1.3s;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Hero;