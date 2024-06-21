import React, { useState } from 'react';
import { useFormik } from 'formik';
import loginValidation from './loginValidation';
import classes from './LoginForm.module.css';
import logo from '../../assets/images/MCK-logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import useAuth from '../../hooks/useAuth';

const LoginForm = () => {

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginValidation,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await login(values.email, values.password);
      } catch (error) {
        console.error('Login failed', error);
      }
      setSubmitting(false);
    }
  });

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
              <img src={logo} alt="Logo" className={classes.logo} />

              <label htmlFor="email">Имейл</label>
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Имейл"
                id="username"
                className={`${classes.input} ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
              ) : null}

              <label htmlFor="password">Парола</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Парола"
                id="password"
                className={`${classes.input} ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}

              <button type="submit" className={classes.button} disabled={formik.isSubmitting}>
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