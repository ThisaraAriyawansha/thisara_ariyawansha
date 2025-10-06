'use client';

import { useState, useEffect } from 'react';

export default function ClientWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  useEffect(() => {
    // Check if the loading screen has been shown in this session
    const hasShownLoader = sessionStorage.getItem('hasShownLoader');
    
    if (hasShownLoader) {
      // If already shown, skip the loading screen
      setIsLoading(false);
      setShouldShowLoader(false);
      return;
    }

    // Show loader for first time in session
    setShouldShowLoader(true);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Add a slight delay before hiding the loader
          setTimeout(() => {
            setIsLoading(false);
            // Mark that loader has been shown
            sessionStorage.setItem('hasShownLoader', 'true');
          }, 500);
          return 100;
        }
        // Smooth progress increment with variable speed
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, []);

  if (isLoading && shouldShowLoader) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid w-full h-full grid-cols-12 grid-rows-12">
            {[...Array(144)].map((_, i) => (
              <div
                key={i}
                className="border border-gray-800 animate-pulse"
                style={{
                  animationDelay: `${(i * 50) % 3000}ms`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Main loading content */}
        <div className="relative z-10 text-center">
          {/* Name/Brand */}
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-thin tracking-wider text-white md:text-6xl">
              THISARA
            </h1>
            <div className="text-sm md:text-base tracking-[0.3em] text-gray-400 font-light">
              ARIYAWANSHA
            </div>
          </div>

          {/* Loading animation */}
          <div className="mb-8">
            <div className="relative w-64 h-64 mx-auto">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 border border-gray-700 rounded-full animate-spin opacity-30"
                   style={{ animationDuration: '8s' }}>
                <div className="absolute top-0 w-2 h-2 transform -translate-x-1/2 -translate-y-1 bg-white rounded-full left-1/2"></div>
              </div>
              
              {/* Middle rotating ring */}
              <div className="absolute border border-gray-600 rounded-full opacity-50 inset-4 animate-spin"
                   style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
                <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-gray-300 rounded-full transform -translate-x-1/2 -translate-y-0.5"></div>
              </div>
              
              {/* Inner rotating ring */}
              <div className="absolute border border-gray-500 rounded-full inset-8 animate-spin opacity-70"
                   style={{ animationDuration: '4s' }}>
                <div className="absolute top-0 w-1 h-1 transform -translate-x-1/2 bg-gray-400 rounded-full left-1/2"></div>
              </div>

              {/* Center pulse */}
              <div className="absolute bg-white rounded-full inset-24 animate-pulse opacity-80"></div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mx-auto mb-6 w-80">
            <div className="flex justify-between mb-2 text-xs text-gray-500">
              <span>INITIALIZING</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-px bg-gray-800">
              <div 
                className="h-full transition-all duration-300 ease-out bg-gradient-to-r from-white to-gray-400"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Loading text */}
          <div className="text-xs tracking-widest text-gray-500">
            <div className="flex items-center justify-center space-x-1">
              <span>LOADING</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute w-16 h-16 border-t border-l border-gray-700 top-8 left-8"></div>
        <div className="absolute w-16 h-16 border-t border-r border-gray-700 top-8 right-8"></div>
        <div className="absolute w-16 h-16 border-b border-l border-gray-700 bottom-8 left-8"></div>
        <div className="absolute w-16 h-16 border-b border-r border-gray-700 bottom-8 right-8"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}