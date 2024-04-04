import { NavLink } from "react-router-dom";
import style from "./PageNotFound.module.css";
export default function PageNotFound() {
  return (
    <>
      <section className={style.Error}>
        <div className="container">
          <div
            className={`${style.errorContent} col-lg-12 col-md-12 col-sm-12`}
          >
            <div className={style.errorImage}>
              <img src="/errorPage.webp" alt="Error Image"  />
            </div>
            <div className={style.errorInfo}>
              <h1>404</h1>
              <p>Page not found , Bye</p>
              <NavLink to="/">Back TO Home</NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
