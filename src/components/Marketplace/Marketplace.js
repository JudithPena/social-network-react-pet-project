import { Route, Routes } from "react-router-dom";
import Cart from "./Cart";
import Catalog from "./Catalog";
import ProductDetails from "./ProductDetails";

const Marketplace = () => {
  return (
    <Routes>
      <Route index element={<Catalog />} />
      <Route path="cart" element={<Cart />} />
      <Route path=":id" element={<ProductDetails />} />
    </Routes>
  );
};

export default Marketplace;
