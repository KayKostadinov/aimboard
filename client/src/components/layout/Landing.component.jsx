import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Login from '../auth/Login.component';
import Register from '../auth/Register.component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


// implement single page login and register
// keep a shared state between Landing and the other two components in the App comp

const Landing = ({ isAuthenticated }) => {



    const [clickable, setClickable] = useState({ slider: false, clicked: '' });
    const [sidebarClass, setSidebarClass] = useState('sidebar');
    const [landingClass, setLandingClass] = useState('landing landing-grid-one');

    if (isAuthenticated) {
        return <Redirect to='/aim' />
    }

    function slideIn() {
        setSidebarClass('sidebar slide');
        setLandingClass('landing landing-grid-two');
    }

    function handleClick(e) {
        e.preventDefault();
        setClickable({ slider: true, clicked: e.target.name })
        slideIn();

    }

    return (
        <div className={landingClass}>
            <div className="lan-card">
                <h1 className="txt-xl">Welcome to AimBoard</h1>
                <p className='message'>Aim at your goals and share your progress. <br /> Join our community of dreamers!</p>
                <div className="buttons">
                    <Link name='login' className="btn btn-regular slide-side" onClick={handleClick} to="#!">Login</Link>
                    <Link name='register' className="btn btn-highlight slide-side" onClick={handleClick} to="#!">Sign Up</Link>
                </div>
            </div>
            <div className={sidebarClass}>
                {
                    clickable.clicked && (
                        clickable.clicked === 'login' ?
                            <Login onClick={handleClick} setClickable={setClickable} /> :
                            (clickable.clicked === 'register' ? <Register setClickable={setClickable} /> : null)
                    )
                }
            </div>
        </div>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);