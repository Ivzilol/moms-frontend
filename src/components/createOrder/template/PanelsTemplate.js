import {useEffect, useState} from "react";
import './PanelsTemplate.css'
import {useUser} from "../../../userProvider/UserProvider";
import ajax from "../../../service/FetchService";
import useRolesFromJWT from "../../customHooks/useRolesFromJWT";
const PanelsTemplate = ({ onSave, category }) => {
    const user = useUser();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [color, setColor] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [widthUnit, setWidthUnit] = useState('');
    const [thickness, setThickness] = useState('');
    const [lengthUnit, setLengthUnit] = useState('');
    const [totalThickness, setTotalThickness] = useState('');
    const [totalThicknessUnit, setTotalThicknessUnit] = useState('')
    const [frontSheetThickness, setFrontSheetThickness] = useState('')
    const [frontSheetThicknessUnit, setFrontSheetThicknessUnit] = useState('')
    const [backSheetThickness, setBackSheetThickness] = useState('');
    const [backSheetThicknessUnit, setBackSheetThicknessUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantityUnit, setQuantityUnit] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState(null);
    const [errors, setErrors] = useState({});
    const roles = useRolesFromJWT(user);
    const [response, setResponse] = useState([]);

    const userRole = roles.length === 1 && roles.includes('USER');
    const adminRole = ['USER', 'ADMIN'].every(role => roles.includes(role));

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

    const validate = () => {
        const newErrors = {};
        if (!type) newErrors.type = 'Моля добавете тип';
        if (!color) newErrors.color = 'Моля добавете цвят'
        if (!length) {
            newErrors.length = 'Моля добавете дължина';
        } else if (length <= 0) {
            newErrors.length = 'Дължината не може да е отрицателно число или 0';
        }
        if (!lengthUnit) newErrors.lengthUnit = 'Моля добавете мерна единица';
        if (!width) {
            newErrors.width = 'Моля добавете ширина';
        } else if (width <= 0) {
            newErrors.width = 'Ширината не може да е отрицателно число или 0';
        }
        if (!widthUnit) {
            newErrors.widthUnit = 'Моля добавете мерна единица'
        }
        if (!totalThickness) newErrors.totalThickness = 'Моля добавете дебелина';
        if (!totalThicknessUnit) newErrors.totalThicknessUnit = 'Моля добавете мерна единица'
        if (!frontSheetThickness) newErrors.frontSheetThickness = "Добавете ширина преден лист";
        if (!frontSheetThicknessUnit) newErrors.frontSheetThicknessUnit = 'Моля добавете мерна единица'
        if (!backSheetThickness) newErrors.backSheetThickness = "Добавете ширина заден лист";
        if (!backSheetThicknessUnit) newErrors.backSheetThicknessUnit = 'Моля добавете мерна единица'
        if (!quantity) newErrors.quantity = 'Моля добавете количество';
        if (!quantityUnit) newErrors.quantityUnit = 'Моля добавете мерна единица'

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const data = {
            name,
            type,
            color,
            length,
            lengthUnit,
            width,
            widthUnit,
            totalThickness,
            totalThicknessUnit,
            frontSheetThickness,
            frontSheetThicknessUnit,
            backSheetThickness,
            backSheetThicknessUnit,
            quantity,
            quantityUnit,
            description,
            specification
        };
        onSave(data);
        setName('');
        setType('');
        setColor('');
        setLength('');
        setLengthUnit('');
        setWidth('');
        setWidthUnit('');
        setThickness('');
        setTotalThickness('');
        setTotalThicknessUnit('');
        setFrontSheetThickness('');
        setFrontSheetThicknessUnit('');
        setBackSheetThickness('');
        setBackSheetThicknessUnit('');
        setQuantity('');
        setQuantityUnit('');
        setDescription('');
        setSpecification(null);
        setErrors({});
    };

    function createInventory() {
        if (!validate()) return;
        const requestBody = {
            materialType: category,
            type: type,
            color: color,
            length: length,
            lengthUnit: lengthUnit,
            width: width,
            widthUnit: widthUnit,
            totalThickness: totalThickness,
            totalThicknessUnit: totalThicknessUnit,
            frontSheetThickness: frontSheetThickness,
            frontSheetThicknessUnit: frontSheetThicknessUnit,
            backSheetThickness: backSheetThickness,
            backSheetThicknessUnit: backSheetThicknessUnit,
            quantity: quantity,
            quantityUnit: quantityUnit,
            description: description

        }
        fetch(`http://localhost:9003/v1/admin/inventory/command/materials/create`, {
            method: "post",
            headers: {
                "Authorization": `Bearer ${user.jwt}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
            .then((response) => {
                if (response.status === 200) {
                    clearInputs()
                    alert("Успешно създадохте материал")
                }
            })

    }

    function clearInputs() {
        setType('');
        setColor('');
        setLength('');
        setLengthUnit('');
        setWidth('');
        setWidthUnit('');
        setTotalThickness('');
        setTotalThicknessUnit('');
        setFrontSheetThickness('');
        setTotalThicknessUnit('');
        setBackSheetThickness('');
        setBackSheetThicknessUnit('');
        setQuantity('');
        setQuantityUnit('');
        setDescription('');
    }

    const getSearchResult = (searchTerm) => {
        console.log(category);
        ajax(`http://localhost:9004/v1/user/inventory/query/materials/search?category=${category}&materialName=${searchTerm}`, "GET", user.jwt)
            .then((response) => {
                if (response && Array.isArray(response)) {
                    setResponse(response);
                    console.log(response)
                } else {
                    setResponse([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
                setResponse([]);
            });
    };

    useEffect(() => {
        if (name.length >= 2) {
            getSearchResult(name);
        } else {
            setResponse([]);
        }
    }, [name]);

    const handleSelectResult = (result) => {
        setType(result.type);
        setColor(result.color)
        setLength(result.length);
        setLengthUnit(result.lengthUnit)
        setWidth(result.width)
        setWidthUnit(result.widthUnit)
        setTotalThickness(result.totalThickness)
        setTotalThicknessUnit(result.totalThicknessUnit)
        setFrontSheetThickness(result.frontSheetThickness)
        setFrontSheetThicknessUnit(result.frontSheetThicknessUnit)
        setBackSheetThickness(result.backSheetThickness)
        setBackSheetThicknessUnit(result.backSheetThicknessUnit)
        setDescription(result.description)
        setName('')
        setResponse([]);
    };

    return (
        <div className="template-form">
            <label>
                Търси материал:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </label>
            {response.length > 0 && (
                <ul className="search-results">
                    {response.map((result, index) => (
                        <li className="search-results-row" key={index} onClick={() => handleSelectResult(result)}>
                            <div className="search-result-item">
                                <strong>Тип:</strong>
                                <p>{result.type}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>Цвят:</strong>
                                <p>{result.color}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>Дължина:</strong>
                                <p>{result.length}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>м. ед. :</strong>
                                <p>{result.lengthUnit}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>Ширина:</strong>
                                <p>{result.width}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>м. ед. :</strong>
                                <p>{result.widthUnit}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>Обща д.:</strong>
                                <p>{result.totalThickness}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>м. ед. :</strong>
                                <p>{result.totalThicknessUnit}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>Д. пр. лист:</strong>
                                <p>{result.frontSheetThickness}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>м. ед. :</strong>
                                <p>{result.frontSheetThicknessUnit}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>Д. з. лист:</strong>
                                <p>{result.backSheetThickness}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>м. ед. :</strong>
                                <p>{result.backSheetThicknessUnit}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>Описание:</strong>
                                <p>{result.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <label>
                Тип:
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                {errors.type && <span className="error">{errors.type}</span>}
            </label>
            <label>
                Цвят:
                <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                {errors.color && <span className="error">{errors.color}</span>}
            </label>
            <label>
                Дължина:
                <input type="number" value={length} onChange={(e) => setLength(e.target.value)} />
            </label>
            <label>
                м. ед. :
                <select name="lengthUnit" value={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
            </label>
            <label>
                Ширина:
                <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
            </label>
            <label>
                м. ед. :
                <select name="widthUnit" value={widthUnit} onChange={(e) => setWidthUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
            </label>
            <label>
                Обща д.:
                <input type="number" value={totalThickness} onChange={(e) => setTotalThickness(e.target.value)} />
            </label>
            <label>
                м. ед. :
                <select name="totalThicknessUnit" value={totalThicknessUnit} onChange={(e) => setTotalThicknessUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
            </label>
            <label>
                Д. пр. лист:
                <input type="number" value={frontSheetThickness} onChange={(e) => setFrontSheetThickness(e.target.value)} />
                {errors.frontSheetThickness && <span className="error">{errors.frontSheetThickness}</span>}
            </label>
            <label>
                м. ед.:
                <select name="frontSheetThicknessUnit" value={frontSheetThicknessUnit} onChange={(e) => setFrontSheetThicknessUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
                {errors.frontSheetThicknessUnit && <span className="error">{errors.frontSheetThicknessUnit}</span>}
            </label>
            <label>
                Д. з. лист:
                <input type="number" value={backSheetThickness} onChange={(e) => setBackSheetThickness(e.target.value)} />
                {errors.backSheetThickness && <span className="error">{errors.backSheetThickness}</span>}
            </label>
            <label>
                м. ед.:
                <select name="backSheetThicknessUnit" value={backSheetThicknessUnit} onChange={(e) => setBackSheetThicknessUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
                {errors.backSheetThicknessUnit && <span className="error">{errors.backSheetThicknessUnit}</span>}
            </label>
            <label>
                Количество:
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                {errors.quantity && <span className="error">{errors.quantity}</span>}
            </label>
            <label>
                м. ед. :
                <select name="quantityUnit" value={quantityUnit} onChange={(e) => setQuantityUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="CM2">cm2</option>
                    <option value="M2">m2</option>
                </select>
                {errors.quantityUnit && <span className="error">{errors.quantityUnit}</span>}
            </label>
            <label>
                Описание:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                Спецификация:
                <input type="file" onChange={handleFileChange} />
                {errors.specification && <span className="error">{errors.specification}</span>}
            </label>
            {userRole &&
                <label>
                    <button onClick={handleSave}>Запази</button>
                </label>
            }
            {adminRole &&
                <label>
                    <button
                        type="submit"
                        onClick={() => createInventory()}>Създай</button>
                </label>
            }
        </div>
    );
}

export default PanelsTemplate;