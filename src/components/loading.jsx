"use client";
import { useState, useEffect } from 'react';

export default function ClientWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 150);

    // Main loading timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}>
        {/* Theme toggle button */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`absolute top-6 right-6 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
            isDark 
              ? 'bg-white/10 text-white hover:bg-white/20' 
              : 'bg-black/10 text-black hover:bg-black/20'
          }`}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
              <path d="M12 1l3 6h-6zM12 23l-3-6h6zM4.2 4.2l4.2 4.2-1.4 1.4L2.8 5.6zM19.8 19.8l-4.2-4.2 1.4-1.4 4.2 4.2zM1 12l6-3v6zM23 12l-6 3v-6zM4.2 19.8l4.2-4.2 1.4 1.4-4.2 4.2zM19.8 4.2l-4.2 4.2-1.4-1.4 4.2-4.2z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          )}
        </button>

        <div className="w-full max-w-sm text-center">
          {/* Simple spinner */}
          <div className="relative mb-8">
            <div className={`w-12 h-12 mx-auto border-2 rounded-full transition-colors duration-300 ${
              isDark ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <div className={`w-full h-full border-2 border-transparent rounded-full animate-spin transition-colors duration-300 ${
                isDark ? 'border-t-white' : 'border-t-black'
              }`}></div>
            </div>
          </div>

          {/* Loading text */}
          <h2 className={`text-xl font-light mb-2 tracking-wide transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Loading
          </h2>
          
          {/* Subtitle */}
          <p className={`text-sm mb-8 font-light transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Please wait...
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-xs mx-auto">
            <div className={`h-0.5 rounded-full overflow-hidden transition-colors duration-300 ${
              isDark ? 'bg-black' : 'bg-gray-100'
            }`}>
              <div 
                className={`h-full rounded-full transition-all duration-300 ease-out ${
                  isDark ? 'bg-white' : 'bg-black'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <div className="mt-4 text-center">
              <span className={`text-xs font-light font-mono transition-colors duration-300 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {Math.round(Math.min(progress, 100))}%
              </span>
            </div>
          </div>

          {/* Simple dots */}
          <div className="flex justify-center space-x-1.5 mt-8">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-300 ${
              isDark ? 'bg-white' : 'bg-black'
            }`}></div>
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse delay-200 transition-colors duration-300 ${
              isDark ? 'bg-white' : 'bg-black'
            }`}></div>
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse delay-400 transition-colors duration-300 ${
              isDark ? 'bg-white' : 'bg-black'
            }`}></div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}