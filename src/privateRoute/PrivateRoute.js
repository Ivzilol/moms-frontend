import React, {useState} from 'react';
import {useUser} from "../userProvider/UserProvider";
import {Navigate} from "react-router-dom";
import ajax from "../service/FetchService";



const PrivateRoute = (props) => {
    const user = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);
    const {children} = props;

    if (user) {
        ajax(`http://localhost:8080/api/auth/validate?token=${user.jwt}`, "GET", user.jwt)
            .then(isValid => {
                setIsValid(isValid);
                setIsLoading(false);
            });
    } else {
        return <Navigate to="/login"/>
    }

    return isLoading ? (
        <div>Loading...</div>
    ) : isValid === true ? (
        children
    ) : (
        <Navigate to="/login"/>
    );
};

export default PrivateRoute;