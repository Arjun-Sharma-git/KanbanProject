import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/auth";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import eye from "../../assets/icons/eye.png";
import hide from "../../assets/icons/hide.png";
import lock from "../../assets/icons/lock.png";
import email from "../../assets/icons/email.png";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const loginHandler = async (data) => {
    try {
      const response = await loginUser({ ...data });

      if (response) {
        localStorage.setItem("userName", response.name);
        localStorage.setItem("token", response.token);
        toast.success("Logged in Successfully", {
          onClose: () => navigate("/Dashboard"),
        });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        console.log(values);
        action.resetForm();
        await loginHandler(values);
      },
    });
  console.log(errors);
  useEffect(() => {
    const item = localStorage.getItem("token");
    if (item) {
      navigate("/Dashboard");
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Login</h1>
      <div className={styles.input}>
        <img className={styles.leftImg} src={email} />
        <input
          type="email"
          autoComplete="off"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
      </div>
      {errors.email && touched.email ? (
        <p className={styles.error}>{errors.email}</p>
      ) : null}
      <div className={styles.input}>
        <img src={lock} className={styles.leftImg} />
        <input
          type={showPassword ? "text" : "password"}
          autoComplete="off"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <img
          src={showPassword ? hide : eye}
          className={styles.rightImg}
          alt="Toggle password visibility"
          onClick={togglePassword}
        />
      </div>
      {errors.password && touched.password ? (
        <p className={styles.error}>{errors.password}</p>
      ) : null}
      <button type="submit" onClick={handleSubmit} className={styles.button}>
        Log In
      </button>
      <p className={styles.footer}>Have no account yet?</p>
      <button onClick={() => navigate("/register")} className={styles.button2}>
        Register
      </button>
      <ToastContainer autoClose={1000} pauseOnHover={false} />
    </div>
  );
}

export default Login;
