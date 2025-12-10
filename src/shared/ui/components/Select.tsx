'use client';

import {useState, useRef, useEffect, SelectHTMLAttributes, ReactNode} from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Option {
    value: string | number;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: Option[];
    registration?: UseFormRegisterReturn;
    error?: FieldError;
    startIcon?: ReactNode;
    placeholder?: string;
}

export const Select = ({
    label,
    options,
    registration,
    error,
    className = '',
    startIcon,
    placeholder,
    ...props
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Fix: Menggunakan internal state hanya untuk kasus uncontrolled
    const [internalValue, setInternalValue] = useState<string | number>(
        (props.defaultValue as string | number) || ''
    );

    // Fix: Derived state logic. Jika props.value ada (controlled), gunakan itu.
    // Jika tidak, gunakan internalValue. Ini menghapus kebutuhan akan useEffect sinkronisasi.
    const isControlled = props.value !== undefined;
    const selectedValue = isControlled ? (props.value as string | number) : internalValue;

    // Internal ref to the hidden select element
    const selectRef = useRef<HTMLSelectElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option: Option) => {
        // Hanya update state internal jika komponen ini Uncontrolled
        if (!isControlled) {
            setInternalValue(option.value);
        }

        setIsOpen(false);

        if (selectRef.current) {
            // Kita tetap set value native element untuk memicu event react-hook-form
            selectRef.current.value = String(option.value);

            // Dispatch native change event for react-hook-form and other listeners
            const event = new Event('change', { bubbles: true });
            selectRef.current.dispatchEvent(event);
        }
    };

    const selectedOption = options.find((opt) => String(opt.value) === String(selectedValue));

    // Destructure registration to merge refs securely
    const { ref: registrationRef, ...registrationRest } = registration || {};

    return (
        <div className={twMerge("relative", className)} ref={containerRef}>
            {label && (
                <label
                    htmlFor={registration?.name || props.id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    {label}
                </label>
            )}

            {/* Custom Trigger */}
            <div
                className={clsx(
                    "relative w-full cursor-pointer bg-white dark:bg-dark-paper border rounded-lg transition-all duration-200 ease-in-out",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                    error ? "border-red-500" : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600",
                    isOpen && "ring-2 ring-blue-500 border-blue-500"
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={clsx(
                    "flex items-center py-2 pr-8 min-h-[42px]",
                    startIcon ? "pl-10" : "px-4"
                )}>
                    {startIcon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            {startIcon}
                        </div>
                    )}
                    <span className={clsx(
                        "block truncate",
                        selectedOption ? "text-gray-900 dark:text-white" : "text-gray-400"
                    )}>
                        {selectedOption ? selectedOption.label : (placeholder || 'Select an option')}
                    </span>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.div>
                </div>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute z-50 w-full mt-1 bg-white dark:bg-dark-paper border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto py-1 focus:outline-none"
                    >
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className={clsx(
                                    "relative cursor-pointer select-none py-2 pl-3 pr-9",
                                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                                    "text-gray-900 dark:text-gray-300",
                                    String(selectedValue) === String(option.value) && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                                )}
                            >
                                <span className="block truncate">
                                    {option.label}
                                </span>

                                {String(selectedValue) === String(option.value) && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 dark:text-blue-400">
                                        <Check className="w-4 h-4" />
                                    </span>
                                )}
                            </li>
                        ))}
                        {options.length === 0 && (
                            <li className="py-2 px-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                                No options
                            </li>
                        )}
                    </motion.ul>
                )}
            </AnimatePresence>

            {/* Hidden Native Select for Form Data */}
            <select
                {...registrationRest}
                ref={(e) => {
                    registrationRef?.(e);
                    selectRef.current = e;
                }}
                className="sr-only"
                tabIndex={-1}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <p className="mt-1 text-xs text-red-500">{error.message}</p>
            )}
        </div>
    );
};