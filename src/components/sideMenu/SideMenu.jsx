import React, { useContext } from 'react';
import classes from './SideMenu.module.css';

import TopTabsNavUsers from '../topTabsNav/TopTabsNavUsers';
import ProfileCard from '../profile/ProfileCard';
import OrderCard from '../orderCard/OrderCard';
import sampleOrder from '../orderCard/sampleOrder.json'
import OrderPage from '../../pages/orderPage/OrderPage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends ,
          faUser,
          faClipboardList,
          faPlus
        } 
 from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/AuthContext';

const SideMenu = () => {

  const { roles } = useContext(AuthContext);


  return (
   <div className={classes.flex_container}>
    <div className={classes.sideMenuContainer}>
      <div className={`nav flex-column nav-pills me-3 ${classes.navPills}`} id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button className={`nav-link active ${classes.navLink}`} id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
          <FontAwesomeIcon icon={faPlus} className={classes.icon}/> Създай Поръчки
        </button>
        <button className={`nav-link ${classes.navLink}`} id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">
          <FontAwesomeIcon icon={faClipboardList} className={classes.icon} />Поръчки
        </button>
        <button className={`nav-link ${classes.navLink}`} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">
          <FontAwesomeIcon icon={faUser} className={classes.icon} /> Профил
        </button>
        {roles.includes('SUPERADMIN')  && (
            <button className={`nav-link ${classes.navLink}`} id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">
              <FontAwesomeIcon icon={faUserFriends} className={classes.icon} /> Акаунти
            </button>
          )}
      </div>
      <div className={`tab-content ${classes.tabContent}`} id="v-pills-tabContent">
        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0">Home content...</div>
        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="0"><OrderPage/></div>
        <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabIndex="0"><ProfileCard/></div>
        {roles.includes('SUPERADMIN')  && (
            <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabIndex="0"><TopTabsNavUsers/></div>
          )}
      </div>
    </div>
</div>
  );
}

export default SideMenu;
