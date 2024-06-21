import React from 'react';
import classes from './SideMenu.module.css';

const SideMenu = () => {
  return (
   <div className={classes.flex_container}>
    <div className={classes.sideMenuContainer}>
      <div className={`nav flex-column nav-pills me-3 ${classes.navPills}`} id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button className={`nav-link active ${classes.navLink}`} id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Създай Поръчки</button>
        <button className={`nav-link ${classes.navLink}`} id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Моите Поръчки</button>
        <button className={`nav-link ${classes.navLink}`} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Профил</button>
        <button className={`nav-link ${classes.navLink}`} id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Създай Нов Акаунт</button>
      </div>
      <div className={`tab-content ${classes.tabContent}`} id="v-pills-tabContent">
        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0">Home content...</div>
        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
            optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
            nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
            minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
        </div>
        <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabIndex="0">Messages content...</div>
        <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabIndex="0">Settings content...</div>
      </div>
    </div>
</div>
  );
}

export default SideMenu;
