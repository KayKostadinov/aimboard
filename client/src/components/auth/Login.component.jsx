import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        console.log('login')
    }

    return (
        <div className='landing'>
            <div className="landing-container">
                <div className="form-container">
                    <form className="form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input type="email"
                                placeholder='e-mail address'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder='password'
                                name='password'
                                minLength='6'
                                value={password}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>

                        <input type="submit" className='btn submit' value='Login' />
                    </form>
                    <p className="tooltip">
                        Don't have an account? <Link to='/register' className='link'>Register</Link>
                    </p>
                </div>
            </div>
        </div>

    )
}
export default Login;
