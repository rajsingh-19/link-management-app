import React from 'react';
import styles from "./link.module.css";

const LinkModal = ({handleCloseModal}) => {
  return (
    <div>
        link modal
        <button onClick={handleCloseModal}>Close</button>
    </div>
  )
};

export default LinkModal;
