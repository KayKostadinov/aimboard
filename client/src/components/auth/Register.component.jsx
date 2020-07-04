import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        console.log('register')
    }

    return (
        <div className='landing'>
            <div className="landing-container">
                <div className="form-container">
                    <form className="form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder='name'
                                name='name'
                                value={name}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
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
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder='confirm password'
                                name='password2'
                                minLength='6'
                                value={password2}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <input type="submit" className='btn submit' value='Register' />
                    </form>
                    <p className="tooltip">
                        Already have an account? <Link to='/login' className='link'>Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register;
