import React, {useState} from "react";
import styles from "./navbar.module.css";
import sunIcon from "../../assets/sunIcon.png";
import searchIcon from "../../assets/searchIcon.svg";
import plusIcon from "../../assets/plusIcon.svg";

const Navbar = () => {
  const [activeLogout, setActiveLogout] = useState(false);

  const handleNameClick = () => {
    setActiveLogout((prev) => !prev);
  }


  return (
    <nav className={styles.navContainer}>
      {/*       left section     */}
      <div className={styles.greetContainer}>
        <div>
          <img className={styles.sunIcon} src={sunIcon} alt="sun icon" />
        </div>
        <div>
          <p>Good morning, Sujith</p>
          <p>Tue, Jan 25</p>
        </div>
      </div>
      {/*     right section      */}
      <div className={styles.rightContainer}>
        <div>
          <button>
            <img src={plusIcon} alt="plus icon" />
            Create new
          </button>
        </div>
        <div>
          <img src={searchIcon} alt="search icon" />
          <input type="text" placeholder="Search by remarks" />
        </div>
        <div>
          <button onClick={handleNameClick}>RS</button>
        </div>
      </div>
      {
        activeLogout && <button className={styles.logout} >Logout</button>
      }
    </nav>
  );
};

export default Navbar;
