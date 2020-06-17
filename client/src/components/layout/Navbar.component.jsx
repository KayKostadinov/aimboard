import React from 'react';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className="logo">
                <h2>
                    <a href="/">
                        <i className='fas fa-crosshairs' /> AimBoard
                    </a>
                </h2>
            </div>
            <div className="navigation">
                <ul>
                    <li>
                        <a href="#">Aim</a>
                    </li>
                    <li>
                        <a href="#">Boards</a>
                    </li>
                    <li>
                        <textarea id="search" cols="25" rows="1" placeholder="Search"></textarea>
                    </li>
                </ul>
            </div>
            <div className="profile">
                <ul>
                    <li>
                        <a href="#">Profile</a>
                    </li>
                    <li>
                        <a href="#">Log out</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
