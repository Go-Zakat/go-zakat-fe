'use client';

import { Input } from '@/src/shared/ui/components/Input';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import Link from 'next/link';
import { Textarea } from '@/src/shared/ui/components/Textarea';
import { useAsnafUpdateController } from '@/src/modules/asnaf/presentation/hooks/useAsnafUpdateController';

interface AsnafUpdateFormProps {
    id: string;
}

export const AsnafUpdateForm = ({ id }: AsnafUpdateFormProps) => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit
    } = useAsnafUpdateController(id);

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <Input
                        label="Nama Asnaf"
                        placeholder="Masukkan nama asnaf"
                        error={errors.name}
                        registration={register('name')}
                    />

                    <Textarea
                        label="Deskripsi"
                        placeholder="Masukkan deskripsi asnaf (opsional)"
                        registration={register('description')}
                        error={errors.description}
                    />
                </div>

                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4">
                    <Link href="/asnaf">
                        <Button variant="outline" type="button" disabled={isLoading}>
                            Batal
                        </Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>
                        Simpan Perubahan
                    </Button>
                </div>
            </form>
        </Card>
    );
};
