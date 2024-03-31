import { NavLink } from "react-router-dom";
import style from "./products.module.css";
import { useEffect, useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import PaginationComp from "../../../Components/Pagination/PaginationComp";
import Filter from "../../../Components/Filter/Filter";
import { Rating } from "@mui/material";
import AddToCartButton from "../../../Components/AddToCartButton/AddToCartButton";
import axios from "axios";
import { useCart } from "../../../CustomHook/UseCart";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 4;
  const [Products, setProducts] = useState([]);
  const [value, setValue] = useState(0);
  const { cart } = useCart();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

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
  }, [cart, value]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loader) {
    return <Loader />;
  }

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
                        <AddToCartButton productId={product.id} />
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
