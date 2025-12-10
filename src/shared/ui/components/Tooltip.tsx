'use client';

import React, { useState, useRef, ReactNode, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    className?: string;
    contentClassName?: string;
}

const emptySubscribe = () => () => {};

export function useMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,  // Client: Selalu true
        () => false  // Server: Selalu false
    );
}

export const Tooltip = ({
    children,
    content,
    className = '',
    contentClassName = '',
}: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);

    // Ganti useState/useEffect lama dengan hook modern ini
    const isMounted = useMounted();

    const updatePosition = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }
    };

    const handleMouseEnter = () => {
        updatePosition();
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    if (!content) return <>{children}</>;

    return (
        <div
            ref={triggerRef}
            className={`relative inline-block ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}

            {/* Render Portal hanya jika sudah di Client (Mounted) */}
            {isMounted && typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            style={{
                                position: 'absolute',
                                top: position.top,
                                left: position.left,
                                zIndex: 9999,
                            }}
                            className="pointer-events-none"
                        >
                            <div
                                className={`
                                    bg-gray-900 dark:bg-gray-800 text-white 
                                    text-xs sm:text-sm rounded-lg py-2 px-3 shadow-xl 
                                    max-w-xs sm:max-w-sm md:max-w-md 
                                    border border-gray-700 dark:border-gray-600
                                    ${contentClassName}
                                `}
                                style={{
                                    transform: 'translate(-10%, -110%)',
                                    marginTop: '-8px'
                                }}
                            >
                                {content}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};