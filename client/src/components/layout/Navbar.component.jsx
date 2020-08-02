import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {

    const [menu, toggleMenu] = useState('hide');
    const [graphic, toggleGraphic] = useState(false);


    const publicBtns = (
        <div>
            <div className="navigation">
                <Link className="btn fade" to="/boards">Boards</Link>
                <Link className="btn fade" to="/">Login</Link>
            </div>
        </div>
    )

    const profileBtns = (
        <Fragment>
            <div className="navigation">
                <Link className="btn" to="/aim">Aim</Link>
                <Link className="btn" to="/boards">Boards</Link>
            </div>
            <div className="navigation nav-dropdown">
                {user?.avatar && !graphic ?
                    <img
                        src={user.avatar}
                        alt=""
                        className='avatar'
                        onClick={e => {
                            e.preventDefault();
                            toggleMenu('show');
                            toggleGraphic(!graphic);
                        }}
                    /> :
                    <i className='fas fa-times avatar'
                        onClick={e => {
                            e.preventDefault();
                            toggleMenu('hide');
                            toggleGraphic(!graphic);
                        }}
                    />
                }
                <div className={`burger ${menu}`}>
                    <Link className={`btn ${menu}`} to="/profile" onClick={() => {
                        toggleMenu('hide');
                        toggleGraphic(!graphic);
                    }}>Profile</Link>
                    <Link className={`btn ${menu}`} to='#' onClick={e => {
                        toggleMenu('hide');
                        toggleGraphic(!graphic);
                        handleLogout(e);
                    }}>Log out</Link>
                </div>
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
            <div className="logo hide-sm">
                <h2>
                    <Link to="/">
                        <i className='fas fa-crosshairs' /> AimBoard
                    </Link>
                </h2>
            </div>
            {!loading && (isAuthenticated ? profileBtns : publicBtns)}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar);

