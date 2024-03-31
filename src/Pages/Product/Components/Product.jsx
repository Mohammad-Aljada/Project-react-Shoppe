import style from "./product.module.css";
import { useParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import { Rating } from "@mui/material";
import ProductsReviews from "./ProductsReviews";
import AddToCartButton from "../../../Components/AddToCartButton/AddToCartButton";
import UseResource from "../../../CustomHook/UseResource";

export default function Product() {
  const { id } = useParams();

  const { product, error, loader, setValue } = UseResource(
    `${import.meta.env.VITE_API_URL}/products/${id}`
  );

  if (loader) {
    return <Loader />;
  }

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
                  {product.subImages && product.subImages.length > 0 ? (
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
                  <AddToCartButton productId={id} />
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
