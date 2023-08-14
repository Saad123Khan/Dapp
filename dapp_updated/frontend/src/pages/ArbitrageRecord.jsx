import React, { useEffect, useState, useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Store } from "../context/Store";
import { Col, Row } from "react-bootstrap";
import { arbitrageImages } from "../staticData";

const formatDate = (date) => {
  // console.log(data);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const formattedDate = date.toLocaleString('en-US', options);
  // console.log(data);
  return formattedDate.replace(/\//g, '-').replace(/,/g, '')
}

const ArbitrageRecord = ({ setSidebarOpen }) => {
  const date = new Date();
  // const formattedDate = formatDate(date);
  const { arbitrageHostedMachine, detailsForArbitrageMachine, currentAccount } =
    useContext(Store);
  console.log("🚀ArbitrageRecord", arbitrageHostedMachine);
  // console.log("🚀ArbitrageRecord", detailsForArbitrageMachine);
  // console.log("🚀ArbitrageRecord", currentAccount);

  // window.scrollTo(0, 0);

  function getDaysBetweenDates(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const diffDays = Math.round((endDate - startDate) / oneDay);
    return diffDays;
  }


  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  useEffect(() => {
    detailsForArbitrageMachine();
  }, [currentAccount]);

  return (
    <>
      <div className="news-page">
        <div className="news-header page-header">
          <div className="back-button-wrapper">
            <button className="back-button simple">
              <Link to="/arbitrage">
                <img src="/assets/icons/back.svg" alt="" />
              </Link>
            </button>
          </div>
          <div className="record-header-inner">
            <p className="section-name text-center">Hosting Detailed</p>
          </div>
        </div>
        <section className="section-common">
          <div className="center-x">
            <div className="switch_tabs-arbitrage">
              <Tabs
                defaultActiveKey="Hosting"
                id="uncontrolled-tab-example"
                className=""
              >
                <Tab eventKey="Hosting" title="Hosting">
                  {arbitrageHostedMachine.length >= 1 ? (
                    arbitrageHostedMachine.filter((item) => {
                      return item[0].machineTimeCompleted == true;
                    }).length > 0 ? (
                      arbitrageHostedMachine
                        .filter((item) => {
                          return item[0].machineTimeCompleted === true;
                        })
                        .map((machine, key) => {

                          const todayDate = new Date();
                          const orderDate = new Date(machine[0].dateOfOrder);
                          const daysSinceOrder = getDaysBetweenDates(
                            orderDate,
                            todayDate
                          );

                          return (
                            <>
                              <article
                                className="arbitrage-product"
                                style={{ marginTop: "20px" }}
                              >
                                <header className="header">
                                  <div>
                                    <span className="AI-Arbitrage">AI Arbitrage</span>
                                    <p className="">
                                      {
                                        formatDate(new Date(machine[0].dateOfOrder))
                                        // machine[0].dateOfOrder.slice(0, 24)
                                      }
                                    </p>
                                  </div>
                                  <span className="green-badge">Running</span>
                                </header>
                                <main>
                                  <Row>
                                    <Col className="text-center col-4">
                                      <p className="item-title muted-xs">{machine[0].earnings}</p>
                                      <p className="item-title muted-sm desc">
                                        Output
                                      </p>
                                    </Col>
                                    <Col className="text-center col-4">
                                      <p className="item-title muted-xs">{machine[0].amount}</p>
                                      <p className="item-title muted-sm desc">
                                        <span> Price</span>
                                        <span>
                                          <img src="/assets/images/tether.png" alt="" width="22px" style={{marginLeft: '10px'}} />
                                        </span>
                                      </p>
                                    </Col>
                                    <Col className="text-center col-4">
                                      <p className="item-title muted-xs">{machine[0].LeaseCycle.split(" ")[0]}</p>
                                      <p className="item-title muted-sm desc">Days</p>
                                    </Col>
                                  </Row>
                                </main>
                                <footer>
                                  <div className="flex-space">
                                    <div>
                                      <p className="item-title pb-1 muted-xs">
                                        Total : <span>{daysSinceOrder === 0 ? '0.00' : daysSinceOrder * machine[0].amount * (machine[0].earnings.split("-")[0] / 100)}</span>

                                      </p>
                                    </div>
                                    <div className="flex-list"></div>
                                    <div>
                                      <p className="item-title pb-1 muted-xs" >
                                       Ydays : <span style={{color : '#3a86ff'}}>{daysSinceOrder >= 1 ? machine[0].amount * (machine[0].earnings.split("-")[0] / 100) : '0.0000'}</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex-space coin-type">
                                    <div className="flex-list" style={{ gap: '10px' }}>
                                      <span>Coin Types :</span>
                                      {machine[0].type ?
                                        arbitrageImages[machine[0].type - 1].images.map((images) => {
                                          return <img src={images} className="img-icon" alt="" />
                                        })
                                        :
                                        <>
                                          <img src="/assets/images/bitcoin.png" alt="" width={'40px'} />
                                          <img src="/assets/images/ethw.png" alt="" width={'40px'} />
                                          <img src="/assets/images/tether.png" alt="" width={'40px'} />
                                          <img src="/assets/images/usdcoin.png" alt="" width={'40px'} />
                                        </>
                                      }

                                      {/* <img src="/assets/images/bitcoin.png" alt="" width={'40px'} />
                                      <img src="/assets/images/ethw.png" alt="" width={'40px'} />
                                      <img src="/assets/images/tether.png" alt="" width={'40px'} />
                                      <img src="/assets/images/usdcoin.png" alt="" width={'40px'} /> */}
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
                </Tab>
                <Tab eventKey="Termination" title="Termination">
                  {arbitrageHostedMachine.length >= 1 ? (
                    arbitrageHostedMachine.filter((item) => {
                      return item[0].machineTimeCompleted == false;
                    }).length > 0 ? (
                      arbitrageHostedMachine
                        .filter((item) => {
                          return item[0].machineTimeCompleted === false;
                        })
                        .map((machine, key) => {
                          const todayDate = new Date();
                          const orderDate = new Date(machine[0].dateOfOrder);
                          const daysSinceOrder = getDaysBetweenDates(
                            orderDate,
                            todayDate
                          );

                          return (
                            <>
                              <article
                                className="arbitrage-product"
                                style={{ marginTop: "20px" }}
                              >
                                <header className="header">
                                  <div>
                                  <span className="AI-Arbitrage">AI Arbitrage</span>
                                    <p className="">
                                    {
                                        formatDate(new Date(machine[0].dateOfOrder))
                                        // machine[0].dateOfOrder.slice(0, 24)
                                      }
                                    </p>
                                  </div>
                                  <span className="red-badge">Terminated</span>
                                </header>
                                <main>
                                  <Row>
                                    <Col className="text-center col-4">
                                      <p className="item-title muted-xs">{machine[0].earnings}</p>
                                      <p className="item-title muted-sm desc">
                                        Output
                                      </p>
                                    </Col>
                                    <Col className="text-center col-4">
                                      <p className="item-title muted-xs">{machine[0].amount}</p>
                                      <p className="item-title muted-sm desc">Price</p>
                                    </Col>
                                    <Col className="text-center col-4">
                                      <p className="item-title muted-xs">{machine[0].LeaseCycle.split(" ")[0]}</p>
                                      <p className="item-title muted-sm desc">Days</p>
                                    </Col>
                                  </Row>
                                </main>
                                <footer>
                                  <div className="flex-space">
                                    <div>
                                      <p className="item-title pb-1 muted-xs">
                                        Total:
                                        <span>
                                          {daysSinceOrder * machine[0].amount * (machine[0].earnings.split("-")[0] / 100)}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex-list"></div>
                                    <div>
                                      <p className="item-title pb-1 muted-xs" >
                                       Ydays : <span style={{color : '#3a86ff'}}>{daysSinceOrder >= 1 ? machine[0].amount * (machine[0].earnings.split("-")[0] / 100) : '0.0000'}</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex-space coin-type">
                                    <div className="flex-list" style={{ gap: '10px' }}>
                                      <span>Coin Types :</span>
                                      {machine[0].type ?
                                        arbitrageImages[machine[0].type - 1].images.map((images) => {
                                          return <img src={images} className="img-icon" alt="" />
                                        })
                                        :
                                        <>
                                          <img src="/assets/images/bitcoin.png" alt="" width={'40px'} />
                                          <img src="/assets/images/ethw.png" alt="" width={'40px'} />
                                          <img src="/assets/images/tether.png" alt="" width={'40px'} />
                                          <img src="/assets/images/usdcoin.png" alt="" width={'40px'} />
                                        </>
                                      }
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
                </Tab>
              </Tabs>
            </div>
          </div>
        </section>
      </div>
      {/* <div className="container">
        <div className="row">
          <article
            className="arbitrage-product"
            style={{ marginTop: "20px" }}
          >
            <header className="header">
              <div>
                <span className="" style={{ fontWeight: '600' }}>AI Arbitrage</span>
                <p className="" style={{ color: '#353f52', opacity: '0.6', fontWeight: '500' }}>{formattedDate}</p>
              </div>
              <span className="green-badge">Running</span>
            </header>
            <main>
              <Row>
                <Col className="text-center col-4">
                  <p className="item-title muted-xs">10.20-1.70%</p>
                  <p className="item-title muted-sm" style={{ color: '#353f52', opacity: '0.6' }}>
                    Output
                  </p>
                </Col>
                <Col className="text-center col-4">
                  <p className="item-title muted-xs">1000</p>
                  <p className="item-title muted-sm" style={{ color: '#353f52', opacity: '0.6' }}>Price</p>
                </Col>
                <Col className="text-center col-4">
                  <p className="item-title muted-xs">02</p>
                  <p className="item-title muted-sm" style={{ color: '#353f52', opacity: '0.6' }}>Days</p>
                </Col>
              </Row>
            </main>
            <footer>
              <div className="flex-space">
                <div>
                  <p className="item-title pb-1 muted-xs">
                    Total: 0
                  </p>
                </div>
                <div className="flex-list"></div>
                <div>
                  <p className="item-title pb-1 muted-xs">
                    Ydays : 0
                  </p>
                </div>
              </div>
              <div className="flex-space coin-type">
                <div className="flex-list" style={{ gap: '10px' }}>
                  <span>Coin Types :</span>
                  <img src="/assets/images/bitcoin.png" alt="" width={'40px'} />
                  <img src="/assets/images/ethw.png" alt="" width={'40px'} />
                  <img src="/assets/images/tether.png" alt="" width={'40px'} />
                  <img src="/assets/images/usdcoin.png" alt="" width={'40px'} />
                </div>
              </div>
            </footer>
          </article>
        </div>
      </div> */}


    </>
  );
};

export default ArbitrageRecord;
