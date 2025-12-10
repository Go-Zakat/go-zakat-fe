'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';

export const ServerStatusBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800"
                >
                    <div className="container mx-auto px-4 py-3 flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 text-sm text-amber-800 dark:text-amber-200">
                            <Info className="w-5 h-5 shrink-0 text-amber-500" />
                            <p className="leading-snug">
                                Mohon maaf jika aplikasi terasa lambat, karena API menggunakan server gratis.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-amber-500 hover:text-amber-700 dark:hover:text-amber-300 transition-colors p-1"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
