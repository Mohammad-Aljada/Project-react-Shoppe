import axios from "axios";
import { Slide, toast } from "react-toastify";
import { useCart } from "./UseCart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UseAddToCart() {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [loader, setLoader] = useState(false);
  const token = localStorage.getItem("userToken");
  const AddToCart = async (productId) => {
    setLoader(true);
    if (!token) {
      toast.error("plz  login first", {
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
      navigate("/signin");
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message == "success") {
        toast.success("Add to cart Is successfully!", {
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
        setCart(cart + 1);
      }
    } catch (error) {
      if (error.response.data.message === "product already exists") {
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
      }
    } finally {
      setLoader(false);
    }
  };

  return { AddToCart, loader };
}
