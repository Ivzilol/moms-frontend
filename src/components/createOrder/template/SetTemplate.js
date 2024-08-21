import React, {useEffect, useState} from "react";
import {useUser} from "../../../userProvider/UserProvider";
import {jwtDecode} from "jwt-decode";

const SetTemplate = ({onSave, category}) => {
    const user = useUser();
    const [name, setName] = useState('');
    const [galvanisedSheetThickness, setGalvanisedSheetThickness] = useState('');
    const [galvanisedSheetThicknessUnit, setGalvanisedSheetThicknessUnit] = useState('');
    const [color, setColor] = useState('');
    const [maxLength, setMaxLength] = useState('');
    const [maxLengthUnit, setMaxLengthUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantityUnit, setQuantityUnit] = useState('')
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState(null);
    const [errors, setErrors] = useState({});
    const [roles, setRoles] = useState(getRolesFromJWT());

    useEffect(() => {
        setRoles(getRolesFromJWT())
    }, [user.jwt])

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodeJwt = jwtDecode(user.jwt)
            return decodeJwt.roles.split(",")
        }
        return [];
    }

    const userRole = roles.length === 1 && roles.includes('USER');
    const adminRole = ['USER', 'ADMIN'].every(role => roles.includes(role));

    const handleFileChange = (e) => {
        setSpecification(e.target.files[0]);
    };

    const validate = () => {
        const newErrors = {};
        if (!color) newErrors.color = 'Моля добавете цвят'
        if (!maxLength) {
            newErrors.maxLength = 'Моля добавете дължина';
        } else if (maxLength <= 0) {
            newErrors.maxLength = 'м. дължина не може да е отрицателно число или 0';
        }
        if (!maxLengthUnit) newErrors.maxLengthUnit = 'Моля изберете м. ед.';
        if (!quantity) newErrors.quantity = 'Моля добавете количество';
        if (!quantityUnit) newErrors.quantityUnit = 'Моля изберете м. ед.';
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
            quantityUnit,
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
        setQuantityUnit('');
        setDescription('');
        setSpecification(null);
        setErrors({});
    };

    function createInventory() {
        if (!validate()) return;
        const requestBody = {
            materialType: category,
            color: color,
            maxLength: maxLength,
            maxLengthUnit: maxLengthUnit,
            quantity: quantity,
            quantityUnit: quantityUnit,
            description: description
        }
        fetch(`http://localhost:9003/v1/admin/inventory/command/materials/create`, {
            method: "post",
            headers: {
                "Authorization": `Bearer ${user.jwt}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
            .then((response) => {
                if (response.status === 200) {
                    clearInputs()
                    alert("Успешно създадохте материал")
                }
            })

    }

    function clearInputs() {
        setColor('');
        setMaxLength('');
        setMaxLengthUnit('');
        setQuantity('');
        setQuantityUnit('');
        setDescription('');
    }

    return (
        <div className="template-form">
            <label>
                Търси:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>
                Цвят:
                <input type="text" value={color} onChange={(e) => setColor(e.target.value)}/>
                {errors.color && <span className="error">{errors.color}</span>}
            </label>
            <label>
                M. дължина:
                <input type="text" value={maxLength} onChange={(e) => setMaxLength(e.target.value)}/>
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
                <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                {errors.quantity && <span className="error">{errors.quantity}</span>}
            </label>
            <label>
                м. ед. :
                <select name="quantityUnit" value={quantityUnit} onChange={(e) => setQuantityUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="G">g</option>
                    <option value="KG">kg</option>
                    <option value="T">t</option>
                </select>
                {errors.quantityUnit && <span className="error">{errors.quantityUnit}</span>}
            </label>
            <label>
                Описание:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
            </label>
            <label>
                Спецификация:
                <input type="file" onChange={handleFileChange}/>
            </label>
            {userRole &&
                <label>
                    <button onClick={handleSave}>Запази</button>
                </label>
            }
            {adminRole &&
                <label>
                    <button
                        type="submit"
                        onClick={() => createInventory()}>Създай</button>
                </label>
            }
        </div>

    );
}

export default SetTemplate;