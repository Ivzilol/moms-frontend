import {useState} from "react";

const SetTemplate = ({ onSave }) => {
    const [name, setName] = useState('');
    const [galvanisedSheetThickness, setGalvanisedSheetThickness] = useState('');
    const [galvanisedSheetThicknessUnit, setGalvanisedSheetThicknessUnit] = useState('');
    const [color, setColor] = useState('');
    const [maxLength, setMaxLength] = useState('');
    const [maxLengthUnit, setMaxLengthUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState(null);
    const [errors, setErrors] = useState({});

    const handleFileChange = (e) => {
        setSpecification(e.target.files[0]);
    };

    const validate = () => {
        const newErrors = {};
        if (!galvanisedSheetThickness) newErrors.galvanisedSheetThickness = 'Моля добавете дължина';
        if (!galvanisedSheetThicknessUnit) newErrors.galvanisedSheetThicknessUnit = "Моля изберете м. ед.";
        if (!color) newErrors.color = 'Моля добавете цвят'
        if (!maxLength) {
            newErrors.maxLength = 'Моля добавете дължина';
        } else if (maxLength <= 0) {
            newErrors.maxLength = 'м. дължина не може да е отрицателно число или 0';
        }
        if (!maxLengthUnit) newErrors.maxLengthUnit = 'Моля изберете м. ед.';
        if (!quantity) newErrors.quantity = 'Моля добавете количество';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const data = {
            name,
            galvanisedSheetThickness,
            galvanisedSheetThicknessUnit,
            color,
            maxLength,
            maxLengthUnit,
            quantity,
            description,
            specification
        };
        onSave(data);
        setName('');
        setGalvanisedSheetThickness('');
        setGalvanisedSheetThicknessUnit('');
        setColor('');
        setMaxLength('');
        setMaxLengthUnit('');
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
                Поцинкована ламарина дължина:
                <input type="text" value={galvanisedSheetThickness} onChange={(e) => setGalvanisedSheetThickness(e.target.value)} />
                {errors.galvanisedSheetThickness && <span className="error">{errors.galvanisedSheetThickness}</span>}
            </label>
            <label>
                м. ед. :
                <select name="galvanisedSheetThicknessUnit" value={galvanisedSheetThicknessUnit} onChange={(e) => setGalvanisedSheetThicknessUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
                {errors.galvanisedSheetThicknessUnit && <span className="error">{errors.galvanisedSheetThicknessUnit}</span>}
            </label>
            <label>
                Цвят:
                <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                {errors.color && <span className="error">{errors.color}</span>}
            </label>
            <label>
                Максимална дължина:
                <input type="text" value={maxLength} onChange={(e) => setMaxLength(e.target.value)} />
                {errors.maxLength && <span className="error">{errors.maxLength}</span>}
            </label>
            <label>
                м. ед. :
                <select name="maxLengthUnit" value={maxLengthUnit} onChange={(e) => setMaxLengthUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
                {errors.maxLengthUnit && <span className="error">{errors.maxLengthUnit}</span>}
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

export default SetTemplate;