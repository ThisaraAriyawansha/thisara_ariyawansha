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

    const [darkMode, setDarkMode] = useState(false);
  
  const leftMarqueeRef = useRef(null);
  const rightMarqueeRef = useRef(null);

  useEffect(() => {
    if (leftMarqueeRef.current && rightMarqueeRef.current) {
      leftMarqueeRef.current.style.animation = 'marquee-left 40s linear infinite';
      rightMarqueeRef.current.style.animation = 'marquee-right 40s linear infinite';
    }
  }, []);

  return (
        <div className={darkMode ? 'dark' : ''}>

    <>
    
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap" rel="stylesheet" />
      <div className="w-full py-8 sm:py-12 bg-white dark:bg-black text-black dark:text-white font-inter font-light overflow-hidden">
            
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-4">
            Technology Skills
            </h2>
            <div className="w-24 h-1 mx-auto mb-8 sm:mb-12 rounded bg-gray-400"></div>


        
        <div className="relative flex overflow-hidden py-4 sm:py-6">
          <div ref={leftMarqueeRef} className="flex whitespace-nowrap py-4 min-w-0">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="group inline-flex items-center justify-center mx-2 sm:mx-4 px-4 sm:px-6 py-3 sm:py-4 bg-black dark:bg-gray-800 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 w-40 h-24 sm:w-48 sm:h-28 flex-shrink-0 border border-gray-300 dark:border-gray-600 relative"
              >
                <div 
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: skill.color }}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black text-xs font-inter font-light px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                </div>
              </div>
            ))}
            {skills.map((skill, index) => (
              <div 
                key={`dup-${index}`} 
                className="group inline-flex items-center justify-center mx-2 sm:mx-4 px-4 sm:px-6 py-3 sm:py-4 bg-black dark:bg-gray-800 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 w-40 h-24 sm:w-48 sm:h-28 flex-shrink-0 border border-gray-300 dark:border-gray-600 relative"
              >
                <div 
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: skill.color }}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black text-xs font-inter font-light px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex overflow-hidden py-4 sm:py-6">
          <div ref={rightMarqueeRef} className="flex whitespace-nowrap py-4 min-w-0">
            {skills.slice().reverse().map((skill, index) => (
              <div 
                key={index} 
                className="group inline-flex items-center justify-center mx-2 sm:mx-4 px-4 sm:px-6 py-3 sm:py-4 bg-black dark:bg-gray-800 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 w-40 h-24 sm:w-48 sm:h-28 flex-shrink-0 border border-gray-300 dark:border-gray-600 relative"
              >
                <div 
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: skill.color }}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black text-xs font-inter font-light px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                </div>
              </div>
            ))}
            {skills.slice().reverse().map((skill, index) => (
              <div 
                key={`dup-${index}`} 
                className="group inline-flex items-center justify-center mx-2 sm:mx-4 px-4 sm:px-6 py-3 sm:py-4 bg-black dark:bg-gray-800 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 w-40 h-24 sm:w-48 sm:h-28 flex-shrink-0 border border-gray-300 dark:border-gray-600 relative"
              >
                <div 
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: skill.color }}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black text-xs font-inter font-light px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
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
    </>
    </div>
  );
}
