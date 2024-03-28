import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

// eslint-disable-next-line react/prop-types
const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(0);
  const userToken = localStorage.getItem("userToken");

  const getCart = async () => {
    if (userToken) {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: {
          Authorization: `Tariq__${userToken}`,
        },
      });
    setCart(data.count);
    }
  };

  useEffect(() => {
    getCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (

    <CartContext.Provider value={[cart,  setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
