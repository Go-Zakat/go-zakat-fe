'use client';

import { UserList } from '@/src/modules/user/presentation/components/UserList';
import {PageHeader} from "@/src/shared/ui/layout/PageHeader";
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

export default function UserPage() {
    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Daftar Pengguna"
                breadcrumbs={[
                    { label: 'Sumber Daya' },
                    { label: 'Pengguna' },
                ]}
            />

            <UserList />
        </AnimatedContainer>
    );
}
