import React, {useState} from 'react';
import {useFormik} from 'formik';

import {LoginFormKeys} from '../../core/environments/constants';
import loginValidation from './loginValidation';
import classes from './LoginForm.module.css';
import logo from '../../assets/images/MCK-logo.png';
import {useUser} from "../../userProvider/UserProvider";
import {useNavigate} from "react-router-dom";
import Spinner from '../spinner/Spinner';

const initialValues = {
    [LoginFormKeys.Email]: '',
    [LoginFormKeys.Password]: ''
}

const LoginForm = () => {
    const [serverError, setServerError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const user = useUser();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        validationSchema: loginValidation,
        validateOnBlur: false, 
        validateOnChange: false, 
        onSubmit: (values) => {
            sendLoginRequest(values);
        },
    });

    function sendLoginRequest(values) {
        setIsLoading(true);
        const requestBody = {
            "email": values.email,
            "password": values.password,
        };

        fetch(`http://localhost:8080/v1/user/user/query/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject("Invalid login attempt");
            }
            return response.json().then(data => ({data, headers: response.headers}));
        })
        .then(({data, headers}) => {
            const authHeader = data.token;
            const token = authHeader.split(' ');
            const userData = {
                "id": data.id,
                "email": data.email,
                "roles": data.roles
            }
            
            if (token[1]) {
                user.setJwt(token[1]);
                localStorage.setItem('jwt', token[1]);
                localStorage.setItem('userData', JSON.stringify(userData))
                setIsLoading(false);
                navigate('/')
             }
        })
        .catch(error => {
            setIsLoading(false);
            setServerError({message: error});
        });
    }

    if (isLoading) {
        return <div><Spinner/></div>;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card-body">
                        <div className={classes.background}>
                            <div className={classes.shape}></div>
                            <div className={classes.shape}></div>
                        </div>
                        <form className={classes.poppins} onSubmit={formik.handleSubmit}>
                            <img src={logo} alt="Logo" className={classes.logo}/>

                            <label htmlFor={LoginFormKeys.Email}>Имейл</label>
                            <input
                                type="text"
                                name={LoginFormKeys.Email}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Имейл"
                                id="username"
                                className={`${classes.input} ${formik.errors[LoginFormKeys.Email] ? 'is-invalid' : ''}`}
                            />
                            {formik.errors[LoginFormKeys.Email] && (
                                <div className="invalid-feedback">{formik.errors[LoginFormKeys.Email]}</div>
                            )}

                            <label htmlFor={LoginFormKeys.Password}>Парола</label>
                            <input
                                type="password"
                                name={LoginFormKeys.Password}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Парола"
                                id="password"
                                className={`${classes.input} ${formik.errors[LoginFormKeys.Password] ? 'is-invalid' : ''}`}
                            />
                            {formik.errors[LoginFormKeys.Password] && (
                                <div className="invalid-feedback">{formik.errors[LoginFormKeys.Password]}</div>
                            )}

                            <button type="submit" className={classes.button}>
                                Вход
                            </button>
                            {serverError.message && (
                                <div className="alert alert-danger mt-3">Паролата или имейла са некоректни</div>
                            )}
                            <a href="/forgotten-password">Забравена парола</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
