import React, { useEffect, useState } from "react";
import ListItemChart from "../charts/ListItemChart";
import { useLocation } from 'react-router-dom';
import Echart from "../shared/Echart";

const PrimaryListItem = ({
  icon,
  name,
  currency,
  value,
  change,
  stroke,
  obj,
  chart = true,
  data,
}) => {
  const [temp, setTemp] = useState([]);
  function isNegative(num) {
    if (Math.sign(num) === -1) {
      return true;
    }
    return false;
  }
let num = parseFloat(value);
let roundedNum = num.toFixed(2);

  useEffect(() => {
    if (data) {
      setTemp(data);
    }
  }, [data]);

  const addFavoriteCoin = (obj) => {
    // localStorage.setItem('favoriteCoin', JSON.stringify(obj));
    alert("coin added to Favorite");
  };

  const getFavoriteCoin = () => {
    console.log("==>");
    // localStorage.getItem("favoriteCoin");
  };

  const location = useLocation();
  const path = location.pathname;
  console.log(path);
  

  return (
    <article className="primary-list-item">
      <div className="flex-list">
        <img src={icon} className="pro-icon" alt="" />
        <div>
          <p className={path.includes('market-stats') ? 'name-coin' : 'name-coin-land'}>{name}</p>
          <p className="item-title muted fw-semibold">{currency}</p>
        </div>
        <div></div>
      </div>
      {chart && (
        <>
          <div>
            {/* <ListItemChart stroke={stroke} data={data ?? temp} /> */}
            {path.includes('market-stats')  ? '' : <Echart name={name}/>}
            
          </div>
        </>
      )}
      <div className="list-end">
        {value && (
          <>
            <p className="item-title muted-sm fw-semibold text-end text-2xs !important" style={{color:'#353f52',fontFamily:"Nunito",fontWeight:600}}>
              US$ {roundedNum}
            </p>
          </>
        )}
        {change && (
          <>
            <p className="dark-font">
              <span className={isNegative(change) ? "red" : "light-green"} style={{fontWeight:600}}>
                {isNegative(change) ? change : "+" + change}%{" "}
              </span>
              24 Hrs
            </p>
          </>
        )}
      </div>
    </article>
  );
};

export default PrimaryListItem;
