import { useContext, useState } from "react";
import style from "./signin.module.css";
import axios from "axios";
import { object, string } from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";
import { UserContext } from "../../../context/User";
export default function SignIn() {
  const {setUserToken} = useContext(UserContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
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
      password: string().required("Please enter your password correct"),
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
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/signin`,
          user
        );
        setUser({
          email: "",
          password: "",
        });
        if (data.message == "success") {
          toast.success("Login Is successfully!", {
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
          localStorage.setItem("userToken", data.token);
          setUserToken(data.token);
          navigate("/");
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
      <section className={style.Signin}>
        <div className="container">
          <div className={style.signinContent}>
            <div className={style.signinStart}>
              <div className={style.signinInfo}>
                <h2>Lets get started!</h2>
                <p>Sign in for to amazing ecommerce website</p>
              </div>
              <div className={style.signinStartLink}>
                <span>don&apos;t Have a Account?</span>
                <NavLink to="/signup"> Sign up </NavLink>
              </div>
            </div>

            <div className={style.signinFinal}>
              <h1>SIGN IN </h1>
              <form onSubmit={handleSubmit}>
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

                <NavLink to="/sendcode" className="text-primary align-self-end">Forget Password?</NavLink>

                <button type="submit" disabled={loader ? "disabled" : null}>
                  {!loader ? "Login" : <Loader />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
