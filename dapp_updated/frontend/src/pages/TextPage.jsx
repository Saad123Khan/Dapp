import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Textpage = ({ setSidebarOpen }) => {
  window.scrollTo(0, 0);
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="news-page">
      <div className="news-header page-header">
        <div className="back-button-wrapper">
          <button className="back-button simple">
            <Link to="/arbitrage">
              <img src="/assets/icons/close.svg" alt="" />
            </Link>
          </button>
        </div>
        <div className="record-header-inner">
          <p className="section-name text-center">Introduction</p>
        </div>
      </div>
      <section className="custom-container news-body pb-3">
        <div className="center-x">
          <img
            src="/assets/images/intro_1.png"
            className="page-img smallest"
            alt=""
          />
        </div>
        <p className="card-title py-1 primary">What is arbitrage?</p>
        <br />
        <p>
          Due to the large volatility of digital currency, there will be a
          spread in the currency value of each exchange. Arbitrage is to buy
          assets in a lower price market and then sell them at higher prices in
          other trading markets. Buy low and sell high. The spread in the middle
          is the profit, and we call this operation "brick-moving arbitrage"
        </p>
        <br />
        <p>
          Assume the EOS/USDT trading pair: the currency price is 11, the
          currency price is 10, and the EOS price difference between the two
          exchanges is 1 USD. Suppose you hold 1 EOS in Coinbase, follow the
          principle of buy low sell high. Selling 1 EOS on Coinbase will earn 11
          USDT, and buying 1 EOS on Binance will cost 10 USDT. Buy one sell one
          pure profit. 1 USDT, the amount of EOS remains unchanged. Although
          such price differences exist, artificial arbitrage often has many
          uncertainties due to time-consuming manual operations, poor accuracy,
          and price changes. Use quantitative models to capture arbitrage
          opportunities and formulate arbitrage trading strategies. Programmatic
          algorithms automatically issue trading orders to exchanges to quickly
          and accurately capture opportunities and earn profits efficiently.
        </p>
        <br />
        <p className="card-title primary">Our Ai Arbitrage Robot</p>
        <br />
        <p>
          Our Ai arbitrage robot can complete price screening in more than 200
          exchanges around the world, automatically complete transactions,
          completely replace manual operations, high work efficiency, safety and
          stability, and quick returns.
        </p>
      </section>
    </div>
  );
};

export default Textpage;
