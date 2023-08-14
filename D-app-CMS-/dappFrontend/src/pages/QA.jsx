import React, { useEffect } from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Link } from "react-router-dom";

const QA = ({ setSidebarOpen }) => {
  window.scrollTo(0, 0)
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="qa-page">
      <div className="qa-header page-header">
        <div className="back-button-wrapper">
          <button className="back-button simple">
            <Link to="/">
              <img src="/assets/icons/back.svg" alt="" />
            </Link>
          </button>
        </div>
        <div className="qa-header-inner">
          <p className="section-name text-center">Q&A</p>
        </div>
      </div>

      <section className="section-common">
        <Accordion className="custom-accordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <p className="item-title left-line fw-semibold">
                <div className="left-line-inner"></div> online answer{" "}
              </p>
              <HiOutlineChevronDown className="accordion-icon" />
            </Accordion.Header>
            <Accordion.Body>
              If you have any questions, please contact online customer service
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <p className="item-title left-line fw-semibold">
                <div className="left-line-inner"></div> Withdrawal Standard
              </p>
              <HiOutlineChevronDown className="accordion-icon" />
            </Accordion.Header>
            <Accordion.Body>
              Pool profits and profits from lending protocols can be exchanged
              for cash. The user's first withdrawal in the lending protocol
              mining pool needs to exceed 20USDT to initiate. The pool will send
              the funds to the investor's wallet within 24 hours. The income
              standard of the second withdrawal needs to reach more than
              2000USDT before the withdrawal can be initiated. This is a set of
              standards to ensure the stability of the lending protocol mining
              pool. For details, please consult coinrule-web3 online customer
              service
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </div>
  );
};

export default QA;
