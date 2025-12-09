'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/src/shared/ui/components/Card';
import { useDistributionChartController } from '../hooks/useDistributionChartController';

export const DistributionChart = () => {
    const { data, isLoading, COLORS } = useDistributionChartController();

    return (
        <Card className="p-6 h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Proporsi Penyaluran (Program)</h3>

            <div className="flex-1 w-full min-h-0">
                {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center bg-gray-50 dark:bg-dark-main rounded-lg animate-pulse">
                        <span className="text-gray-400">Memuat grafik...</span>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={(data as unknown) as Record<string, unknown>[]}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="total_amount"
                                nameKey="program_name"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)}
                            />
                            <Legend
                                layout="vertical"
                                verticalAlign="middle"
                                align="right"
                                iconType="circle"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </Card>
    );
};