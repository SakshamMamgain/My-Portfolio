import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { AuthDialog } from "./auth/AuthDialog";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

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
  const { user, signOut } = useAuth();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
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

      {/* Desktop Navigation */}
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

      <div className="flex items-center gap-4">
        {user ? (
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => setIsAuthDialogOpen(true)}
            className="bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border-gray-300 hover:border-gray-400"
          >
            Sign In
          </Button>
        )}

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  className="w-full justify-start text-lg"
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.label}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
      />
    </motion.nav>
  );
};

export default Navigation;
