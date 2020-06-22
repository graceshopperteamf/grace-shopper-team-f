const ADD_ITEM = 'ADD_ITEM';

const REMOVE_ITEM = 'REMOVE_ITEM';

const UPDATE_ITEM = 'UPDATE_ITEM';

const CLEAR_CART = 'CLEAR_CART';

const defaultCart = [];

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
            const updatedCart = [...state];
            let itemAlreadyExists = false;

            for (let i = 0; i < updatedCart.length; i++) {
                const currentItem = updatedCart[i];

                if (currentItem.id === action.id) {
                    itemAlreadyExists = true;

                    if (action.inventoryQuantity === updatedCart[i].quantity) {
                        return state;
                    }

                    updatedCart[i] = {
                        id: action.id,
                        quantity: updatedCart[i].quantity + 1,
                    };
                }
            }

            return itemAlreadyExists
                ? updatedCart
                : [...state, { id: action.id, quantity: 1 }];
        case REMOVE_ITEM: {
            if (state.length === 0) {
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
                return state;
            }

            const updatedState = [...state];
            updatedState[idOfItemToRemove] = {
                id: action.id,
                quantity: itemToRemove.quantity - 1,
            };

            return updatedState[idOfItemToRemove].quantity === 0
                ? updatedState.filter((item) => item.id !== action.id)
                : updatedState;
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

                return updatedState;
            }
        }
        case CLEAR_CART:
            return [];
        default:
            return state;
    }
}

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');

        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);

        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.log(err);
    }
};
