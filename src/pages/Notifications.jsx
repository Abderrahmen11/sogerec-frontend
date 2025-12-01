import React, { useEffect } from 'react';
import { Notifications as NotificationsIcon, Inbox } from '@mui/icons-material';
import useNotifications from '../hooks/useNotifications';
import NotificationList from '../components/notifications/NotificationList';

const Notifications = () => {
    const { notifications, fetchNotifications, loading } = useNotifications();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const unreadCount = notifications?.filter(n => !n.read_at).length || 0;
    const readCount = notifications?.filter(n => n.read_at).length || 0;

    return (
        <main className="container-fluid py-5" style={{ minHeight: '100vh' }}>
            <div className="container">
                {/* Page Header */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div>
                            <h1 className="mb-2" style={{ color: '#3a4856', fontWeight: '700' }}>
                                <NotificationsIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: 28 }} />Notifications
                            </h1>
                            <p className="text-muted mb-0">
                                {unreadCount} unread • {readCount} read
                            </p>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="row g-4 mb-5">
                    <div className="col-md-6 col-lg-3">
                        <div className="custom-block bg-danger text-white shadow-lg p-4 h-100 text-center">
                            <h5 className="mb-2">Unread</h5>
                            <p className="display-6 fw-bold">{unreadCount}</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="custom-block bg-success text-white shadow-lg p-4 h-100 text-center">
                            <h5 className="mb-2">Read</h5>
                            <p className="display-6 fw-bold">{readCount}</p>
                        </div>
                    </div>
                </div>

                {/* Notifications List */}
                {loading ? (
                    <div className="custom-block bg-white shadow-lg p-5 text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading notifications...</p>
                    </div>
                ) : notifications && notifications.length > 0 ? (
                    <div className="custom-block bg-white shadow-lg p-4">
                        <NotificationList notifications={notifications} />
                    </div>
                ) : (
                    <div className="custom-block bg-white shadow-lg p-5 text-center">
                        <Inbox sx={{ fontSize: '3rem', color: '#ccc', display: 'block', mx: 'auto', mb: 2 }} />
                        <p className="mt-3 text-muted">No notifications yet</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Notifications;

