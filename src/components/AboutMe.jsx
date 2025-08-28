"use client";

import { useState, useEffect } from 'react';

export default function AboutMe() {
  const [currentFact, setCurrentFact] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const facts = [
    "I love solving complex problems with simple solutions",
    "Always eager to learn new technologies",
    "Believe in clean, maintainable code",
    "Passionate about user experience design"
  ];

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
    const timer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 3000);
    
    const visibilityTimer = setTimeout(() => setIsVisible(true), 200);
    
    return () => {
      clearInterval(timer);
      clearTimeout(visibilityTimer);
    };
  }, []);

  const journey = [
    { step: "01", title: "Education", desc: "Completed Diploma & HND in Software Engineering with distinction at NIBM" },
    { step: "02", title: "Frontend Mastery", desc: "Mastered React, Next.js & modern frontend frameworks" },
    { step: "03", title: "Full Stack Skills", desc: "Learned Node.js, PHP, Laravel & database management" },
    { step: "04", title: "Industry Experience", desc: "Completed Web Developer internship at Silicon Radon Networks" }
  ];

  return (
    <section id="about" className={`min-h-screen py-20 ${isDarkMode ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
      <div className="container px-6 mx-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className={`mb-4 text-3xl font-light tracking-wide md:text-4xl lg:text-4xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
              About Me
            </h2>
            <div className={`w-16 h-px mx-auto mb-6 ${isDarkMode ? "bg-gray-500" : "bg-gray-500"}`} />
            <p className={`max-w-xl mx-auto text-base leading-relaxed px-4 py-2 rounded-lg ${
              isDarkMode ? ' text-white' : ' text-black'
            }`}>
                Undergraduate Software Engineering student from Matara, passionate about Full-Stack Development and building modern, scalable web applications.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid items-center gap-8 mb-16 lg:grid-cols-2 lg:gap-12">
            
            {/* Left Side - Image Placeholder */}
            <div className="relative">
              <div className={`relative max-w-sm mx-auto overflow-hidden aspect-square rounded-xl lg:max-w-none ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <img 
                  src="/otherimages/modern-languages-web-programming-web-development-design-and-coding-M17GRE.jpg" 
                  alt="Thisara Ariyawansha - Full Stack Developer"
                  className="object-cover object-center w-full h-full"
                />
                
                {/* Decorative Elements */}
                <div className={`absolute w-4 h-4 rounded-full -top-2 -right-2 hidden ${
                  isDarkMode ? 'bg-yellow-400' : 'bg-black'
                }`}></div>
                <div className={`absolute w-3 h-3 rounded-full -bottom-2 -left-2 ${
                  isDarkMode ? 'bg-gray-500' : 'bg-gray-800'
                }`}></div>
              </div>
              
              {/* Floating Fun Fact */}
              <div className={`absolute hidden max-w-xs p-3 transform -translate-y-1/2 border rounded-lg shadow-lg -right-2 top-1/2 lg:block ${
                isDarkMode ? 'bg-black border-gray-700 text-white' : 'bg-white border-gray-200 text-black'
              }`}>
                <div className={`mb-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fun Fact:</div>
                <div className="text-sm font-medium transition-all duration-500">
                  {facts[currentFact]}
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className={`text-xl font-light md:text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Hello, I'm Thisara Ariyawansha
                </h3>
                
                <div className={`space-y-3 text-sm leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <p>
                    I'm <span className="font-semibold">Thisara Ariyawansha</span> from Matara, passionate about creating digital solutions that make a difference. 
                    I have successfully completed a <span className="font-semibold">Diploma</span> and a <span className="font-semibold">Higher National Diploma in Software Engineering</span> 
                    with <span className="font-semibold">distinction passes</span> at the National Institute of Business Management (NIBM).
                  </p>
                  
                  <p>
                    I also completed an <span className="font-semibold">internship as a Web Developer at Silicon Radon Networks (Pvt) Ltd</span>, 
                    where I gained valuable industry experience and hands-on knowledge in modern web development practices.
                  </p>
                  
                  <p>
                    I am passionate about <span className="font-semibold">Full-Stack Development</span> and enjoy creating scalable, modern, 
                    and efficient digital solutions. Currently seeking opportunities to apply my skills and contribute to innovative projects.
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 text-center rounded-lg ${
                  isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
                }`}>
                  <div className="mb-1 text-lg font-light">HND</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Software Engineering</div>
                </div>
                <div className={`p-3 text-center rounded-lg ${
                  isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
                }`}>
                  <div className="mb-1 text-lg font-light">15+</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Projects Built</div>
                </div>
              </div>
            </div>
          </div>


          {/* Journey Timeline */}
          <div className="mb-16">
            <h3 className={`mb-8 text-xl font-light text-center md:text-2xl ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>My Journey</h3>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {journey.map((item, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className={`flex items-center justify-center w-8 h-8 mx-auto mb-3 font-mono text-xs rounded-full ${
                      isDarkMode ? 'bg-yellow-500 text-gray-900' : 'bg-black text-white'
                    }`}>
                      {item.step}
                    </div>
                    <h4 className={`mb-2 text-sm font-medium ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>{item.title}</h4>
                    <p className={`text-xs leading-relaxed ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{item.desc}</p>
                  </div>
                  
                  {/* Connection Line */}
                  {index < journey.length - 1 && (
                    <div className={`absolute hidden w-full h-px transform translate-x-3 lg:block top-4 left-full ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills Summary */}
          <div className={`p-8 text-center rounded-xl ${
            isDarkMode ? 'bg-gray-950' : 'bg-gray-100'
          }`}>
            <h3 className={`mb-4 text-lg font-light ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>Core Technologies</h3>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {[
                'React.js', 'Next.js', 'JavaScript', 'TypeScript', 
                'Node.js', 'PHP', 'Laravel', 'TailwindCSS',
                'HTML5', 'MySQL', 'MongoDB', 'Git'
              ].map((tech, index) => (
                <span 
                  key={index}
                  className={`px-3 py-1 font-mono text-xs transition-colors duration-200 border rounded-full ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300 border-gray-600 hover:border-yellow-400' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-black'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <p className={`max-w-xl mx-auto text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Constantly learning and adapting to new technologies to deliver 
              the best solutions for every project.
            </p>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className={`mb-4 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Looking for opportunities to contribute to innovative projects</p>
                <a
                href="#contact"
                className={`px-6 py-2 text-sm text-white transition-colors duration-200 rounded-full ${
                    isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-black hover:bg-gray-800'
                }`}
                >
                Let's Connect
                </a>

          </div>
        </div>
      </div>
    </section>
  );
}