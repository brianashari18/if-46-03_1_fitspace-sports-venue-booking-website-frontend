import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const addField = async (token, venueId, fieldData) => {
    try {
        const response = await axios.post(baseUrl + `/venues/${venueId}/fields`, fieldData, {
            headers: {
                "Content-Type" : "application/json",
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding field:", error);
        throw new Error(
            error.response?.data?.errors || "Failed to add field."
        );
    }
};