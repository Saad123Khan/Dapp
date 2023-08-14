import React, { useContext, useState } from "react";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { Store } from "../../context/Store";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  setTab,
  handleSettingShow,
}) => {
  const { Approve, allowance, currentAccount } = useContext(Store);

  const TABS = [
    {
      name: "Account",
      icon: "/assets/icons/wallet.svg",
      link: "/account",
    },
    {
      name: "Arbitrage",
      icon: "/assets/icons/arbitrage.svg",
      link: "/arbitrage",
    },
    {
      name: "Mining",
      icon: "/assets/icons/mining.svg",
      link: "/mining",
    },
    {
      name: "Record",
      icon: "/assets/icons/record.svg",
      link: "/miningRecord",
    },
    {
      name: "Share",
      icon: "/assets/icons/share.svg",
      // link: `/share/${currentAccount}`,
      link: `/share/${"0x" + currentAccount.slice(-4)}`,
    },
    {
      name: "Chat",
      icon: "/assets/icons/chat.svg",
      link: "/",
    },
    {
      name: "Q&A",
      icon: "/assets/icons/qa.svg",
      link: "/qa",
    },
    {
      name: "Set up",
      icon: "/assets/icons/setup.svg",
      link: "/",
    },
  ];

  const handleTab = (tab, index) => {
    if (index == 7) {
      handleSettingShow();
      setTab("");
      return setSidebarOpen(false);
    }
    setTab(tab);
  };
  return (
    <>
      <div className={`sidebar-overlay ${sidebarOpen && "open"}`}></div>
      <nav className={`sidebar ${sidebarOpen && "open"}`}>
        <div className="sidebar-close">
          <button
            onClick={() => {
              setSidebarOpen(false);
            }}
          >
            <GrClose/>
          </button>
        </div>
        <div className="sidebar-logo-content">
          <img src="/assets/icons/text_logo.png" alt="" />
        </div>
        <div>
          {allowance > 0 ? (
            <></>
          ) : (
            // <div className="center-x pt-0">
            //   <button onClick={() => Approve()} className="primary-button" >
            //     <div className="justify-center items-center" style={{fontSize:'0.26rem'}}>
            //       <img
            //         src="https://coinrule-web3.space/static/img/icon_join.1b4e4267.svg"
            //         className="sidebar-icon"
            //         alt=""
            //       />
            //       JOIN IN{" "}
            //     </div>{" "}
            //   </button>
            // </div>
            <div className='join_content'>
                <div className="join_btn">
                 <img
                    src="https://coinrule-web3.space/static/img/icon_join.1b4e4267.svg"
                    className="icon_join"
                    alt=""
                  />
                  <span style={{fontSize:'0.26rem'}}> JOIN IN{" "}</span>
                 
</div>
            </div>
          )}
        </div>
        <div className="sidebar-menu-content">
          <p className="sidebar-title">FUNCTION</p>
          <ul>
            {TABS.map((tab, index) => {
              return (
                <>
                  <Link key={index} to={tab.link}>
                    <li
                      className="sidebar-item"
                      onClick={() => {
                        handleTab(tab, index);
                      }}
                    >
                      <div className="flex-list">
                        <img src={tab.icon} className="sidebar-icon" alt="" />
                        <p>{tab.name}</p>
                      </div>
                    </li>
                  </Link>
                </>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
