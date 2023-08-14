import React, { useEffect, useState } from "react";
import axios from "axios";


const Auth = () => {

  const [qrCode, setQrCode] = useState()

  const getQrCode = async()=>{
    let  data = await axios.get(`http://localhost:5000/getQrCode`)
    // data = await data.json()
    // console.log("🚀 ~ file: Auth.jsx:10 ~ getQrCode ~ data:", data.data)
    setQrCode(data.data)
  }


  const veriFyCode = async(code)=>{
    let res = await axios.get(`http://localhost:5000/verify2FA/${code}`)
    console.log("🚀 ~ file: Auth.jsx:20 ~ veriFyCode ~ res:", res)
  }

  useEffect(()=>{
    getQrCode()
  },[])
    
  return(
    <>
      <h1>
        qr code
      </h1>
      <img src={qrCode} alt="" />
      <input style={{backgroundColor: "red"}}type="text" onChange={(e)=>veriFyCode(e.target.value)} />
    </>
  )
};

export default Auth
