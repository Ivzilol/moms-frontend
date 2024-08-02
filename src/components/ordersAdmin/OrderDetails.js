import baseURL from "../baseURL/BaseURL";
import ItemListGalvanizedSheet from "../createOrder/itemLists/ItemListGalvanizedSheet";
import ItemListFasteners from "../createOrder/itemLists/ItemListFasteners";
import {useUser} from "../../userProvider/UserProvider";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ajax from "../../service/FetchService";

const OrderDetails = () => {
    const { orderNumber } = useParams();
    const user = useUser();
    const [order, setOrder] = useState([]);

    useEffect(() => {
        ajax(`${baseURL}user/order/query/get-order-by-orderNumber/${orderNumber}`, "GET", user.jwt)
            .then((response) => {
                setOrder(response);
            });
    }, [user.jwt, orderNumber]);

    if (!order) return <p>Loading...</p>;

    return (
        <div className="order-details-container">
            <h3>Детайли за поръчка #{order.orderNumber}</h3>
            {order.galvanisedSheets && (
                <div>
                    <h4>Галванизирани листове</h4>
                    <ItemListGalvanizedSheet items={order.galvanisedSheets} onEdit={() => {}} onDelete={() => {}} />
                </div>
            )}
            {order.fasteners && (
                <div>
                    <h4>Закопчалки</h4>
                    <ItemListFasteners items={order.fasteners} onEdit={() => {}} onDelete={() => {}} />
                </div>
            )}
        </div>
    );
};

export default OrderDetails;