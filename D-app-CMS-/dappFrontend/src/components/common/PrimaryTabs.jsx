
import React, { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";

const PrimaryTabs = ({ tabs, active, setActiveTab, setTemp }) => {
  console.log(active, "activeTab");
  return (
    <>
      <ul className="primary-tabs">
        {tabs.map((tab,i) => {
          return (
            <>
              <li
                className={
                  tab.name === active.name
                    ? `primary-tab active`
                    : `primary-tab`
                }
                onClick={() =>{ setActiveTab(tab); setTemp(i); console.log(i)}}
              >
                <div className="flex-list small">
                  {tab.icon && tab.icon}
                  {tab.icon ? tab.name == active.name && tab.name : tab.name}
                </div>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default PrimaryTabs;

