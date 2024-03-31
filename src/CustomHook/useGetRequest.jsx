import { useEffect, useState } from "react";
import { useCart } from "./UseCart";
import axios from "axios";

export default function useGetRequest(url) {
  const [Products, setProducts] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [actions, setAction] = useState(-1);
  const { cart , setCart } = useCart();
  const token = localStorage.getItem("userToken");
  const getProducts = async () => {
    try {
      const { data } = await axios.get(url, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, cart]);
  return { loader, error, Products, setLoader ,setAction, setCart, actions };
}
