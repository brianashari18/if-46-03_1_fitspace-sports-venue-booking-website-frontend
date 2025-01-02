import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Replace with your actual API base URL

const adminService = {
    // Fetch all users
    getAllUsers: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users`);
            return response.data.data; // Assuming the response contains a `data` field with user data
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    // Delete user by ID
    deleteUser: async (userId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/${userId}/delete`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting user with ID ${userId}:`, error);
            throw error;
        }
    },

    // Fetch all venues
    getAllVenues: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/venues`, {
                headers: {
                    'Authorization': token,
                },
            });
            return response.data.data; // Assuming the response contains a `data` field with venue data
        } catch (error) {
            console.error('Error fetching venues:', error);
            throw error;
        }
    },

    createVenue: async (venueData, token) => {
        try {
            const response = await axios.post(`${BASE_URL}/venues`, venueData, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': token, // Ensure the token is passed here
                },
            });
            return response.data.data;
        } catch (error) {
            console.error("Error creating venue:", error.response?.data || error.message);
            throw error;
        }
    },

    // Update an existing venue
    updateVenue: async (venueId, venueData, token) => {
        try {
            const response = await axios.patch(`${BASE_URL}/venues/${venueId}/update`, venueData, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.data; // Assuming the response contains a `data` field with updated venue data
        } catch (error) {
            console.error(`Error updating venue with ID ${venueId}:`, error);
            throw error;
        }
    },

    // Delete a venue by ID
    deleteVenue: async (venueId, token) => {
        try {
            const response = await axios.delete(`${BASE_URL}/venues/${venueId}/delete`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting venue with ID ${venueId}:`, error);
            throw error;
        }
    },

    // Fetch all fields
    getAllFields: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/fields`, {
                headers: {
                    'Authorization': token,
                },
            });
            return response.data.data; // Assuming the response contains a `data` field with field data
        } catch (error) {
            console.error('Error fetching fields:', error);
            throw error;
        }
    },


    // Delete a field
    deleteField: async (fieldId, token) => {
        try {
            const response = await axios.delete(`${BASE_URL}/fields/${fieldId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting field with ID ${fieldId}:`, error);
            throw error;
        }
    },

    // Fetch all reviews for a field
    getAllReviews: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/reviews`, {
                headers: {
                    'Authorization': token,
                },
            });
            return response.data.data; // Assuming the response contains a `data` field with reviews data
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    },

    // Update an existing review
    updateReview: async (reviewId, reviewData, token) => {
        try {
            const response = await axios.patch(`${BASE_URL}/reviews/${reviewId}`, reviewData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error updating review with ID ${reviewId}:`, error);
            throw error;
        }
    },

    // Delete a review
        // Delete a review
        deleteReview: async (reviewId, token) => {
            try {
                const response = await axios.delete(`${BASE_URL}/reviews/${reviewId}`, {
                    headers: {
                        'Authorization': token, // Pass token for authorization
                        'Content-Type': 'application/json', // Ensure content type is correct
                    },
                });
                return response.data;
            } catch (error) {
                console.error(`Error deleting review with ID ${reviewId}:`, error);
                throw error;
            }
        },

    // Fetch all bookings
    getAllBookings: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/bookings/all`, {
                headers: {
                    'Authorization': token,
                },
            });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching bookings:', error);
            throw error;
        }
    },

    updateBooking: async (bookingId, bookingData, token) => {
        try {
            const response = await axios.patch(`${BASE_URL}/bookings/${bookingId}/update`, bookingData, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error updating booking with ID ${bookingId}:`, error);
            throw error;
        }
    },

    deleteBooking: async (bookingId, token) => {
        try {
            const response = await axios.delete(`${BASE_URL}/bookings/${bookingId}/delete`, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting booking with ID ${bookingId}:`, error);
            throw error;
        }
    },

};

export default adminService;
