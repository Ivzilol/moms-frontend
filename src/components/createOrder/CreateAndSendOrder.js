
import OrderCategoryAndConstructionsSite from "./OrderCategoryAndConstructionsSite";
import {useState} from "react";

const CreateAndSendOrder = () => {

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSite, setSelectedSite] = useState("");

    const handleSelect = (category, site) => {
        setSelectedCategory(category);
        setSelectedSite(site);
    };

    return(
        <>
            <OrderCategoryAndConstructionsSite onSelect={handleSelect}/>
        </>
    )
}

export default CreateAndSendOrder;