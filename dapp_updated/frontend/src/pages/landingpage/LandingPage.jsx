import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import { PrimaryList, PrimaryTabs } from "./../../components/common";
import MainCard from "../../components/cards/MainCard";
import { Link } from "react-router-dom";
import NewsItem from "../../components/NewsItem";
import { newsList2 } from "../../staticData";
import { BsFillStarFill } from "react-icons/bs";
import axios from "axios";
// import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const LandingPage = ({ setSidebarOpen }) => {
  const TABS = [
    {
      name: "Top",
      icon: "",
    },
    {
      name: "Watchlist",
      icon: <BsFillStarFill />,
    },
    {
      name: "All markets",
      icon: "",
    },
  ];

  const [temp, setTemp] = useState(0);
  const [activeTab, setActiveTab] = useState(TABS[temp]);
  const [news, setNews] = useState([]);

  const getNewsData = async () => {
    try {
      const databaseData = await axios.get(
        `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`
      );
      setNews(databaseData.data.Data);
      setError(false);
      // console.log(
      //   "🚀 ~ file: LandingPage.jsx:45 ~ getNewsData ~ databaseData.data:",
      //   databaseData.data.Data
      // );
    } catch (error) {
      console.log("error", error);
      setError(true);
    }
  };

  useEffect(() => {
    getNewsData();
  }, []);

  const [coin, setCoin] = useState([]);
  const [error, setError] = useState(false);

  const [rangeCoinData, setRangeCoinData] = useState([]);

  const coinsIds = [
    "bitcoin",
    "ethereum",
    "stellar",
    "bitcoin-cash",
    "cosmos",
    "ripple",
    "chainlink",
  ];

  const fetchCoinData = async (coinId) => {
    const timestamp1 = Math.floor(Date.now() / 1000);
    const twentyFourHoursAgoTimestamp = Math.floor(
      (Date.now() - 86400000) / 1000
    );
    // console.log("🚀:", timestamp1, twentyFourHoursAgoTimestamp);

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${twentyFourHoursAgoTimestamp}&to=${timestamp1}`
    );
    return response.data.prices;
  };

  const handleBulkData = async () => {
    try {
      const promises = coinsIds.map((coinId) => fetchCoinData(coinId));
      const res = await Promise.all(promises);
      setRangeCoinData(res);
      console.log("🚀 ~ handleBulkData ~ res:", res);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    handleBulkData();
  }, [coin]);

  var dataCoin;
  // var coinsIdsS = [bitcoin, ethereum, stellar, bitcoin-cash, cosmos, ripple, chainlink]
  const handelCoinData = async () => {
    let res = [];

    for (var i = 0; i < coinsIds.length; i++) {
      dataCoin = await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${coinsIds[i]}?localization=public_interest_stats%3Afalse&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        )
        .then((response) => {
          res.push(response.data);
        });
    }
    setCoin(res);
    // console.log("🚀 ~ file: PrimaryList.jsx:313 ~ handelCoinData ~ res:", res);
  };

  // useEffect(() => {
  //   // handelBulkData();
  //   // handelCoinData()
  // }, [coin]);

  useEffect(() => {
    handelCoinData();
    const intervalId = setInterval(() => {
      handelCoinData();
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  var dataWishLIstCoin;

  const [wishListCoin, setWishListCoin] = useState([]);
  // var coinsIdsS = [bitcoin, ethereum, stellar, bitcoin-cash, cosmos, ripple, chainlink]
  const handelCoinWishListData = async () => {
    let asyncData = localStorage.getItem("myArray");
    asyncData = JSON.parse(asyncData);

    let res = [];

    for (var i = 0; i < asyncData?.length; i++) {
      dataWishLIstCoin = await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${asyncData[i]}?localization=public_interest_stats%3Afalse&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        )
        .then((response) => {
          res.push(response.data);
        });
    }
    setWishListCoin(res);
    console.log(
      "🚀 ~ file: Landing, cPage.jsx:152 ~ handelCoinWshListData ~ res:",
      wishListCoin,
      coin
    );
  };

  useEffect(() => {
    handelCoinWishListData();
    const intervalId = setInterval(() => {
      handelCoinWishListData();
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [temp == 1]);

  const [wishBulkChartData, setWishBulkChartData] = useState([]);
  console.log(
    "🚀e: LandingPage.jsx:165 ~ LandingPage ~ wishBulkChartData:",
    wishBulkChartData
  );

  const fetchWishCoinData = async (asyncData) => {
    const timestamp1 = Math.floor(Date.now() / 1000);
    const twentyFourHoursAgoTimestamp = Math.floor(
      (Date.now() - 86400000) / 1000
    );
    // console.log("🚀:", timestamp1, twentyFourHoursAgoTimestamp);

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${asyncData}/market_chart/range?vs_currency=usd&from=840106697&to=${timestamp1}`
    );
    return response.data.prices;
  };

  const handleWishCoinBulkData = async () => {
    let asyncData = localStorage.getItem("myArray");
    asyncData = JSON.parse(asyncData);

    try {
      const promises = asyncData.map((asyncData) =>
        fetchWishCoinData(asyncData)
      );
      const res = await Promise.all(promises);
      setWishBulkChartData(res);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    handleWishCoinBulkData();
  }, [temp == 1]);

  const [localStorageData, setLocalStorageData] = useState([]);

  useEffect(() => {
    let asyncData = localStorage.getItem("myArray");
    asyncData = JSON.parse(asyncData);
    setLocalStorageData(asyncData);
  }, [temp == 1]);

  return (
    <>
      <Header setSidebarOpen={setSidebarOpen} />
      <section  className="custom-container">
        <p className="section-title" style={{marginTop:'0.54rem',fontFamily:'Inter',fontWeight:600,color:'#000'}}>Market</p>
        <div style={{marginTop:'0.44rem'}}>
          <PrimaryTabs
            tabs={TABS}
            setTemp={setTemp}
            active={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        {/* <PrimaryList /> */}
        {temp == 0 ? (
          <div style={{marginTop:'0.56rem'}}>
               <PrimaryList coins={coin} chart={rangeCoinData} coinsIds={coinsIds} />
       
          </div>
        ) : (
          ""
        )}
        {temp == 1 ? (
          <div style={{marginTop:'0.56rem'}}>
       
       <PrimaryList
            coins={wishListCoin}
            chart={wishBulkChartData}
            coinsIds={localStorageData}
          />
          </div>
       
        ) : (
          ""
        )}
        {temp == 2 ? (
          <div style={{marginTop:'0.56rem'}}>
       <PrimaryList coins={coin} chart={rangeCoinData} coinsIds={coinsIds} />
       </div>
       
       ) : (
          ""
        )}
      </section>
      <section className="scroll-x pt-1">
        <div className="flex-list horiznental">
          <div className="left-container">
            <Link to="/arbitrage">
              <MainCard
                img="/assets/images/card_1.png"
                title={" Ai Smart Arbitrage "}
                subtitle="Smart trading on 200 exchanges"
              />
            </Link>
          </div>
          <div className="right-container">
            <Link to="mining">
              <MainCard
                img="/assets/images/card_2.png"
                title={"Mining machine leasing"}
                subtitle={"High efficiency and fast return"}
              />
            </Link>
          </div>
        </div>
      </section>
      <section className="custom-container">
        <p className="section-title py-1">Invite friends</p>
        <Link to={"/share"}>
          <MainCard
            fullCard
            img="/assets/images/card_3.png"
            title={"Invite friends to join"}
            subtitle="Start invitation"
          />
        </Link>
      </section>
      <section className="py-2 custom-container">
        <div className="flex-space">
          <p className="section-title">News</p>
          <Link to={"news-list"} className="section-title" style={{fontSize:'0.32rem',fontWeight:700,color:'#1652f0'}}>
            More
          </Link>
        </div>
        {newsList2.slice(0, 5).map((news) => {
          return (
            <>
              <Link to={news.link}>
                <NewsItem
                  title={news.title}
                  subtitle={news.subtitle}
                  time={news.time}
                  img={news.img}
                />
              </Link>
            </>
          );
        })}
        <p className="card-title muted-xl fw-light">
          News does not represent investment advice
        </p>
      </section>
    </>
  );
};

export default LandingPage;

// import React, { useState, useEffect } from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import Header from "./Header";
// import { PrimaryList, PrimaryTabs } from "./../../components/common";
// import MainCard from "../../components/cards/MainCard";
// import { Link } from "react-router-dom";
// import NewsItem from "../../components/NewsItem";
// import { newsList2 } from "../../staticData";
// import { BsFillStarFill } from "react-icons/bs";
// import axios from "axios";
// // import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

// const LandingPage = ({ setSidebarOpen }) => {
//   const TABS = [
//     {
//       name: "Top",
//       icon: "",
//     },
//     {
//       name: "Watchlist",
//       icon: <BsFillStarFill />,
//     },
//     {
//       name: "All markets",
//       icon: "",
//     },
//   ];

//   const [activeTab, setActiveTab] = useState(TABS[0]);

//   const [news, setNews] = useState([]);
//   const [error, setError] = useState(false);

//   const getNewsData = async () => {
//     try {
//       const databaseData = await axios.get(
//         `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`
//       );
//       setNews(databaseData.data.Data);
//       setError(false);
//       // console.log(
//       //   "🚀 ~ file: LandingPage.jsx:45 ~ getNewsData ~ databaseData.data:",
//       //   databaseData.data.Data
//       // );
//     } catch (error) {
//       console.log("error", error);
//       setError(true);
//     }
//   };

//   useEffect(() => {
//     getNewsData();
//   }, []);

//   return (
//     <>
//       <Header setSidebarOpen={setSidebarOpen} />
//       <section className="py-1 custom-container">
//         <p className="section-title py-1">Market</p>
//         <div className="py-1">
//           <PrimaryTabs
//             tabs={TABS}
//             active={activeTab}
//             setActiveTab={setActiveTab}
//           />
//         </div>
//         <PrimaryList />
//       </section>
//       <section className="scroll-x pt-1">
//         <div className="flex-list">
//           <div className="left-container">
//             <Link to="/arbitrage">
//               <MainCard
//                 img="/assets/images/card_1.png"
//                 title={" Ai Smart Arbitrage "}
//                 subtitle="Smart trading on 200 exchanges"
//               />
//             </Link>
//           </div>
//           <div className="right-container">
//             <Link to="mining">
//               <MainCard
//                 img="/assets/images/card_2.png"
//                 title={"Mining machine leasing"}
//                 subtitle={"High efficiency and fast return"}
//               />
//             </Link>
//           </div>
//         </div>
//       </section>
//       <section className="custom-container">
//         <p className="section-title py-1">Invite friends</p>
//         <Link to={"/share"}>
//           <MainCard
//             fullCard
//             img="/assets/images/card_3.png"
//             title={"Invite friends to join"}
//             subtitle="Start invitation"
//           />
//         </Link>
//       </section>
//       <section className="py-2 custom-container">
//         <div className="flex-space">
//           <p className="section-title">News</p>
//           <Link to={"news-list"} className="section-title primary">
//             More
//           </Link>
//         </div>

//         {news ? (
//           news.slice(0, 5).map((obj, key) => {
//             const publishedOn = obj.published_on;

//             // Convert Unix timestamp to Date object
//             const dateObj = new Date(publishedOn * 1000);

//             // Subtract 24 hours in milliseconds
//             const twentyFourHoursAgo = new Date(
//               dateObj.getTime() - 24 * 60 * 60 * 1000
//             );

//             // Convert to ISO string format
//             const result = twentyFourHoursAgo.toISOString();

//             return (
//               <>
//                 {/* <Link to={news.link}> */}
//                 <NewsItem
//                   key={key}
//                   title={obj.title}
//                   subtitle={obj.tags}
//                   time={result}
//                   img={obj.imageurl}
//                 />
//                 {/* </Link> */}
//               </>
//             );
//           })
//         ) : (
//           <p>loading</p>
//         )}
//         {/* {newsList2.slice(0, 5).map((news) => {
//           return (
//             <>
//               <Link to={news.link}>
//                 <NewsItem
//                   title={news.title}
//                   subtitle={news.subtitle}
//                   time={news.time}
//                   img={news.img}
//                 />
//               </Link>
//             </>
//           );
//         })} */}
//         <p className="card-title muted-xl fw-light">
//           News does not represent investment advice
//         </p>
//       </section>
//     </>
//   );
// };

// export default LandingPage;
