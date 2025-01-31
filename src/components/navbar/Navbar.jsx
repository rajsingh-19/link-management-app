import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import sunIcon from "../../assets/sunIcon.png";
import searchIcon from "../../assets/searchIcon.svg";
import plusIcon from "../../assets/plusIcon.svg";
import { IoMdMoon } from "react-icons/io";
import { searchByRemarks } from "../../services";
import { toast } from 'react-toastify';

const Navbar = ({ handleCreateLink, setLinkData, setIsLinkPage }) => {
  const navigate = useNavigate();
  const [activeLogout, setActiveLogout] = useState(false);
  const [userName, setUserName] = useState("");
  const [shortName, setShortName] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [greeting, setGreeting] = useState("");
  const url = window.location.href;
  const lastPart = url.split("/").pop();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUserName = () => {
      const name = localStorage.getItem('name');
      setUserName(name);
      const firstTwoLetter = name.slice(0, 2).toUpperCase();
      setShortName(firstTwoLetter);
    };

    if (sessionStorage.getItem('searchQuery')) {
      setSearchText(sessionStorage.getItem('searchQuery'));
    };

    const formatDate = () => {
      const today = new Date();
      const options = { weekday: "short", month: "short", day: "numeric" };
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

  const handleChange = async (event) => {
    const value = event.target.value;
    setSearchText(value);

    if (lastPart === "links") {
      if (value === '' && sessionStorage.getItem('searchQuery')) {
        setIsLinkPage(false);
        sessionStorage.removeItem('searchResults');
        sessionStorage.removeItem('searchQuery');
        window.location.reload();
      } else if (value === '' && !sessionStorage.getItem('searchQuery')) {
        setIsLinkPage(false);
        sessionStorage.removeItem('searchResults');
        sessionStorage.removeItem('searchQuery');
      } else {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        setIsLinkPage(true);
        sessionStorage.removeItem('searchResults');
        sessionStorage.removeItem('searchQuery');

        try {
          const result = await searchByRemarks(userId, token, value);
          if (result.status === 200) {
            const data = await result.json();

            setLinkData(data.result);
          } else {
            setLinkData([]);
          }
        } catch (error) {
          console.error(error);
          toast.error("An unexpected error occurred.");
        };
      }
    } else if (lastPart !== "links") {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        if (value !== '') {
          const result = await searchByRemarks(userId, token, value);
          if (result.status === 200) {
            const data = await result.json();
            sessionStorage.setItem('searchQuery', value);
            sessionStorage.setItem('searchResults', JSON.stringify(data.result));
            navigate("/links");
          } else {
            toast.error("An unexpected error occurred.");
          }
        } else {
          sessionStorage.removeItem('searchResults');
          sessionStorage.removeItem('searchQuery');
        }
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred.");
      };
    }
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
          <input type="text" placeholder="Search by remarks" value={searchText}
            onChange={handleChange} />
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
