export const productReducer = (state, action) => {
  switch (action.type) {
    case "ALL_PRODUCT":
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case "SINGLE_PRODUCT":
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case "SORTED_PRODUCT":
      return {
        ...state,
        ...action.payload,
        sortedProduct: action.payload,
      };
    default:
      return state;
  }
};
