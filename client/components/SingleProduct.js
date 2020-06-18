import React from 'react';
import { Link } from 'react-router-dom';

const SingleProduct = ({product}) => {
    return (
        <div>
            <p>{product.title.toUpperCase()}</p>
            <img
                src={`${product.image}`}
                width={500}
                alt={product.title}
            />
            <p>${product.price.toLocaleString('en-US')}</p>
        </div>
    );
};

export default SingleProduct;
