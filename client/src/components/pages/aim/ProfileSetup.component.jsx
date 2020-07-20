import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../../actions/profile';

// TODO: add form fields for social media links

const ProfileSetup = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        about: '',
        goals: '',
        interests: '',
        social: {
            youtube: '',
            twitter: '',
            facebook: '',
            instagram: '',
            linkedin: ''
        },
    });

    const [step, setStep] = useState(1);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData)
        createProfile(formData, history)
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={e => onSubmit(e)}>
                {step === 1 &&
                    <div className="form-group">
                        <label htmlFor="">Say something about yourself</label>
                        <input type="text" name='about' value={formData.about} onChange={e => handleChange(e)} />
                    </div>
                }
                {step === 2 &&
                    <div className="form-group">
                        <label htmlFor="">What are you interested in?</label>
                        <input type="text" name='interests' value={formData.interests} onChange={e => handleChange(e)} />
                    </div>
                }
                {step === 3 &&
                    <div className="form-group">
                        <label htmlFor="">What goals are you focusing on?</label>
                        <input type="text" name='goals' value={formData.goals} onChange={e => handleChange(e)} />
                    </div>
                }
                <div className="buttons">
                    {step !== 1 &&
                        <div onClick={() => setStep(step - 1)} className='btn'>{'<<'}</div>
                    }
                    {step === 3 ?
                        (<button type='submit' className='btn'>Create</button>)
                        :
                        (<div onClick={() => setStep(step + 1)} className='btn'>{'>>'}</div>)
                    }
                </div>
            </form>
        </div>
    )
}

ProfileSetup.propTypes = {
    createProfile: PropTypes.func.isRequired,
}

export default connect(null, { createProfile })(withRouter(ProfileSetup));