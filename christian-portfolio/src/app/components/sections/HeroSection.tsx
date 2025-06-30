"use client";

import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="section-container">
      <div className="text-center max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 name-animation">
            Christian Angelo N. Juan
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Front-end Developer & Software Engineer
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { id: "about", label: "What I Do" },
              { id: "experience", label: "Experience" },
              { id: "projects", label: "Projects" },
              { id: "contact", label: "Contact" },
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 
                          text-white py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105
                          ${
                            isVisible
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-10"
                          }`}
                style={{ transitionDelay: `${index * 100 + 500}ms` }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
