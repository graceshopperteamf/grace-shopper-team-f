import React from 'react';
import SingleProduct from './SingleProduct';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { fetchProductsFromServer } from '../store/product';
import { Link } from 'react-router-dom';

class AllProducts extends React.Component {
    componentDidMount() {
        this.props.getAllProducts();
    }

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
                    {this.props.products.map((product) => (
                        <Link to={`/products/${product.id}`} key={product.title}>
                            <SingleProduct key={product.title} product={product} />
                        </Link>
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
