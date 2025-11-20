import React from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ notifications = [] }) => (
    <div className="row">
        <div className="col-lg-8 col-12 mx-auto">
            {notifications.length > 0 ? (
                notifications.map(notification => (
                    <NotificationItem key={notification.id} notification={notification} />
                ))
            ) : (
                <div className="alert alert-info">No notifications</div>
            )}
        </div>
    </div>
);

export default NotificationList;

