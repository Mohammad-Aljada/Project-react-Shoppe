import { NavLink } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import style from "./categories.module.css";
import UseResource from "../../../CustomHook/UseResource";
export default function Catagories() {
  const { catagories, error, loader } = UseResource(
    `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=9`
  );

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
                      alt={catagory.name}
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
