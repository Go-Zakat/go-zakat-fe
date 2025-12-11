import { authStorage } from '../lib/authStorage';
import { ROLES } from '../config/constants';

type Action = 'create' | 'read' | 'update' | 'delete';
type Resource = 'asnaf' | 'mustahiq' | 'muzakki' | 'program' | 'distribution' | 'donation_receipt' | 'user';

export const usePermission = () => {
    // Ambil user dari storage
    const user = authStorage.getUser();
    const role = user?.role;

    const can = (action: Action, resource: Resource): boolean => {
        if (!role) return false;

        // ADMIN: Bisa semuanya
        if (role === ROLES.ADMIN) return true;

        // STAFF: Bisa create/update/read, tapi tidak bisa delete
        if (role === ROLES.STAFF) {
            return true;
        }

        // USER (VIEWER): Hanya bisa read
        if (role === ROLES.USER) {
            return action === 'read';
        }

        return false;
    };

    return {
        can,
        role,
        isViewer: role === ROLES.USER,
        isAdmin: role === ROLES.ADMIN,
        isStaff: role === ROLES.STAFF,
    };
};
