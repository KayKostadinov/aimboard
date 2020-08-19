import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {



    const publicBtns = (
        <div className="navigation two">
            <Link className="btn nav" to="/boards"><h3>Boards</h3></Link>
            <Link className="btn nav" to="/"><h3>Login</h3></Link>
        </div>
    )

    const profileBtns = (
        <div className="navigation">
            <Link className="btn nav" to="/aim">
                <i className='fas fa-crosshairs' />
                <h3 className='hide-sm' >aim</h3>
            </Link>
            <Link className="btn nav" to="/boards">
                <i className='fas fa-bullseye' />
                <h3 className='hide-sm' >boards</h3>
            </Link>
            <Link className='btn nav' to='/profile'>
                <i className='fas fa-user-circle' />
                <h3 className='hide-sm' >profile</h3>
            </Link>
            <Link className='btn nav' to='#' onClick={e => handleLogout(e)}>
                <i className='fas fa-sign-out-alt' />
                <h3 className='hide-sm' >log out</h3>
            </Link>
        </div>
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
                        AimBoard
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

