import React from 'react'
import './HomePage.module.css';


import SideMenu from '../../components/sideMenu/SideMenu';
// import {Header} from "antd/es/layout/layout";
import Header from '../../components/Header/Header'


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