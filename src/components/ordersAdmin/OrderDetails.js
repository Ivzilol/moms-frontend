import baseURL from "../baseURL/BaseURL";
import ItemListGalvanizedSheet from "../createOrder/itemLists/ItemListGalvanizedSheet";
import ItemListFasteners from "../createOrder/itemLists/ItemListFasteners";
import {useUser} from "../../userProvider/UserProvider";
import {useEffect, useState} from "react";
import ajax from "../../service/FetchService";
import {jwtDecode} from "jwt-decode";
import ItemListInsulation from "../createOrder/itemLists/ItemListInsulation";
import ItemListMetal from "../createOrder/itemLists/ItemListMetal";
import ItemListPanel from "../createOrder/itemLists/ItemListPanel";
import ItemListRebar from "../createOrder/itemLists/ItemListRebar";
import ItemListSet from "../createOrder/itemLists/ItemListSet";
import ItemListUnspecified from "../createOrder/itemLists/ItemListUnspecified";
import ItemListService from "../createOrder/itemLists/ItemListService";
import ItemListTransport from "../createOrder/itemLists/ItemListTransport";
import Spinner from "../spinner/Spinner";

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


    if (!order) return <p><Spinner/></p>;

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
                        authorName={order.fullName}
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
                        authorName={order.fullName}
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
                        authorName={order.fullName}
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
                        authorName={order.fullName}
                    />
                </div>
            )}
            {order.panels && (
                <div>
                    <ItemListPanel
                        orderId={parseInt(id)}
                        items={order.panels}
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
                        authorName={order.fullName}
                    />
                </div>
            )}
            {order.rebars && (
                <div>
                    <ItemListRebar
                        orderId={parseInt(id)}
                        items={order.rebars}
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
                        authorName={order.fullName}
                    />
                </div>
            )}
            {order.sets && (
                <div>
                    <ItemListSet
                        orderId={parseInt(id)}
                        items={order.sets}
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
                        authorName={order.fullName}
                    />
                </div>
            )}
            {order.unspecified && (
                <div>
                    <ItemListUnspecified
                        orderId={parseInt(id)}
                        items={order.unspecified}
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
                        authorName={order.fullName}
                    />
                </div>
            )}
            {order.services && (
                <div>
                    <ItemListService
                        orderId={parseInt(id)}
                        items={order.services}
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
                        authorName={order.fullName}
                    />
                </div>
            )}
            {order.transports && (
                <div>
                    <ItemListTransport
                        orderId={parseInt(id)}
                        items={order.transports}
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
                        authorName={order.fullName}
                    />
                </div>
            )}
        </div>
    );
};

export default OrderDetails;