'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

const steps = [
    {
        number: '01',
        title: 'Découverte & Stratégie',
        description: "Analyse des besoins, compréhension de l'audience et définition des objectifs clés. C'est la fondation de tout projet réussi.",
    },
    {
        number: '02',
        title: 'UX/UI Design',
        description: "Création d'interfaces modernes, intuitives et esthétiques qui reflètent l'identité de marque.",
    },
    {
        number: '03',
        title: 'Développement',
        description: "Intégration propre et performante utilisant les dernières technologies (Next.js, React, Tailwind). Le code est optimisé pour la vitesse et le SEO.",
    },
    {
        number: '04',
        title: 'Livraison & Suivi',
        description: "Mise en ligne, tests finaux et formation si nécessaire. Assurer que tout fonctionne parfaitement et rester disponible pour les évolutions.",
    }
];

export default function Process() {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(-1);

    const { scrollYProgress } = useScroll({
        target: gridRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 400,
        damping: 50,
        restDelta: 0.001
    });

    // Check progress against estimated thresholds for each step
    useMotionValueEvent(scaleY, "change", (latest) => {
        if (latest < 0.1) setActiveIndex(-1);
        else if (latest < 0.35) setActiveIndex(0);
        else if (latest < 0.60) setActiveIndex(1);
        else if (latest < 0.85) setActiveIndex(2);
        else setActiveIndex(3);
    });

    return (
        <section id="process" ref={containerRef} className="relative py-32 bg-black text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-white mb-12"
                >
                    PROCESSUS
                </motion.h2>

                <div ref={gridRef} className="relative grid grid-cols-1 gap-12 lg:gap-24">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-white/10 hidden md:block lg:left-1/2 lg:-translate-x-1/2" />

                    {/* Progress Line */}
                    <motion.div
                        style={{ scaleY, transformOrigin: 'top' }}
                        className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-green-500 hidden md:block lg:left-1/2 lg:-translate-x-1/2"
                    />

                    {steps.map((step, index) => (
                        <ProcessStep
                            key={index}
                            step={step}
                            index={index}
                            activeIndex={activeIndex}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProcessStep({ step, index, activeIndex }: { step: any, index: number, activeIndex: number }) {
    const ref = useRef(null);
    const isGlobalActive = index <= activeIndex;
    const [isMobileActive, setIsMobileActive] = useState(false);

    // Mobile specific: Activate when card is EXACTLY in center of screen
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["center center", "center center"] // Hit only when center aligns with center
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Since the offset range is effectively 0 size (center to center), 
        // Framer Motion might give values around 0-1 as it passes through.
        // However, a better approach for "at center" highlight is "start end" to "end start" 
        // and checking if it's currently roughly in the middle.
        // A simpler robust way for mobile "center highlight" is to use a range like:
        // "start 60%" to "end 40%" (enters closely before center, leaves closely after)
    });

    // Actually, let's just use whileInView with a narrow margin for mobile
    // This is cleaner than managing complex scroll listeners manually per item.

    return (
        <motion.div
            ref={ref}
            className={`relative flex flex-col md:flex-row gap-8 lg:gap-16 group ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
            onViewportEnter={() => setIsMobileActive(true)}
            onViewportLeave={() => setIsMobileActive(false)}
            viewport={{ margin: "-45% 0px -45% 0px" }} // Triggers only when the element is in the middle 10% of the screen
        >
            {/* Timeline Dot (Mobile) */}
            <div className={`absolute left-[11px] top-0 w-4 h-4 rounded-full border-2 bg-black z-10 md:hidden transition-colors duration-500 ${isMobileActive ? 'border-green-500 bg-green-500' : 'border-green-500'
                }`} />

            {/* Timeline Dot (Desktop) */}
            <div className={`hidden md:absolute md:left-[13px] lg:left-1/2 lg:-translate-x-1/2 top-8 w-4 h-4 rounded-full border-2 bg-black z-10 transition-all duration-500 ${isGlobalActive
                ? 'border-green-500 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] scale-125'
                : 'border-green-500 group-hover:bg-green-500'
                }`} />

            <motion.div
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex-1 pl-12 md:pl-12 lg:pl-0 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}
            >
                <div className={`relative p-8 rounded-2xl bg-white/5 border transition-all duration-500 ${
                    // Desktop uses global active, Mobile uses local viewport active
                    (typeof window !== 'undefined' && window.innerWidth < 768 ? isMobileActive : isGlobalActive)
                        ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]'
                        : 'border-white/10 hover:border-green-500/50'
                    }`}>
                    <span className={`absolute -top-6 text-6xl font-bold text-white/5 font-mono select-none pointer-events-none ${index % 2 === 0 ? 'lg:right-7' : 'lg:left-7'
                        }`}>
                        {step.number}
                    </span>
                    <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${(typeof window !== 'undefined' && window.innerWidth < 768 ? isMobileActive : isGlobalActive) ? 'text-green-400' : 'text-white group-hover:text-green-400'
                        }`}>
                        {step.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                        {step.description}
                    </p>
                </div>
            </motion.div>

            <div className="hidden lg:block flex-1" />
        </motion.div>
    );
}
