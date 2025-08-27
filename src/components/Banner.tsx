import React from "react";

const Banner = () => {
  return (
    <div
      className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{
        backgroundImage: "url('/othreimages/bg.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 max-w-4xl px-4 mx-auto">
        <p className="mb-2 text-xs tracking-wide uppercase sm:text-sm md:text-base md:mb-3">
          {`Designing Seamless Frontend Experiences and Engineering Scalable Backend Systems`}
        </p>

        <div className="w-20 sm:w-24 md:w-32 h-[1px] bg-gray-300 mx-auto mb-3 md:mb-4"></div>

        <h1 className="text-2xl font-light sm:text-3xl md:text-4xl lg:text-5xl">
          Full-Stack Development. End-to-End Solutions.
        </h1>
      </div>
    </div>
  );
};

export default Banner;
