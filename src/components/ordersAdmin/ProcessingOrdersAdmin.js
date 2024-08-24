import React, {useEffect, useState} from "react";
import {useUser} from "../../userProvider/UserProvider";
import {useNavigate} from "react-router-dom";
import ajax from "../../service/FetchService";
import baseURL from "../baseURL/BaseURL";
import './ProcessingOrdersAdmin.css'
import Header from "../Header/Header";

const ProcessingOrdersAdmin = () => {

    const user = useUser();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [constructionSites, setConstructionSites] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [selectedConstructionSite, setSelectedConstructionSite] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        ajax(`${baseURL}admin/order/query/get-all`, "GET", user.jwt)
            .then((response) => {
                setOrders(response);
                setFilteredOrders(response);

                const uniqueConstructionSites = [...new Set(response.map(order => order.constructionSite.name))];
                const uniqueStatuses = [...new Set(response.map(order => order.orderStatus))];

                setConstructionSites(uniqueConstructionSites);
                setStatuses(uniqueStatuses);
            });
    }, [user.jwt]);

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

    const handleOrderClick = (id) => {
        navigate(`/order-details/${id}`);
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

export default ProcessingOrdersAdmin;