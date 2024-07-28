import React, { useState, useEffect } from 'react';
import './EditItemModal.css';

const EditItemModal = ({ item, onSave, onClose }) => {
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
                    Име:
                    <input type="text" name="name" value={editedItem.name} onChange={handleChange} />
                </label>
                <label>
                    Тип:
                    <input type="text" name="type" value={editedItem.type} onChange={handleChange} />
                </label>
                <label>
                    Диаметър:
                    <input type="text" name="diameter" value={editedItem.diameter} onChange={handleChange} />
                </label>
                <label>
                    Дължина:
                    <input type="text" name="length" value={editedItem.length} onChange={handleChange} />
                </label>
                <label>
                    м. ед.:
                    <select name="lengthUnit" value={editedItem.lengthUnit} onChange={handleChange}>
                        <option value="mm">mm</option>
                        <option value="cm">cm</option>
                        <option value="m">m</option>
                    </select>
                </label>
                <label>
                    Модел:
                    <input type="text" name="model" value={editedItem.model} onChange={handleChange} />
                </label>
                <label>
                    Клас:
                    <input type="text" name="classType" value={editedItem.classType} onChange={handleChange} />
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
};

export default EditItemModal;