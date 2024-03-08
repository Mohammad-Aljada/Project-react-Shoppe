import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Routers/Root";
import Home from "./Pages/Home/Components/Home";
import Products from "./Pages/Products/Components/Products";
import SignIn from "./Pages/Signin/Components/SignIn";
import SignUp from "./Pages/Signup/Components/SignUp";
import PageNotFound from "./Components/PageNotFound/PageNotFound";

import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer} from 'react-toastify';
import Cart from "./Pages/Cart/Components/Cart";
import ProtectedRouter from "./auth/ProtectedRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/category/:id",
        element: <Products />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/cart",
        element: 
        <ProtectedRouter>
          <Cart />
        </ProtectedRouter>,
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
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
