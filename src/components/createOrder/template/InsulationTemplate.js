import {useState} from "react";
import '../CreateAndSendOrder.css'
const InsulationTemplate = ({ onSave }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [thickness, setThickness] = useState('');
    const [lengthUnit, setLengthUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState(null);
    const [errors, setErrors] = useState({});

    const handleFileChange = (e) => {
        setSpecification(e.target.files[0]);
    };

    const validate = () => {
        const newErrors = {};
        if (!type) newErrors.type = 'Моля добавете тип';
        if (!thickness) newErrors.diameter = 'Моля добавете дебелина';
        if (!lengthUnit) newErrors.lengthUnit = 'Моля изберете м. ед.';
        if (!quantity) newErrors.quantity = 'Моля добавете количество';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const data = {
            name,
            type,
            thickness,
            lengthUnit,
            quantity,
            description,
            specification
        };
        onSave(data);
        setName('');
        setType('');
        setThickness('');
        setLengthUnit('');
        setQuantity('');
        setDescription('');
        setSpecification(null);
        setErrors({});
    };

    return (
        <div className="template-form">
            <label>
                Търси:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Тип:
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                {errors.type && <span className="error">{errors.type}</span>}
            </label>
            <label>
                Дебелина:
                <input type="text" value={thickness} onChange={(e) => setThickness(e.target.value)} />
                {errors.diameter && <span className="error">{errors.diameter}</span>}
            </label>
            <label>
                м. ед. :
                <select name="lengthUnit" value={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
                {errors.lengthUnit && <span className="error">{errors.lengthUnit}</span>}
            </label>
            <label>
                Количество:
                <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                {errors.quantity && <span className="error">{errors.quantity}</span>}
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
};

export default InsulationTemplate;