import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import style from "./categories.module.css";
export default function Catagories() {
  const [catagories, setCatagories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  const getCatagories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=9`
      );
      setCatagories(data.categories);
      setError("");
    } catch (error) {
      setError("error loading categories data");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getCatagories();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      {error ?? <p className="error">{error}</p>}
      <section className={style.Categorys}>
        <div className="container">
          <h2 className={style.title}>Categories</h2>
          <div className={style.category}>
            {catagories.length > 0 ? (
              catagories.map((catagory) => (
                <div className="col-lg-2 col-md-4 col-sm-6" key={catagory.id}>
                  <NavLink
                    to={`/Procategory/${catagory.id}`}
                    className={style.categLink}
                  >
                    <img
                      className={style.circularImage}
                      src={catagory.image.secure_url}
                      alt="slide image"
                    />
                    <span className={style.catTitle}>{catagory.name}</span>
                  </NavLink>
                </div>
              ))
            ) : (
              <h2>empty categories</h2>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
