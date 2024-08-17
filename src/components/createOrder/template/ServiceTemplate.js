import {useUser} from "../../../userProvider/UserProvider";
import {useEffect, useState} from "react";
import ajax from "../../../service/FetchService";

const ServiceTemplate = ({ onSave, category }) => {
    const user = useUser();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState(null);
    const [response, setResponse] = useState([]);

    const handleFileChange = (e) => {
        setSpecification(e.target.files[0]);
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
        setQuantity(result.quantity);
        setDescription(result.description);
        setName('');
        setResponse([]);
    };

    return (
        <div className="template-form">
            <label>
                Търси:
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
                        <li key={index} onClick={() => handleSelectResult(result)}>
                            {result.name}
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
            </label>
            <label>
                <button onClick={handleSave}>Запази</button>
            </label>
        </div>
    );
}

export default ServiceTemplate;