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
                    Цвят:
                    <input type="text" name="color" value={editedItem.color} onChange={handleChange} />
                </label>
                <label>
                    М. дължина:
                    <input type="text" name="maxLength" value={editedItem.maxLength} onChange={handleChange} />
                </label>
                <label>
                    м. ед. :
                    <select name="maxLengthUnit" value={editedItem.maxLengthUnit} onChange={handleChange}>
                        <option value="">м. ед.</option>
                        <option value="MM">ММ</option>
                        <option value="CM">СМ</option>
                        <option value="M">М</option>
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
                        <option value="G">g</option>
                        <option value="KG">kg</option>
                        <option value="T">t</option>
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

export default EditSet;