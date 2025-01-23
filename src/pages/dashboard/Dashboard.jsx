import React from 'react';
import styles from "./dashboard.module.css";
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebarSection}>
        <Sidebar />
      </div>
      <div className={styles.pageSection}>
        {/* <div className={styles.navContainer}> */}
          <Navbar />
        {/* </div> */}
        <div className={styles.contentContainer}>
          dahsboard
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
