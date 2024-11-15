import React, {useEffect, useState} from 'react';
import {useUser} from "../userProvider/UserProvider";
import {Navigate} from "react-router-dom";

import Spinner from '../components/spinner/Spinner';
import baseURL from "../components/baseURL/BaseURL";


const PrivateRoute = ({ children }) => {
    const user = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const validateToken = async () => {
            if (user.jwt) {
                try {
                    const response = await fetch(`${baseURL}authentication/validate?token=${user.jwt}`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${user.jwt}`,
                            "Content-Type": "application/json"
                        }
                    });
                    const text = await response.text();
                    if (text === "Token is valid") {
                        setIsValid(true);
                    } else {
                        setIsValid(false);
                    }
                } catch (error) {
                    setIsValid(false);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        validateToken();
    }, [user.jwt]);

    if (isLoading) {
        return <div><Spinner/></div>;
    }

    if (isValid) {
        return children;
    }

    return <Navigate to="/login" />;
};

export default PrivateRoute;