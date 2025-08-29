"use client";

import React from 'react';

const ShowcaseSection = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[200px] sm:min-h-[200px] md:min-h-[200px] lg:min-h-[300px] xl:min-h-[300px] max-h-[300px] px-4 py-8 bg-black">
      <h1 
        className="text-4xl font-bold tracking-widest text-center text-transparent sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        style={{
          backgroundImage: 'url("/otherimages/bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
      >
        PROJECT
      </h1>
    </section>
  );
};

export default ShowcaseSection;
