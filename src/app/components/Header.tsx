'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    const sections = [
        { id: 'hero', label: '/ACCUEIL' },
        { id: 'capabilities', label: '/COMPETENCES' },
        { id: 'process', label: '/PROCESSUS' },
        { id: 'projects', label: '/PROJETS' },
        { id: 'contact', label: '/CONTACT' },
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

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        if (isHovered) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isHovered]);


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
                        className="hidden md:fixed top-6 left-1/2 md:-translate-x-1/2 w-[90%] max-w-5xl h-14 rounded-xl px-6 md:flex items-center justify-between z-50 bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden"
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
                                    className="px-4 py-2 font-mono text-xs text-neutral-400 hover:text-green-500 transition-colors uppercase"
                                >
                                    {section.label}
                                </a>
                            ))}
                        </nav>
                    </motion.header>
                )}
            </AnimatePresence>


            {/* Mobile Header - Always Visible */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10"
            >
                <div className="flex items-center justify-between px-4 h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 border border-green-500/30 bg-green-500/10 flex items-center justify-center">
                            <span className="font-mono text-xs font-bold text-green-500">VR</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-mono text-xs font-bold text-white tracking-tight">VALENTIN RM</span>
                            <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-wider">Full Stack Dev</span>
                        </div>
                    </div>

                    {/* Burger Menu */}
                    <button
                        onClick={() => setIsHovered(!isHovered)}
                        className="relative w-10 h-10 flex items-center justify-center border border-white/10 bg-neutral-900 hover:border-green-500/50 transition-colors"
                    >
                        <div className="w-5 flex flex-col gap-1">
                            <motion.div
                                animate={isHovered ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                                className="h-[2px] w-full bg-white"
                            />
                            <motion.div
                                animate={isHovered ? { opacity: 0 } : { opacity: 1 }}
                                className="h-[2px] w-full bg-white"
                            />
                            <motion.div
                                animate={isHovered ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                                className="h-[2px] w-full bg-white"
                            />
                        </div>
                    </button>
                </div>
            </motion.header>

            {/* Mobile Full Screen Menu */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed inset-0 z-40 bg-black/98 backdrop-blur-2xl"
                    >
                        <div className="flex flex-col items-center justify-center h-full px-6">
                            {/* Menu Items */}
                            <nav className="flex flex-col gap-6 w-full max-w-md">
                                {sections.map((section, index) => (
                                    <motion.div
                                        key={section.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <a
                                            href={`#${section.id}`}
                                            onClick={(e) => {
                                                scrollToSection(section.id, e);
                                                setIsHovered(false);
                                            }}
                                            className="group relative flex items-center justify-between py-4 border-b border-white/5 hover:border-green-500/30 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="font-mono text-[10px] text-neutral-600">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <span className={`font-sans text-2xl font-bold tracking-tight transition-colors ${activeSection === section.id
                                                    ? 'text-green-500'
                                                    : 'text-white group-hover:text-green-500'
                                                    }`}>
                                                    {section.label.replace('/', '')}
                                                </span>
                                            </div>
                                            <motion.div
                                                className={`w-2 h-2 rounded-full ${activeSection === section.id
                                                    ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]'
                                                    : 'bg-neutral-700 group-hover:bg-green-500'
                                                    }`}
                                                animate={activeSection === section.id ? { scale: [1, 1.3, 1] } : {}}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        </a>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Footer Info */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="absolute bottom-8 left-0 right-0 px-6"
                            >
                                <div className="flex items-center justify-between text-xs font-mono text-neutral-600 border-t border-white/5 pt-4">
                                    <span>STATUS: AVAILABLE</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-green-500">ONLINE</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
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
                        className={`hidden md:flex fixed top-1/2 right-6 -translate-y-1/2 z-50 bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden transition-[width,height,padding,border-radius] duration-300 ease-in-out flex-col justify-center ${isHovered
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
