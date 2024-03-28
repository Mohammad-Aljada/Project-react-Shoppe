import { NavLink, useParams } from "react-router-dom";
import style from "./products.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../Components/Loader/Loader";
import { Slide, toast } from "react-toastify";
import { useCart } from "../../../CustomHook/UseCart";

export default function CategoryProducts() {
  const { id } = useParams();
  const [Products, setProducts] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const controller = new AbortController();
  const signal = controller.signal;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/category/${id}`,
        {
          signal,
        }
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

    return () => {
      controller.abort();
    };
  }, [controller, cart]);

  if (loader) {
    return <Loader />;
  }

  const AddToCart = async (productId) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("plz  login first", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message == "success") {
        toast.success("Add to cart Is successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        setCart(cart + 1);
      }
    } catch (error) {
      if (error.response.data.message === "product already exists") {
        toast.error(error.response.data.message, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
    }
  };

  return (
    <>
      {error ?? <p className="error">{error}</p>}
      <section className={style.products}>
        <div className="container">
          <h1 className={style.titlePro}>Products</h1>
          <div className={`col-lg-12 col-md-12 col-sm-12 ${style.Catproduct}`}>
            {Products.length > 0 ? (
              Products.map((product) => (
                <div className={style.product} key={product.id}>
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
                        to={`/product/${product.id}`}
                        className={`card-link ${style.btnDetiles} `}
                      >
                        Detiles
                      </NavLink>
                      <button
                        onClick={() => AddToCart(product._id)}
                        className={`card-link ${style.btnCart} `}
                      >
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
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2>empty Products</h2>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
