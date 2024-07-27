import {useState} from "react";
import '../createOrder/CreateAndSendOrder.css'

const FastenersTemplate = ({ onSave }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [diameter, setDiameter] = useState('');
    const [length, setLength] = useState('');
    const [lengthUnit, setLengthUnit] = useState('mm');
    const [model, setModel] = useState('');
    const [classType, setClassType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState(null);

    const handleFileChange = (e) => {
        setSpecification(e.target.files[0]);
    };

    const handleSave = () => {
        const data = {
            name,
            type,
            diameter,
            length,
            lengthUnit,
            model,
            classType,
            quantity,
            description,
            specification
        };
        onSave(data);
        // clear the form
        setName('');
        setType('');
        setDiameter('');
        setLength('');
        setLengthUnit('mm');
        setModel('');
        setClassType('');
        setQuantity('');
        setDescription('');
        setSpecification(null);
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
                Диаметър:
                <input type="text" value={diameter} onChange={(e) => setDiameter(e.target.value)} required />
            </label>
            <label>
                Дължина:
                <input type="text" value={length} onChange={(e) => setLength(e.target.value)} required />
            </label>
            <label>
                м. ед. :
                <select value={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)} required>
                    <option value="MM">MM</option>
                    <option value="CM">CM</option>
                    <option value="M">M</option>
                </select>
            </label>
            <label>
                Модел:
                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
            </label>
            <label>
                Клас:
                <input type="text" value={classType} onChange={(e) => setClassType(e.target.value)} required />
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


export default FastenersTemplate;