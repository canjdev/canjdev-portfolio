"use client";

import { useEffect, useState } from "react";
import { projectsData } from "@/lib/data";

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("projects");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section-container bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            My Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer ${
                  isVisible ? "slide-up" : ""
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Thumbnail */}
                <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-video">
                  <img
                    src={`/placeholder.svg?height=300&width=500&text=${project.title}`}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                      hoveredProject === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute inset-0 p-6 flex flex-col justify-center">
                      <div className="text-white text-sm font-medium mb-2">
                        {project.year}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {project.title}
                      </h3>
                      <ul className="text-gray-200 space-y-2 mb-6">
                        {project.description.slice(0, 2).map((desc, i) => (
                          <li key={i} className="text-sm">
                            • {desc}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-white/20 text-white text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Title (Always Visible) */}
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{project.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
