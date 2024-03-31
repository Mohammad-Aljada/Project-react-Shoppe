import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import UserContextProvaider from "../context/User";
import { ToastContainer } from "react-toastify";
import CartContextProvider from "../context/Cart";

export default function Root() {
  return (
    <>
      <ToastContainer />
      <CartContextProvider>
        <UserContextProvaider>
          <Navbar />
          <Outlet />
          <Footer />
        </UserContextProvaider>
      </CartContextProvider>
    </>
  );
}
