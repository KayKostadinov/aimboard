import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Fragment } from 'react';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    const loginBtns = (

        <div className="profile">
            <ul>
                <li>
                    <Link className="btn fade" to="/register">Sign Up</Link>
                </li>
                <li>
                    <Link className="btn fade" to="/login">Login</Link>
                </li>
            </ul>
        </div>
    )

    const profileBtns = (
        <Fragment>
            <div className="navigation">
                <ul>
                    <li>
                        <Link className="btn" to="/aim">Aim</Link>
                    </li>
                    <li>
                        <Link className="btn" to="/boards">Boards</Link>
                    </li>
                    <li className="search">
                        <i className="fas fa-search" />
                        <input id="search" type="text" placeholder="Search"></input>
                    </li>
                </ul>
            </div>
            <div className="profile">
                <ul>
                    <li>
                        <Link className="btn fade" to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link className="btn fade" to='#' onClick={handleLogout}>Log out</Link>
                    </li>
                </ul>
            </div>
        </Fragment>
    )

    function handleLogout(e) {
        e.preventDefault();
        logout();
        return (
            <Redirect to='/login' />
        );
    }


    return (
        <nav className='navbar'>
            <div className="logo">
                <h2>
                    <Link to="/">
                        <i className='fas fa-crosshairs' /> AimBoard
                    </Link>
                </h2>
            </div>
            {!loading && (isAuthenticated ? profileBtns : loginBtns)}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);

