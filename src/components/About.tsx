"use client";
import { useState, useEffect } from "react";

export default function About() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

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

    return () => observer.disconnect();
  }, []);

  const timeline = [
    {
      year: 2018,
      title: "Ordinary Level (O/L) Examination",
      description: "Completed Ordinary Level examination, laying the foundation for my academic journey.",
    },
    {
      year: 2018,
      title: "Diploma in Information Technology",
      description: "Earned a Diploma in Information Technology from ESOFT Metro Campus, gaining foundational IT skills.",
    },
    {
      year: 2021,
      title: "Diploma in English",
      description: "Completed a Diploma in English at ESOFT Metro Campus, enhancing communication skills.",
    },
    {
    year: 2021,
    title: "Advanced Level (A/L) – Technology Stream",
    description: "Studied Technology Stream subjects: SFT, ET, and ICT, achieving strong results and excelling in technical and scientific skills."
    },      

    {
    year: 2023,
    title: "Diploma in Software Engineering",
    description: "Completed the Diploma in Software Engineering at NIBM with distinction, gaining a strong foundation in software development principles and practices."
    },
    {
    year: 2025,
    title: "Higher National Diploma in Software Engineering",
    description: "Successfully completed the Higher National Diploma in Software Engineering at NIBM with distinction, deepening expertise in advanced software engineering concepts and practical applications."
    }
    ,
    {
      year: "2024-2025",
      title: "Web Developer Internship",
      description: "Worked as a Web Developer at Silicon Radon Networks (Pvt) Ltd from Dec 1, 2024, to May 30, 2025, gaining hands-on experience in web development.",
    },
  ];

  return (
    <section
      className={`min-h-screen transition-all duration-700 ease-out ${
        isDarkMode 
          ? "bg-black" 
          : "bg-white"
      }`}
    >
      <div className="pt-32 pb-16">
        {/* About Me Introduction */}
        <div className="max-w-4xl px-4 mx-auto mb-12 sm:px-6 lg:px-8 sm:mb-16 lg:mb-20">
          <div className="text-center">
            <h2 
              className={`text-xl sm:text-2xl lg:text-3xl font-light mb-4 sm:mb-6 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
              }}
            >
              About Me
            </h2>
            <p 
              className={`text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl sm:max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                lineHeight: '1.6'
              }}
            >
                I'm Thisara Ariyawansha, a passionate Full-Stack Developer specializing in building modern web applications. My journey combines hands-on development experience with a strong foundation in both frontend and backend technologies, enabling me to create scalable and efficient digital solutions.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-12 sm:gap-6 lg:gap-8 xl:gap-12">
            
            {/* Left Side - Years Navigator */}
            <div className="order-2 xl:col-span-3 xl:order-1">
              <div className="xl:sticky xl:top-32">
                <h2 
                  className={`text-xs sm:text-sm font-medium tracking-widest mb-3 sm:mb-4 lg:mb-6 xl:mb-8 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                  style={{ letterSpacing: '0.2em' }}
                >
                  TIMELINE
                </h2>
                <div className="grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-7 xl:grid-cols-1 sm:gap-2 xl:gap-2">
                  {timeline.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedItem(index)}
                      className={`text-center xl:text-left px-1 sm:px-2 xl:px-4 py-1.5 sm:py-2 xl:py-3 rounded-md sm:rounded-lg xl:rounded-xl transition-all duration-300 ${
                        selectedItem === index
                          ? isDarkMode
                            ? "bg-white text-black"
                            : "bg-black text-white"
                          : isDarkMode
                            ? "text-gray-400 hover:text-white hover:bg-gray-900"
                            : "text-gray-600 hover:text-black hover:bg-gray-100"
                      }`}
                    >
                      <div 
                        className="text-sm font-light sm:text-base lg:text-lg xl:text-2xl tabular-nums"
                        style={{ 
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                        }}
                      >
                        {item.year}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Content Display */}
            <div className="order-1 xl:col-span-9 xl:order-2">
              <div className="min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] xl:min-h-[500px] flex items-center">
                <div className="w-full">
                  {/* Large Year Display */}
                  <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-ultralight mb-3 sm:mb-4 lg:mb-6 ${
                    isDarkMode ? "text-gray-700" : "text-gray-300"
                  }`}
                  style={{ 
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontWeight: '100',
                    lineHeight: '0.8'
                  }}
                  >
                    {timeline[selectedItem].year}
                  </div>

                  {/* Content Card */}
                  <div className={`relative p-3 sm:p-4 lg:p-6 xl:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl border transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gray-950/50 border-gray-800" 
                      : "bg-gray-50/50 border-gray-200"
                  }`}>
                    {/* Floating dot indicator */}
                    <div 
                      className={`absolute -top-1 -left-1 sm:-top-1.5 sm:-left-1.5 lg:-top-2 lg:-left-2 w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full ${
                        isDarkMode ? "bg-white" : "bg-black"
                      }`}
                    />
                    
                    <h3 
                      className={`text-lg sm:text-xl lg:text-2xl xl:text-2xl font-light mb-2 sm:mb-3 lg:mb-4 leading-tight ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                      style={{ 
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                      }}
                    >
                      {timeline[selectedItem].title}
                    </h3>
                    
                    <p 
                      className={`text-xs sm:text-sm lg:text-base leading-relaxed ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                      style={{ 
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                        lineHeight: '1.5'
                      }}
                    >
                      {timeline[selectedItem].description}
                    </p>

                    {/* Progress indicator */}
                    <div className="flex mt-3 space-x-1 sm:mt-4 lg:mt-6 lg:space-x-2">
                      {timeline.map((_, index) => (
                        <div
                          key={index}
                          className={`h-0.5 sm:h-1 rounded-full transition-all duration-300 ${
                            index === selectedItem
                              ? isDarkMode ? "bg-white w-4 sm:w-6 lg:w-8" : "bg-black w-4 sm:w-6 lg:w-8"
                              : isDarkMode ? "bg-gray-600 w-1 sm:w-1.5 lg:w-2" : "bg-gray-300 w-1 sm:w-1.5 lg:w-2"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div 
        className={`fixed inset-0 pointer-events-none opacity-5 ${
          isDarkMode ? "bg-white" : "bg-black"
        }`}
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      />
    </section>
  );
}