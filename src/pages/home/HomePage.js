import React from 'react'
import './HomePage.module.css';
import Header from '../../components/Header/Header';


import SideMenu from '../../components/sideMenu/SideMenu';


const HomePage = () => {
  return (
    <div>
      <Header/>
      <div className="side-menu">
        <SideMenu />
      </div>
      {/* <div className="content">
        {/* Other content goes here */}
        {/* <p>This is the main content area.</p>
      </div> */} 
    </div>
  );
};

export default HomePage