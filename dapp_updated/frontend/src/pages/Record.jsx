import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Record = ({ setSidebarOpen }) => {
    window.scrollTo(0, 0)
    useEffect(() => {
      setSidebarOpen(false);
    }, []);
  
    return (
      <div className="record-page">
        <div className="record-header page-header">
          <div className="back-button-wrapper" style={{display: 'flex', justifyContent : "center"}}>
            <button className="back-button simple">
              <Link to="/recharge">
                <img src="/assets/icons/back.svg" alt="" width={'32px'}/>
              </Link>
            </button>
          </div>
          <div className="record-header-inner">
            <p className="section-name text-center">Transaction Record</p>
          </div>
        </div>
        
        <section className="section-common">
          <div className="center-item">
            <img
              src="/assets/images/no_data.png"
              className="img-no-data"
              alt=""
            />
            <p className="main-subtitle dark muted-xl">No Data</p>
          </div>
        </section>
      </div>
    );
  };
  
  export default Record