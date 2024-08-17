import {useState} from "react";

const TransportTemplate = ({ onSave }) => {

    const [name, setName] = useState('');
    const [maxLength, setMaxLength] = useState('');
    const [maxLengthUnit, setMaxLengthUnit] = useState('');
    const [weight, setWeight] = useState('')
    const [weightUnit, setWeightUnit] = useState('');
    const [truck, setTruck] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState(null);

    const handleFileChange = (e) => {
        setSpecification(e.target.files[0]);
    };


    const handleSave = () => {
        const data = {
            name,
            maxLength,
            maxLengthUnit,
            weight,
            weightUnit,
            truck,
            quantity,
            description,
            specification
        };
        onSave(data);
        setName('');
        setMaxLength('');
        setMaxLengthUnit('');
        setWeight('');
        setWeightUnit('');
        setTruck('');
        setQuantity('');
        setDescription('');
        setSpecification(null);
    };

    return (
        <div className="template-form">
            <label>
                Търси:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Дължина:
                <input type="text" value={maxLength} onChange={(e) => setMaxLength(e.target.value)} />
            </label>
            <label>
                м. ед. :
                <select name="maxLengthUnit" value={maxLengthUnit} onChange={(e) => setMaxLengthUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
            </label>
            <label>
                Тегло:
                <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </label>
            <label>
                м. ед. :
                <select name="weightUnit" value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="G">g</option>
                    <option value="KG">kg</option>
                    <option value="T">t</option>
                </select>
            </label>
            <label>
                Камион:
                <input type="text" value={truck} onChange={(e) => setTruck(e.target.value)} />
            </label>
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

export default TransportTemplate;