'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
    return (
        <section id="about" className="relative w-full min-h-screen mx-auto px-6 py-10 flex flex-col items-center justify-center bg-black/20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
            >
                <div className="flex justify-center order-2 md:order-1">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden glass-card p-2 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <Image
                            src="/me.jpeg"
                            alt="Meka Sriram"
                            width={500}
                            height={500}
                            className="w-full h-full object-cover rounded-xl"
                            priority
                        />
                    </div>
                </div>

                <div className="order-1 md:order-2">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#38bdf8]">About Me</h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                        I&apos;m a 3rd Year B.Tech CSE (AI & ML) student and a Full-Stack & AI Engineer.
                        I enjoy competitive programming (LeetCode 1760 rating) and solving complex problems.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        I design and build intelligent, real-time systems that combine LLMs, backend engineering, and clean UX.
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="glass-card p-4 rounded-xl text-center hover:scale-105 transition-transform">
                            <h3 className="text-2xl font-bold text-[#34d399]">1700+</h3>
                            <p className="text-sm text-gray-400">LeetCode Rating</p>
                        </div>
                        <div className="glass-card p-4 rounded-xl text-center hover:scale-105 transition-transform">
                            <h3 className="text-2xl font-bold text-[#34d399]">Full-Stack</h3>
                            <p className="text-sm text-gray-400">Web & AI Dev</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default About;
