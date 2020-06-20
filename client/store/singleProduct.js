import axios from 'axios';

export const GET_ONE_PRODUCT = 'GOT_ONE_PRODUCT';

const initialState = {

};

export const getOneProductActionCreator = (product) => ({
  type: GET_ONE_PRODUCT,
  product
});

export const fetchOneProductFromServer = (productId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch(getOneProductActionCreator(data));
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ONE_PRODUCT:
      return action.product;
    default:
      return state;
  }

}
