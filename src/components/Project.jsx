"use client";

import React, { useState, useEffect } from 'react';
import { X, Github, ExternalLink, Eye } from 'lucide-react';

const ProjectsShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fetch projects data and detect theme
  useEffect(() => {
    // Fetch projects from data/projects.json
    fetch('/data/projects.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        return response.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));

    // Detect initial theme from document.documentElement
    const isDark = document.documentElement.classList.contains('dark') ||
                   document.documentElement.getAttribute('data-theme') === 'dark';
    setIsDarkMode(isDark);

    // Listen for theme changes
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

  const ProjectCard = ({ project }) => {
    return (
      <div className="group relative w-full h-96 perspective-1000">
        <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-12 group-hover:scale-105">
          {/* Card Front */}
          <div className={`absolute inset-0 w-full h-full rounded-lg shadow-lg border-2 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-black border-white/20 shadow-white/10' 
              : 'bg-white border-black/20 shadow-black/20'
          } backface-hidden`}>
            
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className={`w-12 h-12 rounded ${
                  isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                } flex items-center justify-center font-bold text-xl`}>
                  {project.name.charAt(0)}
                </div>
              </div>
              <h3 className={`text-xl font-bold text-center ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                {project.name}
              </h3>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className={`text-sm mb-4 leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technology.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-xs rounded-full border ${
                      isDarkMode 
                        ? 'bg-black border-white/30 text-white' 
                        : 'bg-white border-black/30 text-black'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedProject(project)}
                className={`w-full py-2 px-4 rounded-lg border-2 transition-all duration-300 font-medium ${
                  isDarkMode
                    ? 'border-white text-white hover:bg-white hover:text-black'
                    : 'border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                View More
              </button>
            </div>
          </div>

          {/* Card Back - Homepage Image */}
          <div className={`absolute inset-0 w-full h-full rounded-lg shadow-lg border-2 rotate-y-180 ${
            isDarkMode 
              ? 'bg-black border-white/20' 
              : 'bg-white border-black/20'
          } backface-hidden overflow-hidden`}>
            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <div className={`text-center p-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                  <Eye size={48} className="opacity-50" />
                </div>
                <h4 className="font-bold mb-2">{project.name}</h4>
                <p className="text-sm opacity-75">Homepage Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg border-2 ${
          isDarkMode 
            ? 'bg-black border-white/20' 
            : 'bg-white border-black/20'
        }`}>
          {/* Modal Header */}
          <div className={`flex items-center justify-between p-6 border-b ${
            isDarkMode ? 'border-white/20' : 'border-black/20'
          }`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className={`w-10 h-10 rounded ${
                  isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                } flex items-center justify-center font-bold`}>
                  {project.name.charAt(0)}
                </div>
              </div>
              <h2 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                {project.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg border transition-colors ${
                isDarkMode
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-black/30 text-black hover:bg-black/10'
              }`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {/* Homepage Image */}
            <div className="mb-6">
              <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className={`text-center ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>
                  <Eye size={48} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-75">Project Homepage</p>
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technology.map((tech, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm rounded-full border ${
                      isDarkMode 
                        ? 'bg-black border-white/30 text-white' 
                        : 'bg-white border-black/30 text-black'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                Description
              </h3>
              <p className={`leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.longDescription}
              </p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                Key Features
              </h3>
              <div className="grid md:grid-cols-2 gap-2">
                {project.features.map((feature, index) => (
                  <div key={index} className={`flex items-center gap-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                  isDarkMode
                    ? 'border-white text-white hover:bg-white hover:text-black'
                    : 'border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href={project.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                  isDarkMode
                    ? 'border-white text-white hover:bg-white hover:text-black'
                    : 'border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                <ExternalLink size={16} />
                Drive
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-black' : 'bg-white'
    }`}>
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
            Projects
          </h1>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Custom CSS for 3D effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-12 {
          transform: rotateY(12deg) scale(1.05);
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProjectsShowcase;