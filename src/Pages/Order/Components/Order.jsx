import { useEffect, useState } from "react";
import style from "./order.module.css";
import styles from "../../Cart/Components/cart.module.css";
import Loader from "../../../Components/Loader/Loader";
import axios from "axios";
import { object, string } from "yup";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../CustomHook/UseCart";

export default function Order() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [Products, setProducts] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const token = localStorage.getItem("userToken");
  const [user, setUser] = useState({
    couponName: "",
    address: "",
    phone: "",
  });

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const ValidationData = async () => {
    let userSchema = object({
      couponName: string().optional(),
      address: string().required("Please enter your address correct"),
      phone: string().required("Please enter your phone correct"),
    });
    try {
      await userSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      if (error.name === "ValidationError") {
        // Yup validation error
        const yupErrors = {};
        error.inner.forEach((err) => {
          yupErrors[err.path] = err.message;
        });
        setErrors(yupErrors);
      }
      setLoader(false);
      return false;
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (await ValidationData()) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/order`,
          user,
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
        setUser({
          couponName: "",
          address: "",
          phone: "",
        });
        if (data.message == "success") {
          toast.success(
            "create order Is successfully and check order in profile!",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Slide,
            }
          );
          setCart(0);
          navigate("/");
        }
      } catch (error) {
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
      } finally {
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [cart]);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      {error ?? <p className="error">{error}</p>}
      <section className={style.Order}>
        <div className="container">
          <h2>Create Order</h2>
          <div className="row justify-content-center gap-5">
            <div className={`col-lg-9 col-md-12 ${styles.tableWrapper}`}>
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
                  </tr>
                </thead>
                <tbody>
                  {Products.length > 0 ? (
                    Products.map((product) => (
                      <tr key={product.details.id}>
                        <td>
                          <div className={`text-left ${styles.ProInfo}`}>
                            <img
                              src={product.details.mainImage.secure_url}
                              className={styles.proImage}
                            />

                            <h3 className={styles.proTitle}>
                              {product.details.name}
                            </h3>
                          </div>
                        </td>

                        <td className="text-center">
                          <span>{product.details.finalPrice}$</span>
                        </td>
                        <td>
                          <div className={` text-center ${styles.quantity}`}>
                            <span> {product.quantity} </span>
                          </div>
                        </td>
                        <td className={`text-center ${styles.subTotal}`}>
                          {product.details.price * product.quantity}$
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
              </div>
            </div>
            <div className={` col-lg-9 col-md-12 ${style.orderDetiles}`}>
              <form className={style.orderForm} onSubmit={handleOrder}>
                <label htmlFor="couponName">CouponName</label>
                <input
                  type="text"
                  value={user.couponName}
                  id="couponName"
                  name="couponName"
                  placeholder="This is Optional"
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="error">{errors.couponName}</div>
                )}

                <label htmlFor="address">Address</label>
                <input
                  type="address"
                  id="address"
                  value={user.address}
                  name="address"
                  onChange={handleChange}
                />
                {errors.address && (
                  <div className="error">{errors.address}</div>
                )}
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={user.phone}
                  name="phone"
                  onChange={handleChange}
                />
                {errors.address && <div className="error">{errors.phone}</div>}
                <button type="submit" disabled={loader ? "disabled" : null}>
                  {!loader ? "Confirm Order" : <Loader />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
