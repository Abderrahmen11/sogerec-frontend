import React, { useEffect } from 'react';
import useNotifications from '../hooks/useNotifications';
import NotificationList from '../components/notifications/NotificationList';

const Notifications = () => {
    const { notifications, fetchNotifications, loading } = useNotifications();

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="container-fluid py-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-4">Notifications</h1>
                </div>
            </div>
            {loading ? (
                <div className="text-center">Loading notifications...</div>
            ) : (
                <NotificationList notifications={notifications} />
            )}
        </div>
    );
};

export default Notifications;

