'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center px-6 lg:px-12 pt-16" id="hero">
            <div className="max-w-5xl w-full">
                {/* Main Headline */}
                <h1 className="font-sans text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight text-white mb-8">
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
                <div className="font-mono text-sm md:text-base text-neutral-400 max-w-2xl space-y-4">
                    <p className="border-l-2 border-green-500 pl-4 py-1">
                        Développement d'infrastructures digitales robustes et d'interfaces complexes.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                        <span>// STACK_TECHNIQUE</span>
                        <div className="h-px bg-neutral-800 flex-grow"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['NEXT.JS', 'SUPABASE', 'TAILWIND', 'TYPESCRIPT'].map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-black border border-white/10 text-xs text-neutral-300">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
