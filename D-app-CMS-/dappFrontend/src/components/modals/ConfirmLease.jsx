import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";
const { ethereum } = window;

import FirebaseStack from "../../firebase";
import { ref, get, child, set } from "firebase/database";

const ConfirmLease = ({
  show,
  handle,
  handleHide,
  MiningObj,
  currentAccount,
  balance, 
  total,
  getDatabaseFunction
}) => {
  
  const dbRef = ref(FirebaseStack());
  
  const { quantity, price } = MiningObj[0];
  
  const [wait, setWait] = useState(false);


  const storeDataInFirebase = async () => {
    setWait(true);
    try {
      const snapshot = await get(
        child(dbRef, `WalletAddressAndAmount/${currentAccount}/Mining/current`)
      );
      if (snapshot.exists()) {
        await set(
          child(
            dbRef,
            `WalletAddressAndAmount/${currentAccount}/Mining/current/${
              snapshot.val().length
            }/`
          ),
          MiningObj
        );
        var amountSection = {
          amount: balance - total,
          wallet: currentAccount,
        };
        await set(
          child(dbRef, `WalletAddressAndAmount/${currentAccount}/0`),
          amountSection
        );

        setWait(false);
        getDatabaseFunction();
        handleHide();
        handle();
      } else {
        await set(
          child(
            dbRef,
            `WalletAddressAndAmount/${currentAccount}/Mining/current/0/`
          ),
          MiningObj
        );

        var amountSection = {
          amount: balance - total,
          wallet: currentAccount,
        };
        await set(
          child(dbRef, `WalletAddressAndAmount/${currentAccount}/0`),
          amountSection
        );
        setWait(false);
        getDatabaseFunction();
        handleHide();
        handle();
      }
    } catch (error) {
      setWait(false);
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleHide}
        className="custom-modal confirm-lease"
        centered
      >
        <Modal.Header>
          <div className="center-x w-100 pb-2">
            <img src="/assets/icons/confirm.svg" className="modal-img" alt="" />
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-semibold text-center">
            <span className="light-green"> {quantity * price} </span>
            <span>USDT</span>
          </p>
          <p className="section-name mx-auto text-center fw-semibold">
            Your escrow amountMining <br /> machine leasing
          </p>

          <div className="center-x pt-2">
            <button
              onClick={storeDataInFirebase}
              className="primary-button"
              disabled={wait}
            >
              Confirm
            </button>
          </div>
          <p className="modal-footer-text text-center  pt-2">
            {" "}
            The daily income of the miner will be automatically deposited into
            your wallet account{" "}
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmLease;
