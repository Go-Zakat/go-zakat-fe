'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedContainerProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const AnimatedContainer = ({ children, className, delay = 0 }: AnimatedContainerProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};