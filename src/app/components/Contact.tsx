'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Reveal from './ui/Reveal';

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const email = 'valentin.roymamer@icloud.com';

    const handleCopyEmail = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        } else {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Fallback copy failed: ', err);
            }
        }
    };

    const socialLinks = [
        {
            name: 'LINKEDIN',
            url: 'https://www.linkedin.com/in/valentin-roy-mamer-07aa43310',
            icon: '→'
        }
    ];

    return (
        <section className="py-24 px-6 bg-neutral-950 border-t border-b border-neutral-800" id="contact">
            <div className="max-w-7xl mx-auto">
                <Reveal>
                    <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-white mb-12">
                        COMMUNICATION
                    </h2>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="border border-neutral-800 bg-black/50 p-8 md:p-12 max-w-4xl mx-auto">

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

                        <div className="mb-12">
                            <motion.button
                                onClick={handleCopyEmail}
                                className="group w-full text-left"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="flex items-center justify-between gap-4 p-4 sm:p-6 border border-neutral-800 hover:border-neutral-700 transition-all rounded-lg bg-neutral-950/50">
                                    <span className={`font-sans text-sm sm:text-2xl md:text-4xl font-bold tracking-tight transition-colors break-all ${copied ? 'text-green-500' : 'text-white group-hover:text-neutral-300'
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


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <TerminalButton
                                href="mailto:valentin.roymamer@icloud.com?subject=Projet%20SaaS%20-%20Demande%20de%20devis"
                                title="LANCER UN PROJET"
                                description="Vous avez un cahier des charges ou une idée précise ?"
                                command="DEMANDER UN DEVIS"
                                theme="green"
                            />

                            <TerminalButton
                                href="mailto:valentin.roymamer@icloud.com?subject=Prise%20de%20contact"
                                title="ÉCHANGER"
                                description="Une question technique ou une proposition de collaboration ?"
                                command="ENVOYER UN MESSAGE"
                                theme="white"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 border-t border-neutral-900 pt-8">
                            {socialLinks.map((link, index) => (
                                <Reveal key={link.name} delay={0.3 + (index * 0.1)}>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono text-xs text-neutral-500 hover:text-green-500 transition-colors uppercase tracking-wider flex items-center gap-2"
                                    >
                                        {link.name} <span className="text-lg leading-none">↗</span>
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

function TerminalButton({ href, title, description, command, theme = 'green' }: { href: string, title: string, description: string, command: string, theme?: 'green' | 'white' }) {
    const [isHovered, setIsHovered] = useState(false);

    const activeColor = theme === 'green' ? 'text-green-500' : 'text-white';
    const borderColor = theme === 'green' ? 'group-hover:border-green-500' : 'group-hover:border-white';
    const bgColor = theme === 'green' ? 'bg-green-500/10' : 'bg-white/5';

    return (
        <a
            href={href}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative flex flex-col p-6 border border-neutral-800 ${borderColor} transition-colors overflow-hidden h-full`}
        >
            <div className={`absolute inset-0 ${bgColor} scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500`}></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <h3 className={`text-white font-bold mb-2 group-hover:tracking-wider transition-all duration-300`}>{title}</h3>
                    <p className="text-neutral-400 text-sm mb-6">{description}</p>
                </div>

                <div className="font-mono text-xs min-h-[20px] flex items-center">
                    <span className={`${activeColor}`}>
                        {isHovered ? (
                            <Typewriter text={command} />
                        ) : (
                            <span className="opacity-50 group-hover:opacity-100 transition-opacity">_</span>
                        )}
                    </span>
                </div>
            </div>
        </a>
    );
}

const Typewriter = ({ text, speed = 30 }: { text: string, speed?: number }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        setDisplayedText('');
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return (
        <span>{displayedText}<span className="animate-pulse">_</span></span>
    );
};
