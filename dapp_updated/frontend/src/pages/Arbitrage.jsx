import React, { useEffect, useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ArbitrageProduct from "../components/ArbitrageProduct";
import { arbitrageProducts } from "../staticData";
import FirebaseStack from "../firebase";
import { ref, get, child, set } from "firebase/database";
import { Store } from "../context/Store";

const Arbitrage = ({ setSidebarOpen }) => {
  window.scrollTo(0, 0);
  useEffect(() => {
    setSidebarOpen(false);
  }, []);
  const dbRef = ref(FirebaseStack());
  const { currentAccount } = useContext(Store);

  const [totalHosting, setTotalHosting] = useState(0);
  const [totalYDayEarning, setTotalYDayEarning] = useState(0);
  const [totalYDayArbitrageTillToday, setTotalYDayArbitrageTillToday] =
    useState(0);

  const getWalletAddressFromFireStore = async () => {
    try {
      const snapshot = await get(
        child(
          dbRef,
          `WalletAddressAndAmount/${currentAccount}/Arbitrage/current`
        )
      );
      if (snapshot.exists()) {
        const getHostingWorkData = snapshot
          .val()
          .filter((item) => {
            return item[0].machineTimeCompleted === true;
          })
          .reduce((acc, item) => {
            return acc + parseFloat(item[0].amount);
          }, 0);

        setTotalHosting(getHostingWorkData);

        //---------------------------------------------------------------------------------
        var totalArbitrage = 0;
        var yDayEarning = 0;
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        function getDaysBetweenDates(startDate, endDate) {
          const oneDay = 24 * 60 * 60 * 1000;
          const diffDays = Math.round((endDate - startDate) / oneDay);
          return diffDays;
        }
        
        snapshot.val().forEach((order, key) => {
          const {
            LeaseCycle,
            amount,
            dateOfOrder,
            earnings,
            limit,
            machineTimeCompleted,
          } = order[0];
          
          const arbitrageStore = [
            {
              LeaseCycle: LeaseCycle,
              amount: amount,
              dateOfOrder: dateOfOrder,
              earnings: earnings,
              limit: limit,
              machineTimeCompleted: false,
            },
          ];

          const orderDate = new Date(dateOfOrder);
          const todayDate = new Date() 
          const daySinceOrder = getDaysBetweenDates(orderDate, todayDate);
          console.log("🚀:", daySinceOrder)
          
          if (daySinceOrder >= 1 && machineTimeCompleted) {
            yDayEarning =
            yDayEarning + amount * (earnings.split("-")[0]/100);
          }
          
          if (machineTimeCompleted) {
            totalArbitrage =
            totalArbitrage +
            daySinceOrder * amount *(earnings.split("-")[0]/100);
          }
          
          if (daySinceOrder >= LeaseCycle.split(" ")[0] && machineTimeCompleted) {
            updateMachineTimeCompleted(arbitrageStore, key);
          }
        });
        setTotalYDayEarning(yDayEarning.toFixed(4) < 1 ? -1 * yDayEarning.toFixed(4) : yDayEarning.toFixed(4));
        setTotalYDayArbitrageTillToday(totalArbitrage.toFixed(4));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateMachineTimeCompleted = async (arbitrageStore, key) => {
    try {
      await set(
        child(
          dbRef,
          `WalletAddressAndAmount/${currentAccount}/Arbitrage/current/${key}/`
        ),
        arbitrageStore
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWalletAddressFromFireStore();
  }, [currentAccount]);

  console.log(arbitrageProducts);

  return (
    <div className="arbitrage-page">
      <div className="arbitrage-header">
        <button className="back-button">
          <Link to="/">
            <img src="/assets/icons/back.svg" alt="" />
          </Link>
        </button>
        <div className="arbitrage-header-inner">
          <p className="page-title">Hosting work</p>
          <p className="main-title">US${totalHosting}</p>
          <Link to={"/arbitragerecord"} className="white-button mt-2">
            <img src="/assets/icons/notepad.svg" alt="" />{" "}
            <span>Hosting Order</span>
          </Link>
        </div>
      </div>
      <div className="white-box arbitrage">
        <Row className="border-row">
          <Col className="text-center col-6">
            <p className="item-title pb-1 muted-xs">Tot Arbitrage</p>
            <p className="item-title muted-sm">
              {parseFloat(totalYDayArbitrageTillToday)} USDT
            </p>
          </Col>
          <Col className="text-center col-6">
            <p className="item-title pb-1 muted-xs">Yday Earnings</p>
            <p className="item-title muted-sm">
            {parseFloat(totalYDayEarning)} USDT</p>
          </Col>
        </Row>
        <Link to={"/arbitrageintro"} className="flex-space pt-2">
          <div>
            <p className="item-title primary">Introduction</p>
            <p className="item-title muted-xs">How does Ai robot work</p>
          </div>
          <img
            src="/assets/images/robot.png"
            className="arbitrage-img"
            alt=""
          />
        </Link>
      </div>
      <section className="section-common">
        <p className="page-title py-2">Arbitrage Products</p>
        <div className="arbitrage-products">
          {arbitrageProducts.map((product) => {
            return (
              <>
                <ArbitrageProduct data={product} />
              </>
            );
          })}
        </div>
        <div className="primary-box mt-2">
          <p className="primary-box-title primary ">
            Ai Intelligent Moving Brick
          </p>
          <p className="primary-box-subtitle">
            Buy low and sell high to make a profit
          </p>
          <div data-v-4571331e="" class="video_file" bis_skin_checked="1">
            <iframe
              data-v-4571331e=""
              src="https://www.youtube-nocookie.com/embed/LLoKFgfeE0o"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen="allowfullscreen"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Arbitrage;
