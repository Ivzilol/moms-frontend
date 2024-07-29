import {useEffect, useState} from "react";
import './OrderCategoryAndConstructionsSite.css'
import FastenersTemplate from "./template/FastenersTemplate";
import InsulationTemplate from "./template/InsulationTemplate";
import baseURL from "../baseURL/BaseURL";
import {useUser} from "../../userProvider/UserProvider";
import ItemListFasteners from "./itemLists/ItemListFasteners";
import EditFasteners from "./editItemLists/EditFasteners";
import EditInsulation from "./editItemLists/EditInsulation";
import ItemListInsulation from "./itemLists/ItemListInsulation";
import GalvanizedSheetTemplate from "./template/GalvanizedSheetTemplate";
import ItemListGalvanizedSheet from "./itemLists/ItemListGalvanizedSheet";
import EditGalvanizedSheet from "./editItemLists/EditGalvanizedSheet";
import MetalTemplate from "./template/MetalTemplate";
import ItemListMetal from "./itemLists/ItemListMetal";
import EditMetal from "./editItemLists/EditMetal";
import PanelsTemplate from "./template/PanelsTemplate";
import ItemListPanel from "./itemLists/ItemListPanel";
import EditPanel from "./editItemLists/EditPanel";

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
                const confirmationMessage =
                    "Не сте завършил своята поръчка. Преди да излезете от страницата, " +
                    "моля да я завършите.";
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
    let itemListTemplate
    let templateEdit;
    if (selectedCategory === "FASTENERS") {
        template = <FastenersTemplate onSave={handleSave}/>;
        itemListTemplate = <ItemListFasteners
            items={requestBody}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
        templateEdit = <EditFasteners
            item={currentItem}
            onSave={handleSaveEdit}
            onClose={() => setIsEditing(false)}
        />
    } else if (selectedCategory === "INSULATION") {
        template = <InsulationTemplate onSave={handleSave}/>;
        itemListTemplate = <ItemListInsulation
            items={requestBody}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
        templateEdit = <EditInsulation
            item={currentItem}
            onSave={handleSaveEdit}
            onClose={() => setIsEditing(false)}
        />
    } else if (selectedCategory === 'GALVANIZED_SHEET') {
        template = <GalvanizedSheetTemplate onSave={handleSave}/>
        itemListTemplate = <ItemListGalvanizedSheet
            items={requestBody}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
        templateEdit = <EditGalvanizedSheet
            item={currentItem}
            onSave={handleSaveEdit}
            onClose={() => setIsEditing(false)}
        />
    } else if (selectedCategory === 'METAL') {
        template = <MetalTemplate onSave={handleSave}/>
        itemListTemplate = <ItemListMetal
            items={requestBody}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
        templateEdit = <EditMetal
            item={currentItem}
            onSave={handleSaveEdit}
            onClose={() => setIsEditing(false)}
        />
    } else if (selectedCategory === 'PANELS') {
        template = <PanelsTemplate onSave={handleSave}/>
        itemListTemplate = <ItemListPanel
            items={requestBody}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
        templateEdit = <EditPanel
            item={currentItem}
            onSave={handleSaveEdit}
            onClose={() => setIsEditing(false)}
        />
    } else if (selectedCategory === 'REBAR') {

    } else if (selectedCategory === 'SET') {

    } else if (selectedCategory === 'UNSPECIFIED') {

    } else if (selectedCategory === 'SERVICE') {

    } else if (selectedCategory === 'TRANSPORT') {

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

    function createRequestBodyFasteners(formattedDate) {
        return {
            constructionSite: {
                name: selectedSite
            },
            materialType: selectedCategory,
            deliveryDate: formattedDate,
            [selectedCategory.toLowerCase()]: requestBody.map(item => ({
                type: item.type,
                diameter: item.diameter,
                length: item.length,
                maxLengthUnit: item.maxLengthUnit,
                model: item.model,
                clazz: item.classType,
                quantity: item.quantity,
                description: item.description,
            }))
        };
    }

    function createRequestBodyGalvanizedSheet(formattedDate) {
        return {
            constructionSite: {
                name: selectedSite
            },
            materialType: selectedCategory,
            deliveryDate: formattedDate,
            galvanisedSheets: requestBody.map(item => ({
                type: item.type,
                maxLength: item.length,
                lengthUnit: item.lengthUnit,
                area: item.area,
                areaUnit: item.areaUnit,
                quantity: item.quantity,
                description: item.description,
            }))
        };
    }

    function createRequestBodyInsulation(formattedDate) {
        return {
            constructionSite: {
                name: selectedSite
            },
            materialType: selectedCategory,
            deliveryDate: formattedDate,
            insulation: requestBody.map(item => ({
                type: item.type,
                thickness: item.thickness,
                thicknessUnit: item.lengthUnit,
                quantity: item.quantity,
                description: item.description,
            }))
        };
    }

    function createRequestBodyMetal(formattedDate) {
        return {
            constructionSite: {
                name: selectedSite
            },
            materialType: selectedCategory,
            deliveryDate: formattedDate,
            metals: requestBody.map(item => ({
                totalWeight: item.totalWeight,
                totalWeightUnit: item.totalWeightUnit,
                quantity: item.quantity,
                description: item.description,
            }))
        };
    }

    function createRequestBodyPanel(formattedDate) {
        return {
            constructionSite: {
                name: selectedSite
            },
            materialType: selectedCategory,
            deliveryDate: formattedDate,
            panels: requestBody.map(item => ({
                type: item.type,
                color: item.color,
                length: item.length,
                lengthUnit: item.lengthUnit,
                width: item.width,
                widthUnit: item.widthUnit,
                totalThickness: item.totalThickness,
                totalThicknessUnit: item.totalThicknessUnit,
                frontSheetThickness: item.frontSheetThickness,
                frontSheetThicknessUnit: item.frontSheetThicknessUnit,
                backSheetThickness: item.backSheetThickness,
                backSheetThicknessUnit: item.backSheetThicknessUnit,
                quantity: item.quantity,
                description: item.description
            }))
        };
    }

    function createOrder() {
        const formData = new FormData();
        const formattedDate = new Date(dateOfDelivery).toISOString();
        let payload;
        if (selectedCategory === "FASTENERS") {
            payload = createRequestBodyFasteners(formattedDate);
        } else if (selectedCategory === 'GALVANIZED_SHEET') {
            payload = createRequestBodyGalvanizedSheet(formattedDate);
        } else if (selectedCategory === 'INSULATION') {
            payload = createRequestBodyInsulation(formattedDate);
        } else if (selectedCategory === 'METAL') {
            payload = createRequestBodyMetal(formattedDate);
        } else if (selectedCategory === 'PANELS') {
            payload = createRequestBodyPanel(formattedDate);
        }
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
            if (response.ok) {
                alert('Вашата заявка е изпратена успешно');
                setRequestBody([]);
            }

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
                        <option value="FASTENERS">Крепежи</option>
                        <option value="GALVANIZED_SHEET">Ламарина</option>
                        <option value="INSULATION">Изолация</option>
                        <option value="METAL">Метали</option>
                        <option value="PANELS">Панели</option>
                        <option value="REBAR">Армировка</option>
                        <option value="SET">Обшивки</option>
                        <option value="UNSPECIFIED">Други</option>
                        <option value="SERVICE">Услуги</option>
                        <option value="TRANSPORT">Транспорт</option>
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
            <>
                {itemListTemplate}
            </>
            <div>
                <button
                    type="submit"
                    onClick={createOrder}
                    disabled={!selectedCategory || !selectedSite || !dateOfDelivery}
                >Send Order
                </button>
            </div>
        </>
    );
}

export default OrderCategoryAndConstructionsSite;
