import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  name?: string;
  title?: string;
  imageUrl?: string;
  handleViewWork?: () => void;
}

const HeroSection = ({
  name = "Saksham Mamgain",
  title = "AI/ML Engineer",
  imageUrl = "https://media-hosting.imagekit.io//cc7fcde86eec46f5/WhatsApp%20Image%202025-02-08%20at%2009.09.34_1ccbefd4.jpg?Expires=1833595368&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ExWh8pU6M3kvzybgODYSMxA57dwBVNI6MCNehakTO3vqGcGfmR~DWvi0iaTG7-6eZv26B2oGM2k--VX1QxtcjC6kHLxOZVtSnlkdaI0ez93yDQHHjZ4umPbIUtgooKw5bi~FsOKmyYwVtJwq~JeRHLGCbDQknUkSJt86ZZj2V75BJ1NhZCbwG0PySPPz89ziOlO7GxCeLJlH6bNUabb-AncMSCAtSvihFytIF5uDC8Upg6grjS1MPnlDtCoEF81Wju-eADXFYa47wJBfJ-T9li2YRzXTBkvF6CqmjAoV6u25SsU-5dhVRPjOdfxJni6wkG~umsH1~n~96GpvX-i4Iw__",
  handleViewWork,
}: HeroSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative w-48 h-48 mx-auto mb-8">
            {/* Black and white gradient background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-black to-white opacity-10 transform scale-110" />
            <motion.img
              src={imageUrl}
              alt={name}
              className="relative z-10 rounded-full shadow-2xl border-4 border-white dark:border-gray-700 object-cover w-48 h-48"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4"
        >
          {name}
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8"
        >
          {title}
        </motion.h2>

        <motion.div variants={itemVariants}>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8"
            onClick={handleViewWork}
          >
            View My Work
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowDown className="h-6 w-6 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
