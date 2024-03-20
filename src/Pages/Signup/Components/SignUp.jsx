import { useState } from "react";
import style from "./signup.module.css";
import axios from "axios";
import { object, string } from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";

export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };
  const ValidationData = async () => {
    let userSchema = object({
      userName: string()
        .required("Please enter your name")
        .min(6, "name at least 6 characters")
        .max(20, "name at top 20 characters"),
      email: string().email().required("Please enter your email"),
      password: string().min(6).max(24).required("Please enter your password"),
      image: string().required("Please select your image"),
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
      const formatData = new FormData();
      formatData.append("userName", user.userName);
      formatData.append("email", user.email);
      formatData.append("password", user.password);
      formatData.append("image", user.image);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/signup`,
          formatData
        );
        setUser({
          userName: "",
          email: "",
          password: "",
          image: "",
        });
        if (data.message == "success") {
          toast.success("Account  created successfully!", {
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
        if (error.response.status === 409) {
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
        }
      } finally {
        setErrors([]);
        setLoader(false);
      }
    }
  };
  return (
    <>
      <section className={style.Signup}>
        <div className="container">
          <div className={style.signupContent}>
            <div className={style.signupStart}>
              <div className={style.signupInfo}>
                <h2>Lets get started!</h2>
                <p>Sign up for to amazing ecommerce website</p>
              </div>
              <div className={style.signupStartLink}>
                <span>Already have an account?</span>
                <NavLink to="/signin"> Sign In </NavLink>
              </div>
            </div>

            <div className={style.signupFinal}>
              <h1>SIGN UP </h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Username</label>
                <input
                  type="text"
                  value={user.userName}
                  id="userName"
                  name="userName"
                  onChange={handleChange}
                />
                {errors.userName && (
                  <div className="error">{errors.userName}</div>
                )}

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
                  value={user.password}
                  id="password"
                  name="password"
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}

                <label>Image Profile</label>
                <input type="file" name="image" onChange={handleImageChange} />
                {errors.image && <div className="error">{errors.image}</div>}

                <button type="submit" disabled={loader ? "disabled" : null}>
                  {!loader ? "register" : <Loader />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
