"use client";

import { useEffect, useRef } from 'react';

export default function Skill() {
  const skills = [
    { name: "php", icon: "/icons/php.png", color: "#777BB4" },
    { name: "android", icon: "/icons/android.svg", color: "#3DDC84" },
    { name: "arduino", icon: "/icons/arduino.svg", color: "#00979D" },
    { name: "bootstrap", icon: "/icons/bootstrap.svg", color: "#7952B3" },
    { name: "c", icon: "/icons/c.svg", color: "#A8B9CC" },
    { name: "csharp", icon: "/icons/csharp.svg", color: "#239120" },
    { name: "cpp", icon: "/icons/cpp.svg", color: "#00599C" },
    { name: "html", icon: "/icons/html5.svg", color: "#E34F26" },
    { name: "css", icon: "/icons/css3.svg", color: "#1572B6" },
    { name: "dart", icon: "/icons/dart.svg", color: "#0175C2" },
    { name: "tailwind", icon: "/icons/tailwind.svg", color: "#06B6D4" },
    { name: "dotnet", icon: "/icons/dotnet.svg", color: "#512BD4" },
    { name: "express", icon: "/icons/express.svg", color: "#000000" },
    { name: "firebase", icon: "/icons/firebase.svg", color: "#FFCA28" },
    { name: "flask", icon: "/icons/flask.svg", color: "#000000" },
    { name: "flutter", icon: "/icons/flutter.svg", color: "#02569B" },
    { name: "git", icon: "/icons/git.svg", color: "#F05032" },
    { name: "java", icon: "/icons/java.svg", color: "#007396" },
    { name: "javascript", icon: "/icons/javascript.svg", color: "#F7DF1E" },
    { name: "mathworks", icon: "/icons/matlab.svg", color: "#0076A8" },
    { name: "mongodb", icon: "/icons/mongodb.svg", color: "#47A248" },
    { name: "sqlserver", icon: "/icons/sqlserver.svg", color: "#CC2927" },
    { name: "mysql", icon: "/icons/mysql.svg", color: "#4479A1" },
    { name: "node", icon: "/icons/nodejs.svg", color: "#339933" },
    { name: "opencv", icon: "/icons/opencv.svg", color: "#5C3EE8" },
    { name: "oracle", icon: "/icons/oracle.svg", color: "#F80000" },
    { name: "postman", icon: "/icons/postman.svg", color: "#FF6C37" },
    { name: "python", icon: "/icons/python.svg", color: "#3776AB" },
    { name: "react", icon: "/icons/react.svg", color: "#61DAFB" },
    { name: "nextjs", icon: "/icons/nextjs.svg", color: "#000000" },
    { name: "springboot", icon: "/icons/spring.svg", color: "#6DB33F" },
    { name: "tensorflow", icon: "/icons/tensorflow.svg", color: "#FF6F00" },
    { name: "laravel", icon: "/icons/laravel.svg", color: "#FF2D20" }
  ];

  const leftMarqueeRef = useRef(null);
  const rightMarqueeRef = useRef(null);

  useEffect(() => {
    if (leftMarqueeRef.current && rightMarqueeRef.current) {
      leftMarqueeRef.current.style.animation = 'marquee-left 40s linear infinite';
      rightMarqueeRef.current.style.animation = 'marquee-right 40s linear infinite';
    }
  }, []);

  return (
    <div className="w-full py-8 sm:py-12 bg-white dark:bg-gray-900 text-black dark:text-white overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Tech Stack & Tools</h2>
      
      <div className="relative flex overflow-hidden py-4 sm:py-6">
        <div ref={leftMarqueeRef} className="flex whitespace-nowrap py-4 min-w-0">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="inline-flex items-center justify-center mx-2 sm:mx-4 px-4 sm:px-6 py-3 sm:py-4 bg-black dark:bg-gray-800 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 w-40 h-24 sm:w-48 sm:h-28 flex-shrink-0 border border-gray-300 dark:border-gray-600"
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
            </div>
          ))}
          {skills.map((skill, index) => (
            <div 
              key={`dup-${index}`} 
              className="inline-flex items-center justify-center mx-2 sm:mx-4 px-4 sm:px-6 py-3 sm:py-4 bg-black dark:bg-gray-800 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 w-40 h-24 sm:w-48 sm:h-28 flex-shrink-0 border border-gray-300 dark:border-gray-600"
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
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex overflow-hidden py-4 sm:py-6">
        <div ref={rightMarqueeRef} className="flex whitespace-nowrap py-4 min-w-0">
          {skills.slice().reverse().map((skill, index) => (
            <div 
              key={index} 
              className="inline-flex items-center justify-center mx-2 sm:mx-4 px-4 sm:px-6 py-3 sm:py-4 bg-black dark:bg-gray-800 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 w-40 h-24 sm:w-48 sm:h-28 flex-shrink-0 border border-gray-300 dark:border-gray-600"
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
            </div>
          ))}
          {skills.slice().reverse().map((skill, index) => (
            <div 
              key={`dup-${index}`} 
              className="inline-flex items-center justify-center mx-2 sm:mx-4 px-4 sm:px-6 py-3 sm:py-4 bg-black dark:bg-gray-800 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 w-40 h-24 sm:w-48 sm:h-28 flex-shrink-0 border border-gray-300 dark:border-gray-600"
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
  );
}
