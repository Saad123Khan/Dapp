import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Echart from '../components/shared/Echart';

const Google2AF = () => {
    const [inpValue, setInputValue] = useState(false);
    const [showDiv, setShowDiv] = useState(false);
    const [hasScrolledToTop, setHasScrolledToTop] = useState(false);

    useEffect(() =>{
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
          // Add a listener for the hashchange event
          window.addEventListener('hashchange', handleHashChange);
      
          // Check if we need to scroll to the top on initial render
          handleHashChange();
      
          // Remove the listener when the component unmounts
          return () => {
            window.removeEventListener('hashchange', handleHashChange);
          };
    },[showDiv, hasScrolledToTop])

    const getInputValue = (e) => {
        if (e.target.value != "") {
            setInputValue(true);
        } else {
            setInputValue(false);
        }
    };

    const copyToClipboard = (link) => {
        navigator.clipboard.writeText(link);
        setShowDiv(true);
    }    
    return (
        <>
            <div className="recharge google-2af">
                <div className="header setting ">
                    <Link to={"/"}>
                        <img
                            src="/assets/icons/back_icon.svg"
                            alt=""
                            className="back-img"
                        />
                    </Link>
                    <span> Google 2FA </span>
                    <Link to={"/"}>
                        <img
                            src="/assets/icons/record_recharge.svg"
                            alt=""
                            style={{ opacity: '0' }}
                            className="goto-record"
                        />
                    </Link>
                </div>

                <div className="google-qr">
                    <div className="qr_title fc-353F52 fs-32 ff_NunitoSemiBold" style={{ fontWeight: '600' }}>
                        Download Google Authenticator to bind
                    </div>
                    <div class="qr_bind_content" style={{position : 'relative'}}>
                        <div class="qr_bind_title fc-353F52 ff_NunitoSemiBold">
                            <span class="left_icon">
                            </span> QR Bind </div><div class="qr_code_img">
                            <img src='/assets/images/qr-1.png' width={'100%'} />
                        </div>
                        <div class="qr_code_value fc-353F52 ff_NunitoRegular"> X63VM3IYNQBPYU64 </div>
                        <div class="qr_copy fc-1652F0 ff_NunitoSemiBold" onClick={() => { copyToClipboard('X63VM3IYNQBPYU64') }} style={{cursor : 'pointer'}}>
                            <span > Copy address </span>
                        </div>
                        {showDiv && (
                            <div className={`transition-div ${showDiv ? 'show' : ''}`}><p>Copy successfully</p></div>
                          )}
                    </div>
                </div>
                <div class="code_container">
                    <div class="title fc-353F52 fs-32 ff_NunitoSemiBold" style={{ fontWeight: '600' }}> Enter code </div>
                    <div class="code_content">
                        <div class="van-password-input">
                            <ul class="van-password-input__security">
                                <li class=""></li>
                                <li class="" style={{ marginLeft: '0.32rem' }}></li>
                                <li class="" style={{ marginLeft: '0.32rem' }}></li>
                                <li class="" style={{ marginLeft: '0.32rem' }}></li>
                                <li class="" style={{ marginLeft: '0.32rem' }}></li>
                                <li class="" style={{ marginLeft: '0.32rem' }}></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div data-v-4d6af7c1="" class="intro_block">
                    <div data-v-4d6af7c1="" class="intro_container">
                        <div data-v-4d6af7c1="" class="intro_title fc-2F3848 ff_NunitoSemiBold">
                            <span data-v-4d6af7c1="" class="left_icon"></span>
                            Do you know? </div>
                        <div data-v-4d6af7c1="" class="intro_content fc-353F52 ff_NunitoRegular"> Binding 2FA certification, you need to obtain your certification when withdrawing money, the funds are more secure </div>
                    </div>
                </div>
                <div className="share-button-wrapper">
                    <button className="primary-button w-100"> Bind now </button>
                </div>
            </div>
        </>
    )
}

export default Google2AF