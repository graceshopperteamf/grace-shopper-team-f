import React from 'react';
import { fetchFilteredProductsFromServer } from '../store/filteredProducts';
import { connect } from 'react-redux';
import {
    removeFromCart,
    updateItemFromCart,
    clearCart,
} from '../store/localStorage';
import CartForm from './CartForm';
import v4 from 'node-uuid';

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
    }

    componentDidMount() {
        const idsOfProducts = this.props.cart.map((item) => item.id);
        const objectOfIds = { id: idsOfProducts };

        this.props.getSelectProducts(objectOfIds);
    }

    handleRemoveClick(id) {
        this.props.removeFromCart(id);
    }

    handleClearClick() {
        this.props.clearCart();
    }

    handleUpdateClick(id, quantity) {
        this.props.updateItemFromCart(id, Number(quantity));
    }

    render() {
        if (this.props.filteredProducts.length) {
            const filteredProducts = [];
            let total = 0;

            for (let i = 0; i < this.props.cart.length; i++) {
                const idOfCurrentProduct = this.props.cart[i].id;
                const product = this.props.filteredProducts.filter(
                    (currentProduct) => currentProduct.id === idOfCurrentProduct
                )[0];
                const productWithQuantity = {
                    ...product,
                    quantity: this.props.cart[i].quantity,
                };

                total += productWithQuantity.price * productWithQuantity.quantity;

                filteredProducts.push(productWithQuantity);
            }

            return filteredProducts.length ? (
                <div>
                    {filteredProducts.map((product) => (
                        <div key={v4()}>
                            <CartForm
                                product={product}
                                filteredProducts={filteredProducts}
                                handleRemoveClick={this.handleRemoveClick}
                                handleUpdateClick={this.handleUpdateClick}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => this.handleClearClick()}
                    >
                        Clear
                    </button>
                    <p>Total: ${(total).toLocaleString('en-US')}</p>
                </div>
            ) : (
                <p>
                    Nothing in your cart. Turn back and capture your bounty
                    like Elliot Ness!
                </p>
            );
        } else {
            return 'Loading...';
        }
    }
}

const mapProducts = (state) => {
    return {
        filteredProducts: state.filteredProducts,
        cart: state.cart,
        user: state.user,
    };
};

const mapDispatch = (dispatch) => {
    return {
        getSelectProducts: (objectOfIds) =>
            dispatch(fetchFilteredProductsFromServer(objectOfIds)),
        removeFromCart: (id) => dispatch(removeFromCart(id)),
        updateItemFromCart: (id, quantity) =>
            dispatch(updateItemFromCart(id, quantity)),
        clearCart: () => dispatch(clearCart()),
    };
};

export default connect(mapProducts, mapDispatch)(Cart);
