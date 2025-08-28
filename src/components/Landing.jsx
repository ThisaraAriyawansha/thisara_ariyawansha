"use client";
import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const globeRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);

    // Initialize Three.js scene for half globe
    const initThreeJS = async () => {
      const THREE = await import('three');
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current,
        alpha: true,
        antialias: true
      });
      
      renderer.setSize(window.innerWidth, 400);
      renderer.setClearColor(0x000000, 0);
      
      // Create half globe geometry
      const geometry = new THREE.SphereGeometry(2, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.6);
      
      // Create wireframe material
      const material = new THREE.MeshBasicMaterial({
        color: isDark ? 0xffffff : 0x000000,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      });
      
      const globe = new THREE.Mesh(geometry, material);
      globe.rotation.x = Math.PI * 0.1;
      scene.add(globe);
      
      // Add connection points on the globe surface
      const pointGeometry = new THREE.SphereGeometry(0.03, 8, 8);
      const pointMaterial = new THREE.MeshBasicMaterial({
        color: isDark ? 0xffffff : 0x000000,
        transparent: true
      });
      
      const points = [];
      for (let i = 0; i < 30; i++) {
        const point = new THREE.Mesh(pointGeometry, pointMaterial);
        const phi = Math.acos(-1 + (Math.random() * 1.2)); // Only upper hemisphere
        const theta = Math.random() * Math.PI * 2;
        
        point.position.x = 2.02 * Math.sin(phi) * Math.cos(theta);
        point.position.y = 2.02 * Math.cos(phi);
        point.position.z = 2.02 * Math.sin(phi) * Math.sin(theta);
        
        points.push(point);
        scene.add(point);
      }
      
      // Add connecting lines between some points
      const lineMaterial = new THREE.LineBasicMaterial({
        color: isDark ? 0xffffff : 0x000000,
        transparent: true,
        opacity: 0.3
      });
      
      const lines = [];
      for (let i = 0; i < 10; i++) {
        const lineGeometry = new THREE.BufferGeometry();
        const point1 = points[Math.floor(Math.random() * points.length)];
        const point2 = points[Math.floor(Math.random() * points.length)];
        
        const positions = new Float32Array([
          point1.position.x, point1.position.y, point1.position.z,
          point2.position.x, point2.position.y, point2.position.z
        ]);
        
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const line = new THREE.Line(lineGeometry, lineMaterial);
        lines.push(line);
        scene.add(line);
      }
      
      camera.position.set(0, 1, 4);
      camera.lookAt(0, 0, 0);
      
      // Store references
      sceneRef.current = scene;
      rendererRef.current = renderer;
      globeRef.current = { globe, points, lines };
      
      // Animation loop
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        
        if (globe && points) {
          globe.rotation.y += 0.003;
          
          points.forEach((point, index) => {
            const time = Date.now() * 0.002;
            point.material.opacity = 0.4 + 0.6 * Math.sin(time + index * 0.5);
          });
          
          lines.forEach((line, index) => {
            const time = Date.now() * 0.001;
            line.material.opacity = 0.1 + 0.2 * Math.sin(time + index * 0.3);
          });
        }
        
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Handle resize
      const handleResize = () => {
        if (renderer && camera) {
          renderer.setSize(window.innerWidth, 400);
          camera.aspect = window.innerWidth / 400;
          camera.updateProjectionMatrix();
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };
    
    initThreeJS();
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Update material colors when theme changes
  useEffect(() => {
    if (globeRef.current && rendererRef.current) {
      const color = isDark ? 0xffffff : 0x000000;
      globeRef.current.globe.material.color.setHex(color);
      globeRef.current.points.forEach(point => {
        point.material.color.setHex(color);
      });
      globeRef.current.lines.forEach(line => {
        line.material.color.setHex(color);
      });
    }
  }, [isDark]);

  return (
    <section className={`min-h-screen transition-colors duration-500 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      
      {/* Theme toggle button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-6 right-6 z-50 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
          isDark 
            ? 'bg-white/10 text-white hover:bg-white/20' 
            : 'bg-black/10 text-black hover:bg-black/20'
        }`}
      >
        {isDark ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
            <path d="M12 1l3 6h-6zM12 23l-3-6h6zM4.2 4.2l4.2 4.2-1.4 1.4L2.8 5.6zM19.8 19.8l-4.2-4.2 1.4-1.4 4.2 4.2zM1 12l6-3v6zM23 12l-6 3v-6zM4.2 19.8l4.2-4.2 1.4 1.4-4.2 4.2zM19.8 4.2l-4.2 4.2-1.4-1.4 4.2-4.2z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        )}
      </button>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden">
        
        {/* Content */}
        <div className={`text-center z-10 px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className={`text-5xl md:text-7xl font-light tracking-wider mb-6 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            THISARA
          </h1>
          
          <div className={`w-24 h-px mx-auto mb-6 transition-colors duration-300 ${
            isDark ? 'bg-white' : 'bg-black'
          }`} />
          
          <p className={`text-lg md:text-xl font-light tracking-wide mb-8 transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Digital Portfolio & Creative Space
          </p>
          
          {/* Connection indicators */}
          <div className="flex items-center justify-center mb-12 space-x-6">
            <div className={`flex items-center space-x-2 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                isDark ? 'bg-white' : 'bg-black'
              }`} />
              <span className="text-sm font-light">Connected</span>
            </div>
            <div className={`w-px h-4 ${
              isDark ? 'bg-white/20' : 'bg-black/20'
            }`} />
            <div className={`flex items-center space-x-2 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse delay-300 ${
                isDark ? 'bg-white' : 'bg-black'
              }`} />
              <span className="text-sm font-light">Global</span>
            </div>
            <div className={`w-px h-4 ${
              isDark ? 'bg-white/20' : 'bg-black/20'
            }`} />
            <div className={`flex items-center space-x-2 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse delay-500 ${
                isDark ? 'bg-white' : 'bg-black'
              }`} />
              <span className="text-sm font-light">Interactive</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className={`px-8 py-3 border transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'border-white text-white hover:bg-white hover:text-black' 
                : 'border-black text-black hover:bg-black hover:text-white'
            }`}>
              View Portfolio
            </button>
            <button className={`px-8 py-3 transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}>
              Get In Touch
            </button>
          </div>
        </div>

        {/* 3D Half Globe at bottom */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-96">
          <canvas 
            ref={canvasRef}
            className="w-full h-full"
            style={{ transform: 'translateY(50%)' }}
          />
        </div>
      </section>
    </section>
  );
}