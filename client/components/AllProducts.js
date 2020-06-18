import React from 'react';
import SingleProduct from './SingleProduct';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { fetchProductsFromServer } from '../store/product';

class AllProducts extends React.Component {
    componentDidMount() {
        console.log("component has been mounted")
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
                        <SingleProduct key={product.title} product={product} />
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
