import api from '../api/api';

const AuthService = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    register: async (data) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    // Other auth-related methods
};

export default AuthService;
