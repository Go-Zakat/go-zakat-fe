'use client';

import {
    UseFormRegister,
    FieldErrors,
    Control,
    UseFormWatch,
    UseFieldArrayReturn,
    Controller
} from 'react-hook-form';
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';

import { Input } from '@/src/shared/ui/components/Input';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import { Textarea } from '@/src/shared/ui/components/Textarea';
import { Select } from '@/src/shared/ui/components/Select';
import { DistributionFormValues } from '../../domain/distribution.types';
import { Program, Mustahiq } from '@/src/shared/types/common.types';

interface DistributionFormProps {
    register: UseFormRegister<DistributionFormValues>;
    errors: FieldErrors<DistributionFormValues>;
    control: Control<DistributionFormValues>;
    watch: UseFormWatch<DistributionFormValues>;

    fields: UseFieldArrayReturn<DistributionFormValues, "items">['fields'];
    append: UseFieldArrayReturn<DistributionFormValues, "items">['append'];
    remove: UseFieldArrayReturn<DistributionFormValues, "items">['remove'];

    onSubmit: () => void;
    isLoading: boolean;
    error: string | null;

    programList: Program[];
    mustahiqList: Mustahiq[];
    isEditMode?: boolean;
}

export const DistributionForm = ({
    register,
    errors,
    control,
    watch,
    fields,
    append,
    remove,
    onSubmit,
    isLoading,
    error,
    programList,
    mustahiqList,
    isEditMode = false
}: DistributionFormProps) => {

    const items = watch('items');
    const totalAmount = items?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;

    // Dropdown Options
    const programOptions = [
        { value: '', label: 'Pilih Program' },
        ...programList.map(p => ({ value: p.id, label: p.name }))
    ];

    const sourceFundOptions = [
        { value: 'zakat_fitrah', label: 'Zakat Fitrah' },
        { value: 'zakat_maal', label: 'Zakat Maal' },
        { value: 'infaq', label: 'Infaq' },
        { value: 'sadaqah', label: 'Sadaqah' },
    ];

    const mustahiqOptions = [
        { value: '', label: 'Pilih Mustahiq' },
        ...mustahiqList.map(m => ({ value: m.id, label: m.name }))
    ];

    return (
        <Card className="p-6">
            <form onSubmit={onSubmit} className="space-y-8">
                {/* Header Information */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary mb-4">
                        {isEditMode ? 'Edit Penyaluran' : 'Informasi Penyaluran Baru'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            type="date"
                            label="Tanggal Penyaluran"
                            error={errors.distribution_date}
                            registration={register('distribution_date')}
                        />
                        <Select
                            label="Program"
                            options={programOptions}
                            error={errors.program_id}
                            registration={register('program_id')}
                        />
                        <Select
                            label="Sumber Dana"
                            options={sourceFundOptions}
                            error={errors.source_fund_type}
                            registration={register('source_fund_type')}
                        />
                        <div className="hidden md:block"></div> {/* Spacer */}
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-dark-border" />

                {/* Items (Penerima Manfaat) */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
                            Daftar Penerima (Mustahiq)
                        </h3>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => append({ mustahiq_id: '', amount: 0, notes: '' })}
                        >
                            <Plus size={16} /> Tambah Penerima
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
                                    <div className="md:col-span-4">
                                        <Select
                                            label="Mustahiq"
                                            options={mustahiqOptions}
                                            error={errors.items?.[index]?.mustahiq_id}
                                            registration={register(`items.${index}.mustahiq_id`)}
                                        />
                                    </div>

                                    <div className="md:col-span-4">
                                        <Controller
                                            control={control}
                                            name={`items.${index}.amount`}
                                            render={({ field }) => (
                                                <Input
                                                    label="Nominal (Rp)"
                                                    placeholder="Rp 0"
                                                    value={field.value ? `Rp ${new Intl.NumberFormat('id-ID').format(field.value)}` : ''}
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                                        field.onChange(value ? Number(value) : 0);
                                                    }}
                                                    error={errors.items?.[index]?.amount}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="md:col-span-4">
                                        <Input
                                            label="Catatan"
                                            placeholder="Keterangan..."
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
                    <span className="font-semibold text-blue-900 dark:text-blue-100">Total Penyaluran</span>
                    <span className="text-xl font-bold text-blue-700 dark:text-blue-300">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalAmount)}
                    </span>
                </div>

                <Textarea
                    label="Catatan Umum"
                    placeholder="Catatan tambahan untuk penyaluran ini"
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
                    <Link href="/distribution">
                        <Button variant="outline" type="button" disabled={isLoading}>
                            Batal
                        </Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>
                        {isEditMode ? 'Update Penyaluran' : 'Simpan Penyaluran'}
                    </Button>
                </div>
            </form>
        </Card>
    );
};