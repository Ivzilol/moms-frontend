import {useEffect, useState} from "react";
import ajax from "../../service/FetchService";
import baseURL from "../baseURL/BaseURL";
import {useUser} from "../../userProvider/UserProvider";
import './EditConstructionSite.css'

const EditConstructionSite = () => {

    const user = useUser();
    const [constructions, setConstructions] = useState([]);
    const [selectedConstruction, setSelectedConstruction] = useState(null);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    useEffect(() => {
        ajax(`${baseURL}user/order/query/construction/all`, "GET", user.jwt)
            .then((response) => {
                setConstructions(response)
            })
    }, [user.jwt])

    const handleSelectChange = (e) => {
        const constructionId = e.target.value;
        setId(e.target.value);
        const selected = constructions.find(construction => construction.id === constructionId);
        if (selected) {
            setSelectedConstruction(selected);
            setName(selected.name);
            setNumber(selected.constructionNumber);
        }
    };

    function editConstructionSite() {
        const requestBody = {
            id: id,
            name: name,
            constructionNumber: number
        }

        fetch(`${baseURL}admin/order/command/update-construction-site`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${user.jwt}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        }).then((response) => {
            if (response.status === 200) {
                alert("Успешно променихте строителния обект");
            }
        })
    }

    return (
        <div className="formContainer">
            <div className="card">
                <div className="cardHeader">
                    <h2>Редакция на Строителен Обект</h2>
                </div>
                <div className="cardBody">
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="construction-select">Изберете строителен обект:</label>
                        <select id="construction-select" className="formControl" onChange={handleSelectChange}>
                            <option value="">-- Изберете --</option>
                            {constructions.map(construction => (
                                <option key={construction.id} value={construction.id}>
                                    {construction.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedConstruction && (
                        <>
                            <div className="formGroup">
                                <label className="formLabel" htmlFor="name">Име:</label>
                                <input
                                    id="name"
                                    className="formControl"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="formGroup">
                                <label className="formLabel" htmlFor="number">Номер на строителен обект:</label>
                                <input
                                    id="number"
                                    className="formControl"
                                    type="text"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </div>

                            <button className="submitButton"
                                    onClick={editConstructionSite}
                            >Запази промените</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditConstructionSite;