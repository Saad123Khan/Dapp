import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const Setup = ({ settingShow, handleSettingClose }) => {
  window.scrollTo(0, 0);
  return (
    <>
      <Modal
        show={settingShow}
        onHide={handleSettingClose}
        className="custom-modal"
        centered
      >
        <Modal.Header closeButton>
          {" "}
          <p className="modal-title pb-2">Set up</p>{" "}
        </Modal.Header>
        <Modal.Body>
        <Link onClick={handleSettingClose} className="setup-links">
          <div className="flex-space pb-2">
            <div className="flex-list no-gap">
              <img
                src="/assets/icons/notification.svg"
                className="setup-icon"
                alt=""
              />
              <p className="para dark">Notification</p>
            </div>
            <BsChevronRight className="setup_chevron" />
          </div>
          </Link>
          <Link to="/google" onClick={handleSettingClose} className="setup-links">
            <div className="flex-space pb-2">
              <div className="flex-list no-gap">
                <img
                  src="/assets/icons/google_2fa.svg"
                  className="setup-icon"
                  alt=""
                />
                <p className="para dark">Google 2FA</p>
              </div>
              <BsChevronRight className="setup_chevron" />
            </div>
          </Link>
          <Link onClick={handleSettingClose} className="setup-links"> 
          <div className="flex-space pb-2">
            <div className="flex-list no-gap">
              <img
                src="/assets/icons/global.svg"
                className="setup-icon"
                alt=""
              />
              <p className="para dark">English</p>
            </div>
            <BsChevronRight className="setup_chevron" />
          </div>
          </Link>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Setup;
