import { useState } from "react";
import style from "./forgetpassword.module.css";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { object, string } from "yup";
import Loader from "../../../Components/Loader/Loader";
export default function SendCode() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
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
          `${import.meta.env.VITE_API_URL}/auth/sendcode`,
          user
        );
        setUser({
          email: "",
        });
        if (data.message == "success") {
          toast.success(
            "Check code in your email and email correct successfully!",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Slide,
            }
          );
          navigate("/forgetpassword");
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
            <h2 className={style.title}>Forget Password</h2>
            <p>Please Enter email address registered for reset password</p>
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

              <button type="submit" disabled={loader ? "disabled" : null}>
                {!loader ? "Send Code" : <Loader />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
