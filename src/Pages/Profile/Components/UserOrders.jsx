import style from "./profile.module.css";
import { useEffect, useState } from "react";
import styles from "../../Cart/Components/cart.module.css";
import Loader from "../../../Components/Loader/Loader";
import axios from "axios";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("userToken");
  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/order`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setOrders(data.orders);
      setError("");
    } catch (error) {
      setError("error loading Order data");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loader) {
    return <Loader />;
  }

  const cancelOrder = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/order/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: "cancelled" } : order
        )
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
      setError("Error cancelling order");
    }
  };
  return (
    <>
      {error ?? <p className="error">{error}</p>}
      <div className="container">
        <h2>My Orders</h2>
        <div className={`col-lg-9 col-md-9 col-sm-8 ${styles.tableWrapper}`}>
          <table className="">
            <thead className="text-muted ">
              <tr className="small text-uppercase">
                <th scope="col" className="text-center">
                  Product
                </th>
                <th scope="col" className="text-center" width={220}>
                  Total Price
                </th>
                <th scope="col" className="text-center" width={120}>
                  status
                </th>
                <th scope="col" className="text-center" width={120}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <div className={`text-left ${styles.ProInfo}`}>
                        {order.products.map((product) => (
                          <div
                            className={style.orderpro}
                            key={product.productId.id}
                          >
                            <img
                              src={product.productId.mainImage.secure_url}
                              className={styles.proImage}
                            />
                            <h3 className={style.proTitle}>
                              {product.productId.name}
                            </h3>
                            <div className={` text-center ${styles.quantity}`}>
                              <span> {product.quantity} </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="text-center">
                      <span>{order.finalPrice}$</span>
                    </td>
                    <td className="text-center">
                      <span>{order.status}</span>
                    </td>
                    <td className="text-center btn btn-danger">
                      <button
                        disabled={order.status !== "pending"}
                        onClick={() => cancelOrder(order._id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <h2> empty orders</h2>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
