import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link } from "react-router-dom";
import { PrimaryTabs } from "../components/common";

const Recharge = ({ setSidebarOpen }) => {
  const [inpValue, setInputValue] = useState(false);

  const [activeList, setActiveList] = useState(false);
  const [qrCode, setQrcode] = useState("");
  const [qrCode1, setQrcode1] = useState("");
  const [qrCode2, setQrcode2] = useState("");
  const [link, setLink] = useState("");
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [name, setName] = useState(searchParams.get("name"));
  const [coinName, setCoinName] = useState(searchParams.get("coinname"));
  const [icon, setIcon] = useState(searchParams.get("icon"));
  const [swap, setSwap] = useState(searchParams.get("swap"));
  const [showDiv, setShowDiv] = useState(false);
  const [hasScrolledToTop, setHasScrolledToTop] = useState(false);

  const [swapCoin, setSwapCoin] = useState({ name: swap, icon:  `/assets/images/usdcoin.png`});
  // const name = searchParams.get('name');
  // const icon = searchParams.get('icon');
  console.log(id);
  console.log(name);
  console.log(coinName);
  console.log(icon);

useEffect(()=>{
  if(swap === "USDC")
  {
  setSwapCoin({ name: swap, icon:`/assets/images/usdcoin.png`})
}
else if(swap === "ETHW"){
  setSwapCoin({ name: swap, icon:`/assets/images/ethw.png`})
}
},[])

  useEffect(() => {
    // window.scrollTo(0, 0);
    setSidebarOpen(false);

    if (id === "usdc-coin" || id === "eth-coin") {
      setQrcode("/assets/images/qr.jpg");
      setLink("0x38287FF86d1Ced1C45bB302f2693C891E35AD8EC");
    } else if (id === "usdt-coin") {
      setQrcode("/assets/images/qr.jpg");
      setLink("0x38287FF86d1Ced1C45bB302f2693C891E35AD8EC");
      setQrcode1("/assets/images/qr.jpg");
      setLink1("0x3A6pRCWeiFvzgNKnFot99U8n5WSuag2hh6");
      setQrcode2("/assets/images/qr.jpg");
      setLink2("0xTZJ3dBWqtqa7zbXQsK64atZMgLTTv5PcC9");
    } else if (id === "btc-coin") {
      setQrcode("/assets/images/qr.jpg");
      setLink("0x3A6pRCWeiFvzgNKnFot99U8n5WSuag2hh6");
    } else {
      setQrcode("/assets/images/qr.jpg");
      setLink("0x3A6pRCWeiFvzgNKnFot99U8n5WSuag2hh6");
    }

    if (showDiv) {
      const timer = setTimeout(() => {
        setShowDiv(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    const handleHashChange = () => {
      if (window.location.hash === "") {
        const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
        if (!hasVisitedBefore || !hasScrolledToTop) {
          window.scrollTo(0, 0);
          setHasScrolledToTop(true);
          localStorage.setItem("hasVisitedBefore", true);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [showDiv, hasScrolledToTop]);

  const getInputValue = (e) => {
    if (e.target.value != "") {
      setInputValue(true);
    } else {
      setInputValue(false);
    }
  };

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    setShowDiv(true);
  };

  const swapCoinHandler = (name, icon) => {
    setSwapCoin({ name: name, icon: icon });
    setActiveList(false);
  };
  const TABS = [
    {
      name: "ERC20",
      icon: "",
    },
    {
      name: "OMNI",
      icon: "",
    },
    {
      name: "TRC20",
      icon: "",
    },
  ];

  const [temp, setTemp] = useState(0);
  const [activeTab, setActiveTab] = useState(TABS[temp]);

  return (
    <>
      <div className="recharge" style={{ position: "relative" }}>
        {showDiv && (
          <div className={`transition-div ${showDiv ? "show" : ""}`}>
            <p>Copy successfully</p>
          </div>
        )}
        <div className="header">
          <Link to={"/account"}>
            <img
              src="/assets/icons/back_icon.svg"
              alt=""
              className="back-img"
            />
          </Link>
          <span> {name} </span>
          <Link to={"/record"}>
            <img
              src="/assets/icons/record_recharge.svg"
              alt=""
              className="goto-record"
            />
          </Link>
        </div>
        <div className="amount">
          <h1> US$ 0.0000 </h1>
          <div className="coin">
            <img src={`/assets/images/${icon}.png`} width={"32px"} alt="" />
            <span>0.00 {coinName}</span>
          </div>
        </div>
        <div className="switch_tabs">
          <Tabs
            defaultActiveKey="Receive"
            id="uncontrolled-tab-example"
            className=""
          >
            <Tab eventKey="Receive" title="Receive">
              <div className="main_content">
                <div className="title">
                  <span className="left_icon"></span>
                  <span>Deposit funds</span>
                </div>
                {icon === "tether" ? (
                  <>
                    <div className="exchange-tabs">
                      <PrimaryTabs
                        tabs={TABS}
                        setTemp={setTemp}
                        active={activeTab}
                        setActiveTab={setActiveTab}
                      />
                    </div>
                    <>
                      {temp === 0 ? (
                        <div className="qr_code">
                          <img src={qrCode} alt="" width={"386px"} />
                          <p> {link}</p>
                          <div
                            className="copy"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              copyToClipboard(link);
                            }}
                          >
                            <span>Copy address</span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {temp === 1 && (
                        <div className="qr_code">
                          <img src={qrCode1} alt="" width={"386px"} />
                          <p> {link1}</p>
                          <div
                            className="copy"
                            onClick={() => {
                              copyToClipboard(link1);
                            }}
                          >
                            <span>Copy address</span>
                          </div>
                        </div>
                      )}
                      {temp === 2 ? (
                        <div className="qr_code">
                          <img src={qrCode2} alt="" width={"386px"} />
                          <p> {link2}</p>
                          <div
                            className="copy"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              copyToClipboard(link2);
                            }}
                          >
                            <span>Copy address</span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  </>
                ) : (
                  <>
                    {icon === "bitcoin" ? (
                      <div className="qr_code">
                        <img src={qrCode} alt="" width={"386px"} />
                        <p> {link}</p>
                        <div
                          className="copy"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            copyToClipboard(link);
                          }}
                        >
                          <span>Copy address</span>
                        </div>
                      </div>
                    ) : (
                      <div className="qr_code">
                        <img src={qrCode} alt="" width={"386px"} />
                        <p> {link}</p>
                        <div
                          className="copy"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            copyToClipboard(link);
                          }}
                        >
                          <span>Copy address</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
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
            <Tab eventKey="Sand" title="Send">
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
                        src={`/assets/images/${icon}.png`}
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
                        {coinName}
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
                      <span style={{ fontSize: ".3rem" }}>
                        2FA two-factor authentication
                      </span>
                    </div>
                    <span className="go_btn">GO</span>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="Swap_usdt " title={`Swap usdt`}>
              <div className="main_content">
                <div className="title">
                  <span className="left_icon"></span>
                  <span>Swap usdt</span>
                </div>
                <div className="input_content">
                  <div className="address">
                    <img
                      src={`/assets/images/${icon}.png`}
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
                    <span className={`coin_sympol ${inpValue ? "active" : ""}`}>
                      {coinName}
                    </span>
                  </div>
                  <div className="img_swap_content">
                    <img
                      src="/assets/icons/icon_swap.svg"
                      alt=""
                      className="icon_swap"
                    />
                  </div>
                  <div className="address swap">
                    <img
                      src={swapCoin?.icon}
                      alt=""
                      className="coin_icon"
                    />
                    <input
                      type="text"
                      className="amount_input"
                      placeholder="Amount"
                      onClick={() => setActiveList(!activeList)}
                    />
                    <span className="coin_sympol">{swapCoin.name}</span>
                    {activeList && (
                      <div className="swap_list_container">
                        {coinName !== "ETHW" && (
                          <div
                            className="swap_list_item"
                            onClick={() =>
                              swapCoinHandler("ETHW", "/assets/images/ethw.png")
                            }
                          >
                            <img
                              src="/assets/images/ethw.png"
                              width={"32px"}
                              alt=""
                              className="swap_coin_icon"
                            />
                            <span>ETHW</span>
                          </div>
                        )}
                        {coinName !== "USDC" && (
                          <div
                            className="swap_list_item"
                            onClick={() =>
                              swapCoinHandler(
                                "USDC",
                                "/assets/images/usdcoin.png"
                              )
                            }
                          >
                            <img
                              src="/assets/images/usdcoin.png"
                              width={"32px"}
                              alt=""
                              className="swap_coin_icon"
                            />
                            <span>USDC</span>
                          </div>
                        )}
                        {coinName !== "USDT" && (
                          <div
                            className="swap_list_item"
                            onClick={() =>
                              swapCoinHandler(
                                "USDT",
                                "/assets/images/tether.png"
                              )
                            }
                          >
                            <img
                              src="/assets/images/tether.png"
                              width={"32px"}
                              alt=""
                              className="swap_coin_icon"
                            />
                            <span>USDT</span>
                          </div>
                        )}
                        {coinName !== "BTC" && (
                          <div
                            className="swap_list_item"
                            onClick={() =>
                              swapCoinHandler(
                                "BTC",
                                "/assets/images/bitcoin.png"
                              )
                            }
                          >
                            <img
                              src="/assets/images/bitcoin.png"
                              width={"32px"}
                              alt=""
                              className="swap_coin_icon"
                            />
                            <span>BTC</span>
                          </div>
                        )}
                        {coinName !== "ETH" && (
                          <div
                            className="swap_list_item"
                            onClick={() =>
                              swapCoinHandler("ETH", "/assets/images/ethw.png")
                            }
                          >
                            <img
                              src="/assets/images/ethw.png"
                              width={"32px"}
                              alt=""
                              className="swap_coin_icon"
                            />
                            <span>ETH</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="send_action">Swap now</div>
                  <div className="send_tips">
                    <p>The exchange fee is 2%</p>
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
                    <span style={{ fontSize: ".3rem" }}>
                      2FA two-factor authentication
                    </span>
                  </div>
                  <span className="go_btn">GO</span>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Recharge;
