import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TbKeyboardShow } from "react-icons/tb";
import { FiDelete } from "react-icons/fi";
import { Link } from "react-router-dom";
import { arbitrageImages } from "../staticData";
import { ethers, utils } from "ethers";
import { StoreProvider } from "../context/Store";
import { Store } from "../context/Store";
import { useParams } from "react-router-dom";
const { ethereum } = window;

import { arbitrageProducts } from "../staticData";
import FirebaseStack from "../firebase";
import { ref, get, child, set } from "firebase/database";

const ArbitrageProductPage = ({ setSidebarOpen }) => {
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  const getInputValue = (e) => {
    if (e.target.value != "") {
      setInputValue(true);
    } else {
      setInputValue(false);
    }
  };

  const { no } = useParams();
  console.log(arbitrageImages[1].images);
  const dbRef = ref(FirebaseStack());
  const [inpValue, setInputValue] = useState(false);
  const { currentAccount } = useContext(Store);
useEffect(()=>{
  if(no)
  {
    setType(no)
  }
},[no])
  const [firebaseAmountArbitrage, setFirebaseAmountArbitrage] = useState("");
  const [wait, setWait] = useState(false);
  const [balanceFromDatabase, setBalanceFromDatabase] = useState(0);
  const [showDiv, setShowDiv] = useState(false);
  const [hasScrolledToTop, setHasScrolledToTop] = useState(false);
  const [message , setMessage] = useState('')

  const storeDataInFirebase = async () => {
    if (firebaseAmountArbitrage === "") {
      setShowDiv(true);
      return setMessage(`Please enter the purchase quantity`);
    }
    var limit01 = +arbitrageProducts[no - 1].amount.split("-")[0].split("$")[1];
    var limit02 = +arbitrageProducts[no - 1].amount.split("-")[1];
    if (
      parseInt(firebaseAmountArbitrage) >= limit01 &&
      firebaseAmountArbitrage <= limit02
    ) {
      // console.log(
      //   "if",
      //   firebaseAmountArbitrage >= limit01 && firebaseAmountArbitrage <= limit02, firebaseAmountArbitrage, limit01, limit02, firebaseAmountArbitrage-limit01,
      // );
      console.log(
        "🚀",
        balanceFromDatabase >= firebaseAmountArbitrage,
        balanceFromDatabase,
        firebaseAmountArbitrage
      );
      setWait(true);
      await getDatabase();
      if (balanceFromDatabase >= firebaseAmountArbitrage) {
        try {
          const snapshot = await get(
            child(
              dbRef,
              `WalletAddressAndAmount/${currentAccount}/Arbitrage/current`
            )
          );
          if (snapshot.exists()) {
            await set(
              child(
                dbRef,
                `WalletAddressAndAmount/${currentAccount}/Arbitrage/current/${
                  snapshot.val().length
                }/`
              ),
              arbitrageStore
            );

            var amountSection = {
              amount: balanceFromDatabase - firebaseAmountArbitrage,
              wallet: currentAccount,
            };
            await set(
              child(dbRef, `WalletAddressAndAmount/${currentAccount}/0`),
              amountSection
            );

            setWait(false);
            setFirebaseAmountArbitrage("");
            setShowDiv(true);
            setMessage(`Purchase is successful`)
          } else {
            await set(
              child(
                dbRef,
                `WalletAddressAndAmount/${currentAccount}/Arbitrage/current/0/`
              ),
              arbitrageStore
            );

            var amountSection = {
              amount: balanceFromDatabase - firebaseAmountArbitrage,
              wallet: currentAccount,
            };
            await set(
              child(dbRef, `WalletAddressAndAmount/${currentAccount}/0`),
              amountSection
            );

            setWait(false);
            setFirebaseAmountArbitrage("");
            setShowDiv(true);
            setMessage(`Purchase is successful`)
          }
        } catch (error) {
          setWait(false);
          console.error(error);
        }
      } else {
        // alert("You don't have sufficient amount");
        // toast(`You don't have sufficient amount`);
        setShowDiv(true);
        setMessage(`You don't have sufficient amount`)
      }
    } else {
      // console.log(
      //   firebaseAmountArbitrage >=
      //     arbitrageProducts[no - 1].amount.split("-")[0].split("$")[1] &&
      //     firebaseAmountArbitrage <=
      //       arbitrageProducts[no - 1].amount.split("-")[1], firebaseAmountArbitrage
      // );
      // alert("Please enter amount between sufficient amount");
      // toast(`Please enter amount between sufficient amount`);
      setShowDiv(true);
      setMessage(`Please enter amount between sufficient amount`)
    }
  };
const [type,setType]=useState("")
  var date = new Date();
  const arbitrageStore = [
    {
      amount: firebaseAmountArbitrage,
      LeaseCycle: arbitrageProducts[no - 1].time,
      earnings: arbitrageProducts[no - 1].earnings,
      limit: arbitrageProducts[no - 1].amount,
      dateOfOrder: date.toString(),
      machineTimeCompleted: true,
      type:type
    },
  ];

  const getDatabase = async () => {
    // setWait(true);
    
    try {
      const snapshot = await get(
        child(dbRef, `WalletAddressAndAmount/${currentAccount}/0/amount`)
      );
      setBalanceFromDatabase(snapshot.val());
      console.log(snapshot.val());
      // setWait(false);
    } catch (error) {
      setWait(false);
      console.log(error);
    }
  };

  useEffect(() => {
    // setWait(true);
    getDatabase();
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
    <div className="record-page" style={{ position: 'relative' }}>
      {showDiv && (
          <div className={`transition-div ${showDiv ? 'show' : ''}`}><p>{message}</p></div>
        )}
      <div className="record-header page-header">
        <div
          className="back-button-wrapper"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button className="back-button simple">
            <Link to="/arbitrage">
              <img src="/assets/icons/back.svg" alt="" width={"32px"} />
            </Link>
          </button>
        </div>
        <div className="record-header-inner">
          <p className="section-name text-center">Arbitrage</p>
        </div>
      </div>

      <section className="section-common product">
        <div className="arbitrage-join">
          <div className="detail">
            <p className="page-title-arbitrage mt-1">Join AI Arbitrage</p>
            <p className="page-subtitle-arbitrage">Zero risk, fast return</p>
          </div>
          <img src="/assets/images/img_arb.png" alt="" width={"247px"} />
        </div>

        <article className="arbitrage-product simple">
          <div className="flex-space">
            <header className="flex-list no-gap">
              <img src="/assets/icons/badge.svg" alt="" />
              <span className="section-name">AI Arbitrage</span>
            </header>
            <span className="main-title dark-text me-1 fw-semibold">
              {arbitrageProducts[no - 1].time}
            </span>
          </div>
          <main>
            <Row>
              <Col className="text-center col-6">
                <p className="item-title pb-1 muted-xs">Amount</p>
                <p className="item-title muted-sm">
                  {arbitrageProducts[no - 1].amount}
                </p>
              </Col>
              <Col className="text-center col-6">
                <p className="item-title pb-1 muted-xs">Daily Income</p>
                <p className="item-title muted-sm">
                  {arbitrageProducts[no - 1].earnings}
                </p>
              </Col>
            </Row>
          </main>
          <footer>
            <p className="ar-footer-text pb-1">Arbitrage coin types</p>
            <div className="flex-space">
              <div className="flex-list">
                {arbitrageImages[no - 1].images.map((images) => {
                 return <img src={images} className="img-icon" alt="" />
                })}
                {/* <img src="/assets/icons/xlm.png" className="img-icon" alt="" />
                <img src="/assets/icons/metamask.png" className="img-icon" alt=""/>
                <img src="/assets/icons/wow.png" className="img-icon" alt="" />
                <img src="/assets/icons/diamond.png" className="img-icon" alt="" /> */}
              </div>
            </div>
            <div className="bottom-line pt-2 mb-2"></div>
            <p className="para">Hosting Amount</p>

            {/*TODO:: change here set model as well as token list data-toggle="modal" data-target="#bottom_modal-one" */}
            <div className="flex-input">
              <img
                src="/assets/icons/tether.png"
                alt=""
                className="img-icon small"
              />
              {/* <input type="number" placeholder="Amount" 
              
              /> */}

              <input
                onChange={(e) => {
                  setFirebaseAmountArbitrage(e.target.value);
                }}
                onWheel={(e) => e.target.blur()}
                type="number"
                className="amount_input"
                placeholder={wait == true ? "Please Wait" : "Amount"}
                disabled={wait}
                value={wait == true ? "Please Wait" : firebaseAmountArbitrage}
              />

              <span className="muted-lg">USDT</span>
            </div>
          </footer>
          <div className="center-x pb-2 hosting_now">
            <button
              onClick={storeDataInFirebase}
              className="primary-button"
              disabled={wait}
            >
              Hosting Now
            </button>
          </div>
          <div className="light-bg p-2">
            <ul>
              <li>
                <span>
                  <img
                    src="/assets/icons/tick.svg"
                    alt=""
                    className="img-icon small"
                  />
                </span>{" "}
                <span className="muted ms-1">
                  Daily income is sent to your USDT wallet
                </span>
              </li>
              <li>
                <span>
                  <img
                    src="/assets/icons/tick.svg"
                    alt=""
                    className="img-icon small"
                  />
                </span>{" "}
                <span className="muted ms-1">
                  Zero risk of your investment funds
                </span>
              </li>
              <li>
                <span>
                  <img
                    src="/assets/icons/tick.svg"
                    alt=""
                    className="img-icon small"
                  />
                </span>{" "}
                <span className="muted ms-1">
                  You can get your funds back anytime
                </span>
              </li>
              <li>
                <span>
                  <img
                    src="/assets/icons/tick.svg"
                    alt=""
                    className="img-icon small"
                  />
                </span>{" "}
                <span className="muted ms-1">
                  Artificial intelligence works 24 hours a day
                </span>
              </li>
            </ul>
          </div>

          <div
            className="modal modalone modal-bottom fade"
            id="bottom_modal-one"
            tabindex="-1"
            role="dialog"
            aria-labelledby="bottom_modal-one"
          >
            <div className="modal-dialog" role="document">
              <div className="model-bg">
                <div
                  className="modal-content deal"
                  style={{
                    overflowY: "auto",
                    backgroundColor: "transparent",
                    padding: "0px",
                  }}
                >
                  <div className="van-number-keyboard__body">
                    <div className="van-number-keyboard__keys">
                      <div className="van-key__wrapper">
                        <button className="van-key">1</button>
                      </div>
                      <div className="van-key__wrapper">
                        <button className="van-key">2</button>
                      </div>
                      <div className="van-key__wrapper">
                        <button className="van-key">3</button>
                      </div>
                      <div className="van-key__wrapper">
                        <button className="van-key">4</button>
                      </div>
                      <div className="van-key__wrapper">
                        <button className="van-key">5</button>
                      </div>
                      <div className="van-key__wrapper">
                        <button className="van-key">6</button>
                      </div>
                      <div className="van-key__wrapper">
                        <button className="van-key">7</button>
                      </div>
                      <div className="van-key__wrapper">
                        <button className="van-key">8</button>
                      </div>
                      <div className="van-key__wrapper">
                        <button className="van-key">9</button>
                      </div>
                      <div className="van-key__wrapper" data-dismiss="modal">
                        <button className="van-key">
                          <TbKeyboardShow />
                        </button>
                      </div>
                      <div className="van-key__wrapper">
                        <button className="van-key">0</button>
                      </div>
                      <div className="van-key__wrapper">
                        <button className="van-key">
                          <FiDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
   </div>
  );
};

export default ArbitrageProductPage;
