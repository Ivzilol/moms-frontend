import React from "react";

const ItemListSet = ({ items, onEdit, onDelete }) => {
    return (
        <div className="item-list">
            {items.length === 0 ? (
                <p>Няма добавени елементи.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Поцинкована ламарина дължина:</th>
                        <th>м. ед.</th>
                        <th>Цвят</th>
                        <th>Максимална дължина</th>
                        <th>м. ед.</th>
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
                            <td>{item.galvanisedSheetThickness}</td>
                            <td>{item.galvanisedSheetThicknessUnit}</td>
                            <td>{item.color}</td>
                            <td>{item.maxLength}</td>
                            <td>{item.maxLengthUnit}</td>
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
}

export default ItemListSet;