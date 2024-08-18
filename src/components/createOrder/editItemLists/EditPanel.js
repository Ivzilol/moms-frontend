import React, {useEffect, useState} from "react";

const EditPanel = ({ item, onSave, onClose }) => {
    const [editedItem, setEditedItem] = useState(item);

    useEffect(() => {
        setEditedItem(item);
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const handleSave = () => {
        onSave(editedItem);
        onClose();
    };


    return (
        <div className="edit-item-modal">
            <div className="modal-content">
                <h2>Редактиране на елемент</h2>
                <label>
                    Тип:
                    <input type="text" name="type" value={editedItem.type} onChange={handleChange} />
                </label>
                <label>
                    Цвят:
                    <input type="text" name="color" value={editedItem.color} onChange={handleChange} />
                </label>
                <label>
                    Дължина:
                    <input type="text" name="length" value={editedItem.length} onChange={handleChange} />
                </label>
                <label>
                    м. ед.:
                    <select name="lengthUnit" value={editedItem.lengthUnit} onChange={handleChange}>
                        <option value="MM">MM</option>
                        <option value="CM">CM</option>
                        <option value="M">M</option>
                    </select>
                </label>
                <label>
                    Ширина:
                    <input type="text" name="width" value={editedItem.width} onChange={handleChange} />
                </label>
                <label>
                    м. ед.:
                    <select name="widthUnit" value={editedItem.widthUnit} onChange={handleChange}>
                        <option value="MM">MM</option>
                        <option value="CM">CM</option>
                        <option value="M">M</option>
                    </select>
                </label>
                <label>
                    Обща дебелина:
                    <input type="text" name="totalThickness" value={editedItem.totalThickness} onChange={handleChange} />
                </label>
                <label>
                    м. ед.:
                    <select name="totalThicknessUnit" value={editedItem.totalThicknessUnit} onChange={handleChange}>
                        <option value="MM">MM</option>
                        <option value="CM">CM</option>
                        <option value="M">M</option>
                    </select>
                </label>
                <label>
                    Дебелина преден лист:
                    <input type="text" name="frontSheetThickness" value={editedItem.frontSheetThickness} onChange={handleChange} />
                </label>
                <label>
                    м. ед.:
                    <select name="frontSheetThicknessUnit" value={editedItem.frontSheetThicknessUnit} onChange={handleChange}>
                        <option value="MM">MM</option>
                        <option value="CM">CM</option>
                        <option value="M">M</option>
                    </select>
                </label>
                <label>
                    Дебелина заден лист:
                    <input type="text" name="backSheetThickness" value={editedItem.backSheetThickness} onChange={handleChange} />
                </label>
                <label>
                    м. ед.:
                    <select name="backSheetThicknessUnit" value={editedItem.backSheetThicknessUnit} onChange={handleChange}>
                        <option value="MM">MM</option>
                        <option value="CM">CM</option>
                        <option value="M">M</option>
                    </select>
                </label>
                <label>
                    Количество:
                    <input type="number" name="quantity" value={editedItem.quantity} onChange={handleChange} />
                </label>
                <label>
                    м. ед. :
                    <select name="quantityUnit" value={editedItem.quantityUnit} onChange={handleChange}>
                        <option value="">м. ед.</option>
                        <option value="CM2">cm2</option>
                        <option value="M2">m2</option>
                    </select>
                </label>
                <label>
                    Описание:
                    <textarea name="description" value={editedItem.description} onChange={handleChange}></textarea>
                </label>
                <div className="modal-buttons">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default EditPanel;