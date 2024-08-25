import {useEffect, useState} from "react";
import '../CreateAndSendOrder.css'
import {useUser} from "../../../userProvider/UserProvider";
import {jwtDecode} from "jwt-decode";
import ajax from "../../../service/FetchService";
const MetalTemplate = ({ onSave, category }) => {
    const user = useUser();
    const [name, setName] = useState('');
    const [totalWeight, setTotalWeight] = useState('');
    const [totalWeightUnit, setTotalWeightUnit] = useState('');
    const [kind, setKind] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState(null);
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
        if (!totalWeight) newErrors.diameter = 'Моля добавете обща тежест';
        if (!totalWeightUnit) newErrors.totalWeightUnit = 'Моля изберете м. ед.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const data = {
            name,
            totalWeight,
            totalWeightUnit,
            kind,
            description,
            specification
        };
        onSave(data);
        setName('');
        setTotalWeight('');
        setTotalWeightUnit('');
        setKind('')
        setDescription('');
        setSpecification(null);
        setErrors({});
    };

    function createInventory() {
        if (!validate()) return;
        const requestBody = {
            materialType: category,
            totalWeight: totalWeight,
            totalWeightUnit: totalWeightUnit,
            kind: kind,
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
        setTotalWeight('');
        setTotalWeightUnit('');
        setKind('')
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
        setTotalWeight(result.totalWeight)
        setTotalWeightUnit(result.totalWeightUnit)
        setKind(result.kind)
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
                            <p>{result.totalWeight}</p>
                            <p>{result.totalWeightUnit}</p>
                            <p>{result.kind}</p>
                            <p>{result.description}</p>
                        </li>
                    ))}
                </ul>
            )}
            <label>
                Общо тегло:
                <input type="number" value={totalWeight} onChange={(e) => setTotalWeight(e.target.value)} />
                {errors.totalWeight && <span className="error">{errors.totalWeight}</span>}
            </label>
            <label>
                м. ед. :
                <select name="totalWeightUnit" value={totalWeightUnit} onChange={(e) => setTotalWeightUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="G">g</option>
                    <option value="KG">kg</option>
                    <option value="T">t</option>
                </select>
                {errors.totalWeightUnit && <span className="error">{errors.totalWeightUnit}</span>}
            </label>
            <label>
                Вид:
                <input type="text" value={kind} onChange={(e) => setKind(e.target.value)} />
                {errors.kind && <span className="error">{errors.kind}</span>}
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

export default MetalTemplate;