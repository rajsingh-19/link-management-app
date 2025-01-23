import React from 'react';
import styles from "./analytics.module.css";
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const Analytics = () => {
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
          Analytics
        </div>
      </div>
    </div>
  )
};

export default Analytics;
