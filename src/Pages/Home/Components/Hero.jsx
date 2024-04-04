import { Skeleton } from "@mui/material";
import style from "./Home.module.css";
import { useState } from "react";
export default function Hero() {
  const [loader, setLoader] = useState(false);

  const handleImageLoad = () => {
    setLoader(true);
  };

  return (
    <>
      <section className={style.Hero}>
        <div className="container">
          <div className="row">
            <div className={`col-lg-12 col-md-12 col-sm-12 ${style.heroInfo}`}>
              <div className={style.heroImage}>
                {!loader && (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={500}
                    height={400}
                  />
                )}

                {/* Actual image */}
                <img
                  src="/Home.webp"
                  alt="Home photo"
                  style={{ display: loader ? "block" : "none" }}
                  onLoad={handleImageLoad}
                  loading="lazy"
                />
              </div>
              <div className={style.heroContent}>
                {!loader ? (
                  <Skeleton width={300} animation="wave" />
                ) : (
                  <h1>SHOPPE</h1>
                )}
                {!loader ? (
                  <Skeleton width={300} animation="wave" />
                ) : (
                  <p>A simple e-commerce website</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
