import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className='landing'>
            <div className="lan-card">
                <h1 className="txt-xl">Welcome to AimBoard</h1>
                <p className='message'>Aim at your goals, inspire and be inspired! <br /> Join our community of dreamers!</p>
                <div className="buttons">
                    <Link className="btn" to="/register">Sign Up</Link>
                    <Link className="btn" to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Landing;