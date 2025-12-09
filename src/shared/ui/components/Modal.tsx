'use client';

import { ReactNode, useEffect, useState} from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    className?: string;
}

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    className = '',
}: ModalProps) => {
    const [mounted, setMounted] = useState(false);

    // EFFECT 1: Handle Hydration
    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    // EFFECT 2: Handle Scroll Lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Prevent hydration mismatch
    if (!mounted) return null;

    // Gunakan createPortal agar modal di-render di luar root aplikasi
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop Animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                        className={clsx(
                            "relative bg-white dark:bg-dark-paper rounded-lg shadow-xl w-full max-w-md overflow-hidden z-10",
                            className
                        )}
                        // Stop propagation agar klik di dalam modal tidak menutup modal
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-dark-border bg-white dark:bg-dark-paper">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
                                {title}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500 dark:hover:text-text-primary transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-border"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};