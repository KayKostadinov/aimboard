import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Alert from '../layout/Alert.component';


const Register = ({ setAlert, register, isAuthenticated, setClickable }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Passwords don't match", 'error'); // use error as a dynamic styling class
        } else {
            register({ name, email, password });
        }
    }

    // redirect on reg
    if (isAuthenticated) {
        return (
            <Redirect to='/aim' />
        )
    }

    return (
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
                <p className='form-tooltip'>Already have an account?
                    <Link to='/' className='link-text' name='login' onClick={e => {
                        e.preventDefault();
                        setClickable({ slider: true, clicked: e.target.name }
                        )
                    }}> Login</Link>
                </p>
                <Alert />
                <input type="submit" className='btn btn-highlight' value='Register' />
            </form>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);
