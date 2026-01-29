import React from 'react';
import { Link } from 'react-router-dom';
import { Notifications } from '@mui/icons-material';
import useNotifications from '../../hooks/useNotifications';

const NotificationBell = () => {
    const { unreadCount, markAllAsRead } = useNotifications();

    return (
        <Link to="/notifications" className="navbar-icon position-relative" onClick={markAllAsRead}>
            <Notifications />
            {unreadCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {unreadCount}
                </span>
            )}
        </Link>
    );
};

export default NotificationBell;

