import {useState} from "react";
import './OrderCategoryAndConstructionsSite.css'

const OrderCategoryAndConstructionsSite = ({onSelect}) => {
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

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        onSelect(e.target.value, selectedSite);
    };

    const handleSiteChange = (e) => {
        setSelectedSite(e.target.value);
        onSelect(selectedCategory, e.target.value);
    };

    return (
        <div className="dropdown-container">
            <div>
                <label className="label" htmlFor="category">Категории:</label>
                <select
                    id="category"
                    className="dropdown"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
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
                    onChange={handleSiteChange}
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