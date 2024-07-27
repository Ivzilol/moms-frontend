
import React from 'react';
import './ItemList.css'

const ItemList = ({ items }) => {
    return (
        <div className="item-list">
            {items.length === 0 ? (
                <p>Няма добавени елементи.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Име</th>
                        <th>Тип</th>
                        <th>Диаметър</th>
                        <th>Дължина</th>
                        <th>Модел</th>
                        <th>Клас</th>
                        <th>Количество</th>
                        <th>Описани</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.diameter}</td>
                            <td>{item.length}</td>
                            <td>{item.model}</td>
                            <td>{item.classType}</td>
                            <td>{item.quantity}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ItemList;