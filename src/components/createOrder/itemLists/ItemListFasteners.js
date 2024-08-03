import React, {useEffect, useState} from 'react';
import './ItemListFasteners.css'
import {useUser} from "../../../userProvider/UserProvider";
import {jwtDecode} from "jwt-decode";
import ajax from "../../../service/FetchService";
import baseURL from "../../baseURL/BaseURL";

const ItemListFasteners = ({
                               orderId, items, onEdit, onDelete,
                               orderDescription, deliveryDate, orderStatus,
                               materialType, specificationFileUrl, orderNumber, constructionName
                           }) => {
    const user = useUser([]);
    const [roles, setRoles] = useState(getRolesFromJWT());
    const [selectedItems, setSelectedItems] = useState(getSelectedItemsFromStorage(orderId));
    const [currentOrderStatus, setCurrentOrderStatus] = useState(orderStatus);
    const [adminNotes, setAdminNotes] = useState({});
    const [requestBody, setRequestBody] = useState([]);

    useEffect(() => {
        setRoles(getRolesFromJWT());
    }, [user.jwt]);

    useEffect(() => {
        saveSelectedItemsToStorage(orderId, selectedItems);
    }, [selectedItems, orderId]);

    useEffect(() => {
        updateRequestBody();
    }, [adminNotes, selectedItems]);

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodeJwt = jwtDecode(user.jwt);
            return decodeJwt.roles.split(",");
        }
        return [];
    }

    function getSelectedItemsFromStorage(orderId) {
        const storedItems = localStorage.getItem(`selectedItems_${orderId}`);
        return storedItems ? JSON.parse(storedItems) : [];
    }

    function saveSelectedItemsToStorage(orderId, items) {
        localStorage.setItem(`selectedItems_${orderId}`, JSON.stringify(items));
    }

    const userRole = ['USER'].some(role => roles.includes(role));
    const adminRole = ['ADMIN'].some(role => roles.includes(role));

    const handleSelectAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map((_, index) => index));
        }
    };

    const handleSelectItem = (index) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter(i => i !== index));
        } else {
            setSelectedItems([...selectedItems, index]);
        }
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setCurrentOrderStatus(newStatus);
    };

    const handleNoteChange = (index, note) => {
        setAdminNotes(prevNotes => ({
            ...prevNotes,
            [index]: note
        }));
    };

    function updateRequestBody() {
        const body = items.map((item, index) => ({
            ...item,
            adminNote: adminNotes[index] || ''
        }));
        setRequestBody(body);
    }

    function updateOrder() {
        const formData = new FormData();
        const files = requestBody.flatMap(item => item.specification);
        files.forEach(file => formData.append("files", file));
        const payload = {
            id: orderId,
            orderNumber: orderNumber,
            orderDescription: orderDescription,
            deliveryDate: deliveryDate,
            constructionSite: {
                name: constructionName
            },
            orderStatus: currentOrderStatus,
            materialType: materialType,
            specificationFileUrl: specificationFileUrl,
            fasteners: requestBody
        };
        formData.append('order',
            new Blob([JSON.stringify(payload)], {
                type: "application/json"
            }))
        fetch(`${baseURL}user/order/command/update-order`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${user.jwt}`
            },
            body: formData
        }).then((response) => {

        })

    }

    return (
        <div>
            {adminRole && (
                <div className="order-info">
                    <p>Обект: {constructionName}</p>
                    <p>Описание на поръчката: {orderDescription}</p>
                    <p>Дата на доставка: {new Date(deliveryDate).toLocaleDateString()}</p>
                    <p>Статус на поръчката:
                        <select value={currentOrderStatus} onChange={handleStatusChange}>
                            <option value="CREATED">CREATED</option>
                            <option value="PENDING">PENDING</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="DELIVERY_IN_PROGRESS">DELIVERY IN PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                            <option value="UPDATED">UPDATED</option>
                        </select>
                    </p>
                    <p>Тип материал: {materialType}</p>
                    <p>URL на спецификацията: <a href={specificationFileUrl} target="_blank" rel="noopener noreferrer">{specificationFileUrl}</a></p>
                    <p>Номер на поръчката: {orderNumber}</p>
                </div>
            )}
            <div className="item-list">
                {items.length === 0 ? (
                    <p>Няма добавени материали.</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Тип</th>
                            <th>Диаметър</th>
                            <th>Дължина</th>
                            <th>м. ед.</th>
                            <th>Модел</th>
                            <th>Клас</th>
                            <th>Количество</th>
                            <th>Описани</th>
                            {userRole && <th>Редакция</th>}
                            {userRole && <th>Изтриване</th>}
                            {adminRole && <th>Бележка от админ</th>}
                            {adminRole && (
                                <th>
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedItems.length === items.length}
                                    />
                                </th>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => (
                            <tr key={index} style={{ backgroundColor: selectedItems.includes(index) ? '#d3d3d3' : 'transparent' }}>
                                <td>{index + 1}</td>
                                <td>{item.type}</td>
                                <td>{item.diameter}</td>
                                <td>{item.length}</td>
                                <td>{item.lengthUnit}</td>
                                <td>{item.model}</td>
                                <td>{item.clazz}</td>
                                <td>{item.quantity}</td>
                                <td>{item.description}</td>
                                {userRole && (
                                    <td>
                                        <i
                                            className="fas fa-edit"
                                            onClick={() => onEdit(item, index)}
                                            title="Edit"
                                        ></i>
                                    </td>
                                )}
                                {userRole && (
                                    <td>
                                        <i
                                            className="fas fa-trash"
                                            onClick={() => onDelete(index)}
                                            title="Delete"
                                        ></i>
                                    </td>
                                )}
                                {adminRole && (
                                    <td>
                                        <input
                                            type="text"
                                            value={adminNotes[index] || ''}
                                            onChange={(e) => handleNoteChange(index, e.target.value)}
                                        />
                                    </td>
                                )}
                                {adminRole && (
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleSelectItem(index)}
                                            checked={selectedItems.includes(index)}
                                        />
                                    </td>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
                {adminRole && (
                    <button
                        id="save-button"
                        type="submit"
                        onClick={() => updateOrder()}
                    >Save</button>
                )}
            </div>
        </div>
    );
};

export default ItemListFasteners;