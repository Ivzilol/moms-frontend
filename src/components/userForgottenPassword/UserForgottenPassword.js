import {useState} from "react";
import './UserForgottenPassword.css'
import baseURL from "../baseURL/BaseURL";

const UserForgottenPassword = () => {

    const [email, setEmail] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);
    const [error, setError] = useState("")
    const [emptyEmailDialog, setEmptyEmailDialog] = useState(false);
    const [emptyErrorEmail, setEmptyErrorEmail] = useState("");

    function sentEmail() {
        if (email.trim() === '') {
            setEmptyErrorEmail("Моля въведете Вашия имейл");
            setEmptyEmailDialog(true);
            return;
        }
        const requestBody = {
            email: email
        }
        fetch(`${baseURL}user/user/command/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        }).then((response) => {
            if (response.ok) {
                alert("Моля проверете вашия имейл")
            } else {
                handleSubmit();
                setError('Невалиден имейл')
                setDialogVisible(true);
            }
        })
    }

    const handleSubmit = () => {
        setEmail("");
    }

    function closeDialog() {
        setDialogVisible(false)
        setEmptyEmailDialog(false)
    }

    return (
        <div className="forgotten-password">
            <div className="forgotten-password-container">
                <h2>Забравена Парола</h2>
                <label>Моля въведете Вашия имейл</label>
                <input
                    placeholder="Имейл"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={closeDialog}
                />
                {dialogVisible &&
                    <h5>{error}</h5>
                }
                {emptyEmailDialog &&
                    <h5>{emptyErrorEmail}</h5>
                }
                <button
                    type="submit"
                    onClick={() => sentEmail()}
                >Изпрати</button>
            </div>
        </div>
    )
}

export default UserForgottenPassword;