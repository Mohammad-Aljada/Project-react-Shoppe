import { useEffect, useState } from "react";
import style from "./cart.module.css";
import axios from "axios";
import Loader from "../../../Components/Loader/Loader";
import { NavLink, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { useCart } from "../../../CustomHook/UseCart";

export default function Cart() {
  const navigate = useNavigate();
  const [Products, setProducts] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("userToken");
  const [actions, setAction] = useState(-1);
  const [cart, setCart] = useCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
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
  }, [actions, cart]);

  if (loader) {
    return <Loader />;
  }

  const handleChangeAction = async (productId, action) => {
    try {
      switch (action) {
        case "increase":
          await axios.patch(
            `${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
            { productId },
            {
              headers: {
                Authorization: `Tariq__${token}`,
              },
            }
          );
          setAction(actions + 1);
          
          break;
        case "decrease":
          await axios.patch(
            `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
            { productId },
            {
              headers: {
                Authorization: `Tariq__${token}`,
              },
            }
          );
          setAction(actions - 1);
          break;
        case "remove":
          // eslint-disable-next-line no-case-declarations
          const { data } = await axios.patch(
            `${import.meta.env.VITE_API_URL}/cart/removeItem`,
            { productId },
            {
              headers: {
                Authorization: `Tariq__${token}`,
              },
            }
          );
          if (data.message == "success") {
            toast.success("remove product is successfully!", {
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
            setAction(Products);
            setCart(cart - 1);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error ${action}ing item:`, error);
    }
  };
  const handleClear = async () => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        null,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message == "success") {
        toast.success("claer cart is successfully!", {
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
        setAction(Products);
        setCart(0);
      } else {
        toast.error("cart is clearing and empty", {
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
      console.error(`Error :`, error);
    }
  };

  const handlePurches = () => {
    Products.length > 0
      ? (toast.success("Purches is successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        }),
        navigate("/order"))
      : toast.error("cart is  empty", {
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
  };
  return (
    <>
      {error ?? <p className="error">{error}</p>}
      <section className={style.cart}>
        <div className="container">
          <h2>Shopping cart</h2>
          <div className={`row ${style.cartContent}`}>
            <div className={`col-lg-9 col-md-12 ${style.tableWrapper}`}>
              <table className="">
                <thead className="text-muted ">
                  <tr className="small text-uppercase">
                    <th scope="col" className="text-left">
                      Product
                    </th>
                    <th scope="col" className="text-center" width={120}>
                      Price
                    </th>
                    <th scope="col" className="text-center" width={120}>
                      Quantity
                    </th>
                    <th scope="col" className="text-center" width={120}>
                      Subtotal
                    </th>
                    <th scope="col" className="text-center" width={200}>
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Products.length > 0 ? (
                    Products.map((product) => (
                      <tr key={product.details.id}>
                        <td>
                          <div className={`text-left ${style.ProInfo}`}>
                            <img
                              src={product.details.mainImage.secure_url}
                              className={style.proImage}
                            />

                            <h3 className={style.proTitle}>
                              {product.details.name}
                            </h3>
                          </div>
                        </td>

                        <td className="text-center">
                          <span>{product.details.finalPrice}$</span>
                        </td>
                        <td>
                          <div className={` text-center ${style.quantity}`}>
                            <button
                              className={style.decquan}
                              onClick={() =>
                                handleChangeAction(
                                  product.details._id,
                                  "decrease"
                                )
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                              </svg>
                            </button>
                            <span> {product.quantity} </span>

                            <button
                              className={style.incquan}
                              onClick={() =>
                                handleChangeAction(
                                  product.details._id,
                                  "increase"
                                )
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className={`text-center ${style.subTotal}`}>
                          {product.details.price * product.quantity}$
                        </td>

                        <td className="text-center">
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              handleChangeAction(product.details._id, "remove")
                            }
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>
                        <h2> empty product</h2>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <button className={style.btnClear} onClick={handleClear}>
                  Clear Cart
                </button>
              </div>
            </div>
            <aside className="col-lg-3 col-md-12">
              <div className="card">
                <div className="card-body d-flex flex-column  gap-3">
                  <div className={style.Total}>
                    <span>SubTotal:</span>
                    <span className="text-right">
                      {Products.length > 0 ? (
                        Products.reduce(
                          (total, product) =>
                            total + product.details.price * product.quantity,
                          0
                        ) + "$"
                      ) : (
                        <span>0$</span>
                      )}
                    </span>
                  </div>
                  <div className={style.Total}>
                    <span>Discount:</span>
                    <span className="text-right ">
                      {Products.length > 0 ? (
                        Products.reduce(
                          (total, product) =>
                            total + product.details.discount * product.quantity,
                          0
                        ) + "$"
                      ) : (
                        <span>0$</span>
                      )}
                    </span>
                  </div>
                  <div className={style.Total}>
                    <span>Total Price:</span>
                    <span className="text-right">
                      {Products.length > 0 ? (
                        Products.reduce(
                          (total, product) =>
                            total +
                            product.details.price * product.quantity -
                            product.details.discount * product.quantity,
                          0
                        ) + "$"
                      ) : (
                        <span>0$</span>
                      )}
                    </span>
                  </div>
                  <hr />
                  <div className={style.btnCart}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handlePurches}
                      disabled={loader ? "disabled" : null}
                    >
                      {!loader ? "Make Purchase" : <Loader />}
                    </button>

                    <NavLink to="/products" className="btn btn-secondary">
                      <i className="fa fa-chevron-left" /> Continue shopping
                    </NavLink>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
