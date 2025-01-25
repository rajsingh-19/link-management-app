import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import sunIcon from "../../assets/sunIcon.png";
import searchIcon from "../../assets/searchIcon.svg";
import plusIcon from "../../assets/plusIcon.svg";

const Navbar = ({handleCreateLink}) => {
  const navigate = useNavigate();
  const [activeLogout, setActiveLogout] = useState(false);
  const [userName, setUserName] = useState("");
  const [shortName, setShortName] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchUserName = () => {
      const name = localStorage.getItem('name');
      setUserName(name);
      const firstTwoLetter = name.slice(0, 2).toLocaleUpperCase();
      setShortName(firstTwoLetter);
    };

    const formatDate = () => {
      const today = new Date();
      const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
      return today.toLocaleDateString("en-US", options);
    };

    fetchUserName();
    setCurrentDate(formatDate());
  }, []);

  const handleNameClick = () => {
    setActiveLogout((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className={styles.navContainer}>
      {/*       left section     */}
      <div className={styles.greetContainer}>
        <div>
          <img className={styles.sunIcon} src={sunIcon} alt="sun icon" />
        </div>
        <div>
          <p>Good morning, {userName}</p>
          <p>{currentDate}</p>
        </div>
      </div>
      {/*     right section      */}
      <div className={styles.rightContainer}>
        <div>
          <button onClick={handleCreateLink}>
            <img src={plusIcon} alt="plus icon" />
            Create new
          </button>
        </div>
        <div>
          <img src={searchIcon} alt="search icon" />
          <input type="text" placeholder="Search by remarks" />
        </div>
        <div>
          <button onClick={handleNameClick}>{shortName}</button>
        </div>
      </div>
      {
        activeLogout && <button className={styles.logout} onClick={handleLogout}>Logout</button>
      }
    </nav>
  );
};

export default Navbar;
