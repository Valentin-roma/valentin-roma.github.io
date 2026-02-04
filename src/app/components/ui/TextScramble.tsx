'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TextScrambleProps {
    children: string;
    className?: string;
}

const CHARACTERS = 'X0/#@$%&*=+<>[]{}|~';

export default function TextScramble({ children, className = '' }: TextScrambleProps) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const randomText = children
            .split('')
            .map(() => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)])
            .join('');

        setDisplayText(randomText);
        setCurrentIndex(0);

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev >= children.length) {
                    clearInterval(interval);
                    return prev;
                }

                setDisplayText((current) => {
                    const chars = current.split('');
                    chars[prev] = children[prev];

                    for (let i = prev + 1; i < chars.length; i++) {
                        if (Math.random() > 0.5) {
                            chars[i] = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                        }
                    }

                    return chars.join('');
                });

                return prev + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [children]);

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {displayText}
        </motion.span>
    );
}
