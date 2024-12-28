import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(baseUrl + '/users', userData, {
            headers: {
                'Content-Type': 'application/json',
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

export const login = async (userData) => {
    try {
        const response = await axios.post(baseUrl + '/auth/login',userData , {
            headers :{
                'Content-Type' : 'application/json',
            }
        });
        return response.data
    } catch (error){
        console.error('Error during Login ', error.response || error.message);
        throw new Error(
            error.response?.data?.message || 'Failed to login. Please try again later.')
    }
}
