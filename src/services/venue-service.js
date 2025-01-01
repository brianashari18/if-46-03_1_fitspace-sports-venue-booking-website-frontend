import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Adjust the base URL to match your backend setup

const VenueService = {
    // Fetch all venues
    getAllVenues: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/venues`);
            return response.data.data; // Assuming response structure: { data: [...venues] }
        } catch (error) {
            console.error("Error fetching venues:", error);
            throw new Error(
                error.response?.data?.errors || "Failed to fetch venue data."
            );
        }
    },

    // Fetch all venues owned by the user
    getVenueFromAllOwner: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/venues/owner`, {
                headers: {
                    Authorization: token,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching venues owned by user:", error);
            throw new Error(
                error.response?.data?.errors || "Failed to fetch venues owned by user."
            );
        }
    },

    // Fetch a single venue by ID
    getVenueById: async (venueId) => {
        try {
            const response = await axios.get(`${BASE_URL}/venues/${venueId}`);
            return response.data.data; // Assuming response structure: { data: {...venue} }
        } catch (error) {
            console.error(`Error fetching venue with ID ${venueId}:`, error);
            throw new Error(
                error.response?.data?.errors || `Failed to fetch venue with ID ${venueId}.`
            );
        }
    },

    // Add a new venue
    addVenue: async (token, venueData) => {
        try {
            const response = await axios.post(`${BASE_URL}/venues`, venueData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error adding venue:", error);
            throw new Error(
                error.response?.data?.errors || "Failed to add venue."
            );
        }
    },

    // Fetch reviews for a specific field
    getReviewsByField: async (fieldId) => {
        try {
            const response = await axios.get(`${BASE_URL}/${fieldId}/reviews`);
            return response.data.data; // Assuming response structure: { data: [...reviews] }
        } catch (error) {
            console.error(`Error fetching reviews for field ID ${fieldId}:`, error);
            throw new Error(
                error.response?.data?.errors || `Failed to fetch reviews for field ID ${fieldId}.`
            );
        }
    },

    // Submit a review for a specific field
    submitReview: async (fieldId, reviewData) => {
        try {
            const response = await axios.post(`${BASE_URL}/fields/${fieldId}/reviews`, reviewData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data.data; // Assuming response structure: { data: {...review} }
        } catch (error) {
            console.error(`Error submitting review for field ID ${fieldId}:`, error);
            throw new Error(
                error.response?.data?.errors || `Failed to submit review for field ID ${fieldId}.`
            );
        }
    },

    // Delete a specific review
    deleteReview: async (fieldId, reviewId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/${fieldId}/reviews/${reviewId}`);
            return response.data.data; // Assuming response structure: { data: 'Review Deleted Successfully' }
        } catch (error) {
            console.error(`Error deleting review with ID ${reviewId}:`, error);
            throw new Error(
                error.response?.data?.errors || `Failed to delete review with ID ${reviewId}.`
            );
        }
    },
};

export default VenueService;
