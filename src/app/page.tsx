import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStacks from '@/components/TechStacks';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import StarsCanvas from '@/components/Background';
import ScrollNavigation from '@/components/ScrollNavigation';

export default function Home() {
  return (
    <main className="relative z-0 w-full overflow-hidden text-white selection:bg-[#38bdf8] selection:text-black">
      <StarsCanvas />
      <ScrollNavigation />

      <div className="relative z-10">
        <Hero />
        <About />
        <TechStacks />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}
