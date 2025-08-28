"use client";
import { useState, useEffect, useRef } from 'react';

// Define theme object with customizable globe colors
const themes = {
  light: {
    background: '#ffffff', // White
    text: '#000000', // Black
    subText: '#6b7280', // Gray-500
    progressBarBg: '#e5e7eb', // Gray-200
    progressBarFill: '#000000', // Black
    globeWireframe: 0x374151, // Blue
    globePoints: 0x4b5563, // Red
    ring: 'border-black/20',
    ringSecondary: 'border-black/15',
    codeAccent: '#2563eb', // Blue for code elements
  },
  dark: {
    background: '#000000', // Black
    text: '#ffffff', // White
    subText: '#d1d5db', // Gray-300
    progressBarBg: '#374151', // Gray-700
    progressBarFill: '#ffffff', // White
    globeWireframe: 0x60a5fa, // Lighter blue
    globePoints: 0xf87171, // Lighter red
    ring: 'border-white/20',
    ringSecondary: 'border-white/15',
    codeAccent: '#3b82f6', // Blue for code elements
  },
};

export default function ClientWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const globeRef = useRef(null);
  const animationIdRef = useRef(null);

  // Select current theme based on isDarkMode
  const currentTheme = isDarkMode ? themes.dark : themes.light;

  // Detect dark mode
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark') ||
                  document.documentElement.getAttribute('data-theme') === 'dark';
    setIsDarkMode(isDark);

    const observer = new MutationObserver(() => {
      const newIsDark = document.documentElement.classList.contains('dark') ||
                       document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(newIsDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    const initThreeJS = async () => {
      const THREE = await import('three');

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });

      const setCanvasSize = () => {
        const canvas = canvasRef.current;
        const size = Math.min(window.innerWidth * 0.8, 600);
        renderer.setSize(size, size);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
      };

      setCanvasSize();
      renderer.setClearColor(0x000000, 0);

      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: currentTheme.globeWireframe,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });

      const globe = new THREE.Mesh(geometry, material);
      scene.add(globe);

      const pointGeometry = new THREE.SphereGeometry(0.02, 8, 8);
      const pointMaterial = new THREE.MeshBasicMaterial({
        color: currentTheme.globePoints,
      });

      const points = [];
      for (let i = 0; i < 20; i++) {
        const point = new THREE.Mesh(pointGeometry, pointMaterial.clone());
        const phi = Math.acos(-1 + (2 * Math.random()));
        const theta = Math.random() * Math.PI * 2;

        point.position.x = 1.01 * Math.sin(phi) * Math.cos(theta);
        point.position.y = 1.01 * Math.cos(phi);
        point.position.z = 1.01 * Math.sin(phi) * Math.sin(theta);

        points.push(point);
        scene.add(point);
      }

      camera.position.z = 2.5;

      sceneRef.current = scene;
      rendererRef.current = renderer;
      globeRef.current = { globe, points };

      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        if (globe && points) {
          globe.rotation.y += 0.005;
          globe.rotation.x += 0.002;

          points.forEach((point, index) => {
            point.material.opacity = 0.5 + 0.5 * Math.sin(Date.now() * 0.003 + index);
          });
        }
        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => setCanvasSize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };

    initThreeJS();

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 300);

    const completeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(completeTimer);
      clearInterval(progressInterval);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Update globe and points colors on theme change
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.globe.material.color.set(currentTheme.globeWireframe);
      globeRef.current.points.forEach((point) => {
        point.material.color.set(currentTheme.globePoints);
      });
    }
  }, [isDarkMode]);

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center font-mono"
        style={{ backgroundColor: currentTheme.background }}
      >
        <div className="w-full max-w-2xl px-4 text-center">
          <div className="relative mb-6">
            <canvas
              ref={canvasRef}
              className="mx-auto w-[min(70vw,350px)] h-[min(70vw,350px)]"
              style={{
                maxWidth: '350px',
                maxHeight: '350px',
                backgroundColor: currentTheme.background,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`absolute border rounded-full animate-ping ${currentTheme.ring}`}
                style={{ width: '110%', height: '110%', animationDelay: '0.5s' }}
              ></div>
              <div
                className={`absolute border rounded-full animate-ping ${currentTheme.ringSecondary}`}
                style={{ width: '120%', height: '120%', animationDelay: '1s' }}
              ></div>
            </div>
          </div>

          {/* Updated with smaller font sizes */}
          <h2
            className="mb-3 text-xl font-medium md:text-2xl"
            style={{ color: currentTheme.codeAccent }}
          >
            console.log("<span style={{ color: currentTheme.text }}>Hello, I'm Thisara Ariyawansha</span>");
          </h2>
          <p
            className="mb-4 text-sm font-light md:text-base"
            style={{ color: currentTheme.subText }}
          >
            // Full Stack Developer specializing in modern web technologies
          </p>

          <div className="w-full max-w-md mx-auto mb-6">
            <div
              className="h-1 overflow-hidden rounded-full"
              style={{ backgroundColor: currentTheme.progressBarBg }}
            >
              <div
                className="h-full transition-all duration-500 rounded-full"
                style={{ width: `${progress}%`, backgroundColor: currentTheme.progressBarFill }}
              ></div>
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] md:text-xs" style={{ color: currentTheme.subText }}>
              <span>$ loading.init()</span>
              <span>{Math.round(progress)}%</span>
              <span>{progress === 100 ? "ready" : "compiling"}</span>
            </div>
          </div>

          {/* Additional coder element with smaller font */}
          <div 
            className="inline-block px-2 py-1 text-[10px] md:text-xs rounded"
            style={{ 
              backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
              color: currentTheme.codeAccent,
              border: `1px solid ${currentTheme.codeAccent}20`
            }}
          >
            <span style={{ color: currentTheme.codeAccent }}>npm run</span> dev
          </div>
        </div>
      </div>
    );
  }

  return children;
}