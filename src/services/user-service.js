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

export const login = async (userData) => {
    try {
        const response = await axios.post(baseUrl + '/auth/login',userData , {
            headers :{
                'Content-Type' : 'application/json',
            }
        });
        localStorage.setItem("token",response.data.data.token)
        return response.data
    } catch (error){
        console.error('Error during Login ', error.response || error.message);
        throw new Error(
            error.response?.data?.message || 'Failed to login. Please try again later.')
    }
}

export const forgotPassword = async (email) => {
    console.log(`EMAIL: ${email}`);
    try {
        return await axios.post(baseUrl + "/auth/forgot-password",email, {
            headers :{
                'Content-Type': 'application/json'
            }
        })

    }catch (error){
        console.error(error.response || error.message);
        throw new Error(
            error.response?.data?.message )
    }
}

export const validateOtp = async (otp) => {
    try {
        const res = await axios.post(baseUrl + '/auth/validate-otp',otp ,{
            headers :{
                'Content-Type': 'application/json'
            }
        })
        localStorage.setItem("token",res.data.data.token)
    }catch (error) {
        console.error(error.response || error.message);
        throw new Error(
            error.response?.data?.message )
    }
}

export const resetPassword = async (userData) => {
    try {
        const token = localStorage.getItem("token");
        await axios.patch(baseUrl + '/auth/reset-password',userData ,{
            headers :{
                'Content-Type': 'application/json',
                'Reset-Token' : token
            }
        })
        localStorage.removeItem("token")
    }catch (error) {
        console.error(error.response || error.message);
        throw new Error(
            error.response?.data?.message )
    }
}

export const resendCode = async (email) => {
    try {
        return await axios.post(baseUrl + "/auth/forgot-password",email, {
            headers :{
                'Content-Type': 'application/json'
            }
        })
    }catch (error) {
        console.error(error.response || error.message);
        throw new Error(
            error.response?.data?.message )
    }
}

export const updateProfile = async (token, profileData) => {
    try {
        const response = await axios.patch(
            `${baseUrl}/users/current`,
            profileData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error.response || error.message);
        throw new Error(
            error.response?.data?.message || "Failed to update profile."
        );
    }
};
