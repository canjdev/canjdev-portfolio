"use client";

import { useEffect, useState, useRef } from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import BlurText from "../../utils/BlurText";
import SplitText from "../../utils/SplitText";
import Threads from "../../utils/Threads";
import ShinyText from "../../utils/ShinyText";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showReadyToWork, setShowReadyToWork] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const downloadResume = () => {
    window.open("https://limewire.com/d/4xae4#GDBoGOBOvG", "_blank");
  };

  const handleNameAnimationComplete = () => {
    console.log("Name animation completed!");
    setTimeout(() => {
      setShowReadyToWork(true);
    }, 500);
  };

  const handleReadyToWorkComplete = () => {
    console.log("Ready to work animation completed!");
  };

  return (
    <section id="home" className="section-container relative overflow-hidden">
      {/* Custom CSS for green checkmark */}
      <style jsx>{`
        .ready-to-work-text .split-parent > *:last-child {
          color: #10b981 !important;
          font-weight: bold !important;
        }
      `}</style>

      {/* Threads Background */}
      <div className="absolute inset-0 w-full h-full">
        <Threads
          color={[1, 1, 1]}
          amplitude={2}
          distance={0}
          enableMouseInteraction={false}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative mb-6">
            {/* Ready to Work Status - Top Left */}
            <div className="absolute -top-8 left-0 md:-top-12 md:-left-8 z-20">
              <div
                className={`transition-opacity duration-300 ${
                  showReadyToWork ? "opacity-100" : "opacity-0"
                }`}
              >
                <SplitText
                  text="Ready to work ✓"
                  className="text-sm md:text-base font-semibold text-white ready-to-work-text"
                  delay={80}
                  duration={1.5}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, y: 30, scale: 0.8 }}
                  to={{ opacity: 1, y: 0, scale: 1 }}
                  threshold={0.1}
                  rootMargin="-50px"
                  textAlign="left"
                  startAnimation={showReadyToWork}
                  onLetterAnimationComplete={handleReadyToWorkComplete}
                />
              </div>
            </div>

            <BlurText
              text="Christian Angelo N. Juan"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleNameAnimationComplete}
              className="text-5xl md:text-7xl font-bold name-animation relative z-10"
            />
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
            Front-end Developer
          </p>

          {/* TrueFocus Navigation */}
          <div
            className={`relative z-10 mb-12 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <TrueFocusNavigation scrollToSection={scrollToSection} />
          </div>

          {/* Download Resume Button */}
          <div className="mb-8">
            <button
              onClick={downloadResume}
              className={`group relative inline-flex items-center gap-3 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 
                        border border-slate-600 hover:border-slate-500 font-medium py-4 px-8 rounded-xl 
                        transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25
                        backdrop-blur-sm relative z-10 overflow-hidden
                        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
                        before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]
                        ${
                          isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                        }`}
              style={{ transitionDelay: "500ms" }}
            >
              <Download className="w-5 h-5 text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300" />
              <ShinyText
                text="Download Resume"
                disabled={false}
                speed={3}
                className="text-base font-semibold text-white group-hover:text-cyan-100 transition-colors duration-300"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Custom TrueFocus component for navigation
const TrueFocusNavigation = ({
  scrollToSection,
}: {
  scrollToSection: (id: string) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const navigationItems = [
    { id: "about", label: "What I Do" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const words = navigationItems.map((item) => item.label);
  const animationDuration = 0.8;
  const pauseBetweenAnimations = 2;
  const blurAmount = 3;

  // Manual mode - no auto-cycling
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % words.length);
  //   }, (animationDuration + pauseBetweenAnimations) * 1000);

  //   return () => clearInterval(interval);
  // }, [words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleWordClick = (index: number) => {
    const sectionId = navigationItems[index].id;
    scrollToSection(sectionId);
  };

  const handleMouseEnter = (index: number) => {
    setLastActiveIndex(currentIndex);
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    // In manual mode, keep the last hovered item focused
    // Don't revert to previous state
  };

  return (
    <div
      className="relative flex gap-12 justify-center items-center flex-wrap"
      ref={containerRef}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            className="relative text-2xl md:text-3xl font-bold cursor-pointer text-white hover:text-cyan-400 transition-colors duration-300"
            style={{
              filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease`,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleWordClick(index)}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="absolute top-0 left-0 pointer-events-none box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
        }}
        style={
          {
            "--border-color": "#06b6d4", // cyan-500
            "--glow-color": "rgba(6, 182, 212, 0.6)",
          } as React.CSSProperties
        }
      >
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        ></span>
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        ></span>
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        ></span>
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        ></span>
      </motion.div>
    </div>
  );
};

export default HeroSection;
