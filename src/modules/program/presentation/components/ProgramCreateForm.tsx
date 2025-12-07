'use client';

import { Input } from '@/src/shared/ui/components/Input';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import Link from 'next/link';
import { Textarea } from '@/src/shared/ui/components/Textarea';
import { useProgramCreateController } from '../hooks/useProgramCreateController';

export const ProgramCreateForm = () => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit
    } = useProgramCreateController();

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <Input
                        label="Nama Program"
                        placeholder="Masukkan nama program"
                        error={errors.name}
                        registration={register('name')}
                    />

                    <Input
                        label="Tipe Program"
                        placeholder="Masukkan tipe program"
                        error={errors.type}
                        registration={register('type')}
                    />

                    <Textarea
                        label="Deskripsi"
                        placeholder="Masukkan deskripsi program (opsional)"
                        registration={register('description')}
                        error={errors.description}
                    />

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="active"
                            className="w-4 h-4 rounded border-gray-300 dark:border-dark-border text-primary-blue focus:ring-primary-blue cursor-pointer bg-transparent"
                            {...register('active')}
                        />
                        <label htmlFor="active" className="text-sm text-gray-700 dark:text-text-secondary cursor-pointer">
                            Program Aktif?
                        </label>
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4">
                    <Link href="/program">
                        <Button variant="outline" type="button" disabled={isLoading}>
                            Batal
                        </Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>
                        Simpan Program
                    </Button>
                </div>
            </form>
        </Card>
    );
};
