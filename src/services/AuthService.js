// Handles the API calls and local storage operations
import { jwtDecode } from 'jwt-decode';
import api from '../api/api';
import { request } from '../utils/helpers';

const apiEndpoint = '/auth';

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await request('POST', `${apiEndpoint}/login`, { email, password });
      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data);
      } else {
        throw new Error(error.message);
      }
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    window.location.reload(false);
  },

  register: async (data) => {
    const response = await api.post(`${apiEndpoint}/register`, data);
    return response.data;
  },

  getCurrentUser: () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token has expired
          return null;
        }
        return decodedToken;
      } catch (error) {
        // Handle token decoding error
        return null;
      }
    }
    return null;
  }
};

export default AuthService;