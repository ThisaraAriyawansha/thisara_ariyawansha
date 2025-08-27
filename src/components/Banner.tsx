import React from "react";

const Banner = () => {
  return (
    <div
      className="relative flex items-center justify-center w-full text-center text-white bg-center bg-cover h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
      style={{
        backgroundImage: "url('/otherimages/bg.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
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
          Explore Our Work
        </a>
      </div>
    </div>
  );
};

export default Banner;