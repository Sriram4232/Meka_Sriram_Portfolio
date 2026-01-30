'use client';

import React, { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

const ScrollNavigation = () => {
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);

    const scrollToSection = (index: number) => {
        if (index < 0 || index >= sections.length) return;

        const sectionId = sections[index];
        const element = document.getElementById(sectionId);

        if (element) {
            const top = element.offsetTop;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = (direction: 'up' | 'down') => {
        let newIndex = activeSectionIndex;
        if (direction === 'up') {
            newIndex = Math.max(0, activeSectionIndex - 1);
        } else {
            newIndex = Math.min(sections.length - 1, activeSectionIndex + 1);
        }
        scrollToSection(newIndex);
    };

    useEffect(() => {
        const handleScrollSpy = () => {
            const scrollPosition = window.scrollY + window.innerHeight * 0.3; // Trigger at 30% viewport height

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i]);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSectionIndex(i);
                    return;
                }
            }
        };

        window.addEventListener('scroll', handleScrollSpy, { passive: true });
        handleScrollSpy(); // Initial check
        return () => window.removeEventListener('scroll', handleScrollSpy);
    }, []);

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
            <button
                onClick={() => handleScroll('up')}
                disabled={activeSectionIndex === 0}
                className={`p-3 rounded-full bg-white/10 text-[#38bdf8] transition-all duration-300 hover:bg-white/20 backdrop-blur-sm shadow-lg border border-white/5
                ${activeSectionIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-30 hover:opacity-100'}`}
                aria-label="Scroll Up"
            >
                <ChevronUp size={32} />
            </button>

            <button
                onClick={() => handleScroll('down')}
                disabled={activeSectionIndex === sections.length - 1}
                className={`p-3 rounded-full bg-white/10 text-[#38bdf8] transition-all duration-300 hover:bg-white/20 backdrop-blur-sm shadow-lg border border-white/5
                ${activeSectionIndex === sections.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-30 hover:opacity-100'}`}
                aria-label="Scroll Down"
            >
                <ChevronDown size={32} />
            </button>
        </div>
    );
};

export default ScrollNavigation;
