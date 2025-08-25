// ThemeScript.tsx - Alternative version with proper script
"use client";

export default function ThemeScript() {
  // This script will run before React hydration
  const setTheme = `(function() {
    try {
      var savedTheme = localStorage.getItem("theme");
      var systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      var initialTheme = savedTheme 
        ? savedTheme 
        : (systemPrefersDark ? "dark" : "light");
      
      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.setAttribute("data-theme", "light");
      }
      
      if (!savedTheme) {
        localStorage.setItem("theme", initialTheme);
      }
    } catch (e) {
      console.error("Theme setting error:", e);
    }
  })();`;

  return <script dangerouslySetInnerHTML={{ __html: setTheme }} />;
}