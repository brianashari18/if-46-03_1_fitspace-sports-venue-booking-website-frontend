import axios from 'axios';
import {Navigate, Outlet} from "react-router-dom";

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
        localStorage.setItem("token",response.data.token)
        return response.data
    } catch (error){
        console.error('Error during Login ', error.response || error.message);
        throw new Error(
            error.response?.data?.message || 'Failed to login. Please try again later.')
    }
}

export const forgotPassword = async (email) => {
    try {
        await axios.post(baseUrl + "/auth/forgot-password",email, {
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
        localStorage.setItem("token",res.data.token)
    }catch (error) {
        console.error(error.response || error.message);
        throw new Error(
            error.response?.data?.message )
    }
}

export const resetPassword = async (userData) => {
    try {
        const token = localStorage.getItem("token");
        console.log(localStorage.getItem("token"))
        await axios.patch(baseUrl + '/auth/reset-password',userData ,{
            headers :{
                'Content-Type': 'application/json',
                'Authorization' : token ? token : null
            }
        })
        localStorage.removeItem("reset_token")
    }catch (error) {
        console.error(error.response || error.message);
        throw new Error(
            error.response?.data?.message )
    }
}