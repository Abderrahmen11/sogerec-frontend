import React, { useEffect, useState } from 'react';
import useRoleAccess from '../hooks/useRoleAccess';
import userService from '../services/userService';
import UserTable from '../components/users/UserTable';

const Users = () => {
    const { isAdmin } = useRoleAccess();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAdmin()) return;

        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await userService.getAll();
                setUsers(data.data || data);
            } catch (err) {
                console.error('Failed to fetch users:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [isAdmin]);

    if (!isAdmin()) {
        return <div className="alert alert-warning container py-5">You don't have permission to view users.</div>;
    }

    return (
        <div className="container-fluid py-5">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Users</h1>
                        <button className="btn btn-primary">Add User</button>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="text-center">Loading users...</div>
            ) : (
                <UserTable users={users} />
            )}
        </div>
    );
};

export default Users;

