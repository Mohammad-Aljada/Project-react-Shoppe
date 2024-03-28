import style from "./profile.module.css";
import { useEffect, useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import axios from "axios";
export default function InfoUser() {
  const [users, setUser] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("userToken");
  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setUser(data.user);
      setError("");
    } catch (error) {
      setError("error loading user data");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loader) {
    return <Loader />;
  }
  return (
    <>
      {error ?? <p className="error">{error}</p>}
      
        <div className="container d-flex flex-column justify-content-center ">
          <h2 className={style.title}>Account Information</h2>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
              <div className={style.infouserContent}>
                <div className={style.infouserImage}>
                  <img
                    className={style.userImage}
                    src={users.image.secure_url}
                    alt="User Image"
                  />
                </div>
                <div className={style.infouserInfo}>
                  <h3><span className="fs-5">UserName : </span>{users.userName}</h3>
                  <p><span className="fs-5">Email :</span> {users.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
}
