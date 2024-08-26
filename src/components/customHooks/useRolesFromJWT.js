import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

function UseRolesFromJWT(user) {

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        setRoles(getRolesFromJWT());
    }, [user.jwt]);

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodeJwt = jwtDecode(user.jwt);
            return decodeJwt.roles.split(",");
        }
        return [];
    }

    return roles;

}

export default UseRolesFromJWT;