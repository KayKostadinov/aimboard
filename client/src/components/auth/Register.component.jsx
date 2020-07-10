import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import Alert from '../layout/Alert.component';


const Register = (props) => {
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
            props.setAlert("Passwords don't match", 'error');
        } else {
            console.log('Success')
        }
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
                        <Alert />
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

Register.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Register);
