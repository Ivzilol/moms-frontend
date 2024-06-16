// managing authentication state
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AuthService from '../services/AuthService';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setToken = (newToken) => {
    setToken_(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const data = await AuthService.login(email, password);
      setToken(data.accessToken);
      const currentUser = AuthService.getCurrentUser();
      setUser(currentUser);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setToken(null);
    setUser(null);
  };

  const register = async (data) => {
    try {
      const response = await AuthService.register(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const contextValue = useMemo(
    () => ({
      token,
      user,
      loading,
      login,
      logout,
      register,
      setToken,
    }),
    [token, user, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


export {AuthContext, AuthProvider};
