import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Header.module.css';
import { useUser } from "../../userProvider/UserProvider";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header() {

    const navigate = useNavigate();
    const user = useUser();
    const [roles, setRoles] = useState(getRolesFromJWT());

    useEffect(() => {
        setRoles(getRolesFromJWT())
    }, [user.jwt])

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodeJwt = jwtDecode(user.jwt);
            return decodeJwt.roles.split(",");
        }
        return [];
    }

    const adminRole = ['USER', 'ADMIN'].every(role => roles.includes(role));

    function logout() {
        localStorage.setItem('userData', null);
        user.setJwt(null);
        navigate('/login');
    }

    function navigateToCreateSite() {
        navigate('/create-construction-site');
    }

    function navigateToCreateInventory() {
        navigate('/create-inventory');
    }

    return (
        <nav className={classNames(styles.navbar, 'navbar-expand-lg')}>
            <div className="container d-flex justify-content-between align-items-center">
                {/* Burger Menu for mobile */}
                <button className={styles['navbar-toggler']} type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <FontAwesomeIcon icon={faBars} size="lg" />
                </button>

                {/* Logo */}
                <a className={classNames('d-flex', 'align-items-center', 'mx-auto', styles['navbar-brand'])} href='/'>
                    <FontAwesomeIcon 
                        icon={faBuilding} 
                        className={classNames(styles['logo-icon'], 'me-2')} 
                        size="2x" 
                        alt='Building Icon' 
                    />
                    <div className="d-flex flex-column">
                        <strong className={styles['logo-text']}>Supply</strong>
                        <strong className={styles['logo-slogan']}>Manager</strong>
                    </div>
                </a>

                {/* Collapse Menu */}
                <div className={classNames('collapse', 'navbar-collapse')} id='navbarNav'>
                    <ul className={classNames('navbar-nav', 'ms-auto', 'd-flex', 'align-items-center')}>
                        {adminRole &&
                            <li className={classNames('nav-item', 'me-3', styles.create_btn)}>
                                <a
                                    className={classNames('nav-link', 'btn')}
                                    href='#'
                                    onClick={navigateToCreateInventory}
                                >
                                    Създай Инвентар
                                </a>
                            </li>
                        }
                        {adminRole &&
                            <li className={classNames('nav-item', 'me-3', styles.create_btn)}>
                                <a
                                    className={classNames('nav-link', 'btn')}
                                    href='#'
                                    onClick={navigateToCreateSite}
                                >
                                    Създай Обект
                                </a>
                            </li>    
                        }
                        <li className={classNames('nav-item', 'ms-3')}>
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
