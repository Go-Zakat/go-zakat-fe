'use client';

import { useState, useMemo, useCallback } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/src/shared/ui/components/Card';
import { useDistributionChartController } from '../hooks/useDistributionChartController';

// 1. KEMBALI KE ASAL: Hapus index signature '[key: string]: any' agar ESLint senang
interface DistributionData {
    program_name: string;
    total_amount: number | string;
}

interface ActiveShapeProps {
    cx: number;
    cy: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    payload?: DistributionData;
    percent?: number;
    value?: number;
}

// Helper to format currency
const formatCurrency = (value: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

const renderActiveShape = (props: unknown) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props as ActiveShapeProps;

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 8}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                cornerRadius={8}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={innerRadius - 8}
                outerRadius={innerRadius - 4}
                fill={fill}
            />
        </g>
    );
};

export const DistributionChart = () => {
    const { data, isLoading, COLORS } = useDistributionChartController();
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

    const chartData = data as DistributionData[];

    const totalAmount = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + Number(curr.total_amount || 0), 0);
    }, [chartData]);

    const activeItem = activeIndex !== undefined ? chartData[activeIndex] : null;
    const displayLabel = activeItem ? activeItem.program_name : 'Total Penyaluran';
    const displayValue = activeItem ? Number(activeItem.total_amount) : totalAmount;
    const displayPercentage = activeItem
        ? ((Number(activeItem.total_amount) / totalAmount) * 100).toFixed(1)
        : '100';

    const onPieEnter = useCallback((_: unknown, index: number) => {
        setActiveIndex(index);
    }, []);

    const onPieLeave = useCallback(() => {
        setActiveIndex(undefined);
    }, []);

    return (
        <Card className="p-6 h-[450px] flex flex-col border bg-white dark:bg-dark-paper overflow-hidden relative">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 z-10">Proporsi Penyaluran</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 z-10">Distribusi dana berdasarkan program</p>

            <div className="flex flex-col lg:flex-row items-center justify-center flex-1 gap-4">
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-start lg:pl-4 space-y-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex !== undefined ? 'active' : 'total'}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col"
                        >
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {displayLabel}
                            </span>
                            <div className="flex items-baseline gap-2 mt-1">
                                <motion.h2
                                    className="text-2xl xl:text-3xl font-extrabold text-gray-900 dark:text-white"
                                    layoutId="amount"
                                >
                                    {isLoading ? '...' : formatCurrency(displayValue)}
                                </motion.h2>
                            </div>

                            <div className="flex items-center mt-3 gap-2">
                                <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${activeItem
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                }`}>
                                    {displayPercentage}%
                                </span>
                                <span className="text-xs text-gray-400">
                                    {activeItem ? 'Kontribusi' : 'Dari target tahunan'}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="w-full lg:w-1/2 h-[220px] relative">
                    {isLoading ? (
                        <div className="h-full w-full flex items-center justify-center bg-gray-50 dark:bg-dark-main rounded-lg animate-pulse">
                            <span className="text-gray-400 font-medium">Memuat...</span>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                {/* 2. FIX UTAMA DI SINI: */}
                                <Pie
                                    activeShape={renderActiveShape}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    data={chartData as any[]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={95}
                                    paddingAngle={3}
                                    cornerRadius={8}
                                    dataKey="total_amount"
                                    nameKey="program_name"
                                    onMouseEnter={onPieEnter}
                                    onMouseLeave={onPieLeave}
                                    stroke="none"
                                >
                                    {chartData.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            className="transition-all duration-300 outline-none"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip cursor={false} contentStyle={{ display: 'none' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {!isLoading && (
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2 pt-4 border-t border-gray-100 dark:border-dark-border">
                    {chartData.slice(0, 4).map((entry, index) => (
                        <div key={index} className="flex items-center gap-1.5">
                            <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate max-w-[120px]">
                                {entry.program_name}
                            </span>
                        </div>
                    ))}
                    {chartData.length > 4 && (
                        <span className="text-xs text-gray-400 italic">+{chartData.length - 4} lainnya</span>
                    )}
                </div>
            )}
        </Card>
    );
};