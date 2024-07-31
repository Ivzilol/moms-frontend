import React from 'react'
import './HomePage.module.css';


import SideMenu from '../../components/sideMenu/SideMenu';
import Header from '../../components/Header/Header'


const HomePage = () => {
  return (
    <div>
      <Header/>
      <div className="side-menu">
        <SideMenu />
      </div>
    </div>
  );
};

export default HomePage