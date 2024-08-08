import {useUser} from "../../userProvider/UserProvider";
import {useEffect, useState} from "react";
import ajax from "../../service/FetchService";
import baseURL from "../baseURL/BaseURL";
import Header from "../Header/Header";
import {useNavigate} from "react-router-dom";

const  OrdersUser = () => {

    const user = useUser();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        ajax(`${baseURL}user/order/query/get-my-orders`, "GET", user.jwt)
            .then((response) => {
                setOrders(response)
            })

    }, []);

    const handleOrderClick = (number) => {
        navigate(`/order-details-user/${number}`)
    };

    return (
        <>
            <Header/>
            <div className="orders-container">
                <h2>Списък на поръчките</h2>
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.orderNumber}
                             className="order-summary"
                             onClick={() => handleOrderClick(order.orderNumber)}>
                            <p>Обект: {order.constructionSite.name}</p>
                            <p>Статус: {order.orderStatus}</p>
                            <p>Тип материал: {order.materialType}</p>
                            <p>Дата на доставка: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default OrdersUser;