import {useUser} from "../../userProvider/UserProvider";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ajax from "../../service/FetchService";
import baseURL from "../baseURL/BaseURL";

const ActiveUserOrders = () => {
    const user = useUser();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        ajax(`${baseURL}user/order/query/get-all`, "GET", user.jwt)
            .then((response) => {
                const activeOrders = response.filter(order => order.status !== 'COMPLETED');
                setOrders(activeOrders);
            })
    }, []);


    const handleOrderClick = (number) => {
        navigate(`/order-details-user/${number}`)
    };

    return (
        <>
            <div className="orders-container">
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.orderNumber}
                             className="order-summary"
                             onClick={() => handleOrderClick(order.orderNumber)}>
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
    )
}

export default ActiveUserOrders;