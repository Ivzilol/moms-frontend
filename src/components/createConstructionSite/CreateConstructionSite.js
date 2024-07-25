import {useUser} from "../../userProvider/UserProvider";
import {useState} from "react";
import ajax from "../../service/FetchService";
import BaseURL from "../baseURL/BaseURL";
import {useNavigate} from "react-router-dom";
import styles from './CreateConstructionSite.module.css';

const CreateConstructionSite = () => {

    const user = useUser();
    const [name, setName] = useState("");
    const [constructionNumber, setConstructionNumber] = useState("");
    const navigate = useNavigate();
    function createConstructionSite() {
        const requestBody = {
            "name": name,
            "constructionNumber": constructionNumber
        }
        ajax(`${BaseURL}admin/order/command/create-construction-site`, "POST", user.jwt, requestBody)
            .then((response) => {
                if (response.id !== null) {
                    navigate('/');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    alert("Construction site already exists. Please choose a different name or number.");
                } else {
                    alert("Construction site already exists. Please choose a different name or number.");
                }
            });
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    Create Construction Site
                </div>
                <div className={styles.cardBody}>
                    <div onSubmit={(e) =>
                    { e.preventDefault(); createConstructionSite(); }}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.formLabel}>Name</label>
                            <input
                                type="text"
                                className={styles.formControl}
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="constructionNumber" className={styles.formLabel}>Construction Number</label>
                            <input
                                type="text"
                                className={styles.formControl}
                                id="constructionNumber"
                                value={constructionNumber}
                                onChange={(e) => setConstructionNumber(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className={styles.submitButton}
                            onClick={createConstructionSite}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CreateConstructionSite;