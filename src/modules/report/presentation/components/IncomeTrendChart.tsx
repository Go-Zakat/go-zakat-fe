'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/src/shared/ui/components/Card';
import { useIncomeTrendController } from '../hooks/useIncomeTrendController';

export const IncomeTrendChart = () => {
    const { data, isLoading, formatYAxis } = useIncomeTrendController();

    return (
        <Card className="p-6 h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Tren Pemasukan ZISWAF</h3>

            <div className="flex-1 w-full min-h-0">
                {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center bg-gray-50 dark:bg-dark-main rounded-lg animate-pulse">
                        <span className="text-gray-400">Memuat grafik...</span>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis
                                dataKey="period"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                tickFormatter={formatYAxis}
                            />
                            <Tooltip
                                cursor={{ fill: '#F3F4F6' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                formatter={(value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)}
                            />
                            <Legend />
                            <Bar dataKey="zakat_maal" name="Zakat Maal" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
                            <Bar dataKey="zakat_fitrah" name="Zakat Fitrah" stackId="a" fill="#3B82F6" radius={[0, 0, 0, 0]} />
                            <Bar dataKey="infaq" name="Infaq" stackId="a" fill="#8B5CF6" radius={[0, 0, 0, 0]} />
                            <Bar dataKey="sadaqah" name="Sadaqah" stackId="a" fill="#F43F5E" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </Card>
    );
};