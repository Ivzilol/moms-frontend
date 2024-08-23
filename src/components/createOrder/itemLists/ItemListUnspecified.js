import {useUser} from "../../../userProvider/UserProvider";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import baseURL from "../../baseURL/BaseURL";
import Header from "../../Header/Header";


const parseAdminNote = (note) => {
    if (!note) return {dateTime: '', creator: '', message: ''};

    return note;
}

const ItemListUnspecified = ({
                                 orderId, items, onEdit, onDelete,
                                 orderDescription, orderDate, deliveryDate, orderStatus,
                                 materialType, specificationFileUrl, orderNumber, constructionName
                             }) => {

    const user = useUser([]);
    const [roles, setRoles] = useState(getRolesFromJWT());
    const [selectedItems, setSelectedItems] = useState(getSelectedItemsFromStorage(orderId));
    const [currentOrderStatus, setCurrentOrderStatus] = useState(orderStatus);
    const [adminNotes, setAdminNotes] = useState({});
    const [requestBody, setRequestBody] = useState([]);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [currentNote, setCurrentNote] = useState({});
    const [newNote, setNewNote] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setRoles(getRolesFromJWT());
    }, [user.jwt]);

    useEffect(() => {
        saveSelectedItemsToStorage(orderId, selectedItems);
    }, [selectedItems, orderId]);

    useEffect(() => {
        updateRequestBody();
    }, [adminNotes, selectedItems]);

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodeJwt = jwtDecode(user.jwt);
            return decodeJwt.roles.split(",");
        }
        return [];
    }

    function getSelectedItemsFromStorage(orderId) {
        const storedItems = localStorage.getItem(`selectedItems_${orderId}`);
        return storedItems ? JSON.parse(storedItems) : [];
    }

    function saveSelectedItemsToStorage(orderId, items) {
        localStorage.setItem(`selectedItems_${orderId}`, JSON.stringify(items));
    }

    const userRole = roles.length === 1 && roles.includes('USER');
    const adminRole = ['USER', 'ADMIN'].every(role => roles.includes(role));

    const handleSelectAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map((_, index) => index));
        }
    };

    const handleSelectItem = (index) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter(i => i !== index));
        } else {
            setSelectedItems([...selectedItems, index]);
        }
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setCurrentOrderStatus(newStatus);
    };

    useEffect(() => {
        const initialAdminNotes = items.reduce((notes, item, index) => {
            notes[index] = item.adminNote || '';
            return notes;
        }, {});
        setAdminNotes(initialAdminNotes);
    }, [items]);

    const handleNoteChange = (index, note) => {
        setAdminNotes(prevNotes => ({
            ...prevNotes,
            [index]: note
        }));
    };

    const handleNoteChangeSecondNote = (index, note) => {
        console.log(note);
        setAdminNotes(prevNotes => ({
            ...prevNotes,
            [index]: note
        }))
        closeNoteModal();
    }

    const handleNoteBlur = (index) => {
        setAdminNotes(prevNotes => ({
            ...prevNotes,
            [index]: `##${prevNotes[index]}`
        }));
    };

    const handleViewNote = (index) => {
        const noteDetails = parseAdminNote(items[index].adminNote);
        setCurrentNote(noteDetails);
        setShowNoteModal(true);
    };

    const closeNoteModal = () => {
        setShowNoteModal(false);
        setCurrentNote({});
    };


    function updateRequestBody() {
        const body = items.map((item, index) => ({
            ...item,
            adminNote: adminNotes[index] ? `##${adminNotes[index]}` : ''
        }));
        setRequestBody(body);
    }

    function updateOrder() {
        const formData = new FormData();
        const files = requestBody.flatMap(item => item.specification);
        files.forEach(file => formData.append("files", file));
        const payload = {
            id: orderId,
            orderNumber: orderNumber,
            orderDescription: orderDescription,
            orderDate: orderDate,
            deliveryDate: deliveryDate,
            constructionSite: {
                name: constructionName
            },
            orderStatus: currentOrderStatus,
            materialType: materialType,
            specificationFileUrl: specificationFileUrl,
            unspecified: requestBody
        };
        formData.append('order',
            new Blob([JSON.stringify(payload)], {
                type: "application/json"
            }))
        if (adminRole) {
            fetch(`${baseURL}admin/order/command/update-order`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${user.jwt}`
                },
                body: formData
            }).then((response) => {
                if (response.ok) {
                    alert('Успешно променихте статуса на заявката!');
                    localStorage.removeItem(`selectedItems_${orderId}`);
                    navigate('/orders-admin');
                }
            })
        }
        if (userRole) {
            fetch(`${baseURL}user/order/command/answer-add`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${user.jwt}`
                },
                body: formData
            }).then((response) => {
                if (response.ok) {
                    alert('Успешно променихте статуса на заявката!');
                    localStorage.removeItem(`selectedItems_${orderId}`);
                    navigate('/orders-admin');
                }
            })
        }
    }



    return (
        <div>
            {adminRole && (
                <>
                    <Header/>
                    <div className="order-info">
                        <p>Обект: {constructionName}</p>
                        <p>Описание на поръчката: {orderDescription}</p>
                        <p>Дата на доставка: {new Date(deliveryDate).toLocaleDateString()}</p>
                        <p>Статус на поръчката:
                            <select value={currentOrderStatus} onChange={handleStatusChange}>
                                <option value="CREATED">CREATED</option>
                                <option value="PENDING">PENDING</option>
                                <option value="APPROVED">APPROVED</option>
                                <option value="DELIVERY_IN_PROGRESS">DELIVERY IN PROGRESS</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="CANCELLED">CANCELLED</option>
                                <option value="UPDATED">UPDATED</option>
                            </select>
                        </p>
                        <p>Тип материал: {materialType}</p>
                        <p>Обща спецификация: <a href={specificationFileUrl} target="_blank"
                                                     rel="noopener noreferrer">
                            изтегли спецификация
                        </a></p>
                    </div>
                </>
            )}
            {userRole && orderStatus !== undefined && (
                <>
                    <Header/>
                    <div className="order-info">
                        <p>Обект: {constructionName}</p>
                        <p>Описание на поръчката: {orderDescription}</p>
                        <p>Дата на доставка: {new Date(deliveryDate).toLocaleDateString()}</p>
                        <p>Статус на поръчката: {orderStatus} </p>
                        <p>Тип материал: {materialType}</p>
                        <p>Обща спецификация: {specificationFileUrl && <a href={specificationFileUrl} target="_blank" rel="noopener noreferrer">
                            изтегли спецификация
                        </a>}
                        </p>
                    </div>
                </>
            )}
            <div className="item-list">
                {items.length === 0 ? (
                    <p>Няма добавени материали.</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Количество</th>
                            <th>Описани</th>
                            {orderNumber !== undefined &&
                                <th>Спецификация</th>
                            }
                            {userRole && orderStatus === undefined && <th>Редакция</th>}
                            {userRole && orderStatus === undefined && <th>Изтриване</th>}
                            {orderNumber !== undefined &&
                                <th>Бележка от админ</th>
                            }
                            {adminRole && (
                                <th>
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedItems.length === items.length}
                                    />
                                </th>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => (
                            <tr key={index}
                                style={{backgroundColor: selectedItems.includes(index) ? '#d3d3d3' : 'transparent'}}>
                                <td>{index + 1}</td>
                                <td>{item.quantity}</td>
                                <td>{item.description}</td>
                                {orderNumber !== undefined &&
                                    <td>
                                        {item.specificationFileUrl && <a href={item.specificationFileUrl} target="_blank" rel="noopener noreferrer">
                                            изтегли спецификация
                                        </a>}
                                    </td>
                                }
                                {userRole && orderStatus === undefined && (
                                    <td>
                                        <i
                                            className="fas fa-edit"
                                            onClick={() => onEdit(item, index)}
                                            title="Edit"
                                        >Редактирай</i>
                                    </td>
                                )}
                                {userRole && orderStatus === undefined && (
                                    <td>
                                        <i
                                            className="fas fa-trash"
                                            onClick={() => onDelete(index)}
                                            title="Delete"
                                        >Изтрии</i>
                                    </td>
                                )}
                                {adminRole && item.adminNote === null && (
                                    <td>
                                        <input
                                            type="text"
                                            value={adminNotes[index] || ''}
                                            onChange={(e) => handleNoteChange(index, e.target.value)}
                                            onBlur={() => handleNoteBlur(index)}
                                        />
                                    </td>
                                )}
                                {adminRole && item.adminNote !== null && (
                                    <td>
                                        <button className="note-button" onClick={() => handleViewNote(index)}>Виж бележка</button>
                                        {showNoteModal && (
                                            <div className="note-modal">
                                                <div className="note-content">
                                                    <button className="close-button" onClick={closeNoteModal}>X</button>
                                                    <h3>Бележка от админ</h3>
                                                    <div dangerouslySetInnerHTML={{__html: currentNote}}></div>
                                                    <input
                                                        type="text"
                                                        value={newNote}
                                                        onChange={(e) => setNewNote(e.target.value)}
                                                    />
                                                    <button
                                                        id="save-button"
                                                        type="submit"
                                                        onClick={() => handleNoteChangeSecondNote(index,currentNote + "##" + newNote)}
                                                    >Save</button>
                                                    {/*<input*/}
                                                    {/*    type="text"*/}
                                                    {/*    value={adminNotes[index] !== undefined ? adminNotes[index] : ''}*/}
                                                    {/*    onChange={(e) => handleNoteChange(index, e.target.value)}*/}
                                                    {/*/>*/}
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                )}
                                {userRole && item.adminNote === null &&
                                    <td></td>
                                }
                                {userRole && item.adminNote !== null && orderNumber !== undefined &&(
                                    <td>
                                        <button className="note-button"
                                                onClick={() => handleViewNote(index)}>Виж бележка</button>
                                        {showNoteModal && (
                                            <div className="note-modal">
                                                <div className="note-content">
                                                    <button className="close-button" onClick={closeNoteModal}>X</button>
                                                    <h3>Бележка от админ</h3>
                                                    <div dangerouslySetInnerHTML={{__html: currentNote}}></div>
                                                    <input
                                                        type="text"
                                                        value={newNote}
                                                        onChange={(e) => setNewNote(e.target.value)}
                                                    />
                                                    <button
                                                        id="save-button"
                                                        type="submit"
                                                        onClick={() => handleNoteChangeSecondNote(index,currentNote + "##" + newNote)}
                                                    >Save</button>
                                                    {/*<input*/}
                                                    {/*    type="text"*/}
                                                    {/*    value={adminNotes[index] !== undefined ? adminNotes[index] : ''}*/}
                                                    {/*    onChange={(e) => handleNoteChange(index, e.target.value)}*/}
                                                    {/*/>*/}
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                )}
                                {adminRole && (
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleSelectItem(index)}
                                            checked={selectedItems.includes(index)}
                                        />
                                    </td>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
                {orderNumber !== undefined &&
                    <button
                        id="save-button"
                        type="submit"
                        onClick={() => updateOrder()}
                    >Save</button>
                }
            </div>
        </div>
    );
}

export default ItemListUnspecified;