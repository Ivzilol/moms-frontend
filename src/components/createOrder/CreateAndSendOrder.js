
import OrderCategoryAndConstructionsSite from "./OrderCategoryAndConstructionsSite";
import {useState} from "react";
import './OrderCategoryAndConstructionsSite.css'
import FastenersTemplate from "../template/FastenersTemplate";
import InsulationTemplate from "../template/FastenersTemplate";

const CreateAndSendOrder = () => {

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSite, setSelectedSite] = useState("");

    const handleSelect = (category, site) => {
        setSelectedCategory(category);
        setSelectedSite(site);
    };

    const handleSave = (formData) => {
        formData.category = selectedCategory;
        formData.site = selectedSite;


    };

    let template;
    if (selectedCategory === "FASTENERS") {
        template = <FastenersTemplate onSave={handleSave} />;
    } else if (selectedCategory === "INSULATION") {
        template = <InsulationTemplate onSave={handleSave} />;
    }

    return (
        <div className="create-form-container">
            <OrderCategoryAndConstructionsSite onSelect={handleSelect} />
            <div className="template-container">
                {template}
            </div>
        </div>
    );
}

export default CreateAndSendOrder;