import React, { useEffect, useState } from 'react';
import adminService from '../../services/admin-service';

const FieldManagement = () => {
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const fieldList = await adminService.getAllFields(token);
                setFields(fieldList);
            } catch (error) {
                console.error('Failed to fetch fields:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFields();
    }, [token]);

    const handleDelete = async (fieldId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this field?"
        );

        if (confirmDelete) {
            try {
                await adminService.deleteField(fieldId, token);
                setFields(fields.filter((field) => field.id !== fieldId)); // Update state after deletion
                alert("Field deleted successfully");
            } catch (error) {
                console.error("Failed to delete field:", error);
                alert("Failed to delete field");
            }
        }
    };

    if (loading) {
        return <div>Loading fields...</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Field Management</h2>

            {/* Table for displaying fields */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border border-gray-300 p-2">ID</th>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Venue</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {fields.length > 0 ? (
                    fields.map((field) => (
                        <tr key={field.id}>
                            <td className="border border-gray-300 p-2 text-center">{field.id}</td>
                            <td className="border border-gray-300 p-2">{field.type}</td>
                            <td className="border border-gray-300 p-2">{field.venue_id}</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(field.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="border border-gray-300 p-2 text-center">
                            No fields found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default FieldManagement;
