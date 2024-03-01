import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../apis/auth";
import styles from "./settingsPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { userUpdateSchema } from "../schemas";
import user from "../../assets/icons/user.png";
import lock from "../../assets/icons/lock.png";
import eye from "../../assets/icons/eye.png";
import hide from "../../assets/icons/hide.png";

function SettingsPage() {
  const initialValues = {
    name: localStorage.getItem("userName"),
    oldPassword: "",
    newPassword: "",
  };

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleOldPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleNewPassword = () => {
    setShowNewPassword((prevShowPassword) => !prevShowPassword);
  };

  const userUpdateHandler = async ({ ...data }) => {
    try {
      const response = await updateUser(data);
      console.log(response);
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
      toast.success("User Details Updated Successfully", {
        autoClose: 500,
        pauseOnHover: false,
        onClose: () => {
          navigate("/");
        },
      });
    } catch (err) {
      toast.error(err.message, {
        autoClose: 1500,
        pauseOnHover: false,
      });
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: userUpdateSchema,
      onSubmit: async (values, action) => {
        console.log(values);
        action.resetForm();
        await userUpdateHandler(values);
      },
    });
  console.log(errors);

  console.log(initialValues);
  return (
    <div className={styles.settingsPage}>
      <h2 className={styles.title}>Settings</h2>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <img className={styles.leftImg} src={user} />
          <input
            type="name"
            autoComplete="off"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.name && touched.name ? (
          <p className={styles.error}>{errors.name}</p>
        ) : null}
        <div className={styles.input}>
          <img src={lock} className={styles.leftImg} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Old Password"
            name="oldPassword"
            autoComplete="off"
            value={values.oldPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <img
            src={showPassword ? hide : eye}
            className={styles.rightImg}
            alt="Toggle password visibility"
            onClick={toggleOldPassword}
          />
        </div>
        {errors.oldPassword && touched.oldPassword ? (
          <p className={styles.error}>{errors.oldPassword}</p>
        ) : null}
        <div className={styles.input}>
          <img src={lock} className={styles.leftImg} />
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            name="newPassword"
            autoComplete="off"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <img
            src={showNewPassword ? hide : eye}
            className={styles.rightImg}
            alt="Toggle password visibility"
            onClick={toggleNewPassword}
          />
        </div>
        {errors.newPassword && touched.newPassword ? (
          <p className={styles.error}>{errors.newPassword}</p>
        ) : null}
        <button className={styles.update} type="submit">
          Update
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SettingsPage;
