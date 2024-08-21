import {useEffect, useState} from "react";
import '../CreateAndSendOrder.css'
import {useUser} from "../../../userProvider/UserProvider";
import {jwtDecode} from "jwt-decode";
const InsulationTemplate = ({ onSave, category }) => {
    const user = useUser();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [thickness, setThickness] = useState('');
    const [lengthUnit, setLengthUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantityUnit, setQuantityUnit] = useState('');
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
            quantityUnit,
            description,
            specification
        };
        onSave(data);
        setName('');
        setType('');
        setThickness('');
        setLengthUnit('');
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
            type: type,
            thickness: thickness,
            thicknessUnit: lengthUnit,
            quantity: quantity
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
        setType('');
        setThickness('');
        setLengthUnit('');
        setQuantity('');
        setQuantityUnit('');
    }

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
                {/*{errors.diameter && <span className="error">{errors.diameter}</span>}*/}
            </label>
            <label>
                м. ед. :
                <select name="lengthUnit" value={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="MM">ММ</option>
                    <option value="CM">СМ</option>
                    <option value="M">М</option>
                </select>
                {/*{errors.lengthUnit && <span className="error">{errors.lengthUnit}</span>}*/}
            </label>
            <label>
                Количество:
                <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                {errors.quantity && <span className="error">{errors.quantity}</span>}
            </label>
            <label>
                м. ед. :
                <select name="areaUnit" value={quantityUnit} onChange={(e) => setQuantityUnit(e.target.value)}>
                    <option value="">м. ед.</option>
                    <option value="CM2">cm2</option>
                    <option value="M2">m2</option>
                </select>
                {/*{errors.lengthUnit && <span className="error">{errors.lengthUnit}</span>}*/}
            </label>
            <label>
                Описание:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                Спецификация:
                <input type="file" onChange={handleFileChange} />
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
};

export default InsulationTemplate;