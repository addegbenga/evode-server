import React, { useContext, useEffect } from "react";
import { productContext } from "../../context/productContext";

export default function ProductDetails(props) {
  const { product, singleProduct } = useContext(productContext);
  const id = props.match.params.id;

  const { productName, productDescription } = product;

  useEffect(() => {
    singleProduct(id);
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>Single product</h1>
      {product && (
        <div>
          <h1>{productName}</h1>
          <p>{productDescription}</p>
        </div>
      )}
    </div>
  );
}
