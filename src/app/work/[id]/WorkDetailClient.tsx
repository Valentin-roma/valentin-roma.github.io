'use client';

import { useLayoutEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project, projects } from '@/app/data/projects';

export default function WorkDetailClient({ project }: { project: Project }) {
    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

    const currentIndex = projects.findIndex(p => p.slug === project.slug);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-green-500/30 selection:text-green-500 pb-24">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 relative z-10">
                <div className="mb-16 border-b border-white/10 pb-8">
                    <a
                        href="/#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/#projects';
                        }}
                        className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-white transition-colors mb-6 group cursor-pointer"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        RETOUR_AUX_PROJETS
                    </a>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="font-mono text-xs text-green-500 mb-2 block tracking-widest">
                                CASE_STUDY_00{project.id}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                                {project.title.split(' ').map((word, i) => (
                                    <span key={i} className="text-white">
                                        {word}{' '}
                                    </span>
                                ))}
                            </h1>
                        </div>
                        <div className="font-mono text-sm text-neutral-400 text-right">
                            <p className="uppercase tracking-widest">{project.category}</p>
                            <div className="inline-flex items-center gap-2 mt-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] text-green-500 font-bold uppercase tracking-tighter">
                                    {project.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
                    <div className="lg:col-span-2 space-y-16">
                        <section>
                            <h2 className="font-mono text-lg text-red-500 mb-6 tracking-widest  uppercase">
                                // Le Défi
                            </h2>
                            <p className="text-lg md:text-lg leading-relaxed text-neutral-200 font-light">
                                {project.challenge}
                            </p>
                        </section>

                        <section>
                            <h2 className="font-mono text-lg text-green-500 mb-6 tracking-widest uppercase">
                                // La Solution
                            </h2>
                            <p className="text-lg leading-relaxed text-neutral-300">
                                {project.solution}
                            </p>

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-neutral-900 p-3 rounded border border-white/5">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                        <span className="text-sm font-mono text-neutral-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-12">
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                            <div className="bg-[#1a1a1a] px-4 py-2 border-b border-white/5 flex items-center justify-between">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                                </div>
                                <span className="font-mono text-[10px] text-neutral-500 uppercase">STACK_TECHNIQUE</span>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {project.stackDetails.map((tech, i) => (
                                        <div key={i} className="group">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-mono text-xs text-neutral-300 group-hover:text-green-400 transition-colors">
                                                    {tech}
                                                </span>
                                                <span className="text-[9px] text-neutral-600 font-mono italic">COMPLETE</span>
                                            </div>
                                            <div className="h-[2px] w-full bg-neutral-900 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: "100%" }}
                                                    transition={{ duration: 1, delay: i * 0.1 }}
                                                    className="h-full bg-green-500/30"
                                                ></motion.div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 sticky top-32">
                            <Link
                                href={project.demoLink}
                                className="group relative block w-full bg-white text-black py-4 px-6 text-center transition-all overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-green-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
                                <span className="relative font-mono font-bold tracking-widest flex items-center justify-center gap-3 text-black z-10">
                                    LANCER_LA_DÉMO
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                            </Link>
                            <p className="font-mono text-[10px] text-neutral-500 text-center uppercase tracking-tighter">
                                * Environnement sécurisé (Sandboxed Mode)
                            </p>
                            <Link
                                href={`/work/${nextProject.slug}`}
                                className="group relative block w-full text-white py-4 px-6 text-center transition-all overflow-hidden hover:bg-neutral-800"
                            >
                                <span className="relative font-mono font-bold tracking-widest flex items-center justify-center gap-3 z-10 text-xs sm:text-sm">
                                    {nextProject.id === "002" ? "VOIR_LE_SECOND_PROJET" : "VOIR_LE_PREMIER_PROJET"}
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
}
