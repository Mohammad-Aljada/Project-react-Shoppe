import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { UserContext } from "../../context/User";
import { useCart } from "../../CustomHook/UseCart";


export default function Navbar() {
  const { userName, setUserToken, setUserName } = useContext(UserContext);
  const cart = useCart();

  const Logout = () => {
    localStorage.removeItem("userToken");
    setUserName(null);
    setUserToken(null);
  };
  return (
    <>
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-light shadow p-3 mb-5 bg-body rounded ">
            <div className="container-fluid nav">
              <NavLink className="navbar-brand " to="/">
                <img className="logo" src="/logo.svg" alt="Shoppe Logo" />
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse navlinks"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 link">
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/products">
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/categories">
                      Categories
                    </NavLink>
                  </li>
                </ul>

                <ul className="navbar-nav nav-user">
                  {userName ? (
                    <>
                      <li className="nav-item">
                        <NavLink className="nav-link cart" to="/cart">
                          <img src="/cart.svg" alt="cart icone" />
                          <span className="cart">
                            Cart <span className="countItems">{cart}</span>
                          </span>
                        </NavLink>
                      </li>
                      <li className="nav-item dropdown">
                        <button
                          className="nav-link dropdown-toggle"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {userName}
                        </button>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <NavLink className="nav-link profile" to="/profile">
                              <img src="/user.svg" alt="user icone" />
                              Profile
                            </NavLink>
                          </li>

                          <li></li>
                          <li className="nav-item">
                            <button
                              className="text-danger logout"
                              onClick={Logout}
                            >
                              <img src="/signout.svg" alt="logout icone" />
                              Logout
                            </button>
                          </li>
                          <li></li>
                        </ul>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item dropdown">
                        <button
                          className="nav-link dropdown-toggle"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Account
                        </button>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <NavLink className="nav-link signin" to="/signin">
                              <img src="/signin.svg" alt="login icone" />
                              Signin
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink className="nav-link signup" to="/signup">
                              <img src="/signup.svg" alt="register icone" />
                              Signup
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
