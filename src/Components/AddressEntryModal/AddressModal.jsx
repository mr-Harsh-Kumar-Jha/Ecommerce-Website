import React, { useState } from 'react'
import './AddressModal.css'
import { useDispatch, useSelector } from "react-redux";
import {
   myCartActionTypes,
   myCartProductActionType,
 } from "../../Redux/MyCart/MyCartActionTypes";
 import { alterTheValueOfMyCart } from "../../Redux/MyCart/MyCartThunkMiddleware";
import { useNavigate } from 'react-router-dom';

const AddressModal = (props) => {
   // eslint-disable-next-line
   const [summaryFlag, setSummaryFlag] = useState(false)
   // eslint-disable-next-line
   const [name, setName] = useState('')
   const navigate = useNavigate();

   // Redux dispatch and selector hooks
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.myCart.myProductsData);
   const myCartArray = useSelector((state) => state.myCart.myProductsData);
   let totalDiscountedPrice = 0;
   myCartArray.forEach((data) => {
      totalDiscountedPrice += (data.quantity || 1) * data.productInfo.price || 0;
   });
   const { setActiveAddressModal } = props
   const navigateToPrevSection = () => {
      setActiveAddressModal(false)
   }
   const placetheOrder = () => {
      setSummaryFlag(true)
   }

   const getTOproduct = ()=>{
      dispatch(
         alterTheValueOfMyCart(
           {},
           myCartProductActionType.REMOVE,
           cartState,
           myCartActionTypes.ALTER_PRODUCT_TO_MY_CART
         )
       );
       navigate(-2)
       setActiveAddressModal(false);
   }
   return (
      <>
         <div className='addressContainer' onClick={navigateToPrevSection}>
            {!summaryFlag && <div className='addressMainContent' onClick={(e) => e.stopPropagation()}>
               <div className='addressLabel'>Enter your details to Confirm the Order</div>
               <form>
                  <input name="name" placeholder="Name" type="name" onChange={(e) => {
                     e.preventDefault();
                     setName(e.target.value)
                  }} />
                  <input name="address" placeholder="Address" type="text" required/>
                  <input name="unit" placeholder="Unit number" type="text" />
                  <input name="city" placeholder="City" type="text" required/>
                  <input name="state" placeholder="State" type="text" required/>
                  <input name="country" placeholder="Country" type="text" required/>
                  <input name="postcode" placeholder="Postcode" type="text" required/>
                  <input name="mobile" placeholder="Phone" type="phone" required/>
               </form>
               <button onClick={placetheOrder}>Place Order</button>
            </div>}
            {summaryFlag && <div className='addressMainContent' onClick={(e) => e.stopPropagation()}>
               <div>
                  <strong className='addressLabel-1'>Congratulations !!! </strong>
                  <div className='addressLabel-2'><strong>{name}</strong>, Your Order has been Booked</div>
               </div>
               <table>
                  <tr>
                     <th>Product</th>
                     <th>Quantity</th>
                     <th>Price</th>
                  </tr>
                  {myCartArray.map((item, i) => <tr key={i}>
                     <td>{item.productInfo.title}</td>
                     <td>{item.quantity}</td>
                     <td>{item.productInfo.price}</td>
                  </tr>)}
               </table>
               <div className="summaryAmount">
                  <span>Tobal Billing Amount = </span>
                  <strong>{totalDiscountedPrice}</strong>
               </div>

               <button className='summaryconfirm button' onClick={getTOproduct}>Continue Shopping</button>
            </div>}
         </div>
      </>
   )
}

export default AddressModal