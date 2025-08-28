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
      className={` transition-all duration-700 ease-out ${
        isDarkMode 
          ? "bg-black" 
          : "bg-white"
      }`}
    >
      <div className="pt-6 pb-6 md:pt-8 md:pb-8">
        {/* About Me Introduction */}
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 
              className={`text-lg sm:text-xl md:text-2xl font-light   ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
              }}
            >
              TIMELINE
            </h2>
            <div className={`w-16 h-px mx-auto mb-6 ${isDarkMode ? "bg-gray-500" : "bg-gray-500"}`} />


          </div>
        </div>

        {/* Main Content Grid */}
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-3 md:gap-4 xl:grid-cols-12 sm:gap-4 lg:gap-6 xl:gap-8">
            
            {/* Left Side - Years Navigator */}
            <div className="order-2 xl:col-span-3 xl:order-1">
              <div className="xl:sticky xl:top-28">
                <h2 
                  className={`text-xs font-medium tracking-widest mb-2 sm:mb-3 md:mb-4 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                  style={{ letterSpacing: '0.2em' }}
                >
                  TIMELINE
                </h2>
                <div className="grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-7 xl:grid-cols-1 sm:gap-1.5 xl:gap-1.5">
                  {timeline.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedItem(index)}
                      className={`text-center xl:text-left px-1 sm:px-1.5 xl:px-3 py-1 sm:py-1.5 xl:py-2 rounded-md sm:rounded-md xl:rounded-lg transition-all duration-300 ${
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
                        className="text-xs font-light sm:text-sm md:text-base tabular-nums"
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
              <div className="min-h-[250px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[350px] xl:min-h-[400px] flex items-center">
                <div className="w-full">
                  {/* Large Year Display */}
                  <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-ultralight mb-2 sm:mb-3 md:mb-4 ${
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
                  <div className={`relative p-3 sm:p-3 md:p-4 lg:p-5 xl:p-6 rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-2xl border transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gray-950/50 border-gray-800" 
                      : "bg-gray-50/50 border-gray-200"
                  }`}>
                    {/* Floating dot indicator */}
                    <div 
                      className={`absolute -top-1 -left-1 sm:-top-1 sm:-left-1 md:-top-1 md:-left-1 w-2 h-2 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full ${
                        isDarkMode ? "bg-white" : "bg-black"
                      }`}
                    />
                    
                    <h3 
                      className={`text-base sm:text-lg md:text-xl font-light mb-1.5 sm:mb-2 md:mb-3 leading-tight ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                      style={{ 
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                      }}
                    >
                      {timeline[selectedItem].title}
                    </h3>
                    
                    <p 
                      className={`text-xs sm:text-xs md:text-sm leading-relaxed ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                      style={{ 
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                        lineHeight: '1.4'
                      }}
                    >
                      {timeline[selectedItem].description}
                    </p>

                    {/* Progress indicator */}
                    <div className="flex mt-2 sm:mt-3 md:mt-4 space-x-1 md:space-x-1.5">
                      {timeline.map((_, index) => (
                        <div
                          key={index}
                          className={`h-0.5 sm:h-0.5 md:h-1 rounded-full transition-all duration-300 ${
                            index === selectedItem
                              ? isDarkMode ? "bg-white w-3 sm:w-4 md:w-5" : "bg-black w-3 sm:w-4 md:w-5"
                              : isDarkMode ? "bg-gray-600 w-1 sm:w-1 md:w-1.5" : "bg-gray-300 w-1 sm:w-1 md:w-1.5"
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