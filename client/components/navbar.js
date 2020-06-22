import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
    <div>
        <h1 style={{ fontSize: '100px' }}>Fugees.</h1>
        <nav>
            {isLoggedIn ? (
                <div>
                    <Link to="/home">Home</Link>
                    <a href="#" onClick={handleClick}>
                        Logout
                    </a>
                    <Link to="/products">Products</Link>
                    <Link to="/shopping_cart">Shopping Cart</Link>
                </div>
            ) : (
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/shopping_cart">Shopping Cart</Link>
                </div>
            )}
        </nav>
        <hr />
    </div>
);

const mapState = (state) => {
    return {
        isLoggedIn: !!state.user.id,
    };
};

const mapDispatch = (dispatch) => {
    return {
        handleClick() {
            dispatch(logout());
        },
    };
};

export default connect(mapState, mapDispatch)(Navbar);

Navbar.propTypes = {
    handleClick: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};
