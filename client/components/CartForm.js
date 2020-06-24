import React from 'react';
import { connect } from 'react-redux';

class CartForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: this.props.product.quantity
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleChange(event) {
        this.setState({ quantity: Number(event.target.value) });
    }

    handleKeyDown(event) {
        event.preventDefault();
    }

    render() {
        return this.props.filteredProducts.length ? (
            <div>
                <p>{this.props.product.title.toUpperCase()}</p>
                <img
                    src={`${this.props.product.image}`}
                    width={500}
                    alt={this.props.product.title}
                />
                <p>
                    $
                    {(
                        this.props.product.price * this.props.product.quantity
                    ).toLocaleString('en-US')}
                </p>
                <p>Quantity: {this.props.product.quantity}</p>
                <button
                    type="button"
                    onClick={() =>
                        this.props.handleRemoveClick(
                            this.props.product.id,
                            this.state.quantity
                        )
                    }
                >
                    Remove
                </button>
                <button
                    type="button"
                    onClick={() =>
                        this.props.handleUpdateClick(
                            this.props.product.id,
                            this.state.quantity
                        )
                    }
                >
                    Update
                </button>

                <label htmlFor="quantity:">
                    Enter a quantity and click to update
                </label>

                <input
                    onChange={this.handleChange} tabIndex="1" size="4" onKeyDown={this.handleKeyDown}
                    value={this.state.quantity}
                    type="number"
                    id={this.props.product.id}
                    name="quantity"
                    min="0"
                    max={this.props.product.inventoryQuantity}
                />
            </div>
        ) : (
            <p>
                Nothing in your cart. Turn back and capture your bounty
                like Elliot Ness!
            </p>
        );
    }
}
// changes the link to checkout render the checkout form
const mapProducts = (state) => {
    return {
        cart: state.cart,
    };
};

export default connect(mapProducts, null)(CartForm);
