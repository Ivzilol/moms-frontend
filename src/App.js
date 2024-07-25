import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginForm from "./components/loginForm/LoginForm";
import PrivateRoute from "./privateRoute/PrivateRoute";
import {useUser} from "./userProvider/UserProvider";
import {jwtDecode} from "jwt-decode";
import SideMenu from "./components/sideMenu/SideMenu";
import LoginPage from "./pages/login/LoginPage";
import CreateConstructionSite from "./components/createConstructionSite/CreateConstructionSite";


function App() {
    const user = useUser([]);
    const [roles, setRoles] = useState(getRolesFromJWT());

    useEffect(() => {
        setRoles(getRolesFromJWT())
    }, [user.jwt])

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodeJwt = jwtDecode(user.jwt)
            return decodeJwt.roles.split(",")
        }
        return [];
    }

    const hasValidRole = ['SUPERADMIN', 'ADMIN', 'USER'].some(role => roles.includes(role));
    const hasAdminSuperadminRole = ['SUPERADMIN', 'ADMIN'].some(role => roles.includes(role));
    return (

        <Routes>
            <Route path="/"
                   element={
                       hasValidRole ?
                           <PrivateRoute>
                               <HomePage/>
                           </PrivateRoute>
                           :
                           <PrivateRoute>
                               <LoginForm/>
                           </PrivateRoute>

                   }/>
            <Route path="/create-construction-site"
                   element={
                       hasAdminSuperadminRole ?
                           <PrivateRoute>
                               <CreateConstructionSite/>
                           </PrivateRoute>
                           :
                           <PrivateRoute>
                               <HomePage/>
                           </PrivateRoute>
                   }/>

            <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    );
}

export default App;
