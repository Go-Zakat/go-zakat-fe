'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, X, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/src/shared/ui/components/Button';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

interface DateRangePickerProps {
    startDate: string;
    endDate: string;
    onChange: (start: string, end: string) => void;
    className?: string;
    placeholder?: string;
}

export const DateRangePicker = ({
                                    startDate,
                                    endDate,
                                    onChange,
                                    className,
                                    placeholder = 'Pilih Periode'
                                }: DateRangePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Year dropdown state
    const [isYearOpen, setIsYearOpen] = useState(false);
    const yearContainerRef = useRef<HTMLDivElement>(null);

    // Initial view date (based on start date or today)
    const [viewDate, setViewDate] = useState(() => startDate ? new Date(startDate) : new Date());

    // Temporary selection draft
    const [draftStart, setDraftStart] = useState<string>(startDate);
    const [draftEnd, setDraftEnd] = useState<string>(endDate);

    // Fix: Handle toggle logic separately to avoid setState in useEffect warning
    const handleToggleOpen = () => {
        if (!isOpen) {
            // Sync draft with props when OPENING
            setDraftStart(startDate);
            setDraftEnd(endDate);
            setViewDate(startDate ? new Date(startDate) : new Date());
        }
        setIsOpen(!isOpen);
    };

    // Handle click outside for main picker
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsYearOpen(false); // Close year dropdown too
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle click outside for year dropdown
    useEffect(() => {
        const handleClickOutsideYear = (event: MouseEvent) => {
            if (yearContainerRef.current && !yearContainerRef.current.contains(event.target as Node)) {
                setIsYearOpen(false);
            }
        };
        if (isYearOpen) {
            document.addEventListener('mousedown', handleClickOutsideYear);
        }
        return () => document.removeEventListener('mousedown', handleClickOutsideYear);
    }, [isYearOpen]);

    const handleDateClick = (dateStr: string) => {
        if (!draftStart || (draftStart && draftEnd)) {
            // Start new selection
            setDraftStart(dateStr);
            setDraftEnd('');
        } else {
            // Complete selection
            if (dateStr < draftStart) {
                setDraftEnd(draftStart);
                setDraftStart(dateStr);
            } else {
                setDraftEnd(dateStr);
            }
        }
    };

    const handleApply = () => {
        // Ensure logical order before applying
        const finalStart = draftStart;
        const finalEnd = draftEnd || draftStart;

        onChange(finalStart, finalEnd);
        setIsOpen(false);
    };

    const handleClear = () => {
        setDraftStart('');
        setDraftEnd('');
        onChange('', '');
        setIsOpen(false);
    };

    const changeMonth = (offset: number) => {
        const newDate = new Date(viewDate);
        newDate.setMonth(newDate.getMonth() + offset);
        setViewDate(newDate);
    };

    const changeYear = (year: number) => {
        const newDate = new Date(viewDate);
        newDate.setFullYear(year);
        setViewDate(newDate);
        setIsYearOpen(false);
    };

    // Calendar Grid Generation
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const renderCalendarDays = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
        }

        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            // Fix: Removed unused 'isSelected' variable
            let isInRange = false;
            let isStart = false;
            let isEnd = false;

            if (draftStart === dateStr) { isStart = true; }
            if (draftEnd === dateStr) { isEnd = true; }
            if (draftStart && draftEnd && dateStr > draftStart && dateStr < draftEnd) isInRange = true;

            days.push(
                <button
                    key={dateStr}
                    onClick={() => handleDateClick(dateStr)}
                    className={clsx(
                        "h-9 w-9 rounded-full flex items-center justify-center text-sm transition-colors",
                        isStart || isEnd ? "bg-blue-600 text-white hover:bg-blue-700" :
                            isInRange ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-none" :
                                "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    )}
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    const formatDateDisplay = (dateStr: string) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const displayValue = startDate && endDate
        ? `${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)}`
        : startDate
            ? `Dari: ${formatDateDisplay(startDate)}`
            : endDate
                ? `Sampai: ${formatDateDisplay(endDate)}`
                : placeholder;

    const isActive = !!startDate || !!endDate;

    // Years for dropdown (10 years back, 10 years forward)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

    return (
        <div className={twMerge("relative", className)} ref={containerRef}>
            <div
                className={clsx(
                    "flex items-center justify-between gap-2 px-4 py-2 border rounded-lg cursor-pointer bg-white dark:bg-dark-paper min-h-[42px] transition-all",
                    isActive || isOpen ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                )}
                onClick={handleToggleOpen}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    <CalendarIcon size={18} className={clsx("shrink-0", isActive ? "text-blue-500" : "text-gray-400")} />
                    <span className={clsx("truncate text-sm", isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400")}>
                        {displayValue}
                    </span>
                </div>
                {(startDate || endDate) ? (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClear();
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X size={14} />
                    </button>
                ) : null}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 z-50 p-4 bg-white dark:bg-dark-paper rounded-xl shadow-xl border border-gray-200 dark:border-dark-border w-[320px]"
                    >

                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                                <ChevronLeft size={20} />
                            </button>

                            {/* Year Selector */}
                            <div className="relative" ref={yearContainerRef}>
                                <div
                                    className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition-colors"
                                    onClick={() => setIsYearOpen(!isYearOpen)}
                                >
                                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                                        {viewDate.toLocaleDateString('id-ID', { month: 'long' })} {viewDate.getFullYear()}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isYearOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown size={14} className="text-gray-500" />
                                    </motion.div>
                                </div>

                                <AnimatePresence>
                                    {isYearOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -5, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -5, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-24 bg-white dark:bg-dark-paper rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 max-h-48 overflow-y-auto z-50 py-1"
                                        >
                                            {years.map(y => (
                                                <div
                                                    key={y}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        changeYear(y);
                                                    }}
                                                    className={clsx(
                                                        "px-3 py-1.5 text-sm cursor-pointer text-center",
                                                        y === viewDate.getFullYear()
                                                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                    )}
                                                >
                                                    {y}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Day Names */}
                        <div className="grid grid-cols-7 mb-2 text-center">
                            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                                <div key={day} className="text-xs font-medium text-gray-400 py-1 uppercase tracking-wider">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-y-1 gap-x-0 mb-4 place-items-center">
                            {renderCalendarDays()}
                        </div>

                        {/* Actions Footer */}
                        <div className="flex flex-col gap-3 pt-3 border-t border-gray-100 dark:border-dark-border">
                            {/* Date Info */}
                            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                {draftStart ? formatDateDisplay(draftStart) : 'Pilih tanggal awal'}
                                {draftStart && ' - '}
                                {draftEnd ? formatDateDisplay(draftEnd) : (draftStart ? '...' : '')}
                            </div>

                            {/* Buttons Aligned Right */}
                            <div className="flex gap-2 justify-end">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    onClick={handleApply}
                                    disabled={!draftStart}
                                >
                                    Terapkan
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};