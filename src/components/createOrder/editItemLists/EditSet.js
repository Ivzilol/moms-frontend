import React, {useEffect, useState} from "react";

const EditSet = ({ item, onSave, onClose }) => {
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
                    Поцинкована ламарина дължина::
                    <input type="text" name="galvanisedSheetThickness" value={editedItem.galvanisedSheetThickness} onChange={handleChange} />
                </label>
                <label>
                    м. ед.:
                    <select name="galvanisedSheetThicknessUnit" value={editedItem.galvanisedSheetThicknessUnit} onChange={handleChange}>
                        <option value="MM">MM</option>
                        <option value="CM">CM</option>
                        <option value="M">M</option>
                    </select>
                </label>
                <label>
                    Цвят:
                    <input type="text" name="color" value={editedItem.color} onChange={handleChange} />
                </label>
                <label>
                    Максимална дължина:
                    <input type="text" name="maxLength" value={editedItem.maxLength} onChange={handleChange} />
                </label>
                <label>
                    м. ед. :
                    <select name="maxLengthUnit" value={editedItem.maxLengthUnit} onChange={handleChange}>
                        <option value="G">g</option>
                        <option value="KG">kg</option>
                        <option value="T">t</option>
                    </select>
                </label>
                <label>
                    Количество:
                    <input type="number" name="quantity" value={editedItem.quantity} onChange={handleChange} />
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

export default EditSet;