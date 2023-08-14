import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link, useLocation } from "react-router-dom";
import { Store } from "../context/Store";
import { Col, Row } from "react-bootstrap";
import ProgressLoader from "../components/Progress";
import axios from "axios";

const formatDate = (date) => {
  // console.log(data);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const formattedDate = date.toLocaleString("en-US", options);
  // console.log(data);
  return formattedDate.replace(/\//g, "-").replace(/,/g, "");
};

const Orders = ({ setSidebarOpen }) => {
  const { currentAccount, detailsForEntrustMachine, entrustMachine } =
    useContext(Store);


    useEffect(() => {
      detailsForEntrustMachine();
    }, []);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Hosting");
  const searchParams = new URLSearchParams(location.search);
  const activeParam = searchParams.get("active");

  console.log(activeTab, "activeTab123");
  console.log(activeParam, "activeParam");
  console.log(entrustMachine, "entrustMachine");
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
      <div data-dismiss= {"modal"}  className="recharge">
        <div data-dismiss= {"modal"} className="header">
          <Link to={"/"}>
            <img
              src="/assets/icons/back_icon.svg"
              alt=""
              className="back-img"
            />
          </Link>
          <span> Records </span>
          <Link style={{ opacity: "0" }}>
            <img
              src="/assets/icons/record_recharge.svg"
              alt=""
              className="goto-record"
            />
          </Link>
        </div>

        <div className="switch_tabs">
          <div className="nav-tabs">
            <div className="nav-item">
              <button
                className={activeTab == "Hosting" ? "active" : ""}
                onClick={() => setActiveTab("Hosting")}
              >
                Hosting
              </button>
            </div>
            <div className="nav-item">
              <button
                className={activeTab == "Finish" ? "active" : ""}
                onClick={() => setActiveTab("Finish")}
              >
                Finish
              </button>
            </div>
          </div>
        </div>
        {activeTab == "Hosting" && (
          <div className="tab-pane">
            {entrustMachine?.length >= 1 ? (
              entrustMachine?.filter((item) => {
                return item[0]?.enTrust == true;
              }).length > 0 ? (
                entrustMachine
                  ?.reverse()
                  ?.filter((item) => {
                    return item[0]?.enTrust === true;
                  })
                  .map((machine) => {
                    // const todayDate = new Date();
                    // const orderDate = new Date(machine[0].dateOfOrder);
                    // const daysSinceOrder = getDaysBetweenDates(
                    //   orderDate,
                    //   todayDate
                    // );

                    return (
                      <>
                        <article
                          className="arbitrage-product"
                          style={{ marginTop: "20px" }}
                        >
                          {/* <header className="header show-in-desktop">
                            <div style={{ textAlign: "start" }}>
                              <span >
                                {machine[0].name} Contract
                              </span>
                              <p
                                className="tradeDate"
                              // style={{
                              //   fontSize: "22px",
                              //   color: "#333",
                              // }}
                              >
                                {formatDate(new Date(machine[0].dateOfOrder))}
                              </p>
                            </div>
                            <span className="green-badge">Hosting</span>
                            <div className="time_info">
                              <div className="time">
                                <img
                                  src="/assets/icons/time.svg"
                                  alt=""
                                  width={"28px"}
                                  className="icon_time tradeTime"
                                />
                                <span className="fs-20">
                                  {machine[0].LeaseCycle.slice(0, 3)}S
                                </span>
                              </div>
                            </div>
                          </header> */}

                          <header className="header">
                            <div style={{ textAlign: "start" }}>
                              <span className="contract-two">
                                {machine[0].name}Contract
                              </span>
                              <p
                                className="tradeDate"
                                // style={{
                                //   fontSize: "22px",
                                //   color: "#333",
                                // }}
                              >
                                {formatDate(new Date(machine[0].dateOfOrder))}
                              </p>
                            </div>
                            <p
                              className={`item-title muted-xs ${
                                machine[0].result == "Loss"
                                  ? "red-badge"
                                  : "green-badge"
                              }`}
                            >
                              Hosting
                            </p>

                            {/* <span className="red-badge">Terminated</span> */}
                            <div className="time_info">
                              <div className="time">
                                <img
                                  src="/assets/icons/time.svg"
                                  alt=""
                                  width={"28px"}
                                  className="icon_time tradeTime"
                                />
                                <span className="fs-20">
                                  {machine[0].LeaseCycle.slice(0, 3)}S
                                </span>
                              </div>
                            </div>
                          </header>
                          <main>
                            <Row>
                              <Col className="text-center col-4">
                                <p className="item-title muted-xs">
                                  {machine[0].amount} usdt
                                </p>
                                {/* <p className="item-title muted-sm">Amount</p> */}
                              </Col>
                              <Col className="text-center col-4">
                                <div className="d-flex justify-content-center range_info fs-32 ff_NunitoSemiBold">
                                  <img
                                    src={`/assets/icons/${
                                      machine[0].exchangeType === "Up"
                                        ? "green_up.svg"
                                        : "red-down.svg"
                                    }`}
                                    alt=""
                                    className="type_icon"
                                  />
                                  <p
                                    className={`item-title muted-sm ${
                                      machine[0].exchangeType === "Up"
                                        ? "color-profit"
                                        : "color-loss"
                                    }`}
                                  >
                                    {machine[0].exchangeType === "Up"
                                      ? "up"
                                      : "down"}
                                  </p>
                                </div>

                                {/* <p className="item-title muted-sm">Amount</p> */}
                              </Col>
                              <Col className="text-center col-4">
                                {/* <p className="item-title muted-xs">
                                    {machine[0].LeaseCycle}
                                  </p>
                                  <p className="item-title muted-sm">Time</p> */}
                              </Col>
                            </Row>
                          </main>
                          <main>
                            <div className="tradeOpenDel">
                              <div className="d-flex ">
                                <div className="grey-color">Open:</div>
                                <div className="">
                                  {parseFloat(machine[0].open).toFixed(2)}
                                </div>
                              </div>

                              <div className="d-flex grey-color">
                                Delivery:{" "}
                                <div className="color-blue">0.0000</div>
                              </div>
                            </div>
                            <ProgressLoader
                              index={machine[0].key}
                              setActiveTab={setActiveTab}
                              currentAccount={currentAccount}
                              machineData={machine[0]}
                              detailsForEntrustMachine={
                                detailsForEntrustMachine
                              }
                            />
                          </main>
                          <footer>
                            <div className="flex-space">
                              <div>
                                {/* <p className="item-title pb-1 muted-xs">
                                      Total :{" "}
                                      {daysSinceOrder *
                                        (machine[0].output.split("-")[0] *
                                          machine[0].quantity)}
                                    </p> */}
                              </div>
                              <div className="flex-list"></div>
                              <div>
                                {/* <p className="item-title pb-1 muted-xs">
                                      Ydays :{" "}
                                      {daysSinceOrder >= 1
                                        ? machine[0].output.split("-")[0] *
                                          machine[0].quantity
                                        : 0}
                                    </p> */}
                              </div>
                            </div>
                          </footer>
                        </article>
                      </>
                    );
                  })
              ) : (
                <div className="center-item py-1">
                  <img
                    src="/assets/images/no_data.png"
                    className="img-no-data"
                    alt=""
                  />
                  <p className="main-subtitle dark muted-xl">No Data</p>
                </div>
              )
            ) : (
              <div className="center-item py-1">
                <img
                  src="/assets/images/no_data.png"
                  className="img-no-data"
                  alt=""
                />
                <p className="main-subtitle dark muted-xl">No Data</p>
              </div>
            )}
          </div>
        )}
        {activeTab == "Finish" && (
          <div className="tab-pane">
            {entrustMachine?.length >= 1 ? (
              entrustMachine?.filter((item) => {
                return item[0]?.enTrust == false;
              }).length > 0 ? (
                entrustMachine
                  ?.reverse()
                  ?.filter((item) => {
                    return item[0]?.enTrust === false;
                  })
                  .map((machine) => {
                    // const todayDate = new Date();
                    // const orderDate = new Date(machine[0].dateOfOrder);
                    // const daysSinceOrder = getDaysBetweenDates(
                    //   orderDate,
                    //   todayDate
                    // );
                    return (
                      <>
                        <article
                          className="arbitrage-product"
                          style={{ marginTop: "20px" }}
                        >
                          <header className="header">
                            <div style={{ textAlign: "start" }}>
                              <span className="contract-two">
                                {machine[0].name}Contract
                              </span>
                              <p
                                className="tradeDate"
                                // style={{
                                //   fontSize: "22px",
                                //   color: "#333",
                                // }}
                              >
                                {formatDate(new Date(machine[0].dateOfOrder))}
                              </p>
                            </div>

                            {/* <span className="red-badge">Terminated</span> */}
                            <div className="time_info">
                              <div className="time">
                                <img
                                  src="/assets/icons/time.svg"
                                  alt=""
                                  width={"28px"}
                                  className="icon_time tradeTime"
                                />
                                <span className="fs-20">
                                  {machine[0].LeaseCycle.slice(0, 3)}S
                                </span>
                              </div>
                            </div>
                            <p
                              className={`item-title muted-xs ${
                                machine[0].result == "Loss"
                                  ? "red-badge"
                                  : "green-badge"
                              }`}
                            >
                              {machine[0].result}
                            </p>
                          </header>
                          <main>
                            <Row>
                              <Col className="text-center col-4">
                                <p className="item-title muted-xs">
                                  {machine[0].amount} usdt
                                </p>
                                {/* <p className="item-title muted-sm">Amount</p> */}
                              </Col>
                              <Col className="text-center col-4">
                                <div className="d-flex justify-content-center range_info fs-32 ff_NunitoSemiBold">
                                  <img
                                    src={`/assets/icons/${
                                      machine[0].exchangeType === "Up"
                                        ? "green_up.svg"
                                        : "red-down.svg"
                                    }`}
                                    alt=""
                                    className="type_icon"
                                  />
                                  <p
                                    className={`item-title muted-sm ${
                                      machine[0].exchangeType === "Up"
                                        ? "color-profit"
                                        : "color-loss"
                                    }`}
                                  >
                                    {machine[0].exchangeType === "Up"
                                      ? "up"
                                      : "down"}
                                  </p>
                                </div>

                                {/* <p className="item-title muted-sm">Amount</p> */}
                              </Col>
                              <Col className="text-center col-4">
                                <p
                                  className={`item-title muted-xs ${
                                    machine[0].result == "Loss"
                                      ? "color-loss"
                                      : "color-profit"
                                  }`}
                                >
                                  {machine[0].result == "Loss"
                                    ? "-" + machine[0]?.amount
                                    : "+" + machine[0]?.expected}
                                </p>
                              </Col>
                            </Row>
                          </main>
                          <main className="trade-second-main">
                            <div className="tradeOpenDel">
                              <div className="d-flex ">
                                <div className="grey-color">Open:</div>
                                <div className="">
                                  {parseFloat(machine[0].open).toFixed(2)}
                                </div>
                              </div>{" "}
                              <div className="d-flex grey-color ">
                                Delivery:
                                <div className="color-blue">
                                  {parseFloat(machine[0].delivery).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </main>
                          <footer>
                            <div className="flex-space">
                              <div>
                                {/* <p className="item-title pb-1 muted-xs">
                                      Total :{" "}
                                      {daysSinceOrder *
                                        (machine[0].output.split("-")[0] *
                                          machine[0].quantity)}
                                    </p> */}
                              </div>
                              <div className="flex-list"></div>
                              <div>
                                {/* <p className="item-title pb-1 muted-xs">
                                      Ydays :{" "}
                                      {daysSinceOrder >= 1
                                        ? machine[0].output.split("-")[0] *
                                          machine[0].quantity
                                        : 0}
                                    </p> */}
                              </div>
                            </div>
                          </footer>
                        </article>
                      </>
                    );
                  })
              ) : (
                <div className="center-item py-1">
                  <img
                    src="/assets/images/no_data.png"
                    className="img-no-data"
                    alt=""
                  />
                  <p className="main-subtitle dark muted-xl">No Data</p>
                </div>
              )
            ) : (
              <div className="center-item py-1">
                <img
                  src="/assets/images/no_data.png"
                  className="img-no-data"
                  alt=""
                />
                <p className="main-subtitle dark muted-xl">No Data</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
