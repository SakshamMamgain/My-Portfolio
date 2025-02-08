import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { AddProjectDialog } from "./AddProjectDialog";

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  demoUrl: string;
  githubUrl: string;
}

interface ProjectsSectionProps {
  initialProjects?: Project[];
}

const ProjectsSection = ({ initialProjects = [] }: ProjectsSectionProps) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleAddProject = async (repoUrl: string) => {
    // Extract username and repo name from GitHub URL
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return;

    const [, username, repo] = match;

    try {
      // Fetch repository data from GitHub API
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        },
      );
      const data = await response.json();

      // Create new project
      const newProject: Project = {
        title: data.name,
        description: data.description || "No description available",
        imageUrl:
          "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&auto=format&fit=crop&q=60",
        techStack: [data.language || "Unknown"],
        demoUrl: data.homepage || repoUrl,
        githubUrl: repoUrl,
      };

      setProjects((prev) => [...prev, newProject]);
    } catch (error) {
      console.error("Error fetching repository data:", error);
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
        <div className="text-center mb-8">
          <AddProjectDialog onAddProject={handleAddProject} />
        </div>
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
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
