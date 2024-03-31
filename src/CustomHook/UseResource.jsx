import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useCart } from "./UseCart";

export default function UseResource(url) {
  const [Products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [catagories, setCatagories] = useState([]);
  const [value, setValue] = useState(0);
  const { cart } = useCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const controller = new AbortController();
  const getProducts = async () => {
    try {
      const { data } = await axios.get(url, {
        signal: controller.signal,
      });
      if (data.products) {
        setProducts(data.products);
      } else if (data.categories) {
        setCatagories(data.categories);
      }else{
        setProduct(data.product);
      }

      setError("");
    } catch (error) {
      setError("error loading products data");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, value, controller]);

  return { Products, error, loader, setProducts, catagories, setValue , product };
}
