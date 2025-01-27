import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import sunIcon from "../../assets/sunIcon.png";
import searchIcon from "../../assets/searchIcon.svg";
import plusIcon from "../../assets/plusIcon.svg";
import { IoMdMoon } from "react-icons/io";

const Navbar = ({handleCreateLink}) => {
  const navigate = useNavigate();
  const [activeLogout, setActiveLogout] = useState(false);
  const [userName, setUserName] = useState("");
  const [shortName, setShortName] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [greeting, setGreeting] = useState("");

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

    const setTimeBasedGreeting = () => {
      const hours = new Date().getHours();
      if (hours < 12) {
        setGreeting("Good morning");
      } else if (hours < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    fetchUserName();
    setCurrentDate(formatDate());
    setTimeBasedGreeting(); 
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
          {
            greeting === "Good evening" ?
            <IoMdMoon className={styles.moonIcon} /> :
            <img className={styles.sunIcon} src={sunIcon} alt="sun icon" />
          }
        </div>
        <div>
          <p>{greeting}, {userName}</p>
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
