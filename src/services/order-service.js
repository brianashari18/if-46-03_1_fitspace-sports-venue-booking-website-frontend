import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const OrderService = {

    getOrder: async (token) => {
        const user = localStorage.getItem("user")
        console.log(user)
        try {
            const response = await axios.get(`${baseUrl}/bookings`, {
                headers: {
                'Content-Type': 'application/json',
                    'Authorization': token
            },
        });
            console.log(response.data)

            return response.data.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    getSchedule: async (token, id) => {
        try {
            const response = await axios.get(`${baseUrl}/bookings/schedule/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });
            console.log(response.data);

            return response.data.data;
        } catch (error) {
            console.error('Error fetching schedule:', error);
            throw error;
        }
    },


    updateBooking: async (bookingId, bookingData, token) => {
        try {
            const response = await axios.patch(`${baseUrl}/bookings/${bookingId}/update`, bookingData, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error updating booking with ID ${bookingId}:`, error);
            throw error;
        }
    },

}

export default OrderService;