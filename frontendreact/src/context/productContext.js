import React, { createContext, useEffect, useReducer } from "react";
import { productReducer } from "./productReducer";
import { api } from "../utils/apiUrl";
import axios from "axios";

export const initialState = {
  loading: true,
  products: [],
  product: {},
  sortedProduct: [],
  filterProduct: [],
};

export const productContext = createContext(initialState);

export default function ProductContextProvider(props) {
  const [state, dispatch] = useReducer(productReducer, initialState);
  //loading user

  //get all products
  useEffect(() => {
    const allProduct = async () => {
      try {
        const response = await axios.get(`${api}/products/all`);
        dispatch({
          type: "ALL_PRODUCT",
          payload: response.data.data,
        });
        dispatch({
          type: "SORTED_PRODUCT",
          payload: response.data.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    allProduct();
  }, []);

  //get single product

  const singleProduct = async (id) => {
    try {
      const response = await axios.get(`${api}/products/${id}`);
      dispatch({
        type: "SINGLE_PRODUCT",
        payload: response.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <productContext.Provider
      value={{
        products: state.products,
        product: state.product,
        sortedProduct:state.sortedProduct,
        singleProduct,
        dispatch,
      }}
    >
      {props.children}
    </productContext.Provider>
  );
}
