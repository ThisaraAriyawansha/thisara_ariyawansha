"use client";

import React, { useState, useEffect } from "react";

const Banner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // This code runs only on the client side
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="relative flex items-center justify-center w-full text-center text-white bg-center bg-cover h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
      style={{
        backgroundImage: "url('/otherimages/dbfdb0c19cf661eb47c29ac8e6d1569dcd79bc7f-1680x945.gif')",
        // Responsive background sizing
        backgroundSize: "cover",
        // Responsive positioning - focus on center for mobile, allow more flexibility for desktop
        backgroundPosition: isMobile ? "center 30%" : "center center",
        // Fix background image for desktop only
        backgroundAttachment: isMobile ? "scroll" : "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay with gradient for modern effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50"></div>
      
      <div className="relative z-10 max-w-4xl px-4 mx-auto sm:px-6 md:px-8">
        {/* Subtitle with modern typography and animation */}
        <p className="mb-3 text-xs font-light leading-relaxed tracking-wider uppercase sm:text-sm md:text-lg lg:text-xl md:mb-4 animate-fade-in">
          Crafting Seamless Frontend Experiences & Scalable Backend Solutions
        </p>
        
        {/* Call-to-action button with transparent background, white border, and white text */}
        <a
          href="#projects"
          className="inline-block px-4 py-2 mt-4 text-sm font-medium text-white transition-colors duration-300 ease-in-out bg-transparent border border-white rounded-full sm:px-6 sm:py-3 sm:text-base hover:bg-white/10"
        >
          Explore My Work
        </a>
      </div>
    </div>
  );
};

export default Banner;