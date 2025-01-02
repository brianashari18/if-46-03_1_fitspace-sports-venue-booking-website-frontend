import React, { useEffect, useState } from "react";
import adminService from "../../services/admin-service";

const ReviewManagement = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formState, setFormState] = useState({
        id: "",
        comment: "",
        rating: "",
    });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewList = await adminService.getAllReviews(token);
                setReviews(reviewList);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [token]);

    const handleDelete = async (reviewId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this review?");
        if (confirmDelete) {
            try {
                await adminService.deleteReview(reviewId, token);
                setReviews(reviews.filter((review) => review.id !== reviewId)); // Update state after deletion
                alert("Review deleted successfully");
            } catch (error) {
                console.error("Failed to delete review:", error);
                alert("Failed to delete review");
            }
        }
    };

    const handleEdit = (review) => {
        setFormState({
            id: review.id,
            comment: review.comment,
            rating: review.rating,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedReview = await adminService.updateReview(formState.id, formState, token);
            setReviews(reviews.map((review) => (review.id === formState.id ? updatedReview : review)));
            alert("Review updated successfully");
            setFormState({ id: "", comment: "", rating: "" });
        } catch (error) {
            console.error("Failed to update review:", error);
            alert("Failed to update review");
        }
    };

    if (loading) {
        return <div>Loading reviews...</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Review Management</h2>

            {/* Form for editing a review */}
            {formState.id && (
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <textarea
                            placeholder="Comment"
                            value={formState.comment}
                            onChange={(e) => setFormState({ ...formState, comment: e.target.value })}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Rating"
                            value={formState.rating}
                            onChange={(e) => setFormState({ ...formState, rating: e.target.value })}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Update Review
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                            onClick={() => setFormState({ id: "", comment: "", rating: "" })} // Reset form on cancel
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Table for displaying reviews */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border border-gray-300 p-2">ID</th>
                    <th className="border border-gray-300 p-2">Field Id</th>
                    <th className="border border-gray-300 p-2">Username</th>
                    <th className="border border-gray-300 p-2">Comment</th>
                    <th className="border border-gray-300 p-2">Rating</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <tr key={review.id}>
                            <td className="border border-gray-300 p-2 text-center">{review.id}</td>
                            <td className="border border-gray-300 p-2 text-center">{review.field_id}</td>
                            <td className="border border-gray-300 p-2 text-center">{review.user.first_name}</td>
                            <td className="border border-gray-300 p-2">{review.comment}</td>
                            <td className="border border-gray-300 p-2">{review.rating}</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => handleEdit(review)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(review.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="border border-gray-300 p-2 text-center">
                            No reviews found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewManagement;
