import React from 'react';
import classes from './LoginForm.module.css';
import logo from '../../assets/MCK-logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoginForm = () => {
  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-4">
            <   div className="card-body">
                    <div className={classes.background}>
                        <div className={classes.shape}></div>
                        <div className={classes.shape}></div>
                    </div>
                    <form className={classes.poppins}>
                        <img src={logo} alt="Logo" className={classes.logo} />

                        <label htmlFor="email">Имейл</label>
                        <input type="text" placeholder="Имейл" id="username" className={classes.input} />

                        <label htmlFor="password">Парола</label>
                        <input type="password" placeholder="Парола" id="password" className={classes.input} />

                        <button className={classes.button}>Вход</button>
                        {/* <div className={classes.social}>
                            <div className={classes.go}><i className="fab fa-google"></i> Google</div>
                            <div className={classes.fb}><i className="fab fa-facebook"></i> Facebook</div>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default LoginForm;
