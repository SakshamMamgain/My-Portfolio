import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const y1 = useTransform(scrollY, [0, windowHeight], [0, windowHeight * 0.5]);
  const y2 = useTransform(scrollY, [0, windowHeight], [0, windowHeight * 0.3]);
  const y3 = useTransform(scrollY, [0, windowHeight], [0, windowHeight * 0.7]);

  return (
    <div className="fixed inset-0 -z-1">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" />

      {/* Animated elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-[10%] w-96 h-96 rounded-full bg-blue-200/20"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-40 right-[15%] w-64 h-64 rounded-full bg-purple-200/20"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute top-60 left-[30%] w-80 h-80 rounded-full bg-pink-200/20"
      />
    </div>
  );
};

export default ParallaxBackground;
