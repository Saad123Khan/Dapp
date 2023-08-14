import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi";

const MainCard = ({ fullCard, img, title, subtitle }) => {
  return (
    <>
      <div className={`main-card ${fullCard && "w-100"}`}>
        <p className={`card-title ${fullCard ? "" : "primary"}`}>{title}</p>
        <p className={`card-subtitle ${fullCard && "large"}`}>{subtitle}</p>
        {fullCard && (
          <>
            <HiOutlineArrowRight className="sm-icon" />
          </>
        )}
        <div className={`w-100 d-flex ${!fullCard && "pt-2"}`}>
          <img
            src={img}
         style={{width: '5.4rem',
          height: 'auto'}}
            className="ms-auto"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default MainCard;
