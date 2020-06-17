import axios from 'axios';

//[] Get all orders
// [] Make all orders accessible to Admin
// [] Get all orders for a certain User

/**
 * ACTION TYPES
 */
export const GET_ORDERS = 'GET_ORDERS';

/**
 * ACTION CREATORS
 */
const getOrders = (order) => ({ type: GET_ORDERS, order });

/**
 * THUNK CREATORS
 */
export const fetchOrders = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/server/api/orders'); //*currently waiting on routes so this path may change
    dispatch(getOrders(data));
  } catch (error) {
    console.log('Cool cliques throw bricks but seldom hit targets.');
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
      return action.order;
    default:
      return state;
  }
}
