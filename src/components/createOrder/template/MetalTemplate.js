import {useState} from "react";
import '../CreateAndSendOrder.css'
const MetalTemplate = ({ onSave }) => {
    const [name, setName] = useState('');
    const [totalWeight, setTotalWeight] = useState('');
    const [totalWeightUnit, setTotalWeightUnit] = useState('');
    const [kind, setKind] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState(null);
    const [errors, setErrors] = useState({});

    const handleFileChange = (e) => {
        setSpecification(e.target.files[0]);
    };

    const validate = () => {
        const newErrors = {};
        if (!totalWeight) newErrors.diameter = 'Моля добавете обща тежест';
        if (!totalWeightUnit) newErrors.totalWeightUnit = 'Моля изберете м. ед.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const data = {
            name,
            totalWeight,
            totalWeightUnit,
            kind,
            description,
            specification
        };
        onSave(data);
        setName('');
        setTotalWeight('');
        setTotalWeightUnit('');
        setKind('')
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
                Общо тегло:
                <input type="text" value={totalWeight} onChange={(e) => setTotalWeight(e.target.value)} />
                {errors.totalWeight && <span className="error">{errors.totalWeight}</span>}
            </label>
            <label>
                м. ед. :
                <select name="totalWeightUnit" value={totalWeightUnit} onChange={(e) => setTotalWeightUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="G">g</option>
                    <option value="KG">kg</option>
                    <option value="T">t</option>
                </select>
                {errors.totalWeightUnit && <span className="error">{errors.totalWeightUnit}</span>}
            </label>
            <label>
                Вид:
                <input type="text" value={kind} onChange={(e) => setKind(e.target.value)} />
                {errors.kind && <span className="error">{errors.kind}</span>}
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

export default MetalTemplate;