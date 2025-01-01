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

    // Fetch all reviews on component mount
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

    // Handle delete review
    const handleDelete = async (reviewId) => {
        try {
            await adminService.deleteReview(reviewId, token);
            setReviews(reviews.filter((review) => review.id !== reviewId)); // Update state after deletion
            alert("Review deleted successfully");
        } catch (error) {
            console.error("Failed to delete review:", error);
            alert("Failed to delete review");
        }
    };

    // Handle review edit
    const handleEdit = (review) => {
        setFormState({
            id: review.id,
            comment: review.comment,
            rating: review.rating,
        });
    };

    // Handle form submission (for creating or updating a review)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formState.id) {
                // Update existing review
                const updatedReview = await adminService.updateReview(formState.id, formState, token);
                setReviews(reviews.map((review) => (review.id === formState.id ? updatedReview : review)));
                alert("Review updated successfully");
            } else {
                // Create new review
                const newReview = await adminService.createReview(formState, token);
                setReviews([...reviews, newReview]);
                alert("Review created successfully");
            }
            resetForm();
        } catch (error) {
            console.error("Failed to submit form:", error);
            alert("Failed to submit form");
        }
    };

    // Reset form to clear the state
    const resetForm = () => {
        setFormState({
            id: "",
            comment: "",
            rating: "",
        });
    };

    if (loading) {
        return <div>Loading reviews...</div>;
    }

    console.log(reviews)

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Review Management</h2>

            {/* Form for creating/updating a review */}
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
                        {formState.id ? "Update Review" : "Create Review"}
                    </button>
                    <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={resetForm}>
                        Cancel
                    </button>
                </div>
            </form>

            {/* Table for displaying reviews */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border border-gray-300 p-2">ID</th>
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
                        <td colSpan="4" className="border border-gray-300 p-2 text-center">
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
