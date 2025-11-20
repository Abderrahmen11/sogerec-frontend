import React, { createContext, useState, useCallback } from 'react';

export const UIContext = createContext();

export function UIProvider({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [toast, setToast] = useState(null);
    const [theme, setTheme] = useState('light');

    const toggleSidebar = useCallback(() => {
        setSidebarOpen(prev => !prev);
    }, []);

    const openModal = useCallback((type, data = null) => {
        setModalType(type);
        setModalData(data);
        setModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalOpen(false);
        setModalType(null);
        setModalData(null);
    }, []);

    const showToast = useCallback((message, type = 'info', duration = 3000) => {
        setToast({ message, type, id: Date.now() });
        setTimeout(() => setToast(null), duration);
    }, []);

    const value = {
        sidebarOpen,
        toggleSidebar,
        modalOpen,
        modalType,
        modalData,
        openModal,
        closeModal,
        toast,
        showToast,
        theme,
        setTheme,
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;

}

export default UIContext;

