import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MiningCard from "../components/cards/MiningCard";

const Mining = ({ setSidebarOpen }) => {
  window.scrollTo(0, 0);
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="mining-page">
      <div className="mining-header">
        <img
          src="/assets/images/mining-banner.png"
          className="mining-banner-img"
          alt=""
        />
        <button className="back-button">
          <Link to="/">
            <img src="/assets/icons/back.svg" alt="" />
          </Link>
        </button>
        <div className="mining-header-inner">
        <Link to="/mining-intro">
          <img src="/assets/icons/info-circle.svg" alt="" />
          </Link>
          <Link to="/mechineRecord">
            <img src="/assets/icons/notepad-circle.svg" alt="" />
          </Link>
        </div>
      </div>

      <section
        className="
      "
      >
        <p className="page-title pb-2 pt-2 section-common">
          Mining Machine leasing
        </p>
        <div className="scroll-x mining-card-scroll">
          <div className="flex-list pb-3">
            <div className="ps-1">
              <MiningCard name={"BTC Miner-2HS"} number={0} days={"30"} price={"100000"} />
            </div>
            <div>
              <MiningCard name={"BTC Miner-6HS"} number={1} days={"35"} price={"500000"} />
            </div>
            <div>
              <MiningCard name={"BTC Miner-8HS"} number={2} days={"40"} price={"1000000"} />
            </div>
            <div>
              <MiningCard name={"BTC Miner-16HS"} number={3} days={"50"} price={"3000000"} />
            </div>
            <div className="pe-1">
              <MiningCard name={"BTC Miner-32HS"} number={4} days={"60"} price={"5000000"} />
            </div>
          </div>
        </div>
        <div className="primary-box">
          <div className="box">
            <p className="primary-box-title primary ">Mining machine video</p>
            <p className="primary-box-subtitle pb-1">
              Safe and stable money making tool
            </p>
            <div data-v-566412a2="" class="video_file" bis_skin_checked="1">
              <iframe
                data-v-566412a2=""
                src="https://www.youtube.com/embed/fAfrBL5QRr0"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="allowfullscreen"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mining;
