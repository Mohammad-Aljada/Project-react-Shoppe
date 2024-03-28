import axios from "axios";
import style from "./product.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import { Rating } from "@mui/material";
import { Slide, toast } from "react-toastify";

import ProductsReviews from "./ProductsReviews";
import { useCart } from "../../../CustomHook/UseCart";

export default function Product() {
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const controller = new AbortController();
  const signal = controller.signal;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        {
          signal,
        }
      );
      setProduct(data.product);
      setError("");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, value]);

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
      console.log(data);
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
      <section className={style.product}>
        <div className="container">
          <div className={`row ${style.proDetiles}`}>
            <div className="col-md-6 ">
              <div className={style.img}>
                <Swiper
                  slidesPerView={1}
                  modules={[Navigation, Autoplay, A11y]}
                  onSwiper={() => console.log()}
                  onSlideChange={() => console.log()}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  navigation={true}
                >
                  {product.subImages.length > 0 ? (
                    product.subImages.map((image) => (
                      <SwiperSlide key={image.public_id}>
                        <img
                          className={style.image}
                          src={image.secure_url}
                          alt="slide image"
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <p>no sub image</p>
                  )}
                </Swiper>
              </div>
            </div>
            <div className="col-md-6">
              <div className={style.content}>
                <h3 className={style.name}>{product.name}</h3>
                <p className={style.proDesc}>{product.description}...</p>
                <div className={style.ProInfo}>
                  <span className={style.stock}>Stock : {product.stock}</span>
                </div>

                <div className={style.rating}>
                  <Rating
                    name="simple-controlled"
                    value={product.ratingNumbers}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </div>
                <div className={style.checkout}>
                  <span className={style.price}>Price : {product.price}$</span>
                  <button
                    onClick={() => AddToCart(product.id)}
                    className={style.btnCart}
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
          </div>
          <div className={style.review}>
            <ProductsReviews product={product} id={id} />
          </div>
        </div>
      </section>
    </>
  );
}
