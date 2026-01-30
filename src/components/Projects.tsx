'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X } from 'lucide-react';

const projects = [
    {
        title: "Flash Coach",
        description: "Real-time coaching using LLMs, speech recognition, sentiment analysis, and mentor escalation.",
        fullDescription: "Flash Coach is an advanced AI-powered coaching platform designed to provide real-time feedback. By leveraging LLaMA for intelligent responses and Whisper for accurate speech-to-text, it offers immediate sentiment analysis and coaching tips. Features include a mentor escalation system for complex queries and a comprehensive dashboard for progress tracking.",
        tags: ["Next.js", "FastAPI", "MongoDB", "LLaMA", "Whisper"],
        links: {
            github: "https://github.com/Sriram4232/Just-In-Time_Flash-Coach",
            live: "https://just-in-time-flash-coach.vercel.app/"
        }
    },
    {
        title: "LostNFound",
        description: "Full-stack lost & found system with secure auth, REST APIs, and MongoDB persistence.",
        fullDescription: "A robust campus-wide Lost & Found system that addresses the chaos of missing items. Built with a Node.js/Express backend and secure JWT authentication, it ensures only verified users can post. Users can upload images, claim items through a secure verification process, and search efficiently with filters.",
        tags: ["Node.js", "Express", "MongoDB", "JWT"],
        links: {
            github: "https://github.com/A-Charan156/ReClaim",
            live: "https://a-charan156.github.io/ReClaim/"
        }
    },
    {
        title: "CareMate",
        description: "AI healthcare chatbot for nutrition, symptom analysis, and mental health support.",
        fullDescription: "CareMate serves as a 24/7 personal health assistant. Powered by the Gemini API, it provides personalized nutrition plans based on BMI and goals, analyzes symptoms to suggest potential conditions, and offers empathetic chat support for mental well-being. It features a clean Streamlit interface for easy accessibility.",
        tags: ["Python", "Gemini API", "NLP", "Streamlit"],
        links: {
            github: "https://github.com/Sriram4232/CareMate-HealthBot-",
            live: "https://caremate-healthbot.streamlit.app/"
        }
    }
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    return (
        <section id="projects" className="w-full py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#38bdf8]">Selected Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        onClick={() => setSelectedProject(project)}
                        className="glass-card rounded-2xl p-6 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
                    >
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-[#38bdf8] transition-colors">{project.title}</h3>
                        <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag, i) => (
                                <span key={i} className="text-xs px-2 py-1 rounded bg-[#38bdf8]/10 text-[#38bdf8]">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4 mt-auto">
                            <button className="text-sm text-[#34d399] font-medium hover:underline">
                                View Details &rarr;
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0f172a] border border-[#1e293b] p-8 rounded-3xl max-w-2xl w-full relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X size={24} className="text-gray-400 hover:text-white" />
                            </button>

                            <h3 className="text-3xl font-bold mb-4 text-[#38bdf8]">{selectedProject.title}</h3>

                            <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                                {selectedProject.fullDescription}
                            </p>

                            <div className="mb-8">
                                <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-3">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 text-sm rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/10 text-[#38bdf8]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-[#1e293b]">
                                <a
                                    href={selectedProject.links.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all font-medium"
                                >
                                    <Github size={20} /> GitHub
                                </a>
                                <a
                                    href={selectedProject.links.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#38bdf8] text-black hover:bg-[#34d399] transition-all font-bold"
                                >
                                    <ExternalLink size={20} /> Live Demo
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Projects;
