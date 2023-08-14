import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../../context/Store";

const MiningCard = ({name, days, price, number}) => {
  const { balanceOfUsdtState } = useContext(Store);

  return (
    <>
      <article class="mining-card">
        <div className="center-x">
          <img src="/assets/images/mining_machine.png" class="card-img"></img>
        </div>
        <div class="blue-badge mb-1">{days} Day</div>
        <p class="item-title dark fw-semibold">{name} </p>
        <img src="/assets/images/rating.svg" alt="" />
        <div class="flex-space align-items-end" bis_skin_checked="1">
          <div class="pt-2 ">
            <div class="">Rent</div>
            <div class="machinePrice">
              <span style={{fontFamily:"Nunito"}}>
                $
              </span>
              {price} USDT
            </div>
          </div>
         
            <Link to={`/machine/${number}`} bis_skin_checked="1">
              <img
                className="mining-arrow"
                src="/assets/icons/forward.svg"
                alt=""
              ></img>
            </Link>
  
        </div>
      </article>
    </>
  );
};

export default MiningCard;
