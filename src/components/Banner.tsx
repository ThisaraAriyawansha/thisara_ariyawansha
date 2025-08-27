import React from "react";

const Banner = () => {
  return (
    <div
      className="relative flex items-center justify-center w-full text-center text-white bg-center bg-cover h-[250px] sm:h-[320px] md:h-[420px] lg:h-[520px]"
      style={{
        backgroundImage: "url('/otherimages/bg.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-3xl px-3 mx-auto sm:px-4 md:max-w-4xl">
        {/* Subtitle */}
        <p className="mb-2 text-[10px] sm:text-sm md:text-base lg:text-lg tracking-wide uppercase leading-snug md:mb-3">
          {`Designing Seamless Frontend Experiences and Engineering Scalable Backend Systems`}
        </p>

        {/* Divider */}
        <div className="w-16 sm:w-20 md:w-28 lg:w-32 h-[1px] bg-gray-300 mx-auto mb-3 md:mb-4"></div>

        {/* Main Heading */}
        <h1
          className="text-lg font-light leading-tight sm:text-2xl md:text-4xl lg:text-5xl font-tech sm:leading-snug md:leading-snug"
        >
          Full-Stack Development. <br className="block sm:hidden" /> End-to-End Solutions.
        </h1>
      </div>
    </div>
  );
};

export default Banner;
