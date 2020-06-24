/* eslint-disable no-case-declarations */
import axios from 'axios';

const defaultAdmin = {
  allProducts: [],
  product: {}
};

const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
const DELETE_PRODUCT = 'DELETE_ARTIST';
const GET_PRODUCTS = 'GET_PRODUCTS';

const getProducts = (products) => ({
  type: GET_PRODUCTS,
  products
});

const deleteProducts = (productId) => ({
  type: DELETE_PRODUCT,
  productId
});

const addNewProduct = (product) => ({
  type: ADD_NEW_PRODUCT,
  product
});

export const getProductsFromServer = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/products');
    dispatch(getProducts(data));
  };
};

export const deleteProductFromServer = (productId) => {
  return async (dispatch) => {
    await axios.delete(`/api/products/${productId}`);
    dispatch(deleteProducts(productId));
  };
};

export const addNewProductToServer = (newProduct) => {
  return async (dispatch) => {
    const response = await axios.put('/api/products', newProduct);
    dispatch(addNewProduct(response.data));
  };
};

const adminProductReducer = (state = defaultAdmin, action) => {
  switch (action.type) {
    case ADD_NEW_PRODUCT:
      return { ...state, allProducts: [...state.allProducts, (action.newProduct)] };
    case DELETE_PRODUCT:
      const updatedProducts = { ...state };
      const filteredProducts = updatedProducts.defaultAdmin.filter(product => product.id !== action.product);
      return { ...state, defaultAdmin: filteredProducts };
    case GET_PRODUCTS:
      return { ...state, allProducts: action.products };
    default:
      return state;
  }
};

export default adminProductReducer;
