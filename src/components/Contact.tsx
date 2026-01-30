'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="w-full py-20 px-6 max-w-7xl mx-auto mb-20">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="glass-card p-8 md:p-12 rounded-3xl text-center max-w-3xl mx-auto"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#38bdf8]">Get In Touch</h2>
                <p className="text-gray-300 mb-10 text-lg">
                    I&apos;m currently looking for internships and new opportunities.
                    Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-10">
                    <a href="mailto:srirammeka13@gmail.com" className="flex items-center gap-3 text-white hover:text-[#38bdf8] transition-colors">
                        <Mail /> srirammeka13@gmail.com
                    </a>
                    <a href="tel:+918500212213" className="flex items-center gap-3 text-white hover:text-[#38bdf8] transition-colors">
                        <Phone /> +91 8500212213
                    </a>
                    <span className="flex items-center gap-3 text-gray-400">
                        <MapPin /> Vijayawada, India
                    </span>
                </div>

                <div className="flex justify-center gap-6">
                    <a href="https://github.com/Sriram4232" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-[#38bdf8] hover:text-black transition-all">
                        <Github size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/meka-sriram/" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-[#0077b5] hover:text-white transition-all">
                        <Linkedin size={24} />
                    </a>
                    <a href="mailto:srirammeka13@gmail.com" className="p-3 rounded-full bg-white/10 hover:bg-[#EA4335] hover:text-white transition-all">
                        <Mail size={24} />
                    </a>
                </div>

                <footer className="mt-16 text-gray-500 text-sm">
                    © {new Date().getFullYear()} Meka Sriram • Built with Next.js, React & Three.js
                </footer>
            </motion.div>
        </section>
    )
}

export default Contact;
