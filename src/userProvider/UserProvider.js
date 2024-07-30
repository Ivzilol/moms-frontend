import React, {createContext, useContext, useState } from "react";
import {useLocalState} from "../util/useLocalState";
import { host, endpoints } from '../core/environments/constants'

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [jwt, setJwt] = useLocalState(null, "jwt");
    const [userProfile, setUserProfile] = useState(null);
  

    const getUserDetails = async (id) => {
        if (!jwt) {
            throw new Error('JWT token is required to fetch user details');
        }

        try {
            const response = await fetch(`${host}${endpoints.getUserProfile(id)}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
                method: 'GET'
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    };

    const register = async (values) => {
        try {
            const response = await fetch(host + endpoints.register, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
                body: JSON.stringify({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                    role: values.role,
                }),
            });

            if (response.status === 200) {
                
                console.log('Registration successful', response);
            
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const logout = () => {
        setJwt(null);
    };

    const value = { jwt, 
                    setJwt, 
                    userProfile, 
                    setUserProfile, 
                    getUserDetails, 
                    logout,
                    register
                };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {

    }
    return context;
}


export {UserProvider, useUser} ;