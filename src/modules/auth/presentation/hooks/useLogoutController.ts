'use client';

import { useState } from 'react';
import { useLogout } from '../../application/useLogout';

/**
 * Controller untuk Logout Logic
 * Menggabungkan `useLogout` dan state modal konfirmasi.
 */
export const useLogoutController = () => {
    const { logout } = useLogout();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogoutClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmLogout = () => {
        logout();
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return {
        isModalOpen,
        handleLogoutClick,
        handleConfirmLogout,
        handleCloseModal,
    };
};
