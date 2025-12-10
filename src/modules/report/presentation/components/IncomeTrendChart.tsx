'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '@/src/shared/ui/components/Card';
import { useIncomeTrendController } from '../hooks/useIncomeTrendController';

// Konfigurasi Warna & Label
const CHART_CONFIG = {
    zakat_fitrah: { label: 'Zakat Fitrah', color: '#3B82F6' }, // Biru
    zakat_maal: { label: 'Zakat Maal', color: '#10B981' },   // Hijau
    infaq: { label: 'Infaq', color: '#8B5CF6' },             // Ungu
    sadaqah: { label: 'Sadaqah', color: '#F43F5E' }          // Merah
};

export const IncomeTrendChart = () => {
    const { data, isLoading, formatYAxis, formatXAxis } = useIncomeTrendController();

    return (
        <Card className="p-6 h-[450px] flex flex-col border bg-white dark:bg-dark-paper">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tren Pemasukan</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Analisis pemasukan bulanan tahun ini</p>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center bg-gray-50 dark:bg-dark-main rounded-lg animate-pulse">
                        <span className="text-gray-400 font-medium">Memuat grafik...</span>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        {/* PERBAIKAN 1: Tambahkan margin kiri agar label Y-Axis tidak tertimbun */}
                        <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorFitrah" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={CHART_CONFIG.zakat_fitrah.color} stopOpacity={0.2} />
                                    <stop offset="95%" stopColor={CHART_CONFIG.zakat_fitrah.color} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorMaal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={CHART_CONFIG.zakat_maal.color} stopOpacity={0.2} />
                                    <stop offset="95%" stopColor={CHART_CONFIG.zakat_maal.color} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorInfaq" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={CHART_CONFIG.infaq.color} stopOpacity={0.2} />
                                    <stop offset="95%" stopColor={CHART_CONFIG.infaq.color} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorSadaqah" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={CHART_CONFIG.sadaqah.color} stopOpacity={0.2} />
                                    <stop offset="95%" stopColor={CHART_CONFIG.sadaqah.color} stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid-stroke)" />

                            <XAxis
                                dataKey="period"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                tickFormatter={formatXAxis}
                                dy={10}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                tickFormatter={formatYAxis}
                                width={55} /* PERBAIKAN 2: Lebar area label diperbesar */
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                    padding: '12px'
                                }}
                                itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                                labelStyle={{ color: '#374151', fontWeight: 'bold', marginBottom: '8px' }}
                                /* PERBAIKAN 3: Formatter hanya return nilai, biarkan Recharts handle Namanya */
                                formatter={(value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)}
                                labelFormatter={(label) => formatXAxis(label as string)}
                            />

                            <Legend
                                verticalAlign="top"
                                height={36}
                                iconType="circle"
                                wrapperStyle={{ top: 10, fontSize: '12px' }}
                            />

                            <Area
                                type="monotone"
                                dataKey="zakat_maal"
                                name={CHART_CONFIG.zakat_maal.label}
                                stroke={CHART_CONFIG.zakat_maal.color}
                                fill="url(#colorMaal)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="zakat_fitrah"
                                name={CHART_CONFIG.zakat_fitrah.label}
                                stroke={CHART_CONFIG.zakat_fitrah.color}
                                fill="url(#colorFitrah)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="infaq"
                                name={CHART_CONFIG.infaq.label}
                                stroke={CHART_CONFIG.infaq.color}
                                fill="url(#colorInfaq)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="sadaqah"
                                name={CHART_CONFIG.sadaqah.label}
                                stroke={CHART_CONFIG.sadaqah.color}
                                fill="url(#colorSadaqah)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </Card>
    );
};