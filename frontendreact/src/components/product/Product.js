import React, { useContext,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/apiUrl";
import { productContext } from "../../context/productContext";
const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

export default function Product() {
  const { products, dispatch, sortedProduct } = useContext(productContext);
  const [checked, setChecked] = useState([]);
  const [sort, setSort] = useState({
    productCategory: "all",
  });

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    console.log(value);
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked);
    setChecked(newChecked);
    // newfilter(newChecked);
    filterProduct(newChecked);
  };

  const handleChange = (e, item) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? handleToggle(item) : e.target.value;
    setSort({ ...sort, [name]: value });
    // filterProduct(value);
    // console.log(item);
  };

  let types = getUnique(products, "productCategory");
  // types = ["all", ...types];
  types = types.map((item, index) => {
    return (
    
      <div key={index}>
        <label htmlFor="category" id="category">
          {item}
        </label>
        <input
          type="checkbox"
          name="productCategory"
          // checked={checked.indexOf(item) === -1 ? false : true}
          onChange={(e) => handleChange(e, item)}
        />
      </div>
    );
  });

  let tempProducts = [...products];

  const showFilters = async (filter, value) => {
    const variables = {
      filter,
    };
    try {
      if (value.length > 0) {
        const response = await axios.post(`${api}/products/all`, variables);
        dispatch({
          type: "SORTED_PRODUCT",
          payload: response.data.data,
        });
        console.log(true);
      } else {
        console.log(false);
        dispatch({
          type: "SORTED_PRODUCT",
          payload: tempProducts,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterProduct = (value) => {
    const newFilters = { ...value };
    newFilters["productCategory"] = value;
    console.log(newFilters);
    showFilters(newFilters, value);
  };

  return (
    <div className="product-container">
      <div className="product-category">
        <div className="form-group">{types}</div>
      </div>
      <div>
        <label htmlFor="price" id="price"></label>
        <input type="checkbox" id="price" name="price" />
      </div>
      <div className="product-grid">
        {sortedProduct &&
          sortedProduct.map((item) => (
            <div className="product-card" key={item._id}>
              <h1>{item.productName}</h1>
              <p>{item.productDescription}</p>
              <span>{item.productPrice}</span>
              <div className="product-btn">
                <button>
                  <Link to={`/product/${item._id}`}> View more</Link>
                </button>
                <button>Add to cart</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
