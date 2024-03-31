import { Navigation, A11y, Autoplay } from "swiper/modules";
import style from "./Home.module.css"; // Import CSS file for custom styles
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { NavLink } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import UseResource from "../../../CustomHook/UseResource";

export default function HomeCatagorie() {
  const { catagories, error, loader } = UseResource(
    `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=7`
  );

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      {error ?? <p className="error">{error}</p>}
      <section className={style.Category}>
        <div className="container">
          <h2 className={style.title}>categories</h2>
          <Swiper
            modules={[Navigation, Autoplay, A11y]}
            spaceBetween={50}
            slidesPerView={5}
            onSwiper={() => console.log()}
            onSlideChange={() => console.log()}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            navigation={true}
          >
            {catagories.length > 0 ? (
              catagories.map((catagory) => (
                <div className="col-lg-6 col-md-4 col-sm-6" key={catagory.id}>
                  <SwiperSlide className={style.swiperSlide} key={catagory._id}>
                    <NavLink
                      to={`/Procategory/${catagory.id}`}
                      className={style.swiperSlide}
                    >
                      <img
                        className={style.circularImage}
                        src={catagory.image.secure_url}
                        alt={catagory.name}
                      />
                      <span className={style.catTitle}>{catagory.name}</span>
                    </NavLink>
                  </SwiperSlide>
                </div>
              ))
            ) : (
              <h2>empty categories</h2>
            )}
          </Swiper>
        </div>
      </section>
    </>
  );
}
