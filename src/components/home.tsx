import React, { useState } from "react";
import AnimatedBackground from "./AnimatedBackground";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import { motion } from "framer-motion";

const Home = () => {
  const [canScroll, setCanScroll] = useState(false);

  const handleViewWork = () => {
    setCanScroll(true);
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm h-screen ${canScroll ? "overflow-y-scroll" : "overflow-hidden"}`}
    >
      <AnimatedBackground />
      <Navigation />

      <main className="pt-20">
        <section id="hero" className="snap-start h-screen">
          <HeroSection
            handleViewWork={handleViewWork}
            name="Saksham Mamgain"
            title="Full Stack Developer"
          />
        </section>

        <section id="projects" className="snap-start min-h-screen">
          <ProjectsSection />
        </section>

        <section id="skills" className="snap-start min-h-screen">
          <SkillsSection />
        </section>

        <section id="contact" className="snap-start min-h-screen">
          <ContactSection />
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8 text-center text-gray-600 dark:text-gray-300">
        <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
      </footer>
    </motion.div>
  );
};

export default Home;
