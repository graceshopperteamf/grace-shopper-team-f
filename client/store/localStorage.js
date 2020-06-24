import { toast } from 'react-toastify';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return [];
    }
};
export const saveState = (cart) => {
    try {
        const serializedState = JSON.stringify(cart);
        localStorage.setItem('cart', serializedState);
    } catch (err) {
        console.log(err);
    }
};
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const CLEAR_CART = 'CLEAR_CART';
const defaultCart = [...loadState()] || [];

export function addToCart(id, inventoryQuantity) {
    return function (dispatch) {
        dispatch({
            type: ADD_ITEM,
            id,
            inventoryQuantity
        });
        // toast('added to cart', {
        //     position: toast.POSITION.TOP_RIGHT
        // });
    };
}

// export const addToCart = (id, inventoryQuantity) => ({
//     type: ADD_ITEM,
//     id,
//     inventoryQuantity,


// });

export const addToCart = (id, inventoryQuantity) => ({
    type: ADD_ITEM,
    id,
    inventoryQuantity,
});

export const removeFromCart = (id) => ({ type: REMOVE_ITEM, id });
export const updateItemFromCart = (id, quantity) => ({
    type: UPDATE_ITEM,
    id,
    quantity,
});
export const clearCart = () => ({ type: CLEAR_CART });
export default function cartReducer(state = defaultCart, action) {
    switch (action.type) {
        case ADD_ITEM:
            toast.success('Added To Cart!');
            const updatedCart = [...state];
            let itemAlreadyExists = false;
            for (let i = 0; i < updatedCart.length; i++) {
                const currentItem = updatedCart[i];
                if (currentItem.id === action.id) {
                    itemAlreadyExists = true;
                    if (action.inventoryQuantity === updatedCart[i].quantity) {
                        saveState(state);
                        return state;
                    }
                    updatedCart[i] = {
                        id: action.id,
                        quantity: updatedCart[i].quantity + 1,
                    };
                }
            }
            if (itemAlreadyExists) {
                return updatedCart;
            } else {
                saveState([...state, { id: action.id, quantity: 1 }]);
                return [...state, { id: action.id, quantity: 1 }];
            }
        case REMOVE_ITEM: {
            if (state.length === 0) {
                saveState(state);
                return state;
            }
            let itemToRemove = null;
            let idOfItemToRemove = null;
            for (let i = 0; i < state.length; i++) {
                const currentItem = state[i];
                if (currentItem.id === action.id) {
                    itemToRemove = currentItem;
                    idOfItemToRemove = i;
                    break;
                }
            }
            if (!itemToRemove) {
                saveState(state);
                return state;
            }
            const updatedState = [...state];
            updatedState[idOfItemToRemove] = {
                id: action.id,
                quantity: itemToRemove.quantity - 1,
            };
            if (updatedState[idOfItemToRemove].quantity === 0) {
                saveState(updatedState.filter((item) => item.id !== action.id));
                return updatedState.filter((item) => item.id !== action.id);
            } else {
                saveState(updatedState);
                return updatedState;
            }
        }
        case UPDATE_ITEM: {
            if (action.quantity === 0) {
                return state.filter((item) => item.id !== action.id);
            } else {
                let itemToUpdate = null;
                let idOfItemToUpdate = null;
                for (let i = 0; i < state.length; i++) {
                    const currentItem = state[i];
                    if (currentItem.id === action.id) {
                        itemToUpdate = currentItem;
                        idOfItemToUpdate = i;
                    }
                }
                const updatedState = [...state];
                updatedState[idOfItemToUpdate] = {
                    ...updatedState[idOfItemToUpdate],
                    quantity: action.quantity,
                };
                saveState(updatedState);
                return updatedState;
            }
        }
        case CLEAR_CART:
            saveState([]);
            return [];
        default:
            saveState(state);
            return state;
    }
}
