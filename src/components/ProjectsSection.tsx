import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { AddProjectDialog } from "./AddProjectDialog";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  demo_url: string;
  github_url: string;
}

const ProjectsSection = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = async (
    repoUrl: string,
    description: string,
    demoUrl: string,
  ) => {
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return;

    const [, username, repo] = match;

    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        },
      );
      const data = await response.json();

      const newProject = {
        title: data.name,
        description: description,
        image_url:
          "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&auto=format&fit=crop&q=60",
        tech_stack: [data.language || "Unknown"],
        demo_url: demoUrl || data.homepage || "",
        github_url: repoUrl,
      };

      const { error } = await supabase.from("projects").insert([newProject]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project added successfully",
      });

      fetchProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });

      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      className="py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-900"
      id="projects"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        {user?.email === "sakshammamgain10@gmail.com" && (
          <div className="text-center mb-8">
            <AddProjectDialog onAddProject={handleAddProject} />
          </div>
        )}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore some of my recent work and personal projects that showcase
            my skills and passion for development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard
                {...project}
                onDelete={() => handleDeleteProject(project.id)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
