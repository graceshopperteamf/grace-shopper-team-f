import React from 'react';
import SingleProduct from './SingleProduct';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { fetchProductsFromServer } from '../store/product';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts();
  }
  //consistent coding style in components
  render() {
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="stretch"
          spacing={2}
        >
          {this.props.products
            .filter((product) => product.inventoryQuantity !== 0)
            .map((product) => (
              <div key={product.id}>
                <SingleProduct product={product} />
                <Typography variant="h4">
                  <Link to={`/products/${product.id}`}>{product.title}</Link>
                </Typography>
              </div>
            ))}
        </Grid>
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

export default connect(mapProducts, mapDispatch)(AllProducts);
