import axios from 'axios';

const BASE_URL = 'http://192.168.18.25:8080/api/users';

const UserService = {
  async register(email, username, password, confirmPassword) {
    try {
      const responseRegister = await axios.post(`${BASE_URL}`, {
        email,
        username,
        password,
        confirmPassword,
      });

      if (responseRegister.status === 200) {
        const { data } = responseRegister.data;
        return {
          success: true,
          id: data.id,
          email,
          username,
        };
      } else {
        return { success: false, error: responseRegister.data.errors };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.errors || error.message };
    }
  },
};

export default UserService;