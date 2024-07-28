import {useEffect, useState} from "react";
import './OrderCategoryAndConstructionsSite.css'
import FastenersTemplate from "../template/FastenersTemplate";
import InsulationTemplate from "../template/InsulationTemplate";
import baseURL from "../baseURL/BaseURL";
import {useUser} from "../../userProvider/UserProvider";
import ItemList from "./ItemList";
import EditFasteners from "./EditFasteners";

const OrderCategoryAndConstructionsSite = () => {
    const user = useUser();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSite, setSelectedSite] = useState("");
    const [dateOfDelivery, setDateOfDelivery] = useState("");
    const [requestBody, setRequestBody] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (requestBody.length > 0) {
                const confirmationMessage = "Не сте завършил своята поръчка. Преди да излезете от страницата, моля да я завършите.";
                e.preventDefault();
                e.returnValue = confirmationMessage;
                return alert(confirmationMessage);
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [requestBody]);

    let template;
    if (selectedCategory === "FASTENERS") {
        template = <FastenersTemplate onSave={handleSave} />;
    } else if (selectedCategory === "INSULATION") {
        template = <InsulationTemplate onSave={handleSave} />;
    }

    let templateEdit;
    if (selectedCategory === "FASTENERS") {
        templateEdit = <EditFasteners
            item={currentItem}
            onSave={handleSaveEdit}
            onClose={() => setIsEditing(false)}
        />
    } else if (selectedCategory === "INSULATION") {

    }

    function handleSave(item) {
        setRequestBody([...requestBody, item]);
    }

    function handleEdit(item, index) {
        setCurrentItem(item);
        setCurrentIndex(index);
        setIsEditing(true);
    }

    function handleSaveEdit(editedItem) {
        const updatedRequestBody = [...requestBody];
        updatedRequestBody[currentIndex] = editedItem;
        setRequestBody(updatedRequestBody);
        setIsEditing(false);
    }

    function handleDelete(index) {
        const updatedRequestBody = requestBody.filter((_, i) => i !== index);
        setRequestBody(updatedRequestBody);
    }

    function createOrder() {
        const formData = new FormData();
        const formattedDate = new Date(dateOfDelivery).toISOString();

        const payload = {
            constructionSite: {
                name: selectedSite
            },
            materialType: selectedCategory,
            deliveryDate: formattedDate,
            [selectedCategory.toLowerCase()]: requestBody.map(item => ({
                type: item.type,
                diameter: item.diameter,
                length: item.length,
                lengthUnit: item.lengthUnit,
                model: item.model,
                clazz: item.classType,
                quantity: item.quantity,
                description: item.description,
            }))
        };

        formData.append("order",
            new Blob([JSON.stringify(payload)], {
                type: "application/json",
            })
        );

        fetch(`${baseURL}user/order/command/create-order`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${user.jwt}`
            },
            body: formData
        }).then((response) => {

        })
    }

    return (
        <>
            <div className="dropdown-container">
                <div className="dropdown">
                    <label htmlFor="category">Категория:</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        disabled={selectedCategory && requestBody.length > 0}
                    >
                        <option value="">Изберете категория</option>
                        <option value="FASTENERS">FASTENERS</option>
                        <option value="GALVANIZED_SHEET">GALVANIZED_SHEET</option>
                        <option value="INSULATION">INSULATION</option>
                        <option value="METAL">METAL</option>
                        <option value="PANELS">PANELS</option>
                        <option value="REBAR">REBAR</option>
                        <option value="SET">SET</option>
                        <option value="UNSPECIFIED">UNSPECIFIED</option>
                        <option value="SERVICE">SERVICE</option>
                    </select>
                </div>
                <div className="dropdown">
                    <label htmlFor="constructionSite">Construction Site:</label>
                    <select id="constructionSite"
                            value={selectedSite}
                            onChange={(e) => setSelectedSite(e.target.value)}>
                        <option value="">Изберете Construction Site</option>
                        <option value="Цех за преработка на метали">Цех за преработка на метали</option>
                        <option value="Кауфланд Малинова Долина">Кауфланд Малинова Долина</option>
                        <option value="Къща Бояна">Къща Бояна</option>
                        <option value="Жилищна сграда SoHome">Жилищна сграда SoHome</option>
                        <option value="Склад за храни">Склад за храни</option>
                        <option value="Цех за панели">Цех за панели</option>
                    </select>
                </div>
                <div className="dropdown">
                    <label htmlFor="timeOfDelivery">Дата на доставка</label>
                    <input
                        className="dropdown-container-date"
                        id="timeOfDelivery"
                        type="datetime-local"
                        value={dateOfDelivery}
                        onChange={(e) => setDateOfDelivery(e.target.value)}
                    />
                </div>
            </div>
            {isEditing && (
                <>
                    {templateEdit}
                </>

                )}
            <div className="template-container">
                {template}
            </div>
            <ItemList items={requestBody} onEdit={handleEdit} onDelete={handleDelete}/>
            <div>
                <button
                    type="submit"
                    onClick={createOrder}
                    disabled={!selectedCategory || !selectedSite || !dateOfDelivery}
                >Send Order</button>
            </div>
        </>
    );
}

export default OrderCategoryAndConstructionsSite;
