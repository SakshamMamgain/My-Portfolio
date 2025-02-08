import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface NavigationProps {
  sections?: Array<{
    id: string;
    label: string;
  }>;
}

const Navigation = ({
  sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ],
}: NavigationProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-20 flex items-center justify-between px-6 md:px-12"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer"
        onClick={() => scrollToSection("hero")}
      >
        Saksham Mamgain
      </motion.div>

      <div className="hidden md:flex items-center space-x-1">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant="ghost"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={() => scrollToSection(section.id)}
          >
            {section.label}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        className="md:hidden"
        onClick={() => {
          // Mobile menu functionality would go here
          console.log("Mobile menu clicked");
        }}
      >
        Menu
      </Button>
    </motion.nav>
  );
};

export default Navigation;
