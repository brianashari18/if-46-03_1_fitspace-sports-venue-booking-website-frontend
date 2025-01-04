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

export const updateField = async (token, venueId, fieldId, fieldData) => {
    try {
        const formData = new FormData();
        formData.append(
            "field",
            new Blob([JSON.stringify(fieldData)], { type: "application/json" })
        );
        fieldData.newImages.forEach((file) => formData.append("files", file));

        const response = await axios.patch(
            `${baseUrl}/venues/${venueId}/fields/${fieldId}`,
            formData,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating field:", error);
        throw new Error(error.response?.data?.errors || "Failed to update field.");
    }
};

export const deleteField = async (token, venueId, fieldId) => {
    try {
        const response = await axios.delete(`${baseUrl}/venues/${venueId}/fields/${fieldId}`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting field:", error);
        throw new Error(error.response?.data?.errors || "Failed to delete field.");
    }
};

export const getField = async (token, venueId, fieldId) => {
    try {
        const response = await axios.get(`${baseUrl}/venues/${venueId}/fields/${fieldId}`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting field:", error);
        throw new Error(error.response?.data?.errors || "Failed to delete field.");
    }
};