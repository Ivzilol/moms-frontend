import {useState} from "react";
import './OrderCategoryAndConstructionsSite.css'
import FastenersTemplate from "../template/FastenersTemplate";
import InsulationTemplate from "../template/InsulationTemplate";
import ajax from "../../service/FetchService";
import baseURL from "../baseURL/BaseURL";
import {useUser} from "../../userProvider/UserProvider";
import {json} from "react-router-dom";

const OrderCategoryAndConstructionsSite = () => {
    const user = useUser();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSite, setSelectedSite] = useState("");
    const [dateOfDelivery, setDateOfDelivery] = useState("");
    const [requestBody, setRequestBody] = useState([]);
    const [showTemplate, setShowTemplate] = useState(true);

    const handleSaveTemplate = (data) => {
        setRequestBody([...requestBody, data]);
        setShowTemplate(false);
        setTimeout(() => setShowTemplate(true), 0);
    };


    const createOrder = () => {
        const formData = new FormData();
        const formattedDate = new Date(dateOfDelivery).toISOString();
        const files = requestBody.flatMap(item => item.specification);
        files.forEach(file => formData.append("files", file));
        const date = new Date();
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
            body: formData,
        })
            .then((response) => {

            })

    };

    let template;
    if (selectedCategory === "FASTENERS" && showTemplate) {
        template = <FastenersTemplate onSave={handleSaveTemplate}/>;
    } else if (selectedCategory === "INSULATION" && showTemplate) {
        template = <InsulationTemplate onSave={handleSaveTemplate}/>;
    }

    return (
        <>
            <div className="dropdown-container">
                <div className="dropdown">
                    <label htmlFor="category">Категория:</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}>
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
                    <label htmlFor="constructionSite">Дата на доставка</label>
                    <input
                        id="timeOfDelivery"
                        type="datetime-local"
                        value={dateOfDelivery}
                        onChange={(e) => setDateOfDelivery(e.target.value)}
                    />
                </div>
            </div>
            <div className="template-container">
                {template}
            </div>
            <div>
                {requestBody.length !== 0 ?
                    <button
                        type="submit"
                        onClick={createOrder}
                    >
                        Send Order
                    </button>
                    :
                    <></>
                }
            </div>
        </>
    );
}

export default OrderCategoryAndConstructionsSite;