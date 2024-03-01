
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Routers/Root";
import Home from "./Pages/Home/Components/Home";
import Error from "./Components/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },

      {
        path: "*",
        element: <Error/>
      },
    
    ]
  },
]);
export default function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}
