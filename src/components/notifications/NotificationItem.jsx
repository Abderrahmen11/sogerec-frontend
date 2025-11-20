import React from 'react';
import { getRelativeTime } from '../../utils/formatDate';

const NotificationItem = ({ notification }) => (
    <div className="card mb-3">
        <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h6 className="card-title">{notification.title}</h6>
                    <p className="card-text">{notification.message}</p>
                    <small className="text-muted">{getRelativeTime(notification.created_at)}</small>
                </div>
                {!notification.read && (
                    <span className="badge bg-primary">New</span>
                )}
            </div>
        </div>
    </div>
);

export default NotificationItem;

