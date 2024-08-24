import {useEffect, useState} from "react";
import '../CreateAndSendOrder.css'
import {jwtDecode} from "jwt-decode";
import {useUser} from "../../../userProvider/UserProvider";
import ajax from "../../../service/FetchService";
const GalvanizedSheetTemplate = ({ onSave, category }) => {

    const user = useUser();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [maxLength, setMaxLength] = useState('');
    const [maxLengthUnit, setMaxLengthUnit] = useState('');
    const [areaUnit, setAreaUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState(null);
    const [numberOfSheets, setNumberOfSheets] = useState('')
    const [quantityUnit, setQuantityUnit] = useState('');
    const [errors, setErrors] = useState({});
    const [roles, setRoles] = useState(getRolesFromJWT());
    const [response, setResponse] = useState([]);

    useEffect(() => {
        setRoles(getRolesFromJWT())
    }, [user.jwt])

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodeJwt = jwtDecode(user.jwt)
            return decodeJwt.roles.split(",")
        }
        return [];
    }

    const userRole = roles.length === 1 && roles.includes('USER');
    const adminRole = ['USER', 'ADMIN'].every(role => roles.includes(role));

    const handleFileChange = (e) => {
        setSpecification(e.target.files[0]);
    };

    const validate = () => {
        const newErrors = {};
        if (!type) newErrors.type = 'Моля добавете тип';
        if (!maxLength) {
            newErrors.length = 'Моля добавете дължина';
        } else if (maxLength <= 0) {
            newErrors.length = 'м. дължина не може да е отрицателно число или 0';
        }
        if (!numberOfSheets) {
            newErrors.area = 'Моля добавете площ';
        } else if (numberOfSheets <= 0) {
            newErrors.area = 'Площ не може да е отрицателно число или 0';
        }
        if (!maxLengthUnit) newErrors.lengthUnit = 'Моля изберете м. ед.';
        if (!quantity) newErrors.quantity = 'Моля добавете количество';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const data = {
            name,
            type,
            maxLength,
            maxLengthUnit,
            numberOfSheets,
            areaUnit,
            quantity,
            quantityUnit,
            description,
            specification
        };
        onSave(data);
        setName('');
        setType('');
        setMaxLength('');
        setMaxLengthUnit('');
        setNumberOfSheets('');
        setAreaUnit('');
        setQuantity('');
        setQuantityUnit('')
        setDescription('');
        setSpecification(null);
        setErrors({});
    };

    function createInventory() {
        if (!validate()) return;
        const requestBody = {
            materialType: category,
            type: type,
            maxLength: maxLength,
            maxLengthUnit: maxLengthUnit,
            numberOfSheets: numberOfSheets,
            quantity: quantity
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
        setMaxLength('');
        setMaxLengthUnit('');
        setNumberOfSheets('');
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
        setMaxLength(result.maxLength)
        setMaxLengthUnit(result.maxLengthUnit);
        setNumberOfSheets(result.numberOfSheets);
        setDescription(result.description)
        setName('');
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
                            <p>{result.name}</p>
                            <p>{result.type}</p>
                            <p>{result.maxLength}</p>
                            <p>{result.maxLengthUnit}</p>
                            <p>{result.numberOfSheets}</p>
                            <p>{result.description}</p>
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
                Дължина:
                <input type="number" value={maxLength} onChange={(e) => setMaxLength(e.target.value)} />
                {/*{errors.length && <span className="error">{errors.length}</span>}*/}
            </label>
            <label>
                м. ед. :
                <select name="lengthUnit" value={maxLengthUnit} onChange={(e) => setMaxLengthUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
                {/*{errors.lengthUnit && <span className="error">{errors.lengthUnit}</span>}*/}
            </label>
            <label>
                Брой листа:
                <input type="number" value={numberOfSheets} onChange={(e) => setNumberOfSheets(e.target.value)} />
                {/*{errors.area && <span className="error">{errors.area}</span>}*/}
            </label>
            <label>
                Количество:
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                {errors.quantity && <span className="error">{errors.quantity}</span>}
            </label>
            <label>
                м. ед. :
                <select name="areaUnit" value={quantityUnit} onChange={(e) => setQuantityUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="CM2">cm2</option>
                    <option value="M2">m2</option>
                </select>
                {/*{errors.lengthUnit && <span className="error">{errors.lengthUnit}</span>}*/}
            </label>
            <label>
                Описание:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                Спецификация:
                <input type="file" onChange={handleFileChange} />
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

export default GalvanizedSheetTemplate;