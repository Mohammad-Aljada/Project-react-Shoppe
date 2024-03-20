import axios from "axios";
import style from "./product.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import { Rating } from "@mui/material";
import { Slide, toast } from "react-toastify";
export default function Product() {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [product, setProduct] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
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
  }, []);

  if (loader) {
    return <Loader />;
  }
  
 const AddToCart = async (productId) => {
    const token = localStorage.getItem("userToken");
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
        console.log(data);
      }
    } catch (error) {
      if(error.response.data.message == "product already exists"){
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
    else{
      toast.error("plz first  login", {
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
  const AddReview = async (productId) => {
    const token = localStorage.getItem("userToken");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${productId}/review`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message == "success") {
        toast.success("Add Reviews Is successfully!", {
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
      }
    } catch (error) {
      toast.error("plz Login first", {
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
                <p className={style.proDesc}>
                  {product.description.substring(0, 350)}...
                </p>
                <div className={style.ProInfo}>
                  <span className={style.stock}>Stock : {product.stock}</span>
                </div>

                <div className={style.rating}>
                  <Rating
                    name="simple-controlled"
                    value={value}
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
                  <button
                    onClick={() => AddReview(product.id)}
                    className={style.btnCart}
                  >
                    <svg
                      className={style.comment}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#fff"
                        d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"
                      />
                    </svg>
                    <span className={style.titleBtn}>Add Review</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={style.review}>
            <h2>Reviews</h2>
          </div>
        </div>
      </section>
    </>
  );
}
