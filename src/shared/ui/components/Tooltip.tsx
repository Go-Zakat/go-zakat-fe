'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    className?: string; // Class for the trigger wrapper
    contentClassName?: string; // Class for the tooltip content
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

    const updatePosition = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            // Default position: above the trigger, centered horizontally
            // Note: We might want to make this configurable later, but for snippets this is a good default
            setPosition({
                top: rect.top + window.scrollY, // Calculate absolute top
                left: rect.left + window.scrollX, // Calculate absolute left
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

    // Portal target: document.body (only available on client)
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!content) return <>{children}</>;

    return (
        <div
            ref={triggerRef}
            className={`relative inline-block ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}

            {mounted && isVisible && createPortal(
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            style={{
                                position: 'absolute',
                                top: position.top, // We will offset this using translateY in CSS or transform
                                left: position.left,
                                zIndex: 9999, // Ensure it's on top of everything
                            }}
                            className="pointer-events-none" // Optional: let clicks pass through if just information
                        >
                            {/* 
                                Wrapper to position the tooltip accurately relative to the trigger.
                                We move it UP by 100% of its own height + some margin.
                                We can't know the height easily without ref, but typical tooltips go above.
                                
                                Strategy: 
                                Render it at the *trigger's top-left* coordinate.
                                Then transform: translate(-50%, -100%) to center and move up? NO.
                                
                                For "Snippet" style (like VSCode intellisense or large description popups),
                                it might be better to align left-to-left or just float above/below.
                                
                                Let's try: Align Top-Left of tooltip to Bottom-Left of trigger (Dropdown style) 
                                OR Top-Left of tooltip to Top-Left of trigger (Cover style).
                                
                                The user asked for "Description Snippet", which sounds like "Expand this item".
                                So let's align it exactly over the text or slightly floated.
                                
                                Let's go with: Positioned slightly below the cursor/trigger or "Pop over".
                                Given table cells, a "Pop over" (floating just above/below) is safest.
                                
                                Let's align: 
                                top: rect.bottom + 8px
                                left: rect.left + (rect.width / 2)
                                transform: translateX(-50%)
                            */}
                            <div
                                className={`
                                    bg-gray-900 dark:bg-gray-800 text-white 
                                    text-xs sm:text-sm rounded-lg py-2 px-3 shadow-xl 
                                    max-w-xs sm:max-w-sm md:max-w-md break-words
                                    border border-gray-700 dark:border-gray-600
                                    ${contentClassName}
                                `}
                                style={{
                                    // Adjust positioning logic here. 
                                    // For a description snippet, let's make it appear ABOVE the trigger if possible, or BELOW.
                                    // Let's mimic a "tooltip" standard: Centered above.
                                    transform: 'translate(-10%, -110%)', // Move up and slightly left adjust
                                    marginTop: '-8px'
                                }}
                            >
                                {content}
                                {/* Arrow (Optional, skipping for clean snippet look) */}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};
