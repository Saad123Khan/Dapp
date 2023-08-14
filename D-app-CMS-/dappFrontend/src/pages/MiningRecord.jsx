import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const MiningRecord = ({ setSidebarOpen }) => {
  // window.scrollTo(0, 0);
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  const [coin, setCoin] = useState(0);
  console.log("🚀 ~ file: MiningRecord.jsx:13 ~ MiningRecord ~ coin:", coin)
  const [inputValue, setInputValue] = useState(0);
  const [result, setResult] = useState(0);
  const [error, setError] = useState(false);
  
  // Get coin data and store it in the coin state
  const getCoinData = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&market_data=true&description=false&community_data=false&developer_data=false&sparkline=false"
      );
      setCoin(response.data.market_data.current_price.usd);
      setError(false);
    } catch (error) {
      console.log("error", error);
      setError(true);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setResult(event.target.value * coin);
  };

  useEffect(() => {
    getCoinData();
    const intervalId = setInterval(() => {
      getCoinData();
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="record-page">
      <div className="record-header page-header">
        <div className="back-button-wrapper">
          <button className="back-button simple">
            <Link to="/">
              <img src="/assets/icons/back.svg" alt="" />
            </Link>
          </button>
        </div>
        <div className="record-header-inner">
          <p className="section-name text-center">Record</p>
        </div>
      </div>
      <div className="custom-container">
        <div className="inner-box mt-2">
          <p className="item-title pb-1 left-line">
            <div className="left-line-inner"></div> Account
          </p>
          <Row>
            <Col className="text-center col-6">
              <p className="item-title muted-xs text-nowrap">
                Cumulative output
              </p>
              <p className="item-title muted-sm fw-semibold"><span>0</span>ETH</p>
            </Col>
            <Col className="text-center col-6">
              <p className="item-title muted-xs text-nowrap">
                Convertible quantity
              </p>
              <p className="item-title muted-sm fw-semibold"><span>0</span>ETH</p>
            </Col>
          </Row>
        </div>
      </div>
      <section className="section-common">
        <p className="section-name pb-1">Exchange</p>
        <div className="flex-space">
          <input
            type="number"
            className="primary-input"
            onWheel={(e) => e.target.blur()}
            placeholder="ETH"
            value={inputValue === 0 ? "ETH" : inputValue}
            onChange={handleInputChange}
          />
          <img src="/assets/icons/swap.png" className="swap-icon" alt="" />
          <input
            disabled={true}
            type="text"
            className="primary-input"
            placeholder={"USDT"}
            value={result === 0 ? "USDT" : result.toFixed(2)}
          />
        </div>
        <div className="center-x pt-2">
          <button className="primary-button">Exchange</button>
        </div>
      </section>
      <section className="section-common">
        <p className="section-name">Record</p>
        <div className="center-item">
          <img
            src="/assets/images/no_data.png"
            className="img-no-data"
            alt=""
          />
          <p className="main-subtitle dark muted-xl">No Data</p>
        </div>
      </section>
    </div>
  );
};

export default MiningRecord;
