import Link from "next/link";
import Reveal from "./ui/Reveal";

import { projects } from "@/app/data/projects";

export default function ProjectGrid() {
    return (
        <section className="px-6 lg:px-12 py-24 max-w-7xl mx-auto" id="projects">
            {/* Section Header */}
            <Reveal>
                <div className="mb-12 border-technical-b pb-6">
                    <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
                        PROJETS
                    </h2>
                    <p className="font-mono text-sm text-neutral-400 uppercase tracking-tight">
                        PORTFOLIO // DÉMONSTRATIONS INTERACTIVES
                    </p>
                </div>
            </Reveal>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((project, index) => (
                    <Reveal key={project.id} delay={0.1 * (index + 1)}>
                        <Link
                            href={`/work/${project.slug}`}
                            className="border-technical p-6 bg-neutral-950 transition-colors duration-200 group cursor-pointer block relative"
                        >
                            {/* Corner Markers */}
                            <div className="corner-marker top-0 left-0 border-t border-l"></div>
                            <div className="corner-marker top-0 right-0 border-t border-r"></div>
                            <div className="corner-marker bottom-0 left-0 border-b border-l"></div>
                            <div className="corner-marker bottom-0 right-0 border-b border-r"></div>

                            {/* Project ID */}
                            <div className="font-mono text-xs text-neutral-600 mb-4 tracking-tight">
                                PROJECT_{project.id}
                            </div>

                            {/* Project Title */}
                            <h3 className="font-sans text-xl font-bold text-white mb-2 leading-tight">
                                {project.title}
                            </h3>

                            {/* Category */}
                            <p className="font-mono text-sm text-neutral-400 mb-4 uppercase tracking-tight">
                                {project.category}
                            </p>

                            {/* Technical Specs */}
                            <div className="border-technical-t pt-4 mt-4 space-y-2">
                                <div className="font-mono text-xs">
                                    <span className="text-neutral-600">STACK:</span>{" "}
                                    <span className="text-white">{project.tech}</span>
                                </div>
                                <div className="font-mono text-xs">
                                    <span className="text-neutral-600">STATUS:</span>{" "}
                                    <span className="text-green-500">
                                        {project.status}
                                    </span>
                                </div>
                                <div className="font-mono text-xs mt-4">
                                    <span className="text-neutral-600 group-hover:text-green-500 transition-colors">
                                        → VOIR LE PROJET
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

