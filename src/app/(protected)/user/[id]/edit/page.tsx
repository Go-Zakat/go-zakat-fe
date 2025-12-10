'use client';

import {use} from 'react';
import {UserUpdateForm} from '@/src/modules/user/presentation/components/UserUpdateForm';
import {PageHeader} from "@/src/shared/ui/layout/PageHeader";
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function UserEditPage({params}: PageProps) {
    const {id} = use(params);

    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Edit Pengguna"
                breadcrumbs={[
                    {label: 'Sumber Daya'},
                    {label: 'Edit Pengguna'},
                ]}
            />

            <UserUpdateForm id={id}/>
        </AnimatedContainer>
    );
}
