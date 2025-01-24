import React, { useState } from 'react';
import styles from "./dashboard.module.css";
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const Dashboard = () => {
  const [clicksData, setClicksData] = useState([]);
  // const [data, setData] = useState(false);
  const [data, setData] = useState(true);

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
          {
            data && (
              <div className={styles.countContainer}>
                <div className={styles.clicksCountContainer}>
                  <span>Total Clicks</span>             
                  <span>1234</span>
                </div>
                <div className={styles.clicksInfoCardsContainer}>
                  <div>
                    <div>Date-wise Clicks</div>
                    <div className={styles.datewiseContainer}>
                      <div>
                        <span>21-01-25</span>
                        <div className={styles.progressbarContainer}>---</div>
                        <span>1234</span>
                      </div>
                      <div>
                        <span>20-01-25</span>
                        <div className={styles.progressbarContainer}>---</div>
                        <span>1140</span>
                      </div>
                      <div>
                        <span>19-01-25</span>
                        <div className={styles.progressbarContainer}>---</div>
                        <span>134</span>
                      </div>
                      <div>
                        <span>18-01-25</span>
                        <div className={styles.progressbarContainer}>---</div>
                        <span>34</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>Click Devices</div>
                    <div className={styles.devicewiseContainer}>
                      <div>
                        <span>Mobile</span>
                        <div className={styles.progressbarContainer}>---</div>
                        <span>123</span>
                      </div>
                      <div>
                        <span>Desktop</span>
                        <div className={styles.progressbarContainer}>---</div>
                        <span>40</span>
                      </div>
                      <div>
                        <span>Tablet</span>
                        <div className={styles.progressbarContainer}>---</div>
                        <span>3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
