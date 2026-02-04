'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    const sections = [
        { id: 'hero', label: 'ACCUEIL' },
        { id: 'capabilities', label: 'COMPETENCES' },
        { id: 'process', label: 'PROCESSUS' },
        { id: 'projects', label: 'PROJETS' },
        { id: 'contact', label: 'CONTACT' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);

            // Simple active section detection based on scroll position + offset
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section.id);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string, e: React.MouseEvent) => {
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
        <>
            <AnimatePresence>
                {!isScrolled && (
                    <motion.header
                        key="horizontal-header"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-14 rounded-xl px-6 flex items-center justify-between z-50 bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden"
                    >
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-white">VALENTIN_RM</span>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        </div>

                        {/* Nav Links */}
                        <nav className="flex items-center gap-1">
                            {sections.slice(1).map((section) => ( // Skip Home for navbar if desired, or keep all. Logic below replicates original explicit links
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={(e) => scrollToSection(section.id, e)}
                                    className="px-4 py-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors uppercase"
                                >
                                    /{section.label}
                                </a>
                            ))}
                        </nav>
                    </motion.header>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isScrolled && (
                    <motion.nav
                        key="vertical-tracker"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className={`fixed top-1/2 right-6 -translate-y-1/2 z-50 bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 ease-in-out flex flex-col justify-center ${isHovered
                            ? 'w-38 py-6 rounded-3xl gap-6 px-4' // EXPANDED
                            : 'w-12 py-6 rounded-full items-center gap-6 px-4' // COLLAPSED
                            }`}
                    >
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className="relative group cursor-pointer flex gap-3 w-full justify-center"
                                onClick={(e) => scrollToSection(section.id, e as any)}
                            >
                                {/* Label (Visible on Hover of Navbar) */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.span
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 5 }}
                                            transition={{ duration: 0.2 }}
                                            className={`text-[10px] font-mono whitespace-nowrap ${activeSection === section.id
                                                ? 'text-white font-bold'
                                                : 'text-neutral-500 group-hover:text-neutral-300'
                                                }`}
                                        >
                                            {section.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* Active Indicator (Large Green Dot) vs Inactive (Small Grey Dot) */}
                                <motion.div
                                    layout
                                    className={`rounded-full transition-all duration-300 flex-shrink-0  ${isHovered ? 'ml-auto' : ''
                                        } ${activeSection === section.id
                                            ? 'w-3 h-3 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                                            : 'w-1.5 h-1.5 bg-neutral-600 group-hover:bg-neutral-400'
                                        }`}
                                />
                            </div>
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
}
