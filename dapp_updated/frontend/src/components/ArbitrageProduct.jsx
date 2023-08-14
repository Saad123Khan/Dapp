import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Store } from "../context/Store";

const ArbitrageProduct = ({ data }) => {
  const { balanceOfUsdtState } = useContext(Store);
  return (
    <>
      <article className="arbitrage-product">
        <header>
          <span className="blue-badge">{data.time}</span>
          <span className="ar-name">{data.title}</span>
        </header>
        <main>
          <Row>
            <Col className="text-center col-6">
              <p className="item-title pb-1 muted-xs">Amount</p>
              <p className="item-title muted-sm">{data.amount}</p>
            </Col>
            <Col className="text-center col-6">
              <p className="item-title pb-1 muted-xs">Daily Income</p>
              <p className="item-title muted-sm">{data.earnings}</p>
            </Col>
          </Row>
        </main>
        <footer>
          <p className="ar-footer-text pb-1">Arbitrage coin types</p>
          <div className="flex-space">
            <div className="flex-list">
              {data.coins.map((coin) => {
                return (
                  <>
                    <img src={coin} className="img-icon" alt="" />
                  </>
                );
              })}
            </div>
            {/* <Link to={"/arbitrage-product"}>
             <img
               src="/assets/icons/forward.svg"
               alt=""
               className="img-icon"
             />
           </Link> */}
             <Link to={`/arbitrage-product/${data.key}`}>
             <img
               src="/assets/icons/forward.svg"
               alt=""
               className="img-icon"
             />
           </Link>
          </div>
        </footer>
      </article>
    </>
  );
};

export default ArbitrageProduct;
