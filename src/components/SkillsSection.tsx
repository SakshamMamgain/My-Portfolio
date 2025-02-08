import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Skill {
  name: string;
  proficiency: number;
  category: string;
}

interface SkillsSectionProps {
  skills?: Skill[];
  categories?: string[];
}

const SkillsSection = ({
  skills = [
    { name: "React", proficiency: 85, category: "Frontend" },
    { name: "JavaScript", proficiency: 90, category: "Frontend" },
    { name: "HTML/CSS", proficiency: 90, category: "Frontend" },
    { name: "TypeScript", proficiency: 80, category: "Frontend" },
    { name: "Node.js", proficiency: 75, category: "Backend" },
    { name: "Express.js", proficiency: 75, category: "Backend" },
    { name: "MongoDB", proficiency: 70, category: "Backend" },
    { name: "Git", proficiency: 85, category: "DevOps" },
    { name: "Docker", proficiency: 65, category: "DevOps" },
  ],
  categories = ["All", "Frontend", "Backend", "DevOps"],
}: SkillsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills = skills.filter((skill) =>
    selectedCategory === "All" ? true : skill.category === selectedCategory,
  );

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Technical Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency
            levels across different technologies and tools.
          </p>
        </motion.div>

        <Tabs defaultValue="All" className="w-full">
          <TabsList className="flex justify-center mb-8 flex-wrap gap-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setSelectedCategory(category)}
                className="px-4 py-2"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg">
                            {skill.name}
                          </span>
                          <Badge variant="secondary">{skill.category}</Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <Progress value={skill.proficiency} className="h-2" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default SkillsSection;
