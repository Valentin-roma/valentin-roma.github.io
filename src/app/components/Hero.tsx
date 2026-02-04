'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function Hero() {
    const handleScroll = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-20 sm:pt-16" id="hero">
            <div className="max-w-5xl w-full">
                {/* Main Headline */}
                <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight text-white mb-6 sm:mb-8">
                    ARCHITECTE DE
                    <br />
                    <span className="relative inline-block">
                        <motion.span
                            className="relative z-10"
                            initial={{ color: '#ffffff' }}
                            animate={{ color: '#0a0a0a' }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        >
                            SOLUTIONS
                        </motion.span>
                        <motion.span
                            className="absolute inset-0 bg-green-500 -z-0"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                            style={{ transformOrigin: 'left' }}
                        />
                    </span>
                    {' '}MÉTIERS
                </h1>

                {/* Technical Specifications - HUD Style */}
                {/* Value Proposition - Terminal Style */}
                {/* Value Proposition - Terminal Style */}
                <div className="font-mono text-xs sm:text-sm md:text-base text-neutral-400 max-w-2xl space-y-6 sm:space-y-8">
                    <p className="border-l-2 border-green-500 pl-3 sm:pl-4 py-1 leading-relaxed">
                        Je transforme vos processus métier en <span className="text-white font-bold">applications web performantes</span>.
                        Expert en développement de solutions SaaS sur-mesure, scalables et intuitives.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                        <a
                            href="#projects"
                            onClick={(e) => handleScroll('projects', e)}
                            className="group relative px-5 sm:px-6 py-3 bg-white text-black font-bold text-xs sm:text-sm tracking-wider uppercase transition-transform hover:scale-105 text-center"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <ScrambleText text="Découvrir mes projets" />
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </a>

                        <a
                            href="#contact"
                            onClick={(e) => handleScroll('contact', e)}
                            className="group px-5 sm:px-6 py-3 border border-white/20 text-white font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-green-500 transition-colors bg-neutral-900 text-center"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Me contacter
                            </span>
                        </a>
                    </div>

                    <div className="space-y-3 sm:space-y-4 pt-4">
                        <div className="flex items-center gap-2 text-xs text-neutral-600">
                            <span>// STACK_TECHNIQUE</span>
                            <div className="h-px bg-neutral-800 flex-grow"></div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {['NEXT.JS', 'REACT', 'TYPESCRIPT', 'TAILWIND', 'SUPABASE', 'POSTGRESQL', 'FIREBASE', 'ZUSTAND', 'FRAMER MOTION', 'PYTHON', 'C'].map((tech) => (
                                <span key={tech} className="px-2 py-1 bg-black border border-white/10 text-[10px] sm:text-xs text-neutral-300">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const ScrambleText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    const startScramble = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setDisplayText(prev =>
                text.split("").map((char, index) => {
                    if (char === " ") return " ";
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
        }, 50);
    };

    const stopScramble = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <span
            onMouseEnter={startScramble}
            onMouseLeave={stopScramble}
            className="inline-block"
        >
            {displayText}
        </span>
    );
};
