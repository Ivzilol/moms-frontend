import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginForm from "./components/loginForm/LoginForm";
import PrivateRoute from "./privateRoute/PrivateRoute";
import {useUser} from "./userProvider/UserProvider";
import {jwtDecode} from "jwt-decode";
import SideMenu from "./components/sideMenu/SideMenu";


function App() {

    const user = useUser();
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


    return (

        <Routes>
            <Route path="/"
                   element={
                       roles.includes('SUPERADMIN')
                       || roles.includes('ADMIN')
                       || roles.includes('USER') ?
                           <PrivateRoute>
                               <HomePage/>
                           </PrivateRoute>
                           :
                           <PrivateRoute>
                               <LoginForm/>
                           </PrivateRoute>

                   }/>
            <Route path="/login" element={<LoginForm/>}/>
        </Routes>

        // <ErrorBoundary>
        //   <AuthProvider>
        //     <>
        //       {/* <Header /> */}
        //       <div className="main-wraper">
        //         <main className="main-content">
        //
        //             <Routes>
        //               <Route element={<LoggedInGuard />}>
        //                   <Route
        //                       path={PATH.login}
        //                       element={<LoginPage />}
        //                   />
        //               </Route>
        //               <Route element={<AuthGuard />}>
        //                   <Route
        //                       path={PATH.home}
        //                       element={<HomePage/>}
        //                   />
        //               </Route>
        //             </Routes>
        //         </main>
        //       </div>
        //     </>
        //   </AuthProvider>
        // </ErrorBoundary>

        // <ErrorBoundary>
        //   <AuthProvider>
        //     <>
        //       {/* <Header /> */}
        //       <div className="main-wraper">
        //         <main className="main-content">
        //           <Router>
        //             <Routes>
        //               <Route exact path="/" element={<HomePage />} />
        //               <Route path="/login" element={<LoginPage />} />
        //               <Route path="/register" component={RegisterPage} />
        //               <Route path="/orders" component={OrderPage} />
        //               <Route component={NotFoundPage} />
        //             </Routes>
        //           </Router>
        //         </main>
        //       </div>
        //     </>
        //   </AuthProvider>
        // </ErrorBoundary>

    );
}

export default App;
