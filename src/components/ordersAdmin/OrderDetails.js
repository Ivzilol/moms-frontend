import baseURL from "../baseURL/BaseURL";
import ItemListGalvanizedSheet from "../createOrder/itemLists/ItemListGalvanizedSheet";
import ItemListFasteners from "../createOrder/itemLists/ItemListFasteners";
import {useUser} from "../../userProvider/UserProvider";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ajax from "../../service/FetchService";

const OrderDetails = () => {
    const id = window.location.href.split("/order-details/")[1];
    const user = useUser();
    const [order, setOrder] = useState([]);

    useEffect(() => {
        ajax(`${baseURL}admin/order/query/get-order/${parseInt(id)}`, "GET", user.jwt)
            .then((response) => {
                setOrder(response);
            })
    }, [user.jwt, id]);

    if (!order) return <p>Loading...</p>;

    return (
        <div className="order-details-container">
            {order.galvanisedSheets && (
                <div>
                    <ItemListGalvanizedSheet items={order.galvanisedSheets} onEdit={() => {}} onDelete={() => {}} />
                </div>
            )}
            {order.fasteners && (
                <div>
                    <ItemListFasteners
                        orderId={parseInt(id)}
                        items={order.fasteners}
                        onEdit={() => {}}
                        onDelete={() => {}}
                        orderDescription={order.orderDescription}
                        deliveryDate={order.deliveryDate}
                        orderStatus={order.orderStatus}
                        materialType={order.materialType}
                        specificationFileUrl={order.specificationFileUrl}
                        orderNumber={order.orderNumber}
                        constructionName={order.constructionSite.name}
                    />
                </div>
            )}
        </div>
    );
};

export default OrderDetails;