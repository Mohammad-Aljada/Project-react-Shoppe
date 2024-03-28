import { NavLink } from "react-router-dom";
import styles from "./filter.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

// eslint-disable-next-line react/prop-types
export default function Filter({ setProducts, setTotalpage, currentpage , setCurrentPage }) {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(4);
  const [selectedDisplay, setSelectedDisplay] = useState("4"); 
  const [minValue, setMin] = useState("");
  const [maxValue, setMax] = useState("");
  const [sort, setSort] = useState("");
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  
  const FilterProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`,
        {
          params: {
            page: currentpage,
            limit: limit,
            ...(search && { search }),
            ...(minValue && { "price[gte]": minValue }),
            ...(maxValue && { "price[lte]": maxValue }),
            ...(sort && { sort }),
          },
        }
      );
     setProducts(data.products)
      setTotalpage(Math.ceil(data.total / limit));
      setError("");
    } catch (error) {
      setError("Error loading products data");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    FilterProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentpage, limit, search, minValue, maxValue, sort]);

  const handleDisplayChange = (e) => {
    setSelectedDisplay(e.target.value);
    // Update products per page based on selected option
    setLimit(Number(e.target.value)); // Convert the value to a number
    setCurrentPage(1); // Reset current page to 1 when changing the display option
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      {error ?? <p className="error">{error}</p>}
      <aside className={styles.sidebar}>
        <button
          className="btn btn-secondary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <img src="/filter.svg" alt="filter icone" /> Filter
        </button>
        <div
          className="offcanvas offcanvas-start "
          tabIndex={-1}
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <NavLink
              to="/products"
              className="offcanvas-title"
              id="offcanvasRightLabel"
            >
              Filter
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
                  <label htmlFor="display">Display Product :</label>
                  <select
                    id="display"
                    name="dispaly"
                    value={selectedDisplay}
                    onChange={handleDisplayChange}
                  >
                    <option value="4">default</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </li>
                <li className="nav-item d-flex gap-2  align-items-center">
                  <label htmlFor="search">Sesrch</label>
                  <input
                    type="search"
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </li>
                <li className="nav-item d-flex gap-2  flex-column">
                  <span className="">Price Range :</span>
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor="min">Min</label>
                    <input
                      type="text"
                      id="min"
                      value={minValue}
                      onChange={(e) => setMin(e.target.value)}
                    />
                    <label htmlFor="max">Max</label>
                    <input
                      type="text"
                      id="max"
                      value={maxValue}
                      onChange={(e) => setMax(e.target.value)}
                    />
                  </div>
                </li>
                <li className="nav-item d-flex gap-2 align-items-center">
                  <label htmlFor="sort">Sort by :</label>
                  <select
                    name="sort"
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="">default</option>
                    <option value="price">Price</option>
                    <option value="-price">-Price</option>
                    <option value="name">name</option>
                    <option value="-name">-name</option>
                    <option value="rating">rating</option>
                    <option value="-rating">-rating</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
