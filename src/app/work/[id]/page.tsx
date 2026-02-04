'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/app/data/projects';
import { motion } from 'framer-motion';

export default function WorkDetail() {
    const params = useParams();
    const slug = params.id as string;

    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-green-500/30 selection:text-green-500 pb-24">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 relative z-10">
                {/* Header */}
                <div className="mb-16 border-b border-white/10 pb-8">
                    <Link href="/#projects" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-white transition-colors mb-6 group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        RETOUR_AUX_PROJETS
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="font-mono text-xs text-green-500 mb-2 block tracking-widest">
                                CASE_STUDY_00{project.id}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">
                                {project.title}
                            </h1>
                        </div>
                        <div className="font-mono text-sm text-neutral-400 text-right">
                            <p>{project.category}</p>
                            <p className="text-xs mt-1 text-neutral-600">{project.status}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
                    {/* Main Content (Challenge & Solution) */}
                    <div className="lg:col-span-2 space-y-16">
                        <section>
                            <h2 className="font-mono text-xs text-neutral-500 mb-6 tracking-widest border-l-2 border-red-500 pl-4">
                                // LE_DÉFI
                            </h2>
                            <p className="text-xl md:text-2xl leading-relaxed text-neutral-200 font-light">
                                {project.challenge}
                            </p>
                        </section>

                        <section>
                            <h2 className="font-mono text-xs text-neutral-500 mb-6 tracking-widest border-l-2 border-green-500 pl-4">
                                // LA_SOLUTION
                            </h2>
                            <p className="text-lg leading-relaxed text-neutral-300">
                                {project.solution}
                            </p>

                            {/* Key Features List */}
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

                    {/* Sidebar (Stack & Actions) */}
                    <div className="space-y-12">
                        {/* Stack */}
                        <div className="bg-neutral-900/50 border border-white/10 p-6 rounded-xl">
                            <h3 className="font-mono text-xs text-neutral-500 mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-neutral-700 animate-pulse"></span>
                                TECH_STACK
                            </h3>
                            <div className="space-y-3">
                                {project.stackDetails.map((tech, i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0 group">
                                        <span className="font-mono text-sm text-neutral-300 group-hover:text-white transition-colors">
                                            {tech}
                                        </span>
                                        <span className="text-[10px] text-neutral-600 font-mono">OK</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="space-y-4 sticky top-32">
                            <Link
                                href={project.demoLink}
                                className="group block w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 px-6 text-center transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span className="font-mono tracking-wider flex items-center justify-center gap-3">
                                    LANCER_LA_DÉMO
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                            </Link>
                            <p className="font-mono text-[10px] text-neutral-500 text-center">
                                * Environnement sécurisé (Sandboxed Mode)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
