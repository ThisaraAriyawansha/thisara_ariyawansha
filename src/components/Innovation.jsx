"use client";

import { useState, useEffect } from 'react';

export default function Innovation() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  return (
    <section className={`relative min-h-screen py-20 overflow-hidden transition-colors duration-300 ${
      isDarkMode ? 'bg-black' : 'bg-white'
    }`}>
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div 
          className={`absolute rounded-full w-80 h-80 blur-3xl ${
            isDarkMode ? 'bg-gray-100 opacity-30' : 'bg-gray-900 opacity-70'
          }`}
          style={{
            left: mousePosition.x / 20 + 'px',
            top: mousePosition.y / 20 + 'px',
          }}
        />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="mx-auto max-w-7xl">
          {/* Main Content Grid */}
          <div className="grid items-center gap-8 lg:grid-cols-3 lg:gap-16">
            {/* Frontend Side - Left */}
            <div className="space-y-8 text-center lg:text-right">
              <div className="space-y-6">
                <h2 className={`text-5xl font-light tracking-wide lg:text-6xl ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>
                  frontend
                </h2>
                <div className={`space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p className="text-sm leading-relaxed">
                    Full Stack Developer specializing in<br />
                    modern frontend technologies and<br />
                    responsive user interfaces.
                  </p>
                </div>

                {/* Frontend Technologies */}
                <div className={`space-y-3 font-mono text-xs opacity-70 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <div>&lt;React.js /&gt;</div>
                  <div>&lt;Next.js /&gt;</div>
                  <div>&lt;HTML5 /&gt;</div>
                  <div>&lt;TailwindCSS /&gt;</div>
                  <div>JavaScript();ES6+</div>
                  <div>TypeScript{}</div>
                </div>
              </div>
            </div>

            {/* Center Image */}
            <div className="flex justify-center lg:justify-center">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Main container with image */}
                <div className={`absolute inset-0 overflow-hidden rounded-full ${
                  isDarkMode ? 'bg-gray-200' : 'bg-gray-200'
                }`}>
                  <img 
                    src="/otherimages/Adobe Express - file-Picsart-AiImageEnhancer.png" 
                    alt="Full Stack Developer"
                    className="object-cover object-center w-full h-full rounded-full"
                  />
                </div>

                {/* Paint splash effects - artistic overlay */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div className={`absolute w-20 h-24 transform rounded-full top-8 left-4 rotate-12 ${
                    isDarkMode ? 'bg-gray-300 opacity-40' : 'bg-gray-900 opacity-60'
                  }`}></div>
                  <div className={`absolute w-16 h-20 transform rounded-full -rotate-45 top-16 right-8 ${
                    isDarkMode ? 'bg-gray-400 opacity-30' : 'bg-gray-700 opacity-50'
                  }`}></div>
                  <div className={`absolute w-24 transform rotate-45 rounded-full bottom-20 left-8 h-18 ${
                    isDarkMode ? 'bg-gray-200 opacity-25' : 'bg-black opacity-40'
                  }`}></div>
                  <div className={`absolute h-16 transform rounded-full bottom-16 right-12 w-14 -rotate-12 ${
                    isDarkMode ? 'bg-gray-300 opacity-35' : 'bg-gray-800 opacity-55'
                  }`}></div>
                  
                  <div className={`absolute w-8 h-10 transform rotate-90 rounded-full top-24 left-20 ${
                    isDarkMode ? 'bg-gray-400 opacity-20' : 'bg-gray-600 opacity-30'
                  }`}></div>
                  <div className={`absolute w-6 h-8 transform rounded-full -rotate-30 top-32 right-16 ${
                    isDarkMode ? 'bg-gray-200 opacity-15' : 'bg-black opacity-25'
                  }`}></div>
                  <div className={`absolute w-10 h-8 transform rounded-full rotate-60 bottom-32 left-16 ${
                    isDarkMode ? 'bg-gray-300 opacity-25' : 'bg-gray-700 opacity-40'
                  }`}></div>
                  
                  <div className={`absolute w-4 h-4 rounded-full top-12 left-32 ${
                    isDarkMode ? 'bg-gray-300 opacity-30' : 'bg-gray-900 opacity-50'
                  }`}></div>
                  <div className={`absolute w-3 h-3 rounded-full top-20 right-24 ${
                    isDarkMode ? 'bg-gray-200 opacity-20' : 'bg-black opacity-35'
                  }`}></div>
                  <div className={`absolute w-5 h-5 rounded-full bottom-24 right-20 ${
                    isDarkMode ? 'bg-gray-300 opacity-30' : 'bg-gray-800 opacity-45'
                  }`}></div>
                  <div className={`absolute w-3 h-3 rounded-full bottom-40 left-24 ${
                    isDarkMode ? 'bg-gray-400 opacity-15' : 'bg-gray-600 opacity-25'
                  }`}></div>
                </div>

                {/* Additional artistic elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className={`absolute w-32 h-2 transform rotate-45 rounded-full top-6 left-12 ${
                    isDarkMode ? 'bg-gray-300 opacity-10' : 'bg-gray-800 opacity-20'
                  }`}></div>
                  <div className={`absolute w-24 h-1 transform rounded-full bottom-10 right-6 -rotate-30 ${
                    isDarkMode ? 'bg-gray-200 opacity-15' : 'bg-black opacity-25'
                  }`}></div>
                  <div className={`absolute w-1 h-20 transform rounded-full top-1/3 right-4 rotate-12 ${
                    isDarkMode ? 'bg-gray-300 opacity-20' : 'bg-gray-700 opacity-30'
                  }`}></div>
                </div>
              </div>
            </div>

            {/* Backend Side - Right */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <h2 className={`text-5xl font-light tracking-wide lg:text-6xl ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>
                  backend
                </h2>
                <div className={`space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p className="text-sm leading-relaxed">
                    Full Stack Developer experienced in<br />
                    server-side development and<br />
                    database architecture.
                  </p>
                </div>

                {/* Backend Technologies */}
                <div className={`space-y-3 font-mono text-xs opacity-70 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <div>Node.js</div>
                  <div>$php = "backend";</div>
                  <div>Laravel::framework</div>
                  <div>Express.js()</div>
                  <div>MySQL | MongoDB</div>
                  <div>API</div>
                </div>
              </div>
            </div>
          </div>

          {/* Full Stack Badge */}
          <div className="flex justify-center mt-16">
            <div className={`px-6 py-2 font-mono text-sm tracking-wider border ${
              isDarkMode 
                ? 'bg-gray-950 text-white border-gray-600' 
                : 'bg-black text-white border-gray-400'
            }`}>
              FULL STACK DEVELOPER
            </div>
          </div>

          {/* Bottom decorative elements */}
          <div className="flex justify-center mt-8">
            <div className={`w-px h-12 ${
              isDarkMode ? 'bg-gray-100' : 'bg-gray-900'
            }`}></div>
          </div>
        </div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle, ${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </section>
  ); 
}