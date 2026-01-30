'use client';

import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    { category: "Languages", items: ["Java", "Python", "C", "JavaScript", "TypeScript"] },
    { category: "Frontend", items: ["React", "Next.js", "HTML", "CSS", "Tailwind"] },
    { category: "Backend", items: ["FastAPI", "Node.js", "Express", "REST APIs"] },
    { category: "AI & ML", items: ["LLMs", "Gemini API", "LLaMA", "Whisper"] },
    { category: "Database", items: ["MongoDB", "MySQL"] },
    { category: "Tools & Cloud", items: ["GitHub", "VS Code", "Jupyter", "Google Cloud", "Azure"] },
    { category: "Security", items: ["JWT", "OTP", "TOTP", "Google Auth"] },
];

const TechStacks = () => {
    return (
        <section id="skills" className="w-full py-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#38bdf8]">Technical Skills</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 rounded-2xl"
                        >
                            <h3 className="text-xl font-bold mb-4 text-[#34d399]">{skillGroup.category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((item, i) => (
                                    <span key={i} className="px-3 py-1 text-sm rounded-full border border-gray-700 bg-gray-900/50 text-gray-300">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

export default TechStacks;
