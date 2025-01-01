import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getVenueFromAllOwner = async (token) => {
    try {
        const response = await axios.get(baseUrl + "/venues/owner", {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching venues:", error);
        throw new Error(
            error.response?.data?.errors || "Failed to fetch venue data."
        );
    }
};

export const addVenue = async (token, venueData) => {
    try {
        const response = await axios.post(baseUrl + "/venues", venueData, {
            headers: {
                "Content-Type" : "application/json",
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
};