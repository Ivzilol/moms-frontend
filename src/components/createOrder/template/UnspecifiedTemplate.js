import {useEffect, useState} from "react";
import {useUser} from "../../../userProvider/UserProvider";
import ajax from "../../../service/FetchService";
import useRolesFromJWT from "../../customHooks/useRolesFromJWT";
import baseURL from "../../baseURL/BaseURL";

const UnspecifiedTemplate = ({ onSave, category }) => {

    const user = useUser();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState(null);
    const [response, setResponse] = useState([]);
    const roles = useRolesFromJWT(user);
    const [errors, setErrors] = useState({});


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


    const handleSave = () => {
        const data = {
            name,
            quantity,
            description,
            specification
        };
        onSave(data);

        setName('');
        setQuantity('');
        setDescription('');
        setSpecification(null);
    };

    const getSearchResult = (searchTerm) => {
        ajax(`${baseURL}user/inventory/query/materials/search?category=${category}&materialName=${searchTerm}`, "GET", user.jwt)
            .then((response) => {
                if (response && Array.isArray(response)) {
                    setResponse(response);
                } else {
                    setResponse([]);
                }
            })
            .catch((error) => {
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
        setDescription(result.description);
        setName('');
        setResponse([]);
    };

    function createInventory() {
        const requestBody = {
            materialType: category,
            description: description
        }
        fetch(`${baseURL}admin/inventory/command/materials/create`, {
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
        setQuantity('');
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
                                <strong>Описание:</strong>
                                <p>{result.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <label>
                Количество:
                <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
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

export default UnspecifiedTemplate;