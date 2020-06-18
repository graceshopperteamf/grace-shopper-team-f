import axios from 'axios';

// [] Get all orders for a certain User
// For Admin only
/**
 * ACTION TYPES
 */
export const GET_ORDERS = 'GET_ORDERS';


/**
 * ACTION CREATORS
 */
export const getOrders = (orders) => ({ type: GET_ORDERS, orders });

//

/**
 * THUNK CREATORS
 */
export const fetchOrders = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/orders');
    dispatch(getOrders(data));
  } catch (error) {
    console.log(error, 'Cool cliques throw bricks but seldom hit targets.');
  }
};
/**
 * INITIAL STATE
 */
const initialState = [];
/**
 * REDUCER
 */

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
