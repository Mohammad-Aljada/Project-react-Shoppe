import axios from "axios";
import { useEffect, useState } from "react";
import { Navigation, A11y, Autoplay } from "swiper/modules";

import style from "./Home.module.css"; // Import CSS file for custom styles
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { NavLink } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

export default function HomeCatagorie() {
  const [catagories, setCatagories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const controller = new AbortController();
  const signal = controller.signal;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCatagories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=7`,{
          signal
        }
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
    
    return ()=>{controller.abort();};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);

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
            modules={[Navigation, Autoplay , A11y]}
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
