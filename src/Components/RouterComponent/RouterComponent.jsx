import "./RouterComponent.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Products } from "../Products/Products";
import { Product } from "../Product/Product";
import { MyCart } from "../MyCart/MyCart";
import {
  homeRoutePath,
  myCartRoutePath,
  productRoutePath,
  productsRoutePath,
} from "../../Constants/PathConstants";
import AddressModal from "../AddressEntryModal/AddressModal";
import { useState } from "react";

export const RouterComponent = () => {
   const [activeAddressModal, setActiveAddressModal] = useState(false)
  return (
    <div className="routerComponent">
      <div>
        <Routes>
          <Route path={homeRoutePath} element={<Home />} />
          <Route path={productsRoutePath} element={<Products />} />
          <Route path={productRoutePath} element={<Product />} />
          <Route path={myCartRoutePath} element={<MyCart setActiveAddressModal={setActiveAddressModal}/>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      {activeAddressModal && <AddressModal setActiveAddressModal={setActiveAddressModal}/>}
    </div>
  );
};
