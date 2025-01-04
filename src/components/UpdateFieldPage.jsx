// UpdateFieldPage.jsx
import React, { useEffect, useState } from "react";
import UpdateFieldForm from "./UpdateFieldForm";
import { getField, updateField } from "./api"; // Adjust the import path as needed

const UpdateFieldPage = ({ venueId, fieldId, token }) => {
    const [field, setField] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchField = async () => {
            try {
                const data = await getField(token, venueId, fieldId);
                setField(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchField();
    }, [token, venueId, fieldId]);

    const handleUpdate = async (updatedData) => {
        try {
            const response = await updateField(token, venueId, fieldId, updatedData);
            setField(response); // Update the local state with the latest data
            alert("Field updated successfully!");
        } catch (err) {
            alert(`Failed to update field: ${err.message}`);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <UpdateFieldForm
            field={field}
            venueId={venueId}
            token={token}
            onSubmit={handleUpdate}
            onCancel={() => window.history.back()}
        />
    );
};

export default UpdateFieldPage;
