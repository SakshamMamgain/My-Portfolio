import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, Globe, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  demo_url?: string;
  github_url: string;
  onDelete: (id: string) => void;
}

const ProjectCard = ({
  id,
  title = "Project Title",
  description = "Project Description",
  image_url = "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&auto=format&fit=crop&q=60",
  tech_stack = [],
  demo_url = "",
  github_url = "https://github.com",
  onDelete,
}: ProjectCardProps) => {
  const { user } = useAuth();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="w-full bg-white dark:bg-gray-800"
    >
      <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-700">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={image_url}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-bold mb-2">{title}</CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            {tech_stack?.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2">
          {demo_url && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => window.open(demo_url, "_blank")}
            >
              <Globe className="h-4 w-4" />
              Live Demo
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => window.open(github_url, "_blank")}
          >
            <Github className="h-4 w-4" />
            GitHub
          </Button>
          {user?.email === "sakshammamgain10@gmail.com" && (
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-2 ml-auto"
              onClick={() => onDelete(id)}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
