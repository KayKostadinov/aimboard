import React, { useState } from 'react';
import { Link as button, withRouter } from 'react-router-dom';
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
        <div className="profile-setup">
            <h2>Let's set up your profile!</h2>
            <div className="form-container">
                <form className="form" onSubmit={e => onSubmit(e)}>
                    {step === 1 &&
                        <div className="form-group">
                            <label htmlFor="">Say something about yourself</label>
                            <textarea autoFocus='true' type="text" name='about' required value={formData.about} onChange={e => handleChange(e)} />
                        </div>
                    }
                    {step === 2 &&
                        <div className="form-group">
                            <label htmlFor="">What are your interests?</label>
                            <textarea autoFocus='true' type="text" name='interests' required value={formData.interests} onChange={e => handleChange(e)} />
                        </div>
                    }
                    {step === 3 &&
                        <div className="form-group">
                            <label htmlFor="">List a few of your goals</label>
                            <textarea autoFocus='true' type="text" name='goals' required value={formData.goals} onChange={e => handleChange(e)} />
                        </div>
                    }
                    <div className="buttons">
                        {step !== 1 &&
                            <button onClick={e => {
                                e.preventDefault();
                                setStep(step - 1)
                            }}
                                className='btn btn-highlight'>{'<<'}</button>
                        }
                        {step === 3 ?
                            (<button type='submit' className='btn btn-highlight'>Create</button>)
                            :
                            (<button onClick={e => {
                                e.preventDefault();
                                setStep(step + 1)
                            }} className='btn btn-highlight'>{'>>'}</button>)
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

ProfileSetup.propTypes = {
    createProfile: PropTypes.func.isRequired,
}

export default connect(null, { createProfile })(withRouter(ProfileSetup));