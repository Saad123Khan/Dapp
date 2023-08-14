import React from 'react'
import { Link } from 'react-router-dom'

const MiningIntro = () => {
  return (
    <>
    <div className="recharge google-2af">
        <div className="header setting ">
            <Link to={"/mining"}>
                <img
                    src="/assets/icons/close.svg"
                    alt=""
                    className="back-img-mining-intro"
                    width={'44px'}
                />
            </Link>
            <span> Mining Introduction </span>
            <Link to={"/"}>
                <img
                    src="/assets/icons/record_recharge.svg"
                    alt=""
                    style={{ opacity: '0' }}
                    className="goto-record"
                />
            </Link>
        </div>
        <div className='sec-two-image'>
            <img src="/assets/images/mining_intro.png" alt=""  width={'270px'}/>
        </div>
    </div>
</>
  )
}

export default MiningIntro