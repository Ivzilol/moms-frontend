import {useEffect, useState} from "react";
import '../CreateAndSendOrder.css'
import ajax from "../../../service/FetchService";
import {useUser} from "../../../userProvider/UserProvider";
import {jwtDecode} from "jwt-decode";

const FastenersTemplate = ({onSave, category}) => {
    const user = useUser();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [diameter, setDiameter] = useState('');
    const [length, setLength] = useState('');
    const [lengthUnit, setLengthUnit] = useState('');
    const [standard, setStandard] = useState('');
    const [clazz, setClazz] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState(null);
    const [errors, setErrors] = useState({});
    const [response, setResponse] = useState([]);
    const [roles, setRoles] = useState(getRolesFromJWT());

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
        if (!diameter) newErrors.diameter = 'Моля добавете диаметър';
        if (!length) {
            newErrors.length = 'Моля добавете дължина';
        } else if (length <= 0) {
            newErrors.length = 'Дължината не може да е отрицателно число или 0';
        }
        if (!lengthUnit) newErrors.lengthUnit = 'Моля изберете м. ед.';
        if (!standard) newErrors.standard = 'Моля добавете модел';
        if (!clazz) newErrors.classType = 'Моля добавете клас';
        if (!quantity) newErrors.quantity = 'Моля добавете количество';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const data = {
            name,
            type,
            diameter,
            length,
            lengthUnit,
            standard,
            clazz,
            quantity,
            description,
            specification
        };
        onSave(data);

        setName('');
        setType('');
        setDiameter('');
        setLength('');
        setLengthUnit('');
        setStandard('');
        setClazz('');
        setQuantity('');
        setDescription('');
        setSpecification(null);
        setErrors({});
    };

    const getSearchResult = (searchTerm) => {
        ajax(`http://localhost:9004/v1/user/inventory/query/materials/search?category=${category}&materialName=${searchTerm}`, "GET", user.jwt)
            .then((response) => {
                if (response && Array.isArray(response)) {
                    setResponse(response);
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
        setDiameter(result.diameter);
        setLength(result.length);
        setLengthUnit(result.lengthUnit);
        setStandard(result.standard);
        setClazz(result.clazz);
        setQuantity(result.quantity);
        setDescription(result.description);
        setName('');
        setResponse([]);
    };


    function createInventory() {
        const requestBody = {
            materialType: category,
            type: type,
            diameter: diameter,
            length: length,
            lengthUnit: lengthUnit,
            standard: standard,
            clazz: clazz,
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
        setType('')
        setDiameter('');
        setLength('');
        setLengthUnit('');
        setStandard('');
        setClazz('');
        setDescription('');
    }

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
                                <strong>Име:</strong>
                                <p>{result.name}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>Тип:</strong>
                                <p>{result.type}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>Диаметър:</strong>
                                <p>{result.diameter}</p>
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
                                <strong>Стандарт:</strong>
                                <p>{result.standard}</p>
                            </div>
                            <div className="search-result-item">
                                <strong>Клас:</strong>
                                <p>{result.clazz}</p>
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
                <input type="text" value={type} onChange={(e) => setType(e.target.value)}/>
                {/*{errors.type && <span className="error">{errors.type}</span>}*/}
            </label>
            <label>
                Диаметър:
                <input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)}/>
                {/*{errors.diameter && <span className="error">{errors.diameter}</span>}*/}
            </label>
            <label>
                Дължина:
                <input type="number" value={length} onChange={(e) => setLength(e.target.value)}/>
                {/*{errors.length && <span className="error">{errors.length}</span>}*/}
            </label>
            <label>
                м. ед. :
                <select name="lengthUnit" value={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
                {/*{errors.lengthUnit && <span className="error">{errors.lengthUnit}</span>}*/}
            </label>
            <label>
                Стандарт:
                <input type="text" value={standard} onChange={(e) => setStandard(e.target.value)}/>
                {/*{errors.model && <span className="error">{errors.model}</span>}*/}
            </label>
            <label>
                Клас:
                <input type="text" value={clazz} onChange={(e) => setClazz(e.target.value)}/>
                {/*{errors.classType && <span className="error">{errors.classType}</span>}*/}
            </label>
            {userRole &&
                <label>
                    Количество:
                    <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                    {errors.quantity && <span className="error">{errors.quantity}</span>}
                </label>
            }
            <label>
                Описание:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
            </label>
            <label>
                Спецификация:
                <input type="file" onChange={handleFileChange}/>
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
};

export default FastenersTemplate;