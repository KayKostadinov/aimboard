import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className="logo">
                <h2>
                    <Link to="/">
                        <i className='fas fa-crosshairs' /> AimBoard
                    </Link>
                </h2>
            </div>
            <div className="navigation">
                <ul>
                    <li>
                        <Link className="btn" to="#">Aim</Link>
                    </li>
                    <li>
                        <Link className="btn" to="#">Boards</Link>
                    </li>
                    <li className="search">
                        <i className="fas fa-search" />
                        <textarea id="search" cols="25" rows="1" placeholder="Search"></textarea>
                    </li>
                </ul>
            </div>
            <div className="profile">
                <ul>
                    <li>
                        <Link className="btn" to="/register">Sign Up</Link>
                    </li>
                    <li>
                        <Link className="btn" to="/login">Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
