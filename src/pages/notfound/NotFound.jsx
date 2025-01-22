import React from 'react';
import styles from "./notfound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFound;
