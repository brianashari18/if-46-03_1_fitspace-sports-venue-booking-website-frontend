import React, { useEffect, useState } from "react";
import adminService from "../../services/admin-service";

const VenueManagement = () => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formState, setFormState] = useState({
        name: "",
        city_or_regency: "",
        district: "",
        phone_number: "",
        postal_code: "",
        street: "",
        province: "",
        latitude: "",
        longitude: "",
    });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const venueList = await adminService.getAllVenues(token);
                setVenues(venueList);
            } catch (error) {
                console.error("Failed to fetch venues:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, [token]);

    const handleDelete = async (venueId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this venue?");
        if (confirmDelete) {
            try {
                await adminService.deleteVenue(venueId, token);
                setVenues(venues.filter((venue) => venue.id !== venueId));
                alert("Venue deleted successfully");
            } catch (error) {
                console.error("Failed to delete venue:", error);
                alert("Failed to delete venue");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Form Data:", formState);
        try {
            if (formState.id) {
                // Update venue
                const updatedVenue = await adminService.updateVenue(formState.id, formState, token);
                setVenues(venues.map((venue) => (venue.id === formState.id ? updatedVenue : venue)));
                alert("Venue updated successfully");
            } else {
                // Create venue
                const newVenue = await adminService.createVenue(formState, token);
                setVenues([...venues, newVenue]);
                alert("Venue created successfully");
            }
            resetForm();
        } catch (error) {
            console.error("Failed to submit form:", error.response?.data || error.message);
            alert("Failed to submit form");
        }
    };

    const handleEdit = (venue) => {
        setFormState({
            id: venue.id,
            name: venue.name,
            city_or_regency: venue.city_or_regency,
            district: venue.district,
            phone_number: venue.phone_number,
            postal_code: venue.postal_code,
            street: venue.street,
            province: venue.province,
            latitude: venue.latitude,
            longitude: venue.longitude,
        });
    };

    const resetForm = () => {
        setFormState({
            name: "",
            city_or_regency: "",
            district: "",
            phone_number: "",
            postal_code: "",
            street: "",
            province: "",
            latitude: "",
            longitude: "",
        });
    };

    if (loading) {
        return <div>Loading venues...</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Venue Management</h2>

            {/* Form for creating/updating venue */}
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="City or Regency"
                        value={formState.city_or_regency}
                        onChange={(e) => setFormState({ ...formState, city_or_regency: e.target.value })}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="District"
                        value={formState.district}
                        onChange={(e) => setFormState({ ...formState, district: e.target.value })}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={formState.phone_number}
                        onChange={(e) => setFormState({ ...formState, phone_number: e.target.value })}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Postal Code"
                        value={formState.postal_code}
                        onChange={(e) => setFormState({ ...formState, postal_code: e.target.value })}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Street"
                        value={formState.street}
                        onChange={(e) => setFormState({ ...formState, street: e.target.value })}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Province"
                        value={formState.province}
                        onChange={(e) => setFormState({ ...formState, province: e.target.value })}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Latitude"
                        value={formState.latitude}
                        onChange={(e) => setFormState({ ...formState, latitude: e.target.value })}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Longitude"
                        value={formState.longitude}
                        onChange={(e) => setFormState({ ...formState, longitude: e.target.value })}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="flex gap-4 mt-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        {formState.id ? "Update Venue" : "Create Venue"}
                    </button>
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={resetForm}
                    >
                        Cancel
                    </button>
                </div>
            </form>

            {/* Table for displaying venues */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border border-gray-300 p-2">ID</th>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Phone Number</th>
                    <th className="border border-gray-300 p-2">Address</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {venues.length > 0 ? (
                    venues.map((venue) => (
                        <tr key={venue.id}>
                            <td className="border border-gray-300 p-2 text-center">{venue.id}</td>
                            <td className="border border-gray-300 p-2">{venue.name}</td>
                            <td className="border border-gray-300 p-2">{venue.phone_number}</td>
                            <td className="border border-gray-300 p-2">
                                {venue.street} - {venue.district}, {venue.city_or_regency}, {venue.province}
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => handleEdit(venue)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(venue.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="border border-gray-300 p-2 text-center">
                            No venues found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default VenueManagement;
