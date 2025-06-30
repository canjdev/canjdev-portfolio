"use client";

import { useEffect, useState } from "react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("about");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const developSkills = [
    "React",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "CSS",
    "HTML",
    "Python",
    "Git",
    "Docker",
    "API Integration",
  ];

  const createSkills = [
    "UI/UX Design",
    "Figma",
    "Responsive Design",
    "Component Architecture",
    "Database Design",
    "System Architecture",
    "Problem Solving",
  ];

  return (
    <section id="about" className="section-container bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            What I do
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              {/* DEVELOP Section */}
              <div
                className={`${isVisible ? "slide-up" : ""}`}
                style={{ animationDelay: "200ms" }}
              >
                <h3 className="text-2xl font-bold mb-4 tracking-wider">
                  DEVELOP
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  I create modern, responsive web applications using
                  cutting-edge technologies. From concept to deployment, I build
                  scalable solutions that deliver exceptional user experiences
                  and robust functionality across all platforms.
                </p>
                <div className="flex flex-wrap gap-2">
                  {developSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700 
                               hover:bg-gray-700 hover:border-gray-600 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CREATE Section */}
              <div
                className={`${isVisible ? "slide-up" : ""}`}
                style={{ animationDelay: "400ms" }}
              >
                <h3 className="text-2xl font-bold mb-4 tracking-wider">
                  CREATE
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  I design and architect comprehensive digital solutions that
                  solve real-world problems. My approach combines technical
                  expertise with creative thinking to build innovative
                  applications that make a meaningful impact.
                </p>
                <div className="flex flex-wrap gap-2">
                  {createSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700 
                               hover:bg-gray-700 hover:border-gray-600 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className={`relative ${isVisible ? "fade-in" : "opacity-0"}`}
                style={{ animationDelay: "600ms" }}
              >
                <div className="w-80 h-96 bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=320"
                    alt="Christian Angelo N. Juan"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
