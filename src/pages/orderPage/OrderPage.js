import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../../components/Header/Header";
import ProcessingOrdersAdmin from "../../components/ordersAdmin/ProcessingOrdersAdmin";
import OrdersUser from "../../components/ordersUser/OrdersUser";


const OrderPage = () => {
    return (
        <>
            <ProcessingOrdersAdmin/>
            <OrdersUser/>
        </>
    )
};

export default OrderPage;
