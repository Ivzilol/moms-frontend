import {useState} from "react";
import './OrderCategoryAndConstructionsSite.css'

const OrderCategoryAndConstructionsSite = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSite, setSelectedSite] = useState("");

    const categories = [
        "FASTENERS",
        "GALVANIZED_SHEET",
        "INSULATION",
        "METAL",
        "PANELS",
        "REBAR",
        "SET",
        "UNSPECIFIED",
        "SERVICE"
    ];

    const constructionSites = [
        "Цех за преработка на метали",
        "Кауфланд Малинова Долина",
        "Къща Бояна",
        "Жилищна сграда SoHome",
        "Склад за храни",
        "Цех за панели"
    ];

    return (
        <div className="dropdown-container">
            <div>
                <label className="label" htmlFor="category">Категории:</label>
                <select
                    id="category"
                    className="dropdown"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="" disabled>Изберете категория</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="label" htmlFor="construction-site">Construction Site:</label>
                <select
                    id="construction-site"
                    className="dropdown"
                    value={selectedSite}
                    onChange={(e) => setSelectedSite(e.target.value)}
                >
                    <option value="" disabled>Изберете строителен обект</option>
                    {constructionSites.map((site) => (
                        <option key={site} value={site}>
                            {site}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );

}

export default OrderCategoryAndConstructionsSite;