import React from "react";

const ItemListPanel = ({ items, onEdit, onDelete }) => {
    return (
        <div className="item-list">
            {items.length === 0 ? (
                <p>Няма добавени елементи.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Тип</th>
                        <th>Цвят</th>
                        <th>Дължина</th>
                        <th>м. ед.</th>
                        <th>Ширина</th>
                        <th>м. ед.</th>
                        <th>Обща дебелина</th>
                        <th>м. ед.</th>
                        <th>Дебелина преден лист</th>
                        <th>м. ед.</th>
                        <th>Дебелина заден лист</th>
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
                            <td>{item.type}</td>
                            <td>{item.color}</td>
                            <td>{item.length}</td>
                            <td>{item.lengthUnit}</td>
                            <td>{item.width}</td>
                            <td>{item.widthUnit}</td>
                            <td>{item.totalThickness}</td>
                            <td>{item.totalThicknessUnit}</td>
                            <td>{item.frontSheetThickness}</td>
                            <td>{item.frontSheetThicknessUnit}</td>
                            <td>{item.backSheetThickness}</td>
                            <td>{item.backSheetThicknessUnit}</td>
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

export default ItemListPanel;