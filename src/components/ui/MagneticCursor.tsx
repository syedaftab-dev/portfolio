"use client";

import React, { useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, Box, Circle, Hexagon, MoveUpRight, Zap } from "lucide-react";
import { cn } from "@/src/lib/utils";

// --- Components ---

// 1. Noise Texture Overlay (The "Film" Look)
export function NoiseOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay">
            <svg className="h-full w-full">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
}

// 2. Custom Magnetic Cursor
export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={cursorRef}
            style={{ x, y }}
            className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-white/50 bg-white/10 backdrop-invert mix-blend-difference"
        />
    );
};

// 3. Spotlight Background
export function Spotlight() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className="group relative -z-10 h-full w-full overflow-hidden bg-neutral-950"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
                }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,17,17,1),rgba(0,0,0,1))]" />
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
    );
};

// 4. Hero Section
export function Hero() {
    return (
        <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white">
            <Spotlight />
            <div className="z-10 flex flex-col items-center px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] backdrop-blur-md"
                >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    System Online 2125
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-4xl text-5xl font-medium tracking-tighter sm:text-7xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40"
                >
                    BEYOND <br /> REALITY.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-8 max-w-lg text-neutral-400 md:text-lg font-light leading-relaxed"
                >
                    We engineer digital voids. The interface between human consciousness and machine intelligence.
                    Minimalism is not a style; it is an operating system.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-10 flex gap-4"
                >
                    <button className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-black transition-all hover:bg-neutral-200">
                        <span className="font-semibold tracking-tight">Initialize</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

// 5. Bento Grid Features
export function BentoCard({ title, subtitle, icon: Icon, delay, className }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay }}
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-xl transition-colors hover:bg-neutral-800/50",
                className
            )}
        >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-3xl transition-all group-hover:bg-white/10" />

            <div className="relative z-10">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                    <Icon size={18} />
                </div>
                <h3 className="text-xl font-medium text-white">{title}</h3>
                <p className="mt-2 text-sm text-neutral-400">{subtitle}</p>
            </div>

            <div className="relative z-10 mt-8 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500 transition-colors group-hover:text-white">
                Explore <MoveUpRight size={12} />
            </div>
        </motion.div>
    );
};

export function Features() {
    return (
        <section className="relative z-10 bg-black px-4 py-32 text-white">
            <div className="mx-auto max-w-7xl">
                <div className="mb-20">
                    <h2 className="text-4xl font-light tracking-tighter md:text-6xl">
                        ARCHITECTING <span className="text-neutral-600">THE VOID</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 h-[800px] md:h-[600px]">
                    <BentoCard
                        title="Neural Sync"
                        subtitle="Direct interface with user cognition patterns."
                        icon={Zap}
                        delay={0.1}
                        className="md:col-span-2"
                    />
                    <BentoCard
                        title="Quantum Core"
                        subtitle="Processing at speeds undefined by time."
                        icon={Hexagon}
                        delay={0.2}
                        className="md:col-span-1"
                    />
                    <BentoCard
                        title="Zero Latency"
                        subtitle="Immediate feedback loops."
                        icon={Circle}
                        delay={0.3}
                        className="md:col-span-1"
                    />
                    <BentoCard
                        title="Spatial Audio"
                        subtitle="Immersive soundscapes that adapt to your environment."
                        icon={Box}
                        delay={0.4}
                        className="md:col-span-2"
                    />
                </div>
            </div>
        </section>
    );
};

// 6. Narrative Section (Large Text Reveal)
export function Narrative() {
    return (
        <section className="bg-black px-6 py-24 md:py-48 flex items-center justify-center border-t border-white/5">
            <div className="max-w-5xl text-center">
                <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="font-mono text-xs uppercase tracking-[0.4em] text-neutral-500 mb-12 block"
                >
                    Manifesto 2125
                </motion.span>
                <motion.h2 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="font-serif text-3xl md:text-6xl font-light leading-tight text-white tracking-tighter"
                >
                    We don't just build websites. We engineer <span className="italic text-neutral-400">digital dimensions</span> where the boundaries between user and interface dissolve into a singular, fluid experience.
                </motion.h2>
            </div>
        </section>
    );
}

// 7. Interactive Services Grid
export function ServicesGrid() {
    const services = [
        { title: "Neuro Design", desc: "Interfaces that respond to human intuition." },
        { title: "Spatial Web", desc: "Three-dimensional browsing environments." },
        { title: "Quantum Dev", desc: "Non-linear computational architectures." },
        { title: "Void Logic", desc: "Minimalist systems for maximal impact." }
    ];

    return (
        <section className="bg-black px-6 py-24 md:px-12 border-t border-white/5">
            <div className="mx-auto max-w-7xl">
                <div className="mb-20 grid grid-cols-1 md:grid-cols-2 items-end gap-8">
                    <h2 className="text-4xl md:text-7xl font-light tracking-tighter text-white">CORE <br/> <span className="text-neutral-600 italic">SYSTEMS</span></h2>
                    <p className="text-neutral-400 text-sm md:text-base max-w-sm mb-4">Our technological stack is designed to push the limits of what is possible in the browser.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="p-8 border border-white/10 bg-neutral-900/30 rounded-2xl group transition-all hover:border-white/30"
                        >
                            <span className="font-mono text-[10px] text-neutral-600 mb-8 block">0{i + 1}</span>
                            <h3 className="text-xl text-white mb-4 transition-colors group-hover:text-emerald-400">{s.title}</h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 8. Project Showcase (Large Visuals)
export function ProjectShowcase() {
    const projects = [
        { title: "Ethereal Flow", category: "UX Research", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" },
        { title: "Onyx Void", category: "Branding", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80" }
    ];

    return (
        <section className="bg-black px-6 py-24 md:px-12 border-t border-white/5 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-24">
                    {projects.map((p, i) => (
                        <div key={i} className={cn("flex flex-col md:flex-row gap-12 items-center", i % 2 === 1 && "md:flex-row-reverse")}>
                            <motion.div 
                                className="w-full md:w-1/2 aspect-[16/10] overflow-hidden rounded-sm relative group"
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <img src={p.img} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={p.title} />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                            </motion.div>
                            <div className="w-full md:w-1/2">
                                <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-4 block">{p.category}</span>
                                <h3 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tighter mb-8 italic">{p.title}</h3>
                                <button className="flex items-center gap-4 text-white hover:gap-6 transition-all border-b border-white/20 pb-2">
                                    <span className="text-xs uppercase tracking-widest">Case Study</span>
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 9. Metrics Section
export function Metrics() {
    const stats = [
        { label: "Neural Nodes", val: "1.2k" },
        { label: "Sync Rate", val: "99.9%" },
        { label: "Quantum Threads", val: "∞" },
        { label: "Uptime", val: "24/7" }
    ];

    return (
        <section className="bg-neutral-950 px-6 py-24 md:px-12 border-y border-white/5">
            <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                {stats.map((s, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                        <div className="text-4xl md:text-6xl font-mono text-white mb-2">{s.val}</div>
                        <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">{s.label}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// 10. Testimonials
export function Testimonials() {
    return (
        <section className="bg-black px-6 py-24 md:py-48 border-b border-white/5">
            <div className="mx-auto max-w-4xl text-center">
                 <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-neutral-600 mb-16">Intelligence Feedback</h2>
                 <div className="space-y-24">
                     <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex flex-col items-center"
                     >
                        <p className="text-2xl md:text-4xl font-light text-white/90 italic mb-8">"The interaction physics are indistinguishable from biological response. This isn't UI; it's evolution."</p>
                        <div className="h-px w-12 bg-emerald-400 mb-4" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Director of UX / Neuralink</span>
                     </motion.div>
                 </div>
            </div>
        </section>
    );
}

// 11. Contact CTA
export function ContactCTA() {
    return (
        <section className="relative bg-black px-6 py-32 md:py-48 overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent)] transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
            <div className="mx-auto max-w-7xl text-center relative z-10">
                <h2 className="text-6xl md:text-[10vw] font-serif font-light tracking-tighter text-white mb-12 uppercase italic leading-none">
                    Enter <br/> The <span className="text-emerald-400">Void.</span>
                </h2>
                <button className="relative px-12 py-6 rounded-full bg-white text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                    Start Integration
                </button>
            </div>
        </section>
    );
}

// 12. Footer
export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black py-24 px-6 md:px-12 text-neutral-600">
            <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-end">
                <div className="flex flex-col gap-8">
                    <div className="text-3xl font-bold tracking-tighter text-white">AURA.</div>
                    <p className="text-xs font-mono uppercase tracking-widest max-w-xs leading-relaxed">
                        Pioneering the boundary between the physical and the digital since 2125.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-8 text-xs font-mono uppercase tracking-widest">
                    <div className="flex flex-col gap-4">
                        <span className="text-white">Systems</span>
                        <a href="#" className="hover:text-white transition-colors">Neural</a>
                        <a href="#" className="hover:text-white transition-colors">Quantum</a>
                        <a href="#" className="hover:text-white transition-colors">Spatial</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-white">Social</span>
                        <a href="#" className="hover:text-white transition-colors">X-Net</a>
                        <a href="#" className="hover:text-white transition-colors">Void</a>
                        <a href="#" className="hover:text-white transition-colors">Pulse</a>
                    </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-4">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    <p className="font-mono text-[10px] tracking-[0.3em]">Uilora Library Standard © 2125</p>
                </div>
            </div>
        </footer>
    );
}