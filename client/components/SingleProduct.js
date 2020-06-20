import React from 'react';

const SingleProduct = (props) => {
    return (
        <div>
            <p>{props.product.title.toUpperCase()}</p>
            <img
                src={`${props.product.image}`}
                width={500}
                alt={props.product.title}
            />
            <p>{props.product.price.toLocaleString('en-US')}</p>
        </div>
    );
};

export default SingleProduct;
