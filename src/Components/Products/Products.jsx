import "./Products.css";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../Redux/Products/ProductsThankMiddleware";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Grid, TextField } from "@mui/material";
import { ProductDetailsCard } from "./ProductDetailsCard/ProductDetailsCard";
import { ProductsListLimit } from "./ProductsListLimit/ProductsListLimit";
import { ProductsPagination } from "./ProductsPagination/ProductsPagination";
import { Loader } from "../Loader/Loader";
import { productsActions } from "../../Redux/Products/ProductsActionTypes";
import { NoSpecificProductsFound } from "./NoSpecificProductsFound/NoSpecificProductsFound";
import { IoIosSearch } from "react-icons/io";

export const Products = () => {
   // React router dom hooks
   const [limit, changeLimit] = useState(10);
   const [currentPage, changeCurrentPage] = useState(1);
   const [searchValue, changeSearchValue] = useState("");

   // React useEffect hook
   useEffect(() => {
      dispatch({ type: productsActions.SET_LOADER_TRUE });
      setTimeout(() => {
         dispatch(fetchProducts(limit, currentPage, searchValue));
      }, 1100);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [limit, currentPage, searchValue]);

   // React useEffect hook
   useEffect(() => {
      changeCurrentPage(1);
   }, [searchValue]);

   // Redux dispatch and selector hooks
   const dispatch = useDispatch();
   const isLoading = useSelector((state) => state.products.isLoading);
   const width = useSelector((state) => state.utilities.width);
   const { products, total } = useSelector((state) => {
      return state.products.productsData;
   });

   return (
      <div className="productsWrapper">
         <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{display:"flex", alignItems: "center"}}>
                     <label htmlFor="productSearch" >Search</label>
                     <IoIosSearch size={30} />
                  </div>
                  <TextField
                     label="Search product"
                     type="search"
                     variant="outlined"
                     fullWidth
                     id="productSearch"
                     value={searchValue}
                     onChange={(e) => {
                        e.preventDefault();
                        changeSearchValue(e.target.value);
                     }}
                     sx={{ marginTop: "2rem", marginBottom: "2rem" }}
                  />
               </div>
         {isLoading ? (
            <Loader />
         ) : (
            <>
               <Alert
                  sx={{ marginBottom: "2rem" }}
                  severity={total > 0 ? "info" : "error"}
               >
                  {total > 0 ? (
                     `Total discovered ${total} products.`
                  ) : (
                     <NoSpecificProductsFound
                        changeCurrentPage={changeCurrentPage}
                        changeSearchValue={changeSearchValue}
                     />
                  )}
               </Alert>
               <Grid
                  container
                  rowSpacing={{ xs: 3, sm: 3, md: 3 }}
                  columnSpacing={{ xs: 2, sm: 2, md: 3 }}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
               >
                  {products.map((product) => {
                     return (
                        <Grid key={product.id} item xs={12} sm={6} md={4}>
                           <ProductDetailsCard
                              id={product.id}
                              title={product.title}
                              description={product.description}
                              rating={product.rating}
                              price={product.price}
                              thumbnail={product.thumbnail}
                           />
                        </Grid>
                     );
                  })}
               </Grid>
               <Grid
                  container
                  rowSpacing={3}
                  direction={width > 500 ? "row" : "column"}
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap={"nowrap"}
                  sx={{ width: "100%", paddingBottom: "2.5rem", marginTop: "2.5rem" }}
               >
                  {total > 0 && (
                     <>
                        <ProductsListLimit limit={limit} changeLimit={changeLimit} />
                        <ProductsPagination
                           currentPage={currentPage}
                           changeCurrentPage={changeCurrentPage}
                           totalPages={Math.ceil(total / limit)}
                        />
                     </>
                  )}
               </Grid>
            </>
         )}
      </div>
   );
};
