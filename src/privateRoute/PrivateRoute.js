import React, {useEffect, useState} from 'react';
import {useUser} from "../userProvider/UserProvider";
import {Navigate} from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const user = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const validateToken = async () => {
            if (user.jwt) {
                try {
                    const response = await fetch(`http://localhost:8080/v1/authentication/validate?token=${user.jwt}`, {
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
        return <div>Loading...</div>;
    }

    if (isValid) {
        return children;
    }

    return <Navigate to="/login" />;
};

export default PrivateRoute;