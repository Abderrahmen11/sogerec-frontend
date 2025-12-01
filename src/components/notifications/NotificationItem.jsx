import React from 'react';
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
    MarkEmailRead
} from '@mui/icons-material';
import useNotifications from '../../hooks/useNotifications';

const NotificationItem = ({ notification }) => {
    const { markAsRead, deleteNotification } = useNotifications();

    // Safe check for notification
    if (!notification) {
        return null;
    }

    // Determine icon and color based on notification type
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'App\\Notifications\\TicketCreated':
            case 'ticket_created':
                return { icon: <Assignment />, color: '#0d6efd' };
            case 'App\\Notifications\\TicketAssigned':
            case 'ticket_assigned':
                return { icon: <Person />, color: '#6610f2' };
            case 'App\\Notifications\\InterventionScheduled':
            case 'intervention_scheduled':
                return { icon: <Schedule />, color: '#fd7e14' };
            case 'App\\Notifications\\InterventionCompleted':
            case 'intervention_completed':
                return { icon: <CheckCircle />, color: '#198754' };
            case 'App\\Notifications\\TicketStatusChanged':
            case 'ticket_status':
                return { icon: <Build />, color: '#0dcaf0' };
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
    const message = data?.body || data?.description || '';
    const actionUrl = data?.action_url || data?.url;

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
            className={`card mb-3 shadow-sm ${isUnread ? 'border-primary' : ''}`}
            style={{
                borderLeft: `4px solid ${color}`,
                backgroundColor: isUnread ? '#f8f9fa' : '#ffffff',
                transition: 'all 0.3s ease'
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
                            borderRadius: '50%',
                            backgroundColor: `${color}20`,
                            color: color,
                            flexShrink: 0
                        }}
                    >
                        {icon}
                    </div>

                    {/* Content */}
                    <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="mb-0" style={{ fontWeight: isUnread ? '600' : '400' }}>
                                {title}
                                {isUnread && (
                                    <span className="badge bg-primary ms-2" style={{ fontSize: '0.7rem' }}>New</span>
                                )}
                            </h6>
                            <small className="text-muted">{getRelativeTime(notification.created_at)}</small>
                        </div>

                        {message && (
                            <p className="card-text text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                                {message}
                            </p>
                        )}

                        {/* Actions */}
                        <div className="d-flex gap-2 mt-2">
                            {actionUrl && (
                                <a
                                    href={actionUrl}
                                    className="btn btn-sm btn-outline-primary"
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    View Details
                                </a>
                            )}
                            {isUnread && (
                                <button
                                    onClick={handleMarkAsRead}
                                    className="btn btn-sm btn-outline-success"
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    <MarkEmailRead sx={{ fontSize: 16, mr: 0.5 }} />
                                    Mark as Read
                                </button>
                            )}
                            <button
                                onClick={handleDelete}
                                className="btn btn-sm btn-outline-danger"
                                style={{ fontSize: '0.8rem' }}
                            >
                                <Delete sx={{ fontSize: 16, mr: 0.5 }} />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationItem;
