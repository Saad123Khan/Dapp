import React, { useEffect, useState, useContext } from "react";
import FirebaseStack from "../firebase";
import { ref, get, child, set ,remove} from "firebase/database";
import { Store } from "../context/Store";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ProgressLoader({ machineData, index,detailsForEntrustMachine,setActiveTab}) {
  
  const handelCoinData = async () => {
    await getWallet();
    const data = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin?localization=public_interest_stats%3Afalse&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
    if(data?.data?.market_data?.current_price?.usd)
    {
      calculation(data?.data?.market_data?.current_price?.usd)
    }   
  };
 const dbRef = ref(FirebaseStack());
  const [value, setValue] = useState(0);


  const [balanceFromDatabase, setBalanceFromDatabase] = useState(0);

  
const navigate= useNavigate()
  const { currentAccount } = useContext(Store);

  const { LeaseCycle, amount, dateOfOrder, coin,name, exchangeType, open,rate, enTrust,expected,key } =
    machineData;

  const calculateDiffInSec = () => {
    const givenDate = new Date(dateOfOrder);
    const today = new Date();

    const differenceInTime = today.getTime() - givenDate.getTime();
    const differenceInSeconds = Math.floor(differenceInTime / 1000);
    return differenceInSeconds;
  };

  useEffect(() => {
    calculateDiffInSec();
  }, []);

  const entrustStore = [
    {
      amount: amount,
      LeaseCycle: LeaseCycle,
      rate: rate,
      exchangeType: exchangeType,
      dateOfOrder: dateOfOrder.toString(),
      enTrust: false,
      coin: coin,
      open:open,
      expected:expected,
      key:key,
      name:name,
    },
  ];
const calculation=async(coinValue)=>{
    if(exchangeType === "Up")
    {
      if(coinValue > open)
      {
        //console.log(coinValue > open && exchangeType === "Up","if")
        entrustStore[0]['result']="Win";
        entrustStore[0]['delivery']= coinValue;
        updateWallet("Win");
        updateEnTrust();
      }
    else if(coinValue === open) {
          //console.log(coinValue == open,"else")
          entrustStore[0]["result"] = "Draw";
          entrustStore[0]["delivery"] = open;
      updateEnTrust();
        }
      else{
        entrustStore[0]['result']="Loss";
        entrustStore[0]['delivery']= coinValue;    
        updateWallet("Loss");
       updateEnTrust();     
      }
    }
    
  else if(exchangeType === "Down")
  {
    if(coinValue < open)
    {
     // console.log(coinValue < open && exchangeType === "Down","elseif")
      entrustStore[0]['result']="Win";
      entrustStore[0]['delivery']= coinValue;
      updateWallet("Win");
      updateEnTrust();
      
    }
    else if(coinValue === open) {
      //console.log(coinValue == open,"else")
      entrustStore[0]["result"] = "Draw";
      entrustStore[0]["delivery"] = open;
      updateEnTrust();
    }
    else{
      entrustStore[0]['result']="Loss";
      entrustStore[0]['delivery']= coinValue; 
      updateWallet("Loss");
      updateEnTrust();        
    }
  }

  //console.log(open,"===>",coinValue)
}


const getWallet = async () => {
  try {
    const snapshot = await get(
      child(dbRef, `WalletAddressAndAmount/${currentAccount}/0/amount`)
    );
    setBalanceFromDatabase(snapshot.val());
  } catch (error) {
    console.log(error);
  }
};

const updateWallet = async (result) => {
  console.log(result,"result")
  console.log(parseInt(amount),"amount")
  console.log(parseInt(expected),"expected")
  console.log(balanceFromDatabase,"balanceFromDatabase")
  
  if(result=="Win")
  {
    var amountSection = {
      amount: balanceFromDatabase + parseInt(expected),
      wallet: currentAccount,
    };
    await set(
      child(dbRef, `WalletAddressAndAmount/${currentAccount}/0`),
      amountSection
    );
  }
  else if(result=="Loss")
  {
    var amountSection = {
      amount: balanceFromDatabase - parseInt(amount),
      wallet: currentAccount,
    };
    await set(
      child(dbRef, `WalletAddressAndAmount/${currentAccount}/0`),
      amountSection
    );
  }

};


 useEffect(() => {
    if (calculateDiffInSec() >= +LeaseCycle.slice(0, 3) && enTrust) {
       handelCoinData();

      // const recordRef = child(dbRef, `WalletAddressAndAmount/${currentAccount}/Entrust/current/${index}/`);
      //     remove(recordRef)
      //     .then(() => {
      //       console.log("Record removed successfully");
      //     })
      //     .catch((error) => {
      //       console.error("Error removing record:", error);
      //     });
      console.log(
        "if==>",
        calculateDiffInSec(),
        calculateDiffInSec() >= +LeaseCycle.slice(0, 3),
        enTrust
      );
    } else {
      console.log(
        "else==>",
        calculateDiffInSec(),
        calculateDiffInSec() >= +LeaseCycle.slice(0, 3),
        enTrust
      );
    }
  });
  const setInitialValue = () => {
    const givenDate = new Date(dateOfOrder);
    const today = new Date();

    const differenceInTime = today.getTime() - givenDate.getTime();
    const differenceInSeconds = Math.floor(differenceInTime / 1000);
    setValue(differenceInSeconds);
  };

  const updateEnTrust = async () => {
    try {
      await set(
        child(
          dbRef,
          `WalletAddressAndAmount/${currentAccount}/Entrust/current/${index}/`
        ),
        entrustStore
      );
      detailsForEntrustMachine();
      setActiveTab("Finish")
      // navigate(`/trade?active=Finish`)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInitialValue();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((oldValue) => oldValue + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="progress">
      <progress value={value} max={`${LeaseCycle.slice(0, 3)}`}></progress>
    </div>
  );
}

export default ProgressLoader;
