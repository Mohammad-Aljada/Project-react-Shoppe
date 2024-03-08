import { NavLink } from "react-router-dom";
import "./Navbar.css"

export default function Navbar() {
  return (
    <>
    <header >
        <div className="container">
  <nav className="navbar navbar-expand-lg bg-light shadow p-3 mb-5 bg-body rounded ">
  <div className="container-fluid nav">
    <NavLink className="navbar-brand "to="/">
        <img className="logo" src="SHOPPE.svg" alt="Shoppe Logo" />
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse navlinks" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 link">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page"to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"to="/products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"to="/categories">Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"to="/cart">Cart</NavLink>
        </li>
    
      </ul>
      <form className="d-flex search" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-dark d-flex align-items-center" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></button>
      </form>
      <ul className="navbar-nav  auth">
      <li className="nav-item">
          <NavLink className="nav-link"to="/signin">Signin</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"to="/signup">Signup</NavLink>
        </li>
       
      </ul>
    </div>
  </div>
</nav>

        </div>
    </header>
    </>
  )
}
