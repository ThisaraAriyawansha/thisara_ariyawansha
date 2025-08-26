// app/components/ProjectsShowcase.jsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { X, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectsShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const modalRef = useRef(null);
  const imagePopupRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    fetch('/data/projects.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        return response.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));

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

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedScreenshot && imagePopupRef.current && !imagePopupRef.current.contains(event.target)) {
        setSelectedScreenshot(null);
      } else if (selectedProject && modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedProject(null);
      }
    };

    if (selectedProject || selectedScreenshot) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, selectedScreenshot]);

  const nextScreenshot = () => {
    if (selectedProject.screenshots) {
      setCurrentScreenshotIndex((prevIndex) =>
        (prevIndex + 1) % selectedProject.screenshots.length
      );
    }
  };

  const prevScreenshot = () => {
    if (selectedProject.screenshots) {
      setCurrentScreenshotIndex((prevIndex) =>
        prevIndex === 0 ? selectedProject.screenshots.length - 1 : prevIndex - 1
      );
    }
  };

  const nextProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      (prevIndex + 1) % projects.length
    );
  };

  const prevProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextProject();
    } else if (touchEnd - touchStart > 50) {
      prevProject();
    }
  };

  const ProjectCard = ({ project }) => {
    return (
      <div
        className="cursor-pointer group"
        onClick={() => {
          setSelectedProject(project);
          setCurrentScreenshotIndex(0);
        }}
      >
        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-500 ease-out ${
            isDarkMode
              ? 'bg-black hover:bg-black border border-gray-600'
              : 'bg-white hover:bg-gray-100 border border-gray-200/50 shadow-sm hover:shadow-lg'
          }`}
          style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
        >
          <div className="relative w-full h-48 overflow-hidden">
            <div className="absolute inset-0 z-10 transition-opacity duration-500 ease-out opacity-0 bg-gradient-to-t from-black/30 to-transparent group-hover:opacity-100"></div>
            <div className="absolute inset-0 flex items-center justify-center transition-all ease-out duration-600 group-hover:opacity-0 group-hover:scale-105">
              <img
                src={isDarkMode ? (project.logoDark || project.logo) : (project.logoLight || project.logo)}
                alt={`${project.name} logo`}
                className="object-contain w-3/4 transition-all ease-out h-3/4 duration-600"
              />
            </div>
            <div className="absolute inset-0 transition-opacity ease-out opacity-0 duration-600 group-hover:opacity-100">
              <img
                src={project.homepage}
                alt={`${project.name} homepage`}
                className="object-cover w-full h-full transition-transform ease-out duration-600 group-hover:scale-102"
              />
            </div>
          </div>
          <div className="flex flex-col p-6">
            <div className="flex-grow">
              <h3
                className={`text-xl font-semibold mb-2.5 transition-colors duration-300 ease-out ${
                  isDarkMode ? 'text-white group-hover:text-gray-300' : 'text-gray-900 group-hover:text-gray-600'
                }`}
              >
                {project.name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technology.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-300 ease-out ${
                      isDarkMode
                        ? 'bg-gray-800 text-gray-300 border border-gray-700/50 group-hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 border border-gray-200/50 group-hover:bg-gray-200'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
                {project.technology.length > 3 && (
                  <span
                    className={`px-2.5 py-1 text-xs rounded-full ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    +{project.technology.length - 3}
                  </span>
                )}
              </div>
            </div>
            <div
              className={`flex items-center text-sm font-medium transition-colors duration-300 ease-out ${
                isDarkMode ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-700 group-hover:text-gray-900'
              }`}
            >
              View Details
              <svg
                className="w-4 h-4 ml-1.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ImagePopup = ({ src, alt, onClose }) => {
    if (!src) return null;

    const handleCloseClick = (e) => {
      console.log('Close button clicked'); // Add this line
      e.stopPropagation();
      onClose();
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center p-4 z-60 sm:p-8 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div
          ref={imagePopupRef}
          className={`relative max-w-full max-h-[90vh] rounded-2xl overflow-hidden ${
            isDarkMode ? 'border border-gray-800/50' : 'border border-gray-200/50'
          }`}
        >
          <img
            src={src}
            alt={alt}
            className="object-contain w-full h-full"
            style={{ maxHeight: '90vh', maxWidth: '90vw' }}
          />
          <button
            onClick={handleCloseClick}
            className={`absolute top-4 right-4 z-10 p-1 rounded-full shadow-xl hidden  ${
              isDarkMode
                ? 'bg-zinc-800/95 text-zinc-100 hover:bg-zinc-700 hover:text-white'
                : 'bg-gray-100/95 text-gray-800 hover:bg-gray-200 hover:text-gray-900'
            }`}
            aria-label="Close image popup"
            style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>
      </div>
    );
  };

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div
          ref={modalRef}
          className={`max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl transform animate-scale-in flex flex-col ${
            isDarkMode
              ? 'bg-black border border-zinc-800'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div
            className={`flex items-center justify-between p-6 border-b flex-shrink-0 ${
              isDarkMode ? 'border-zinc-800' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={isDarkMode ? (project.logoDark || project.logo) : (project.logoLight || project.logo)}
                alt={`${project.name} logo`}
                className="object-contain w-12 h-12 p-2 rounded-xl bg-opacity-20"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                }}
              />
              <div>
                <h2
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {project.name}
                </h2>
                <p
                  className={`text-sm mt-1 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}
                >
                  {project.shortDescription}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDarkMode
                  ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
              } ${selectedScreenshot ? 'hidden' : ''}`}
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            <div className="p-6 space-y-8">
              <div>
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Preview
                </h3>
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={project.homepage}
                    alt={`${project.name} homepage`}
                    className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/20 to-transparent hover:opacity-100"></div>
                </div>
              </div>
              {project.screenshots && project.screenshots.length > 0 && (
                <div>
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Screenshots
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {project.screenshots.map((screenshot, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-lg cursor-pointer"
                        onClick={() => setSelectedScreenshot(screenshot)}
                      >
                        <img
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          className="object-cover w-full h-40 transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {project.video && (
                <div className="mt-6">
                  <h3
                    className={`text-lg font-semibold mb-3 transition-colors duration-300 ease-out ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                    style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                  >
                    Demo
                  </h3>
                  <div
                    className={`relative overflow-hidden rounded-2xl border ${
                      isDarkMode ? 'border-gray-800/50 bg-black' : 'border-gray-200/50 bg-white'
                    }`}
                  >
                    <video
                      controls
                      className="object-contain w-full h-auto max-h-80"
                      poster={project.poster || project.homepage}
                      preload="metadata"
                    >
                      <source src={project.video} type="video/mp4" />
                      <source src={project.video} type="video/webm" />
                      <p
                        className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        Your browser does not support the video tag. Please download the video{' '}
                        <a
                          href={project.video}
                          className={`underline ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                        >
                          here
                        </a>.
                      </p>
                    </video>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technology.map((tech, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-300 hover:scale-105 ${
                          isDarkMode
                            ? 'bg-zinc-900 text-zinc-200 border-zinc-700 hover:bg-zinc-800'
                            : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Features
                  </h3>
                  <div className="space-y-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 group">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-300 group-hover:scale-150 ${
                            isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
                          }`}
                        ></div>
                        <span
                          className={`text-sm ${
                            isDarkMode ? 'text-zinc-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                          } transition-colors duration-300`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  About
                </h3>
                <p
                  className={`text-base leading-relaxed ${
                    isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                  }`}
                >
                  {project.longDescription}
                </p>
              </div>
              <div className="flex gap-4 pt-4 pb-6">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-white text-black hover:bg-gray-100 border border-gray-300'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  <Github size={18} />
                  GitHub
                </a>
                <a
                  href={project.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? 'border-zinc-700 text-zinc-200 hover:bg-zinc-900 hover:border-zinc-600'
                      : 'border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode ? 'bg-black' : 'bg-gray-50'
      }`}
    >
      <div className="px-6 py-16 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1
            className={`text-4xl font-bold mb-3 transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
            style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          >
            Projects
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-600'
            }`}
          >
            A curated collection of my work, featuring innovative solutions and cutting-edge technologies.
          </p>
        </div>
        {isMobile ? (
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <div key={project.id} className="flex-shrink-0 w-full px-2">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            <button
              onClick={prevProject}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
                isDarkMode
                  ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextProject}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
                isDarkMode
                  ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronRight size={24} />
            </button>
            <div className="flex justify-center mt-4 space-x-2">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentProjectIndex
                      ? isDarkMode
                        ? 'bg-white scale-125'
                        : 'bg-gray-900 scale-125'
                      : isDarkMode
                      ? 'bg-zinc-600'
                      : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      {selectedScreenshot && (
        <ImagePopup
          src={selectedScreenshot}
          alt="Enlarged screenshot"
          onClose={() => setSelectedScreenshot(null)}
        />
      )}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectsShowcase;