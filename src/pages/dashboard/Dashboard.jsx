import React, { useEffect, useState } from 'react';
import styles from "./dashboard.module.css";
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import LinkModal from '../../modals/link/LinkModal';
import ProgressBar from '../../components/progressBar/ProgressBar';
import { toast } from 'react-toastify';
import { getAllClicksForDashboard } from '../../services';

const Dashboard = () => {
  const [clicksData, setClicksData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [totalClicks, setTotalClicks] = useState(0);
  const [data, setData] = useState(true);
  const userId = localStorage.getItem('userId');
  const [dateClicks, setDateClicks] = useState([]);
  const [deviceCounts, setDeviceCounts] = useState({
    Mobile: 0,
    Desktop: 0,
    Tablet: 0,
  });

  useEffect(() => {
    fetchAllClicks();
  }, []);

  const fetchAllClicks = async () => {
    const token = localStorage.getItem('token');
    try {
      const result = await getAllClicksForDashboard(userId, token);
      if (result.status === 200) {
        const data = await result.json();

        setTotalClicks(data.result.length);
        setClicksData(data.result);
      } else {
        const error = await result.json();
        const errorMessage = error.message || "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    };
  };

  useEffect(() => {
    const processData = () => {
      const dateClicksMap = {};
      const userDeviceCounts = { Mobile: 0, Desktop: 0, Tablet: 0 };

      const categorizeDevice = (userDevice) => {
        if (userDevice.includes("Mobile")) return "Mobile";
        if (userDevice.includes("Tablet")) return "Tablet";
        return "Desktop";
      };

      clicksData.forEach((record) => {
        const { clickedAt, userDevice } = record.click;
        const date = clickedAt.split("T")[0];

        // Count clicks per date
        dateClicksMap[date] = (dateClicksMap[date] || 0) + 1;

        // Categorize and count user devices
        const category = categorizeDevice(userDevice);
        userDeviceCounts[category] += 1;
      });

      // Sort dates (oldest first) and accumulate clicks
      const sortedDates = Object.entries(dateClicksMap)
        .map(([date, count]) => ({ date, noOfClicks: count }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      const accumulatedDateClicks = [];
      let cumulativeClicks = 0;

      for (const entry of sortedDates) {
        cumulativeClicks += entry.noOfClicks;
        accumulatedDateClicks.push({ date: entry.date, noOfClicks: cumulativeClicks });
      }

      // Reverse the accumulated array to show latest dates first
      setDateClicks(accumulatedDateClicks.reverse());
      setDeviceCounts(userDeviceCounts);
    };

    processData();
  }, [clicksData]);

  //      function for creating the link
  const handleCreateLink = () => {
    setModalStatus(true);
  };

  //      function for closing the modal
  const handleCloseModal = () => {
    setModalStatus(false);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebarSection}>
        <Sidebar />
      </div>
      <div className={styles.pageSection}>
        <div className={styles.navContainer}>
          <Navbar handleCreateLink={handleCreateLink} />
        </div>
        <div className={styles.contentContainer}>
          {
            data && (
              <div className={styles.countContainer}>
                <div className={styles.clicksCountContainer}>
                  <span>Total Clicks</span>
                  <span>{totalClicks}</span>
                </div>
                <div className={styles.clicksInfoCardsContainer}>
                  <div>
                    <div>Date-wise Clicks</div>
                    <div className={styles.datewiseContainer}>
                      {dateClicks.map((dateObj, index) => (
                        <div key={index}>
                          <span>{dateObj.date}</span>
                          <ProgressBar progress={dateObj.noOfClicks} height={20} bgcolor="blue" />
                          <span>{dateObj.noOfClicks}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div>Click Devices</div>
                    <div className={styles.devicewiseContainer}>
                      <div>
                        <span>Mobile</span>
                        <ProgressBar progress={deviceCounts.Mobile} height={20} bgcolor="blue" />
                        <span>{deviceCounts.Mobile}</span>
                      </div>
                      <div>
                        <span>Desktop</span>
                        <ProgressBar progress={deviceCounts.Desktop} height={20} bgcolor="blue" />
                        <span>{deviceCounts.Desktop}</span>
                      </div>
                      <div>
                        <span>Tablet</span>
                        <ProgressBar progress={deviceCounts.Tablet} height={20} bgcolor="blue" />
                        <span>{deviceCounts.Tablet}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
      {/*             Modal Container          */}
      {modalStatus && (
        <div className={styles.modalViewContainer}>
          <LinkModal handleCloseModal={handleCloseModal} />
        </div>
      )
      }
    </div>
  )
};

export default Dashboard;
