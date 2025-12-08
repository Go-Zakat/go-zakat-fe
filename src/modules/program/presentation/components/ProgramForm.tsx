'use client';

import Link from 'next/link';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/src/shared/ui/components/Input';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import { Textarea } from '@/src/shared/ui/components/Textarea';
import { ProgramFormValues } from '../../domain/program.types';

interface ProgramFormProps {
    register: UseFormRegister<ProgramFormValues>;
    errors: FieldErrors<ProgramFormValues>;
    onSubmit: () => void;
    isLoading: boolean;
    error: string | null;
    isEditMode?: boolean;
}

export const ProgramForm = ({
                                register,
                                errors,
                                onSubmit,
                                isLoading,
                                error,
                                isEditMode = false
                            }: ProgramFormProps) => {
    return (
        <Card className="p-6">
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="border-b border-gray-100 dark:border-dark-border pb-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
                        {isEditMode ? 'Edit Program' : 'Tambah Program Baru'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isEditMode
                            ? 'Perbarui informasi detail mengenai program ini.'
                            : 'Lengkapi formulir di bawah untuk menambahkan program baru.'}
                    </p>
                </div>

                <div className="space-y-4">
                    <Input
                        label="Nama Program"
                        placeholder="Contoh: Beasiswa Pendidikan"
                        error={errors.name}
                        registration={register('name')}
                    />

                    <Input
                        label="Tipe Program"
                        placeholder="Contoh: Pendidikan, Kesehatan, Ekonomi"
                        error={errors.type}
                        registration={register('type')}
                    />

                    <Textarea
                        label="Deskripsi"
                        placeholder="Jelaskan detail dan tujuan program ini..."
                        registration={register('description')}
                        error={errors.description}
                        rows={4}
                    />

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="active"
                            className="w-4 h-4 rounded border-gray-300 dark:border-dark-border text-primary-blue focus:ring-primary-blue cursor-pointer bg-transparent"
                            {...register('active')}
                        />
                        <label htmlFor="active" className="text-sm text-gray-700 dark:text-text-secondary cursor-pointer select-none">
                            Set sebagai Program Aktif
                        </label>
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-800">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-dark-border mt-6">
                    <Link href="/program">
                        <Button variant="outline" type="button" disabled={isLoading}>
                            Batal
                        </Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>
                        {isEditMode ? 'Simpan Perubahan' : 'Simpan Program'}
                    </Button>
                </div>
            </form>
        </Card>
    );
};