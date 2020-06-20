import React, { Fragment } from 'react'

const Register = () => {
    return (
        <div className="container">
            <div className="form-container">
                <h2>Sign Up</h2>
                <form className="form" action="">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder='name' name='name' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='e-mail address' name='email' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='password' name='password' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Confirm Password</label>
                        <input type="password" placeholder='confirm password' name='password2' minLength='6' required />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
