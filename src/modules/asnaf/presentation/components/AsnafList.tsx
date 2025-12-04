'use client';

import { useEffect, useState } from 'react';
import { useAsnafList } from '../../application/useAsnafList';
import {
    Eye,
    Edit,
    Trash2,
    Search,
    Plus,
    Calendar,
    Filter,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';
import { clsx } from 'clsx';

export const AsnafList = () => {
    const { getAsnafList, items, meta, isLoading } = useAsnafList();
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        getAsnafList({ page: 1, limit: 10 });
    }, []);

    const tabs = [
        { id: 'all', label: 'Semua Asnaf', count: meta?.total || 0 },
        { id: 'active', label: 'Aktif', count: meta?.total || 0, color: 'bg-emerald-100 text-emerald-600' },
        { id: 'inactive', label: 'Non-Aktif', count: 0, color: 'bg-gray-100 text-gray-600' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-100 px-6 pt-6">
                <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                'pb-4 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2',
                                activeTab === tab.id
                                    ? 'text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            )}
                        >
                            {tab.label}
                            <span className={clsx(
                                'px-2 py-0.5 rounded-full text-xs',
                                activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                            )}>
                                {tab.count}
                            </span>
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Action Bar */}
            <div className="p-6 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari Asnaf..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                        />
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="DD/MM/YYYY"
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-40"
                            />
                        </div>
                    </div>
                </div>

                <Link
                    href="/asnaf/new"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full lg:w-auto justify-center"
                >
                    <Plus size={18} />
                    Tambah Asnaf
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50/50 border-y border-gray-100">
                            <th className="px-6 py-4 text-left">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Asnaf</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deskripsi</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal Dibuat</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    Memuat data...
                                </td>
                            </tr>
                        ) : items.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    Belum ada data asnaf
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                                {item.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-900">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                        {item.description || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                            Aktif
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-md transition-colors" title="Edit">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-1.5 hover:bg-gray-100 text-gray-600 rounded-md transition-colors" title="Detail">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-1.5 hover:bg-red-50 text-red-600 rounded-md transition-colors" title="Hapus">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Rows per page:</span>
                    <select className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </select>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>1-5 of {meta?.total || 0}</span>
                    <div className="flex items-center gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded disabled:opacity-50" disabled>
                            <ChevronLeft size={18} />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded disabled:opacity-50" disabled>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
