"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Box,
  Circle,
  Hexagon,
  MoveUpRight,
  Zap,
  Mail,
  Terminal,
  Cpu,
  Code,
  Sparkles,
  Calendar,
  MapPin,
  ExternalLink,
  Briefcase,
  Layers,
  Send,
  CheckCircle2,
  ChevronRight,
  Download
} from "lucide-react";
import { Spotlight } from "@/src/components/ui/MagneticCursor";

// Custom Twitter (X) Icon SVG
const Twitter = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

// Custom GitHub Icon SVG
const Github = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Custom LinkedIn Icon SVG
const Linkedin = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// --- Header Navigation ---
function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "about", "skills", "projects", "journey", "connect"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "journey", label: "Journey" },
    { id: "connect", label: "Connect" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? "py-4" : "py-6"
        }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold tracking-tighter text-white font-display flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          SYED.DEV
        </a>

        {/* Floating Nav Container */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full border border-white/5 bg-neutral-950/40 backdrop-blur-xl">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors rounded-full ${activeSection === item.id ? "text-white" : "text-neutral-500 hover:text-neutral-200"
                }`}
            >
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </a>
          ))}
        </nav>

        <div>
          <a
            href="https://drive.google.com/file/d/1NbI8S2XBaFGDetDjUScSsSrJTwvOu4T6/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white text-xs font-mono uppercase tracking-widest text-white hover:text-black transition-all duration-300"
          >
            View Resume <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

// --- Hero Background (Grid + Particles) ---
function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number, y: number, vx: number, vy: number, radius: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Initialize particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(16, 185, 129, 0.4)'; 
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)'; 
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect close particles
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.globalAlpha = 1 - (dist / 120);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {/* CSS Moving Perspective Grid */}
      <style>{`
        @keyframes gridMove {
          0% { transform: rotateX(75deg) translateY(-50px); }
          100% { transform: rotateX(75deg) translateY(0px); }
        }
      `}</style>
      <div 
        className="absolute bottom-0 left-0 right-0 h-[100vh]"
        style={{
          perspective: '1000px',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 60%)',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 60%)'
        }}
      >
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.5)_1px,transparent_1px)]"
          style={{
            backgroundSize: '50px 50px',
            transformOrigin: 'top center',
            animation: 'gridMove 3s linear infinite',
            width: '200%',
            height: '200%',
            left: '-50%',
            top: '-50%'
          }}
        />
      </div>

      {/* Floating Canvas Particles */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  );
}

// --- Hero Section ---
function HeroSection() {
  const roles = ["Full-Stack Developer", "Backend Developer", "Frontend Developer", "ML Enthusiast"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <Spotlight />
        <HeroBackground />
      </div>
      <div className="z-10 flex flex-col items-center px-6 text-center max-w-5xl mt-24 md:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400" />
          Open to Work
        </motion.div>

        <h1 className="text-4xl font-display font-light tracking-tighter sm:text-6xl md:text-8xl leading-[1.1]">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-500 pb-2"
          >
            Syed Aftab
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="relative inline-block mt-4"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              transition={{ duration: 1.2, delay: 0.7, type: "spring", bounce: 0.4 }}
              className="absolute -left-12 -top-6 md:-left-24 md:-top-10 text-2xl md:text-5xl font-light italic text-neutral-400"
            >
              aspiring
            </motion.span>
            <span className="font-semibold italic text-3xl sm:text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500 pr-2 md:pr-4 pb-2">
              SOFTWARE ENGINEER
            </span>
          </motion.div>
        </h1>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 1.0 } }
          }}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-col items-center gap-4"
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="text-sm font-mono text-emerald-400 tracking-widest uppercase"
          >
            Building as a
          </motion.span>
          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.9, y: 10 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
            className="h-[60px] w-[300px] flex justify-center items-center relative overflow-hidden mt-1"
          >
            <AnimatePresence>
              <motion.span
                key={currentRoleIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute px-6 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white text-xs md:text-sm font-mono tracking-wider shadow-sm whitespace-nowrap"
              >
                {roles[currentRoleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
        >
          <a href="#projects" className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-black transition-all hover:bg-neutral-200 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <span className="text-xs uppercase tracking-widest font-mono font-bold">View Projects</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#connect" className="group flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 hover:border-white/30 text-white transition-all text-xs font-mono uppercase tracking-widest">
            Contact Me <ChevronRight className="h-3 w-3" />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-600">Scroll down</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-neutral-600 to-transparent animate-bounce" />
      </motion.div>
    </section>
  );
}

// --- About Section (Personal Terminal Mock) ---
function AboutSection() {
  const terminalTabs = ["profile.json", "manifesto.md"];
  const [activeTab, setActiveTab] = useState(0);

  const profileJson = `{
  "name": "Syed Aftab",
  "role": "Full-stack Developer",
  "location": "Kalaburagi, KA, India",
  "philosophy": "Clean architecture, optimized APIs, real-time data flows",
  "core_competencies": [
    "Full-stack Development",
    "API Design & Database Design",
    "Real-time Systems",
    "Authentication & Performance Optimization"
  ]
}`;

  const manifestoText = `# Manifesto

We don't just write code. We create digital artifacts.
Every pixel should serve a functional purpose.
Every transition must mimic physical inertia.
Latency is the enemy of immersive design.
`;



  return (
    <section id="about" className="relative z-10 bg-black px-6 py-32 text-white border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-3 block">01 / CORE IDENTITY</span>
          <h2 className="text-4xl font-display font-light tracking-tighter md:text-6xl">
            DEVELOPER <span className="font-semibold italic text-neutral-500">PROFILE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Terminal / Code Box - Left 7 Cols */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-neutral-950/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-neutral-900/50 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5">
                {terminalTabs.map((tab, idx) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(idx)}
                    className={`px-3 py-1.5 rounded-md text-[11px] font-mono transition-colors ${activeTab === idx ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-[10px] font-mono text-neutral-600">bash</div>
            </div>

            {/* Content area */}
            <div className="p-6 h-[320px] overflow-y-auto font-mono text-xs leading-relaxed text-neutral-300">
              {activeTab === 0 && (
                <pre className="text-emerald-400 select-all whitespace-pre-wrap">{profileJson}</pre>
              )}
              {activeTab === 1 && (
                <div className="space-y-4 text-neutral-300">
                  <pre className="text-cyan-400 select-all whitespace-pre-wrap">{manifestoText}</pre>
                </div>
              )}
            </div>
          </motion.div>

          {/* Text & Goals - Right 5 Cols */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <h3 className="text-2xl font-light text-white tracking-tight">
              Designing bridges between logic and aesthetics.
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              I am a dedicated full-stack developer experienced in building scalable applications. My focus lies in designing robust APIs, optimizing database schemas, and crafting seamless real-time experiences using technologies like React, Next.js, Node.js, and PostgreSQL.
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              I believe developer tools, interfaces, and personal portfolios shouldn't look generic. They should evoke emotion and demonstrate the technical precision behind the scenes.
            </p>

            <div className="mt-4 pt-6 border-t border-white/5 grid grid-cols-2 gap-6">
              <div>
                <span className="font-mono text-2xl text-emerald-400 block font-bold">25+</span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono">Repositories</span>
              </div>
              <div>
                <span className="font-mono text-2xl text-cyan-400 block font-bold">5+</span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono">Prod Apps</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Skills Section (Minimal) ---
function MinimalSkillsSection() {
  const allSkills = [
    "C++", "JavaScript", "TypeScript", "Python", "SQL", "HTML5", "CSS3",
    "React.js", "Next.js", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "Redis",
    "REST APIs", "WebSockets", "JWT", "Docker", "Git", "CI/CD"
  ];

  return (
    <section id="skills" className="relative z-10 bg-black px-6 py-32 text-white border-t border-white/5">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-3 block">02 / CAPABILITIES</span>
          <h2 className="text-4xl font-display font-light tracking-tighter md:text-5xl">
            TECH <span className="font-semibold italic text-neutral-500">SYSTEMS</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {allSkills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="group relative overflow-hidden rounded-full border border-white/10 bg-neutral-950/50 px-6 py-3 md:px-8 md:py-4 transition-colors hover:border-emerald-500/30 hover:bg-neutral-900/80 cursor-default"
            >
              <span className="relative z-10 font-mono text-sm tracking-wide text-neutral-400 transition-colors group-hover:text-white">
                {skill}
              </span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Projects Section ---
interface Project {
  title: string;
  category: string;
  desc: string;
  tech: string[];
  img: string;
  github: string;
  live?: string;
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  return (
    <div className={`flex flex-col lg:flex-row gap-8 items-center py-8 border-b border-white/10 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""
      }`}>
      {/* Project Image Box */}
      <motion.div
        className="w-full lg:w-5/12 aspect-video overflow-hidden rounded-xl border border-white/10 relative group bg-neutral-900"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={project.img}
          className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-[1.03] transition-all duration-700"
          alt={project.title}
        />
        <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-transparent transition-colors duration-500" />

        {/* Hover overlay links */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] bg-black/40">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:bg-neutral-200 transition-colors"
          >
            <Github size={18} />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-400 transition-colors"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </motion.div>

      {/* Project details */}
      <motion.div
        className="w-full lg:w-7/12 flex flex-col items-start lg:px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 mb-2 block">
          {project.category}
        </span>
        <h3 className="text-2xl md:text-4xl font-display font-light text-white tracking-tighter mb-3">
          {project.title}
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed mb-5 font-light">
          {project.desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/5 text-neutral-400">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white border-b border-emerald-400/50 hover:border-emerald-400 pb-1.5 transition-colors"
            >
              Explore System <MoveUpRight size={12} className="text-emerald-400" />
            </a>
          ) : (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white border-b border-white/30 hover:border-white pb-1.5 transition-colors"
            >
              View Source <Github size={12} />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "Sportz - Real-Time Dashboard",
      category: "Full Stack",
      desc: "Designed a real-time analytics dashboard handling 4 major sports. Reduced data latency to <200ms using WebSocket pub-sub architecture and Redis caching.",
      tech: ["React", "Node.js", "PostgreSQL", "Redis", "WebSockets", "Groq AI"],
      img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
      github: "https://github.com/syedaftab-dev/sports_websockets",
      live: "https://sports-websockets-seven.vercel.app/"
    },
    {
      title: "CredX - Analytics Platform",
      category: "Full Stack",
      desc: "Architected full-stack SaaS application with Next.js App Router. Developed a modular audit engine enabling AI-driven analysis across SaaS pricing models, improving audit speed and accuracy.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Groq AI", "Nodemailer"],
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      github: "https://github.com/syedaftab-dev/credex",
      live: "https://credex-mocha.vercel.app/"
    },
    {
      title: "Bank Transaction System",
      category: "Backend",
      desc: "Engineered double-entry ledger backend ensuring transactional consistency and accurate balance tracking. Deployed ACID-compliant processing for atomic transfers, ensuring 100% data integrity.",
      tech: ["Node.js", "Express.js", "MongoDB", "JWT"],
      img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
      github: "https://github.com/syedaftab-dev/bank-transaction-system",
      live: "https://bank-transaction-system-uo2k.onrender.com/"
    },
    {
      title: "Threadly",
      category: "Full Stack",
      desc: "A full-stack social discussion platform featuring nested comment threads, dynamic voting mechanics, secure user authentication, and highly optimized infinite scrolling feeds.",
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      github: "https://github.com/syedaftab-dev/threadly"
    },
    {
      title: "AftaMeet",
      category: "Full Stack",
      desc: "A seamless real-time chat and video calling application designed for high performance peer-to-peer communication using WebRTC and WebSockets.",
      tech: ["React", "WebRTC", "Socket.io", "Node.js", "Tailwind CSS"],
      img: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=800&q=80",
      github: "https://github.com/syedaftab-dev/aftaaMeet",
      live: "https://aftameet-streamify.onrender.com/login"
    },
    {
      title: "Dogstudio",
      category: "Frontend",
      desc: "An immersive 3D landing page utilizing Three.js and custom fragment shaders to create highly responsive, physics-based digital interactions.",
      tech: ["Three.js", "JavaScript", "HTML5", "CSS3", "WebGL"],
      img: "https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=800&q=80",
      github: "https://github.com/syedaftab-dev/dogstudio"
    }
  ];

  return (
    <section id="projects" className="relative z-10 bg-black px-6 py-32 text-white border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-3 block">03 / ARTIFACTS</span>
          <h2 className="text-4xl font-display font-light tracking-tighter md:text-6xl">
            PROJECT <span className="font-semibold italic text-neutral-500">SHOWCASE</span>
          </h2>
        </div>

        <div className="flex flex-col gap-12">
          {projects.map((p, idx) => (
            <ProjectCard key={p.title} project={p} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}


// --- Career Journey Section (Interactive Timeline) ---
interface JourneyItem {
  year: string;
  role: string;
  company: string;
  location: string;
  desc: string;
  points: string[];
}

function JourneyTimelineItem({ item, idx }: { item: JourneyItem; idx: number }) {
  const isEven = idx % 2 === 0;

  return (
    <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-12 md:gap-8 group">
      {/* Node indicator */}
      <div className="absolute left-0 top-1.5 md:left-1/2 md:-translate-x-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black border border-white/20 group-hover:border-emerald-400 group-hover:bg-emerald-500/10 transition-colors duration-500">
        <div className="h-2 w-2 rounded-full bg-neutral-600 group-hover:bg-emerald-400 transition-colors duration-500" />
      </div>

      {/* Date side */}
      <div className={`md:row-start-1 md:col-span-5 flex flex-col items-start mb-2 md:mb-0 md:pt-1.5 ${isEven ? 'md:col-start-1 md:text-right md:items-end' : 'md:col-start-8 md:text-left md:items-start'}`}>
        <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-500/5 border border-emerald-500/10 inline-block mb-1.5">
          {item.year}
        </span>
        <span className={`text-[10px] text-neutral-500 font-mono flex items-center gap-1.5 ${isEven ? 'flex-row' : 'flex-row-reverse md:flex-row'}`}>
          <MapPin size={10} /> {item.location}
        </span>
      </div>

      {/* Spacing spacer for the middle line */}
      <div className="hidden md:block md:col-span-2 md:col-start-6 md:row-start-1" />

      {/* Card side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className={`md:row-start-1 md:col-span-5 pb-4 md:pb-0 ${isEven ? 'md:col-start-8' : 'md:col-start-1'}`}
      >
        <div className="p-5 border border-white/5 bg-neutral-950/40 rounded-xl group-hover:border-white/10 group-hover:bg-neutral-900/20 transition-all duration-300">
          <h4 className="text-base font-medium text-white tracking-tight leading-tight">{item.role}</h4>
          <p className="text-[11px] font-mono text-neutral-400 mt-1.5 flex items-center gap-2">
            <Briefcase size={10} className="text-cyan-400" /> {item.company}
          </p>
          <p className="text-xs text-neutral-400 leading-relaxed mt-3 mb-3 font-light">
            {item.desc}
          </p>
          <ul className="space-y-1.5">
            {item.points.map((pt, i) => (
              <li key={i} className="text-[10px] text-neutral-500 flex items-start gap-2 leading-relaxed">
                <span className="h-1 w-1 rounded-full bg-emerald-500/50 mt-1.5 shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

function CareerJourneySection() {
  const journey: JourneyItem[] = [
    {
      year: "Aug 2023 - Mar 2027",
      role: "B.Tech in Computer Science and Engineering",
      company: "IIITDM Kurnool",
      location: "Kurnool, AP, India",
      desc: "Pursuing Bachelor of Technology with a GPA of 7.57/10. Focused on core computer science fundamentals and software engineering principles.",
      points: [
        "Coursework: Data Structures, Algorithms, DBMS, Web Development, System Design, Operating Systems."
      ]
    },
    {
      year: "2024",
      role: "Full Stack Developer Certification",
      company: "Simplilearn",
      location: "Online",
      desc: "Comprehensive certification covering modern full-stack web development technologies and deployment pipelines.",
      points: [
        "Mastered the MERN stack (MongoDB, Express.js, React, Node.js).",
        "Completed 50+ hands-on projects including full-scale real-time applications."
      ]
    },
    {
      year: "2023",
      role: "SQL Intermediate Certification",
      company: "HackerRank",
      location: "Online",
      desc: "Achieved intermediate proficiency in SQL through rigorous problem-solving and optimization challenges.",
      points: [
        "Demonstrated proficiency in query optimization.",
        "Mastered complex database design paradigms and multi-table join operations."
      ]
    },
    {
      year: "2021 - 2023",
      role: "Pre-University College (Science)",
      company: "Chandrakanth Patil Memorial PU College of Science",
      location: "Kalaburagi, KA, India",
      desc: "Completed Pre-University education focusing on Science (PCMB), building a strong analytical and mathematical foundation.",
      points: [
        "Secured foundational knowledge in Physics, Chemistry, and Mathematics.",
        "Participated in science exhibitions and technical problem-solving events."
      ]
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="journey" className="relative z-10 bg-black px-6 py-32 text-white border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-3 block">04 / BACKGROUND</span>
          <h2 className="text-4xl font-display font-light tracking-tighter md:text-6xl">
            EDUCATION <span className="font-semibold italic text-neutral-500">& ACHIEVEMENTS</span>
          </h2>
        </div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative mt-20 max-w-4xl mx-auto">
          {/* Vertical central line for desktop, left line for mobile */}
          <div className="absolute left-[11px] md:left-1/2 top-2 bottom-16 w-[1px] bg-white/10" />

          {/* Scrolling active path line */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-[11px] md:left-1/2 top-2 bottom-16 w-[1px] bg-gradient-to-b from-emerald-400 via-cyan-400 to-transparent"
          />

          <div className="space-y-12">
            {journey.map((item, idx) => (
              <JourneyTimelineItem key={item.company + item.year} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Connect Section ---
function ConnectSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    
    try {
      // NOTE: Replace "YOUR_ACCESS_KEY_HERE" with a free access key from https://web3forms.com
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY_HERE",
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setIsSuccess(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        alert("Form submission failed. Please set up your Web3Forms access key.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }

    setIsSubmitting(false);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const socials = [
    { label: "GitHub", href: "https://github.com/syedaftab-dev", icon: Github, user: "@syedaftab-dev" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/syed-aftab-797130345/", icon: Linkedin, user: "in/syed-aftab" },
    { label: "LeetCode", href: "https://leetcode.com/u/Syed-Aftab/", icon: Code, user: "@Syed-Aftab" },
    { label: "Email", href: "mailto:syedaftab488@gmail.com", icon: Mail, user: "syedaftab488@gmail.com" }
  ];

  return (
    <section id="connect" className="relative z-10 bg-black px-6 py-32 text-white border-t border-white/5 overflow-hidden">
      {/* Background Radial Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.08),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-emerald-500 mb-3 block">05 / ESTABLISH SYNC</span>
          <h2 className="text-4xl font-display font-light tracking-tighter md:text-6xl">
            GET IN <span className="font-semibold italic text-neutral-500">CONNECT</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Info side - Left 5 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-light text-white tracking-tight mb-6">
                Let's construct something extraordinary together.
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-10 font-light">
                Whether you're looking to build an interactive client platform, hire an experienced architect for your backend stack, or simply discuss modern software patterns, feel free to reach out. I am open to consulting contracts, permanent opportunities, and open source collaboration.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl border border-white/5 bg-neutral-950/40 hover:bg-neutral-900/30 hover:border-white/10 transition-all flex items-center gap-4 group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-neutral-400 group-hover:text-emerald-400 transition-colors">
                      <Icon size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-600 block">{s.label}</span>
                      <span className="text-xs text-neutral-300 font-mono flex items-center gap-1 group-hover:text-white transition-colors">
                        {s.user} <MoveUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Form side - Right 7 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="p-8 border border-white/10 bg-neutral-950/20 backdrop-blur-xl rounded-3xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-neutral-900/20 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. john@domain.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-neutral-900/20 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-neutral-900/20 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative px-6 py-4 rounded-xl bg-white text-black text-xs font-mono font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    Sending Message...
                    <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message <Send size={12} />
                  </>
                )}
              </button>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-400 text-xs font-mono"
                  >
                    <CheckCircle2 size={16} />
                    <span>Message sent successfully! I will get back to you soon.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Footer ---
function SystemFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-white/5 bg-black py-16 px-6 md:px-12 text-neutral-600 text-xs">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="text-sm font-bold tracking-widest text-white font-mono">SYED AFTAB</div>
          <p className="font-mono text-[10px] uppercase tracking-wider">
            Full Stack Developer // Standard Spec 2.6
          </p>
        </div>

        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>UTC Clock: {time || "00:00:00"}</span>
          </div>
          <div>•</div>
          <div>Status: Sync-Active</div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 font-mono text-[10px] tracking-[0.2em] uppercase">
          <p>© {new Date().getFullYear()} Syed Aftab. All Rights Reserved.</p>
          <a href="#" className="hover:text-emerald-400 transition-colors">Return to Node Start</a>
        </div>
      </div>
    </footer>
  );
}

// --- Main Page Component ---
export default function PortfolioPage() {
  return (
    <div className="bg-black text-neutral-200">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MinimalSkillsSection />
      <ProjectsSection />
      <CareerJourneySection />
      <ConnectSection />
      <SystemFooter />
    </div>
  );
}
