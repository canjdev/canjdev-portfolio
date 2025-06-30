"use client";

import { useEffect, useState } from "react";
import { experienceData } from "../../../lib/data";

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("experience");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("experience");
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight && elementTop + elementHeight > 0) {
          const progress = Math.max(
            0,
            Math.min(
              1,
              (windowHeight - elementTop) / (windowHeight + elementHeight)
            )
          );
          setScrollProgress(progress);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate which dots should be visible based on scroll progress
  const getVisibleDots = () => {
    const totalDots = experienceData.length;
    const visibleCount = Math.floor(scrollProgress * totalDots);
    return visibleCount;
  };

  return (
    <section id="experience" className="section-container">
      <div className="max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            My Experience
          </h2>

          <div className="relative">
            {/* Background Timeline line (placeholder) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-800"></div>

            {/* Animated Glowing Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-700">
              <div
                className="w-full bg-blue-400 timeline-line-glow transition-all duration-500 ease-out"
                style={{ height: `${scrollProgress * 100}%` }}
              ></div>
            </div>

            {/* Timeline Dots */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              {experienceData.map((_, index) => {
                const dotPosition = ((index + 1) / experienceData.length) * 100;
                const isVisible = index < getVisibleDots();

                return (
                  <div
                    key={index}
                    className={`absolute w-3 h-3 rounded-full border-2 border-black transform -translate-x-1/2 transition-all duration-300 ${
                      isVisible
                        ? "bg-blue-400 timeline-dot-glow opacity-100 scale-100"
                        : "bg-gray-600 opacity-50 scale-75"
                    }`}
                    style={{
                      top: `${dotPosition}%`,
                      transitionDelay: `${index * 100}ms`,
                    }}
                  ></div>
                );
              })}
            </div>

            <div className="space-y-12 relative z-10">
              {experienceData.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  } ${isVisible ? "timeline-item" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Large Timeline dot for content */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full border-4 border-black z-20 timeline-dot-glow"></div>

                  {/* Content */}
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300">
                      <div className="text-blue-400 text-sm font-medium mb-1">
                        {item.period}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <div className="text-gray-400 text-sm mb-3">
                        {item.company}
                      </div>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {item.description.map((desc, i) => (
                          <li key={i}>• {desc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
