import { NavLink, useParams } from "react-router-dom";
import style from "./products.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../Components/Loader/Loader";
export default function Products() {
  const { id } = useParams();
  const [Products, setProducts] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/category/${id}`
      );
      setProducts(data.products);
      setError("");
    } catch (error) {
      setError("error loading products data");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      {error ?? <p className="error">{error}</p>}
      <section className={style.products}>
        <div className="container">
          <h1 className={style.titlePro}>Products</h1>
          <div className={`col-lg-12 col-md-12 col-sm-12 ${style.Catproduct}`}>
            {Products.length > 0 ? (
              Products.map((product) => (
                <div key={product.id}>
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={product.mainImage.secure_url}
                      className={`card-img-top ${style.CardImage}`}
                      alt={product.name}
                    />

                    <div className={`card-body ${style.cartInfo}`}>
                      <h5 className={`cart-text ${style.cartTitle}`}>
                        {product.name}
                      </h5>
                      <p className={`cart-text ${style.cartDesc}`}>
                        {product.description.substring(0, 50)}...
                      </p>
                    </div>

                    <span className={`card-text ${style.price} `}>
                      {product.price}$
                    </span>
                    <span className={`card-text ${style.stock}`}>
                      stock :{product.stock}
                    </span>

                    <div className={`card-body ${style.CardBtn}`}>
                      <NavLink
                        to=""
                        className={`card-link ${style.btnDetiles} `}
                      >
                        Detiles
                      </NavLink>
                      <NavLink to="" className={`card-link ${style.btnCart} `}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className={`bi bi-cart ${style.cart}`}
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                        <span className={style.titleBtn}>Add To Cart</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2>empty data</h2>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
