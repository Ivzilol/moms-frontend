// src/components/Header.js
import React from 'react';
import classNames from 'classnames';
import styles from './Header.module.css';
import logo from '../../assets/images/logo.png';

export default function Header() {
    return (
        <nav className={classNames(styles['navbar'], styles['navbar-expand-lg'])}>
            <div className="container">
                <a className={classNames(styles['navbar-brand'], "d-flex", "align-items-center")} href='index.html'>
                    <img src={logo} className={classNames(styles['img-fluid'], styles['logo-image'])} alt="Logo" />
                    <div className="d-flex flex-column">
                        <strong className={styles['logo-text']}>Gotto</strong>
                        <small className={styles['logo-slogan']}>Online Job Portal</small>
                    </div>
                </a>

                <button className={styles['navbar-toggler']} type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className={['navbar-toggler-icon']}></span>
                </button>

                <div className={classNames(styles['collapse'], styles['navbar-collapse'])} id='navbarNav'>
                    <ul className={classNames(styles['navbar-nav'], "align-items-center", "ms-lg-5")}>
                        <li className="nav-item">
                            <a className="nav-link active" href='index.html'>Homepage</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href='about.html'>About Gotto</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href='#' id='navbarLightDropdownMenuLink' role='button' data-bs-toggle='dropdown' aria-expanded='false'>Pages</a>
                            <ul className="dropdown-menu dropdown-menu-light" aria-labelledby='navbarLightDropdownMenuLink'>
                                <li><a className="dropdown-item" href='job-listings.html'>Job Listings</a></li>
                                <li><a className="dropdown-item" href='job-details.html'>Job Details</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href='contact.html'>Contact</a>
                        </li>
                        <li className="nav-item ms-lg-auto">
                            <a className="nav-link" href='#'>Register</a>
                        </li>
                        <li className="nav-item">
                            <a className={classNames('nav-link', styles['custom-btn'], 'btn')} href='#'>Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
