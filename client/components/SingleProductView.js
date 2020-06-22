import React from 'react';
import { fetchOneProductFromServer } from '../store/singleProduct';
import { connect } from 'react-redux';
import SingleProduct from './SingleProduct';

class SingleProductView extends React.Component {
    componentDidMount() {
        this.props.getProduct(this.props.match.params.id);
    }

    render() {
        const {product} = this.props || {};

        if (Object.keys(product).length) {
            return <SingleProduct product={product} />;
        } else {
            return <div>loading</div>;
        }
    }
}

const mapProduct = (state) => {
    return {
        product: state.product,
    };
};

const mapDispatch = (dispatch) => {
    return {
        getProduct: (id) => dispatch(fetchOneProductFromServer(id)),
    };
};

export default connect(mapProduct, mapDispatch)(SingleProductView);
