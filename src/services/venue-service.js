import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL; // Adjust the base URL to match your backend setup

const VenueService = {
    // Fetch all venues
    getAllVenues: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/venues`);
            return response.data.data; // Assuming response structure: { data: [...venues] }
        } catch (error) {
            console.error('Error fetching venues:', error);
            throw error;
        }
    },

    // Fetch a single venue by ID
    getVenueById: async (venueId) => {
        try {
            const response = await axios.get(`${BASE_URL}/venues/${venueId}`);
            return response.data.data; // Assuming response structure: { data: {...venue} }
        } catch (error) {
            console.error(`Error fetching venue with ID ${venueId}:`, error);
            throw error;
        }
    },

    // Fetch reviews for a specific field
    getReviewsByField: async (fieldId) => {
        try {
            const response = await axios.get(`${BASE_URL}/${fieldId}/reviews`);
            return response.data.data; // Assuming response structure: { data: [...reviews] }
        } catch (error) {
            console.error(`Error fetching reviews for field ID ${fieldId}:`, error);
            throw error;
        }
    },

    // Submit a review for a specific field
    submitReview: async (fieldId, reviewData) => {
        try {
            const response = await axios.post(`${BASE_URL}/fields/${fieldId}/reviews`, reviewData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data.data; // Assuming response structure: { data: {...review} }
        } catch (error) {
            console.error(`Error submitting review for field ID ${fieldId}:`, error);
            throw error;
        }
    },

    // Delete a specific review
    deleteReview: async (fieldId, reviewId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/${fieldId}/reviews/${reviewId}`);
            return response.data.data; // Assuming response structure: { data: 'Review Deleted Successfully' }
        } catch (error) {
            console.error(`Error deleting review with ID ${reviewId}:`, error);
            throw error;
        }
    },
};

export default VenueService;
