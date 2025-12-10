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
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="relative z-50 overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10">
                        <div className="container mx-auto px-4 py-3 relative flex items-center justify-center">

                            {/* Centered Content */}
                            <div className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-200 font-medium">
                                <Info className="w-4 h-4 text-amber-500 shrink-0" />
                                <p className="text-center leading-snug">
                                    Mohon maaf jika aplikasi terasa lambat, karena API menggunakan server gratis
                                </p>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="text-amber-500 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-900/30 transition-all duration-200"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
