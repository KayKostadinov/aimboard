import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Alert from '../layout/Alert.component';

const Login = ({ login, isAuthenticated, setClickable }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        login(email, password);
    }

    // redirect on login
    if (isAuthenticated) {
        return (
            <Redirect to='/profile' />
        )
    }

    return (
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
                <p className='form-tooltip'>Don't have an account?
                    <Link to='/' className='link-text' name='register' onClick={e => {
                        e.preventDefault();
                        setClickable({ slider: true, clicked: e.target.name }
                        )
                    }}> Register</Link>
                </p>
                <Alert />
                <input type="submit" className='btn btn-highlight' value='Login' />
            </form>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
