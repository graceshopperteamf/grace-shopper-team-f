import {
  ADD_ITEM,
  REMOVE_ITEM,
  defaultCart,
  addToCart,
  removeFromCart,
} from './localStorage';

function checkout(state = defaultCart, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        id: addToCart(state.id, action.inventoryQuantity),
      };
    case REMOVE_ITEM:
      return {
        ...state,
        id: removeFromCart(state.id, action.inventoryQuantity),
      };

    default:
      return state;
  }
}

export default checkout;
