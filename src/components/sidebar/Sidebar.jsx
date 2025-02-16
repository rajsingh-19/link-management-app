import React from 'react';
import { useNavigate, useLocation } from "react-router-dom"
import styles from "./sidebar.module.css";
import cuvetteIcon from "../../assets/cuvetteIcon.svg";
import dashboardIcon from "../../assets/dashboardIcon.svg";
import linkIcon from "../../assets/link.svg";
import analyticsIcon from "../../assets/analytics.svg";
import settingIcon from "../../assets/setting.svg";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if the current path matches the route
    const isActive = (path) => location.pathname === path;

    const handleDashboard = () => {
        navigate('/dashboard');
    };

    const handlelinks = () => {
        navigate('/links');
    };

    const handleAnalytics = () => {
        navigate('/analytics');
    };

    const handleSettings = () => {
        navigate('/settings');
    };

  return (
    <div className={styles.sidebarContainer}>
        {/*             cuvette icon container   */}
        <div className={styles.iconContainer}>
            <div>
                <img src={cuvetteIcon} alt="cuvette icon" />
            </div>
        </div>
        {/*         navigation container         */}
        <div className={styles.navigationContainer}>
            <div className={`${isActive('/dashboard') ? styles.active : ''}`}>
                <img src={dashboardIcon} alt="dashboard icon" />
                <button onClick={handleDashboard}>
                    <span>Dashboard</span>
                </button>
            </div>
            <div className={`${isActive('/links') ? styles.active : ''}`}>
                <img src={linkIcon} alt="link icon" />
                <button onClick={handlelinks}>
                    <span>Links</span>
                </button>
            </div>
            <div className={`${isActive('/analytics') ? styles.active : ''}`}>
                <img src={analyticsIcon} alt="analytics icon" />
                <button onClick={handleAnalytics}>
                    <span>Analytics</span>
                </button>
            </div>
        </div>
        {/*         setting container            */}
        <div className={styles.settingContainer}>
            <div className={`${isActive('/settings') ? styles.active : ''}`}>
                <img src={settingIcon} alt="setting icon" />
                <button onClick={handleSettings}>
                    <span>Settings</span>
                </button>
            </div>
        </div>
    </div>
  )
};

export default Sidebar;
