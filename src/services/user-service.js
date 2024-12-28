import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const userService  = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            });
            return response.data; // Return the response data
        } catch (error) {
            throw error.response ? error.response.data : new Error("Network Error");
        }
    },
};

export default
    userService
