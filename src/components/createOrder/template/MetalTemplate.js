import {useEffect, useState} from "react";
import '../CreateAndSendOrder.css'
import {useUser} from "../../../userProvider/UserProvider";
import {jwtDecode} from "jwt-decode";
const MetalTemplate = ({ onSave, category }) => {
    const user = useUser();
    const [name, setName] = useState('');
    const [totalWeight, setTotalWeight] = useState('');
    const [totalWeightUnit, setTotalWeightUnit] = useState('');
    const [kind, setKind] = useState('');
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

    function createInventory() {
        if (!validate()) return;
        const requestBody = {
            materialType: category,
            totalWeight: totalWeight,
            totalWeightUnit: totalWeightUnit,
            kind: kind,
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
        setTotalWeight('');
        setTotalWeightUnit('');
        setKind('')
        setDescription('');
    }

    return (
        <div className="template-form">
            <label>
                Търси:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Общо тегло:
                <input type="number" value={totalWeight} onChange={(e) => setTotalWeight(e.target.value)} />
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

export default MetalTemplate;