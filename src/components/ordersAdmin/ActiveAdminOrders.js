import {useUser} from "../../userProvider/UserProvider";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ajax from "../../service/FetchService";
import baseURL from "../baseURL/BaseURL";
import Header from "../Header/Header";

const ActiveAdminOrders = () => {
    const user = useUser();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        ajax(`${baseURL}admin/order/query/get-all`, "GET", user.jwt)
            .then((response) => {
                const activeOrders = response.filter(order => order.status !== 'COMPLETED');
                setOrders(activeOrders);
            });
    }, [user.jwt]);


    const handleOrderClick = (id) => {
        navigate(`/order-details/${id}`);
    };

    return (
        <>
            <div className="orders-container">
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.id}
                             className="order-summary"
                             onClick={() => handleOrderClick(parseFloat(order.id))}>
                            <p>Обект: {order.constructionSite.name}</p>
                            <p>Автор на поръчката: {order.fullName}</p>
                            <p>Статус: {order.orderStatus}</p>
                            <p>Тип материал: {order.materialType}</p>
                            <p>Дата на доставка: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ActiveAdminOrders;