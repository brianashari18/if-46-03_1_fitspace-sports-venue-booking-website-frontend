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

    updateRating : async (token, Rating, venuesId) => {
        try {
            const response = await axios.patch(`${BASE_URL}/venues/${venuesId}/rating`, Rating, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            return response.data;
        }catch (error) {
            console.error("Error updating Rating :", error);
            throw new Error(
                error.response?.data?.errors || "Failed to update Rating."
            );
        }
    }
};

export default VenueService;
