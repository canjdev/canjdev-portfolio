"use client";

import { useEffect, useState } from "react";
import { experienceData } from "@/lib/data";

// Define proper types for the data
interface BaseItem {
  title: string;
  period: string;
  description?: string[];
}

interface WorkExperience extends BaseItem {
  company: string;
  type: "experience";
}

interface EducationItem extends BaseItem {
  institution: string;
  type: "education";
}

interface CertificationItem extends BaseItem {
  institution: string;
  type: "certification";
}

type ExperienceItem = WorkExperience | EducationItem | CertificationItem;

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

  // Separate work experience from education and certifications
  const workExperience: WorkExperience[] = experienceData
    .filter(
      (item) => item.company === "LegionTech Inc." || item.company === "Fify410"
    )
    .map((item) => ({
      ...item,
      type: "experience" as const,
    }));

  const educationData: (EducationItem | CertificationItem)[] = [
    {
      title: "Bachelor of Science in Information Technology",
      institution: "STI College Calamba",
      period: "2020-Present",
      type: "education" as const,
      description: [
        "Currently pursuing BSIT degree with focus on software development",
        "Gained comprehensive knowledge in programming, database management, and system analysis",
      ],
    },
    {
      title: "ISO/IEC 27001:2022 Information Security Associate™",
      institution: "SkillFront",
      period: "2025",
      type: "certification" as const,
    },
    {
      title: "SAP Business One (Advanced)",
      institution: "Implementation and Support",
      period: "2023",
      type: "certification" as const,
      description: [
        "Advanced certification in SAP Business One implementation",
        "Expertise in business process optimization and system support",
      ],
    },
    {
      title: "SAP Business One (Basic)",
      institution: "Financials and Logistics",
      period: "2022",
      type: "certification" as const,
      description: [
        "Foundation certification in SAP Business One",
        "Knowledge in financial and logistics modules",
      ],
    },
  ];

  const allItems: ExperienceItem[] = [...workExperience, ...educationData];

  // Helper function to get the organization name
  const getOrganizationName = (item: ExperienceItem): string => {
    if (item.type === "experience") {
      return item.company;
    } else {
      return item.institution;
    }
  };

  return (
    <section id="experience" className="section-container">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            My Experience and Credentials
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
              {allItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                    isVisible ? "timeline-item" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Title Side */}
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
                        {getOrganizationName(item)}
                      </div>
                      <div className="text-gray-400 text-sm">{item.period}</div>
                      {item.type && (
                        <div className="mt-2">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              item.type === "education"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : item.type === "certification"
                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            }`}
                          >
                            {item.type === "education"
                              ? "Education"
                              : item.type === "certification"
                              ? "Certification"
                              : "Work Experience"}
                          </span>
                        </div>
                      )}
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
                      {item.description ? (
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
                      ) : (
                        <div className="text-gray-300 text-sm">
                          <p className="group-hover:text-gray-200 transition-colors">
                            {item.type === "education"
                              ? "Pursuing a comprehensive degree in Information Technology, focusing on software development, systems analysis, and emerging technologies."
                              : item.type === "certification"
                              ? "Professional certification demonstrating expertise and commitment to industry standards."
                              : "Professional experience in the field."}
                          </p>
                        </div>
                      )}
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
