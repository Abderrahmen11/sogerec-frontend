import React, { createContext, useState, useCallback, useEffect } from 'react';
import notificationService from '../services/notificationService';

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchNotifications = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const data = await notificationService.getAll(params);
            setNotifications(data.data || data);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to fetch notifications');
        } finally {
            setLoading(false);
        }
    }, []);

    const getUnreadCount = useCallback(async () => {
        try {
            const data = await notificationService.getUnreadCount();
            setUnreadCount(data.count || 0);
            return data;
        } catch (err) {
            console.error('Failed to fetch unread count:', err);
        }
    }, []);

    const markAsRead = useCallback(async (id) => {
        try {
            await notificationService.markAsRead(id);
            setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
            setUnreadCount(Math.max(0, unreadCount - 1));
        } catch (err) {
            setError(err.message || 'Failed to mark notification as read');
        }
    }, [notifications, unreadCount]);

    const markAllAsRead = useCallback(async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications(notifications.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch (err) {
            setError(err.message || 'Failed to mark all as read');
        }
    }, [notifications]);

    // Fetch notifications on mount
    useEffect(() => {
        fetchNotifications();
        getUnreadCount();
    }, []);

    const value = {
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        getUnreadCount,
        markAsRead,
        markAllAsRead,
    };

    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export default NotificationContext;

