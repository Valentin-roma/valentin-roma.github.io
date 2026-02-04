'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './ui/Reveal';

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const email = 'valentin.roymamer@icloud.com';

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socialLinks = [
        {
            name: 'LINKEDIN',
            url: 'https://www.linkedin.com/in/valentin-roy-mamer-07aa43310',
            icon: '→'
        },
        {
            name: 'GITHUB',
            url: 'https://github.com/valentinroymamer',
            icon: '→'
        },
        {
            name: 'MALT',
            url: 'https://www.malt.fr/profile/valentinroymamer',
            icon: '→'
        }
    ];

    return (
        <section className="py-24 px-6 bg-neutral-950 border-t border-b border-neutral-800" id="contact">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <Reveal>
                    <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            COMMUNICATION
                    </h2>
                </Reveal>

                {/* Central Terminal Card */}
                <Reveal delay={0.2}>
                    <div className="border border-neutral-800 bg-black/50 p-8 md:p-12 max-w-4xl mx-auto">

                        {/* Status Indicator */}
                        <div className="flex items-center gap-3 mb-8">
                            <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                                STATUS:
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="font-mono text-xs text-green-500 uppercase tracking-wide">
                                    OPEN FOR OPPORTUNITIES
                                </span>
                            </div>
                        </div>

                        {/* Email Display */}
                        <div className="mb-12">
                            <motion.button
                                onClick={handleCopyEmail}
                                className="group w-full text-left"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="flex items-center justify-between gap-4 p-6 border border-neutral-800 hover:border-neutral-700 transition-all rounded-lg bg-neutral-950/50">
                                    <span className={`font-sans text-2xl md:text-4xl font-bold tracking-tight transition-colors ${copied ? 'text-green-500' : 'text-white group-hover:text-neutral-300'
                                        }`}>
                                        {copied ? 'ADRESSE COPIÉE' : email}
                                    </span>
                                    <svg
                                        className={`w-6 h-6 flex-shrink-0 transition-all ${copied ? 'text-green-500 scale-110' : 'text-neutral-600 group-hover:text-white'
                                            }`}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        {copied ? (
                                            <path d="M5 13l4 4L19 7" />
                                        ) : (
                                            <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        )}
                                    </svg>
                                </div>
                            </motion.button>
                        </div>

                        {/* Social Links Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {socialLinks.map((link, index) => (
                                <Reveal key={link.name} delay={0.3 + (index * 0.1)}>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex items-center justify-between px-6 py-4 border border-neutral-800 hover:border-green-500 transition-all overflow-hidden"
                                    >
                                        {/* Background fill on hover */}
                                        <div className="absolute inset-0 bg-green-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                                        <span className="relative z-10 font-mono text-sm font-bold text-white group-hover:text-black transition-colors">
                                            {link.name}
                                        </span>
                                        <span className="relative z-10 font-mono text-neutral-600 group-hover:text-black transition-colors">
                                            {link.icon}
                                        </span>
                                    </a>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
