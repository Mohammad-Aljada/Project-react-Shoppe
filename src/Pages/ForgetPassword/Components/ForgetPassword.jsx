import { useState } from "react";
import style from "./forgetpassword.module.css";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { object, string } from "yup";
import Loader from "../../../Components/Loader/Loader";
export default function ForgetPassword() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    code: "",
  });
  const [errors, setErrors] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const ValidationData = async () => {
    let userSchema = object({
      email: string().email().required("Please enter your email correct"),
      password: string().min(6).max(24).required("Please enter your password"),
      code: string().required("Please Enter Verification Code"),
    });
    try {
      await userSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      if (error.name === "ValidationError") {
        // Yup validation error
        const yupErrors = {};
        error.inner.forEach((err) => {
          yupErrors[err.path] = err.message;
        });
        setErrors(yupErrors);
      }
      setLoader(false);
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (await ValidationData()) {
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_API_URL}/auth/forgotPassword`,
          user
        );
        setUser({
          email: "",
          password: "",
          code: "",
        });
        if (data.message == "success") {
          toast.success("reset password successfuly!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
          navigate("/signin");
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      } finally {
        setLoader(false);
      }
    }
  };
  return (
    <>
      <section className={style.sendcode}>
        <div className="container">
          <div className={style.codeContent}>
            <h2 className={style.title}>Reset Password</h2>
            <p>Please Enter your new password and code </p>
            <form onSubmit={handleSubmit} className={style.forgetForm}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={user.email}
                id="email"
                name="email"
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={user.password}
                name="password"
                onChange={handleChange}
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
              <label htmlFor="code">Code</label>
              <input
                type="text"
                id="code"
                value={user.code}
                name="code"
                onChange={handleChange}
              />
              {errors.code && <div className="error">{errors.code}</div>}

              <button type="submit" disabled={loader ? "disabled" : null}>
                {!loader ? "Save" : <Loader />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
