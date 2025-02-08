import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

interface ContactSectionProps {
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
  isSubmitting?: boolean;
}

const ContactSection = ({
  onSubmit = (data) => console.log("Form submitted:", data),
  isSubmitting = false,
}: ContactSectionProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/SakshamMamgain",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/saksham-mamgain-337abb2b2",
      label: "LinkedIn",
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://instagram.com/saksham.mamgain",
      label: "Instagram",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:sakshammamgain10@gmail.com",
      label: "Email",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Card className="p-6 bg-white dark:bg-gray-800">
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message here..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div className="text-gray-600 dark:text-gray-300">
              <h3 className="text-2xl font-semibold mb-4">Connect With Me</h3>
              <p className="mb-6">
                Feel free to reach out through any of these platforms. I'm
                always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={() => window.open(link.href, "_blank")}
                >
                  {link.icon}
                  {link.label}
                </Button>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Office Hours</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Monday - Friday
                <br />
                9:00 AM - 5:00 PM EST
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
