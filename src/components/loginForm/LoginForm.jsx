import React, {useContext, useState} from 'react';
import {useFormik} from 'formik';

import {LoginFormKeys, PATH} from '../../core/environments/constants';
import loginValidation from './loginValidation';
import AuthContext from '../../context/AuthContext';
import classes from './LoginForm.module.css';
import logo from '../../assets/images/MCK-logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useUser} from "../../userProvider/UserProvider";
import {useNavigate} from "react-router-dom";


const initialValues = {
    [LoginFormKeys.Email]: '',
    [LoginFormKeys.Password]: ''
}

const LoginForm = () => {
    const [serverError, setServerError] = useState({});
    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
    } = useFormik({
        initialValues,
        // onSubmit,
        validationSchema: loginValidation,
    });

    // const { loginSubmitHandler } = useContext(AuthContext);

    // async function onSubmit(values) {
    //     try {
    //         await loginSubmitHandler(values);
    //     } catch (error) {
    //         setServerError(error);
    //     }
    // }
    const [isLoading, setIsLoading] = useState(false);
    const user = useUser();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function sendLoginRequest(event) {
        setIsLoading(true);
        const requestBody = {
            "email": email,
            "password": password,
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
                if (authHeader) {
                    user.setJwt(authHeader);
                    localStorage.setItem('jwt', authHeader);
                    setIsLoading(false);
                    navigateHome()
                 } else {
                    console.error("Authorization header not found");
                }

            })
            .catch(error => {
                setIsLoading(false);
                console.error(error);
            });
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleCustomSubmit = (e) => {
        e.preventDefault();
        sendLoginRequest(e)
        // navigateHome()
    };

    function navigateHome(){
        const jwt = localStorage.getItem('jwt')
        if (jwt !== null) {
            navigate('/')
        }
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
                        <form className={classes.poppins}>
                            <img src={logo} alt="Logo" className={classes.logo}/>

                            <label htmlFor={LoginFormKeys.Email}>Имейл</label>
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={handleBlur}
                                placeholder="Имейл"
                                id="username"
                                // className={`${classes.input} ${touched[LoginFormKeys.Email] && errors[LoginFormKeys.Email] ? 'is-invalid' : ''}`}
                            />
                            {/*{touched[LoginFormKeys.Email] && errors[LoginFormKeys.Email] ? (*/}
                            {/*    <div className="invalid-feedback">{errors[LoginFormKeys.Email]}</div>*/}
                            {/*) : null}*/}

                            <label htmlFor="password">Парола</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={handleBlur}
                                placeholder="Парола"
                                id="password"
                                // className={`${classes.input} ${touched[LoginFormKeys.Password] && errors[LoginFormKeys.password] ? 'is-invalid' : ''}`}
                            />
                            {/*{touched[LoginFormKeys.Password] && errors[LoginFormKeys.Password] ? (*/}
                            {/*    <div className="invalid-feedback">{errors[LoginFormKeys.Password]}</div>*/}
                            {/*) : null}*/}

                            <button type="submit" className={classes.button}
                                    onClick={handleCustomSubmit}
                            >
                                Вход
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;


// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import loginValidation from './loginValidation';
// import classes from './LoginForm.module.css';
// import logo from '../../assets/images/MCK-logo.png';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import useAuth from '../../hooks/useAuth';

// const LoginForm = () => {

//   const { login } = useAuth();

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: ''
//     },
//     validationSchema: loginValidation,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         await login(values.email, values.password);
//       } catch (error) {
//         console.error('Login failed', error);
//       }
//       setSubmitting(false);
//     }
//   });

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-4">
//           <div className="card-body">
//             <div className={classes.background}>
//               <div className={classes.shape}></div>
//               <div className={classes.shape}></div>
//             </div>
//             <form className={classes.poppins} onSubmit={formik.handleSubmit}>
//               <img src={logo} alt="Logo" className={classes.logo} />

//               <label htmlFor="email">Имейл</label>
//               <input
//                 type="text"
//                 name="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 placeholder="Имейл"
//                 id="username"
//                 className={`${classes.input} ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
//               />
//               {formik.touched.email && formik.errors.email ? (
//                 <div className="invalid-feedback">{formik.errors.email}</div>
//               ) : null}

//               <label htmlFor="password">Парола</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 placeholder="Парола"
//                 id="password"
//                 className={`${classes.input} ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
//               />
//               {formik.touched.password && formik.errors.password ? (
//                 <div className="invalid-feedback">{formik.errors.password}</div>
//               ) : null}

//               <button type="submit" className={classes.button} disabled={formik.isSubmitting}>
//                 Вход
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;