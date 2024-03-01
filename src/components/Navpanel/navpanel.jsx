import React, { useState } from "react";
import styles from "./Navpanel.module.css";
import ProMangage from "../../assets/icons/ProManage.png";
import board from "../../assets/icons/board.png";
import settings from "../../assets/icons/settings.png";
import analytics from "../../assets/icons/analytics.png";
import Logout from "../../assets/icons/Logout.png";
import LogOut from "../Logout/logOut";

function Navpanel({ changeBoard }) {
  const [logOut, setLogOut] = useState(false);
  const changelogOut = (status) => {
    setLogOut(status);
  };
  return (
    <div className={styles.navBar}>
      <div className={styles.logoMain}>
        <img src={ProMangage} alt="logo" />
        <div className={styles.titleMain}>Pro Manage</div>
      </div>
      <div className={styles.logo} onClick={() => changeBoard("Board")}>
        <img src={board} alt="logo" />
        <div className={styles.title}>Board</div>
      </div>
      <div className={styles.logo} onClick={() => changeBoard("Analytics")}>
        <img src={analytics} alt="logo" />
        <div className={styles.title}>Analytics</div>
      </div>
      <div className={styles.logo} onClick={() => changeBoard("Settings")}>
        <img src={settings} alt="logo" />
        <div className={styles.title}>Settings</div>
      </div>
      <div
        className={styles.logOut}
        onClick={() => {
          changelogOut(true);
        }}
      >
        <img src={Logout} />
        <div className={styles.logOutTitle}>Log out</div>
      </div>
      {logOut && <LogOut changelogOut={changelogOut} />}
    </div>
  );
}

export default Navpanel;
