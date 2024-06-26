import React, { useState } from 'react';
import styles from './TopTabsNavUsers.module.css'; 

import UserList from '../userList/UserList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const TopTabsNav = () => {
  
  const [activeTab, setActiveTab] = useState('v-pills-home');

 
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className={styles.flex_container}>
      <nav className={`nav nav-pills flex-column ${styles.sideMenuContainer}`}>
        <a
            className={`nav-link ${styles.createAccountBtn} ${activeTab === 'v-pills-new' ? styles.active : ''}`}
            href="#"
            onClick={() => handleTabClick('v-pills-new')}
          >
            <FontAwesomeIcon icon={faPlus} className={styles.icon} /> Създай Акаунт
        </a>
        <a
          className={`nav-link ${styles.navLink} ${activeTab === 'v-pills-home' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('v-pills-home')}
        >
          Всички
        </a>
        <a
          className={`nav-link ${styles.navLink} ${activeTab === 'v-pills-profile' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('v-pills-profile')}
        >
          Активни
        </a>
        <a
          className={`nav-link ${styles.navLink} ${activeTab === 'v-pills-messages' ? styles.active : ''}`}
          href="#"
          onClick={() => handleTabClick('v-pills-messages')}
        >
          Съспенднати
        </a>
      </nav>
      <div className={`tab-content ${styles.tabContent}`} id="v-pills-tabContent">

        <div className={`tab-pane fade ${activeTab === 'v-pills-new' ? 'show active' : ''}`} id="v-pills-new" role="tabpanel" aria-labelledby="v-pills-home-tab">
          <h3>Нов Акаунт</h3>
          <p>Регистрационна Форма ...</p>
        </div>
        <div className={`tab-pane fade ${activeTab === 'v-pills-home' ? 'show active' : ''}`} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
          <h3>Всички</h3>
          <p><UserList/></p>
        </div>
        <div className={`tab-pane fade ${activeTab === 'v-pills-profile' ? 'show active' : ''}`} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
          <h3>Активни</h3>
          <p><UserList/></p>
        </div>
        <div className={`tab-pane fade ${activeTab === 'v-pills-messages' ? 'show active' : ''}`} id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
          <h3>Съспенднати</h3>
          <p><UserList/></p>
        </div>
      </div>
    </div>
  );
};

export default TopTabsNav;