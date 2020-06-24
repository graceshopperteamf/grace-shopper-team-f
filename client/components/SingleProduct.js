import React from 'react';
import { addToCart } from '../store/localStorage';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './toast.css';


class SingleProduct extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddClick = this.handleAddClick.bind(this);

    }


    handleAddClick(id, inventoryQuantity) {
        this.props.addToCart(id, inventoryQuantity);

    }

    render() {

        return (
            <div>
                <p>{this.props.product.title.toUpperCase()}</p>
                <img
                    src={`${this.props.product.image}`}
                    width={500}
                    alt={this.props.product.title}
                />
                <p>${this.props.product.price.toLocaleString('en-US')}</p>
                <p>Quantity: {this.props.product.inventoryQuantity}</p>
                <button type="button" onClick={() => this.handleAddClick(this.props.product.id, this.props.product.inventoryQuantity)}>Add</button>
                <ToastContainer autoClose={2000} />

            </div>
        );
    }
}

const mapState = (state) => {
    return {
        cart: state.cart
    };
};

const mapDispatch = (dispatch) => {
    return {
        addToCart: (id, inventoryQuantity) => dispatch(addToCart(id, inventoryQuantity))
    };
};

export default connect(mapState, mapDispatch)(SingleProduct);
