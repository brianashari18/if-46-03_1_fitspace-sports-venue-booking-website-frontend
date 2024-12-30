import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getCurrent = async (token) => {
    try {
        const response = await axios.get(baseUrl + '/users/current', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error during user registration:', error.response || error.message);
        throw new Error(
            error.response?.data?.message || 'Failed to register user. Please try again later.'
        );
    }
};