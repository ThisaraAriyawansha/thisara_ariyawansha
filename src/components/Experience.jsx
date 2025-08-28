"use client";

import { useState, useEffect } from 'react';

export default function SkillsExperience() {
  const [activeTab, setActiveTab] = useState('skills');
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <section className={`min-h-screen py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      <div className="container px-6 mx-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h2 className={`mb-6 text-5xl font-light tracking-wide lg:text-6xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Skills & Experience
            </h2>
            <div className={`w-24 h-px mx-auto mb-8 ${isDarkMode ? 'bg-gray-400' : 'bg-black'}`}></div>
            <p className={`max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              A comprehensive overview of my technical expertise and professional journey
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className={`inline-flex p-1 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <button
                onClick={() => setActiveTab('skills')}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'skills'
                    ? isDarkMode 
                      ? 'bg-gray-700 text-white shadow-lg' 
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
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'experience'
                    ? isDarkMode 
                      ? 'bg-gray-700 text-white shadow-lg' 
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
            <div className="grid gap-12 lg:grid-cols-2 animate-fadeIn">
              
              {/* Frontend Skills */}
              <div className="space-y-8">
                <div className="text-center lg:text-left">
                  <h3 className={`mb-2 text-3xl font-light ${isDarkMode ? 'text-white' : 'text-black'}`}>Frontend</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Client-side technologies</p>
                </div>
                
                <div className="space-y-6">
                  {skills.frontend.map((skill, index) => (
                    <div key={skill.name} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{skill.name}</span>
                          <code className={`px-2 py-1 font-mono text-xs rounded ${
                            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {skill.code}
                          </code>
                        </div>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{skill.level}%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div
                          className={`h-2 transition-all duration-1000 ease-out rounded-full ${
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
              <div className="space-y-8">
                <div className="text-center lg:text-left">
                  <h3 className={`mb-2 text-3xl font-light ${isDarkMode ? 'text-white' : 'text-black'}`}>Backend</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Server-side technologies</p>
                </div>
                
                <div className="space-y-6">
                  {skills.backend.map((skill, index) => (
                    <div key={skill.name} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{skill.name}</span>
                          <code className={`px-2 py-1 font-mono text-xs rounded ${
                            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {skill.code}
                          </code>
                        </div>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{skill.level}%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div
                          className={`h-2 transition-all duration-1000 ease-out rounded-full ${
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
                <div className={`absolute top-0 bottom-0 w-px left-8 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}></div>
                
                <div className="space-y-12">
                  {experience.map((exp, index) => (
                    <div key={index} className="relative pl-20">
                      {/* Timeline dot */}
                      <div className={`absolute w-4 h-4 border-4 rounded-full shadow-lg left-6 top-2 ${
                        isDarkMode ? 'bg-gray-300 border-gray-900' : 'bg-black border-white'
                      }`}></div>
                      
                      <div className={`p-8 transition-all duration-300 rounded-xl hover:shadow-lg ${
                        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                      }`}>
                        <div className="flex flex-col mb-4 lg:flex-row lg:justify-between lg:items-start">
                          <div>
                            <h4 className={`mb-1 text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>{exp.role}</h4>
                            <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.company}</p>
                          </div>
                          <span className={`px-3 py-1 mt-2 font-mono text-sm rounded-full lg:mt-0 ${
                            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-500'
                          }`}>
                            {exp.period}
                          </span>
                        </div>
                        
                        <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {exp.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`px-3 py-1 font-mono text-xs transition-colors duration-200 border rounded-full ${
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
          <div className="grid grid-cols-2 gap-8 mt-20 text-center lg:grid-cols-4">
            <div className="space-y-2">
              <div className={`text-3xl font-light ${isDarkMode ? 'text-white' : 'text-black'}`}>6</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Months Experience</div>
            </div>
            <div className="space-y-2">
              <div className={`text-3xl font-light ${isDarkMode ? 'text-white' : 'text-black'}`}>15+</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className={`text-3xl font-light ${isDarkMode ? 'text-white' : 'text-black'}`}>12+</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Technologies</div>
            </div>
            <div className="space-y-2">
              <div className={`text-3xl font-light ${isDarkMode ? 'text-white' : 'text-black'}`}>100%</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dedication</div>
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