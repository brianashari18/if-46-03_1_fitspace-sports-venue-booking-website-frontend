import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const createReview = async (fieldId, reviewData, token) => {
    try {
        const response = await axios.post(`${baseUrl}/fields/${fieldId}/reviews`, reviewData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error during review creation:', error.response || error.message);
        throw new Error(
            error.response?.data?.message || 'Failed to create review. Please try again later.'
        );
    }
};

// Get all reviews for a field
export const getAllReviews = async (fieldId, token) => {
    try {
        const response = await axios.get(`${baseUrl}/${fieldId}/reviews`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error.response || error.message);
        throw new Error(
            error.response?.data?.message || 'Failed to fetch reviews. Please try again later.'
        );
    }
};

// Delete a review
export const deleteReview = async (fieldId, reviewId, token) => {
    try {
        const response = await axios.delete(`${baseUrl}/${fieldId}/reviews/${reviewId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting review:', error.response || error.message);
        throw new Error(
            error.response?.data?.message || 'Failed to delete review. Please try again later.'
        );
    }
};
