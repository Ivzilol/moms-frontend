
import React from 'react';
import './ItemListFasteners.css'

const ItemListFasteners = ({ items, onEdit, onDelete }) => {
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
                        <th>Редакция</th>
                        <th>Изтриване</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.type}</td>
                            <td>{item.diameter}</td>
                            <td>{item.length}</td>
                            <td>{item.lengthUnit}</td>
                            <td>{item.model}</td>
                            <td>{item.classType}</td>
                            <td>{item.quantity}</td>
                            <td>{item.description}</td>
                            <td>
                                <i
                                    className="fas fa-edit"
                                    onClick={() => onEdit(item, index)}
                                    title="Edit"
                                ></i>
                            </td>
                            <td>
                                <i
                                    className="fas fa-trash"
                                    onClick={() => onDelete(index)}
                                    title="Delete"
                                ></i>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ItemListFasteners;