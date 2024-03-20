import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Routers/Root";
import Home from "./Pages/Home/Components/Home";
import Products from "./Pages/Products/Components/Products";
import SignIn from "./Pages/Signin/Components/SignIn";
import SignUp from "./Pages/Signup/Components/SignUp";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Cart from "./Pages/Cart/Components/Cart";
import ProtectedRouter from "./auth/ProtectedRouter";
import CategoryProducts from "./Pages/Products/Components/CategoryProducts";
import UserContextProvaider from "./context/User";
import SendCode from "./Pages/ForgetPassword/Components/SendCode";
import ForgetPassword from "./Pages/ForgetPassword/Components/ForgetPassword";
import Categories from "./Pages/categories/Components/Categories";
import Product from "./Pages/Product/Components/Product";
import CartContextProvider from "./context/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index:true,
        element: <Home />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "sendcode",
        element: <SendCode />,
      },
      {
        path: "forgetpassword",
        element: <ForgetPassword />,
      },

      {
        path: "Procategory/:id",
        element: <CategoryProducts />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>
        ),
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);
export default function App() {
  return (
    <> 
    <ToastContainer />
     <CartContextProvider>
        <UserContextProvaider>
          <RouterProvider router={router} />
        </UserContextProvaider>
       </CartContextProvider> 
    </>
  );
}
