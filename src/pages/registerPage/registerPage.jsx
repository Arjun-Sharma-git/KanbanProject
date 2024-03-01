import React from "react";
import Register from "../../components/register/register";
import loginImage from "../../assets/images/login.png";
import styles from "./registerPage.module.css";

function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img className={styles.image} src={loginImage} alt="Register cover" />
        <div className={styles.title}>
          <h1>Welcome aboard my friend</h1>
          <p>just a couple of clicks and we start</p>
        </div>
      </div>
      <Register />
    </div>
  );
}

export default RegisterPage;
