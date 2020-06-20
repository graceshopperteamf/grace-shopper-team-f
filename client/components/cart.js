import React from 'react';
// import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import SingleProduct from './SingleProduct';
import { fetchProductsFromServer } from '../store/product';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import actions or Local storage function
//checkout
// need to add shopping basket somewhere here and on Homepage
// As a customer/visitor, I want to be able to:
// [] edit my cart if I change my mind:
// - change the quantity of a product in my cart.
// - remove a product in my cart.
// - No one else should be able to edit my cart except me.
// [] "checkout" the products in my cart so I can purchase my desired goods.
//  need action removeProduct
//single product

class Cart extends React.Component {
  componentDidMount() {
    //Asim making  get single product
    this.props.getAllProducts();
  }
  // add & subtract the quantity of product. Via orderItem??
  //update cart
  //remove the item
  handleRemove = (id) => {
    this.props.removeProduct(id);
  };

  render() {
    //tried to test this but I can't
    //this.props will have all products
    let Products = this.props.products.length ? (
      this.props.products.map((product) => {
        return (
            <div>
                <li>
                    <div>
                        <img src={product.image} width={300} alt={product.title} />
                        <p>
                        artist ?
                        Title: {product.title}
                        Price: ${product.price.toLocaleString('en-US')}
                        Type: {product.type}
                        Quantity:
                        </p>
                        <button
                        type="button"
                        onClick={() => {
                            this.handleRemove(product.id);
                        }}
                        >
                        Remove
                        </button>
                    </div>
                </li>
            </div>
        );
      })
    ) : (
      <p>
        Nothing in your order. Turn back and capture your bounty like Elliot
        Ness!
      </p>
    );
    return (
      <div>
        <ul>{Products}</ul>
      </div>
    );
  }
}

const mapProducts = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllProducts: () => dispatch(fetchProductsFromServer()),
  };
};

export default connect(mapProducts, mapDispatch)(Cart);
