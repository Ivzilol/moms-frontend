import {useEffect, useState} from "react";
import {useUser} from "../../userProvider/UserProvider";
import { useNavigate } from "react-router-dom";
import ajax from "../../service/FetchService";
import baseURL from "../baseURL/BaseURL";
import './ProcessingOrdersAdmin.css'

const ProcessingOrdersAdmin = () => {

    const user = useUser();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        ajax(`${baseURL}admin/order/query/get-all`, "GET", user.jwt)
            .then((response) => {
                setOrders(response);
            });
    }, [user.jwt]);

    const handleOrderClick = (id) => {
            navigate(`/order-details/${id}`);
    };

    return (
        <div className="orders-container">
            <h2>Списък на поръчките</h2>
            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order.id}
                         className="order-summary"
                         onClick={() => handleOrderClick(parseFloat(order.id))}>
                        <p>Обект: {order.constructionSite.name}</p>
                        <p>Статус: {order.orderStatus}</p>
                        <p>Тип материал: {order.materialType}</p>
                        <p>Дата на доставка: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProcessingOrdersAdmin;