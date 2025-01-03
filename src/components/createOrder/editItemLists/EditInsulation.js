
import './EditFasteners.css';
import React, {useEffect, useState} from "react";

const EditInsulation = ({ item, onSave, onClose }) => {
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
                    Дебелина:
                    <input type="text" name="thickness" value={editedItem.thickness} onChange={handleChange} />
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
                    Количество:
                    <input type="number" name="quantity" value={editedItem.quantity} onChange={handleChange} />
                </label>
                <label>
                    м. ед. :
                    <select name="areaUnit" value={editedItem.quantityUnit} onChange={handleChange}>
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

export default EditInsulation;