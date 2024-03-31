import { Routes, Route } from "react-router-dom";
import Root from "./Routers/Root";
import Home from "./Pages/Home/Components/Home";
import Products from "./Pages/Products/Components/Products";
import SignIn from "./Pages/Signin/Components/SignIn";
import SignUp from "./Pages/Signup/Components/SignUp";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Pages/Cart/Components/Cart";
import CategoryProducts from "./Pages/Products/Components/CategoryProducts";
import SendCode from "./Pages/ForgetPassword/Components/SendCode";
import ForgetPassword from "./Pages/ForgetPassword/Components/ForgetPassword";
import Categories from "./Pages/categories/Components/Categories";
import Product from "./Pages/Product/Components/Product";
import Order from "./Pages/Order/Components/Order";
import Profile from "./Pages/Profile/Components/Profile";
import InfoUser from "./Pages/Profile/Components/InfoUser";
import ContactUs from "./Pages/Profile/Components/ContactUs";
import UserOrders from "./Pages/Profile/Components/UserOrders";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="sendcode" element={<SendCode />} />
          <Route path="forgetpassword" element={<ForgetPassword />} />
          <Route path="Procategory/:id" element={<CategoryProducts />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="categories" element={<Categories />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="profile" element={<Profile />}>
            <Route path="userinfo" element={<InfoUser />} />
            <Route path="contactus" element={<ContactUs />} />
            <Route path="orders" element={<UserOrders />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}
