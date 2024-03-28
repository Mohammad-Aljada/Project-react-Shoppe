import { NavLink } from "react-router-dom";
import style from "./Sidebar.module.css";
export default function Sidebar() {
  return (
    <>
      <aside className={style.sidebar}>
        <button
          className="btn btn-secondary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <img src="/burgerIcone.svg" alt="burger icone" /> Menu
        </button>
        <div
          className="offcanvas offcanvas-start "
          tabIndex={-1}
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <NavLink
              to="/profile"
              className="offcanvas-title"
              id="offcanvasRightLabel"
            >
              Profile
            </NavLink>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <div
              className="d-flex flex-column flex-shrink-0 p-3 "
              style={{ width: 280 }}
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 link gap-4">
                <li className="nav-item d-flex gap-2 align-items-center">
                  <img src="/user.svg" alt="user icone" />
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `${style.active}` : `${style.Normal}`
                    }
                    aria-current="page"
                    to="/profile/userinfo"
                  >
                    Account Information
                  </NavLink>
                </li>
                <li className="nav-item d-flex gap-2 align-items-center">
                  <img src="/order.svg" alt="order icone" />
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `${style.active}` : `${style.Normal}`
                    }
                    to="/profile/orders"
                  >
                    Orders
                  </NavLink>
                </li>
                <li className="nav-item d-flex gap-2 align-items-center">
                  <img src="/contactus.svg" alt="contact us icone" />
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `${style.active}` : `${style.Normal}`
                    }
                    to="/profile/contactus"
                  >
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
