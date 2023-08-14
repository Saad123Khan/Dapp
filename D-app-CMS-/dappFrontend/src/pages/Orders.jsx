import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link } from "react-router-dom";

const Orders = ({ setSidebarOpen }) => {
    const [inpValue, setInputValue] = useState(false);
  
    useEffect(() => {
      window.scrollTo(0, 0);
      setSidebarOpen(false);
    }, []);
  
    const getInputValue = (e) => {
      if (e.target.value != "") {
        setInputValue(true);
      } else {
        setInputValue(false);
      }
    };
  
    return (
      <>
        <div className="recharge">
          <div className="header">
            <Link to={"/account"} className="back-link">
              <img
                src="/assets/icons/back_icon.svg"
                alt=""
                className="back-img"
              />
            </Link>
            <span> My contract </span>
            <Link >
              <img 
                style={{opacity: '0'}}
                src="/assets/icons/record_recharge.svg"
                alt=""
                className="goto-record"
              />
            </Link>
          </div>
          <div className="switch_tabs-records">
            <Tabs
              defaultActiveKey="wait"
              id="uncontrolled-tab-example"
              className=""
            >
              <Tab eventKey="wait" title="wait">
                <div className="main_content">
                  <div className="title">
                    <span className="left_icon"></span>
                    <span>Deposit funds</span>
                  </div>
                  <div className="qr_code">
                    <img
                      src="/assets/images/bar_code.jpg"
                      alt=""
                      width={"386px"}
                    />
                    <p> 0xd9794E3a8a6F8……83a1aDe9624E711 </p>
                    <div className="copy">
                      <span>Copy address</span>
                    </div>
                  </div>
                </div>
                <div className="tips">
                  <h4 className="tips_title "> Do you know? </h4>
                  <div className="tips_content">
                    <p>
                      Please do not send other types of assets to the above
                      address. This action may result in the loss of your assets.
                      After the transmission is successful, the network node needs
                      to confirm the receipt of the corresponding asset. After the
                      transfer is successful, please contact the online customer
                      service for confirmation
                    </p>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="finished" title="finished">
                <div>
                  <div className="main_content">
                    <div className="title">
                      <span className="left_icon"></span>
                      <span>Withdrawal</span>
                    </div>
                    <div className="input_content">
                      <div className="address">
                        <input
                          type="text"
                          className="address_input"
                          placeholder="Receiving address"
                        />
                      </div>
                      <div className="address">
                        <img
                          src="/assets/images/ethw.png"
                          width={"32px"}
                          alt=""
                          className="coin_icon"
                        />
                        <input
                          type="text"
                          className="amount_input"
                          placeholder="Amount"
                          onChange={getInputValue}
                        />
                        <span
                          className={`coin_sympol ${inpValue ? "active" : ""}`}
                        >
                          ETHW
                        </span>
                      </div>
                      <div className="send_action">Send now</div>
                      <div className="send_tips">
                        <p>
                          Please check if your receiving address is correct before
                          sending to avoid loss of assets.
                        </p>
                        <p>Withdrawal fee is 2%</p>
                      </div>
                    </div>
                  </div>
                  <div className="tips">
                    <div className="tips_content">
                      <p style={{ textAlign: "center" }}>
                        {" "}
                        Please do not transfer funds to strangers{" "}
                      </p>
                    </div>
                  </div>
                  <div className="authentication">
                    <div className="authentication_content">
                      <div className="info">
                        <img
                          src="/assets/icons/icon_clock.svg"
                          width={"58px"}
                          alt=""
                          className="icon"
                        />
                        <span style={{fontSize:".3rem"}}>2FA two-factor authentication</span>
                      </div>
                      <span className="go_btn">GO</span>
                    </div>
                  </div>
                </div>
              </Tab>
              
            </Tabs>
          </div>
        </div>
      </>
    );
  };

export default Orders