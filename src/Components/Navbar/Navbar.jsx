import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdShoppingCart } from "react-icons/md";
import { Badge } from "@mui/material";
import "./Navbar.css";
import {
  myCartRoutePath,
  productsRoutePath,
} from "../../Constants/PathConstants";

export const Navbar = () => {
  const width = useSelector((state) => state.utilities.width);
  const navigate = useNavigate();
  const myCartArray = useSelector((state) => state.myCart.myProductsData);

  // Array reduce method Ref: https://stackoverflow.com/a/6300596
  const count = myCartArray.reduce((acc, cartObj) => {
    return acc + cartObj.quantity;
  }, 0);

  return (
    <div className="navbarWrapper">
      <div className="backClicker" onClick={() => navigate(1)}>
        <div className="button">
          <div className="backButtonMerger">
            {width > 500 && <h3>Harsh Jha </h3>}
          </div>
        </div>
      </div>
      <div className="navigationLinks">
        <NavLink className="removeTextDecoration" to={productsRoutePath}>
          <h3>Products</h3>
        </NavLink>
        <NavLink className="removeTextDecoration" to={myCartRoutePath}>
          <Badge badgeContent={count} color="success">
          <MdShoppingCart  size={30} color="white"/>
            <h3 className="myCartBadge">My Cart</h3>
          </Badge>
        </NavLink>
      </div>
    </div>
  );
};
