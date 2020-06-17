import React from 'react';
import SingleProduct from './SingleProduct';
import Grid from '@material-ui/core/Grid';

class Products extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="stretch" spacing={2}
                >
                    {this.props.products.map((product) => (
                        <SingleProduct key={product.title} product={product} />
                    ))}
                </Grid>
            </div>
        );
    }
}

export default Products;
