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

          <div className="grid md:grid-cols-2 gap-16 items-stretch">
            <div className="space-y-8">
              {/* DEVELOP Section */}
              <div
                className={`sleek-frame rounded-2xl p-8 ${
                  isVisible ? "slide-in-left" : ""
                }`}
                style={{ animationDelay: "200ms" }}
              >
                <h3 className="text-2xl font-bold mb-4 tracking-wider text-blue-400">
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
                               hover:bg-gray-700 hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CREATE Section */}
              <div
                className={`sleek-frame rounded-2xl p-8 ${
                  isVisible ? "slide-in-left" : ""
                }`}
                style={{ animationDelay: "400ms" }}
              >
                <h3 className="text-2xl font-bold mb-4 tracking-wider text-blue-400">
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
                               hover:bg-gray-700 hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-stretch">
              <div
                className={`image-container rounded-2xl overflow-hidden w-full ${
                  isVisible ? "slide-in-right" : "opacity-0"
                }`}
                style={{ animationDelay: "600ms" }}
              >
                <img
                  src="/canj_pic.svg"
                  alt="Christian Angelo N. Juan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
