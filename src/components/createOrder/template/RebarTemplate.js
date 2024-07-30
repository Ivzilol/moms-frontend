import {useState} from "react";

const RebarTemplate = ( { onSave }) => {
    const [name, setName] = useState('');
    const [maxLength, setMaxLength] = useState('');
    const [maxLengthUnit, setMaxLengthUnit] = useState('');
    const [weight, setWeight] = useState('')
    const [weightUnit, setWeightUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState(null);
    const [errors, setErrors] = useState({});

    const handleFileChange = (e) => {
        setSpecification(e.target.files[0]);
    };

    const validate = () => {
        const newErrors = {};
        if (!maxLength) {
            newErrors.length = 'Моля добавете дължина';
        } else if (maxLength <= 0) {
            newErrors.length = 'м. дължина не може да е отрицателно число или 0';
        }
        if (!weight) newErrors.weight = 'Моля добавете тегло'
        if (!weightUnit) newErrors.weightUnit = 'Моля изберете м. ед.'
        if (!maxLengthUnit) newErrors.lengthUnit = 'Моля изберете м. ед.';
        if (!quantity) newErrors.quantity = 'Моля добавете количество';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const data = {
            name,
            maxLength,
            maxLengthUnit,
            weight,
            weightUnit,
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
                Дължина:
                <input type="text" value={maxLength} onChange={(e) => setMaxLength(e.target.value)} />
                {errors.length && <span className="error">{errors.length}</span>}
            </label>
            <label>
                м. ед. :
                <select name="maxLengthUnit" value={maxLengthUnit} onChange={(e) => setMaxLengthUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
                {errors.lengthUnit && <span className="error">{errors.lengthUnit}</span>}
            </label>
            <label>
                Тегло:
                <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
                {errors.weight && <span className="error">{errors.weight}</span>}
            </label>
            <label>
                м. ед. :
                <select name="weightUnit" value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="G">g</option>
                    <option value="KG">kg</option>
                    <option value="T">t</option>
                </select>
                {errors.weightUnit && <span className="error">{errors.weightUnit}</span>}
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
}

export default RebarTemplate;