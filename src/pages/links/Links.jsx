import React from 'react';
import styles from "./links.module.css";
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const Links = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebarSection}>
        <Sidebar />
      </div>
      <div className={styles.pageSection}>
        <div className={styles.navContainer}>
          <Navbar />
        </div>
        <div className={styles.contentContainer}>
          Links
        </div>
      </div>
    </div>
  )
};

export default Links;
