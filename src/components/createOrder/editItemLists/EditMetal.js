import React, {useEffect, useState} from "react";

const EditMetal = ({ item, onSave, onClose }) => {
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
                    Общо тегло:
                    <input type="text" name="totalWeight" value={editedItem.totalWeight} onChange={handleChange} />
                </label>
                <label>
                    м. ед.:
                    <select name="totalWeightUnit" value={editedItem.totalWeightUnit} onChange={handleChange}>
                        <option value="G">g</option>
                        <option value="KG">kg</option>
                        <option value="T">t</option>
                    </select>
                </label>
                <label>
                    Вид:
                    <input type="text" name="kind" value={editedItem.kind} onChange={handleChange} />
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

export default EditMetal;