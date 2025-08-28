"use client";

import { useState, useEffect } from 'react';

export default function SkillsExperience() {
  const [activeTab, setActiveTab] = useState('skills');
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark') ||
                  document.documentElement.getAttribute('data-theme') === 'dark';
    setIsDarkMode(isDark);

    const observer = new MutationObserver(() => {
      const newIsDark = document.documentElement.classList.contains('dark') ||
                      document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(newIsDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationTrigger(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const skills = {
    frontend: [
      { name: 'React.js', level: 95, code: '<React />' },
      { name: 'Next.js', level: 90, code: 'Next.js' },
      { name: 'JavaScript', level: 88, code: 'JS()' },
      { name: 'TypeScript', level: 85, code: 'TS{}' },
      { name: 'Tailwind CSS', level: 92, code: '@tailwind' },
      { name: 'HTML5', level: 98, code: '<html>' }
    ],
    backend: [
      { name: 'Node.js', level: 87, code: 'node{}' },
      { name: 'PHP', level: 83, code: '<?php' },
      { name: 'Laravel', level: 80, code: 'Laravel::' },
      { name: 'Express.js', level: 85, code: 'express()' },
      { name: 'MySQL', level: 82, code: 'SELECT *' },
      { name: 'MongoDB', level: 78, code: 'db.find()' }
    ]
  };

  const experience = [
    {
      period: 'Dec 2024 - May 2025',
      role: 'Web Developer Internship',
      company: 'Silicon Radon Networks (Pvt) Ltd',
      description: 'Worked as a Web Developer at Silicon Radon Networks (Pvt) Ltd from Dec 1, 2024, to May 30, 2025, gaining hands-on experience in web development.',
      technologies: ['React', 'Next.js', 'JavaScript', 'PHP', 'Laravel', 'Node.js']
    }
  ];

  return (
    <section className={`min-h-screen py-10 md:py-14 ${isDarkMode ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
      <div className="container px-4 mx-auto sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="mb-10 text-center">
            <h2 className={`mb-3 text-2xl font-light tracking-wide md:text-3xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Skills & Experience
            </h2>
            <div className={`w-16 h-px mx-auto mb-4 ${isDarkMode ? 'bg-gray-400' : 'bg-black'}`}></div>
            <p className={`max-w-2xl mx-auto text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              A comprehensive overview of my technical expertise and professional journey
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className={`inline-flex p-1 rounded-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
              <button
                onClick={() => setActiveTab('skills')}
                className={`px-5 py-1.5 text-xs md:px-6 md:py-2 md:text-sm rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'skills'
                    ? isDarkMode 
                      ? 'bg-gray-950 text-white shadow-lg' 
                      : 'bg-black text-white shadow-lg'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-black'
                }`}
              >
                Technical Skills
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`px-5 py-1.5 text-xs md:px-6 md:py-2 md:text-sm rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'experience'
                    ? isDarkMode 
                      ? 'bg-gray-950 text-white shadow-lg' 
                      : 'bg-black text-white shadow-lg'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-black'
                }`}
              >
                Work Experience
              </button>
            </div>
          </div>

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="grid gap-6 md:gap-8 lg:grid-cols-2 animate-fadeIn">
              
              {/* Frontend Skills */}
              <div className="space-y-5 md:space-y-6">
                <div className="text-center lg:text-left">
                  <h3 className={`mb-1 text-lg font-light md:text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>Frontend</h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Client-side technologies</p>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  {skills.frontend.map((skill, index) => (
                    <div key={skill.name} className="group">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-medium md:text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{skill.name}</span>
                          <code className={`px-1 py-0.5 font-mono text-[10px] rounded md:text-xs ${
                            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {skill.code}
                          </code>
                        </div>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{skill.level}%</span>
                      </div>
                      <div className={`w-full h-1.5 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div
                          className={`h-1.5 transition-all duration-1000 ease-out rounded-full ${
                            isDarkMode ? 'bg-gray-300' : 'bg-black'
                          }`}
                          style={{
                            width: animationTrigger ? `${skill.level}%` : '0%',
                            transitionDelay: `${index * 100}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend Skills */}
              <div className="mt-6 space-y-5 md:space-y-6 lg:mt-0">
                <div className="text-center lg:text-left">
                  <h3 className={`mb-1 text-lg font-light md:text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>Backend</h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Server-side technologies</p>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  {skills.backend.map((skill, index) => (
                    <div key={skill.name} className="group">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-medium md:text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{skill.name}</span>
                          <code className={`px-1 py-0.5 font-mono text-[10px] rounded md:text-xs ${
                            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {skill.code}
                          </code>
                        </div>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{skill.level}%</span>
                      </div>
                      <div className={`w-full h-1.5 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div
                          className={`h-1.5 transition-all duration-1000 ease-out rounded-full ${
                            isDarkMode ? 'bg-gray-300' : 'bg-gray-700'
                          }`}
                          style={{
                            width: animationTrigger ? `${skill.level}%` : '0%',
                            transitionDelay: `${index * 100}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="max-w-4xl mx-auto animate-fadeIn">
              <div className="relative">
                {/* Timeline line */}
                <div className={`absolute top-0 bottom-0 w-px left-5 md:left-6 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}></div>
                
                <div className="space-y-6 md:space-y-8">
                  {experience.map((exp, index) => (
                    <div key={index} className="relative pl-14 md:pl-16">
                      {/* Timeline dot */}
                      <div className={`absolute w-2.5 h-2.5 border-3 rounded-full shadow left-4 top-1.5 md:left-5 ${
                        isDarkMode ? 'bg-gray-300 border-gray-900' : 'bg-black border-white'
                      }`}></div>
                      
                      <div className={`p-5 transition-all duration-300 rounded-xl hover:shadow-lg md:p-6 ${
                        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                      }`}>
                        <div className="flex flex-col mb-3 lg:flex-row lg:justify-between lg:items-start">
                          <div>
                            <h4 className={`mb-1 text-sm font-semibold md:text-base ${isDarkMode ? 'text-white' : 'text-black'}`}>{exp.role}</h4>
                            <p className={`text-xs font-medium md:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.company}</p>
                          </div>
                          <span className={`px-2 py-0.5 mt-1.5 font-mono text-xs rounded-full lg:mt-0 ${
                            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-500'
                          }`}>
                            {exp.period}
                          </span>
                        </div>
                        
                        <p className={`mb-3 text-xs leading-relaxed md:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {exp.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`px-2 py-0.5 font-mono text-[10px] transition-colors duration-200 border rounded-full md:text-xs ${
                                isDarkMode 
                                  ? 'bg-gray-700 text-gray-300 border-gray-600 hover:border-gray-300' 
                                  : 'bg-white text-gray-600 border-gray-300 hover:border-black'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Statistics */}
          <div className="grid grid-cols-2 gap-4 mt-12 text-center md:gap-6 md:mt-16 lg:grid-cols-4">
            <div className="space-y-1">
              <div className={`text-xl font-light md:text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>6</div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Months Experience</div>
            </div>
            <div className="space-y-1">
              <div className={`text-xl font-light md:text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>15+</div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Projects Completed</div>
            </div>
            <div className="space-y-1">
              <div className={`text-xl font-light md:text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>12+</div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Technologies</div>
            </div>
            <div className="space-y-1">
              <div className={`text-xl font-light md:text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>100%</div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dedication</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}