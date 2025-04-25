import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AddSkillDialog } from "./AddSkillDialog";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  proficiency: number;
  category: string;
}

const categories = ["All", "Frontend", "Backend", "DevOps", "Other"];

const SkillsSection = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("category", { ascending: true });

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load skills",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSkill = async (
    name: string,
    proficiency: number,
    category: string,
  ) => {
    try {
      const { error } = await supabase
        .from("skills")
        .insert([{ name, proficiency, category }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Skill added successfully",
      });

      fetchSkills();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      const { error } = await supabase.from("skills").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Skill deleted successfully",
      });

      setSkills(skills.filter((skill) => skill.id !== id));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
    }
  };

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

        {user?.email === "sakshammamgain10@gmail.com" && (
          <div className="text-center mb-8">
            <AddSkillDialog onAddSkill={handleAddSkill} />
          </div>
        )}

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
                  key={skill.id}
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
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">
                            {skill.proficiency}%
                          </span>
                          {user?.email === "sakshammamgain10@gmail.com" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSkill(skill.id)}
                            >
                              <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                            </Button>
                          )}
                        </div>
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
