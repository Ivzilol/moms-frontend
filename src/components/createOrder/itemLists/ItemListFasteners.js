import React, {useEffect, useState} from 'react';
import './ItemListFasteners.css'
import {useUser} from "../../../userProvider/UserProvider";
import {jwtDecode} from "jwt-decode";

const ItemListFasteners = ({ items, onEdit, onDelete }) => {
    const user = useUser([]);
    const [roles, setRoles] = useState(getRolesFromJWT());
    const [selectedItems, setSelectedItems] = useState(getSelectedItemsFromStorage());

    useEffect(() => {
        setRoles(getRolesFromJWT());
    }, [user.jwt]);

    useEffect(() => {
        saveSelectedItemsToStorage(selectedItems);
    }, [selectedItems]);

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodeJwt = jwtDecode(user.jwt);
            return decodeJwt.roles.split(",");
        }
        return [];
    }

    function getSelectedItemsFromStorage() {
        const storedItems = localStorage.getItem('selectedItems');
        return storedItems ? JSON.parse(storedItems) : [];
    }

    function saveSelectedItemsToStorage(items) {
        localStorage.setItem('selectedItems', JSON.stringify(items));
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

    return (
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
        </div>
    );
};

export default ItemListFasteners;