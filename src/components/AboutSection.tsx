import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "./ui/use-toast";
import { Edit2, Save } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const AboutSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const [tempContent, setTempContent] = useState("");
  const [showEditButton, setShowEditButton] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from("about_content")
        .select("content")
        .eq("id", 1)
        .single();

      if (error) throw error;
      if (data) {
        setContent(data.content);
        setTempContent(data.content);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleSave = async () => {
    if (isSaving) return;

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from("about_content")
        .upsert({ id: 1, content: tempContent })
        .select();

      if (error) throw error;

      setContent(tempContent);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Content saved successfully",
      });
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTempContent(content);
    setIsEditing(false);
  };

  const isAdmin = user?.email === "sakshammamgain10@gmail.com";

  return (
    <section
      className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      id="about"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            About Me
          </motion.h2>
        </div>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            {isEditing ? (
              <div className="space-y-4">
                <Textarea
                  value={tempContent}
                  onChange={(e) => setTempContent(e.target.value)}
                  className="min-h-[200px] text-lg leading-relaxed p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200 dark:border-gray-700"
                  placeholder="Write something about yourself..."
                />
                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 text-white dark:text-gray-900 hover:opacity-90"
                  >
                    {isSaving ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="relative group min-h-[200px]"
                onMouseEnter={() => isAdmin && setShowEditButton(true)}
                onMouseLeave={() => isAdmin && setShowEditButton(false)}
              >
                <div className="prose dark:prose-invert max-w-none text-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap p-4 rounded-lg transition-colors duration-200 select-none">
                  {content || "No content yet."}
                </div>
                {isAdmin && showEditButton && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default AboutSection;
