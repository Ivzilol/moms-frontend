import {useState} from "react";
import '../CreateAndSendOrder.css'

const FastenersTemplate = ({ onSave }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [diameter, setDiameter] = useState('');
    const [length, setLength] = useState('');
    const [lengthUnit, setLengthUnit] = useState('');
    const [model, setModel] = useState('');
    const [classType, setClassType] = useState('');
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
        if (!diameter) newErrors.diameter = 'Моля добавете диаметър';
        if (!length) {
            newErrors.length = 'Моля добавете дължина';
        } else if (length <= 0) {
            newErrors.length = 'Дължината не може да е отрицателно число или 0';
        }
        if (!lengthUnit) newErrors.lengthUnit = 'Моля изберете м. ед.';
        if (!model) newErrors.model = 'Моля добавете модел';
        if (!classType) newErrors.classType = 'Моля добавете клас';
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
            model,
            classType,
            quantity,
            description,
            specification
        };
        onSave(data);

        // Clear the form
        setName('');
        setType('');
        setDiameter('');
        setLength('');
        setLengthUnit('');
        setModel('');
        setClassType('');
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
                Диаметър:
                <input type="text" value={diameter} onChange={(e) => setDiameter(e.target.value)} />
                {errors.diameter && <span className="error">{errors.diameter}</span>}
            </label>
            <label>
                Дължина:
                <input type="text" value={length} onChange={(e) => setLength(e.target.value)} />
                {errors.length && <span className="error">{errors.length}</span>}
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
                Модел:
                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                {errors.model && <span className="error">{errors.model}</span>}
            </label>
            <label>
                Клас:
                <input type="text" value={classType} onChange={(e) => setClassType(e.target.value)} />
                {errors.classType && <span className="error">{errors.classType}</span>}
            </label>
            <label>
                Количество:
                <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                {errors.quantity && <span className="error">{errors.quantity}</span>}
            </label>
            <label>
                Описани:
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


export default FastenersTemplate;