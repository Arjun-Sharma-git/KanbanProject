import { useEffect, useState } from "react";
import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/auth";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { registerSchema } from "../schemas";
import user from "../../assets/icons/user.png";
import eye from "../../assets/icons/eye.png";
import hide from "../../assets/icons/hide.png";
import lock from "../../assets/icons/lock.png";
import email from "../../assets/icons/email.png";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleOldPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleNewPassword = () => {
    setShowNewPassword((prevShowPassword) => !prevShowPassword);
  };
  const registerHandler = async (data) => {
    try {
      const response = await registerUser({ ...data });
      if (response) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userName", response.name);
        toast.success("User Registered Successfully", {
          onClose: () => navigate("/Dashboard"),
        });
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const redirectToLoginPage = () => {
    navigate("/");
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: registerSchema,
      onSubmit: async (values, action) => {
        console.log(values);
        action.resetForm();
        await registerHandler(values);
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
      <h1 className={styles.h1}>Register</h1>
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
        ></input>
      </div>
      {errors.name && touched.name ? (
        <p className={styles.error}>{errors.name}</p>
      ) : null}
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
        />
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
        ></input>
        <img
          src={showPassword ? hide : eye}
          className={styles.rightImg}
          alt="Toggle password visibility"
          onClick={toggleOldPassword}
        />
      </div>
      {errors.password && touched.password ? (
        <p className={styles.error}>{errors.password}</p>
      ) : null}
      <div className={styles.input}>
        <img src={lock} className={styles.leftImg} />
        <input
          type={showNewPassword ? "text" : "password"}
          autoComplete="off"
          name="confirm_password"
          placeholder="Confirm Password"
          value={values.confirm_password}
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        <img
          src={showNewPassword ? hide : eye}
          className={styles.rightImg}
          alt="Toggle password visibility"
          onClick={toggleNewPassword}
        />
      </div>
      {errors.confirm_password && touched.confirm_password ? (
        <p className={styles.error}>{errors.confirm_password}</p>
      ) : null}
      <button type="submit" onClick={handleSubmit} className={styles.button}>
        Register
      </button>
      <p className={styles.footer}>Have an Account?</p>
      <button onClick={redirectToLoginPage} className={styles.button2}>
        Log in
      </button>
      <ToastContainer autoClose={1000} pauseOnHover={false} />
    </div>
  );
}

export default Register;
