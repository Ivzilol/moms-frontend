import React, {useContext, useState} from 'react';
import classNames from 'classnames';
import styles from './Header.module.css';
import logo from '../../assets/images/MCK-logo.png';
import AuthContext from '../../context/AuthContext';
import {useUser} from "../../userProvider/UserProvider";

export default function Header() {

    const { isAuthenticated, logoutHandler } = useState();
    const user = useUser();
    function logout() {
        user.setJwt(null)
    }

    return (
        <nav className={classNames(styles.navbar, 'navbar-expand-lg')}>
            <div className="container d-flex justify-content-between align-items-center">
                <a className={classNames('d-flex', 'align-items-center', styles['navbar-brand'])} href='/'>
                    <img src={logo} className={classNames(styles['img-fluid'], styles['logo-image'])} alt='Logo' />
                    <div className="d-flex flex-column">
                        <strong className={styles['logo-text']}>Supply</strong>
                        <small className={styles['logo-slogan']}>Manager</small>
                    </div>
                </a>

                <button className={styles['navbar-toggler']} type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className={styles['navbar-toggler-icon']}></span>
                </button>

                <div className={classNames('collapse', 'navbar-collapse')} id='navbarNav'>
                    <ul className={classNames('navbar-nav', 'ms-auto', 'd-flex', 'align-items-center')}>
                        {/* <li className='nav-item me-4'>
                            <a className='nav-link active' href='index.html'>Item1</a>
                        </li>
                        <li className='nav-item me-4'>
                            <a className='nav-link' href='about.html'>Item2</a>
                        </li>
                        <li className='nav-item dropdown me-4'>
                            <a className='nav-link dropdown-toggle' href='#' id='navbarLightDropdownMenuLink' role='button' data-bs-toggle='dropdown' aria-expanded='false'>Pages</a>
                            <ul className='dropdown-menu dropdown-menu-light' aria-labelledby='navbarLightDropdownMenuLink'>
                                <li><a className='dropdown-item' href='job-listings.html'>Item3</a></li>
                                <li><a className='dropdown-item' href='job-details.html'>Item4</a></li>
                            </ul>
                        </li>
                        <li className='nav-item me-4'>
                            <a className='nav-link' href='contact.html'>Item6</a>
                        </li>
                        <li className='nav-item ms-lg-auto me-4'>
                            <a className='nav-link' href='#'>Item7</a>
                        </li> */}
                        <li className='nav-item'>
                            <a
                                className={classNames('nav-link', 'btn')}
                                href='#'
                                onClick={logout}
                            >
                                Изход
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
