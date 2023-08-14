import React from "react";
import { Container } from "react-bootstrap";

const Header = ({ setSidebarOpen }) => {
  return (
    <>
      {/* <header className="main-header">
        
          <img
           onClick={() => {
            setSidebarOpen(true);
          }}
            src="/assets/icons/hamburger.svg"
            alt=""
            className="hamburger-icon"
          />
            <img src="/assets/images/main-img.png" className="main-img" alt="" />
     
        <div>
          <p className="main-title">Coinrule-web3</p>
          <p className="main-subtitle muted-lg">Start making money plan</p>
        </div>
       </header> */}
       <div className="top_container" >
        <div className="home_top">
          <img
           onClick={() => {
            setSidebarOpen(true);
          }}
          src="/assets/icons/hamburger.svg" className="menu_icon"/>
            <img src="/assets/images/main-img.png" className="top_img"/>
              <div className="top_title ff_InterSemiBold"> Coinrule-web3 </div>
              <div className="top_subtitle ff_InterSemiBold"> Start making money plan </div>
              </div>
              </div>
    </>
  );
};

export default Header;
