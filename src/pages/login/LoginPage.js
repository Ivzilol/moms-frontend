import React from 'react'
import classes from './LoginPage.module.css';

import LoginForm from '../../components/loginForm/LoginForm'



const LoginPage = () => {
  return (
    <div className={classes.login_page}>
        <LoginForm/>
    </div>
  )
}

export default LoginPage;