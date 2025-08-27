"use client";
import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: (index) => (index % 2 === 0 ? -50 : 50), y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      boxShadow: isDarkMode
        ? "0 0 15px rgba(255, 255, 255, 0.3)"
        : "0 0 15px rgba(0, 0, 0, 0.3)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const contactItems = [
    {
      icon: <Mail size={24} />,
      text: "thisara.a2001@gmail.com",
      href: "mailto:thisara.a2001@gmail.com",
    },
    {
      icon: <Phone size={24} />,
      text: "+94 77 123 4567",
      href: "tel:+94771234567",
    },
    {
      icon: <MapPin size={24} />,
      text: "Colombo, Sri Lanka",
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      text: "GitHub",
      href: "https://github.com/yourusername",
    },
    {
      icon: <Linkedin size={24} />,
      text: "LinkedIn",
      href: "https://linkedin.com/in/yourusername",
    },
  ];

  return (
    <section
      id="contact"
      className={`min-h-screen pt-20 transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
      ref={ref}
    >
      <div className="relative max-w-5xl px-4 py-12 mx-auto sm:px-6 md:px-8">
        {/* Subtle background gradient for depth */}
        <div
          className={`absolute inset-0 opacity-20 rounded-3xl ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-800 to-black"
              : "bg-gradient-to-br from-gray-200 to-white"
          }`}
        ></div>
        <motion.h1
          className="relative z-10 mb-8 text-3xl font-bold text-center sm:text-4xl"
          style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Let's Connect
        </motion.h1>
        <motion.p
          className={`text-base sm:text-lg text-center max-w-2xl mx-auto mb-12 relative z-10 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          Reach out to explore collaborations, discuss projects, or just say hello.
        </motion.p>
        <motion.div
          className="relative z-10 grid gap-6 sm:grid-cols-3 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              className={`p-4 sm:p-6 rounded-2xl border transform transition-all duration-300 hover:-translate-y-1 ${
                isDarkMode
                  ? "bg-gray-900/80 border-gray-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "bg-gray-100/80 border-gray-200 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]"
              } ${index === 0 ? "sm:ml-8" : index === 1 ? "sm:mt-8" : "sm:mr-8"}`}
              variants={itemVariants}
              custom={index}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {item.icon}
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    className={`text-sm sm:text-base hover:underline ${
                      isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"
                    }`}
                  >
                    {item.text}
                  </a>
                ) : (
                  <span
                    className={`text-sm sm:text-base ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item.text}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="relative z-10 flex flex-col justify-center gap-4 mt-8 sm:flex-row sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border transition-colors duration-300 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-900/80 text-gray-300 hover:text-white hover:bg-gray-800"
                  : "border-gray-200 bg-gray-100/80 text-gray-700 hover:text-black hover:bg-gray-200"
              }`}
              variants={buttonVariants}
              whileHover="hover"
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}