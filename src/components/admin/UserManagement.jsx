import React, { useEffect, useState } from 'react';
import adminService from '../../services/admin-service.js';

const UserManagement = ({ token }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userList = await adminService.getAllUsers(token);
                setUsers(userList);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await adminService.deleteUser(userId, token);
                setUsers(users.filter((user) => user.id !== userId)); // Update state after deletion
                alert('User deleted successfully');
            } catch (error) {
                console.error('Failed to delete user:', error);
                alert('Failed to delete user');
            }
        }
    };

    if (loading) {
        return <div>Loading users...</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">User Management</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border border-gray-300 p-2 text-center">ID</th>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Email</th>
                    <th className="border border-gray-300 p-2 text-center">Role</th>
                    <th className="border border-gray-300 p-2 text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.id}>
                            <td className="border border-gray-300 p-2 text-center">{user.id}</td>
                            <td className="border border-gray-300 p-2">{`${user.first_name} ${user.last_name}`}</td>
                            <td className="border border-gray-300 p-2">{user.email}</td>
                            <td className="border border-gray-300 p-2 text-center">{user.role}</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="border border-gray-300 p-2 text-center">
                            No users found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
