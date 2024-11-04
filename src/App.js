import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginForm from "./components/loginForm/LoginForm";
import PrivateRoute from "./privateRoute/PrivateRoute";
import {useUser} from "./userProvider/UserProvider";
import LoginPage from "./pages/login/LoginPage";
import CreateConstructionSite from "./components/createConstructionSite/CreateConstructionSite";
import CreateOrder from "./components/createOrder/CreateOrder";
import ProcessingOrdersAdmin from "./components/ordersAdmin/ProcessingOrdersAdmin";
import OrdersUser from "./components/ordersUser/OrdersUser";
import OrderDetails from "./components/ordersAdmin/OrderDetails";
import OrderDetailsUser from "./components/ordersUser/OrderDetailsUser";
import UserForgottenPassword from "./components/userForgottenPassword/UserForgottenPassword";
import UserCreateNewPassword from "./components/userForgottenPassword/UserCreateNewPassword";
import CreateInventory from "./components/inventory/CreateInventory";
import EditConstructionSite from "./components/createConstructionSite/EditConstructionSite";
import NotFoundPage from './pages/404/NotFoundPage'
import ActiveUserOrders from "./components/ordersUser/ActiveUserOrders";
import ActiveAdminOrders from "./components/ordersAdmin/ActiveAdminOrders";
import useRolesFromJWT from "./components/customHooks/useRolesFromJWT";


function App() {
    const user = useUser([]);
    const roles = useRolesFromJWT(user);


    const hasValidRole = ['SUPERADMIN', 'ADMIN', 'USER'].some(role => roles.includes(role));
    const hasAdminSuperadminRole = ['SUPERADMIN', 'ADMIN'].some(role => roles.includes(role));
    const hasUserSuperadminRole = ['SUPERADMIN', 'USER'].some(role => roles.includes(role));
    const adminRole = ['USER', 'ADMIN'].every(role => roles.includes(role));
    const userRole = roles.length === 1 && roles.includes('USER');

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

            <Route path="/edit-construction-site"
                   element={
                       adminRole ?
                           <PrivateRoute>
                               <EditConstructionSite/>
                           </PrivateRoute>
                           :
                           <PrivateRoute>
                               <HomePage/>
                           </PrivateRoute>
                   }/>

            <Route
                path="/create-order"
                element={
                    hasValidRole ?
                        <PrivateRoute>
                            <CreateOrder/>
                        </PrivateRoute>
                        :
                        <PrivateRoute>
                            <LoginForm/>
                        </PrivateRoute>
                }
            />

            <Route path="/orders-admin" element={
                hasAdminSuperadminRole ?
                    <PrivateRoute>
                        <ProcessingOrdersAdmin/>
                    </PrivateRoute>
                    :
                    <PrivateRoute>
                        <HomePage/>
                    </PrivateRoute>
            }/>

            <Route path="/order-details/:orderNumber" element={
                hasValidRole ?
                    <PrivateRoute>
                        <OrderDetails/>
                    </PrivateRoute>
                    :
                    <PrivateRoute>
                        <HomePage/>
                    </PrivateRoute>
            }/>

            <Route path="/order-details-user" element={
                hasUserSuperadminRole ?
                    <PrivateRoute>
                        <OrdersUser/>
                    </PrivateRoute>
                    :
                    <PrivateRoute>
                        <HomePage/>
                    </PrivateRoute>
            }/>

            <Route path="/order-details-user/:number" element={
                hasUserSuperadminRole ?
                    <PrivateRoute>
                        <OrderDetailsUser/>
                    </PrivateRoute>
                    :
                    <PrivateRoute>
                        <HomePage/>
                    </PrivateRoute>
            }/>

            <Route path="/create-inventory" element={
                adminRole ?
                    <PrivateRoute>
                        <CreateInventory/>
                    </PrivateRoute>
                    :
                    <PrivateRoute>
                        <HomePage/>
                    </PrivateRoute>
            }/>

            <Route element={
                userRole ?
                    <PrivateRoute>
                        <ActiveUserOrders/>
                    </PrivateRoute>
                    :
                    <PrivateRoute>
                        <HomePage/>
                    </PrivateRoute>
            }/>
            <Route element={
                adminRole ?
                    <PrivateRoute>
                        <ActiveAdminOrders/>
                    </PrivateRoute>
                    :
                    <PrivateRoute>
                        <HomePage/>
                    </PrivateRoute>
            }/>
            <Route path="/orders-user" element={<OrdersUser/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/forgotten-password" element={<UserForgottenPassword/>}/>
            <Route path="/create-new-password" element={<UserCreateNewPassword/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>

    );
}

export default App;
