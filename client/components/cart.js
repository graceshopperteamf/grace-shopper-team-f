import React from 'react';
import { fetchProductsFromServer } from '../store/product';
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
        this.props.getAllProducts();
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
        if (this.props.products) {
            const filteredProducts = [];

            for (let i = 0; i < this.props.cart.length; i++) {
                const idOfCurrentProduct = this.props.cart[i].id;
                const product = this.props.products.filter(
                    (currentProduct) => currentProduct.id === idOfCurrentProduct
                )[0];
                const productWithQuantity = {
                    ...product,
                    quantity: this.props.cart[i].quantity,
                };

                filteredProducts.push(productWithQuantity);
            }

            return filteredProducts.length ? (
                <div>
                    {filteredProducts.map((product) => (
                        <div key={v4()}>
                            <CartForm
                                product={product}
                                products={this.props.products}
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
                </div>
            ) : (
                <p>
                    Nothing in your order. Turn back and capture your bounty
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
        cart: state.cart,
        products: state.products,
    };
};

const mapDispatch = (dispatch) => {
    return {
        getAllProducts: () => dispatch(fetchProductsFromServer()),
        removeFromCart: (id) => dispatch(removeFromCart(id)),
        updateItemFromCart: (id, quantity) =>
            dispatch(updateItemFromCart(id, quantity)),
        clearCart: () => dispatch(clearCart()),
    };
};

export default connect(mapProducts, mapDispatch)(Cart);
