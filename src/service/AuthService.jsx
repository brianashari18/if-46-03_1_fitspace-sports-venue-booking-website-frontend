import axios from 'axios';

const BASE_URL = 'http://192.168.18.11:8080/api/auth';

const AuthService = {
  async login(email, password) {
    try {
      const responseLogin = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });

      if (responseLogin.status === 200) {
        const { data: user } = responseLogin.data;
        const token = user.token;

        const responseUser = await axios.get(`${BASE_URL}/current`, {
          headers: { Authorization: token },
        });

        if (responseUser.status === 200) {
          const { data: userData } = responseUser.data;

          const user = {
            id: userData.id,
            username: userData.username,
            email,
            token,
          };
          
          // Save user to local storage or any persistent storage
          localStorage.setItem('user', JSON.stringify(user));

          return { success: true, user };
        } else {
          return { success: false, error: responseUser.data.errors };
        }
      } else {
        return { success: false, error: 'Wrong username or password' };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.errors || error.message };
    }
  },

  async register(email, username, password, confirmPassword) {
    try {
      const responseRegister = await axios.post(`${BASE_URL}/register`, {
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

  async forgotPassword(email) {
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, { email });

      if (response.status === 200) {
        const { message } = response.data;
        return {
          success: true,
          message,
        };
      } else {
        return { success: false, error: response.data.errors };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.errors || error.message };
    }
  },

  async validateOTP(otp) {
    try {
      const response = await axios.post(`${BASE_URL}/validateOtp`, { otp });

      if (response.status === 200) {
        const { message } = response.data;
        return {
          success: true,
          message,
        };
      } else {
        return { success: false, error: response.data.errors };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.errors || error.message };
    }
  },

  async resetPassword(newPassword, confirmPassword, email) {
    try {
      const response = await axios.post(`${BASE_URL}/reset-password`, {
        newPassword,
        confirmPassword,
        email,
      });

      if (response.status === 200) {
        const { message } = response.data;
        return {
          success: true,
          message,
        };
      } else {
        return { success: false, error: response.data.errors };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.errors || error.message };
    }
  },
};

export default AuthService;