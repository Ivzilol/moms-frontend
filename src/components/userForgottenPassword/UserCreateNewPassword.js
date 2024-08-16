import {useState} from "react";
import baseURL from "../baseURL/BaseURL";
import {useNavigate} from "react-router-dom";

const UserCreateNewPassword = () => {

    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emptyToken, setEmptyToken] = useState('');
    const [emptyTokenDialog, setEmptyTokenDialog] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState('');
    const [invalidPasswordDialog, setInvalidPasswordDialog] = useState(false);
    const navigate = useNavigate();

    function sentChangePasswordRequest() {
        if (token.trim() === '') {
            setEmptyToken('Моля поставете вашия токен')
            setEmptyTokenDialog(true)
            return;
        }
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
            } else {
                handleSubmit();
                console.log("proba 2")
                setInvalidPassword("Невалидна парола");
                setInvalidPasswordDialog(true);
            }
        })
    }

    const handleSubmit = () => {
        console.log("proba")
        setToken("");
        setPassword("");
        setConfirmPassword("")
    }

    function closeDialog() {
        setEmptyTokenDialog(false);
        setInvalidPasswordDialog(false);
    }

    return (
        <div className="forgotten-password">
            <div className="forgotten-password-container">
                <h2>Забравена Парола</h2>
                <label>Моля въведете Вашия токен</label>
                <input
                    type="text"
                    placeholder="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    onFocus={closeDialog}
                />
                {emptyTokenDialog &&
                    <h6 className="forgotten-password-error">{emptyToken}</h6>
                }
                <label>Моля въведете Вашата парола</label>
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={closeDialog}

                />
                {invalidPasswordDialog &&
                    <h6 className="forgotten-password-error">{invalidPassword}</h6>
                }
                <label>Моля потвърдете Вашата парола</label>
                <input
                    type="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={closeDialog}
                />
                <button
                    type="submit"
                    onClick={() => sentChangePasswordRequest()}
                >Изпрати
                </button>
            </div>
        </div>
    )
}

export default UserCreateNewPassword;