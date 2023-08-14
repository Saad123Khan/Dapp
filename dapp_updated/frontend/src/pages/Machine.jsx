import React, { useEffect, useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import MarketTrendChart from "../components/charts/MarketTrendChart";
import { PrimaryListItem } from "../components/common";
import IncDecButton from "../components/common/IncDecButton";
import ConfirmLease from "../components/modals/ConfirmLease";
import { Store } from "../context/Store";
import { ref, get, child, set } from "firebase/database";
import FirebaseStack from "../firebase";

const Machine = ({ setSidebarOpen }) => {
  var MachineData = [
    {
      name: "BTC-Miner-2HS",
      output: "0.28-0.288",
      ComputingPower: "320",
      power: "3200",
      days: "30",
      price: "100000",
    },
    {
      name: "BTC-Miner-6HS",
      output: "1.6-1.65",
      ComputingPower: "480",
      power: "4800",
      days: "35",
      price: "500000",
    },
    {
      name: "BTC-Miner-8HS",
      output: "3.1955-3.2",
      ComputingPower: "580",
      power: "5800",
      days: "40",
      price: "1000000",
    },
    {
      name: "BTC-Miner-16HS",
      output: "9.24-9.25",
      ComputingPower: "700",
      power: "7000",
      days: "50",
      price: "3000000",
    },
    {
      name: "BTC-Miner-32HS",
      output: "15.4-15.8",
      ComputingPower: "880",
      power: "8800",
      days: "60",
      price: "5000000",
    },
  ];

  const dbRef = ref(FirebaseStack());
  const { no } = useParams();
  const { balanceOfUsdtState, currentAccount } = useContext(Store);

  const [confirmShow, setConfirmShow] = useState(false);
  const [count, setCount] = useState(1);
  const [balanceFromDatabase, setBalanceFromDatabase] = useState(0);
  const [wait, setWait] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [hasScrolledToTop, setHasScrolledToTop] = useState(false);
  const [message , setMessage] = useState('working')

  console.log("🚀", balanceFromDatabase >= count * MachineData[no].price,  balanceFromDatabase - count * MachineData[no].price)
  
  const handleShow=()=>{
    setConfirmShow(!confirmShow)
  }
  const handleConfirmShow = () => {
    if (balanceFromDatabase >= count * MachineData[no].price) {
      setShowDiv(true);
      setMessage(`Purchase is successful`)
    } else {
      setShowDiv(true);
      setMessage(`You don't have sufficient amount`)
    }
  };
  const handleConfirmHide = () => {
    setConfirmShow(false);
  };

  var date = new Date();
  const miningStore = [
    {
      name: MachineData[no].name,
      output: MachineData[no].output,
      ComputingPower: MachineData[no].ComputingPower,
      power: MachineData[no].power,
      LeaseCycle: MachineData[no].days,
      price: MachineData[no].price,
      quantity: count,
      dateOfOrder: date.toString(),
      amount: count * MachineData[no].price,
      machineProcessing: true,
    },
  ];

  useEffect(() => {
    setSidebarOpen(false);
  }, [count]);

  const getDatabase = async () => {
    setWait(true);
    try {
      const snapshot = await get(
        child(dbRef, `WalletAddressAndAmount/${currentAccount}/0/amount`)
      );
      setBalanceFromDatabase(snapshot.val());
      console.log(snapshot.val());
      setWait(false);
    } catch (error) {
      setWait(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setWait(true);
    getDatabase();
    setWait(false);

    if (showDiv) {
      const timer = setTimeout(() => {
        setShowDiv(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    const handleHashChange = () => {
      if (window.location.hash === '') {
        const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
        if (!hasVisitedBefore || !hasScrolledToTop) {
          window.scrollTo(0, 0);
          setHasScrolledToTop(true);
          localStorage.setItem('hasVisitedBefore', true);
        }
      }
    }
    
    window.addEventListener('hashchange', handleHashChange);

    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [showDiv, hasScrolledToTop]);

  return (
    <div className="share-page" style={{ position: 'relative' }}>
      {showDiv && (
          <div className={`transition-div ${showDiv ? 'show' : ''}`}><p>{message}</p></div>
        )}
      <div className="record-header page-header">
        <div
          className="back-button-wrapper"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button className="back-button simple">
            <Link to="/mining">
              <img src="/assets/icons/back.svg" alt="" width={"32px"} />
            </Link>
          </button>
        </div>
        <div className="record-header-inner">
          <p className="section-name text-center">Leasehold Mining</p>
        </div>
      </div>

      <section className="section-common">
        <img src="/assets/images/machine_full.png" className="w-100" alt="" />
        {/*  */}
        <div className="flex-space">
          <div>
            <p class="section-name dark fw-semibold">{MachineData[no].name}</p>
            <div className="flex-list">
              <div class="item-title muted-lg machinePrice">
                <span class="">$</span>
                {MachineData[no].price} USDT
              </div>
              <img
                src="/assets/images/rating.svg"
                className="rating-img"
                alt=""
              />
            </div>
          </div>
          <div>
            <IncDecButton count={count} setCount={setCount} />
          </div>
        </div>

        {/*  */}
        <p className="section-name fw-semibold py-1 ">Introduction</p>
        <div className="flex-space py-1">
          <p className="item-title  dark">Output</p>
          <p className="item-title  dark muted">
            {MachineData[no].output} BTC/Day
          </p>
        </div>
        <div className="flex-space py-1">
          <p className="item-title  dark">Computing power</p>
          <p className="item-title  dark muted">
            {MachineData[no].ComputingPower} TH/s
          </p>
        </div>
        <div className="flex-space py-1">
          <p className="item-title  dark">Power</p>
          <p className="item-title  dark muted">{MachineData[no].power}W</p>
        </div>
        <div className="flex-space py-1">
          <p className="item-title  dark">Lease cycle</p>
          <p className="item-title  dark muted">{MachineData[no].days} Day</p>
        </div>
        <p className="section-name fw-semibold py-1">Choose us</p>

        <ul className="list">
          <li className="pb-1">
            <span>
              <img
                src="/assets/icons/tick.svg"
                alt=""
                className="img-icon small"
              />
            </span>{" "}
            <span className=" ms-1">Daily settlement of miner income</span>
          </li>
          <li className="pb-1">
            <span>
              <img
                src="/assets/icons/tick.svg"
                alt=""
                className="img-icon small"
              />
            </span>{" "}
            <span className=" ms-1">
              Data centers established in multiple countries
            </span>
          </li>
          <li className="pb-1">
            <span>
              <img
                src="/assets/icons/tick.svg"
                alt=""
                className="img-icon small"
              />
            </span>{" "}
            <span className=" ms-1">24*365 days stable operation</span>
          </li>
          <li className="pb-1">
            <span>
              <img
                src="/assets/icons/tick.svg"
                alt=""
                className="img-icon small"
              />
            </span>{" "}
            <span className=" ms-1">No need to manage,quick return</span>
          </li>
        </ul>
        <div className="lease-button-wrapper" style={{ fontSize: ".32rem" }}>
          <button
            disabled={count <= 0 ? true : false}
            class="lease-button"
            onClick={handleShow}
          >
            <div class="left">
              <img src="/assets/icons/button_wallet.svg" alt="" class=""></img>
              <span class="lease-button-text">Lease now</span>
            </div>
            <div class="right">
              <div class="divide"></div>
              <span class="lease-button-text">
                {count <= 0
                  ? MachineData[no].price
                  : MachineData[no].price * count}{" "}
              </span>
              <span class="lease-button-text">USDT</span>
            </div>
          </button>
        </div>
      </section>
      <ConfirmLease
        show={confirmShow}
        handle={handleConfirmShow}
        handleHide={handleConfirmHide}
        MiningObj={miningStore}
        currentAccount={currentAccount}
        getDatabaseFunction={getDatabase}
        balance={balanceFromDatabase}
        total={count * MachineData[no].price}
      />
    </div>
  );
};

export default Machine;
