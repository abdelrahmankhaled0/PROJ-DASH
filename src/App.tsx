import "./App.css";
import Login from "./components/Login";
// import Login from "./components/Login";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from "./pages/Card";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./components/CartContext";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/card",
      element: <Card />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/product/:id",
      element: <ProductDetails />,
    },
  ],
  {
    basename: "/PROJ-DASH",
  },
);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
