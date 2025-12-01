import React, { createContext, useState, useCallback, useEffect, useContext } from 'react';
import notificationService from '../services/notificationService';
import { AuthContext } from './AuthContext';

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, loading: authLoading } = useContext(AuthContext);

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
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (err) {
            setError(err.message || 'Failed to mark notification as read');
        }
    }, []);

    const markAllAsRead = useCallback(async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date().toISOString() })));
            setUnreadCount(0);
        } catch (err) {
            setError(err.message || 'Failed to mark all as read');
        }
    }, []);

    const deleteNotification = useCallback(async (id) => {
        try {
            await notificationService.delete(id);
            setNotifications(prev => prev.filter(n => n.id !== id));
            // Update unread count if the deleted notification was unread
            const deletedNotification = notifications.find(n => n.id === id);
            if (deletedNotification && !deletedNotification.read_at) {
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
        } catch (err) {
            setError(err.message || 'Failed to delete notification');
        }
    }, [notifications]);

    // Fetch notifications only when authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            fetchNotifications();
            getUnreadCount();
        }
    }, [isAuthenticated, authLoading, fetchNotifications, getUnreadCount]);

    const value = {
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        getUnreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
    };

    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export default NotificationContext;

