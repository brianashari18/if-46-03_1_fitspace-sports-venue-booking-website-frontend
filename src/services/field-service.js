import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const addField = async (token, venueId, fieldData, files) => {
    try {
        const formData = new FormData();
        formData.append("field", new Blob([JSON.stringify(fieldData)], { type: "application/json" }));
        files.forEach((file) => formData.append("files", file));

        const response = await axios.post(`${baseUrl}/venues/${venueId}/fields`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding field:", error);
        throw new Error(error.response?.data?.errors || "Failed to add field.");
    }
};
