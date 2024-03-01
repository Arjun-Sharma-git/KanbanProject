import React from "react";
import styles from "./logOut.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LogOut({ changelogOut }) {
  const navigate = useNavigate();

  const logOutUser = () => {
    try {
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.logOut}>
      <div className={styles.box}>
        <p className={styles.message}>Are you sure you want to Logout?</p>
        <p className={styles.yes} onClick={logOutUser}>
          Yes, Logout
        </p>
        <p className={styles.cancel} onClick={() => changelogOut(false)}>
          Cancel
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LogOut;
