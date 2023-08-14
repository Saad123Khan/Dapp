import React, { useEffect, useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import MarketTrendChart from "../components/charts/MarketTrendChart";
import { PrimaryListItem } from "../components/common";
import axios from "axios";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Store } from "../context/Store";
import FirebaseStack from "../firebase";
import { ref, get, child, set, remove } from "firebase/database";
import { coinImages } from "../staticData";

const MarketStats = ({ setSidebarOpen, setKey }) => {
  const { search } = window.location;
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get("coin");
  const [firebaseAmount, setFirebaseAmount] = useState("");

  const [coinData, setCoinData] = useState([]);
  const [coinRangeData, setRangeData] = useState([]);
  const [time, setTime] = useState(120);
  const [rate, setRate] = useState(0.92);
  const [exchangeType, setExchangeType] = useState("Up");
  const [amount, setAmount] = useState("");
  const [balanceFromDatabase, setBalanceFromDatabase] = useState(0);
  const { coin } = useParams();
  const [colWish, setColWish] = useState("");
  const { currentAccount } = useContext(Store);
  const navigate = useNavigate();
  const [showDiv, setShowDiv] = useState(false);
  const [hasScrolledToTop, setHasScrolledToTop] = useState(false);
  const [message, setMessage] = useState("");

  const [coinExchangeType, setCoinExchangeType] = useState({
    coin: "USDT",
    img: "tether",
    balance: balanceFromDatabase,
  });

  useEffect(() => {
    if (balanceFromDatabase) {
      setCoinExchangeType((prevState) => ({
        ...prevState,
        coin: "USDT",
        img: "tether",
        balance: balanceFromDatabase,
      }));
    }
  }, []);

  const colorCoin = () => {
    let localStorageData = localStorage.getItem("myArray");
    let myArray = localStorageData ? JSON.parse(localStorageData) : [];
    if (!myArray.includes(coin)) {
      setColWish("red");
    } else {
      setColWish("black");
    }
  };

  useEffect(() => {
    colorCoin();
    handelGetFav();
    setSidebarOpen(false);
  }, []);

  var dataCoin;
  const handelCoinData = async () => {
    dataCoin = await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin}?localization=public_interest_stats%3Afalse&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      )
      .then((response) => {
        setCoinData(response.data);
      });
  };

  const handelCoinChartData = async () => {
    const timestamp1 = Math.floor(Date.now() / 1000);
    const twentyFourHoursAgoTimestamp = Math.floor(
      (Date.now() - 86400000) / 1000
    );

    dataCoin = await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=840106697&to=${timestamp1}`
      )
      .then((response) => {
        setRangeData(response.data.prices);
      });
  };
  useEffect(() => {
    handelCoinChartData();
    handelCoinData();
  }, [coin]);

  function isNegative(num) {
    if (Math.sign(num) === -1) {
      return true;
    }
    return false;
  }

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

  console.log(firebaseAmount, "firebaseAmount");

  const handelGetFav = () => {
    let asyncData = localStorage.getItem("myArray");
    asyncData = JSON.parse(asyncData);
  };

  const handelAddFav = () => {
    var item = coinData.id;
    try {
      let localStorageData = localStorage.getItem("myArray");
      let myArray = localStorageData ? JSON.parse(localStorageData) : [];
      if (!myArray.includes(item)) {
        myArray.push(item);
        localStorage.setItem("myArray", JSON.stringify(myArray));
        setColWish("black");
      } else {
        myArray = myArray.filter((val) => val !== item);
        localStorage.setItem("myArray", JSON.stringify(myArray));
        setColWish("red");
      }
    } catch (error) {
      console.error("Error adding item to array:", error);
    }
  };

  console.log(coinRangeData, "coinRangeData");
  const handelTime = (time, rate) => {
    setTime(time);
    setRate(rate);
    console.log("==>", time, rate);
  };

  const handelCoinExchangeType = (type, img, balance) => {
    setCoinExchangeType({
      coin: type,
      img: img,
      balance: balance,
    });
  };

  const [coinName, setCoinName] = useState("");

  const handelUpDown = (type) => {
    console.log(type);
    setExchangeType(type);
  };

  const dbRef = ref(FirebaseStack());

  const [wait, setWait] = useState(false);

  const [index, setIndex] = useState(false);

  var dateOfOrder = new Date();

  const entrustStore = [
    {
      amount: amount,
      LeaseCycle: time + "sec",
      rate: rate,
      exchangeType: exchangeType,
      dateOfOrder: dateOfOrder.toString(),
      enTrust: true,
      coin: coinExchangeType.coin,
      name: coinData?.symbol?.toUpperCase(),
      expected: (amount * rate).toFixed(2),
      open: coinData.market_data?.current_price?.usd,
    },
  ];

  const handelNavigate = async () => {
    // setWait(true);
    if (amount === "") {
      setShowDiv(true);
      return setMessage(`Please enter the purchase quantity`);
    }
    await getDatabase();
    if (+amount >= 1) {
      console.log("🚀if", amount, amount < 1);
      if (balanceFromDatabase >= amount && coinExchangeType.coin === "USDT") {
        try {
          const snapshot = await get(
            child(
              dbRef,
              `WalletAddressAndAmount/${currentAccount}/Entrust/current`
            )
          );
          console.log(snapshot, "snapshot");
          if (snapshot.val()?.length) {
            entrustStore[0]["key"] = snapshot.val()?.length;
          } else {
            entrustStore[0]["key"] = 0;
          }

          if (snapshot.exists()) {
            await set(
              child(
                dbRef,
                `WalletAddressAndAmount/${currentAccount}/Entrust/current/${
                  snapshot.val()?.length
                }/`
              ),
              entrustStore
            );
            // var amountSection = {
            //   amount: balanceFromDatabase - amount,
            //   wallet: currentAccount,
            // };
            // await set(
            //   child(dbRef, `WalletAddressAndAmount/${currentAccount}/0`),
            //   amountSection
            // );
            setKey("Normal");
           //navigate("/trade");
            
      window.location.href = '/trade';
            // setWait(false);
            // setAmount("");
          } else {
            await set(
              child(
                dbRef,
                `WalletAddressAndAmount/${currentAccount}/Entrust/current/0/`
              ),
              entrustStore
            );

            // var amountSection = {
            //   amount: balanceFromDatabase - amount,
            //   wallet: currentAccount,
            // };
            // await set(
            //   child(dbRef, `WalletAddressAndAmount/${currentAccount}/0`),
            //   amountSection
            // );

            //navigate("/trade");
               
        window.location.href = '/trade';
         
            // setWait(false);
            // setAmount("");
          }
        } catch (error) {
          // setWait(false);
          console.error(error);
        }
      } else {
        // alert("You don't have sufficient amount");
        // toast(`You don't have sufficient amount`);
        setShowDiv(true);
        setMessage(`Insufficient availabe assets`);
      }
    } else {
      // toast(`Please enter more amount more than 1USDT`);
      // alert("Please enter more amount more than 1USDT");
      // setAmount("");
      setShowDiv(true);
      setMessage(`Please enter the amount is greater than 1USDT`);
    }
  };

  const getDatabase = async () => {
    // setWait(true);
    try {
      // var amountSection = {
      //   amount: 100000000,
      //   wallet: currentAccount,
      // };
      // await set(
      //   child(dbRef, `WalletAddressAndAmount/${currentAccount}/0`),
      //   amountSection
      // );

      const snapshot = await get(
        child(dbRef, `WalletAddressAndAmount/${currentAccount}/0/amount`)
      );
      setBalanceFromDatabase(snapshot.val());
      setCoinExchangeType((prevState) => ({
        ...prevState,
        coin: "USDT",
        img: "tether",
        balance: snapshot.val(),
      }));
      // setWait(false);
    } catch (error) {
      setWait(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getDatabase();
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

  return (
    <div className="share-page" style={{ position: "relative" }}>
      {showDiv && (
        <div className={`transition-div ${showDiv ? "show" : ""}`}>
          <p>{message}</p>
        </div>
      )}
      <div className="mining-header">
        {/* <button className="back-button simple">
          <Link to="/">
            <img src="/assets/icons/back.svg" alt="" />
          </Link>
        </button> */}

        <div class="back">
          <Link to="/">
            <img className="back-image" src="/assets/icons/backnew.svg" />
          </Link>
        </div>

        {coinData && coinData.image && coinData.image.large ? (
          <div className="market-stats-header-inner flex-space">
            <div>
              <PrimaryListItem
                icon={coinImages?.[id]}
                name={coinData.name}
                currency={coinData.symbol.toUpperCase()}
                chart={coinRangeData}
              />

              <p
                className="main-title dark"
                style={{ fontSize: ".52rem", color: "#000" }}
              >
                US$ {coinData.market_data.current_price.usd.toFixed(2)}
              </p>
              <p
                style={{ fontSize: "0.3rem" }}
                className={`section-name ${
                  isNegative(coinData.market_data.price_change_24h)
                    ? "red"
                    : "green"
                } fw-light`}
              >
                US$ {coinData.market_data.price_change_24h.toFixed(2)} (
                {coinData.market_data.market_cap_change_percentage_24h.toFixed(
                  2
                ) + "%"}
                )
              </p>
            </div>
            <div className="flex-list-y like_icon">
              <button onClick={handelAddFav}>
                <div>
                  <div className={colWish}>
                    {colWish === "red" ? (
                      <img
                        className="icon-image"
                        src="/assets/images/star.png"
                        alt=""
                      />
                    ) : (
                      <img
                        className="icon-image"
                        src="/assets/icons/star-circle.svg"
                        alt=""
                      />
                    )}
                  </div>
                </div>
                {/* <img src="/assets/icons/star-circle.svg" alt="" /> */}
              </button>
              <Link to={"/trade"}>
                <button onClick={handelGetFav}>
                  <img src="/assets/icons/notepad-circle.svg" alt="" />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          "Loading"
        )}
      </div>

      <section className="section-common">
        {coinRangeData?.length > 0 && <MarketTrendChart data={coinRangeData} />}
        <p
          className="py-1"
          style={{ fontSize: ".4rem", fontFamily: "Nunito", fontWeight: 700,color:'#353f52' }}
        >
          Market statistics
        </p>
        <div className="flex-space py-1 mb-1">
          <div className="flex-list">
            <img src="/assets/icons/market.svg" alt="" />
            <p className="item-title dark custom-font">Market</p>
          </div>
          <div className="flex-list ">
            <p className="item-title fw-semibold green custom-font">33%Up</p>
            <p className="item-title fw-semibold red custom-font">68%Down</p>
          </div>
        </div>
        <div className="flex-space py-1 mb-1">
          <div className="flex-list">
            <img src="/assets/icons/volume.svg" alt="" />
            <p className="item-title  dark custom-font">24h volume</p>
          </div>
          <div className="flex-list">
            <p className="item-title fw-semibold dark custom-font">7063.35</p>
          </div>
        </div>
        <div className="flex-space py-1 mb-1">
          <div className="flex-list">
            <img src="/assets/icons/transaction.svg" alt="" />
            <p className="item-title  dark custom-font">24h transaction</p>
          </div>
          <div className="flex-list">
            <p className="item-title fw-semibold dark">US$ 141780519.55</p>
          </div>
        </div>
        <div className="share-button-wrapper">
          <button
            className="primary-button w-100"
            data-toggle="modal"
            data-target="#bottom_modal-one"
          >
            Entrust Now
          </button>
        </div>

        <div
          className="modal modal-bottom fade"
          id="bottom_modal-one"
          tabindex="-1"
          role="dialog"
          aria-labelledby="bottom_modal-one"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content deal">
              <div className="title">
                <span style={{ fontWeight: 700 }}>
                  {coinData?.symbol?.toUpperCase()} Coin Delivery
                </span>
                <img
                  src="/assets/icons/close.svg"
                  alt=""
                  data-dismiss="modal"
                />
              </div>
              <div className="deal_pro_info">
                <div className="base_info">
                  <img
                    // src="/assets/icons/btc.png"
                    src={coinData.image?.large}
                    className="pro_icon"
                    alt=""
                  />
                  <div className="pro_name">
                    <div className="dark-black coin_name">
                      {coinData?.symbol?.toUpperCase()} Coin
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className="dark-black mr-12">Buy</div>
                      <div
                        className="fc-13B26F"
                        style={{
                          color:
                            exchangeType === "Up"
                              ? "rgb(19, 178, 111)"
                              : "#cf202f",
                        }}
                      >
                        {exchangeType}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="time_info">
                  <div
                    className="time"
                    data-toggle="modal"
                    data-target="#bottom_modal-two"
                    style={{marginBottom:0}}
                  >
                    <img
                      src="/assets/icons/time.svg"
                      alt=""
                      width={"28px"}
                      className="icon_time"
                    />
                    <span
                      style={{
                        fontSize: "0.32rem",
                        fontFamily: "Nunito",
                        fontWeight: 400,
                      }}
                    >
                      {time}S
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: ".3rem",
                      fontFamily: "Nunito",
                      fontWeight: 500,
                    }}
                  >
                    {amount === "" ? "0.00" : amount}{" "}
                    <span className="amount fc-353F52">
                      {coinExchangeType.coin}
                    </span>
                  </div>
                </div>
              </div>
              <div className="time_select">
                <div className="select_title"> Delivery time</div>
                <div className="time_select_container">
                  <div
                    className="time_select_content"
                    data-toggle="modal"
                    data-target="#bottom_modal-two"
                  >
                    <div className="value">
                      <img
                        src="/assets/icons/time.svg"
                        alt=""
                        width={"28px"}
                        className="icon_time"
                      />
                      <span className="fs-30">{time}S</span>
                    </div>
                    <img
                      src="/assets/icons/icon_arrow_down.svg"
                      alt=""
                      className="icon_arrow"
                    />
                  </div>
                  <div className="type_select_content fs-32 ff_NunitoSemiBold">
                    <div
                    onClick={() => handelUpDown("Up")}
                      className={`type_item up ${
                        exchangeType === "Up" ? "active" : null
                      }`}
                    >
                      {" "}
                      <button onClick={() => handelUpDown("Up")}>
                        Up
                      </button>{" "}
                    </div>
                    <div
                    onClick={() => handelUpDown("Down")}
                      className={`type_item down ${
                        exchangeType === "Down" ? "active" : null
                      }`}
                    >
                      {" "}
                      <button onClick={() => handelUpDown("Down")}>
                        Down
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="range_select"
                data-toggle="modal"
                data-target="#bottom_modal-three"
              >
                <div className="select_title fs-32 fc-353F52 ff_NunitoSemiBold">
                  {" "}
                  Price range
                </div>
                <div className="range_select_container">
                  <div className="range_info fs-32 ff_NunitoSemiBold">
                    <img
                      src={`/assets/icons/${
                        exchangeType === "Up" ? "green_up.svg" : "red-down.svg"
                      }`}
                      alt=""
                      className="type_icon"
                    />
                    <span className="type_name">
                      <span
                        className="mr-16"
                        style={{
                          color:
                            exchangeType === "Up"
                              ? "rgb(19, 178, 111)"
                              : "#cf202f",
                          paddingLeft: "0.2rem",
                          fontWeight: 500,
                          fontSize: ".32rem",
                        }}
                      >{`  ${exchangeType} |>${
                        rate === 0.92
                          ? 0.1
                          : rate === 1.2
                          ? 0.3
                          : rate === 1.5
                          ? 0.5
                          : 0
                      }% `}</span>
                    </span>
                    <span className="fc-5B616E"> (*{rate}) </span>
                  </div>
                  <img
                    src="/assets/icons/icon_arrow_down.svg"
                    alt=""
                    className="icon_arrow"
                  />
                </div>
              </div>
              <div className="time_select">
                <div className="select_title"> Purchase price</div>
                <div className="time_select_container">
                  <div
                    className="time_select_content"
                    data-toggle="modal"
                    data-target="#bottom_modal-four"
                  >
                    <div className="value">
                      <img
                        src={`/assets/icons/${coinExchangeType.img}.png`}
                        alt=""
                        width={"28px"}
                        className="icon_time"
                      />
                      <span className="fs-30 custom-font-weight">
                        {coinExchangeType.coin}
                      </span>
                    </div>
                    <img
                      src="/assets/icons/icon_arrow_down.svg"
                      alt=""
                      className="icon_arrow"
                    />
                  </div>
                  <div className="amount_input">
                    <input
                      disabled={wait}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        // setAmount(e.target.value);
                      }}
                      value={wait == true ? "Please Wait" : amount}
                      type="number"
                      onWheel={(e) => e.target.blur()}
                      placeholder={wait == true ? "Please Wait" : "Amount"}
                    />
                  </div>
                </div>
              </div>
              <div className="balance fs-26 ff_NunitoRegular">
                <div className="balalce_value fc-353F52">
                  {" "}
                  Balance:
                  {coinExchangeType?.balance > 0
                    ? coinExchangeType?.balance
                    : "0.00"}{" "}
                </div>
                <div
                  className="expect_value fc-1652F0"
                  style={{ fontSize: ".28rem" }}
                >
                  {" "}
                  Expected:{(amount * rate).toFixed(2)}{" "}
                </div>
              </div>
              {/* <Link to={"/trade"}> */}
              <button onClick={handelNavigate} 
              //  data-dismiss= {"modal"}
              >
                <div className="submit_container"
                >
                  <div
                    className="submit fs-36 ff_NunitoBold up"
                    style={{
                      backgroundColor:
                        exchangeType === "Up" ? "rgb(19, 178, 111)" : "#cf202f",
                    }}
                  >
                    Entrust Now
                  </div>
                </div>
              </button>{" "}
              {/* </Link> */}
            </div>
          </div>
        </div>

        <div
          className="modal modalone modal-bottom fade"
          id="bottom_modal-two"
          tabindex="-1"
          role="dialog"
          aria-labelledby="bottom_modal-two"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content deal">
              <div className="range_title">
                <img
                  src="/assets/icons/close.svg"
                  alt=""
                  className="icon_close"
                  data-dismiss="modal"
                />
              </div>
              <div className="coin_list">
                <div className="coin_item">
                  <div className="name" >
                    <button
                      data-dismiss="modal"
                      onClick={() => handelTime(120, 0.92)}
                    >
                      120S
                    </button>
                  </div>
                </div>
                <div className="coin_item">
                  <div className="name">
                    <button
                      data-dismiss="modal"
                      onClick={() => handelTime(180, 1.2)}
                    >
                      180S
                    </button>
                  </div>
                </div>
                <div className="coin_item">
                  <div className="name">
                    <button
                      data-dismiss="modal"
                      onClick={() => handelTime(300, 1.5)}
                    >
                      300S
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal modalone modal-bottom fade"
          id="bottom_modal-three"
          tabindex="-1"
          role="dialog"
          aria-labelledby="bottom_modal-three"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content deal">
              <div className="range_title">
                <img
                  src="/assets/icons/close.svg"
                  alt=""
                  className="icon_close"
                  data-dismiss="modal"
                />
              </div>
              <div className="range_list">
                <div className="range_item">
                  <div
                    className="name"
                    style={{
                      color:
                        exchangeType === "Up" ? "rgb(19, 178, 111)" : "#cf202f",
                    }}
                  >{`  ${exchangeType} |>${
                    rate === 0.92
                      ? 0.1
                      : rate === 1.2
                      ? 0.3
                      : rate === 1.5
                      ? 0.5
                      : 0
                  }%  `}</div>
                  <span className="fc-5B616E">
                    <span>
                      {" "}
                      Rate return:
                      <span> {rate}</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal modal-bottom fade"
          id="bottom_modal-four"
          tabindex="-1"
          role="dialog"
          aria-labelledby="bottom_modal-four"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content deal">
              <div className="range_title">
                <img
                  src="/assets/icons/close.svg"
                  alt=""
                  className="icon_close"
                  data-dismiss="modal"
                />
              </div>
              <div className="coin_list">
                <div className="coin_item">
                  <div className="name">
                    {" "}
                    <button
                      data-dismiss="modal"
                      onClick={() => handelCoinExchangeType("BTC", "btc", 0)}
                    >
                      BTC
                    </button>{" "}
                  </div>
                </div>
                <div className="coin_item">
                  <div className="name">
                    {" "}
                    <button
                      data-dismiss="modal"
                      onClick={() =>
                        handelCoinExchangeType(
                          "USDT",
                          "tether",
                          balanceFromDatabase
                        )
                      }
                    >
                      USDT
                    </button>{" "}
                  </div>
                </div>
                <div className="coin_item">
                  <div className="name">
                    {" "}
                    <button
                      data-dismiss="modal"
                      onClick={() => handelCoinExchangeType("ETH", "eth", 0)}
                    >
                      ETH
                    </button>{" "}
                  </div>
                </div>
                <div className="coin_item">
                  <div className="name">
                    {" "}
                    <button
                      data-dismiss="modal"
                      onClick={() =>
                        handelCoinExchangeType("TRX", "diamond", 0)
                      }
                    >
                      TRX
                    </button>{" "}
                  </div>
                </div>
                <div className="coin_item">
                  <div className="name">
                    {" "}
                    <button
                      data-dismiss="modal"
                      onClick={() =>
                        handelCoinExchangeType("USDC", "usdcoin", 0)
                      }
                    >
                      USDC
                    </button>{" "}
                  </div>
                </div>
                <div className="coin_item">
                  <div className="name">
                    {" "}
                    <button
                      data-dismiss="modal"
                      onClick={() => handelCoinExchangeType("ETHW", "ethw", 0)}
                    >
                      ETHW
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketStats;
