"use client";

import { useEffect, useRef, useState } from 'react';
import ShutterText from './ShutterText';

export default function Skill() {
  const skills = [
    { name: "php", icon: "/icons/php.png", color: "white" },
    { name: "Android", icon: "/icons/android.png", color: "white" },
    { name: "Arduino", icon: "/icons/arduino.png", color: "white" },
    { name: "Bootstrap", icon: "/icons/bootstrap.png", color: "white" },
    { name: "C", icon: "/icons/c.png", color: "white" },
    { name: "Csharp", icon: "/icons/csharp.png", color: "white" },
    { name: "C++", icon: "/icons/c++.png", color: "white" },
    { name: "HTML", icon: "/icons/html.png", color: "white" },
    { name: "Dart", icon: "/icons/dart.png", color: "white" },
    { name: "Tailwind", icon: "/icons/tailwind.png", color: "white" },
    { name: ".Net", icon: "/icons/net.png", color: "white" },
    { name: "Express", icon: "/icons/express.png", color: "white" },
    { name: "Firebase", icon: "/icons/Firebase.png", color: "white" },
    { name: "Flask", icon: "/icons/Flask.png", color: "white" },
    { name: "Flutter", icon: "/icons/flutter.png", color: "white" },
    { name: "Git", icon: "/icons/Git.png", color: "white" },
    { name: "Java", icon: "/icons/Java.webp", color: "white" },
    { name: "javascript", icon: "/icons/javascript.png", color: "white" },
    { name: "Mathworks", icon: "/icons/Mathworks.png", color: "white" },
    { name: "Mongodb", icon: "/icons/Mongodb.png", color: "white" },
    { name: "Sqlserver", icon: "/icons/Sqlserver.png", color: "white" },
    { name: "Mysql", icon: "/icons/mysql.svg", color: "white" },
    { name: "Node", icon: "/icons/nodejs.png", color: "white" },
    { name: "Opencv", icon: "/icons/Opencv.png", color: "white" },
    { name: "Oracle", icon: "/icons/Oracle.png", color: "white" },
    { name: "Postman", icon: "/icons/Postman.png", color: "white" },
    { name: "CSS", icon: "/icons/css.png", color: "white" },
    { name: "Python", icon: "/icons/Python.png", color: "white" },
    { name: "React", icon: "/icons/react.png", color: "white" },
    { name: "Nextjs", icon: "/icons/Nextjs.png", color: "white" },
    { name: "Springboot", icon: "/icons/Springboot.png", color: "white" },
    { name: "Tensorflow", icon: "/icons/tensorflow.png", color: "white" },
    { name: "Laravel", icon: "/icons/Laravel.webp", color: "white" }
  ];

  const [isDarkMode, setIsDarkMode] = useState(false);
  const leftMarqueeRef = useRef(null);
  const rightMarqueeRef = useRef(null);

  // Drag state for each row (kept in refs so the rAF loop doesn't re-render on every frame)
  const leftDrag = useRef({ dragging: false, startX: 0, startPos: 0, pos: 0, halfWidth: 0 });
  const rightDrag = useRef({ dragging: false, startX: 0, startPos: 0, pos: 0, halfWidth: 0 });

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

  // JS-driven marquee: lets us pause and manually drag/swipe the rows,
  // which a pure CSS @keyframes animation can't support.
  useEffect(() => {
    const SPEED = 0.3; // px per frame

    const measure = () => {
      if (leftMarqueeRef.current) {
        leftDrag.current.halfWidth = leftMarqueeRef.current.scrollWidth / 2;
      }
      if (rightMarqueeRef.current) {
        rightDrag.current.halfWidth = rightMarqueeRef.current.scrollWidth / 2;
        if (rightDrag.current.pos === 0) {
          rightDrag.current.pos = -rightDrag.current.halfWidth;
        }
      }
    };
    measure();
    window.addEventListener('resize', measure);

    const wrap = (pos, width) => {
      if (!width) return pos;
      let p = pos % width;
      if (p > 0) p -= width;
      return p;
    };

    let frameId;
    const tick = () => {
      const left = leftDrag.current;
      const right = rightDrag.current;

      if (!left.dragging) {
        left.pos = wrap(left.pos - SPEED, left.halfWidth);
      }
      if (!right.dragging) {
        right.pos = wrap(right.pos + SPEED, right.halfWidth);
      }

      if (leftMarqueeRef.current) {
        leftMarqueeRef.current.style.transform = `translateX(${left.pos}px)`;
      }
      if (rightMarqueeRef.current) {
        rightMarqueeRef.current.style.transform = `translateX(${right.pos}px)`;
      }

      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const makeDragHandlers = (dragRef) => ({
    onPointerDown: (e) => {
      dragRef.current.dragging = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.startPos = dragRef.current.pos;
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    onPointerMove: (e) => {
      if (!dragRef.current.dragging) return;
      const delta = e.clientX - dragRef.current.startX;
      dragRef.current.pos = dragRef.current.startPos + delta;
    },
    onPointerUp: (e) => {
      dragRef.current.dragging = false;
      if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    },
    onPointerCancel: () => {
      dragRef.current.dragging = false;
    },
  });

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap" rel="stylesheet" />
        <div
          className={`w-full py-8 overflow-hidden font-light sm:py-12 font-inter ${
            isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
        <ShutterText
          lines={['Technology Skills']}
          fontSize="clamp(24px, 4vw, 30px)"
          className="mb-4 font-bold sm:mb-4 font-heading"
          color={isDarkMode ? '#ffffff' : '#000000'}
          revealColor="#1E3A8A"
        />
        <div
          className={`w-24 h-1 mx-auto mb-8 rounded sm:mb-12 ${
            isDarkMode ? 'bg-gray-100' : 'bg-gray-900'
          }`}
        ></div>

        <div className="relative flex py-4 overflow-hidden sm:py-6">
          <div
            ref={leftMarqueeRef}
            className="flex min-w-0 py-4 cursor-grab active:cursor-grabbing whitespace-nowrap touch-pan-y select-none"
            style={{ willChange: 'transform' }}
            {...makeDragHandlers(leftDrag)}
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                className="relative inline-flex items-center justify-center flex-shrink-0 w-28 h-16 px-3 py-2 mx-1.5 text-white transition-transform duration-300 transform bg-black border border-gray-700 shadow-lg cursor-pointer group sm:mx-3 sm:px-4 sm:py-3 rounded-xl hover:scale-105 sm:w-36 sm:h-20 dark:border-gray-600"
              >
                <div
                  className="flex items-center justify-center flex-shrink-0 w-9 h-9 bg-white rounded-full sm:w-12 sm:h-12 dark:bg-gray-700"
                  style={{ backgroundColor: skill.color }}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="object-contain w-6 h-6 sm:w-8 sm:h-8"
                  />
                </div>
                <div className="absolute px-2 py-1 text-xs font-light text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 pointer-events-none -top-8 left-1/2 dark:bg-gray-200 dark:text-black font-inter group-hover:opacity-100">
                  {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                </div>
              </div>
            ))}
            {skills.map((skill, index) => (
              <div
                key={`dup-${index}`}
                className="relative inline-flex items-center justify-center flex-shrink-0 w-28 h-16 px-3 py-2 mx-1.5 text-white transition-transform duration-300 transform bg-black border border-gray-700 shadow-lg cursor-pointer group sm:mx-3 sm:px-4 sm:py-3 dark:bg-gray-800 rounded-xl hover:scale-105 sm:w-36 sm:h-20 dark:border-gray-600"
              >
                <div
                  className="flex items-center justify-center flex-shrink-0 w-9 h-9 bg-white rounded-full sm:w-12 sm:h-12 dark:bg-gray-700"
                  style={{ backgroundColor: skill.color }}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="object-contain w-6 h-6 sm:w-8 sm:h-8"
                  />
                </div>
                <div className="absolute px-2 py-1 text-xs font-light text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 pointer-events-none -top-8 left-1/2 dark:bg-gray-200 dark:text-black font-inter group-hover:opacity-100">
                  {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex py-4 overflow-hidden sm:py-6">
          <div
            ref={rightMarqueeRef}
            className="flex min-w-0 py-4 cursor-grab active:cursor-grabbing whitespace-nowrap touch-pan-y select-none"
            style={{ willChange: 'transform' }}
            {...makeDragHandlers(rightDrag)}
          >
            {skills.slice().reverse().map((skill, index) => (
              <div
                key={index}
                className="relative inline-flex items-center justify-center flex-shrink-0 w-28 h-16 px-3 py-2 mx-1.5 text-white transition-transform duration-300 transform bg-black border border-gray-700 shadow-lg cursor-pointer group sm:mx-3 sm:px-4 sm:py-3 rounded-xl hover:scale-105 sm:w-36 sm:h-20 dark:border-gray-600"
              >
                <div
                  className="flex items-center justify-center flex-shrink-0 w-9 h-9 bg-white rounded-full sm:w-12 sm:h-12 dark:bg-gray-700"
                  style={{ backgroundColor: skill.color }}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="object-contain w-6 h-6 sm:w-8 sm:h-8"
                  />
                </div>
                <div className="absolute px-2 py-1 text-xs font-light text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 pointer-events-none -top-8 left-1/2 dark:bg-gray-200 dark:text-black font-inter group-hover:opacity-100">
                  {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                </div>
              </div>
            ))}
            {skills.slice().reverse().map((skill, index) => (
              <div
                key={`dup-${index}`}
                className="relative inline-flex items-center justify-center flex-shrink-0 w-28 h-16 px-3 py-2 mx-1.5 text-white transition-transform duration-300 transform bg-black border border-gray-300 shadow-lg cursor-pointer group sm:mx-3 sm:px-4 sm:py-3 dark:bg-gray-800 rounded-xl hover:scale-105 sm:w-36 sm:h-20 dark:border-gray-600"
              >
                <div
                  className="flex items-center justify-center flex-shrink-0 w-9 h-9 bg-white rounded-full sm:w-12 sm:h-12 dark:bg-gray-700"
                  style={{ backgroundColor: skill.color }}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="object-contain w-6 h-6 sm:w-8 sm:h-8"
                  />
                </div>
                <div className="absolute px-2 py-1 text-xs font-light text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 pointer-events-none -top-8 left-1/2 dark:bg-gray-200 dark:text-black font-inter group-hover:opacity-100">
                  {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}