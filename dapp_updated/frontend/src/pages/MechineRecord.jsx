import React, { useEffect, useState, useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import { Store } from "../context/Store";
import FirebaseStack from "../firebase";
import { ref, get, child, set } from "firebase/database";

const formatDate = (date) => {
  // console.log(data);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const formattedDate = date.toLocaleString('en-US', options);
  // console.log(data);
  return formattedDate.replace(/\//g, '-').replace(/,/g, '')
}


const MechineRecord = ({ setSidebarOpen }) => {
  const { currentAccount, miningHostedMachine, detailsForMiningMachine } =
    useContext(Store);

  const dbRef = ref(FirebaseStack());
  const [inpValue, setInputValue] = useState(false);
  const [hostingSet, setHostingSet] = useState(0);
  const [totalMining, setTotalMining] = useState(0.00);
  const [totalYDAyMining, setTotalYDAyMining] = useState(0);

  function getDaysBetweenDates(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const diffDays = Math.round((endDate - startDate) / oneDay);
    return diffDays;
  }

  const getWalletAddressFromFireStore = async () => {
    try {
      const snapshot = await get(
        child(dbRef, `WalletAddressAndAmount/${currentAccount}/Mining/current`)
      );
      if (snapshot.exists()) {
        var quantity = 0;
        snapshot
          .val()
          .filter((arr) => arr[0].machineProcessing === true)
          .map((item) => {
            quantity = quantity + item[0].quantity;
          });
        // console.log("quantity", quantity)
        setHostingSet(quantity);

        // get yesterday's date
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        // function to calculate the number of days between two dates

        var totalMining = 0;
        var miningYDay = 0;

        // var testtotalMining = 0;
        // var testminingYDay = 0;
        // loop through each order and calculate the number of days since yesterday
        snapshot.val().forEach((order, key) => {
          order.forEach((item) => {
            const {
              dateOfOrder,
              amount,
              output,
              LeaseCycle,
              name,
              ComputingPower,
              power,
              price,
              count,
              machineProcessing,
              quantity,
            } = item;

            const miningStore = [
              {
                name: name,
                output: output,
                ComputingPower: ComputingPower,
                power: power,
                LeaseCycle: LeaseCycle,
                price: price,
                quantity: quantity,
                dateOfOrder: dateOfOrder,
                amount: amount,
                machineProcessing: false,
              },
            ];

            const todayDate = new Date();
            const orderDate = new Date(dateOfOrder);
            const daysSinceOrder = getDaysBetweenDates(orderDate, todayDate);

            if (daysSinceOrder >= 1 && machineProcessing) {
              // miningYDay = miningYDay + (+output.split("-")[0])
              // testminingYDay = testminingYDay + (output.split("-")[0] * quantity)
              miningYDay = miningYDay + output.split("-")[0] * quantity;
            }
            if (daysSinceOrder >= LeaseCycle && machineProcessing) {
              updateMachineLeaseCycle(miningStore, key);
            }
            if (machineProcessing) {
              // totalMining = totalMining + (daysSinceOrder*((output.split("-")[0])))
              // testtotalMining = testtotalMining + (daysSinceOrder*((output.split("-")[0])* quantity))
              totalMining =
                totalMining +
                daysSinceOrder * (output.split("-")[0] * quantity);
            }
          });
        });
        // console.log("testyday",testminingYDay,"testtotal", testtotalMining)
        // console.log("yday",miningYDay,"total", totalMining)
        setTotalYDAyMining(miningYDay);
        setTotalMining(totalMining);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateMachineLeaseCycle = async (miningStore, key) => {
    try {
      await set(
        child(
          dbRef,
          `WalletAddressAndAmount/${currentAccount}/Mining/current/${key}/`
        ),
        miningStore
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setSidebarOpen(false);
  });

  useEffect(() => {
    detailsForMiningMachine();
    getWalletAddressFromFireStore();
  }, [currentAccount]);

  return (
    <>
      <div className="recharge">
        <div className="header">
          <Link to={"/mining"}>
            <img
              src="/assets/icons/back_icon.svg"
              alt=""
              className="back-img"
            />
          </Link>
          <span> My Miner </span>
          <Link style={{ opacity: "0" }}>
            <img
              src="/assets/icons/record_recharge.svg"
              alt=""
              className="goto-record"
            />
          </Link>
        </div>
        <div className="survey_container">
          <div className="survey_item">
            <img src="/assets/icons/hosting.svg" alt="" />
            <div className="name">Hosting</div>
            <div className="value">{hostingSet} Sets</div>
          </div>
          <div className="survey_item">
            <img src="/assets/icons/icon_miner.svg" alt="" />
            <div className="name">Total mining</div>
            <div className="value">{totalMining === 0 ? '0.00' : parseFloat(totalMining).toFixed(2)} BTC</div>
          </div>
          <div className="survey_item">
            <img src="/assets/icons/icon_miner_survey3.svg" alt="" />
            <div className="name">Mining yday</div>
            
            <div className="value">{totalYDAyMining === 0 ? '0.0000' : parseFloat(totalYDAyMining).toFixed(2)} BTC</div>
          </div>
        </div>
        <div className="switch_tabs">
          <Tabs
            defaultActiveKey="Normal"
            id="uncontrolled-tab-example"
            className=""
          >
            <Tab eventKey="Normal" title="Normal">
              {miningHostedMachine.length >= 1 ? (
                miningHostedMachine.filter((item) => {
                  return item[0].machineProcessing == true;
                }).length > 0 ? (
                  miningHostedMachine
                    .filter((item) => {
                      return item[0].machineProcessing === true;
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
                          {/* <article className="arbitrage-product" style={{marginTop: "20px"}}>
                            <header className="header">
                              <div>
                                <span className="">{machine[0].name}</span>
                                <p className="">
                                  {machine[0].dateOfOrder.slice(0, 25)}
                                </p>
                              </div>
                              <span className="green-badge">Running</span>
                            </header>
                            <main>
                              <Row>
                                <Col className="text-center col-4">
                                  <p className="item-title muted-xs">
                                    {machine[0].output}%
                                  </p>
                                  <p className="item-title muted-sm">Output</p>
                                </Col>
                                <Col className="text-center col-4">
                                  <p className="item-title muted-xs">
                                    {machine[0].price}
                                  </p>
                                  <p className="item-title muted-sm">Price</p>
                                </Col>
                                <Col className="text-center col-4">
                                  <p className="item-title muted-xs">
                                    {machine[0].LeaseCycle}
                                  </p>
                                  <p className="item-title muted-sm">Days</p>
                                </Col>
                              </Row>
                            </main>
                            <footer>
                              <div className="flex-space">
                                <div>
                                  <p className="item-title pb-1 muted-xs">
                                    Total :{" "}
                                    {daysSinceOrder *
                                      (machine[0].output.split("-")[0] *
                                        machine[0].quantity)}
                                  </p>
                                </div>
                                <div className="flex-list"></div>
                                <div>
                                  <p className="item-title pb-1 muted-xs">
                                    Ydays :{" "}
                                    {daysSinceOrder >= 1
                                      ? machine[0].output.split("-")[0] *
                                        machine[0].quantity
                                      : 0}
                                  </p>
                                </div>
                              </div>
                            </footer>
                          </article> */}
                          <article className="arbitrage-product" style={{marginTop: "20px"}}>
                            <header className="header">
                              <div className="btc">
                                <span className="" style={{fontWeight : '900px'}}>{machine[0].name}</span>
                                <p className="">
                                  {formatDate(new Date(machine[0].dateOfOrder))}
                                </p>
                              </div>
                              <span className="green-badge">run * 1</span>
                            </header>
                            <main>
                              <Row>
                                <Col className="text-center col-4">
                                  <p className="item-title muted-xs ">
                                    {machine[0].output}%
                                  </p>
                                  <p className="item-title muted-sm desc">Output{`(BTC)`}</p>
                                </Col>
                                <Col className="text-center col-4">
                                  <p className="item-title muted-xs ">
                                    {machine[0].price}
                                  </p>
                                  <p className="item-title muted-sm desc">
                                    <span>Price</span>
                                    <span>
                                      <img src="/assets/images/tether.png" alt="" width={'22px'} style={{marginLeft : '10px'}}/>
                                      </span> 
                                      </p>
                                </Col>
                                <Col className="text-center col-4">
                                  <p className="item-title muted-xs ">
                                    {machine[0].LeaseCycle}
                                  </p>
                                  <p className="item-title muted-sm descc">Days</p>
                                </Col>
                              </Row>
                            </main>
                            <footer>
                              <div className="flex-space">
                                <div>
                                  <p className="item-title pb-1 muted-xs">
                                    Total :{" "}
                                    <span >
                                    {daysSinceOrder >= 1  ? daysSinceOrder * (machine[0].output.split("-")[0] * machine[0].quantity) 
                                    : 
                                    '0.00'
                                    }
                                    </span>
                                    
                                  </p>
                                </div>
                                <div className="flex-list"></div>
                                <div>
                                  <p className="item-title pb-1 muted-xs" >
                                   Ydays :{" "}
                                    <span style={{color : '#3a86ff'}}>
                                    {daysSinceOrder >= 1
                                      ? machine[0].output.split("-")[0] *
                                        machine[0].quantity
                                      : '0.0000'}
                                    </span>
                                  </p>
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
            <Tab eventKey="Maturity" title="Maturity">
              {miningHostedMachine.length >= 1 ? (
                miningHostedMachine.filter((item) => {
                  return item[0].machineProcessing == false;
                }).length > 0 ? (
                  miningHostedMachine
                    .filter((item) => {
                      return item[0].machineProcessing === false;
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
                          <article className="arbitrage-product" style={{marginTop: "20px"}}>
                            <header className="header">
                              <div>
                                <span className="">{machine[0].name}</span>
                                <p className="">
                                  {machine[0].dateOfOrder.slice(0, 25)}
                                </p>
                              </div>
                              <span className="red-badge">Matured</span>
                            </header>
                            <main>
                              <Row>
                                <Col className="text-center col-4">
                                  <p className="item-title muted-xs">
                                    {machine[0].output}%
                                  </p>
                                  <p className="item-title muted-sm">Output</p>
                                </Col>
                                <Col className="text-center col-4">
                                  <p className="item-title muted-xs">
                                    {machine[0].price}
                                  </p>
                                  <p className="item-title muted-sm">Price</p>
                                </Col>
                                <Col className="text-center col-4">
                                  <p className="item-title muted-xs">
                                    {machine[0].LeaseCycle}
                                  </p>
                                  <p className="item-title muted-sm">Days</p>
                                </Col>
                              </Row>
                            </main>
                            <footer>
                              <div className="flex-space">
                                <div>
                                  <p className="item-title pb-1 muted-xs">
                                    Total :{" "}
                                    {daysSinceOrder *
                                      (machine[0].output.split("-")[0] *
                                        machine[0].quantity)}
                                  </p>
                                </div>
                                <div className="flex-list"></div>
                                <div>
                                  <p className="item-title pb-1 muted-xs" style={{color : '#3a86ff'}}>
                                  Ydays :{" "}
                                    {daysSinceOrder >= 1 && machine[0].machineProcessing
                                      ? machine[0].output.split("-")[0] *
                                        machine[0].quantity
                                      : 0}
                                  </p>
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
    </>
  );
};

export default MechineRecord;
