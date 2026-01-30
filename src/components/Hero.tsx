'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
    return (
        <section id="hero" className="relative w-full mx-auto pt-[120px] pb-10">
            <div className="max-w-7xl mx-auto flex flex-row items-start gap-5 px-6">
                <div className="flex flex-col justify-center items-center mt-5">
                    <div className="w-5 h-5 rounded-full bg-[#38bdf8]" />
                    <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#38bdf8] to-transparent" />
                </div>

                <div>
                    <h1 className="text-white font-black text-[50px] sm:text-[80px] leading-[1.1]">
                        Hi, I&apos;m <span className="text-[#38bdf8]">Sriram</span>
                    </h1>
                    <p className="mt-2 text-[#dfd9ff] font-medium lg:text-[25px] sm:text-[20px] text-[16px] lg:leading-[40px]">
                        Full-Stack & AI Engineer <br className="sm:block hidden" />
                        Building real-time, intelligent systems.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <a href="/MyResume.pdf" target="_blank" className="bg-[#38bdf8] text-black font-bold py-3 px-6 rounded-xl hover:bg-[#34d399] transition-all cursor-pointer z-10">
                            Download Resume
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
