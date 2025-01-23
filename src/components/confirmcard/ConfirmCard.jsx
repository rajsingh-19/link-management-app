import React from 'react';
import styles from "./card.module.css";
import crossIcon from "../../assets/crossIcon.svg";

const ConfirmCard = ({ label, handleCloseModal, handleAction }) => {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.confirmation}>{`Are you sure, you want to ${label} the account ?`}</div>
        <div className={styles.btnsContainer}>
            <button onClick={handleCloseModal}>NO</button>
            <button onClick={handleAction}>YES</button>
        </div>
        <button onClick={handleCloseModal} className={styles.crossContainer}>
            <img src={crossIcon} alt="cross icon" />
        </button>
    </div>
  )
};

export default ConfirmCard;
