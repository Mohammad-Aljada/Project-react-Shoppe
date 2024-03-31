import { NavLink, useParams } from "react-router-dom";
import style from "./products.module.css";
import UseResource from "../../../CustomHook/UseResource";
import Loader from "../../../Components/Loader/Loader";
import AddToCartButton from "../../../Components/AddToCartButton/AddToCartButton";

export default function CategoryProducts() {
  const { id } = useParams();

  const { Products, error, loader } = UseResource(
    `${import.meta.env.VITE_API_URL}/products/category/${id}`
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps

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
                      <AddToCartButton productId={id} />
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
