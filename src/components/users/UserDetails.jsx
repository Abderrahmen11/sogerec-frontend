import React from 'react';
import { getRoleLabel } from '../../utils/roleLabels';

const UserDetails = ({ user }) => {
    if (!user) return <div>No user selected</div>;

    return (
        <div className="card">
            <div className="card-body">
                <h4>{user.name}</h4>
                <p className="text-muted">{user.email}</p>
                <div className="mb-3">
                    <strong>Role:</strong> {getRoleLabel(user.role)}
                </div>
                <div className="mb-3">
                    <strong>Status:</strong> {user.active ? 'Active' : 'Inactive'}
                </div>
                <div className="mb-3">
                    <strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export default UserDetails;

