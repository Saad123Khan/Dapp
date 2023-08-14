import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PrimaryListItem from "./PrimaryListItem";
import axios from "axios";
import { coinImages } from "../../staticData";

const PrimaryList = ({ coins, chart, coinsIds }) => {
  return (
    <>
      {coins ? (
        coins.map((obj, key) => {
          return (
            <>
              <ul key={key} className="primary-list">
                <Link to={`/market-stats/${coinsIds[key]}?coin=${key}`}>
                  <PrimaryListItem
                    icon={coinImages[key]}
                    name={obj.symbol.toUpperCase() + " Coin"}
                    currency={"USDT"}
                    value={obj.market_data.current_price.usd.toFixed(4)}
                    change={obj.market_data.market_cap_change_percentage_24h // Math.round(obj.market_data.price_change_24h_in_currency.usd * 100) / 100
                      .toFixed(2)}
                    // time={coin.time}
                    stroke={"#335dd2"}
                    obj={obj}
                    data={chart[key]}
                  />
                </Link>
              </ul>
            </>
          );
        })
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default PrimaryList;
