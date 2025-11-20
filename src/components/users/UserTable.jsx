import React from 'react';
import { getRoleLabel } from '../../utils/roleLabels';

const UserTable = ({ users = [] }) => (
    <div className="row">
        <div className="col-12">
            <div className="card">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user.id}>
                                        <td>#{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td><span className="badge bg-secondary">{getRoleLabel(user.role)}</span></td>
                                        <td><span className="badge bg-success">{user.active ? 'Active' : 'Inactive'}</span></td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" className="text-center p-4">No users found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default UserTable;

