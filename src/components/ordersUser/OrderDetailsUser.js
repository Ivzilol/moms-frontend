import {useParams} from "react-router-dom";
import {useUser} from "../../userProvider/UserProvider";
import {useEffect, useState} from "react";
import ajax from "../../service/FetchService";
import baseURL from "../baseURL/BaseURL";
import ItemListGalvanizedSheet from "../createOrder/itemLists/ItemListGalvanizedSheet";
import ItemListFasteners from "../createOrder/itemLists/ItemListFasteners";
import ItemListInsulation from "../createOrder/itemLists/ItemListInsulation";
import ItemListMetal from "../createOrder/itemLists/ItemListMetal";
import ItemListPanel from "../createOrder/itemLists/ItemListPanel";
import ItemListRebar from "../createOrder/itemLists/ItemListRebar";
import ItemListSet from "../createOrder/itemLists/ItemListSet";
import ItemListUnspecified from "../createOrder/itemLists/ItemListUnspecified";
import ItemListService from "../createOrder/itemLists/ItemListService";
import ItemListTransport from "../createOrder/itemLists/ItemListTransport";
import Spinner from "../spinner/Spinner";

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

    if (!order) return <p><Spinner/></p>;

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
                        authorName={order.fullName}
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
                        authorName={order.fullName}
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
                        authorName={order.fullName}
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
                        authorName={order.fullName}
                    />
                </div>
            )}
            {order.panels && (
                <div>
                    <ItemListPanel
                        items={order.panels}
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
                        authorName={order.fullName}
                    />
                </div>
            )}
            {order.rebars && (
                <div>
                    <ItemListRebar
                        items={order.rebars}
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
                        authorName={order.fullName}
                    />
                </div>
            )}
            {order.sets && (
                <div>
                    <ItemListSet
                        items={order.sets}
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
                        authorName={order.fullName}
                    />
                </div>
            )}
            {order.unspecified && (
                <div>
                    <ItemListUnspecified
                        items={order.unspecified}
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
                        authorName={order.fullName}
                    />
                </div>
            )}
            {order.services && (
                <div>
                    <ItemListService
                        items={order.services}
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
                        authorName={order.fullName}
                    />
                </div>
            )}
            {order.transports && (
                <div>
                    <ItemListTransport
                        items={order.transports}
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
                        authorName={order.fullName}
                    />
                </div>
            )}
        </div>
    )

}

export default OrderDetailsUser;