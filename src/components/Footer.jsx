"use client";

import { useEffect, useState } from 'react';

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <footer className={`py-6 text-center transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-white text-black'
    }`}>
      <p>© {new Date().getFullYear()} Thisara. All rights reserved.</p>
    </footer>
  );
}