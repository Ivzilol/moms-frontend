import {useState} from "react";
import '../createOrder/CreateAndSendOrder.css'
const InsulationTemplate = ({ onSave }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [thickness, setThickness] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [specification, setSpecification] = useState(null);

    const handleSave = () => {
        const formData = {
            name, type, thickness, quantity, description, specification
        };
        onSave(formData);
    };

    const handleFileChange = (e) => {
        setSpecification(e.target.files[0]);
    };

    return (
        <div className="template-form">
            <label>
                Име:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
                Тип:
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
            </label>
            <label>
                Дебелина:
                <input type="text" value={thickness} onChange={(e) => setThickness(e.target.value)} required />
            </label>
            <label>
                Количество:
                <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            </label>
            <label>
                Описани:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <label>
                Спецификация:
                <input type="file" onChange={handleFileChange} required />
            </label>
            <label>
                <button onClick={handleSave}>Запази</button>
            </label>
        </div>
    );
};

export default InsulationTemplate;