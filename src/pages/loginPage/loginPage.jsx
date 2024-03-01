import React from "react";
import Login from "../../components/Login/Login";
import loginImage from "../../assets/images/login.png";
import styles from "./loginPage.module.css";

function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img className={styles.image} src={loginImage} alt="Login cover" />
        <div className={styles.title}>
          <h1>Welcome aboard my friend</h1>
          <p>just a couple of clicks and we start</p>
        </div>
      </div>
      <Login />
    </div>
  );
}

export default LoginPage;
