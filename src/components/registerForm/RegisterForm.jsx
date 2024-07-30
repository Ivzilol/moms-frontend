import React, { useState } from 'react';
import { useFormik } from 'formik';
import { RegisterFormKeys } from '../../core/environments/constants';
import registerValidation from './registerValidation';
import { useUser } from '../../userProvider/UserProvider'

import ConfirmRegisterModal from './ConfirmRegisterModal';

import styles from './RegisterForm.module.css'; 

const initialValues = {
    [RegisterFormKeys.FirstName]: '',
    [RegisterFormKeys.LastName]: '',
    [RegisterFormKeys.Email]: '',
    [RegisterFormKeys.PhoneNumber]: '',
    [RegisterFormKeys.Password]: '',
    [RegisterFormKeys.ConfirmPassword]: '',
    [RegisterFormKeys.Role]: 'USER', // Default role
};

const RegisterForm = () => {
    const [serverError, setServerError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { register  } = useUser();

    const formik = useFormik({
        initialValues,
        validationSchema: registerValidation,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                await register(values);
                setServerError(null);
                setShowModal(true);
            } catch (error) {
                console.error('Registration error:', error);
                setErrors({ serverError: error.message || 'An error occurred' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
    } = formik;

    // Modal setups
    const handleClose = async() => {
        setShowModal(false);
    };

    const handleConfirm = async() => {

        const { values } = formik;

        try {
            await register(values);
            console.log("values" + values)
            setServerError(null);
            setShowModal(false); 
        } catch (error) {
            console.error('Registration error:', error);
            setServerError(error.message || 'An error occurred during registration.');
        }
    };

    return (
        <div className={`container ${styles.registerFormContainer}`}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                            <form className={styles.registerForm} onSubmit={(e) => { e.preventDefault(); setShowModal(true); }}>
                                <div className={`mb-3 ${styles.formGroup}`}>
                                    <div className={`mb-3 ${styles.formField}`}>
                                        <label htmlFor={RegisterFormKeys.FirstName} className={`form-label ${styles.formLabel}`}>Име</label>
                                        <input
                                            type="text"
                                            className={`form-control ${styles.formControl} ${touched[RegisterFormKeys.FirstName] && errors[RegisterFormKeys.FirstName] ? 'is-invalid' : ''}`}
                                            name={RegisterFormKeys.FirstName}
                                            id={RegisterFormKeys.FirstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values[RegisterFormKeys.FirstName]}
                                        />
                                        {touched[RegisterFormKeys.FirstName] && errors[RegisterFormKeys.FirstName] && <div className={styles.errorText}>{errors[RegisterFormKeys.FirstName]}</div>}
                                    </div>
                                    <div className={`mb-3 ${styles.formField}`}>
                                        <label htmlFor={RegisterFormKeys.LastName} className={`form-label ${styles.formLabel}`}>Фамилия</label>
                                        <input
                                            type="text"
                                            className={`form-control ${styles.formControl} ${touched[RegisterFormKeys.LastName] && errors[RegisterFormKeys.LastName] ? 'is-invalid' : ''}`}
                                            name={RegisterFormKeys.LastName}
                                            id={RegisterFormKeys.LastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values[RegisterFormKeys.LastName]}
                                        />
                                        {touched[RegisterFormKeys.LastName] && errors[RegisterFormKeys.LastName] && <div className={styles.errorText}>{errors[RegisterFormKeys.LastName]}</div>}
                                    </div>
                                </div>

                                <div className={`mb-3 ${styles.formGroup}`}>
                                    <div className={`mb-3 ${styles.formField}`}>
                                        <label htmlFor={RegisterFormKeys.Email} className={`form-label ${styles.formLabel}`}>Имейл</label>
                                        <input
                                            type="email"
                                            className={`form-control ${styles.formControl} ${touched[RegisterFormKeys.Email] && errors[RegisterFormKeys.Email] ? 'is-invalid' : ''}`}
                                            name={RegisterFormKeys.Email}
                                            id={RegisterFormKeys.Email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values[RegisterFormKeys.Email]}
                                        />
                                        {touched[RegisterFormKeys.Email] && errors[RegisterFormKeys.Email] && <div className={styles.errorText}>{errors[RegisterFormKeys.Email]}</div>}
                                    </div>
                                    <div className={`mb-3 ${styles.formField}`}>
                                        <label htmlFor={RegisterFormKeys.PhoneNumber} className={`form-label ${styles.formLabel}`}>Телефон</label>
                                        <input
                                            type="text"
                                            className={`form-control ${styles.formControl}`}
                                            name={RegisterFormKeys.PhoneNumber}
                                            id={RegisterFormKeys.PhoneNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values[RegisterFormKeys.PhoneNumber]}
                                        />
                                    </div>
                                </div>

                                <div className={`mb-3 ${styles.formGroup}`}>
                                    <div className={`mb-3 ${styles.formField}`}>
                                        <label htmlFor={RegisterFormKeys.Password} className={`form-label ${styles.formLabel}`}>Парола</label>
                                        <input
                                            type="password"
                                            className={`form-control ${styles.formControl} ${touched[RegisterFormKeys.Password] && errors[RegisterFormKeys.Password] ? 'is-invalid' : ''}`}
                                            name={RegisterFormKeys.Password}
                                            id={RegisterFormKeys.Password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values[RegisterFormKeys.Password]}
                                        />
                                        {touched[RegisterFormKeys.Password] && errors[RegisterFormKeys.Password] && <div className={styles.errorText}>{errors[RegisterFormKeys.Password]}</div>}
                                    </div>
                                    <div className={`mb-3 ${styles.formField}`}>
                                        <label htmlFor={RegisterFormKeys.ConfirmPassword} className={`form-label ${styles.formLabel}`}>Потвърдете Паролата</label>
                                        <input
                                            type="password"
                                            className={`form-control ${styles.formControl} ${touched[RegisterFormKeys.ConfirmPassword] && errors[RegisterFormKeys.ConfirmPassword] ? 'is-invalid' : ''}`}
                                            name={RegisterFormKeys.ConfirmPassword}
                                            id={RegisterFormKeys.ConfirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values[RegisterFormKeys.ConfirmPassword]}
                                        />
                                        {touched[RegisterFormKeys.ConfirmPassword] && errors[RegisterFormKeys.ConfirmPassword] && <div className={styles.errorText}>{errors[RegisterFormKeys.ConfirmPassword]}</div>}
                                    </div>
                                </div>

                                <div className={`mb-3 ${styles.formGroup}`}>

                                    <label htmlFor={RegisterFormKeys.Role} className={`form-label ${styles.formLabel}`}>Ниво на Достъп</label>
                                    <select
                                        className={`form-select ${styles.formControl} ${touched[RegisterFormKeys.Role] && errors[RegisterFormKeys.Role] ? 'is-invalid' : ''}`}
                                        name={RegisterFormKeys.Role}
                                        id={RegisterFormKeys.Role}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values[RegisterFormKeys.Role]}
                                    >
                                        <option value="USER">Юзър</option>
                                        <option value="ADMIN">Админ</option>
                                    </select>
                                    {touched[RegisterFormKeys.Role] && errors[RegisterFormKeys.Role] && <div className={styles.errorText}>{errors[RegisterFormKeys.Role]}</div>}
                                </div>

                                <button type="submit" className={`btn btn-primary ${styles.submitButton}`} disabled={isSubmitting}>Създайте Акаунт</button>

                                {serverError && <div className={`alert alert-danger ${styles.errorContainer}`} role="alert">{serverError}</div>}
                            </form>
                        </div>
                    </div>

                        {/* Modal */}
                    <ConfirmRegisterModal
                        show={showModal}
                        handleClose={handleClose}
                        handleConfirm={handleConfirm}
                        userInfo={{
                            firstName: values[RegisterFormKeys.FirstName],
                            lastName: values[RegisterFormKeys.LastName],
                            email: values[RegisterFormKeys.Email],
                            phoneNumber: values[RegisterFormKeys.PhoneNumber],
                        }}
                    />
                </div>

    );
};

export default RegisterForm;
