import Navigation from "../app/components/common/Navigation";
import HeroSection from "../app/components/sections/HeroSection";
import AboutSection from "../app/components/sections/AboutSection";
import ExperienceSection from "../app/components/sections/ExperienceSection";
import ProjectsSection from "../app/components/sections/ProjectsSection";
import ContactSection from "../app/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="scroll-smooth">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
