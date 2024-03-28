import { NavLink } from "react-router-dom";
import style from "./profile.module.css";

export default function ContactUs() {
  return (
    <>
      <div className="container">
        <h2>Contact Us</h2>
        <div
          className={` ${style.contactContent} d-flex flex-column gap-3 flex-wrap`}
        >
          <div
            className={`${style.email} d-flex gap-2  align-items-center flex-wrap`}
          >
            <img
              className={style.emailImage}
              src="/mail.svg"
              alt="email icone"
            />
            <h5 className={style.emailTitle}>Email :</h5>
            <NavLink className={style.linkEmail} to="mailto:m">
              mohammadaljad.1234@gmail.com
            </NavLink>
          </div>
          <div
            className={`${style.phone} d-flex  align-items-center flex-wrap`}
          >
            <img
              className={style.phoneImage}
              src="/phone.svg"
              alt="phone icone"
            />
            <h5 className={style.phoneTitle}>Phone :</h5>
            <NavLink className={style.linkPhone} to="tel:+972568524048">
              +972568524048
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
