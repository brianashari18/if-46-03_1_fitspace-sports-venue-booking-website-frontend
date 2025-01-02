import React, { useEffect, useState } from "react";
import adminService from "../../services/admin-service";

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formState, setFormState] = useState({
        id: "",
        status: "",
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingList = await adminService.getAllBookings(token);
                setBookings(bookingList);
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [token]);

    const handleDelete = async (bookingId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this booking?"
        );

        if (confirmDelete) {
            try {
                await adminService.deleteBooking(bookingId, token);
                setBookings(
                    bookings.filter((booking) => booking.id !== bookingId)
                ); // Update state after deletion
                alert("Booking deleted successfully");
            } catch (error) {
                console.error("Failed to delete booking:", error);
                alert("Failed to delete booking");
            }
        }
    };

    const handleEdit = (booking) => {
        setFormState({
            id: booking.id,
            status: booking.status,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formState.id) {
                // Update existing booking
                const updatedBooking = await adminService.updateBooking(
                    formState.id,
                    formState,
                    token
                );
                setBookings(
                    bookings.map((booking) =>
                        booking.id === formState.id ? updatedBooking : booking
                    )
                );
                alert("Booking updated successfully");
            }
            resetForm();
        } catch (error) {
            console.error("Failed to submit form:", error);
            alert("Failed to submit form");
        }
    };

    const resetForm = () => {
        setFormState({
            id: "",
            status: "",
        });
    };

    if (loading) {
        return <div>Loading bookings...</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Booking Management</h2>

            {/* Form for updating a booking */}
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <select
                        value={formState.status}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                status: e.target.value,
                            })
                        }
                        className="p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="flex gap-4 mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Update Booking
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

            {/* Table for displaying bookings */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border border-gray-300 p-2">ID</th>
                    <th className="border border-gray-300 p-2">Customer</th>
                    <th className="border border-gray-300 p-2">Place</th>
                    <th className="border border-gray-300 p-2">Schedule</th>
                    <th className="border border-gray-300 p-2">Price</th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td className="border border-gray-300 p-2 text-center">
                                {booking.id}
                            </td>
                            <td className="border border-gray-300 p-2">
                                {booking.customer_id}
                            </td>
                            <td className="border border-gray-300 p-2">
                                {booking.name}
                            </td>
                            <td className="border border-gray-300 p-2">
                                {booking.schedule_id}
                            </td>
                            <td className="border border-gray-300 p-2">
                                {booking.price}
                            </td>
                            <td className="border border-gray-300 p-2">
                                {booking.status}
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => handleEdit(booking)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(booking.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan="7"
                            className="border border-gray-300 p-2 text-center"
                        >
                            No bookings found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default BookingManagement;
