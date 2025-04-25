import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import { motion } from "framer-motion";

const Home = () => {
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    document.body.style.overflow = canScroll ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [canScroll]);

  const handleViewWork = () => {
    setCanScroll(true);
    setTimeout(() => {
      const aboutSection = document.getElementById("about");
      aboutSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative z-10">
        <Navigation />

        <main>
          <section id="hero" className="min-h-screen">
            <HeroSection
              handleViewWork={handleViewWork}
              name="Saksham Mamgain"
              title="AI/ML Engineer"
            />
          </section>

          <section id="about" className="min-h-screen">
            <AboutSection />
          </section>

          <section id="projects" className="min-h-screen">
            <ProjectsSection />
          </section>

          <section id="skills" className="min-h-screen">
            <SkillsSection />
          </section>

          <section id="contact" className="min-h-screen">
            <ContactSection />
          </section>
        </main>

        <footer className="bg-gray-100/80 dark:bg-gray-800/80 py-8 text-center text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
