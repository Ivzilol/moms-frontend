import {useState} from "react";
import baseURL from "../baseURL/BaseURL";
import {useNavigate} from "react-router-dom";

const UserCreateNewPassword = () => {

    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    function sentChangePasswordRequest() {
        const requestBody = {
            token: token,
            password: password,
            confirmPassword: confirmPassword
        }

        fetch(`${baseURL}user/user/command/reset-password/update-password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        }).then((response) => {
            if (response.ok) {
                alert("Успешно променихте Вашата парола");
                navigate('/login');
            }
        })
     }

    return (
        <div className="forgotten-password">
            <div className="forgotten-password-container">
                <h2>Забравена Парола</h2>
                <label>Моля въведете Вашия токен</label>
                <input
                    type="text"
                    placeholder="token"
                    onChange={(e) => setToken(e.target.value)}
                />
                <label>Моля въведете Вашата парола</label>
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Моля потвърдете Вашата парола</label>
                <input
                    type="password"
                    placeholder="confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    type="submit"
                    onClick={() => sentChangePasswordRequest()}
                >Изпрати</button>
            </div>
        </div>
    )
}

export default UserCreateNewPassword;