import {useUser} from "../../userProvider/UserProvider";
import {useEffect, useState} from "react";
import ajax from "../../service/FetchService";
import baseURL from "../baseURL/BaseURL";
import Header from "../Header/Header";
import {useNavigate} from "react-router-dom";

const OrdersUser = () => {

    const user = useUser();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [constructionSites, setConstructionSites] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [selectedConstructionSite, setSelectedConstructionSite] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        ajax(`${baseURL}user/order/query/get-my-orders`, "GET", user.jwt)
            .then((response) => {
                setOrders(response);
                setFilteredOrders(response);

                const uniqueConstructionSites = [...new Set(response.map(order => order.constructionSite.name))];
                const uniqueStatuses = [...new Set(response.map(order => order.orderStatus))];

                setConstructionSites(uniqueConstructionSites);
                setStatuses(uniqueStatuses);
            })

    }, []);

    useEffect(() => {
        filterOrders();
    }, [selectedConstructionSite, selectedStatus]);

    const filterOrders = () => {
        let filtered = orders;

        if (selectedConstructionSite) {
            filtered = filtered.filter(order => order.constructionSite.name === selectedConstructionSite);
        }

        if (selectedStatus) {
            filtered = filtered.filter(order => order.orderStatus === selectedStatus);
        }

        setFilteredOrders(filtered);
    };

    const handleOrderClick = (number) => {
        navigate(`/order-details-user/${number}`)
    };

    return (
        <>
            <Header/>
            <div className="orders-container">
                <h2>Списък на поръчките</h2>
                <div className="filters">
                    <select
                        value={selectedConstructionSite}
                        onChange={(e) => setSelectedConstructionSite(e.target.value)}
                    >
                        <option value="">Всички обекти</option>
                        {constructionSites.map(site => (
                            <option key={site} value={site}>{site}</option>
                        ))}
                    </select>

                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="">Всички статуси</option>
                        {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div className="orders-list">
                    {filteredOrders.map((order) => (
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