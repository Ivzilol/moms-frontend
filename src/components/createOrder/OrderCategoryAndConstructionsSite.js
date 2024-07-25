import {useState} from "react";
import './OrderCategoryAndConstructionsSite.css'
import FastenersTemplate from "../template/FastenersTemplate";
import InsulationTemplate from "../template/InsulationTemplate";

const OrderCategoryAndConstructionsSite = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSite, setSelectedSite] = useState("");

    let template;
    if (selectedCategory === "FASTENERS") {
        template = <FastenersTemplate />;
    } else if (selectedCategory === "INSULATION") {
        template = <InsulationTemplate />;
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
            </div>
            <div className="template-container">
                {template}
            </div>
        </>
    );
}

export default OrderCategoryAndConstructionsSite;