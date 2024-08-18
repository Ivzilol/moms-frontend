import {useParams} from "react-router-dom";
import {useUser} from "../../userProvider/UserProvider";
import {useEffect, useState} from "react";
import ajax from "../../service/FetchService";
import baseURL from "../baseURL/BaseURL";
import ItemListGalvanizedSheet from "../createOrder/itemLists/ItemListGalvanizedSheet";
import ItemListFasteners from "../createOrder/itemLists/ItemListFasteners";
import ItemListInsulation from "../createOrder/itemLists/ItemListInsulation";
import ItemListMetal from "../createOrder/itemLists/ItemListMetal";

const OrderDetailsUser = () => {

    const {number} = useParams();
    const user = useUser();
    const [order, setOrder] = useState([]);

    useEffect(() => {
        ajax(`${baseURL}user/order/query/get-order-by-orderNumber/${number}`, "GET", user.jwt)
            .then((response) => {
                console.log(response)
                setOrder(response);
            })

    }, [])

    if (!order) return <p>Loading...</p>;

    return (
        <div className="order-details-container">
            {order.fasteners && (
                <div>
                    <ItemListFasteners
                        items={order.fasteners}
                        onEdit={() => {
                        }}
                        onDelete={() => {
                        }}
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
            {order.galvanisedSheets && (
                <div>
                    <ItemListGalvanizedSheet
                        items={order.galvanisedSheets}
                        onEdit={() => {
                        }}
                        onDelete={() => {
                        }}
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
            {order.insulation && (
                <div>
                    <ItemListInsulation
                        items={order.insulation}
                        onEdit={() => {
                        }}
                        onDelete={() => {
                        }}
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
            {order.metals && (
                <div>
                    <ItemListMetal
                        items={order.metals}
                        onEdit={() => {
                        }}
                        onDelete={() => {
                        }}
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
    )

}

export default OrderDetailsUser;