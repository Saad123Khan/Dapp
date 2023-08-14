import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";

const Share = ({ setSidebarOpen }) => {
  // window.scrollTo(0, 0);
  // useEffect(() => {
  //   setSidebarOpen(false);
  // }, []);

  // useEffect(() => {
  //   setInviteLink(window.location.href);
  // }, []);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("link copied to clipboard")
  };

  const [showDiv, setShowDiv] = useState(false);
  const [hasScrolledToTop, setHasScrolledToTop] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  useEffect(() => {
    setInviteLink(window.location.href);
    setSidebarOpen(false);
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
    window.addEventListener('hashchange', handleHashChange);

    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [showDiv, hasScrolledToTop])


  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(inviteLink);
    setShowDiv(true);
  }

  return (
    <div className="share-page">
      <div className="share-header">
        <button className="back-button simple">
          <Link to="/">
            <GrClose />
          </Link>
        </button>
      </div>

      <section className="section-common">
        <div className="center-item">
          <img src="/assets/images/reward.png" className="page-img" alt="" />
        </div>
        <p className="page-title pt-2 fw-bold text-center">
          Get referral rewards
        </p>
        <p className="para pt-1 text-center" style={{position : 'relative'}}>
          When your friends participate in AI arbitrage and rent mining
          machines, you can get referral rewards
          {showDiv && (
                            <div className={`transition-div ${showDiv ? 'show' : ''}`}><p>Copy successfully</p></div>
                          )}
        </p>
        <div className="copy-button-wrapper">
          <div className="copy-button">
            <div>{inviteLink}</div>
            <button onClick={copyToClipboard} className="copy-button-inner">
              Copy
            </button>
          </div>
        </div>
        <div className="share-button-wrapper">
          <button onClick={copyToClipboard} className="primary-button w-100">Share link</button>
        </div>
      </section>
    </div>
  );
};

export default Share;
