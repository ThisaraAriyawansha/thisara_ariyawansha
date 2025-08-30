"use client";
import React, { useEffect, useState } from 'react';

const ShowcaseSection = () => {
  const [codeSnippets, setCodeSnippets] = useState([]);

  const codeLines = [
    "const project = await buildAmazing();",
    "function createInnovation() {",
    "  return solutions.map(idea => magic);",
    "}",
    "import { creativity } from 'imagination';",
    "while(coding) { dreams.push(reality); }",
    "class Developer extends Human {",
    "  constructor() { super.passionate(); }",
    "}",
    "const future = new Promise(resolve => {",
    "  resolve(this.portfolio);",
    "});",
    "git commit -m 'Building the future'",
    "npm install endless-possibilities",
    "export default Excellence;",
    "// Code is poetry in motion",
    "const success = hard_work * dedication;",
    "if (dream === true) { makeItReal(); }",
    "async function changeTheWorld() {",
    "  const impact = await code();",
    "  return impact;",
    "}",
    "console.log('Hello, Future!');",
    "const portfolio = skills.reduce(magic);",
    "return innovation.compile();",
  ];

  useEffect(() => {
    const generateSnippets = () => {
      const newSnippets = [];
      for (let i = 0; i < 20; i++) {
        newSnippets.push({
          id: i,
          text: codeLines[Math.floor(Math.random() * codeLines.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 15 + Math.random() * 10,
          size: Math.random() * 0.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setCodeSnippets(newSnippets);
    };

    generateSnippets();
    const interval = setInterval(generateSnippets, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="projects" className="relative flex flex-col items-center justify-center min-h-[250px] sm:min-h-[250px] md:min-h-[250px] lg:min-h-[400px] xl:min-h-[400px] max-h-[450px] px-4 py-8 bg-black overflow-hidden">
      
      {/* Animated Code Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Matrix-style vertical lines */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={`line-${i}`}
              className="absolute w-px bg-gradient-to-b from-transparent via-green-500/20 to-transparent"
              style={{
                left: `${(i + 1) * 12.5}%`,
                height: '100%',
                animation: `pulse ${2 + i * 0.5}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* Floating Code Snippets - Hidden on mobile (below md breakpoint) */}
        <div className="hidden md:block">
          {codeSnippets.map((snippet) => (
            <div
              key={snippet.id}
              className="absolute font-mono text-green-700 select-none whitespace-nowrap"
              style={{
                left: `${snippet.x}%`,
                top: `${snippet.y}%`,
                opacity: snippet.opacity,
                fontSize: `${snippet.size}rem`,
                transform: `scale(${snippet.size})`,
                animation: `float ${snippet.duration}s linear infinite`,
                animationDelay: `${snippet.delay}s`,
              }}
            >
              {snippet.text}
            </div>
          ))}
        </div>

        {/* Binary Rain Effect */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={`binary-${i}`}
              className="absolute font-mono text-xs select-none text-blue-500/20"
              style={{
                left: `${Math.random() * 100}%`,
                animation: `binaryRain ${8 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>

        {/* Circuit Board Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M0 10 L20 10 M10 0 L10 20 M5 5 L15 15 M15 5 L5 15"
                  stroke="rgba(34, 197, 94, 0.3)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle cx="10" cy="10" r="1" fill="rgba(34, 197, 94, 0.5)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>

        {/* Glowing Particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-cyan-900 opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `glow ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 3}s`,
                boxShadow: '0 0 10px currentColor',
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Title */}
        <h1 
          className="text-5xl font-bold tracking-widest text-center text-transparent sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl drop-shadow-2xl"
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

        {/* Subtitle */}
        <p className="max-w-xl px-4 py-2 mt-4 text-sm text-center text-gray-600 sm:text-base md:text-base lg:text-lg">
          A curated collection of my work, featuring innovative solutions and cutting-edge technologies.
        </p>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(100vh) translateX(-10px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(10px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes binaryRain {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes glow {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 1; }
        }
        
        @keyframes pulse {
          0% { opacity: 0.2; }
          100% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default ShowcaseSection;