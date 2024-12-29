import axios from 'axios';

const BASE_URL = 'http://192.168.18.11:8080/api/auth/login';

const AuthService = {
  async signIn(email, password) {
    try {
      const responsesignIn = await axios.post(`${BASE_URL}/signIn`, {
        email,
        password,
      });

      if (responsesignIn.status === 200) {
        const { data: user } = responsesignIn.data;
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

  async signUp(email, username, password, confirmPassword) {
    try {
      const responsesignUp = await axios.post(`${BASE_URL}/signUp`, {
        email,
        username,
        password,
        confirmPassword,
      });

      if (responsesignUp.status === 200) {
        const { data } = responsesignUp.data;
        return {
          success: true,
          id: data.id,
          email,
          username,
        };
      } else {
        return { success: false, error: responsesignUp.data.errors };
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