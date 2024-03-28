import { NavLink } from "react-router-dom";
import style from "./products.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../Components/Loader/Loader";
import { Slide, toast } from "react-toastify";
import PaginationComp from "../../../Components/Pagination/PaginationComp";

import Filter from "../../../Components/Filter/Filter";
import { Rating } from "@mui/material";
import { useCart } from "../../../CustomHook/UseCart";

export default function Products() {
  const [value, setValue] = useState(0);
  const [Products, setProducts] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 4;
  const [cart, setCart] = useCart();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/products?page=${currentPage}&limit=${limit}`
      );
      setProducts(data.products);
      setError("");
      const numberofpages = data.total / limit;
      setTotalPages(numberofpages);
    } catch (error) {
      setError("error loading products data");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, value]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        <Filter
          setProducts={setProducts}
          currentpage={currentPage}
          setTotalpage={setTotalPages}
          setCurrentPage={setCurrentPage}
        />
        <div className="container">
          <h1 className={style.titlePro}>Products</h1>
          <div className={style.rows}>
            <div
              className={`col-lg-12 col-md-12 col-sm-12 ${style.Catproduct}`}
            >
              {Products.length > 0 ? (
                Products.map((product) => (
                  <div className={style.product} key={product.id}>
                    <div className="card" style={{ width: "13rem" }}>
                      <img
                        src={product.mainImage.secure_url}
                        className={`card-img-top ${style.CardImage}`}
                        alt={product.name}
                      />

                      <div className={`card-body ${style.cartInfo}`}>
                        <h5 className={`cart-text ${style.cartTitle}`}>
                          {product.name}
                        </h5>
                      </div>
                      <div className={`card-body ${style.rating}`}>
                        <Rating
                          name="simple-controlled"
                          value={product.avgRating}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />
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
            <PaginationComp
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </>
  );
}
