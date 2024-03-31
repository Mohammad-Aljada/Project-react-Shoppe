import { NavLink } from "react-bootstrap";
import style from "./footer.module.css";
export default function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div
            className={`row align-items-start gap-3 flex-nowrap ${style.footerRow} `}
          >
            <div
              className={`col-lg-4 col-md-12 col-sm-12 d-flex flex-column align-items-start gap-2  ${style.footerLeft}`}
            >
              <div>
                <img className={style.footerlogo} src="/logo.svg" alt="logo" />
              </div>
              <div className={`d-flex flex-column gap-2  ${style.footerText}`}>
                <h3>Why People Like us!</h3>
                <p>
                  typesetting, remaining essentially unchanged. It was
                  popularised in the 2024s with the like Aldus PageMaker
                  including of Lorem Ipsum.
                </p>
              </div>
              <div className="d-flex gap-2 ">
                <a
                  href="https://www.facebook.com/mohammadaljada123"
                  className={style.social}
                >
                  <img src="/facebook.svg" alt="Facebook logo" />
                </a>
                <a
                  href="https://www.instagram.com/mohammadaljadaa"
                  className={style.social}
                >
                  <img src="/instgram.svg" alt="Instgarm logo" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohammad-aljada"
                  className={style.social}
                >
                  <img src="/linkedin.svg" alt="linkedin logo" />
                </a>
              </div>
            </div>
            <div
              className={`col-lg-8 col-md-12 col-sm-6 d-flex gap-2 pt-3 ${style.footerRight}`}
            >
              <div className="col-lg-4 col-md-4 col-sm-8 d-flex flex-column gap-2 text-center">
                <h3 className={style.linkTitle}>Home</h3>
                <ul className="list-unstyled d-flex flex-column gap-2  align-self-center">
                  <li className={style.link}>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className={style.link}>
                    <NavLink to="/products">Products</NavLink>
                  </li>
                  <li className={style.link}>
                    <NavLink to="/categories">Categories</NavLink>
                  </li>
                  <li className={style.link}>
                    <NavLink to="/signin">Sign In</NavLink>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-8 d-flex flex-column gap-2 text-center">
                <h3 className={style.linkTitle}>About</h3>
                <ul className="list-unstyled d-flex flex-column gap-2  align-self-center">
                  <li className={style.link}>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className={style.link}>
                    <NavLink to="/products">Products</NavLink>
                  </li>
                  <li className={style.link}>
                    <NavLink to="/categories">Categories</NavLink>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-8 d-flex flex-column gap-2 ">
                <h3 className={`text-center ${style.linkTitle}`}>Contact</h3>
                <ul className="list-unstyled d-flex d-flex flex-column gap-3 align-self-center ">
                  <li className={style.linkcontact}>
                    <img
                      className={style.emailImage}
                      src="/mail.svg"
                      alt="email icone"
                    />
                    <NavLink className={style.linkEmail} to="mailto:m">
                      mohammadaljad.1234@gmail.com
                    </NavLink>
                  </li>
                  <li className={style.linkcontact}>
                    <img
                      className={style.phoneImage}
                      src="/phone.svg"
                      alt="phone icone"
                    />
                    <NavLink className={style.linkPhone} to="tel:+972568524048">
                      +972568524048
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-center mt-3">
            Copy right 2023&copy; made by Mohammad Aljada
          </p>
        </div>
      </footer>
    </>
  );
}
