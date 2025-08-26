"use client";

import { useEffect, useRef, useState } from 'react';

export default function Skill() {
  const skills = [
    { name: "php", icon: "/icons/php.png", color: "white" },
    { name: "Android", icon: "/icons/android.png", color: "white" },
    { name: "Arduino", icon: "/icons/arduino.png", color: "white" },
    { name: "Bootstrap", icon: "/icons/bootstrap.png", color: "white" },
    { name: "C", icon: "/icons/c.png", color: "white" },
    { name: "Csharp", icon: "/icons/csharp.png", color: "white" },
    { name: "C++", icon: "/icons/c++.png", color: "white" },
    { name: "HTML", icon: "/icons/html.png", color: "white" },
    { name: "Dart", icon: "/icons/dart.png", color: "white" },
    { name: "Tailwind", icon: "/icons/tailwind.png", color: "white" },
    { name: ".Net", icon: "/icons/net.png", color: "white" },
    { name: "Express", icon: "/icons/express.png", color: "white" },
    { name: "Firebase", icon: "/icons/Firebase.png", color: "white" },
    { name: "Flask", icon: "/icons/Flask.png", color: "white" },
    { name: "Flutter", icon: "/icons/flutter.png", color: "white" },
    { name: "Git", icon: "/icons/Git.png", color: "white" },
    { name: "Java", icon: "/icons/Java.webp", color: "white" },
    { name: "javascript", icon: "/icons/javascript.png", color: "white" },
    { name: "Mathworks", icon: "/icons/Mathworks.png", color: "white" },
    { name: "Mongodb", icon: "/icons/Mongodb.png", color: "white" },
    { name: "Sqlserver", icon: "/icons/Sqlserver.png", color: "white" },
    { name: "Mysql", icon: "/icons/mysql.svg", color: "white" },
    { name: "Node", icon: "/icons/nodejs.png", color: "white" },
    { name: "Opencv", icon: "/icons/Opencv.png", color: "white" },
    { name: "Oracle", icon: "/icons/Oracle.png", color: "white" },
    { name: "Postman", icon: "/icons/Postman.png", color: "white" },
    { name: "CSS", icon: "/icons/css.png", color: "white" },
    { name: "Python", icon: "/icons/Python.png", color: "white" },
    { name: "React", icon: "/icons/react.png", color: "white" },
    { name: "Nextjs", icon: "/icons/Nextjs.png", color: "white" },
    { name: "Springboot", icon: "/icons/Springboot.png", color: "white" },
    { name: "Tensorflow", icon: "/icons/tensorflow.png", color: "white" },
    { name: "Laravel", icon: "/icons/Laravel.webp", color: "white" }
  ];

  const [isDarkMode, setIsDarkMode] = useState(false);
  const leftMarqueeRef = useRef(null);
  const rightMarqueeRef = useRef(null);

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

  useEffect(() => {
    if (leftMarqueeRef.current && rightMarqueeRef.current) {
      leftMarqueeRef.current.style.animation = 'marquee-left 40s linear infinite';
      rightMarqueeRef.current.style.animation = 'marquee-right 40s linear infinite';
    }
  }, []);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap" rel="stylesheet" />
        <div
          className={`w-full py-8 overflow-hidden font-light sm:py-12 font-inter ${
            isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
        <h2 className="mb-4 text-2xl font-bold text-center sm:text-3xl sm:mb-4">
          Technology Skills
        </h2>
        <div
          className={`w-24 h-1 mx-auto mb-8 rounded sm:mb-12 ${
            isDarkMode ? 'bg-gray-100' : 'bg-gray-900'
          }`}
        ></div>

        <div className="relative flex py-4 overflow-hidden sm:py-6">
          <div ref={leftMarqueeRef} className="flex min-w-0 py-4 whitespace-nowrap">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="relative inline-flex items-center justify-center flex-shrink-0 w-40 h-24 px-4 py-3 mx-2 text-white transition-transform duration-300 transform bg-black border border-gray-300 shadow-lg group sm:mx-4 sm:px-6 sm:py-4 rounded-xl hover:scale-105 sm:w-48 sm:h-28 dark:border-gray-600"
              >
                <div 
                  className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-white rounded-full sm:w-16 sm:h-16 dark:bg-gray-700"
                  style={{ backgroundColor: skill.color }}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="object-contain w-8 h-8 sm:w-12 sm:h-12"
                  />
                </div>
                <div className="absolute px-2 py-1 text-xs font-light text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 pointer-events-none -top-8 left-1/2 dark:bg-gray-200 dark:text-black font-inter group-hover:opacity-100">
                  {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                </div>
              </div>
            ))}
            {skills.map((skill, index) => (
              <div 
                key={`dup-${index}`} 
                className="relative inline-flex items-center justify-center flex-shrink-0 w-40 h-24 px-4 py-3 mx-2 text-white transition-transform duration-300 transform bg-black border border-gray-300 shadow-lg group sm:mx-4 sm:px-6 sm:py-4 dark:bg-gray-800 rounded-xl hover:scale-105 sm:w-48 sm:h-28 dark:border-gray-600"
              >
                <div 
                  className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-white rounded-full sm:w-16 sm:h-16 dark:bg-gray-700"
                  style={{ backgroundColor: skill.color }}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="object-contain w-8 h-8 sm:w-12 sm:h-12"
                  />
                </div>
                <div className="absolute px-2 py-1 text-xs font-light text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 pointer-events-none -top-8 left-1/2 dark:bg-gray-200 dark:text-black font-inter group-hover:opacity-100">
                  {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex py-4 overflow-hidden sm:py-6">
          <div ref={rightMarqueeRef} className="flex min-w-0 py-4 whitespace-nowrap">
            {skills.slice().reverse().map((skill, index) => (
              <div 
                key={index} 
                className="relative inline-flex items-center justify-center flex-shrink-0 w-40 h-24 px-4 py-3 mx-2 text-white transition-transform duration-300 transform bg-black border border-gray-300 shadow-lg group sm:mx-4 sm:px-6 sm:py-4 rounded-xl hover:scale-105 sm:w-48 sm:h-28 dark:border-gray-600"
              >
                <div 
                  className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-white rounded-full sm:w-16 sm:h-16 dark:bg-gray-700"
                  style={{ backgroundColor: skill.color }}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="object-contain w-8 h-8 sm:w-12 sm:h-12"
                  />
                </div>
                <div className="absolute px-2 py-1 text-xs font-light text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 pointer-events-none -top-8 left-1/2 dark:bg-gray-200 dark:text-black font-inter group-hover:opacity-100">
                  {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                </div>
              </div>
            ))}
            {skills.slice().reverse().map((skill, index) => (
              <div 
                key={`dup-${index}`} 
                className="relative inline-flex items-center justify-center flex-shrink-0 w-40 h-24 px-4 py-3 mx-2 text-white transition-transform duration-300 transform bg-black border border-gray-300 shadow-lg group sm:mx-4 sm:px-6 sm:py-4 dark:bg-gray-800 rounded-xl hover:scale-105 sm:w-48 sm:h-28 dark:border-gray-600"
              >
                <div 
                  className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-white rounded-full sm:w-16 sm:h-16 dark:bg-gray-700"
                  style={{ backgroundColor: skill.color }}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="object-contain w-8 h-8 sm:w-12 sm:h-12"
                  />
                </div>
                <div className="absolute px-2 py-1 text-xs font-light text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 pointer-events-none -top-8 left-1/2 dark:bg-gray-200 dark:text-black font-inter group-hover:opacity-100">
                  {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          @media (max-width: 640px) {
            .marquee-left, .marquee-right {
              animation-duration: 30s;
            }
          }
        `}</style>
      </div>
    </div>
  );
}