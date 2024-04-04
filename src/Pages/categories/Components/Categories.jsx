import { NavLink } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import style from "./categories.module.css";
import UseResource from "../../../CustomHook/UseResource";
import { Skeleton } from "@mui/material";
export default function Catagories() {
  const { catagories, error, loader } = UseResource(
    `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=9`
  );

  if (loader) {
    return <Loader />;
  }

  return (
  
    <section className={style.Categorys}>
      {error ?? <p className="error">{error}</p>}
      
        <div className="container">
          <h2>Categories</h2>
          <div className={style.category}>  {loader ? (
        // Render skeleton loading while categories are being fetched
        Array.from({ length: 6 }).map((_, index) => (
          <div className="col-lg-2 col-md-4 col-sm-6" key={index}>
            <Skeleton animation="wave" variant="rectangular" width={510} height={510} />
          </div>
        ))
      ) : (
        // Render categories when data is fetched
        catagories.length > 0 ? (
          catagories.map((category) => (
            <div className="col-lg-2 col-md-4 col-sm-6" key={category.id}>
              <NavLink
                to={`/Procategory/${category.id}`}
                className={style.categLink}
              >
                <img
                  className={style.circularImage}
                  src={category.image.secure_url}
                  alt={category.name}
                />
                <span className={style.catTitle}>{category.name}</span>
              </NavLink>
            </div>
          ))
        ) : (
          <h2>Empty categories</h2>
        )
      )}
          </div>
        </div>
      </section>
  );
}
