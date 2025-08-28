"use client";
import { useState, useEffect } from "react";

export default function Contact() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const isDark =
      document.documentElement.classList.contains("dark") ||
      document.documentElement.getAttribute("data-theme") === "dark";
    setIsDarkMode(isDark);

    const observer = new MutationObserver(() => {
      const newIsDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";
      setIsDarkMode(newIsDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleEmailClick = () => {
    window.location.href = "mailto:thisara.a2001@gmail.com";
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("thisara.a2001@gmail.com");
      const notification = document.createElement('div');
      notification.textContent = 'Email copied!';
      notification.className = `fixed top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg z-50 transition-all duration-300 ${
        isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
      }`;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <section id="contact"
      className={`min-h-screen transition-all duration-700 ease-out relative overflow-hidden ${
        isDarkMode 
          ? "bg-black" 
          : "bg-white"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute w-100 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDarkMode ? "bg-white" : "bg-black"
          }`}
          style={{
            left: `${Math.sin(Date.now() * 0.001) * 200 + 400}px`,
            top: `${Math.cos(Date.now() * 0.001) * 100 + 200}px`,
            animationDuration: '4s'
          }}
        />
        <div 
          className={`absolute w-64 h-64 rounded-full blur-2xl opacity-10 animate-pulse ${
            isDarkMode ? "bg-gray-300" : "bg-gray-700"
          }`}
          style={{
            right: `${Math.cos(Date.now() * 0.0015) * 150 + 200}px`,
            bottom: `${Math.sin(Date.now() * 0.0015) * 120 + 150}px`,
            animationDuration: '6s',
            animationDelay: '2s'
          }}
        />
      </div>

      <div 
        className={`fixed w-4 h-4 rounded-full pointer-events-none z-10 transition-all duration-300 ${
          isDarkMode ? "bg-white" : "bg-black"
        } ${isHovered ? 'scale-150 opacity-20' : 'scale-100 opacity-40'}`}
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          mixBlendMode: isDarkMode ? 'difference' : 'multiply'
        }}
      />

      <div className="relative z-20 pt-20 pb-16">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="relative">
            <div 
              className={`relative p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 rounded-2xl sm:rounded-3xl backdrop-blur-2xl border ${
                isDarkMode 
                  ? "bg-white/5 border-white/10" 
                  : "bg-black/5 border-black/10"
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div 
                className={`absolute -top-3 sm:-top-4 left-4 sm:left-6 lg:left-8 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                  isDarkMode 
                    ? "bg-white text-black" 
                    : "bg-black text-white"
                }`}
                style={{ 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}
              >
                Available for Work
              </div>

              <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-3 sm:gap-8 lg:gap-12">
                <div className="lg:col-span-2">
                  <h1 
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-4 sm:mb-6 leading-tight ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                    style={{ 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Let's Build
                    <br />
                    <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Something
                    </span>
                    <br />
                    Amazing
                  </h1>
                  
                  <p 
                    className={`text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                    style={{ 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                    }}
                  >
                    Ready to turn your ideas into reality? I specialize in creating digital experiences that make an impact.
                  </p>
                </div>

                <div className="space-y-6 lg:space-y-8">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="group">
                      <div 
                        className={`p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border transition-all duration-500 group-hover:scale-105 ${
                          isDarkMode 
                            ? "bg-gray-900/50 border-gray-700 group-hover:border-white/30" 
                            : "bg-gray-100/50 border-gray-200 group-hover:border-black/30"
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <svg className={`w-4 h-4 mr-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span 
                            className={`text-xs font-medium ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                            style={{ letterSpacing: '0.05em' }}
                          >
                            EMAIL
                          </span>
                        </div>
                        <div 
                          className={`font-mono text-xs sm:text-sm break-all ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                          style={{ 
                            fontFamily: '"SF Mono", "Monaco", monospace'
                          }}
                        >
                          thisara.a2001@gmail.com
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div 
                        className={`p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border transition-all duration-500 group-hover:scale-105 ${
                          isDarkMode 
                            ? "bg-gray-900/50 border-gray-700 group-hover:border-white/30" 
                            : "bg-gray-100/50 border-gray-200 group-hover:border-black/30"
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <svg className={`w-4 h-4 mr-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span 
                            className={`text-xs font-medium ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                            style={{ letterSpacing: '0.05em' }}
                          >
                            PHONE
                          </span>
                        </div>
                        <div 
                          className={`font-mono text-xs sm:text-sm ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                          style={{ 
                            fontFamily: '"SF Mono", "Monaco", monospace'
                          }}
                        >
                          +94 76 941 7154
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div 
                        className={`p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border transition-all duration-500 group-hover:scale-105 ${
                          isDarkMode 
                            ? "bg-gray-900/50 border-gray-700 group-hover:border-white/30" 
                            : "bg-gray-100/50 border-gray-200 group-hover:border-black/30"
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <svg className={`w-4 h-4 mr-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span 
                            className={`text-xs font-medium ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                            style={{ letterSpacing: '0.05em' }}
                          >
                            LOCATION
                          </span>
                        </div>
                        <div 
                          className={`font-mono text-xs sm:text-sm ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                          style={{ 
                            fontFamily: '"SF Mono", "Monaco", monospace'
                          }}
                        >
                          Matara, Sri Lanka
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center pt-2 lg:justify-start">
                      <div 
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                          isDarkMode 
                            ? "bg-green-900/30 text-green-400 border border-green-400/20" 
                            : "bg-green-100 text-green-700 border border-green-200"
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 animate-pulse ${isDarkMode ? "bg-green-400" : "bg-green-500"}`} />
                        Available for Work
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handleEmailClick}
                      className={`w-full group relative overflow-hidden px-8 py-5 rounded-2xl transition-all duration-500 ${
                        isDarkMode
                          ? "bg-white text-black hover:bg-gray-100"
                          : "bg-black text-white hover:bg-gray-900"
                      } transform hover:scale-105 hover:shadow-2xl`}
                    >
                      <div className="relative z-10 flex items-center justify-between">
                        <span 
                          className="text-lg font-medium"
                          style={{ 
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                          }}
                        >
                          Start a Conversation
                        </span>
                        <svg 
                          className="w-6 h-6 transition-transform duration-300 transform group-hover:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <div 
                        className={`absolute inset-0 ${
                          isDarkMode ? "bg-gray-800" : "bg-gray-800"
                        } transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out`}
                      />
                    </button>

                    <button
                      onClick={handleCopyEmail}
                      className={`w-full group px-8 py-4 rounded-2xl border transition-all duration-300 ${
                        isDarkMode
                          ? "border-gray-700 text-gray-300 hover:border-white hover:text-white hover:bg-gray-900/50"
                          : "border-gray-300 text-gray-700 hover:border-black hover:text-black hover:bg-gray-100/50"
                      } transform hover:scale-105`}
                    >
                      <div className="flex items-center justify-center">
                        <svg 
                          className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-12" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span 
                          className="font-medium"
                          style={{ 
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                          }}
                        >
                          Copy Email Address
                        </span>
                      </div>
                    </button>
                  </div>

                  <div className="text-center">
                    <div 
                      className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-medium ${
                        isDarkMode 
                          ? "bg-gray-800 text-gray-400" 
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 ${isDarkMode ? "bg-green-400" : "bg-green-500"}`} />
                      Usually responds in 24 hours
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-8 border-t border-current sm:mt-12 lg:mt-16 sm:pt-6 lg:pt-8 border-opacity-20">
                <div className="grid grid-cols-3 gap-4 text-center sm:gap-6 lg:gap-8">
                  <div>
                    <div 
                      className={`text-lg sm:text-xl lg:text-2xl font-light mb-1 sm:mb-2 ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      100%
                    </div>
                    <div 
                      className={`text-xs sm:text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Response Rate
                    </div>
                  </div>
                  <div>
                    <div 
                      className={`text-lg sm:text-xl lg:text-2xl font-light mb-1 sm:mb-2 ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      24h
                    </div>
                    <div 
                      className={`text-xs sm:text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Avg Response
                    </div>
                  </div>
                  <div>
                    <div 
                      className={`text-lg sm:text-xl lg:text-2xl font-light mb-1 sm:mb-2 ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      Open
                    </div>
                    <div 
                      className={`text-xs sm:text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      For Projects
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}