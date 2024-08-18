import baseURL from "../baseURL/BaseURL";
import ItemListGalvanizedSheet from "../createOrder/itemLists/ItemListGalvanizedSheet";
import ItemListFasteners from "../createOrder/itemLists/ItemListFasteners";
import {useUser} from "../../userProvider/UserProvider";
import {useEffect, useState} from "react";
import ajax from "../../service/FetchService";
import {jwtDecode} from "jwt-decode";
import ItemListInsulation from "../createOrder/itemLists/ItemListInsulation";
import ItemListMetal from "../createOrder/itemLists/ItemListMetal";

const OrderDetails = () => {
    const id = window.location.href.split("/order-details/")[1];
    const user = useUser();
    const [order, setOrder] = useState([]);


    useEffect(() => {
        ajax(`${baseURL}admin/order/query/get-order/${parseInt(id)}`, "GET", user.jwt)
            .then((response) => {
                console.log(response)
                setOrder(response);
            })
    }, [user.jwt, id]);


    if (!order) return <p>Loading...</p>;

    return (
        <div className="order-details-container">
            {order.fasteners && (
                <div>
                    <ItemListFasteners
                        orderId={parseInt(id)}
                        items={order.fasteners}
                        onEdit={() => {
                        }}
                        onDelete={() => {
                        }}
                        orderDescription={order.orderDescription}
                        orderDate={order.orderDate}
                        deliveryDate={order.deliveryDate}
                        orderStatus={order.orderStatus}
                        materialType={order.materialType}
                        specificationFileUrl={order.specificationFileUrl}
                        orderNumber={order.orderNumber}
                        constructionName={order.constructionSite.name}
                    />
                </div>
            )}
            {order.galvanisedSheets && (
                <div>
                    <ItemListGalvanizedSheet
                        orderId={parseInt(id)}
                        items={order.galvanisedSheets}
                        onEdit={() => {
                        }}
                        onDelete={() => {
                        }}
                        orderDescription={order.orderDescription}
                        orderDate={order.orderDate}
                        deliveryDate={order.deliveryDate}
                        orderStatus={order.orderStatus}
                        materialType={order.materialType}
                        specificationFileUrl={order.specificationFileUrl}
                        orderNumber={order.orderNumber}
                        constructionName={order.constructionSite.name}
                    />
                </div>
            )}
            {order.insulation && (
                <div>
                    <ItemListInsulation
                        orderId={parseInt(id)}
                        items={order.insulation}
                        onEdit={() => {
                        }}
                        onDelete={() => {
                        }}
                        orderDescription={order.orderDescription}
                        orderDate={order.orderDate}
                        deliveryDate={order.deliveryDate}
                        orderStatus={order.orderStatus}
                        materialType={order.materialType}
                        specificationFileUrl={order.specificationFileUrl}
                        orderNumber={order.orderNumber}
                        constructionName={order.constructionSite.name}
                    />
                </div>
            )}
            {order.metals && (
                <div>
                    <ItemListMetal
                        orderId={parseInt(id)}
                        items={order.metals}
                        onEdit={() => {
                        }}
                        onDelete={() => {
                        }}
                        orderDescription={order.orderDescription}
                        orderDate={order.orderDate}
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