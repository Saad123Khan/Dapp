import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Store } from "../context/Store";
import axios from "axios";

import FirebaseStack from "../firebase";
import { ref, get, child, set } from "firebase/database";

const Account = ({ setSidebarOpen }) => {
  window.scrollTo(0, 0);
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  const {
    currentAccount,
    balanceOfUsdcState,
    balanceOfUsdtState,
    balanceOfEthState,
  } = useContext(Store);
  console.log("🚀a:", +balanceOfEthState);

  const [eth, setEth] = useState("");
  const [teth, setTeth] = useState("");
  const [usd, setUsd] = useState("");

  const getCoinData = async () => {
    try {
      const databaseData = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=7&page=1&sparkline=false`
      );
      databaseData.data &&
        databaseData.data.map((obj, key) => {
          if (obj.id === "ethereum") {
            setEth(obj.current_price);
            console.log("🚀:", obj.current_price);
          } else if (obj.id == "tether") {
            setTeth(obj.current_price);
            console.log("🚀:", obj.current_price);
          } else if (obj.id == "usd-coin") {
            setUsd(obj.current_price);
            console.log("🚀:", obj.current_price);
          }
        });
      // setCoin(databaseData.data);
      // setError(false);
    } catch (error) {
      console.log("error", error);
      // setError(true);
    }
  };

  // coingecko
  // Call getCoinData initially, and then every 5 minutes
  useEffect(() => {
    getCoinData();

    const intervalId = setInterval(() => {
      getCoinData();
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [currentAccount]);

  const dbRef = ref(FirebaseStack());
  const [firebaseAmount, setFirebaseAmount] = useState("");

  const getWalletAddressFromFireStoreTest = async () => {
    try {
      const snapshot = await get(
        child(dbRef, `WalletAddressAndAmount/${currentAccount}`)
      );
      if (snapshot.exists()) {
        console.log("Wallet address available:", snapshot.val()[0].wallet);
        setFirebaseAmount(snapshot.val()[0].amount);
      } else {
        console.log("Wallet address not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWalletAddressFromFireStoreTest();
  }, [currentAccount]);

  return (
    <>
      <div className="account-pag">
        <Link to={"/"}>
          <img
            style={{ fontSize: ".3rem" }}
            className="back-blue-image"
            src="/assets/icons/backblue.svg"
            alt=""
          />
        </Link>
        <div className="flex-space" style={{ padding: "0 0.4rem" }}>
          <div>
            <p
              className="page-title pt-2 mt-1 text-3xs"
              style={{ color: "#000" }}
            >
              Send Crypto Now
            </p>
            <p className="page-subtitle" style={{ marginTop: "0.06rem" }}>
              Choose a wallet to send crypto from
            </p>
            <p
              className="page-subtitle line-after"
              style={{ marginTop: "0.39rem" }}
            >
              Select a wallet
            </p>
          </div>
          <img src="/assets/images/account.png" className="title-img" alt="" />
        </div>
      </div>

      <div className="Wallet wallet-tabs">
        <Link
          to={`/recharge/usdc-coin?name=${"Ethw wallet"}&coinname=${"ETHW"}&icon=${"ethw"}&swap=${"USDC"}`}
        >
          <div className="wallet-section">
            <div className="wallet-information">
              <img src="/assets/images/ethw.png" width={"64px"} alt="" />
              <div className="wallet-detail">
                <h1> Ethw wallet </h1>
                <p> ETHW Coin </p>
              </div>
            </div>
            <div className="wallet-value">
              <h2> US$ 0.0000 </h2>
              <p> 0.000000 ETHW</p>
            </div>
          </div>
        </Link>
        <Link
          to={`/recharge/usdc-coin?name=${"Usdcoin wallet"}&coinname=${"USDC"}&icon=${"usdcoin"}&swap=${"ETHW"}`}
        >
          <div className="wallet-section">
            <div className="wallet-information">
              <img src="/assets/images/usdcoin.png" width={"64px"} alt="" />
              <div className="wallet-detail">
                <h1> Usdcoin wallet </h1>
                <p> USDC Coin </p>
              </div>
            </div>
            <div className="wallet-value">
              <h2> US$ {(usd * balanceOfUsdcState).toFixed(3)} </h2>
              <p> {(+balanceOfUsdcState).toFixed(3)} USDC</p>
            </div>
          </div>
        </Link>
        <Link
          to={`/recharge/usdt-coin?name=${"Tether wallet"}&coinname=${"USDT"}&icon=${"tether"}&swap=${"ETHW"}`}
        >
          <div className="wallet-section">
            <div className="wallet-information">
              <img src="/assets/images/tether.png" width={"64px"} alt="" />
              <div className="wallet-detail">
                <h1> Tether wallet </h1>
                <p> USDT Coin </p>
              </div>
            </div>
            <div className="wallet-value">
              <h2> US$ {(+firebaseAmount).toFixed(2)} </h2>
              <p style={{ textAlign: "right" }}> {firebaseAmount} USDT</p>
            </div>
          </div>
        </Link>
        <Link
          to={`/recharge/btc-coin?name=${"Bitcoin wallet"}&coinname=${"BTC"}&icon=${"bitcoin"}&swap=${"ETHW"}`}
        >
          <div className="wallet-section">
            <div className="wallet-information">
              <img src="/assets/images/bitcoin.png" width={"64px"} alt="" />
              <div className="wallet-detail">
                <h1> Bitcoin wallet </h1>
                <p> BTC Coin </p>
              </div>
            </div>
            <div className="wallet-value">
              <h2> US$ {(teth * balanceOfUsdtState).toFixed(2)} </h2>
              <p> {(+balanceOfUsdtState).toFixed(2)} BTC</p>
            </div>
          </div>
        </Link>
        <Link
          to={`/recharge/eth-coin?name=${"Ethereum wallet"}&coinname=${"ETH"}&icon=${"ethw"}&swap=${"ETHW"}`}
        >
          <div className="wallet-section">
            <div className="wallet-information">
              <img src="/assets/images/ethw.png" width={"64px"} alt="" />
              <div className="wallet-detail">
                <h1> Ethereum wallet </h1>
                <p> ETH Coin </p>
              </div>
            </div>
            <div className="wallet-value">
              {/* <h2> US$ {eth * balanceOfEthState} </h2> */}
              <h2> US$ {(eth * balanceOfEthState).toFixed(2)} </h2>
              <p style={{ textAlign: "right" }}>
                {" "}
                {(+balanceOfEthState).toFixed(2)} ETH
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Account;
