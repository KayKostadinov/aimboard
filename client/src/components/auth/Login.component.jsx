import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        console.log('register')
    }

    return (
        <div className="container">
            <div className="form-container">
                <h2>Login</h2>
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

                    <input type="submit" className='btn' value='Register' />
                </form>
                <p>
                    Already have an account? <Link to='/login'>Login</Link>
                </p>
            </div>
        </div>
    )
}
export default Login;
