'use client';

import { Input } from '@/src/shared/ui/components/Input';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import Link from 'next/link';
import { Textarea } from '@/src/shared/ui/components/Textarea';
import { Select } from '@/src/shared/ui/components/Select';
import { useDonationReceiptUpdateController } from '../hooks/useDonationReceiptUpdateController';
import { FUND_TYPES, PAYMENT_METHODS, ZAKAT_TYPES } from '@/src/shared/config/constants';
import { Plus, Trash2 } from 'lucide-react';

interface DonationReceiptUpdateFormProps {
    id: string;
}

export const DonationReceiptUpdateForm = ({ id }: DonationReceiptUpdateFormProps) => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit,
        muzakkiList,
        fields,
        append,
        remove,
        watch
    } = useDonationReceiptUpdateController(id);

    const items = watch('items');

    // Calculate Total Amount
    const totalAmount = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    const muzakkiOptions = [
        { value: '', label: 'Pilih Muzakki' },
        ...muzakkiList.map(m => ({
            value: m.id,
            label: m.name
        }))
    ];

    const paymentMethodOptions = [
        { value: PAYMENT_METHODS.CASH, label: 'Tunai' },
        { value: PAYMENT_METHODS.BANK_TRANSFER, label: 'Transfer Bank' },
        { value: PAYMENT_METHODS.E_WALLET, label: 'E-Wallet' },
        { value: PAYMENT_METHODS.QRIS, label: 'QRIS' },
    ];

    const fundTypeOptions = [
        { value: FUND_TYPES.ZAKAT, label: 'Zakat' },
        { value: FUND_TYPES.INFAQ, label: 'Infaq' },
        { value: FUND_TYPES.SADAQAH, label: 'Sadaqah' },
    ];

    const zakatTypeOptions = [
        { value: ZAKAT_TYPES.MAAL, label: 'Zakat Maal' },
        { value: ZAKAT_TYPES.FITRAH, label: 'Zakat Fitrah' },
    ];

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Header Information */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary mb-4">Informasi Kwitansi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Nomor Kwitansi"
                            placeholder="Nomor Kwitansi"
                            error={errors.receipt_number}
                            registration={register('receipt_number')}
                        />
                        <Input
                            type="date"
                            label="Tanggal"
                            error={errors.receipt_date}
                            registration={register('receipt_date')}
                        />
                        <Select
                            label="Muzakki"
                            options={muzakkiOptions}
                            error={errors.muzakki_id}
                            registration={register('muzakki_id')}
                        />
                        <Select
                            label="Metode Pembayaran"
                            options={paymentMethodOptions}
                            error={errors.payment_method}
                            registration={register('payment_method')}
                        />
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-dark-border" />

                {/* Donation Items */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">Detail Donasi</h3>
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => append({ amount: 0, fund_type: 'zakat' })}
                        >
                            <Plus size={16} /> Tambah Item
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="p-4 bg-gray-50 dark:bg-dark-main rounded-lg border border-gray-100 dark:border-dark-border relative">
                                <div className="absolute right-2 top-2">
                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                    <div className="md:col-span-3">
                                        <Select
                                            label="Jenis Dana"
                                            options={fundTypeOptions}
                                            error={errors.items?.[index]?.fund_type}
                                            registration={register(`items.${index}.fund_type`)}
                                        />
                                    </div>

                                    <div className="md:col-span-4">
                                        <Input
                                            type="number"
                                            label="Nominal (Rp)"
                                            placeholder="0"
                                            error={errors.items?.[index]?.amount}
                                            registration={register(`items.${index}.amount`, { valueAsNumber: true })}
                                        />
                                    </div>

                                    {/* Conditional Inputs for Zakat */}
                                    {items[index]?.fund_type === 'zakat' && (
                                        <div className="md:col-span-3">
                                            <Select
                                                label="Tipe Zakat"
                                                options={zakatTypeOptions}
                                                error={errors.items?.[index]?.zakat_type}
                                                registration={register(`items.${index}.zakat_type`)}
                                            />
                                        </div>
                                    )}

                                    {items[index]?.fund_type === 'zakat' && items[index]?.zakat_type === 'fitrah' && (
                                        <>
                                            <div className="md:col-span-2">
                                                <Input
                                                    type="number"
                                                    label="Jml Jiwa"
                                                    placeholder="0"
                                                    registration={register(`items.${index}.person_count`, { valueAsNumber: true })}
                                                    error={errors.items?.[index]?.person_count}
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <Input
                                                    type="number"
                                                    label="Beras (Kg)"
                                                    placeholder="0"
                                                    registration={register(`items.${index}.rice_kg`, { valueAsNumber: true })}
                                                    error={errors.items?.[index]?.rice_kg}
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div className="md:col-span-12">
                                        <Input
                                            label="Catatan Item"
                                            placeholder="Keterangan tambahan..."
                                            registration={register(`items.${index}.notes`)}
                                            error={errors.items?.[index]?.notes}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-dark-border" />

                {/* Footer / Summary */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex justify-between items-center">
                    <span className="font-semibold text-blue-900 dark:text-blue-100">Total Penerimaan</span>
                    <span className="text-xl font-bold text-blue-700 dark:text-blue-300">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalAmount)}
                    </span>
                </div>

                <Textarea
                    label="Catatan Umum"
                    placeholder="Catatan untuk kwitansi ini"
                    registration={register('notes')}
                    error={errors.notes}
                    rows={2}
                />

                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4">
                    <Link href="/donation-receipts">
                        <Button variant="outline" type="button" disabled={isLoading}>
                            Batal
                        </Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>
                        Update Penerimaan
                    </Button>
                </div>
            </form>
        </Card>
    );
};
