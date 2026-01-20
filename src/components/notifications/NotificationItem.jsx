import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CheckCircle,
    Error,
    Info,
    Warning,
    Assignment,
    Build,
    Person,
    Schedule,
    Delete,
    MarkEmailRead,
    Visibility
} from '@mui/icons-material';
import useNotifications from '../../hooks/useNotifications';

const NotificationItem = ({ notification }) => {
    const { markAsRead, deleteNotification } = useNotifications();
    const navigate = useNavigate();

    // Safe check for notification
    if (!notification) {
        return null;
    }

    // Determine icon and color based on notification type
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'App\\Notifications\\NewTicketNotification':
            case 'new_ticket':
                return { icon: <Assignment />, color: '#0d6efd' };
            case 'App\\Notifications\\InterventionAssignedNotification':
            case 'intervention_assigned':
                return { icon: <Person />, color: '#6610f2' };
            case 'App\\Notifications\\InterventionStatusUpdatedNotification':
            case 'intervention_status_updated':
                return { icon: <Schedule />, color: '#fd7e14' };
            case 'success':
                return { icon: <CheckCircle />, color: '#198754' };
            case 'error':
                return { icon: <Error />, color: '#dc3545' };
            case 'warning':
                return { icon: <Warning />, color: '#ffc107' };
            default:
                return { icon: <Info />, color: '#6c757d' };
        }
    };

    // Safe relative time function
    const getRelativeTime = (dateString) => {
        if (!dateString) return 'Recently';
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffInSeconds = Math.floor((now - date) / 1000);

            if (diffInSeconds < 60) return 'Just now';
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
            if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
            return date.toLocaleDateString();
        } catch (error) {
            return 'Recently';
        }
    };

    const { icon, color } = getNotificationIcon(notification.type || 'info');
    const isUnread = !notification.read_at;

    // Safely extract data from notification
    let data = {};
    try {
        data = typeof notification.data === 'string' ? JSON.parse(notification.data) : (notification.data || {});
    } catch (error) {
        console.error('Error parsing notification data:', error);
        data = {};
    }

    const title = data?.title || data?.message || 'Notification';
    const message = data?.body || data?.description || (data?.message !== title ? data?.message : '');

    // Determine redirect URL based on data
    const getRedirectUrl = () => {
        if (data.intervention_id) return `/interventions/${data.intervention_id}`;
        if (data.ticket_id) return `/tickets/${data.ticket_id}`;
        return null;
    };


    const redirectUrl = getRedirectUrl();

    const handleNotificationClick = () => {
        if (isUnread) {
            markAsRead(notification.id);
        }
        if (redirectUrl) {
            navigate(redirectUrl);
        }
    };

    const handleMarkAsRead = async (e) => {
        e.stopPropagation();
        if (isUnread) {
            try {
                await markAsRead(notification.id);
            } catch (error) {
                console.error('Error marking notification as read:', error);
            }
        }
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this notification?')) {
            try {
                await deleteNotification(notification.id);
            } catch (error) {
                console.error('Error deleting notification:', error);
            }
        }
    };

    return (
        <div
            className={`card mb-3 shadow-sm notification-item ${isUnread ? 'border-primary' : ''}`}
            onClick={handleNotificationClick}
            style={{
                borderLeft: `5px solid ${color}`,
                backgroundColor: isUnread ? '#f0f7ff' : '#ffffff',
                transition: 'all 0.3s ease',
                cursor: redirectUrl ? 'pointer' : 'default'
            }}
        >
            <div className="card-body">
                <div className="d-flex align-items-start">
                    {/* Icon */}
                    <div
                        className="me-3 d-flex align-items-center justify-content-center"
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            backgroundColor: `${color}15`,
                            color: color,
                            flexShrink: 0
                        }}
                    >
                        {icon}
                    </div>

                    {/* Content */}
                    <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-1">
                            <h6 className="mb-0" style={{
                                fontWeight: isUnread ? '700' : '500',
                                color: isUnread ? '#000' : '#444'
                            }}>
                                {title}
                            </h6>
                            <small className="text-muted fw-bold" style={{ fontSize: '0.75rem' }}>
                                {getRelativeTime(notification.created_at)}
                            </small>
                        </div>

                        {message && (
                            <p className="card-text text-muted mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
                                {message}
                            </p>
                        )}

                        {/* Actions */}
                        <div className="d-flex gap-2 mt-2">
                            {redirectUrl && (
                                <button
                                    className="btn btn-sm btn-primary py-1 px-3 d-flex align-items-center gap-1"
                                    style={{ fontSize: '0.75rem' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNotificationClick();
                                    }}
                                >
                                    <Visibility sx={{ fontSize: 14 }} /> View Details
                                </button>
                            )}
                            {isUnread && (
                                <button
                                    onClick={handleMarkAsRead}
                                    className="btn btn-sm btn-outline-secondary py-1 px-3"
                                    style={{ fontSize: '0.75rem' }}
                                >
                                    Mark as Read
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationItem;

