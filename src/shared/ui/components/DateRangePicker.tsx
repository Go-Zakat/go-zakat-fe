'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

    // Initial view date (based on start date or today)
    const [viewDate, setViewDate] = useState(() => startDate ? new Date(startDate) : new Date());

    // Temporary selection draft
    const [draftStart, setDraftStart] = useState<string>(startDate);
    const [draftEnd, setDraftEnd] = useState<string>(endDate);

    // Sync draft with props when opening
    useEffect(() => {
        if (isOpen) {
            setDraftStart(startDate);
            setDraftEnd(endDate);
            setViewDate(startDate ? new Date(startDate) : new Date());
        }
    }, [isOpen, startDate, endDate]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
        onChange(draftStart, draftEnd || draftStart); // If end is empty, treat as single day? Or force end? Let's assume range logic.
        // Actually, let's keep end empty if not selected? No, easier to just force same day if user clicks apply without end.
        // But better UX: user selects start, then end.
        if (!draftEnd) {
            onChange(draftStart, draftStart);
        } else {
            onChange(draftStart, draftEnd);
        }
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

    const changeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newDate = new Date(viewDate);
        newDate.setFullYear(parseInt(event.target.value));
        setViewDate(newDate);
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
            const date = new Date(year, month, day);
            // Local date string YYYY-MM-DD
            // Fix timezone issue by working with date components directly
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            let isSelected = false;
            let isInRange = false;
            let isStart = false;
            let isEnd = false;

            if (draftStart === dateStr) { isSelected = true; isStart = true; }
            if (draftEnd === dateStr) { isSelected = true; isEnd = true; }
            if (draftStart && draftEnd && dateStr > draftStart && dateStr < draftEnd) isInRange = true;

            days.push(
                <button
                    key={dateStr}
                    onClick={() => handleDateClick(dateStr)}
                    className={clsx(
                        "h-9 w-9 text-sm rounded-full flex items-center justify-center transition-all",
                        isStart || isEnd ? "bg-primary-blue text-white hover:bg-blue-600" :
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
                    "flex items-center justify-between gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-all bg-white dark:bg-dark-paper min-h-[42px]",
                    // Input.tsx styles: focus:ring-2 focus:ring-blue-500, border-gray-300 dark:border-gray-700
                    isActive || isOpen ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    <CalendarIcon size={18} className={clsx("shrink-0", isActive ? "text-blue-500" : "text-gray-400")} />
                    <span className={clsx("truncate", isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400")}>
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

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 z-50 p-4 bg-white dark:bg-dark-paper rounded-xl shadow-xl border border-gray-200 dark:border-dark-border w-[320px] animate-in fade-in slide-in-from-top-2 duration-200">

                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                            <ChevronLeft size={20} />
                        </button>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {viewDate.toLocaleDateString('id-ID', { month: 'long' })}
                            </span>
                            <select
                                value={viewDate.getFullYear()}
                                onChange={changeYear}
                                className="bg-transparent text-sm font-semibold text-gray-900 dark:text-white cursor-pointer focus:outline-none"
                            >
                                {years.map(y => <option key={y} value={y} className="text-gray-900">{y}</option>)}
                            </select>
                        </div>
                        <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Day Names */}
                    <div className="grid grid-cols-7 mb-2 text-center">
                        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                            <div key={day} className="text-xs font-medium text-gray-400 py-1">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-y-1 gap-x-0 mb-4 place-items-center">
                        {renderCalendarDays()}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-dark-border">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {draftStart ? formatDateDisplay(draftStart) : '-'}
                            {draftStart && ' s/d '}
                            {draftEnd ? formatDateDisplay(draftEnd) : (draftStart ? '...' : '')}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleApply}
                                disabled={!draftStart}
                            >
                                Terapkan
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
