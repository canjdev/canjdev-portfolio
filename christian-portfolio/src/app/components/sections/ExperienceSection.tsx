"use client";

import { useEffect, useState } from "react";
import { experienceData } from "@/lib/data";

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

  return (
    <section id="experience" className="section-container">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            My Experience
          </h2>

          <div className="relative">
            {/* Single Glowing Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
              <div
                className="w-full bg-gradient-to-b from-cyan-400 to-blue-500 timeline-line-glow transition-all duration-700 ease-out rounded-full"
                style={{
                  height: `${scrollProgress * 100}%`,
                  boxShadow: `
                    0 0 10px #06b6d4,
                    0 0 20px #06b6d4,
                    0 0 30px #06b6d4,
                    0 0 40px #06b6d4
                  `,
                }}
              ></div>
            </div>

            <div className="space-y-20 relative z-10">
              {experienceData.map((item, index) => (
                <div
                  key={index}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                    isVisible ? "timeline-item" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Timeline Dot */}
                  <div
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full z-20"
                    style={{
                      boxShadow: `
                        0 0 10px #06b6d4,
                        0 0 20px #06b6d4,
                        inset 0 0 5px rgba(255, 255, 255, 0.3)
                      `,
                    }}
                  ></div>

                  {/* Job Title Side */}
                  <div
                    className={`${
                      index % 2 === 0
                        ? "md:text-right md:pr-12"
                        : "md:order-2 md:text-left md:pl-12"
                    } text-center md:text-inherit`}
                  >
                    <div className="sleek-frame rounded-xl p-6 hover:scale-105 transition-all duration-300 group">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h3>
                      <div className="text-cyan-400 font-medium mb-2">
                        {item.company}
                      </div>
                      <div className="text-gray-400 text-sm">{item.period}</div>
                    </div>
                  </div>

                  {/* Details Side */}
                  <div
                    className={`${
                      index % 2 === 0
                        ? "md:text-left md:pl-12"
                        : "md:order-1 md:text-right md:pr-12"
                    } text-center md:text-inherit`}
                  >
                    <div className="sleek-frame rounded-xl p-6 hover:scale-105 transition-all duration-300 group">
                      <ul className="text-gray-300 text-sm space-y-3">
                        {item.description.map((desc, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-cyan-400 mr-2 flex-shrink-0 mt-1">
                              •
                            </span>
                            <span className="group-hover:text-gray-200 transition-colors">
                              {desc}
                            </span>
                          </li>
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
