import React from 'react';

const SingleProduct = (props) => {
    return (
        <div>
            <div>
                <button type="button">Add To Cart</button>
            </div>
            <div>

                <p>{props.product.title.toUpperCase()}</p>
                <p>{props.product.type}</p>
                <p>{`$${props.product.price}`}</p>
                <img
                    src={`${props.product.image}`}
                    width={500}
                    alt={props.product.title}
                />
                <p>{props.product.price.toLocaleString('en-US')}</p>
            </div>
        </div>
    );
};

export default SingleProduct;
