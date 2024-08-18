import {useState} from "react";
import './PanelsTemplate.css'
const PanelsTemplate = ({ onSave }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [color, setColor] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [widthUnit, setWidthUnit] = useState('');
    const [thickness, setThickness] = useState('');
    const [lengthUnit, setLengthUnit] = useState('');
    const [totalThickness, setTotalThickness] = useState('');
    const [totalThicknessUnit, setTotalThicknessUnit] = useState('')
    const [frontSheetThickness, setFrontSheetThickness] = useState('')
    const [frontSheetThicknessUnit, setFrontSheetThicknessUnit] = useState('')
    const [backSheetThickness, setBackSheetThickness] = useState('');
    const [backSheetThicknessUnit, setBackSheetThicknessUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantityUnit, setQuantityUnit] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState(null);
    const [errors, setErrors] = useState({});

    const handleFileChange = (e) => {
        setSpecification(e.target.files[0]);
    };

    const validate = () => {
        const newErrors = {};
        if (!type) newErrors.type = 'Моля добавете тип';
        if (!color) newErrors.color = 'Моля добавете цвят'
        if (!length) {
            newErrors.length = 'Моля добавете дължина';
        } else if (length <= 0) {
            newErrors.length = 'Дължината не може да е отрицателно число или 0';
        }
        if (!lengthUnit) newErrors.lengthUnit = 'Моля добавете мерна единица';
        if (!width) {
            newErrors.width = 'Моля добавете ширина';
        } else if (width <= 0) {
            newErrors.width = 'Ширината не може да е отрицателно число или 0';
        }
        if (!widthUnit) {
            newErrors.widthUnit = 'Моля добавете мерна единица'
        }
        if (!totalThickness) newErrors.totalThickness = 'Моля добавете дебелина';
        if (!totalThicknessUnit) newErrors.totalThicknessUnit = 'Моля добавете мерна единица'
        if (!frontSheetThickness) newErrors.frontSheetThickness = "Добавете ширина преден лист";
        if (!frontSheetThicknessUnit) newErrors.frontSheetThicknessUnit = 'Моля добавете мерна единица'
        if (!backSheetThickness) newErrors.backSheetThickness = "Добавете ширина заден лист";
        if (!backSheetThicknessUnit) newErrors.backSheetThicknessUnit = 'Моля добавете мерна единица'
        if (!quantity) newErrors.quantity = 'Моля добавете количество';
        if (!quantityUnit) newErrors.quantityUnit = 'Моля добавете мерна единица'

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const data = {
            name,
            type,
            color,
            length,
            lengthUnit,
            width,
            widthUnit,
            totalThickness,
            totalThicknessUnit,
            frontSheetThickness,
            frontSheetThicknessUnit,
            backSheetThickness,
            backSheetThicknessUnit,
            quantity,
            quantityUnit,
            description,
            specification
        };
        onSave(data);
        setName('');
        setType('');
        setColor('');
        setLength('');
        setLengthUnit('');
        setWidth('');
        setWidthUnit('');
        setThickness('');
        setTotalThickness('');
        setTotalThicknessUnit('');
        setFrontSheetThickness('');
        setFrontSheetThicknessUnit('');
        setBackSheetThickness('');
        setBackSheetThicknessUnit('');
        setQuantity('');
        setQuantityUnit('');
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
                Цвят:
                <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                {errors.color && <span className="error">{errors.color}</span>}
            </label>
            <label>
                Дължина:
                <input type="text" value={length} onChange={(e) => setLength(e.target.value)} />
            </label>
            <label>
                м. ед. :
                <select name="lengthUnit" value={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
            </label>
            <label>
                Ширина:
                <input type="text" value={width} onChange={(e) => setWidth(e.target.value)} />
            </label>
            <label>
                м. ед. :
                <select name="widthUnit" value={widthUnit} onChange={(e) => setWidthUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
            </label>
            <label>
                Обща дебелина:
                <input type="text" value={totalThickness} onChange={(e) => setTotalThickness(e.target.value)} />
            </label>
            <label>
                м. ед. :
                <select name="totalThicknessUnit" value={totalThicknessUnit} onChange={(e) => setTotalThicknessUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
            </label>
            <label>
                Дебелина преден лист:
                <input type="text" value={frontSheetThickness} onChange={(e) => setFrontSheetThickness(e.target.value)} />
                {errors.frontSheetThickness && <span className="error">{errors.frontSheetThickness}</span>}
            </label>
            <label>
                м. ед.:
                <select name="frontSheetThicknessUnit" value={frontSheetThicknessUnit} onChange={(e) => setFrontSheetThicknessUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
                {errors.frontSheetThicknessUnit && <span className="error">{errors.frontSheetThicknessUnit}</span>}
            </label>
            <label>
                Дебелина заден лист:
                <input type="text" value={backSheetThickness} onChange={(e) => setBackSheetThickness(e.target.value)} />
                {errors.backSheetThickness && <span className="error">{errors.backSheetThickness}</span>}
            </label>
            <label>
                м. ед.:
                <select name="backSheetThicknessUnit" value={backSheetThicknessUnit} onChange={(e) => setBackSheetThicknessUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
                {errors.backSheetThicknessUnit && <span className="error">{errors.backSheetThicknessUnit}</span>}
            </label>
            <label>
                Количество:
                <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                {errors.quantity && <span className="error">{errors.quantity}</span>}
            </label>
            <label>
                м. ед. :
                <select name="quantityUnit" value={quantityUnit} onChange={(e) => setQuantityUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="CM2">cm2</option>
                    <option value="M2">m2</option>
                </select>
                {errors.quantityUnit && <span className="error">{errors.quantityUnit}</span>}
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

export default PanelsTemplate;