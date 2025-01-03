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
import RebarTemplate from "./template/RebarTemplate";
import ItemListRebar from "./itemLists/ItemListRebar";
import EditRebar from "./editItemLists/EditRebar";
import SetTemplate from "./template/SetTemplate";
import ItemListSet from "./itemLists/ItemListSet";
import EditSet from "./editItemLists/EditSet";
import Header from "../Header/Header";
import ajax from "../../service/FetchService";
import UnspecifiedTemplate from "./template/UnspecifiedTemplate";
import ItemListUnspecified from "./itemLists/ItemListUnspecified";
import EditUnspecified from "./editItemLists/EditUnspecified";
import ServiceTemplate from "./template/ServiceTemplate";
import ItemListService from "./itemLists/ItemListService";
import EditService from "./editItemLists/EditService";
import TransportTemplate from "./template/TransportTemplate";
import ItemListTransport from "./itemLists/ItemListTransport";
import EditTransport from "./editItemLists/EditTransport";

const OrderCategoryAndConstructionsSite = () => {
    const user = useUser();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSite, setSelectedSite] = useState("");
    const [dateOfDelivery, setDateOfDelivery] = useState("");
    const [requestBody, setRequestBody] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [specification, setSpecification] = useState(null);
    const [orderDescription, setOrderDescription] = useState('');
    const [errors, setErrors] = useState({});
    const now = new Date().toISOString().slice(0, 16);

    useEffect(() => {
        if (selectedCategory) {
            const savedRequestBody = JSON.parse(localStorage.getItem(selectedCategory) || '[]');
            setRequestBody(savedRequestBody);
        } else {
            setRequestBody([]);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedCategory) {
            localStorage.setItem(selectedCategory, JSON.stringify(requestBody));
        }
    }, [requestBody, selectedCategory]);

    const handleDateChange = (e) => {
        setDateOfDelivery(e.target.value);
        e.target.blur(); // Затваря прозореца за избор на дата
    };

    let template;
    let itemListTemplate
    let templateEdit;
    if (selectedCategory === "FASTENERS") {
        template = <FastenersTemplate onSave={handleSave} category={selectedCategory}/>;
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
        template = <InsulationTemplate onSave={handleSave} category={selectedCategory}/>;
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
        template = <GalvanizedSheetTemplate onSave={handleSave} category={selectedCategory}/>
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
        template = <MetalTemplate onSave={handleSave} category={selectedCategory}/>
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
        template = <PanelsTemplate onSave={handleSave} category={selectedCategory}/>
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
        template = <RebarTemplate onSave={handleSave} category={selectedCategory}/>
        itemListTemplate = <ItemListRebar
            items={requestBody}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
        templateEdit = <EditRebar
            item={currentItem}
            onSave={handleSaveEdit}
            onClose={() => setIsEditing(false)}
        />
    } else if (selectedCategory === 'SET') {
        template = <SetTemplate onSave={handleSave} category={selectedCategory}/>
        itemListTemplate = <ItemListSet
            items={requestBody}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
        templateEdit = <EditSet
            item={currentItem}
            onSave={handleSaveEdit}
            onClose={() => setIsEditing(false)}
        />
    } else if (selectedCategory === 'UNSPECIFIED') {
        template = <UnspecifiedTemplate onSave={handleSave} category={selectedCategory}/>
        itemListTemplate = <ItemListUnspecified
            items={requestBody}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
        templateEdit = <EditUnspecified
            item={currentItem}
            onSave={handleSaveEdit}
            onClose={() => setIsEditing(false)}
        />
    } else if (selectedCategory === 'SERVICE') {
        template = <ServiceTemplate onSave={handleSave} category={selectedCategory}/>
        itemListTemplate = <ItemListService
            items={requestBody}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
        templateEdit = <EditService
            item={currentItem}
            onSave={handleSaveEdit}
            onClose={() => setIsEditing(false)}
        />
    } else if (selectedCategory === 'TRANSPORT') {
        template = <TransportTemplate onSave={handleSave} category={selectedCategory}/>
        itemListTemplate = <ItemListTransport
            items={requestBody}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
        templateEdit = <EditTransport
            item={currentItem}
            onSave={handleSaveEdit}
            onClose={() => setIsEditing(false)}
        />
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
            orderDescription: orderDescription,
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
                standard: item.standard,
                clazz: item.clazz,
                quantity: item.quantity,
                description: item.description,
            }))
        };
    }

    function createRequestBodyGalvanizedSheet(formattedDate) {
        return {
            orderDescription: orderDescription,
            constructionSite: {
                name: selectedSite
            },
            materialType: selectedCategory,
            deliveryDate: formattedDate,
            galvanisedSheets: requestBody.map(item => ({
                type: item.type,
                maxLength: item.maxLength,
                maxLengthUnit: item.maxLengthUnit,
                numberOfSheets: item.numberOfSheets,
                quantity: item.quantity,
                quantityUnit: item.quantityUnit,
                description: item.description,
            }))
        };
    }

    function createRequestBodyInsulation(formattedDate) {
        return {
            orderDescription: orderDescription,
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
                quantityUnit: item.quantityUnit,
                description: item.description,
            }))
        };
    }

    function createRequestBodyMetal(formattedDate) {
        return {
            orderDescription: orderDescription,
            constructionSite: {
                name: selectedSite
            },
            materialType: selectedCategory,
            deliveryDate: formattedDate,
            metals: requestBody.map(item => ({
                totalWeight: item.totalWeight,
                totalWeightUnit: item.totalWeightUnit,
                kind:item.kind,
                quantity: item.quantity,
                description: item.description,
            }))
        };
    }

    function createRequestBodyPanel(formattedDate) {
        return {
            orderDescription: orderDescription,
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
                quantityUnit: item.quantityUnit,
                description: item.description
            }))
        };
    }

    function createRequestBodyRebar(formattedDate) {
        return {
            orderDescription: orderDescription,
            constructionSite: {
                name: selectedSite
            },
            materialType: selectedCategory,
            deliveryDate: formattedDate,
            rebars: requestBody.map(item => ({
                maxLength: item.maxLength,
                maxLengthUnit: item.maxLengthUnit,
                quantity: item.quantity,
                quantityUnit: item.quantityUnit,
                description: item.description,
            }))
        };
    }

    function createRequestBodySet(formattedDate) {
        return {
            orderDescription: orderDescription,
            constructionSite: {
                name: selectedSite
            },
            materialType: selectedCategory,
            deliveryDate: formattedDate,
            sets: requestBody.map(item => ({
                color: item.color,
                maxLength: item.maxLength,
                maxLengthUnit: item.maxLengthUnit,
                quantity: item.quantity,
                quantityUnit: item.quantityUnit,
                description: item.description,
            }))
        };
    }

    function createRequestBodyUnspecified(formattedDate) {
        return {
            orderDescription: orderDescription,
            constructionSite: {
                name: selectedSite
            },
            materialType: selectedCategory,
            deliveryDate: formattedDate,
            unspecified: requestBody.map(item => ({
                quantity: item.quantity,
                description: item.description,
            }))
        };
    }

    function createRequestBodyService(formattedDate) {
        return {
            orderDescription: orderDescription,
            constructionSite: {
                name: selectedSite
            },
            materialType: selectedCategory,
            deliveryDate: formattedDate,
            services: requestBody.map(item => ({
                quantity: item.quantity,
                description: item.description,
            }))
        };
    }

    function createRequestBodyTransport(formattedDate) {
        return {
            orderDescription: orderDescription,
            constructionSite: {
                name: selectedSite
            },
            materialType: selectedCategory,
            deliveryDate: formattedDate,
            transports: requestBody.map(item => ({
                maxLength: item.maxLength,
                maxLengthUnit: item.maxLengthUnit,
                weight: item.weight,
                weightUnit: item.weightUnit,
                truck: item.truck,
                quantity: item.quantity,
                description: item.description,
            }))
        };
    }

    function createOrder() {
        const formData = new FormData();
        const formattedDate = new Date(dateOfDelivery).toISOString();

        if (specification) {
            const specificationPrefix = '000__';
            const newSpecificationFile = new File([specification], specificationPrefix + specification.name, { type: specification.type });
            formData.append("files", newSpecificationFile);
        }

        const files = requestBody.flatMap((item, itemIndex) =>
            item.specification ? [{ file: item.specification, index: itemIndex }] : [])
            .filter(entry => entry.file);

        files.forEach((entry) => {
            const { file, index } = entry;
            if (file && file.name) {
                const prefix = String(index + 1).padStart(3, '0') + '__';
                const newFile = new File([file], prefix + file.name, { type: file.type });
                formData.append("files", newFile);
            }
        });

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
        } else if (selectedCategory === 'REBAR') {
            payload = createRequestBodyRebar(formattedDate);
        } else if (selectedCategory === 'SET') {
            payload = createRequestBodySet(formattedDate);
        } else if (selectedCategory === 'UNSPECIFIED') {
            payload = createRequestBodyUnspecified(formattedDate);
        } else if (selectedCategory === 'SERVICE') {
            payload = createRequestBodyService(formattedDate);
        } else if (selectedCategory === 'TRANSPORT') {
            payload = createRequestBodyTransport(formattedDate);
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
                localStorage.removeItem(selectedCategory);
                setOrderDescription('');
            }

        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const maxSize = 50 * 1024 * 1024;

        if (file && file.size > maxSize) {
            setErrors(prevErrors => ({
                ...prevErrors,
                specification: 'Файлът е твърде голям. Максималният размер е 50MB.'
            }));
            setSpecification(null);
        } else {
            setErrors(prevErrors => {
                const newErrors = {...prevErrors};
                delete newErrors.specification;
                return newErrors;
            });
            setSpecification(file);
        }
    };

    const [constructions, setConstructions] = useState([]);

    useEffect(() => {
        ajax(`${baseURL}user/order/query/construction/all`, "GET", user.jwt)
            .then((response) => {
                setConstructions(response)
            })
    }, [])

    return (
        <>
            <Header/>
            <div className="dropdown-container">
                <div className="dropdown">
                    <p className="dropdown-container-required-field">*задължително поле</p>
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
                    <p className="dropdown-container-required-field">*задължително поле</p>
                    <label htmlFor="constructionSite">Строителен Обект:</label>
                    <select id="constructionSite"
                            value={selectedSite}
                            onChange={(e) => setSelectedSite(e.target.value)}>

                        <option value="">Изберете Строителен Обект</option>
                        {constructions.length > 0
                            ?
                            constructions.map((site) => (
                                <option key={site.id}>{site.name}</option>
                            )) : (
                                <></>
                            )}
                    </select>
                </div>
                <div className="dropdown">
                    <p className="dropdown-container-required-field">*задължително поле</p>
                    <label htmlFor="timeOfDelivery">Дата на доставка</label>
                    <input
                        className="dropdown-container-date"
                        id="timeOfDelivery"
                        type="datetime-local"
                        value={dateOfDelivery}
                        onChange={handleDateChange}
                        min={now}
                    />
                </div>
                <div className="dropdown">
                    <label>
                        Спецификация:
                        <input type="file" onChange={handleFileChange}/>
                        {errors.specification && <span className="error">{errors.specification}</span>}
                    </label>
                </div>
                <div className="dropdown">
                    <p className="dropdown-container-required-field">*задължително поле</p>
                    <label>
                        Описание:
                        <textarea value={orderDescription}
                                  onChange={(e) => setOrderDescription(e.target.value)}/>
                    </label>
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
                    disabled={!selectedCategory || !selectedSite || !dateOfDelivery || requestBody.length === 0}
                >Изпрати поръчка
                </button>
            </div>
        </>
    );
}

export default OrderCategoryAndConstructionsSite;
