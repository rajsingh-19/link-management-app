import React, { useState, useEffect } from "react";
import styles from "./analytics.module.css";
import { getAllClicks } from "../../services/index";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import LinkModal from "../../modals/link/LinkModal";
import sortingIcon from "../../assets/sortingIcon.svg";
import { toast } from "react-toastify";

const Analytics = () => {
  const [clicksData, setClicksData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  useEffect(() => {
    const fetchClicksData = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
  
      try {
        const res = await getAllClicks(userId, currentPage, token);

        if (res.status === 200) {      
          const data = await res.json();
          const clicksArr = data.result;
          const { totalItems } = data; 

          // Set total items and calculate total pages
          setTotalItems(totalItems);
          setTotalPages(Math.ceil(totalItems / 8));
          setClicksData(clicksArr);
          setCurrentPage(currentPage);
        } else {
          const errorData = await res.json();
          const errorMessage = errorData.message || "An error occurred";
          toast.error(errorMessage);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    fetchClicksData(currentPage);
  },[currentPage, modalStatus]);

  //      function for open the create link
  const handleCreateLink = () => {
    setModalStatus(true);
  };
  
  const handleCloseModal = () => {
    setModalStatus(false);
  };
  
  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    };
  };

  // Function to sort clicksData by timeStamp
  const handleSort = () => {
    const sortedData = [...clicksData].sort((a, b) => {
      const dateA = new Date(a.click.clickedAt);
      const dateB = new Date(b.click.clickedAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setClicksData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sorting order
  };

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.sidebarSection}>
        <Sidebar />
      </div>
      <div className={styles.pageSection}>
        <div className={styles.navContainer}>
          <Navbar handleCreateLink={handleCreateLink} />
        </div>
        <div className={styles.contentContainer}>
          <table className={styles.linkTable}>
            <thead>
              <tr>
                <th className={styles.timeStampHead}>
                  <span>Timestamp</span>
                  <img onClick={handleSort} className={styles.sortingIcon} src={sortingIcon} alt="sort icon" />                  
                </th>
                <th className={styles.originalHead}>Original Link</th>
                <th className={styles.shortenHead}>Short Link</th>
                <th className={styles.ipHead}>ip address</th>
                <th className={styles.deviceHead}>User Device</th>
              </tr>
            </thead>
            <tbody>
              {
                clicksData && clicksData.length > 0 && (
                  clicksData.map((click, index) => (
                    <tr key={index}>
                      <td className={styles.timeStampData}>
                        {new Date(click.click.clickedAt).toLocaleString("en-US", {
                          month: "short", // 'Jan'
                          day: "2-digit", // '14'
                          year: "numeric", // '2025'
                          hour: "2-digit", // '16'
                          minute: "2-digit", // '30'
                          hour12: false, // 24-hour format (remove this if you want 12-hour format with AM/PM)
                        })}  
                      </td>
                      <td className={styles.originalData}>{click.originalUrl}</td>
                      <td className={styles.shortenData}>{click.shortenUrl}</td>
                      <td className={styles.ipAddData}>{click.click.ipAddress}</td>
                      <td className={styles.userDeviceData}>{click.click.userDevice}</td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
          {/*       pagination container     */}
          <div className={styles.paginationContainer}>
            {/* Left Arrow Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${currentPage === 1 ? styles.disabledButton : ""}`}
              style={{
                color: currentPage === 1 ? "#C4CDD5" : "",
                backgroundColor: currentPage === 1 ? "#919EAB" : "",
              }}
            >
              <span>&lt;</span>
            </button>
            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1; // Page numbers start from 1
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={currentPage === page ? styles.activeButton : ''}
                  style={{
                    color: currentPage === page ? 'blue' : '',
                  }}
                >
                  {page}
                </button>
              );
            })}
            {/* Right Arrow Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages ? styles.disabledButton : ""
              }`}
              style={{
                color: currentPage === totalPages ? "#C4CDD5" : "",
                backgroundColor: currentPage === totalPages ? "#919EAB" : "",
              }}
            >
              <span>&gt;</span>
            </button>
          </div>
        </div>
      </div>
      {/*             create link modal        */}
      {modalStatus && (
          <div className={styles.modalViewContainer}>
            <LinkModal handleCloseModal={handleCloseModal} />
          </div>
        )
      }
    </div>
  );
};

export default Analytics;
