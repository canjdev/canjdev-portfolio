"use client";

import { useEffect, useState } from "react";
import TiltedCard from "../../utils/TitledCard";
import SpotlightCard from "../../utils/SpotlightCard";
import CircularGallery from "../../utils/CircularGallery";

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

  // Define the gallery items with your SVG icons
  const galleryItems = [
    { image: "/react-icon.svg", text: "React" },
    { image: "/javascript-icon.svg", text: "JavaScript" },
    { image: "/typescript-icon.svg", text: "TypeScript" },
    { image: "/nextjs-icon.svg", text: "Next.js" },
    { image: "/css-icon.svg", text: "CSS" },
    { image: "/html-icon.svg", text: "HTML" },
    { image: "/python-icon.svg", text: "Python" },
    { image: "/git-icon.svg", text: "Git" },
    { image: "/docker-icon.svg", text: "Docker" },
    { image: "/figma-icon.svg", text: "Figma" },
    { image: "/tailwind-icon.svg", text: "Tailwind CSS" },
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
                className={`${isVisible ? "slide-in-left" : ""}`}
                style={{ animationDelay: "200ms" }}
              >
                <SpotlightCard
                  className="bg-slate-900 border border-slate-700 rounded-xl p-8 hover:border-slate-600 hover:bg-slate-800 h-full"
                  spotlightColor="rgba(59, 130, 246, 0.15)"
                >
                  <h3 className="text-2xl font-bold mb-4 tracking-wider text-blue-400">
                    DEVELOP
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    I create modern, responsive web applications using
                    cutting-edge technologies. From concept to deployment, I
                    build scalable solutions that deliver exceptional user
                    experiences and robust functionality across all platforms.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {developSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full border border-slate-600 
                                 hover:bg-slate-700 hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </div>

              {/* CREATE Section */}
              <div
                className={`${isVisible ? "slide-in-left" : ""}`}
                style={{ animationDelay: "400ms" }}
              >
                <SpotlightCard
                  className="bg-slate-900 border border-slate-700 rounded-xl p-8 hover:border-slate-600 hover:bg-slate-800 h-full"
                  spotlightColor="rgba(6, 182, 212, 0.15)"
                >
                  <h3 className="text-2xl font-bold mb-4 tracking-wider text-blue-400">
                    CREATE
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    I design and architect comprehensive digital solutions that
                    solve real-world problems. My approach combines technical
                    expertise with creative thinking to build innovative
                    applications that make a meaningful impact.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {createSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full border border-slate-600 
                                 hover:bg-slate-700 hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </div>
            </div>

            <div className="flex items-stretch">
              <div
                className={`rounded-2xl overflow-hidden w-full h-full ${
                  isVisible ? "slide-in-right" : "opacity-0"
                }`}
                style={{ animationDelay: "600ms" }}
              >
                <TiltedCard
                  imageSrc="/canj_pic.svg"
                  altText="Christian Angelo N. Juan"
                  captionText="Christian Angelo N. Juan - Full Stack Developer"
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={15}
                  scaleOnHover={1.08}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={false}
                />
              </div>
            </div>
          </div>

          {/* Technology Gallery Section */}
          <div className="mt-24">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-100">
              Technologies
            </h3>
            <div
              className={`${isVisible ? "slide-in-up" : "opacity-0"}`}
              style={{ animationDelay: "800ms" }}
            >
              <div style={{ height: "600px", position: "relative" }}>
                <CircularGallery
                  items={galleryItems}
                  bend={1}
                  textColor="#ffffff"
                  borderRadius={0.05}
                  scrollEase={0.02}
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
