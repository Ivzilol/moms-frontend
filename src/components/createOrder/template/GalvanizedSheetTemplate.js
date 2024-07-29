import {useState} from "react";
import '../CreateAndSendOrder.css'
const GalvanizedSheetTemplate = ({ onSave }) => {

    const [name, setName] = useState('');
    const [maxLength, setMaxLength] = useState('');
    const [lengthUnit, setLengthUnit] = useState('');
    const [area, setArea] = useState('');
    const [areaUnit, setAreaUnit] = useState('');
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
        if (!area) {
            newErrors.area = 'Моля добавете площ';
        } else if (area <= 0) {
            newErrors.area = 'Площ не може да е отрицателно число или 0';
        }
        if (!lengthUnit) newErrors.lengthUnit = 'Моля изберете м. ед.';
        if (!quantity) newErrors.quantity = 'Моля добавете количество';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const data = {
            name,
            length: maxLength,
            lengthUnit,
            area,
            areaUnit,
            quantity,
            description,
            specification
        };
        onSave(data);

        setName('');
        setMaxLength('');
        setLengthUnit('');
        setArea('');
        setAreaUnit('');
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
                <select name="lengthUnit" value={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
                {errors.lengthUnit && <span className="error">{errors.lengthUnit}</span>}
            </label>
            <label>
                Площ:
                <input type="text" value={area} onChange={(e) => setArea(e.target.value)} />
                {errors.area && <span className="error">{errors.area}</span>}
            </label>
            <label>
                м. ед. :
                <select name="areaUnit" value={areaUnit} onChange={(e) => setAreaUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="CM2">cm2</option>
                    <option value="M2">m2</option>
                </select>
                {errors.lengthUnit && <span className="error">{errors.lengthUnit}</span>}
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

export default GalvanizedSheetTemplate;