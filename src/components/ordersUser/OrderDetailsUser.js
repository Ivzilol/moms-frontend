import {useParams} from "react-router-dom";
import {useUser} from "../../userProvider/UserProvider";
import {useEffect, useState} from "react";
import ajax from "../../service/FetchService";
import baseURL from "../baseURL/BaseURL";
import ItemListGalvanizedSheet from "../createOrder/itemLists/ItemListGalvanizedSheet";
import ItemListFasteners from "../createOrder/itemLists/ItemListFasteners";

const OrderDetailsUser = () => {

    const {number} = useParams();
    const user = useUser();
    const [order, setOrder] = useState([]);

    useEffect(() => {
        ajax(`${baseURL}user/order/query/get-order-by-orderNumber/${number}`, "GET", user.jwt)
            .then((response) => {
                setOrder(response);
            })

    }, [])

    if (!order) return <p>Loading...</p>;

    return(
        <div className="order-details-container">
            {order.galvanisedSheets && (
                <div>
                    <ItemListGalvanizedSheet items={order.galvanisedSheets} onEdit={() => {
                    }} onDelete={() => {
                    }}/>
                </div>
            )}
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
        </div>
    )

}

export default OrderDetailsUser;